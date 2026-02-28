'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function ImageGallery() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center py-20 px-4 bg-background">
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">THE COLLECTION</h2>
                <p className="text-muted-foreground text-lg">Pure performance. Pure style.</p>
            </div>
            <div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {Array.from({ length: 3 }).map((_, col) => (
                    <div key={col} className="grid gap-6">
                        {Array.from({ length: 4 }).map((_, index) => {
                            const isPortrait = Math.random() > 0.5;
                            const width = isPortrait ? 1080 : 1920;
                            const height = isPortrait ? 1920 : 1080;
                            const ratio = isPortrait ? 9 / 16 : 16 / 9;

                            // Using higher quality unsplash images for premium feel
                            const seed = (col * 10) + index;
                            return (
                                <AnimatedImage
                                    key={`${col}-${index}`}
                                    alt={`Image ${col}-${index}`}
                                    src={`https://images.unsplash.com/photo-${1515886657613 + seed}-9f3515b0c78f?w=${width}&q=80&auto=format`}
                                    ratio={ratio}
                                    placeholder={`https://placehold.co/${width}x${height}/020617/FFFFFF?text=TheVace`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface AnimatedImageProps {
    alt: string;
    src: string;
    className?: string;
    placeholder?: string;
    ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isLoading, setIsLoading] = React.useState(true);

    const [imgSrc, setImgSrc] = React.useState(src);

    const handleError = () => {
        if (placeholder) {
            setImgSrc(placeholder);
        }
    };

    return (
        <AspectRatio
            ref={ref}
            ratio={ratio}
            className="bg-muted relative size-full rounded-2xl border border-white/5 overflow-hidden group"
        >
            <img
                alt={alt}
                src={imgSrc}
                className={cn(
                    'size-full rounded-2xl object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-110',
                    {
                        'opacity-100': isInView && !isLoading,
                    },
                )}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
                onError={handleError}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </AspectRatio>
    );
}
