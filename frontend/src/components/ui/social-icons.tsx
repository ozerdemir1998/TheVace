'use client';

import React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

const iconVariants: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: {
            duration: 0.4,
            opacity: { duration: 0.1 },
        },
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
        pathOffset: [1, 0],
        transition: {
            duration: 0.6,
            ease: 'linear',
            opacity: { duration: 0.1 },
        },
    },
};

interface SocialIconProps {
    children: React.ReactNode;
    href: string;
}

const SocialIcon = ({ children, href }: SocialIconProps) => {
    const controls = useAnimation();

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer select-none p-3 hover:bg-white/5 rounded-full transition-colors duration-200 flex items-center justify-center border border-white/5 hover:border-white/10"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/40 hover:text-white transition-colors"
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<any>, {
                            variants: iconVariants,
                            animate: controls,
                            initial: "normal"
                        });
                    }
                    return child;
                })}
            </svg>
        </a>
    );
};

export const FacebookIcon = () => (
    <SocialIcon href="#">
        <motion.path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </SocialIcon>
);

export const InstagramIcon = () => (
    <SocialIcon href="#">
        <motion.path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <motion.rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <motion.line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </SocialIcon>
);

export const TwitterIcon = () => (
    <SocialIcon href="#">
        <motion.path d="M22 4s-1 2.17-2 4c2 .83 4 1 4 1s-2.5 1.17-2 3c0 7-9 13-17 13 0 0-3-1-3-4 5-1 9-5 9-5H8l-5-4h7s-1-3 1-5c0 0 3.5 1.5 5 1 0 0-1.5-3.17 1-4.5h2z" />
    </SocialIcon>
);

export const LinkedinIcon = () => (
    <SocialIcon href="#">
        <motion.path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <motion.rect x="2" y="9" width="4" height="12" />
        <motion.circle cx="4" cy="4" r="2" />
    </SocialIcon>
);

export const SocialIcons = () => {
    return (
        <div className="flex gap-4">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedinIcon />
        </div>
    );
};
