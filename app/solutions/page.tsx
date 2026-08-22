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
  Search,
} from "lucide-react";

import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import SmoothScroll from "../../components/providers/SmoothScroll";

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

// ─── SOLUTION CARD (UPDATED FOR TIMELINE LAYOUT) ─────

function SolutionCard({ item, index }: { item: SolutionItem; index: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group relative flex gap-6 md:gap-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      {/* Timeline dot and line */}
      <div className="flex w-6 flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 md:h-full">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-neutral-100 text-neutral-950 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white transition-colors duration-300 group-hover:border-neutral-950 group-hover:dark:border-white">
          <span className="text-sm font-semibold">{item.number}</span>
        </div>
        <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300" />
      </div>

      {/* Card content */}
      <div className="relative flex-1 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:w-[calc(50%-2rem)] md:flex-initial transition-all duration-300 group-hover:border-neutral-300 group-hover:dark:border-neutral-700 group-hover:-translate-y-1 group-hover:shadow-lg dark:group-hover:shadow-[0_4px_24px_-4px_rgba(255,255,255,0.05)]">
        {/* Top bar: icon and badge */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 dark:text-neutral-400">
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-neutral-950 dark:text-white/80">
              {item.badgeTag}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/20 dark:text-neutral-300">
            <Sparkles className="h-3 w-3 text-neutral-500 dark:text-neutral-600" />
            {item.badgeTag.split(" ")[0]}
          </div>
        </div>

        {/* Main heading */}
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          {item.title}
        </h2>

        {/* Description */}
        <p className="mb-8 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>

        {/* Meta details */}
        <div className="mt-auto space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            DETAILS
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-700 dark:text-neutral-300">
            {[
              { key: "bestFor", label: "Best For", icon: Building2 },
              { key: "product", label: "Product", icon: Cpu },
              { key: "results", label: "Result", icon: TrendingUp },
            ].map((meta) => {
              const Icon = meta.icon;
              const value = item[meta.key as keyof SolutionItem] as string;
              return (
                <div key={meta.key} className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                    <Icon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-600" />
                  </div>
                  <div>
                    <span className="font-medium text-neutral-950 dark:text-white">
                      {value}
                    </span>
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

// ─── MAIN PAGE (SIMPLIFIED TIMELINE) ───────────────────

export default function Solutions() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950 font-sans transition-colors duration-300 dark:bg-[#0a0a0c] dark:text-white">
        <Header />
        <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto w-full max-w-7xl">
            {/* ═══ HEADER (Simple) ═══ */}
            <FadeIn className="mb-24 text-center">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900 transition-colors duration-300">
                <Sparkles className="h-4 w-4 text-neutral-500 dark:text-neutral-600" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300">
                  OUR SOLUTIONS
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Turn missed opportunities
                <br />
                <span className="font-serif italic font-light text-neutral-500 dark:text-neutral-600">
                  into captured revenue.
                </span>
              </h1>

              <div className="mt-10 flex items-center justify-center gap-4 max-w-xl mx-auto">
                <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-800" />
                <p className="text-base text-neutral-600 dark:text-neutral-400">
                  Unlock potential and streamline growth in simple steps.
                </p>
                <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </FadeIn>

            {/* ═══ SOLUTION CARDS (Timeline) ═══ */}
            <div className="relative space-y-12 md:space-y-20">
              {/* Background vertical line */}
              <div className="absolute left-3 top-5 h-[calc(100%-10px)] w-px bg-neutral-200 dark:bg-neutral-800 md:left-1/2 md:-translate-x-1/2" />
              {solutionsData.map((item, index) => (
                <SolutionCard key={item.number} item={item} index={index} />
              ))}
            </div>

            {/* ═══ BOTTOM CTA (Minimal) ═══ */}
            <FadeIn delay={0.3} className="mt-32">
              <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900 sm:px-12 transition-colors duration-300">
                <div className="relative z-10">
                  <p className="inline-block rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/20 dark:text-neutral-400">
                    Ready When You Are
                  </p>

                  <h3 className="mx-auto mt-7 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-4xl leading-tight max-w-lg">
                    Stop letting good leads disappear into nothing.
                  </h3>

                  <p className="mx-auto mt-5 max-w-md text-base text-neutral-600 dark:text-neutral-400">
                    Connect Miralas and streamline your lead growth effortlessly today.
                  </p>

                  <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
                      Explore Miralas
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-8 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:hover:border-neutral-700">
                      <Search className="h-4 w-4 text-neutral-500 dark:text-neutral-600" />
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
    </SmoothScroll>
  );
}
