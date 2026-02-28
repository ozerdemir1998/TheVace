"use client";

import { ComponentProps, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
    flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
    return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
    keys: string[];
    showClass?: string;
    hideClass?: string;
} & ComponentProps<"div">;

export const FlipReveal = ({ keys, hideClass = "", showClass = "", ...props }: FlipRevealProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isShow = (key: string | null) => !!key && (keys.includes("all") || keys.includes(key));

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            const items = gsap.utils.toArray<HTMLDivElement>("[data-flip]");

            // Get state before changes
            const state = Flip.getState(items, {
                props: "opacity,scale",
                simple: true
            });

            // Toggle visibility
            items.forEach((item) => {
                const key = item.getAttribute("data-flip");
                if (isShow(key)) {
                    item.classList.add(showClass);
                    item.classList.remove(hideClass);
                } else {
                    item.classList.remove(showClass);
                    item.classList.add(hideClass);
                }
            });

            // Smoothly animate the layout shift
            Flip.from(state, {
                duration: 0.6,
                ease: "expo.out",
                stagger: 0.05,
                scale: true,
                onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }),
                onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
                // Do not use absolute: true here, it causes the height jump
                // We let Flip handle the relative layout shift which is safer for scroll positions
            });
        },
        { scope: wrapperRef, dependencies: [keys] },
    );

    return (
        <div
            {...props}
            ref={wrapperRef}
            className={cn("w-full transition-all duration-500", props.className)}
        />
    );
};
