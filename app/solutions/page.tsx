"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Moon,
  Zap,
  RefreshCw,
  Calendar,
  Building2,
  Cpu,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

// ─── ANIMATION UTILITIES ──────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
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
  direction = "up",
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

// ─── SOLUTION CARD (GÖRSELE GÖRE YENİLENDİ) ───────────────────

function SolutionCard({ item, index }: { item: SolutionItem; index: number }) {
  const { ref, isInView } = useInView(0.1);
  const colors = ["purple", "blue", "amber", "emerald"] as const;
  const color = colors[index % colors.length];

  // Renkler görseldeki gibi daha belirgin neon tonlara çekildi
  const colorMap = {
    purple: {
      border: "border-purple-500/40",
      bg: "bg-purple-500/[0.03]",
      text: "text-purple-400",
      glow: "bg-purple-500/20",
      dot: "bg-purple-500",
      hover: "group-hover:border-purple-500/60 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
    },
    blue: {
      border: "border-blue-500/40",
      bg: "bg-blue-500/[0.03]",
      text: "text-blue-400",
      glow: "bg-blue-500/20",
      dot: "bg-blue-500",
      hover: "group-hover:border-blue-500/60 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    },
    amber: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/[0.03]",
      text: "text-amber-400",
      glow: "bg-amber-500/20",
      dot: "bg-amber-500",
      hover: "group-hover:border-amber-500/60 group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    },
    emerald: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/[0.03]",
      text: "text-emerald-400",
      glow: "bg-emerald-500/20",
      dot: "bg-emerald-500",
      hover: "group-hover:border-emerald-500/60 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
    },
  };
  const c = colorMap[color];

  return (
    <div
      ref={ref}
      className="group flex w-full max-w-5xl mx-auto gap-3 sm:gap-5"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      {/* SOL KOLON (Sayı ve Ok) */}
      <div
        className={`flex w-14 flex-col items-center justify-between rounded-2xl border ${c.border} ${c.bg} py-6 backdrop-blur-md transition-all duration-500 sm:w-20 ${c.hover}`}
      >
        <div className={`${c.text} mb-4`}>{item.icon}</div>
        <div className="text-xl font-light text-white sm:text-3xl">{item.number}</div>
        <button className={`mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white`}>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* SAĞ KOLON (Ana İçerik) */}
      <div
        className={`relative flex-1 overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-6 backdrop-blur-md transition-all duration-500 sm:p-8 ${c.hover}`}
      >
        {/* Arkadaki Glow Efekti */}
        <div
          className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${c.glow} blur-[100px] opacity-30 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none`}
        />

        {/* Üst Bar: Başlık İkonu ve Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`${c.text}`}>{item.icon}</div>
            <span className="text-sm font-semibold text-white/80 sm:text-base">
              {item.badgeTag}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full border ${c.border} bg-black/20 px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wide ${c.text}`}
          >
            <div className={`h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
            {item.badgeTag.split(" ")[0]} {/* Örnek kısa badge metni */}
          </div>
        </div>

        {/* Ana Başlık */}
        <h2 className="relative z-10 mb-3 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
          {item.title}
        </h2>

        {/* Açıklama */}
        <p className="relative z-10 mb-8 text-sm leading-relaxed text-white/40 sm:text-base max-w-3xl">
          {item.description}
        </p>

        {/* Meta Grid (Görseldeki gibi alt alta ve yan yana düzen) */}
        <div className="relative z-10 mt-auto">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/20">
            Meta grid
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { key: "bestFor", label: "Best For", icon: Building2 },
              { key: "product", label: "Product", icon: Cpu },
              { key: "results", label: "Result", icon: TrendingUp },
            ].map((meta) => {
              const Icon = meta.icon;
              const value = item[meta.key as keyof SolutionItem] as string;
              return (
                <div key={meta.key} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${c.border} bg-white/5`}>
                    <Icon className={`h-3 w-3 ${c.text}`} />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase text-white/30 mb-0.5">
                      {meta.label}
                    </div>
                    <div className="text-xs text-white/60 line-clamp-2">
                      {value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TYPES ───────────────────────────────────────────────────

interface SolutionItem {
  number: string;
  badgeNumber: string;
  badgeTag: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bestFor: string;
  product: string;
  results: string;
}

// ─── DATA ────────────────────────────────────────────────────

const solutionsData: SolutionItem[] = [
  {
    number: "01",
    badgeNumber: "Solution 01",
    badgeTag: "24/7 Call Handling",
    icon: <Moon className="h-5 w-5" />,
    title: "Stop losing after-hours leads.",
    description:
      "40% of your leads call after 5pm. Right now they get voicemail. 85% of those callers hang up and call your competitor. Miralas Voice answers every call, 24/7/365, qualifies the lead, and books the appointment before your competitor wakes up.",
    bestFor: "Any service business losing leads.",
    product: "Voice + After-Dark",
    results: "70% lead-to-booking rate.",
  },
  {
    number: "02",
    badgeNumber: "Solution 02",
    badgeTag: "Speed to Lead",
    icon: <Zap className="h-5 w-5" />,
    title: "Contact every lead in under 30 seconds.",
    description:
      "A lead that doesn't hear back within 5 minutes is 80% less likely to convert. Most service businesses take 12 hours. Miralas contacts every new lead within 30 seconds of opt-in — over voice and messaging — while their interest is at its peak.",
    bestFor: "Paid ads & instant response.",
    product: "Voice + Speed",
    results: "Captured missing revenue.",
  },
  {
    number: "03",
    badgeNumber: "Solution 03",
    badgeTag: "Dead Lead Reactivation",
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Turn your CRM into a revenue source again.",
    description:
      "You have thousands of leads sitting in your CRM that went cold. You already paid $50–$200 each to acquire them. Nobody is calling them back. Miralas Revive works that list automatically — re-opening conversations, qualifying real interest, and booking those who are ready.",
    bestFor: "500+ uncontacted leads.",
    product: "Miralas Revive",
    results: "Recovered $28K in billings.",
  },
  {
    number: "04",
    badgeNumber: "Solution 04",
    badgeTag: "Appointment Confirmation",
    icon: <Calendar className="h-5 w-5" />,
    title: "Cut no-shows. Keep your calendar full.",
    description:
      "Last-minute cancellations and no-shows drain operational velocity. Miralas sends human-like, multi-channel reminders and automatically reschedules missed slots instantly.",
    bestFor: "Appointment-driven companies.",
    product: "Miralas Calendar Sync",
    results: "Under 3% no-show rate.",
  },
];

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function Solutions() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0c] text-white font-sans">
      <Header />
      <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          {/* ═══ HEADER ═══ */}
          <FadeIn className="mb-20 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.8)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Solutions
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Turn missed opportunities
              <br />
              <span className="font-serif italic font-light text-white/50">
                into captured revenue.
              </span>
            </h1>

            <div className="mt-8 flex items-center justify-center gap-4 max-w-xl mx-auto">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <p className="text-sm text-white/40">
                Turn cold opportunities into gradient line
              </p>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>
          </FadeIn>

          {/* ═══ SOLUTION CARDS ═══ */}
          <div className="space-y-6 sm:space-y-8">
            {solutionsData.map((item, index) => (
              <SolutionCard key={item.number} item={item} index={index} />
            ))}
          </div>

          {/* ═══ BOTTOM CTA ═══ */}
          <FadeIn delay={0.3} className="mt-24">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-8 py-16 text-center backdrop-blur-xl sm:px-12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <p className="inline-block rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Ready When You Are
                </p>

                <h3 className="mx-auto mt-6 text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Stop letting good leads disappear.
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm text-white/40">
                  Stop letting good leads disappear in one disappear.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <button className="w-full sm:w-auto rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Explore Miralas
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    Book a Call
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}