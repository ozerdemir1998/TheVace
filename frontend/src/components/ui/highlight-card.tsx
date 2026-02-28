"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming cn utility is from "@/lib/utils"

interface ComponentProps {
    title: string;
    description: string | string[];
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon, children, className }) => {
    const descriptionArray = Array.isArray(description)
        ? description
        : description
            ? [description]
            : [];

    return (
        <div className={cn("group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 w-full flex flex-col", className)}>
            <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-white/25 hover:shadow-white/5 hover:shadow-3xl w-full flex-1 flex flex-col">


                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping"></div>
                    <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>

                {children ? (
                    <div className="relative z-10 w-full h-full">
                        {children}
                    </div>
                ) : (
                    <div className="p-16 sm:p-24 relative z-10 flex flex-col items-center text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
                            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>

                            <div className="p-10 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-white/20">
                                <div className="transform group-hover:rotate-180 transition-transform duration-700">
                                    {icon}
                                </div>
                            </div>
                        </div>

                        <h3 className="mb-6 text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse transform group-hover:scale-105 transition-transform duration-300">
                            {title}
                        </h3>

                        <div className="space-y-2 max-w-xl">
                            {descriptionArray.map((line, idx) => (
                                <p
                                    key={idx}
                                    className="text-gray-300 text-base sm:text-lg leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300"
                                >
                                    {line}
                                </p>
                            ))}
                        </div>

                        <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse"></div>

                    </div>
                )}


                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
        </div>
    );
};

export default HighlightCard;
