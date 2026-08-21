"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  Mic, 
  Waves, 
  ShieldCheck,
} from "lucide-react";
import { ShaderAnimation } from "./shader-hero";

// ─── ANIMATION UTILITIES ──────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function FadeIn({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const { ref, isInView } = useInView();
  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0)" : transforms[direction],
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────

function FeatureCard({ 
  icon: Icon, 
  badge, 
  title, 
  description,
  glowColor = "purple",
  delay = 0
}: { 
  icon: React.ElementType; 
  badge: string; 
  title: string; 
  description: string;
  glowColor?: "purple" | "blue" | "emerald";
  delay?: number;
}) {
  const colorMap = {
    purple: { border: "border-purple-500/20", bg: "bg-purple-500/10", text: "text-purple-400", hover: "group-hover:text-purple-300" },
    blue: { border: "border-blue-500/20", bg: "bg-blue-500/10", text: "text-blue-400", hover: "group-hover:text-blue-300" },
    emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", hover: "group-hover:text-emerald-300" },
  };
  const c = colorMap[glowColor];

  return (
    <FadeIn delay={delay}>
      <div className={`
        group relative overflow-hidden rounded-2xl
        border border-white/[0.06] bg-white/[0.02]
        backdrop-blur-xl p-5 sm:p-6
        transition-all duration-500
        hover:bg-white/[0.04] hover:border-purple-500/20
        hover:shadow-2xl hover:shadow-purple-500/5
      `}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.text} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className={`rounded-full border ${c.border} ${c.bg} px-2 py-0.5 font-mono text-[9px] tracking-wider ${c.text}`}>
              {badge}
            </span>
          </div>
          <h3 className={`text-sm font-semibold text-white transition-colors ${c.hover}`}>
            {title}
          </h3>
          <p className="mt-1.5 text-[12px] sm:text-[13px] leading-relaxed text-white/30">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── MAIN HERO ────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0c] font-sans">
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>
      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-16">
        <div className="w-full max-w-5xl">
          {/* Headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-[2.5rem] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[0.95]">
              Intelligence,
              <br />
              <span className="font-serif italic font-light text-white/40">
                in motion.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-6 sm:mt-8 flex items-start gap-4 sm:gap-5 max-w-xl">
              <p className="text-sm sm:text-base leading-relaxed text-white/35">
                Advanced text-to-speech, real-time voice cloning, and multilingual infrastructure built into one seamless platform.
                Give your ideas a voice. Natural, expressive, production-ready speech — built for Uzbek, and beyond.
              </p>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.45}>
            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="https://console.miralas/auth"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <span className="flex items-center gap-2">
                  Start Building
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/tts"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 sm:px-8 py-3.5 text-sm font-medium text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/80"
              >
                <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-white" />
                Listen to Demos
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 gap-3 sm:gap-4 pt-8 sm:pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Mic}
            badge="< 3s SAMPLE"
            title="Instant Voice Cloning"
            description="Train ultra-realistic voice models with minimal audio datasets. Your voice, perfectly replicated."
            glowColor="purple"
            delay={0.6}
          />
          <FeatureCard
            icon={Waves}
            badge="50+ LANGUAGES"
            title="Multilingual Neural TTS"
            description="Native emotion and synthesis across dialects and accent profiles. Sound local everywhere."
            glowColor="blue"
            delay={0.7}
          />
          <FeatureCard
            icon={ShieldCheck}
            badge="LICENSED"
            title="Protected Voice Rights"
            description="Built-in legal protection, usage licensing, and royalty infrastructure. Your voice, secured."
            glowColor="emerald"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  )
}