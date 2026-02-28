import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { EtheralShadow } from '@/components/ui/etheral-shadow';
import { Mail, MapPin } from 'lucide-react';
import { SocialIcons } from '@/components/ui/social-icons';
import { MagneticText } from '@/components/ui/morphing-cursor';
import { Globe } from '@/components/ui/globe';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AnimatedFooterText } from '@/components/ui/animated-footer-text';

import HighlightCard from '@/components/ui/highlight-card';

const About = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const globeVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
    }

    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden pt-32">
            <div className="absolute inset-0 z-0">
                <EtheralShadow
                    color="rgba(255, 255, 255, 0.25)"
                    animation={{ scale: 90, speed: 60 }}
                    noise={{ opacity: 0.8, scale: 1.5 }}
                    sizing="fill"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center pb-20">

                {/* Top Section - Always visible on load */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full flex flex-col items-center mb-40"
                    style={{ perspective: "900px" }}
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="mb-24 pt-10 flex flex-col items-center justify-center gap-8 w-full">
                        <div className="animate-holo-wobble flex items-center justify-center">
                            <img
                                src="/assets/images/gorilla-logo.png"
                                alt="The Vace Logo"
                                className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_10px_22px_rgba(255,255,255,0.15)]"
                                style={{ transform: "translateZ(30px)" }}
                            />
                        </div>
                        <MagneticText
                            text="BİZ KİMİZ?"
                            hoverText="THE VACE"
                        />
                    </motion.div>

                    {/* Brand Philosophy */}
                    <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 w-full">
                        <div className="space-y-6 flex flex-col items-center">
                            <h2 className="text-xl font-black uppercase tracking-[0.4em] text-white/40 italic">The Philosophy</h2>
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/80 max-w-md text-center">
                                THE VACE, endüstriyel estetik ile yüksek performansı birleştiren, fütüristik bir moda hareketidir. Biz sadece kıyafet üretmiyoruz; geleceğin performans standartlarını bugünün sokak stiliyle harmanlıyoruz.
                            </p>
                        </div>
                        <div className="space-y-6 flex flex-col items-center">
                            <h2 className="text-xl font-black uppercase tracking-[0.4em] text-white/40 italic">Industrial Soul</h2>
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/80 max-w-md text-center">
                                Tasarımlarımızdaki keskin hatlar, modüler yapılar ve dayanıklı materyaller, modern metropolün karmaşasına karşı bir duruş sergiler. Her parça, "Industrial Performance" mottosunun bir yansımasıdır.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact & Social Section - Unified Animation Block */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    className="border-t border-white/10 pt-20 w-full flex flex-col items-center"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl font-black uppercase tracking-widest mb-16 italic text-center">
                        Connect with us
                    </motion.h2>

                    {/* Interactive Globe Container */}
                    <motion.div
                        variants={globeVariants}
                        className="relative flex w-full max-w-lg aspect-square items-center justify-center overflow-hidden rounded-full mb-16"
                    >
                        <Globe />
                        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center justify-center gap-12 w-full pt-4"
                    >
                        {/* Contact Info Cards */}
                        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8 justify-center items-stretch">
                            {/* Email Card */}
                            <div className="w-full md:w-1/2 flex">
                                <HighlightCard title="" description="" className="h-full">
                                    <div className="flex flex-col items-center justify-center p-12 sm:p-20 gap-6 group cursor-pointer text-center h-full">
                                        <div className="p-8 bg-white/5 rounded-full group-hover:bg-white group-hover:text-black transition-all shadow-xl hover:shadow-white/20 hover:scale-110">
                                            <Mail size={40} />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-end">
                                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-white/30 mb-3 mt-4">Email</h3>
                                            <p className="font-bold tracking-tight text-xl sm:text-2xl">info@thevace.com</p>
                                        </div>
                                    </div>
                                </HighlightCard>
                            </div>

                            {/* Location/HQ Card */}
                            <div className="w-full md:w-1/2 flex">
                                <HighlightCard title="" description="" className="h-full">
                                    <div className="flex flex-col items-center justify-center p-12 sm:p-20 gap-6 group cursor-pointer text-center h-full">
                                        <div className="p-8 bg-white/5 rounded-full group-hover:bg-white group-hover:text-black transition-all shadow-xl hover:shadow-white/20 hover:scale-110">
                                            <MapPin size={40} />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-end">
                                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-white/30 mb-3 mt-4">KONUM</h3>
                                            <p className="font-bold tracking-tight text-xl sm:text-2xl uppercase leading-relaxed">ISTANBUL</p>
                                        </div>
                                    </div>
                                </HighlightCard>
                            </div>
                        </div>

                        {/* Social Icons Sidebar Styled */}
                        <div className="flex items-center justify-center pt-4">
                            <SocialIcons />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Global Site Footer */}
            <footer className="w-full py-40 px-6 flex flex-col items-center gap-20 bg-black relative z-10 border-t border-white/[0.02]">
                {/* 1. Logo & Title (Top) */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-[-1rem]">
                        <img
                            src="/assets/images/gorilla-logo.png"
                            alt="The Vace Logo"
                            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] animate-holo-wobble"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-6xl font-black italic tracking-tighter mb-4">THE VACE</h2>
                        <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em] italic mt-6">Evolutionary Industrial Performance</p>
                    </div>
                </div>

                {/* 2. Animated Footer Text (Vertical Stack) */}
                <div className="w-full max-w-4xl mt-16">
                    <AnimatedFooterText />
                </div>

                {/* 3. Social Section (Stacked Circular style) */}
                <div className="flex flex-col items-center mt-8">
                    <div className="flex gap-6">
                        <SocialIcons />
                    </div>
                </div>


                {/* 5. Copyright */}
                <div className="text-center space-y-2 opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                        © 2026 THE VACE PERFORMANCE INC.
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-[0.8em]">All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;
