import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
    common: string;
    binomial: string;
    photo: {
        url: string;
        text: string;
        pos?: string;
        by: string;
    };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    /** Controls how far the items are from the center. Increased default for better spacing. */
    radius?: number;
    /** Controls the speed of auto-rotation. */
    autoRotateSpeed?: number;
    /** Sensitivity for wheel/scroll rotation. */
    scrollSensitivity?: number;
    /** Callback when a gallery item is clicked. Receives the item index. */
    onItemClick?: (index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    ({ items, className, radius = 900, autoRotateSpeed = 0.02, scrollSensitivity = 0.15, onItemClick, ...props }, ref) => {
        const [rotation, setRotation] = useState(0);
        const [isHovering, setIsHovering] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);
        const animationFrameRef = useRef<number | null>(null);

        // Merge refs: use the forwardRef and our own internal ref for event listeners
        useEffect(() => {
            if (typeof ref === 'function') {
                ref(containerRef.current);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = containerRef.current;
            }
        }, [ref]);

        // Auto-rotation effect
        useEffect(() => {
            const autoRotate = () => {
                if (!isHovering) {
                    setRotation(prev => prev + autoRotateSpeed);
                }
                animationFrameRef.current = requestAnimationFrame(autoRotate);
            };

            animationFrameRef.current = requestAnimationFrame(autoRotate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [isHovering, autoRotateSpeed]);

        // Native wheel listener for reliable preventDefault and Lenis compatibility
        useEffect(() => {
            const el = containerRef.current;
            if (!el) return;

            const handleWheelNative = (e: WheelEvent) => {
                // If hovering, we capture the wheel event to rotate the gallery
                // and stop it from reaching Lenis/Page scroll
                if (isHovering) {
                    e.preventDefault();
                    e.stopPropagation();
                    setRotation(prev => prev + e.deltaY * scrollSensitivity);
                }
            };

            // Use capture phase to intercept before Lenis gets it (if Lenis uses bubbling)
            // Use passive: false to allow preventDefault
            el.addEventListener('wheel', handleWheelNative, { passive: false, capture: true });
            return () => {
                el.removeEventListener('wheel', handleWheelNative, { capture: true });
            };
        }, [isHovering, scrollSensitivity]);

        const anglePerItem = 360 / items.length;

        return (
            <div
                ref={containerRef}
                role="region"
                aria-label="Circular 3D Gallery"
                // data-lenis-prevent is a special attribute for studio-freight/lenis to ignore scroll events
                data-lenis-prevent
                className={cn("relative w-full h-full flex items-center justify-center", className)}
                style={{ perspective: '3000px' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                {...props}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        const totalRotation = rotation % 360;
                        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

                        // Firing range for opacity
                        const opacity = Math.max(0.05, 1 - (normalizedAngle / 100));

                        return (
                            <div
                                key={item.photo.url}
                                className="absolute w-[400px] h-[600px]"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-200px',
                                    marginTop: '-300px',
                                    opacity: opacity,
                                    zIndex: normalizedAngle < 90 ? 100 : 0,
                                    transition: 'opacity 0.3s linear'
                                }}
                            >
                                <div
                                    className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-md cursor-pointer"
                                    onClick={() => onItemClick?.(i)}
                                >
                                    <img
                                        src={item.photo.url}
                                        alt={item.photo.text}
                                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                                        style={{ objectPosition: item.photo.pos || 'center' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                        <h2 className="text-2xl font-black italic tracking-tighter uppercase italic drop-shadow-lg">{item.common}</h2>
                                        <em className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 italic block mt-1">{item.binomial}</em>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
