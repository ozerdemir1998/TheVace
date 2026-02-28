"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Scale: Starts at normal size, grows significantly as we scroll
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

    // Opacity: Visible from the start, fades only at the very end of the section transition
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.2]);

    // Rotation: Flattens out early
    const rotate = useTransform(scrollYProgress, [0, 0.3], [10, 0]);

    // Translation: Card slides up as we scroll
    const translateY = useTransform(scrollYProgress, [0, 1], [0, -300]);

    // Title: Moves up and fades out
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const titleTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

    return (
        <div
            className="h-[150vh] relative bg-black"
            ref={containerRef}
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div
                    className="w-full relative flex flex-col items-center justify-center"
                    style={{
                        perspective: "1000px",
                    }}
                >
                    <Header
                        translateY={titleTranslateY}
                        opacity={titleOpacity}
                        titleComponent={titleComponent}
                    />
                    <Card rotate={rotate} scale={scale} opacity={opacity} translateY={translateY}>
                        {children}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export const Header = ({ translateY, opacity, titleComponent }: any) => {
    return (
        <motion.div
            style={{
                translateY,
                opacity,
            }}
            className="max-w-5xl mx-auto text-center z-50 absolute top-[15%]"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
    rotate,
    scale,
    opacity,
    translateY,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    opacity: MotionValue<number>;
    translateY: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                opacity,
                translateY,
            }}
            className="max-w-4xl mx-auto h-[45rem] md:h-[55rem] w-full p-4 relative z-0 overflow-visible"
        >
            <div className="h-full w-full rounded-[40px] bg-black">
                {children}
            </div>
        </motion.div>
    );
};
