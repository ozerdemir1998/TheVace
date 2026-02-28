"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
    className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const [isDark, setIsDark] = useState(true)

    return (
        <div
            className={cn(
                "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
                isDark
                    ? "bg-zinc-950 border border-zinc-800"
                    : "bg-white border border-zinc-200",
                className
            )}
            onClick={() => setIsDark(!isDark)}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center w-full relative">
                <div
                    className={cn(
                        "flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 z-10",
                        isDark
                            ? "transform translate-x-0 bg-zinc-800 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                            : "transform translate-x-8 bg-zinc-100 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                    )}
                >
                    {isDark ? (
                        <Moon
                            className="w-3.5 h-3.5 text-white fill-white/10"
                            strokeWidth={2}
                        />
                    ) : (
                        <Sun
                            className="w-3.5 h-3.5 text-orange-500 fill-orange-500/10"
                            strokeWidth={2}
                        />
                    )}
                </div>

                {/* Background Icons */}
                <div className="absolute inset-0 flex justify-between px-1.5 items-center pointer-events-none opacity-40">
                    {!isDark && <Moon className="w-3.5 h-3.5 text-zinc-400" />}
                    {isDark && <Sun className="w-3.5 h-3.5 text-zinc-600" />}
                </div>
            </div>
        </div>
    )
}
