import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HighlightCard from '@/components/ui/highlight-card';
import { ShinyButton } from '@/components/ui/shiny-button';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: number;
        name: string;
        price: number;
        description: string;
        category: string;
        imageUrl: string;
        sizes: string[];
    } | null;
}

export const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Definitive lock for background scroll & interactions without jump
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;

            // Apply styles to body to lock it at current scroll position
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflowY = 'scroll'; // Maintain scrollbar space to prevent jump
            document.body.style.overscrollBehavior = 'none';

            return () => {
                // Restore original styles
                const savedScrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflowY = '';
                document.body.style.overscrollBehavior = '';

                // Jump back to previous position
                window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
            };
        }
    }, [isOpen]);

    if (!product || !mounted) return null;

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product, selectedSize);
            onClose();
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
                    {/* Backdrop - High Z-Index Interaction Barrier */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md cursor-zoom-out pointer-events-auto"
                    />

                    {/* Modal Content - Above Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-[101] w-full max-w-6xl p-4 sm:p-8 pointer-events-none"
                    >
                        <div className="w-full pointer-events-auto relative">
                            <HighlightCard title={product.name} description={product.category}>
                                {/* Close Button - Integrated into Card */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-8 right-8 z-[120] p-3 rounded-full bg-white/10 text-white/50 border border-white/10 backdrop-blur-xl hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95"
                                >
                                    <X size={18} strokeWidth={2.5} />
                                </button>

                                <div className="flex flex-col lg:flex-row w-full h-full lg:min-h-[600px]">

                                    {/* Left: Cinematic 'Boydan Boya' Image Area */}
                                    <div className="lg:w-3/5 w-full h-[300px] lg:h-auto relative overflow-hidden group/img">
                                        <motion.img
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/20 to-neutral-950/60 pointer-events-none" />

                                        {/* Brand Detail on Image */}
                                        <div className="absolute bottom-12 left-12 z-20">
                                            <div className="px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                                                The Vace Editorial Team // Core Collection
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Technical Info Area */}
                                    <div className="lg:w-2/5 w-full p-8 sm:p-12 lg:px-14 lg:py-16 flex flex-col justify-center relative bg-neutral-950/20 backdrop-blur-sm lg:border-l border-white/5 overflow-y-auto">

                                        <div className="space-y-10">
                                            {/* Header Hierarchy */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-white/20 font-black uppercase tracking-[0.6em] text-[8px] block">{product.category}</span>
                                                    <div className="h-px flex-1 bg-white/10" />
                                                </div>
                                                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-2xl">
                                                    {product.name}
                                                </h2>
                                                <div className="h-0.5 w-16 bg-gradient-to-r from-white to-transparent rounded-full opacity-20" />
                                            </div>

                                            {/* Description & Technical Pricing */}
                                            <div className="space-y-4">
                                                <p className="text-white/40 text-[10px] leading-relaxed max-w-sm italic uppercase font-black tracking-widest leading-[1.8]">
                                                    {product.description}
                                                </p>
                                                <div className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                    {product.price.toLocaleString('tr-TR')} TL
                                                </div>
                                            </div>

                                            {/* Precision Size Selection */}
                                            <div className="space-y-4">
                                                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Coordinate System</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size}
                                                            onClick={() => setSelectedSize(size)}
                                                            className={cn(
                                                                "w-14 h-14 rounded-xl border-2 font-black transition-all flex items-center justify-center text-[10px] tracking-tighter relative overflow-hidden",
                                                                selectedSize === size
                                                                    ? "border-white bg-white text-black scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                                                    : "border-white/5 text-white/20 hover:border-white/30 hover:text-white"
                                                            )}
                                                        >
                                                            <span className="relative z-10">{size}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <ShinyButton
                                                    onClick={handleAddToCart}
                                                    disabled={!selectedSize}
                                                    className={cn(
                                                        "w-full px-8 py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] italic rounded-lg",
                                                        !selectedSize && "opacity-30"
                                                    )}
                                                >
                                                    <span className="flex items-center justify-center w-full h-full text-center">
                                                        {selectedSize ? `SEPETE EKLE [${selectedSize}]` : 'BEDEN SEÇİN'}
                                                    </span>
                                                </ShinyButton>
                                            </div>

                                            {/* Global Logistics Section */}
                                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5 opacity-20">
                                                <div className="flex items-center gap-3">
                                                    <Truck size={12} />
                                                    <div className="flex flex-col">
                                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">Logistics</span>
                                                        <span className="text-[6px] font-bold text-white/40">2-4 Day Ops</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <ShieldCheck size={12} />
                                                    <div className="flex flex-col">
                                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">Secured</span>
                                                        <span className="text-[6px] font-bold text-white/40">Bio-Auth</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </HighlightCard>
                        </div>
                    </motion.div>
                </div >
            )}
        </AnimatePresence >
    );

    return createPortal(modalContent, document.body);
};
