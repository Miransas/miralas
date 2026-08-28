"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mic, Play, ShieldCheck, Waves } from "lucide-react";
import { ShaderAnimation } from "./shader-hero";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const { ref, isInView } = useInView();
  const from = {
    up: "translateY(24px)",
    down: "translateY(-24px)",
    left: "translateX(24px)",
    right: "translateX(-24px)",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : from,
        transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const GLOW = {
  purple: {
    border: "border-violet-400/25",
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    hover: "group-hover:text-violet-200",
    card: "hover:border-violet-400/25",
  },
  blue: {
    border: "border-sky-400/25",
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    hover: "group-hover:text-sky-200",
    card: "hover:border-sky-400/25",
  },
  emerald: {
    border: "border-emerald-400/25",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    hover: "group-hover:text-emerald-200",
    card: "hover:border-emerald-400/25",
  },
} as const;

function FeatureCard({
  icon: Icon,
  badge,
  title,
  description,
  glowColor = "purple",
  delay = 0,
}: {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  glowColor?: keyof typeof GLOW;
  delay?: number;
}) {
  const c = GLOW[glowColor];

  return (
    <FadeIn delay={delay}>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.055] hover:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8)] sm:p-6 ${c.card}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div
              className={`flex size-10 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.text} transition-transform duration-300 group-hover:scale-105`}
            >
              <Icon className="size-5" />
            </div>
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider ${c.border} ${c.bg} ${c.text}`}
            >
              {badge}
            </span>
          </div>
          <h3 className={`text-sm font-semibold text-white transition-colors ${c.hover}`}>
            {title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0c]">
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.35)_0%,rgba(10,10,12,0.55)_45%,rgba(10,10,12,0.88)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-16">
        <div className="w-full max-w-5xl">
          <FadeIn delay={0.12}>
            <h1 className="text-[2.5rem] font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Intelligence, ($P_{99}$ latency)
              <br />
              <span className="font-serif font-light italic text-white/50">
                in motion.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.28}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-8 sm:text-base">
              Advanced text-to-speech, real-time voice cloning, and multilingual
              infrastructure in one platform. Natural, expressive speech — built
              for Uzbek, and beyond.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Link
                href="https://console.miralas.com/auth"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.16)] sm:w-auto"
              >
                Start Building
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tts"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/75 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:w-auto"
              >
                <Play className="size-4" />
                Listen to Demos
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 pt-6 sm:mt-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <FeatureCard
            icon={Mic}
            badge="< 3s SAMPLE"
            title="Instant Voice Cloning"
            description="Train ultra-realistic voice models with minimal audio. Your voice, replicated."
            glowColor="purple"
            delay={0.5}
          />
          <FeatureCard
            icon={Waves}
            badge="50+ LANGUAGES"
            title="Multilingual Neural TTS"
            description="Native emotion across dialects and accents. Sound local everywhere."
            glowColor="blue"
            delay={0.58}
          />
          <FeatureCard
            icon={ShieldCheck}
            badge="LICENSED"
            title="Protected Voice Rights"
            description="Licensing and royalty infrastructure built in. Your voice, secured."
            glowColor="emerald"
            delay={0.66}
          />
        </div>
      </div>
    </section>
  );
}