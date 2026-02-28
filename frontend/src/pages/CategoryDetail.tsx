import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/product-card';
import { ProductModal } from '@/components/ui/product-modal';
import { AnimatedFooterText } from '@/components/ui/animated-footer-text';
import { SocialIcons } from '@/components/ui/social-icons';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const FILTER_ITEMS = [
    "TÜMÜNÜ GÖR",
    "BASKILI",
    "UZUN KOLLU",
    "ÇOK SATANLAR",
    "DÜZ",
    "KISA KOLLU",
    "DÜĞMELİ YAKA",
    "KOLSUZ",
    "SPOR GİYİM",
    "POLO TİŞÖRT"
];

const CATEGORY_MAP: Record<string, string> = {
    "tisort": "Tişört",
    "hoodie": "Hoodie",
    "esofman-alti": "Eşofman Altı",
    "kapsonlu-sweat": "Kapşonlu Sweat",
    "mont": "Mont",
    "aksesuar": "Aksesuar"
};

const CategoryDetail = () => {
    const { categoryId } = useParams();
    const [activeFilter, setActiveFilter] = useState("TÜMÜNÜ GÖR");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const categoryTitle = categoryId && CATEGORY_MAP[categoryId] ? CATEGORY_MAP[categoryId] : "Koleksiyon";

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();

                // If a specific category exists, filter it. Else, show all.
                const filtered = categoryTitle === "Koleksiyon"
                    ? data
                    : data.filter((p: any) => p.category?.toUpperCase() === categoryTitle.toUpperCase());

                setProducts(filtered);
            } catch (error) {
                console.error("Failed to load category products", error);
            }
        };
        fetchProducts();
    }, [categoryTitle]);

    const handleProductClick = (product: any) => {
        setSelectedProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description || `${categoryTitle} koleksiyonundan ${product.name}`,
            category: product.category || categoryTitle,
            imageUrl: product.imageUrl,
            sizes: product.sizes || ['XS', 'S', 'M', 'L', 'XL'],
        });
        setIsModalOpen(true);
    };

    return (
        <div className="w-full bg-black min-h-screen relative">
            <div className="max-w-[1920px] mx-auto px-6 pt-24 pb-20 flex flex-col md:flex-row gap-12 relative">

                {/* Sidebar - Centered in first fold - Scrolls with content */}
                <aside className="hidden md:flex flex-col justify-center w-64 flex-shrink-0 md:h-[calc(100vh-96px)]">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-5">
                            {FILTER_ITEMS.map((filter, index) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex items-start gap-4 text-left transition-all duration-300 group w-fit`}
                                >
                                    <span className={`text-[8px] font-black italic tracking-widest mt-1.5 ${activeFilter === filter ? 'text-white' : 'text-white/20'}`}>
                                        0{index + 1}
                                    </span>
                                    <span className={`text-[10px] md:text-sm font-black uppercase tracking-[0.2em] italic ${activeFilter === filter ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                                        {filter}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button className="text-[10px] font-black uppercase tracking-[0.4em] italic text-white/20 hover:text-white transition-colors text-left w-fit uppercase">
                            FİLTRELER
                        </button>
                    </div>
                </aside>

                {/* Mobile Filter View (Fallback) */}
                <div className="md:hidden flex overflow-x-auto gap-6 mb-12 no-scrollbar pb-4 border-b border-white/5">
                    {FILTER_ITEMS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] italic ${activeFilter === filter ? 'text-white' : 'text-white/40'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="mb-16">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase">{categoryTitle}</h1>
                        <div className="h-0.5 w-24 bg-white/5 mt-4" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price + ' TL'}
                                imageUrl={product.imageUrl}
                                onClick={() => handleProductClick(product)}
                            />
                        ))}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="w-full py-40 px-6 flex flex-col items-center gap-20 bg-black relative z-10 border-t border-white/[0.02]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-0 border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-3xl rotate-45 transition-transform hover:rotate-0 duration-700">
                        <span className="text-white font-black text-3xl -rotate-45 transition-transform hover:rotate-0 duration-700">V</span>
                    </div>
                    <div className="text-center">
                        <h2 className="text-6xl font-black italic tracking-tighter mb-4">THE VACE</h2>
                        <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em] italic mt-6">Evolutionary Industrial Performance</p>
                    </div>
                </div>

                <div className="w-full max-w-4xl mt-16">
                    <AnimatedFooterText />
                </div>

                <div className="flex flex-col items-center mt-8">
                    <div className="flex gap-6">
                        <SocialIcons />
                    </div>
                </div>


                <div className="text-center space-y-2 opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2026 THE VACE PERFORMANCE INC.</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.8em]">All Rights Reserved.</p>
                </div>
            </footer>

            {/* Product Detail Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default CategoryDetail;
