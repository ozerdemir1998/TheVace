import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface iCardItem {
    title: string;
    description: string;
    tag: string;
    src: string;
    link: string;
    color: string;
    textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "tag"> {
    i: number;
    src: string;
}

const Card: FC<iCardProps> = ({
    title,
    description,
    color,
    textColor,
    link,
    i,
    src,
}) => {
    return (
        <div className="h-[100vh] flex items-center justify-center sticky top-0 md:p-0 px-4 -mt-[15vh]">
            <Link to={link} className="block group w-full flex justify-center">
                <div
                    className="relative flex flex-col h-[400px] w-full max-w-[900px] py-12 px-10 md:px-12
                    rotate-0 md:h-[600px] md:w-[800px] items-center justify-center mx-auto 
                    shadow-2xl pr-3 pl-3 pt-3 pb-4 transition-shadow duration-700 ease-out group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-xl overflow-hidden"
                    style={{ backgroundColor: color }}
                >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                            className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                            src={src}
                            alt={title}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                    </div>
                    <span className="font-bold relative text-5xl md:text-7xl mt-5 z-20">
                        <span
                            className="relative z-10 font-black tracking-tighter uppercase italic drop-shadow-2xl"
                            style={{ color: textColor }}
                        >
                            {title}
                        </span>
                    </span>
                    <div
                        className="text-[10px] md:text-sm font-black text-center mb-0 z-20 mt-4 uppercase tracking-[0.4em] italic drop-shadow-xl"
                        style={{ lineHeight: 1.4, color: textColor }}
                    >
                        {description}
                    </div>
                </div>
            </Link>
        </div>
    );
};

interface iCardSlideProps {
    items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
    return (
        <div className="min-h-screen relative w-full pt-[15vh]">
            {items.map((project, i) => {
                return (
                    <Card
                        key={`p_${i}`}
                        {...project}
                        i={i}
                    />
                );
            })}
        </div>
    );
};

export { CardsParallax };
