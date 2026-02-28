"use client";

import { useMemo, useState, useEffect } from "react";
import { TextScramble } from "@/components/ui/text-scramble";

export function AnimatedFooterText() {
    const titles = useMemo(
        () => [
            { text: "KUSURSUZ", font: "font-sans font-black" },
            { text: "FLAWLESS", font: "font-serif font-medium tracking-[0.2em]" },
            { text: "IMPECCABLE", font: "font-mono font-bold tracking-tight" },
            { text: "PERFETTO", font: "font-[cursive] font-normal" },
            { text: "MAKELLOS", font: "font-[system-ui] font-extrabold" },
            { text: "PERFECTUM", font: "font-serif italic font-semibold tracking-widest" }
        ],
        []
    );
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [titles]);

    return (
        <div className="w-full flex flex-col items-center justify-center bg-black overflow-hidden -mt-16 sm:-mt-24">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="h-12 md:h-16 flex items-center justify-center min-w-[300px]">
                    <TextScramble
                        className={`text-4xl md:text-6xl italic tracking-tighter text-white uppercase bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent transition-all duration-700 ease-in-out ${titles[index].font}`}
                        duration={0.8}
                        speed={0.04}
                    >
                        {titles[index].text}
                    </TextScramble>
                </div>
            </div>
        </div>
    );
}
