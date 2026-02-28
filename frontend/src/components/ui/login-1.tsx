'use client'

import * as React from 'react'
import { useState } from 'react'
import { InteractiveStarfield } from '@/components/ui/starfield'
import { ShinyButton } from '@/components/ui/shiny-button'

interface InputProps {
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    type?: string;
    [key: string]: any;
}

const AppInput = (props: InputProps) => {
    const { label, placeholder, icon, type = 'text', ...rest } = props;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div className="w-full min-w-[200px] relative">
            {label &&
                <label className='block mb-2 text-sm text-[var(--color-text-primary)]'>
                    {label}
                </label>
            }
            <div className="relative w-full">
                <input
                    type={type}
                    className="peer relative z-10 border-2 border-[var(--color-border)] h-12 w-full rounded-md bg-[var(--color-surface)] px-4 text-[var(--color-text-primary)] font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:border-[var(--color-text-primary)] focus:bg-[#1a1f24] placeholder:text-[var(--color-text-secondary)] placeholder:font-medium"
                    placeholder={placeholder}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    {...rest}
                />
                {isHovering && (
                    <>
                        <div
                            className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
                            style={{
                                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, var(--color-text-primary) 0%, transparent 70%)`,
                            }}
                        />
                        <div
                            className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
                            style={{
                                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, var(--color-text-primary) 0%, transparent 70%)`,
                            }}
                        />
                    </>
                )}
                {icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-[var(--color-text-secondary)]">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    )
}

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Auth State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const payload = isLogin ? { email, password } : { name, email, password };

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Bir hata oluştu.');
            } else {
                localStorage.setItem('vace_token', data.token);
                // Redirect user or update global state here
                window.location.href = '/';
            }
        } catch (err) {
            setError('Sunucuya bağlanılamadı.');
        } finally {
            setLoading(false);
        }
    };

    const socialIcons = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" /></svg>,
            href: '#',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z" /></svg>,
            href: '#',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z" /></svg>,
            href: '#',
        }
    ];

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
            <InteractiveStarfield />
            <div className='card w-full max-w-4xl flex flex-col md:flex-row h-auto md:h-[650px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] relative z-10'>
                <div
                    className='w-full md:w-1/2 px-8 py-12 md:px-16 md:py-16 left h-full relative overflow-hidden bg-black'
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>

                    <div
                        className={`absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-[80px] transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
                        }}
                    />

                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <form className='text-center flex flex-col gap-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter text-[var(--color-heading)] uppercase'>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </h1>
                                <div className="flex items-center justify-center mt-2">
                                    <ul className="flex gap-4">
                                        {socialIcons.map((social, index) => (
                                            <li key={index}>
                                                <a
                                                    href={social.href}
                                                    className="w-10 h-10 bg-[var(--color-surface)] rounded-full flex justify-center items-center border border-[var(--color-border)] hover:border-[var(--color-text-primary)] transition-all duration-300 group"
                                                >
                                                    <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] group-hover:scale-110 transition-all">
                                                        {social.icon}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <span className='text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mt-4 italic'>
                                    {isLogin ? 'or use your account' : 'or register with email'}
                                </span>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm font-bold bg-red-500/10 p-2 rounded-md border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            {/* Fixed height container for inputs to prevent layout shifts */}
                            <div className='flex flex-col gap-4 items-center justify-center min-h-[180px]'>
                                {!isLogin && (
                                    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
                                        <AppInput
                                            placeholder="Full Name"
                                            type="text"
                                            value={name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="w-full">
                                    <AppInput
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <AppInput
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="h-5 flex items-center justify-center">
                                    {isLogin && (
                                        <a href="#" className='text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium animate-in fade-in duration-300'>
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>

                                <div className='flex flex-col gap-4 justify-center items-center'>
                                    <ShinyButton
                                        className="w-full py-3 text-xs font-black uppercase tracking-widest rounded-md"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Lütfen Bekleyin...' : (isLogin ? 'Sign In' : 'Sign Up')}
                                    </ShinyButton>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setError('');
                                        }}
                                        className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors italic"
                                    >
                                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='hidden md:block w-1/2 right h-full overflow-hidden relative border-l border-[var(--color-border)]'>
                    <img
                        src={isLogin
                            ? 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80'
                            : 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80'}
                        alt="Auth visual"
                        className="w-full h-full object-cover transition-all duration-1000 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                    <div className="absolute bottom-12 right-12 text-right">
                        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
                            {isLogin ? 'Beyond' : 'Future'}
                        </h2>
                        <p className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px] mt-2 italic shadow-black drop-shadow-md">
                            {isLogin ? 'Industrial Era' : 'Modular Performance'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
