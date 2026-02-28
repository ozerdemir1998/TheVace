"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
    id: number;
    content: JSX.Element | React.ReactNode | string;
    className: string;
    thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
    const [selected, setSelected] = useState<Card | null>(null);
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    const handleClick = (card: Card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    return (
        <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-2 relative pb-40">
            {cards.map((card, i) => (
                <div key={i} className={cn(card.className, "min-h-[400px] md:min-h-[500px]")}>
                    <motion.div
                        onClick={() => handleClick(card)}
                        className={cn(
                            card.className,
                            "relative overflow-hidden cursor-pointer",
                            selected?.id === card.id
                                ? "fixed inset-0 h-[70vh] w-full md:w-3/4 lg:w-1/2 m-auto z-[9001] flex justify-center items-center flex-wrap flex-col shadow-[0_0_150px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
                                : lastSelected?.id === card.id
                                    ? "z-40 bg-black h-full w-full border border-white/5"
                                    : "bg-black h-full w-full border border-white/5"
                        )}
                        layoutId={`card-${card.id}`}
                    >
                        {selected?.id === card.id && <SelectedCard selected={selected} onOutsideClick={handleOutsideClick} />}
                        <ImageComponent card={card} isSelected={selected?.id === card.id} />
                    </motion.div>
                </div>
            ))}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOutsideClick}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[9000] cursor-pointer"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const ImageComponent = ({ card, isSelected }: { card: Card, isSelected?: boolean }) => {
    return (
        <motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            className={cn(
                "object-cover object-center absolute inset-0 h-full w-full transition duration-500",
                isSelected ? "opacity-30 scale-100" : "opacity-100 scale-105 hover:scale-100"
            )}
            alt="thumbnail"
        />
    );
};

const SelectedCard = ({ selected, onOutsideClick }: { selected: Card | null, onOutsideClick: () => void }) => {
    return (
        <div className="bg-transparent h-full w-full flex flex-col justify-end relative z-[9002]">
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{
                    opacity: 0,
                    y: 50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 50,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
                className="relative px-8 pb-16 z-[70]"
            >
                {selected?.content}
            </motion.div>
            <button
                onClick={(e) => { e.stopPropagation(); onOutsideClick(); }}
                className="absolute top-8 right-8 size-14 bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 border border-white/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
        </div>
    );
};
