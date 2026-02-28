"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { LayoutGrid, Shirt, Ghost, Ruler } from "lucide-react"

const categories = [
    {
        id: "all",
        label: "Tümü",
        description: "Tüm koleksiyonu tek bir yerde keşfedin.",
        icon: LayoutGrid,
    },
    {
        id: "Tişört",
        label: "Tişört",
        description: "Nefes alan kumaşlarla performansınızı artırın.",
        icon: Shirt,
    },
    {
        id: "Kapşonlu Sweat",
        label: "Hoodie",
        description: "Şıklığı ve sıcaklığı antrenmanlarınıza taşıyın.",
        icon: Ghost,
    },
    {
        id: "Uzun Kollu Tişört",
        label: "Alt Giyim",
        description: "Hareket özgürlüğü sunan modern tasarımlar.",
        icon: Ruler,
    },
]

interface CategoryFilterProps {
    onCategoryChange: (id: string) => void
    activeCategory: string
}

export function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [displayedDesc, setDisplayedDesc] = useState(categories[0].description)
    const [displayedLabel, setDisplayedLabel] = useState(categories[0].label)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    useEffect(() => {
        const idx = categories.findIndex(c => c.id === activeCategory)
        if (idx !== -1) setActiveIndex(idx)
    }, [activeCategory])

    const handleSelect = (index: number) => {
        if (index === activeIndex || isAnimating) return
        setIsAnimating(true)

        setTimeout(() => {
            setDisplayedDesc(categories[index].description)
            setDisplayedLabel(categories[index].label)
            setActiveIndex(index)
            onCategoryChange(categories[index].id)
            setTimeout(() => setIsAnimating(false), 400)
        }, 200)
    }

    return (
        <div className="flex flex-col items-center gap-10 py-16 w-full">
            {/* Dynamic Info Container */}
            <div className="relative px-8 min-h-[100px] flex flex-col items-center justify-center">
                <span className="absolute -left-2 top-0 text-7xl font-serif text-white/[0.03] select-none pointer-events-none italic">
                    THE
                </span>

                <p
                    className={cn(
                        "text-2xl md:text-3xl font-black text-white text-center max-w-lg leading-tight transition-all duration-400 ease-out italic uppercase tracking-tighter",
                        isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
                    )}
                >
                    {displayedDesc}
                </p>

                <span className="absolute -right-2 bottom-0 text-7xl font-serif text-white/[0.03] select-none pointer-events-none italic">
                    VACE
                </span>
            </div>

            <div className="flex flex-col items-center gap-6 mt-2">
                {/* Label text */}
                <p
                    className={cn(
                        "text-[10px] text-white/40 font-black tracking-[0.4em] uppercase transition-all duration-500 ease-out",
                        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
                    )}
                >
                    {displayedLabel}
                </p>

                <div className="flex items-center justify-center gap-3">
                    {categories.map((category, index) => {
                        const Icon = category.icon
                        const isActive = activeIndex === index
                        const isHovered = hoveredIndex === index && !isActive
                        const showName = isActive || isHovered

                        return (
                            <button
                                key={category.id}
                                onClick={() => handleSelect(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={cn(
                                    "relative flex items-center gap-0 rounded-full cursor-pointer",
                                    "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                    isActive ? "bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-white/5 hover:bg-white/10",
                                    showName ? "pr-5 pl-3 py-3" : "p-3",
                                )}
                            >
                                {/* Icon with scaling animation */}
                                <div className="relative flex-shrink-0">
                                    <Icon
                                        className={cn(
                                            "w-5 h-5 transition-all duration-500",
                                            isActive ? "text-black scale-110" : "text-white/60",
                                        )}
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                        showName ? "grid-cols-[1fr] opacity-100 ml-3" : "grid-cols-[0fr] opacity-0 ml-0",
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <span
                                            className={cn(
                                                "text-[10px] font-black uppercase tracking-widest whitespace-nowrap block",
                                                "transition-colors duration-300",
                                                isActive ? "text-black" : "text-white/80",
                                            )}
                                        >
                                            {category.label}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
