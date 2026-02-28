"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextStaggerHoverProps {
    text: string
    index: number
    id?: string
}
interface HoverSliderImageProps {
    index: number
    imageUrl: string
}
interface HoverSliderProps {
    onSlideChange?: (id: string) => void
    initialActive?: number
}
interface HoverSliderContextValue {
    activeSlide: number
    changeSlide: (index: number, id?: string) => void
}
function splitText(text: string) {
    const words = text.split(" ").map((word) => word.concat(" "))
    const characters = words.map((word) => word.split("")).flat(1)

    return {
        words,
        characters,
    }
}

const HoverSliderContext = React.createContext<
    HoverSliderContextValue | undefined
>(undefined)
function useHoverSliderContext() {
    const context = React.useContext(HoverSliderContext)
    if (context === undefined) {
        throw new Error(
            "useHoverSliderContext must be used within a HoverSliderProvider"
        )
    }
    return context
}

export const HoverSlider = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, onSlideChange, initialActive = 0, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState<number>(initialActive)
    const changeSlide = React.useCallback(
        (index: number, id?: string) => {
            setActiveSlide(index);
            if (onSlideChange && id) {
                onSlideChange(id);
            }
        },
        [onSlideChange]
    )
    return (
        <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
            <section className={className} ref={ref as any} {...props}>{children}</section>
        </HoverSliderContext.Provider>
    )
})
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, id, children, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    const { characters } = splitText(text)
    const isActive = activeSlide === index
    const handleMouse = () => changeSlide(index, id)
    return (
        <span
            className={cn(
                "relative inline-block origin-bottom overflow-hidden focus:outline-none",
                className
            )}
            {...props}
            ref={ref as any}
            onMouseEnter={handleMouse}
        >
            {characters.map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    className="relative inline-block"
                >
                    <MotionConfig
                        transition={{
                            delay: index * 0.015,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <motion.span
                            className="inline-block"
                            initial={{ y: "0%" }}
                            animate={isActive ? { y: "-110%", opacity: 1 } : { y: "0%", opacity: 0.2 }}
                        >
                            {char === " " ? <>&nbsp;</> : char}
                        </motion.span>

                        <motion.span
                            className="absolute left-0 top-0 inline-block font-black italic"
                            initial={{ y: "110%" }}
                            animate={isActive ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                        >
                            {char === " " ? <>&nbsp;</> : char}
                        </motion.span>
                    </MotionConfig>
                </span>
            ))}
        </span>
    )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
    visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    },
    hidden: {
        clipPath: "inset(100% 0% 0% 0%)",
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    },
}

export const HoverSliderImageWrap = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full shadow-2xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
    HTMLImageElement,
    HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext()
    return (
        <motion.img
            className={cn("inline-block align-middle grayscale-[0.5]", className)}
            variants={clipPathVariants}
            animate={activeSlide === index ? "visible" : "hidden"}
            ref={ref}
            {...props}
        />
    )
})
HoverSliderImage.displayName = "HoverSliderImage"
