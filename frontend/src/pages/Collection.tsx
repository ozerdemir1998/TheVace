import React from "react";
import { FullScreenScrollFX } from "../components/ui/full-screen-scroll-fx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const sections = [
    {
        id: "yaz",
        leftLabel: "YAZ/2026",
        title: "YAZ",
        rightLabel: "COLLECTION",
        background: "https://images.unsplash.com/photo-1523381235312-3a1647fa9917?q=80&w=2670",
    },
    {
        id: "ilkbahar",
        leftLabel: "İLKBAHAR/2026",
        title: "İLKBAHAR",
        rightLabel: "COLLECTION",
        background: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2670",
    },
    {
        id: "kis",
        leftLabel: "KIŞ/2026",
        title: "KIŞ",
        rightLabel: "COLLECTION",
        background: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670",
    },
    {
        id: "sonbahar",
        leftLabel: "SONBAHAR/2026",
        title: "SONBAHAR",
        rightLabel: "COLLECTION",
        background: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2670",
    },
];

const CollectionPage = () => {
    return (
        <div className="bg-black">
            <FullScreenScrollFX
                sections={sections.map((s) => ({
                    ...s,
                    title: (
                        <div className="flex flex-col items-center gap-8">
                            <span className="text-white drop-shadow-2xl">{s.title}</span>
                            <Link to="/products">
                                <ShinyButton className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic rounded-lg">
                                    ÜRÜNLERE GİT
                                </ShinyButton>
                            </Link>
                        </div>
                    )
                }))}
                header={<div className="text-[10px] font-black tracking-[1em] italic text-white/40 mt-16">THE VACE / SEASONAL ARCHIVE</div>}
                footer={<div className="text-[8px] font-black tracking-[0.6em] italic text-white/20 mb-8 mx-auto w-fit">© 2026 THE VACE PERFORMANCE APPAREL</div>}
                showProgress={true}
                durations={{ change: 0.8, snap: 1000 }}
                colors={{
                    text: "white",
                    overlay: "rgba(0,0,0,0.5)",
                    pageBg: "black",
                    stageBg: "black"
                }}
            />
        </div>
    );
};

export default CollectionPage;
