import * as React from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import "./argent-slider.css";

export interface ProjectData {
    title: string;
    image: string;
    category: string;
    year: string;
    description: string;
}

const PROJECT_DATA: ProjectData[] = [
    {
        title: "Cyber-Lite Tech T",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&auto=format&fit=crop",
        category: "CORE COLLECTION",
        year: "2026",
        description: "Multi-layered ventilation mesh with biometric fit",
    },
    {
        title: "Orbital Heavy Hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop",
        category: "INDUSTRIAL SERIES",
        year: "2026",
        description: "480GSM high-density cotton with tech-cuff integration",
    },
    {
        title: "Vace Fusion Bottoms",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop",
        category: "ATHLETIC GEAR",
        year: "2025",
        description: "Kinetic-seam construction for maximum range of ops",
    },
    {
        title: "Monolith Parka 01",
        image: "https://images.unsplash.com/photo-1539533113208-f66027156bd1?q=80&w=1600&auto=format&fit=crop",
        category: "OUTERWEAR",
        year: "2026",
        description: "Weather-sealed architectural silhouette",
    },
    {
        title: "Vace Core Accessory",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
        category: "EQUIPMENT",
        year: "2024",
        description: "Minimalist utility for urban evolution",
    },
];

export { PROJECT_DATA };

const CONFIG = {
    SCROLL_SPEED: 0.75,
    LERP_FACTOR: 0.05,
    BUFFER_SIZE: 5,
    MAX_VELOCITY: 150,
    SNAP_DURATION: 500,
};

// Utility functions
const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

const getProjectData = (index: number) => {
    const i =
        ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
        PROJECT_DATA.length;
    return PROJECT_DATA[i];
};

const getProjectNumber = (index: number) => {
    return (
        ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
        PROJECT_DATA.length +
        1
    )
        .toString()
        .padStart(2, "0");
};

export function ArgentLoopInfiniteSlider({ onItemClick }: { onItemClick?: (index: number) => void }) {
    const [visibleRange, setVisibleRange] = React.useState({
        min: -CONFIG.BUFFER_SIZE,
        max: CONFIG.BUFFER_SIZE,
    });

    // Refs for state that changes frequently (animation loop)
    const state = React.useRef({
        currentY: 0,
        targetY: 0,
        isDragging: false,
        isSnapping: false,
        snapStart: { time: 0, y: 0, target: 0 },
        lastScrollTime: Date.now(),
        dragStart: { y: 0, scrollY: 0 },
        projectHeight: 0, // Will be set on mount
        minimapHeight: 500, // Updated to match the enlarged centered card
    });

    // Refs to store DOM elements
    const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const requestRef = React.useRef<number>(undefined);

    // Helper to update parallax for a single item
    const updateParallax = (
        img: HTMLImageElement | null,
        scroll: number,
        index: number,
        height: number
    ) => {
        if (!img) return;

        if (!img.dataset.parallaxCurrent) {
            img.dataset.parallaxCurrent = "0";
        }

        let current = parseFloat(img.dataset.parallaxCurrent);
        const target = (-scroll - index * height) * 0.2;
        current = lerp(current, target, 0.1);

        // Optimization: only update if changed significantly
        if (Math.abs(current - target) > 0.01) {
            img.style.transform = `translateY(${current}px) scale(1.5)`;
            img.dataset.parallaxCurrent = current.toString();
        }
    };

    const updateSnap = () => {
        const s = state.current;
        const progress = Math.min(
            (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
            1
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        s.targetY =
            s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
        if (progress >= 1) s.isSnapping = false;
    };

    const snapToProject = () => {
        const s = state.current;
        const current = Math.round(-s.targetY / s.projectHeight);
        const target = -current * s.projectHeight;
        s.isSnapping = true;
        s.snapStart = {
            time: Date.now(),
            y: s.targetY,
            target: target,
        };
    };

    const updatePositions = () => {
        const s = state.current;
        if (!s.projectHeight) return;
        const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

        // Update Projects
        projectsRef.current.forEach((el, index) => {
            const y = index * s.projectHeight + s.currentY;
            el.style.transform = `translateY(${y}px)`;
            const img = el.querySelector("img");
            updateParallax(img, s.currentY, index, s.projectHeight);
        });

        // Update Minimap Images
        minimapRef.current.forEach((el, index) => {
            const y = index * s.minimapHeight + minimapY;
            el.style.transform = `translateY(${y}px)`;
            const img = el.querySelector("img");
            if (img) {
                updateParallax(img, minimapY, index, s.minimapHeight);
            }
        });

        // Update Info
        infoRef.current.forEach((el, index) => {
            const y = index * s.minimapHeight + minimapY;
            el.style.transform = `translateY(${y}px)`;
        });
    };

    const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

    const animationLoop = () => {
        const s = state.current;
        const now = Date.now();

        if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
            const snapPoint = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
            if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
        }

        if (s.isSnapping) updateSnap();
        if (!s.isDragging) {
            s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
        }

        updatePositions();

        const currentIndex = Math.round(-s.targetY / s.projectHeight);
        const min = currentIndex - CONFIG.BUFFER_SIZE;
        const max = currentIndex + CONFIG.BUFFER_SIZE;

        if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
            renderedRange.current = { min, max };
            setVisibleRange({ min, max });
        }

        requestRef.current = requestAnimationFrame(animationLoop);
    };

    React.useEffect(() => {
        state.current.projectHeight = window.innerHeight;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const s = state.current;
            s.isSnapping = false;
            s.lastScrollTime = Date.now();
            const delta = Math.max(
                Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
                -CONFIG.MAX_VELOCITY
            );
            s.targetY -= delta;
        };

        const onTouchStart = (e: TouchEvent) => {
            const s = state.current;
            s.isDragging = true;
            s.isSnapping = false;
            s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
            s.lastScrollTime = Date.now();
        }

        const onTouchMove = (e: TouchEvent) => {
            const s = state.current;
            if (!s.isDragging) return;
            s.targetY =
                s.dragStart.scrollY +
                (e.touches[0].clientY - s.dragStart.y) * 1.5;
            s.lastScrollTime = Date.now();
        }

        const onTouchEnd = () => {
            state.current.isDragging = false;
        }

        const onResize = () => {
            state.current.projectHeight = window.innerHeight;
            const container = document.querySelector('.parallax-container') as HTMLElement;
            if (container) {
                container.style.height = `${window.innerHeight}px`;
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("resize", onResize);

        onResize();
        requestRef.current = requestAnimationFrame(animationLoop);

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("resize", onResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const indices = [];
    for (let i = visibleRange.min; i <= visibleRange.max; i++) {
        indices.push(i);
    }

    return (
        <div className="parallax-container">
            <ul className="project-list">
                {indices.map((i) => {
                    const data = getProjectData(i);
                    return (
                        <div
                            key={i}
                            className="project"
                            ref={(el) => {
                                if (el) projectsRef.current.set(i, el);
                                else projectsRef.current.delete(i);
                            }}
                        >
                            <img src={data.image} alt={data.title} className="grayscale brightness-50 contrast-125" />
                            <div className="absolute inset-x-12 bottom-24 z-10">
                                <h2 className="text-[10vw] font-black italic tracking-tighter text-white uppercase leading-none opacity-20">{data.title}</h2>
                            </div>
                        </div>
                    );
                })}
            </ul>

            <div className="minimap">
                <div className="minimap-wrapper">
                    <div className="minimap-img-preview">
                        {indices.map((i) => {
                            const data = getProjectData(i);
                            return (
                                <div
                                    key={i}
                                    className="minimap-img-item"
                                    ref={(el) => {
                                        if (el) minimapRef.current.set(i, el);
                                        else minimapRef.current.delete(i);
                                    }}
                                >
                                    <img src={data.image} alt={data.title} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="minimap-info-list font-black overflow-hidden relative">
                        {indices.map((i) => {
                            const data = getProjectData(i);
                            const num = getProjectNumber(i);
                            return (
                                <div
                                    key={i}
                                    className="minimap-item-info uppercase italic text-white"
                                    ref={(el) => {
                                        if (el) infoRef.current.set(i, el);
                                        else infoRef.current.delete(i);
                                    }}
                                >
                                    <div className="minimap-item-info-row flex justify-between items-end border-b border-white/20 pb-4 mb-6">
                                        <p className="text-[24px] text-white/30 tracking-[0.4em] mb-2">{num}</p>
                                        <h2 className="text-6xl sm:text-7xl leading-none tracking-tighter text-white font-black drop-shadow-2xl">
                                            {data.title}
                                        </h2>
                                    </div>
                                    <div className="minimap-item-info-row flex justify-between text-sm tracking-[0.5em] mb-8 text-white/40">
                                        <p>{data.category}</p>
                                        <p>{data.year}</p>
                                    </div>
                                    <div className="minimap-item-info-row">
                                        <p className="text-lg leading-relaxed max-w-xl text-white/60 font-bold tracking-widest leading-[1.8]">
                                            {data.description}
                                        </p>
                                    </div>
                                    {onItemClick && (
                                        <div className="minimap-item-info-row mt-8">
                                            <ShinyButton
                                                onClick={() => onItemClick(((Math.abs(i) % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length)}
                                                className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] italic rounded-lg"
                                            >
                                                Ürünü Gör
                                            </ShinyButton>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Editorial Overlay */}
            <div className="absolute top-12 left-12 z-50 pointer-events-none">
                <div className="px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                    NEW ARRIVALS // PHASE 02 // EVOLUTION
                </div>
            </div>

            <div className="absolute top-1/2 right-12 -translate-y-1/2 z-50 pointer-events-none hidden lg:block">
                <div className="flex flex-col gap-8">
                    <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <div className="vertical-text text-[8px] font-black uppercase tracking-[1em] text-white/20 whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        SCROLL TO OPERATE
                    </div>
                    <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                </div>
            </div>
        </div>
    );
}
