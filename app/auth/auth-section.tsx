"use client";
import React, { useState } from 'react';
import {
    Sun,
    Moon,
    Eye,
    EyeOff,
    ArrowLeft,
    AlertTriangle,
    X,
    Sparkles,
    Lock,
    Mail,
    ShieldCheck,
    FileText,
    HelpCircle,
    ExternalLink
} from 'lucide-react';
import { ModeToggle } from '../../components/providers/mode-toggle';
import { IconBrandGoogle } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';


export default function AuthSection() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showDevModal, setShowDevModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

    const handleActionAttempt = (e?: { preventDefault: () => void }) => {
        if (e) e.preventDefault();
        setShowDevModal(true);
    };

    return (
        <div className="min-h-screen w-full font-sans flex flex-col justify-between transition-colors duration-300 bg-[#EBE9E5] text-gray-900  dark:bg-black dark:text-gray-100">
            {/* Main Auth Container - Kartın dikeyde tam boy ve tok durması için minimum yükseklik ve dikey oran eklendi */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full">
                <div className="w-full max-w-6xl min-h-[700px] lg:h-[82vh] rounded-3xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 border bg-[#EFEFEF] border-neutral-300/80 shadow-gray-400/20 dark:bg-[#050505] dark:border-white/10 dark:shadow-black/80">

                    {/* Left Side - Image Container (h-full ile kart yüksekliğini tamamen doldurur) */}
                    <div className="lg:col-span-6 relative h-full min-h-[350px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 overflow-hidden group">
                        <img
                            src="/auth.jpg"
                            alt="Miransas Auth Hero"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* Bottom Content Area */}
                        <div className="relative z-10 mt-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3 backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                                Vocal & AI Convergence
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                                Next-Gen Human & Artificial Intelligence
                            </h2>
                            <p className="mt-2 text-xs sm:text-sm text-gray-300/90 max-w-md line-clamp-2">
                                Sign in with your Miransas account to access real-time audio synthesis, intelligence layers, and neural data workflows.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Auth Form Card (h-full ile dikeyde tam doldurur) */}
                    <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full transition-colors bg-[#F5F4F0] dark:bg-[#0A0A0A] overflow-y-auto">
                        <div className="max-w-md mx-auto w-full my-auto py-4">

                            {/* Form Title */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">
                                    {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {activeTab === 'login' ? (
                                        <>
                                            Don't have an account?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab('signup')}
                                                className="text-amber-600 hover:text-amber-500 dark:text-amber-500 dark:hover:text-amber-400 font-semibold underline underline-offset-4 transition-colors"
                                            >
                                                Sign up
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab('login')}
                                                className="text-amber-600 hover:text-amber-500 dark:text-amber-500 dark:hover:text-amber-400 font-semibold underline underline-offset-4 transition-colors"
                                            >
                                                Sign in
                                            </button>
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleActionAttempt} className="space-y-4">

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@miransas.com"
                                            onClick={handleActionAttempt}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all outline-none border bg-white border-neutral-300 text-gray-900 placeholder-gray-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm dark:bg-[#121212] dark:border-neutral-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500/80 dark:focus:ring-1 dark:focus:ring-amber-500/80"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            onClick={handleActionAttempt}
                                            className="w-full pl-10 pr-12 py-3 rounded-xl text-sm transition-all outline-none border bg-white border-neutral-300 text-gray-900 placeholder-gray-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm dark:bg-[#121212] dark:border-neutral-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-amber-500/80 dark:focus:ring-1 dark:focus:ring-amber-500/80"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password Row */}
                                <div className="flex items-center justify-between text-xs pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => {
                                                setRememberMe(e.target.checked);
                                                handleActionAttempt();
                                            }}
                                            className="w-4 h-4 rounded border-gray-400 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 bg-transparent cursor-pointer dark:border-gray-600"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300">Remember me</span>
                                    </label>

                                    <button
                                        type="button"
                                        onClick={handleActionAttempt}
                                        className="text-amber-600 hover:text-amber-500 dark:text-amber-500 dark:hover:text-amber-400 font-medium hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Primary Action Button */}
                                <button
                                    type="submit"
                                    onClick={handleActionAttempt}
                                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all transform active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white shadow-black/10 dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-black dark:shadow-amber-500/10"
                                >
                                    <span>{activeTab === 'login' ? 'Sign In' : 'Sign Up'}</span>
                                </button>
                            </form>

                            {/* Separator */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-300 dark:border-neutral-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="px-3 font-medium bg-[#F5F4F0] text-gray-400 dark:bg-[#0A0A0A] dark:text-gray-500">
                                        or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Logins */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleActionAttempt}
                                    className="py-2.5 px-4 cursor-pointer rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-white hover:bg-neutral-50 border-neutral-300 text-gray-800 shadow-sm dark:bg-[#121212] dark:hover:bg-[#1a1a1a] dark:border-neutral-800 dark:text-gray-200"
                                >
                                    <IconBrandGoogle className="w-4 h-4" />
                                    <span>Google</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleActionAttempt}
                                    className="py-2.5 px-4 cursor-pointer rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-white hover:bg-neutral-50 border-neutral-300 text-gray-800 shadow-sm dark:bg-[#121212] dark:hover:bg-[#1a1a1a] dark:border-neutral-800 dark:text-gray-200"
                                >
                                   {/* <GitHub /> */}
                                   <IconBrandGithub stroke={2} />
                                    <span>GitHub</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="w-full py-4 px-6 border-t text-xs transition-colors bg-[#EFEFEF] border-neutral-300/80 text-gray-600 dark:bg-[#050505] dark:border-white/10 dark:text-gray-300">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className=" dark:bg-background bg-[#000000] rounded-2xl  flex items-center justify-center ">
                            <img
                                src="https://raw.githubusercontent.com/Miransas/miransas/main/public/icons/logo.png"
                                className="w-9 object-contain"
                                alt="Miransas Logo "
                            />
                        </div>
                        <span className=" tracking-wider uppercase font-black ">MIRANSAS</span>
                        <span className="opacity-40">|</span>
                        <span> © 2026</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-6 font-medium">
                        <a
                            href="/privacy-policy"
                            className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center gap-1"
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Privacy Policy</span>
                        </a>

                        <a
                            href="/terms-of-service"
                            className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center gap-1"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Terms of Service</span>
                        </a>

                        <a
                            href="https://docs.miransas.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center gap-1"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Documentation</span>
                        </a>

                        <a
                            href="/support"
                            className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center gap-1"
                        >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Support & Status</span>
                        </a>
                        <ModeToggle/>
                    </nav>
                </div>
            </footer>

            {/* Dev Modal */}
            {showDevModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all transform scale-100 bg-white border-amber-500/30 text-gray-900 dark:bg-[#0A0A0A] dark:border-amber-500/40 dark:text-white">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                                <AlertTriangle className="w-6 h-6 animate-bounce" />
                            </div>
                            <button type="button" onClick={() => setShowDevModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-amber-600 dark:text-amber-500">
                            Under Active Development
                        </h3>
                        <p className="text-sm mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                            The Miransas Auth ecosystem module is currently in preview build. Live user authentication and database operations are disabled in this build.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setShowDevModal(false)} className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors bg-amber-500 hover:bg-amber-400 text-black">
                                Understood, Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



// https://github.com/Miransas/miransas/blob/main/public/icons/logo.png