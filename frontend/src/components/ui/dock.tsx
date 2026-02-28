import * as React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface DockProps {
    className?: string
    items: {
        icon: React.ComponentType<{ className?: string }>
        label: string
        active?: boolean
        onClick?: () => void
    }[]
}

export default function Dock({ items, className }: DockProps) {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <div className={cn("flex items-center justify-center w-full", className)}>
            <div
                onMouseLeave={() => setPosition(p => ({ ...p, opacity: 0 }))}
                className={cn(
                    "relative flex items-center gap-1 px-2 py-1.5 rounded-full",
                    "border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl"
                )}
            >
                <TooltipProvider delayDuration={100}>
                    {items.map((item) => (
                        <DockTab key={item.label} item={item} setPosition={setPosition} />
                    ))}
                    <Cursor position={position} />
                </TooltipProvider>
            </div>
        </div>
    )
}

const DockTab = ({ item, setPosition }: { item: any, setPosition: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    ref={ref}
                    onMouseEnter={() => {
                        setIsHovered(true);
                        if (!ref?.current) return;
                        const { width } = ref.current.getBoundingClientRect();
                        setPosition({
                            left: ref.current.offsetLeft,
                            width,
                            opacity: 1,
                        });
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative z-10 flex flex-col items-center"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full size-10 transition-colors duration-200 hover:bg-transparent",
                            isHovered ? "text-black" : item.active ? "text-white" : "text-white/40"
                        )}
                        onClick={() => {
                            item.onClick?.()
                        }}
                    >
                        <item.icon
                            className={cn(
                                "h-4 w-4",
                                isHovered ? "text-black" : "text-inherit"
                            )}
                        />
                    </Button>
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[8px] font-black uppercase tracking-widest bg-white text-black border-none rounded-full px-3 mb-2">
                {item.label}
            </TooltipContent>
        </Tooltip>
    );
};

const Cursor = ({ position }: { position: any }) => {
    return (
        <motion.div
            animate={position}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute z-0 h-10 rounded-full bg-white transition-opacity"
        />
    );
};
