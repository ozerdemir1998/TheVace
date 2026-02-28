"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardProps {
    title: string;
    src: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
    classNameExpanded?: string;
    [key: string]: any;
}

export function ExpandableCard({
    title,
    src,
    description,
    children,
    className,
    classNameExpanded,
    ...props
}: ExpandableCardProps) {
    const [active, setActive] = React.useState(false);
    const cardRef = React.useRef<HTMLDivElement>(null);
    const id = React.useId();

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActive(false);
            }
        };

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setActive(false);
            }
        };

        if (active) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", onKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [active]);

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl h-full w-full z-[8000]"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && (
                    <div
                        className={cn(
                            "fixed inset-0 grid place-items-center z-[9000] py-10 px-4",
                        )}
                    >
                        <motion.div
                            layoutId={`card-${title}-${id}`}
                            ref={cardRef}
                            className={cn(
                                "w-full max-w-[800px] h-full max-h-[90vh] flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] rounded-3xl bg-zinc-950 border border-white/10 shadow-3xl relative",
                                classNameExpanded,
                            )}
                        >
                            <motion.div layoutId={`image-${title}-${id}`} className="relative h-80 flex-shrink-0">
                                <img
                                    src={src}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />

                                <motion.button
                                    layoutId={`button-${title}-${id}`}
                                    onClick={() => setActive(false)}
                                    className="absolute top-6 right-6 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 transition-colors"
                                >
                                    <X className="size-5" />
                                </motion.button>
                            </motion.div>

                            <div className="relative p-8 flex flex-col gap-6">
                                <div>
                                    <motion.p
                                        layoutId={`description-${description}-${id}`}
                                        className="text-white/40 text-xs font-black uppercase tracking-[0.4em] mb-2"
                                    >
                                        {description}
                                    </motion.p>
                                    <motion.h3
                                        layoutId={`title-${title}-${id}`}
                                        className="font-black text-white text-4xl italic tracking-tighter uppercase"
                                    >
                                        {title}
                                    </motion.h3>
                                </div>

                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-white/60 text-base leading-relaxed"
                                >
                                    {children}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                layoutId={`card-${title}-${id}`}
                onClick={() => setActive(true)}
                className={cn(
                    "group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 hover:border-white/20 transition-all duration-500 cursor-pointer",
                    className,
                )}
            >
                <motion.div layoutId={`image-${title}-${id}`} className="w-full h-full">
                    <img
                        src={src}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <motion.p
                        layoutId={`description-${description}-${id}`}
                        className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-2"
                    >
                        {description}
                    </motion.p>
                    <motion.h3
                        layoutId={`title-${title}-${id}`}
                        className="text-2xl font-black text-white italic tracking-tight uppercase"
                    >
                        {title}
                    </motion.h3>

                    <motion.div
                        layoutId={`button-${title}-${id}`}
                        className="mt-4 flex justify-between items-center"
                    >
                        <span className="text-xl font-black text-white">İNCELE</span>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                            <span className="text-black font-black">→</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
