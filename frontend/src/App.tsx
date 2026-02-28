import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Home, ShoppingBag, User, Search, Info, LayoutGrid, ShoppingCart, Layers, Sparkles } from 'lucide-react';
import Dock from './components/ui/dock';
import { FloatingHeader } from './components/ui/floating-header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import CategoryDetail from './pages/CategoryDetail';
import Collection from './pages/Collection';
import NewArrivals from './pages/NewArrivals';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import About from './pages/About';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';

// Global Lenis instance for coordination
let lenisInstance: Lenis | null = null;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset standard window scroll
    window.scrollTo(0, 0);
    // Reset Lenis scroll if initialized
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

function AppContent() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Add dark class to body
    document.documentElement.classList.add('dark');

    // Initialize Lenis smooth scroll
    lenisInstance = new Lenis();
    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      // Hysteresis: prevent flickering by having different thresholds for up/down
      const currentScroll = window.scrollY;
      setScrolled(prev => {
        if (!prev && currentScroll > 200) return true;
        if (prev && currentScroll < 100) return false;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dockItems = [
    { icon: Home, label: "Ana Sayfa", active: location.pathname === '/', onClick: () => navigate('/') },
    { icon: ShoppingBag, label: "Ürünler", active: (location.pathname === '/products' || location.pathname.startsWith('/category')) && location.pathname !== '/new-arrivals', onClick: () => navigate('/products') },
    { icon: Layers, label: 'Koleksiyon', active: location.pathname === '/collection', onClick: () => navigate('/collection') },
    { icon: Sparkles, label: "Yeni Gelenler", active: location.pathname === '/new-arrivals', onClick: () => navigate('/new-arrivals') },
    { icon: Info, label: "Hakkımızda", active: location.pathname === '/about', onClick: () => navigate('/about') },
    { icon: User, label: 'Giriş Yap', active: location.pathname === '/auth', onClick: () => navigate('/auth') },
    { icon: ShoppingCart, label: 'Sepet', active: location.pathname === '/cart', onClick: () => navigate('/cart') },
  ];

  const isCollectionPage = location.pathname === '/collection';

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-white selection:text-black">

      {/* Scroll-conditional Header Container - Single Stable Fixed Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-[5000] flex justify-center pointer-events-none p-4 h-24">
        <div className="w-full max-w-5xl pointer-events-auto relative h-full">
          <AnimatePresence mode="wait">
            {!scrolled || isCollectionPage ? (
              <motion.div
                key="header"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-x-0 top-0 w-full"
              >
                <FloatingHeader />
              </motion.div>
            ) : (
              <motion.div
                key="dock"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-x-0 top-0 w-full"
              >
                <Dock items={dockItems} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;