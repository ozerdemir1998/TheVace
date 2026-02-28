const fs = require('fs');
const path = require('path');

const root = 'c:/Projects/TheVace';

const files = [
  // API FILES
  {
    path: 'api/data.ts',
    content: `import { Product } from './types';

export const products: Product[] = [
    {
        id: 1,
        name: "Aero-Lite Performance Tee",
        description: "Son teknoloji nefes alan dokusuyla antrenmanlarında maksimum performans sağlar. Terletmeyen özel kumaş teknolojisi.",
        price: 449.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Vace Midnight Tech Hoodie",
        description: "Gece antrenmanları ve günlük şıklık için tasarlandı. Su itici özelliği ve 360 derece esnek yapısı ile hareket özgürlüğü.",
        price: 899.90,
        category: "Kapşonlu Sweat",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 3,
        name: "Nordic Winter Base Layer",
        description: "Soğuk havalarda vücut ısısını koruyan termal teknoloji. Dikişsiz yapısı sayesinde sürtünmeyi önler.",
        price: 529.90,
        category: "Uzun Kollu Tişört",
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L"]
    },
    {
        id: 4,
        name: "Elements Graphic Jersey",
        description: "Sınırlı sayıda üretilen Elements koleksiyonu. Şehir stilini sporla buluşturan ikonik tasarım.",
        price: 479.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L", "XL"]
    }
];`
  },
  {
    path: 'api/index.ts',
    content: `import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { products } from './data';

const app = express();
const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TheVace Modern API',
            version: '1.0.0',
            description: 'TheVace e-ticaret sitesi için ürün ve sepet yönetim API dokümantasyonu.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Lokal geliştirme sunucusu',
            },
        ],
    },
    apis: [path.join(__dirname, './index.ts')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req: Request, res: Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.use(express.json());

/**
 * @openapi
 * /:
 *   get:
 *     summary: API durumunu ve endpoint'leri döndürür
 *     responses:
 *       200:
 *         description: API online
 */
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'online', message: 'TheVace Modern API', version: '1.0.0' });
});

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Tüm ürünleri listeler
 *     responses:
 *       200:
 *         description: Ürün listesi başarıyla getirildi
 */
app.get('/api/products', (req: Request, res: Response) => {
    res.json(products);
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Belirli bir ürünü ID ile getirir
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ürün ID'si
 *     responses:
 *       200:
 *         description: Ürün başarıyla getirildi
 *       404:
 *         description: Ürün bulunamadı
 */
app.get('/api/products/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Ürün bulunamadı' });
    }
});

app.listen(PORT, () => {
    console.log('[VACE] Server ready at http://localhost:' + PORT);
    console.log('[VACE] Swagger UI: http://localhost:' + PORT + '/api-docs');
});`
  },
  // FRONTEND CORE
  {
    path: 'frontend/index.html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TheVace | Shop</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>`
  },
  {
    path: 'frontend/src/index.css',
    content: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary: #020617;
  --secondary: #6366f1;
  --accent: #f43f5e;
  --background: #ffffff;
  --surface: #f8fafc;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --white: #ffffff;
  --gold: #fbbf24;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;
  --radius-full: 9999px;
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Outfit', sans-serif; background-color: var(--background); color: var(--text-main); line-height: 1.6; overflow-x: hidden; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade { animation: fadeIn 0.8s ease forwards; }
.container { max-width: 1300px; margin: 0 auto; padding: 0 2rem; }
.glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--surface); }
::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--secondary); }`
  },
  {
    path: 'frontend/src/App.css',
    content: `.navbar { height: 80px; display: flex; align-items: center; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: var(--transition); }
.navbar.scrolled { height: 70px; background: rgba(255, 255, 255, 0.9); box-shadow: var(--shadow-md); }
.logo { font-size: 1.8rem; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
.logo span { color: var(--secondary); }
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-link { font-weight: 500; color: var(--text-main); text-decoration: none; transition: var(--transition); font-size: 0.95rem; }
.nav-link:hover { color: var(--secondary); }
.hero { min-height: 85vh; background: radial-gradient(circle at top right, #eef2ff, #ffffff); display: flex; align-items: center; padding-top: 80px; position: relative; overflow: hidden; }
.hero-content { max-width: 700px; z-index: 1; }
.hero h1 { font-size: 5rem; line-height: 1.1; margin-bottom: 1.5rem; font-weight: 800; color: var(--primary); }
.hero h1 span { background: linear-gradient(135deg, var(--secondary), #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 3rem; max-width: 550px; }
.btn { padding: 1.2rem 3rem; border-radius: var(--radius-md); font-weight: 700; font-size: 1.1rem; transition: var(--transition); display: inline-flex; align-items: center; gap: 1rem; cursor: pointer; border: none; text-decoration: none; }
.btn-primary { background: var(--primary); color: var(--white); box-shadow: 0 10px 20px -5px rgba(2, 6, 23, 0.3); }
.btn-primary:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -15px rgba(2, 6, 23, 0.4); background: var(--secondary); }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 3rem; margin-top: 4rem; }
.product-card { background: var(--white); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); border: 1px solid #f1f5f9; position: relative; }
.product-card:hover { transform: translateY(-15px); box-shadow: var(--shadow-xl); border-color: var(--secondary); }
.product-image { height: 450px; overflow: hidden; position: relative; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
.product-card:hover .product-image img { transform: scale(1.08); }
.product-badge { position: absolute; top: 1.5rem; left: 1.5rem; background: var(--white); padding: 0.5rem 1.2rem; border-radius: var(--radius-full); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: var(--shadow-md); z-index: 2; color: var(--secondary); }
.product-info { padding: 2rem; }
.product-name { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--primary); text-decoration: none; display: block; }
.product-price { font-size: 1.8rem; font-weight: 800; color: var(--secondary); }
`
  },
  {
    path: 'frontend/src/main.jsx',
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
  {
    path: 'frontend/src/App.jsx',
    content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;`
  }
];

files.forEach(file => {
  const fullPath = path.join(root, file.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, file.content, { encoding: 'utf8' });
  console.log('Sanitized: ' + file.path);
});
console.log('ALL FILES SANITIZED AS PURE UTF-8 WITH FIXED SWAGGER');
