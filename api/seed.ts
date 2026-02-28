import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { products } from './data';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
    console.log('Start seeding...');

    // Clear existing products to prevent duplicates on multiple runs
    await prisma.product.deleteMany();

    // Reset auto-increment safely
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);

    for (const p of products) {
        const product = await prisma.product.create({
            data: {
                name: p.name,
                price: p.price,
                description: p.description,
                imageUrl: p.imageUrl,
                category: p.category,
            },
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
