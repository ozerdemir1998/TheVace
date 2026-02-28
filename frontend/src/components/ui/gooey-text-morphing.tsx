"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
    texts: string[];
    morphTime?: number;
    cooldownTime?: number;
    className?: string;
    textClassName?: string;
}

export function GooeyText({
    texts,
    morphTime = 1.25,
    cooldownTime = 0.5,
    className,
    textClassName
}: GooeyTextProps) {
    const text1Ref = React.useRef<HTMLSpanElement>(null);
    const text2Ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (!texts.length) return;

        let textIndex = 0;
        let time = performance.now();
        let morph = 0;
        let cooldown = cooldownTime;
        let isMorphing = false;
        let animationFrame: number;

        // Initial setup
        const init = () => {
            if (text1Ref.current && text2Ref.current) {
                text1Ref.current.textContent = texts[0];
                text2Ref.current.textContent = texts[1 % texts.length];
                text1Ref.current.style.opacity = "1";
                text1Ref.current.style.filter = "";
                text2Ref.current.style.opacity = "0";
                text2Ref.current.style.filter = "blur(100px)";
                text2Ref.current.style.pointerEvents = "none";
            }
        };
        init();

        const setMorph = (fraction: number) => {
            if (!text1Ref.current || !text2Ref.current) return;

            // Text 2 (fading in)
            const t2Blur = Math.min(8 / fraction - 8, 100);
            const t2Opacity = Math.pow(fraction, 0.4);
            text2Ref.current.style.filter = `blur(${t2Blur}px)`;
            text2Ref.current.style.opacity = `${t2Opacity}`;

            // Text 1 (fading out)
            const f1 = 1 - fraction;
            const t1Blur = Math.min(8 / f1 - 8, 100);
            const t1Opacity = Math.pow(f1, 0.4);
            text1Ref.current.style.filter = `blur(${t1Blur}px)`;
            text1Ref.current.style.opacity = `${t1Opacity}`;
        };

        const animate = (now: number) => {
            animationFrame = requestAnimationFrame(animate);
            const dt = (now - time) / 1000;
            time = now;

            if (isMorphing) {
                morph += dt;
                if (morph >= morphTime) {
                    isMorphing = false;
                    cooldown = cooldownTime;
                    morph = morphTime;
                }
                setMorph(Math.min(morph / morphTime, 1));
            } else {
                cooldown -= dt;
                if (cooldown <= 0) {
                    // Start morphing & swap texts
                    isMorphing = true;
                    morph = 0;
                    textIndex = (textIndex + 1) % texts.length;

                    if (text1Ref.current && text2Ref.current) {
                        text1Ref.current.textContent = texts[textIndex % texts.length];
                        text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
                        // Immediate reset to avoid 1-frame pre-flash
                        setMorph(0);
                    }
                }
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [texts, morphTime, cooldownTime]);

    return (
        <div className={cn("relative w-full flex items-center justify-center py-10", className)}>
            <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className="flex items-center justify-center w-full"
                style={{ filter: "url(#threshold)" }}
            >
                <span
                    ref={text1Ref}
                    className={cn(
                        "absolute inline-block select-none text-center whitespace-nowrap px-4 font-black tracking-tighter uppercase italic",
                        "text-5xl sm:text-7xl md:text-8xl lg:text-[10rem]",
                        "text-white",
                        textClassName
                    )}
                />
                <span
                    ref={text2Ref}
                    className={cn(
                        "absolute inline-block select-none text-center whitespace-nowrap px-4 font-black tracking-tighter uppercase italic",
                        "text-5xl sm:text-7xl md:text-8xl lg:text-[10rem]",
                        "text-white",
                        textClassName
                    )}
                />
            </div>
        </div>
    );
}
