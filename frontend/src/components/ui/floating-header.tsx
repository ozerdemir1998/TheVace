"use client";

import React, { useState, useRef } from 'react';
import { MenuIcon, User, ShoppingBag, Search, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingHeader() {
    const [open, setOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const links = [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Ürünler', href: '/products' },
        { label: 'Koleksiyon', href: '/collection' },
        { label: 'Yeni Gelenler', href: '/new-arrivals' },
        { label: 'Hakkımızda', href: '/about' },
    ];

    return (
        <header className="relative z-10 w-full pointer-events-none">
            <div className="mx-auto flex items-center justify-center w-full">
                {/* Unified Single Pill */}
                <div
                    onMouseLeave={() => setPosition(p => ({ ...p, opacity: 0 }))}
                    className="relative flex items-center gap-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full p-1 shadow-2xl pointer-events-auto"
                >


                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Tab key={link.label} link={link} location={location} setPosition={setPosition} />
                        ))}
                    </div>

                    {/* Action Items */}
                    <div className="flex items-center gap-1">
                        <ActionTab
                            icon={User}
                            onClick={() => navigate("/auth")}
                            setPosition={setPosition}
                            active={location.pathname === "/auth"}
                        />
                        <Link to="/cart" className="z-10">
                            <ActionTab
                                icon={ShoppingBag}
                                setPosition={setPosition}
                            />
                        </Link>
                        {/* Search icon - inside the pill, hidden when search is open */}
                        {!isSearchOpen && (
                            <ActionTab
                                icon={Search}
                                onClick={() => setIsSearchOpen(true)}
                                setPosition={setPosition}
                            />
                        )}
                    </div>

                    {/* Shared Cursor */}
                    <Cursor position={position} />

                    {/* Mobile Toggle */}
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-white/60 hover:text-white rounded-full size-9 z-10"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
                </div>

                {/* Search box - expands to the right outside the pill */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                            animate={{ width: 280, opacity: 1, marginLeft: 8 }}
                            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            style={{ transformOrigin: "left center" }}
                            className="overflow-hidden pointer-events-auto"
                        >
                            <div className="flex items-center w-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full overflow-hidden shadow-2xl">
                                <input
                                    autoFocus
                                    placeholder="Ara..."
                                    className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder:text-white/30 px-4 py-2 font-bold text-xs tracking-wide"
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setIsSearchOpen(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="size-8 mr-0.5 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors shrink-0"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent
                        className="bg-black/95 backdrop-blur-2xl border-white/5 gap-0 text-white"
                        showClose={false}
                        side="left"
                    >
                        <div className="grid gap-y-4 overflow-y-auto px-8 pt-20 pb-5">
                            <h2 className="text-3xl font-black italic tracking-tighter mb-8 text-white uppercase italic">THE VACE</h2>
                            {[...links, { label: 'Giriş Yap', href: '/auth' }].map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-xl font-black tracking-tighter h-14 hover:bg-white/5 rounded-2xl text-white')}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

const Tab = ({ link, location, setPosition }: { link: any, location: any, setPosition: any }) => {
    const ref = useRef<any>(null);
    const isActive = location.pathname + location.hash === link.href;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    return (
        <Link
            ref={ref as any}
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
            className={cn(
                "relative z-10 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-colors duration-200 h-9 px-4 flex items-center justify-center bg-transparent hover:bg-transparent",
                isHovered ? "text-black" : isActive ? "text-white" : "text-white/40 shadow-none border-none outline-none"
            )}
            to={link.href}
        >
            <div className="relative flex flex-col items-center">
                {link.label}
                {link.label === 'Yeni Gelenler' && (
                    <div
                        className={cn(
                            "absolute -bottom-1 h-[1px] w-full blinking-line transition-colors duration-200",
                            isHovered ? "bg-black" : "bg-white"
                        )}
                    />
                )}
            </div>
        </Link>
    );
};

const ActionTab = ({ icon: Icon, onClick, setPosition, active, isSearchTrigger }: { icon: any, onClick?: () => void, setPosition: any, active?: boolean, isSearchTrigger?: boolean }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            ref={ref}
            size="icon"
            variant="ghost"
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
            onClick={onClick}
            className={cn(
                "relative z-10 rounded-full transition-colors duration-200 size-9 bg-transparent hover:bg-transparent border-none shadow-none outline-none",
                isHovered ? "text-black" : active ? "text-white" : "text-white/40"
            )}
        >
            {isSearchTrigger && active ? (
                <X className={cn("size-4", isHovered ? "text-black" : "text-inherit")} />
            ) : (
                <Icon className={cn("size-4", isHovered ? "text-black" : "text-inherit")} />
            )}
        </Button>
    );
};

const Cursor = ({ position }: { position: any }) => {
    return (
        <motion.div
            animate={position}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute z-0 h-9 rounded-full bg-white transition-opacity"
        />
    );
};
