import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
// Removed seedDatabase and fallback data import

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-vace';

app.use(cors());
app.use(express.json());

// === AUTHENTICATION MIDDLEWARE ===
const authenticateToken = (req: any, res: Response, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Erişim engellendi, token eksik.' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: 'Geçersiz token.' });
        req.user = user;
        next();
    });
};

// === API ENDPOINTS ===

// System Check
app.get('/', (req, res) => {
    res.json({ status: 'online', message: 'TheVace Modern Fullstack API' });
});

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Tüm alanları doldurun.' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'Bu e-posta zaten kullanımda.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, passwordHash: hashedPassword }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kayıt sırasında hata oluştu.' });
    }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Giriş sırasında hata oluştu.' });
    }
});

// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Ürünler yüklenemedi.' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
        if (product) res.json(product);
        else res.status(404).json({ error: 'Ürün bulunamadı.' });
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası.' });
    }
});

// Cart
app.get('/api/cart', authenticateToken, async (req: any, res: Response) => {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: req.user.id },
            include: { product: true }
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Sepet getirilemedi.' });
    }
});

app.post('/api/cart', authenticateToken, async (req: any, res: Response) => {
    try {
        const { productId, quantity, size } = req.body;

        // Sepette aynı ürün ve beden var mı?
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId_size: {
                    userId: req.user.id,
                    productId,
                    size: size || 'M'
                }
            }
        });

        if (existingItem) {
            const updated = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: { product: true }
            });
            return res.json(updated);
        }

        const newItem = await prisma.cartItem.create({
            data: {
                userId: req.user.id,
                productId,
                quantity,
                size: size || 'M'
            },
            include: { product: true }
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Sepete eklerken hata oluştu.' });
    }
});

app.delete('/api/cart/:id', authenticateToken, async (req: any, res: Response) => {
    try {
        await prisma.cartItem.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ success: true, message: 'Ürün sepetten silindi.' });
    } catch (error) {
        res.status(500).json({ error: 'Silme işlemi başarısız.' });
    }
});

app.listen(PORT, async () => {
    console.log(`[VACE] Server running on http://localhost:${PORT}`);
});