"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

// --- INTERACTIVE STARFIELD ---

function Star({
    mousePosition,
    containerRef,
}: {
    mousePosition: { x: number | null; y: number | null };
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [initialPos] = useState({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    });

    const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    useEffect(() => {
        if (
            !containerRef.current ||
            mousePosition.x === null ||
            mousePosition.y === null
        ) {
            springX.set(0);
            springY.set(0);
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const starX =
            containerRect.left +
            (parseFloat(initialPos.left) / 100) * containerRect.width;
        const starY =
            containerRect.top +
            (parseFloat(initialPos.top) / 100) * containerRect.height;

        const deltaX = mousePosition.x - starX;
        const deltaY = mousePosition.y - starY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const radius = 600; // Radius of magnetic influence

        if (distance < radius) {
            const force = 1 - distance / radius;
            const pullX = deltaX * force * 0.5;
            const pullY = deltaY * force * 0.5;
            springX.set(pullX);
            springY.set(pullY);
        } else {
            springX.set(0);
            springY.set(0);
        }
    }, [mousePosition, initialPos, containerRef, springX, springY]);

    return (
        <motion.div
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
                top: initialPos.top,
                left: initialPos.left,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                x: springX,
                y: springY,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
            }}
        />
    );
}

export function InteractiveStarfield() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState<{
        x: number | null;
        y: number | null;
    }>({ x: null, y: null });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: null, y: null })}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        >
            {Array.from({ length: 150 }).map((_, i) => (
                <Star
                    key={`star-${i}`}
                    mousePosition={mousePosition}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
}
