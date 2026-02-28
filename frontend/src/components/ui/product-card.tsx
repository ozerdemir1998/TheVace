import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    className?: string;
    onClick?: () => void;
}

export const ProductCard = ({ id, name, price, imageUrl, className, onClick }: ProductCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
            className={`group flex flex-col gap-4 w-full ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 size-8 bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus className="size-4 text-white" />
                </button>
            </div>
            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic text-white/80 transition-colors group-hover:text-white line-clamp-1">{name}</h3>
                <p className="text-[10px] md:text-xs font-black tracking-tight text-white/40">{price}</p>
            </div>
        </motion.div>
    );
};
