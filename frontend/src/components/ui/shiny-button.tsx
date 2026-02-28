"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface ShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
    children,
    className,
    onClick,
    disabled,
}) => {
    return (
        <motion.button
            {...(animationProps as any)}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
                className
            )}
        >
            <span
                className="relative block size-full text-sm uppercase tracking-wide font-light text-[rgb(255,255,255,90%)]"
                style={{
                    maskImage:
                        "linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
            <span
                style={{
                    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    maskComposite: "exclude",
                }}
                className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))] p-px"
            ></span>
        </motion.button>
    );
};
