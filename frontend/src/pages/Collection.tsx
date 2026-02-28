import React, { useState, useEffect } from "react";
import { FullScreenScrollFX } from "../components/ui/full-screen-scroll-fx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const CollectionPage = () => {
    const [sections, setSections] = useState<any[]>([]);

    useEffect(() => {
        const loadCollections = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();

                const getHeroImage = (offset: number) => {
                    return data[offset] ? data[offset].imageUrl : `https://raw.githubusercontent.com/ozerdemir1998/TheVace/main/imagesToPushGithub/${offset + 1}.png`;
                };

                setSections([
                    {
                        id: "yaz",
                        leftLabel: "YAZ/2026",
                        title: "YAZ",
                        rightLabel: "COLLECTION",
                        background: getHeroImage(5),
                    },
                    {
                        id: "ilkbahar",
                        leftLabel: "İLKBAHAR/2026",
                        title: "İLKBAHAR",
                        rightLabel: "COLLECTION",
                        background: getHeroImage(12),
                    },
                    {
                        id: "kis",
                        leftLabel: "KIŞ/2026",
                        title: "KIŞ",
                        rightLabel: "COLLECTION",
                        background: getHeroImage(18),
                    },
                    {
                        id: "sonbahar",
                        leftLabel: "SONBAHAR/2026",
                        title: "SONBAHAR",
                        rightLabel: "COLLECTION",
                        background: getHeroImage(24),
                    },
                ]);
            } catch (err) {
                console.error("Failed to load collections", err);
            }
        };
        loadCollections();
    }, []);

    if (sections.length === 0) return <div className="bg-black w-full h-screen" />;

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
