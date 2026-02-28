import { useState, useRef, useEffect } from 'react';
import { AnimatedHeroSection } from '@/components/ui/animated-hero-section';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CategoryShowcase } from '@/components/ui/category-showcase';
import { AnimatedFooterText } from '@/components/ui/animated-footer-text';
import { SocialIcons } from '@/components/ui/social-icons';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { InteractiveStarfield } from '@/components/ui/starfield';
import { ProductModal } from '@/components/ui/product-modal';

const galleryData: GalleryItem[] = [
    {
        common: 'Technical Parka',
        binomial: 'Industrial Series 01',
        photo: {
            url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1000&auto=format&fit=crop&q=80',
            text: 'Advanced technical parka with weather resistance',
            pos: '50% 30%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Modular Outerwear',
        binomial: 'Evolutionary Gear',
        photo: {
            url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80',
            text: 'Multifunctional modular jacket system',
            pos: '50% 40%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Urban Combat Boot',
        binomial: 'Footwear Division',
        photo: {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80',
            text: 'Reinforced urban combat boots for movement',
            pos: '50% 50%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Knot Mesh Layer',
        binomial: 'Performance Knit',
        photo: {
            url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1000&auto=format&fit=crop&q=80',
            text: 'Technical mesh base layer with precision knit',
            pos: '50% 50%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Leather Utility Vest',
        binomial: 'Tactical Leather',
        photo: {
            url: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1000&auto=format&fit=crop&q=80',
            text: 'Reinforced leather utility vest with multiple pockets',
            pos: '50% 35%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Stealth Bomber',
        binomial: 'Nightfall Series',
        photo: {
            url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80',
            text: 'Matte black stealth bomber jacket',
            pos: '50% 30%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Thermal Base Layer',
        binomial: 'Prime Series',
        photo: {
            url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=80',
            text: 'High-performance thermal base layer',
            pos: '50% 50%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Kinetic Trouser',
        binomial: 'Movement Lab',
        photo: {
            url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80',
            text: 'Ergonomic trousers designed for kinetic movement',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Monochrome Tech Tee',
        binomial: 'Essential Performance',
        photo: {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&auto=format&fit=crop&q=80',
            text: 'Seamless performance tee in onyx black',
            pos: '50% 40%',
            by: 'The Vace Editorial'
        }
    },
    {
        common: 'Apex Shell',
        binomial: 'Summit Division',
        photo: {
            url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80',
            text: 'Advanced Gore-Tex shell for extreme environments',
            by: 'The Vace Editorial'
        }
    },
];

const SkeletonContent = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-4">
                <h2 className="text-4xl sm:text-7xl font-black italic tracking-tighter text-white uppercase italic leading-none drop-shadow-2xl">The Vace</h2>
                <p className="text-2xl sm:text-5xl font-black italic tracking-tighter text-white/60 uppercase italic leading-none">{title}</p>
            </div>
            <div className="h-0.5 w-32 bg-white/10" />
            <ShinyButton className="w-fit rounded-full font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs px-12 py-4">
                Tüm Ürünleri Gör
                <ArrowRight className="ml-3 size-5 inline-block" />
            </ShinyButton>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonContent title="Tişört" />,
        className: "md:col-span-2",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
    },
    {
        id: 2,
        content: <SkeletonContent title="Hoodie" />,
        className: "col-span-1",
        thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
    },
    {
        id: 3,
        content: <SkeletonContent title="Eşofman Altı" />,
        className: "col-span-1",
        thumbnail: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop",
    },
    {
        id: 4,
        content: <SkeletonContent title="Koleksiyon" />,
        className: "md:col-span-2",
        thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=900&auto=format&fit=crop",
    },
];

const CATEGORY_DATA = [
    {
        id: "tisort",
        title: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
    },
    {
        id: "hoodie",
        title: "Hoodie",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200",
    },
    {
        id: "esofman-alti",
        title: "Eşofman Altı",
        imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200",
    },
    {
        id: "kapsonlu-sweat",
        title: "Kapşonlu Sweat",
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200",
    },
    {
        id: "mont",
        title: "Mont",
        imageUrl: "https://images.unsplash.com/photo-1539533113208-f66027156bd1?q=80&w=1200",
    },
    {
        id: "aksesuar",
        title: "Aksesuar",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200",
    },
];

const Products = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [rawProducts, setRawProducts] = useState<any[]>([]);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Animation for the "Scroll Down" indicator only
    const scrollY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setRawProducts(data);

                const mappedGallery = data.slice(0, 10).map((p: any) => ({
                    common: p.name,
                    binomial: p.category || 'CORE',
                    photo: {
                        url: p.imageUrl,
                        text: p.description || 'Premium Vace Equipment',
                        by: 'The Vace Editorial'
                    }
                }));
                setGalleryData(mappedGallery);
            } catch (error) {
                console.error('Failed to load products for gallery', error);
            }
        };
        loadProducts();
    }, []);

    const handleGalleryItemClick = (index: number) => {
        if (!rawProducts[index]) return;
        const p = rawProducts[index];
        setSelectedProduct({
            id: p.id,
            name: p.name,
            price: p.price,
            description: p.description,
            category: p.category,
            imageUrl: p.imageUrl,
            sizes: p.sizes || ['S', 'M', 'L', 'XL'],
        });
        setIsModalOpen(true);
    };

    return (
        <div className="w-full bg-black">
            {/* Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />

            {/* Hero Section - Normal Scroll */}
            <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center p-6 pt-32 bg-black">
                <div className="w-full max-w-5xl h-[60vh] sm:h-[70vh]">
                    <AnimatedHeroSection />
                </div>

                <motion.div
                    style={{
                        y: scrollY,
                        opacity: scrollOpacity
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="mt-24 flex flex-col items-center gap-3 animate-bounce"
                >
                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/10 italic">Scroll Down</span>
                    <ChevronDown className="size-5 text-white/10" />
                </motion.div>
            </section>

            {/* Circular Gallery Section */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden">
                <InteractiveStarfield />
                <div className="text-center relative z-10 mb-12">
                    <h1 className="text-4xl sm:text-7xl font-black italic tracking-tighter text-white uppercase">The Collection</h1>
                    <p className="text-white/10 font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mt-3 italic">Hover & Scroll to explore</p>
                </div>
                <div className="w-full h-[600px] sm:h-[800px] flex items-center justify-center z-20 overflow-visible">
                    <CircularGallery items={galleryData} radius={700} autoRotateSpeed={0.01} scrollSensitivity={0.15} onItemClick={handleGalleryItemClick} />
                </div>
            </section>

            {/* Category Showcase Section (NEW Layout) */}
            <section className="w-full py-40 bg-black relative overflow-hidden">
                <InteractiveStarfield />
                <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
                    <h2 className="text-5xl sm:text-8xl font-black italic tracking-tighter text-white uppercase">Categories</h2>
                    <p className="text-white/20 font-black uppercase tracking-[0.4em] text-xs sm:text-sm mt-8 italic">Curated Artisanal Pieces</p>
                </div>
                <div className="w-full">
                    <CategoryShowcase categories={CATEGORY_DATA} />
                </div>
            </section>

            <footer className="w-full py-40 px-6 flex flex-col items-center gap-20 bg-black relative z-10 border-t border-white/[0.02]">
                {/* 1. Logo & Title (Top) */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-[-1rem]">
                        <img
                            src="/assets/images/gorilla-logo.png"
                            alt="The Vace Logo"
                            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] animate-holo-wobble"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-6xl font-black italic tracking-tighter mb-4">THE VACE</h2>
                        <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em] italic mt-6">Evolutionary Industrial Performance</p>
                    </div>
                </div>

                {/* 2. Animated Footer Text (Vertical Stack) */}
                <div className="w-full max-w-4xl mt-16">
                    <AnimatedFooterText />
                </div>

                {/* 3. Social Section (Stacked Circular style) */}
                <div className="flex flex-col items-center mt-8">
                    <div className="flex gap-6">
                        <SocialIcons />
                    </div>
                </div>


                {/* 5. Copyright */}
                <div className="text-center space-y-2 opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                        © 2026 THE VACE PERFORMANCE INC.
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-[0.8em]">All Rights Reserved.</p>
                </div>
            </footer>
        </div >
    );
};

export default Products;
