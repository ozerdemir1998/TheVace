require('dotenv/config');
const { PrismaClient } = require('@prisma/client');

// Mock data (since we can't easily import TS types into JS without compilation, we inline or require compiled JS)
// Let's just inline a few products to guarantee seeding works.
const products = [
    {
        name: "Aero-Lite Performance Tee",
        description: "Son teknoloji nefes alan dokusuyla antrenmanlarında maksimum performans sağlar. Terletmeyen özel kumaş teknolojisi.",
        price: 449.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    },
    {
        name: "Vace Midnight Tech Hoodie",
        description: "Gece antrenmanları ve günlük şıklık için tasarlandı. Su itici özelliği ve 360 derece esnek yapısı ile hareket özgürlüğü.",
        price: 899.90,
        category: "Kapşonlu Sweat",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    },
    {
        name: "Nordic Winter Base Layer",
        description: "Soğuk havalarda vücut ısısını koruyan termal teknoloji. Dikişsiz yapısı sayesinde sürtünmeyi önler.",
        price: 529.90,
        category: "Uzun Kollu Tişört",
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    },
    {
        name: "Elements Graphic Jersey",
        description: "Sınırlı sayıda üretilen Elements koleksiyonu. Şehir stilini sporla buluşturan ikonik tasarım.",
        price: 479.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    }
];

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');
    await prisma.product.deleteMany();
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
