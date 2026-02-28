"use client";

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface HolographicCardProps {
    title?: string;
    subtitle?: string;
    image?: string;
    className?: string;
}

const HolographicCard = ({ title, subtitle, image, className }: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(2000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        card.style.setProperty('--bg-x', '50%');
        card.style.setProperty('--bg-y', '50%');
    };

    return (
        <div
            className={cn(
                "holographic-card relative w-full h-full cursor-pointer rounded-[40px] transition-transform duration-200 ease-out",
                "max-w-xl mx-auto bg-black",
                className
            )}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 z-0 bg-black rounded-[40px] overflow-hidden">
                <img
                    src={image || "https://images.unsplash.com/photo-1593079829032-9426d4086612?auto=format&fit=crop&q=80&w=1600"}
                    alt={title}
                    className="w-full h-full object-cover opacity-90 scale-100"
                />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12">
                {title && (
                    <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
                        {title}
                    </h3>
                )}
                {subtitle && (
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em] drop-shadow-lg">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="holo-shimmer rounded-[40px]" />
        </div>
    );
};

export default HolographicCard;
