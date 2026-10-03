"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../../../components/ui/glow-button";
import { PlusIcon } from "lucide-react";

interface CardData {
  id: number;
  category: string;
  title: string;
  type: "bar-chart" | "line-chart" | "donut-chart" | "stat-metric";
  badge?: string;
}

const dummyCards: CardData[] = [
  { id: 1, category: "Revenue Analytics", title: "Revenue by Plan", type: "bar-chart", badge: "+18.4%" },
  { id: 2, category: "Traffic Source", title: "Audience & Conversions", type: "line-chart", badge: "Live" },
  { id: 3, category: "Demographics", title: "Users by Country", type: "donut-chart", badge: "Global" },
  { id: 4, category: "Activity", title: "Product Monthly Revenue", type: "stat-metric", badge: "$2.7k/day" },
  { id: 5, category: "Retention", title: "Customer Churn Prediction", type: "bar-chart", badge: "AI Forecast" },
];

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#fafafa] py-16 font-sans text-zinc-900 dark:bg-[#030303] dark:text-zinc-50 sm:py-24 lg:min-h-[105svh] lg:py-16">
      
      {/* Background Ambient Glows for Luxury Feel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-[10%] h-[500px] w-[500px] rounded-full bg-zinc-200/50 blur-[120px] dark:bg-white/5" />
        <div className="absolute -bottom-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-zinc-200/50 blur-[150px] dark:bg-white/5" />
      </div>

      {/* MOBİL: MARQUEE */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden">
        <div className="absolute -inset-x-40 -inset-y-40 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div className="absolute inset-0 flex rotate-[24deg] scale-[1.35] items-center justify-center gap-6 opacity-30 dark:opacity-20">
            <MarqueeColumn items={dummyCards} direction="up" speed={40} />
            <MarqueeColumn items={dummyCards} direction="down" speed={45} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa]/80 via-[#fafafa]/40 to-[#fafafa]/80 dark:from-[#030303]/90 dark:via-[#030303]/50 dark:to-[#030303]/90" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto grid w-full max-w-full grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
        
        {/* LEFT HERO */}
        <div className="relative z-30 flex flex-col items-start gap-7 lg:col-span-5 lg:gap-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white/60 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-white">MV</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="tracking-wide">Raises $15M Series A</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-500">
                Miransas
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg lg:text-xl">
              Connect any dataset and watch Lumis generate stunning, real-time
              charts and predictive analytics automatically. 
            </p>
          </motion.div>

          {/* PROMPT INPUT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl"
          >
            <div className="relative rounded-2xl border border-zinc-200 bg-white/70 p-3 shadow-2xl shadow-zinc-200/50 backdrop-blur-xl transition-all hover:border-zinc-300 dark:border-white/10 dark:bg-[#0a0a0a]/70 dark:shadow-black/50 dark:hover:border-white/20">
              <textarea
                rows={2}
                placeholder="So, can I clone my own voice?"
                className="w-full resize-none bg-transparent p-2 text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-600"
              />

              <div className="mt-1 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/50">
                <div className="flex gap-1">
                  <button
                    aria-label="Upload dataset"
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>

                  <button
                    aria-label="Voice input"
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    <MicIcon />
                  </button>
                </div>

                <GlowButton size="sm" href="https://console.miralas.io/studio/create">
                  Get Started <span className="ml-1 opacity-70">✦</span>
                </GlowButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DESKTOP: MARQUEE */}
        <div
          className="relative z-10 hidden h-[860px] w-full lg:col-span-7 lg:block xl:h-[960px] 
            [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent),linear-gradient(to_right,transparent,black_40%,black_100%,transparent)]
            [mask-composite:intersect]"
        >
          <div className="absolute -inset-x-20 -inset-y-32 overflow-hidden">
            <div className="absolute -inset-x-32 -inset-y-40 flex rotate-[24deg] scale-[1.12] items-center justify-center gap-7 xl:scale-[1.18]">
              <MarqueeColumn items={dummyCards} direction="up" speed={45} />
              <MarqueeColumn items={dummyCards} direction="down" speed={50} />
              <MarqueeColumn items={dummyCards} direction="up" speed={42} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* MARQUEE COLUMN */
function MarqueeColumn({ items, direction, speed = 30 }: { items: CardData[]; direction: "up" | "down"; speed?: number; }) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const translateY = direction === "up" ? ["0%", "-25%"] : ["-25%", "0%"];

  return (
    <div className="relative w-[280px] shrink-0 sm:w-[330px] xl:w-[350px]">
      <motion.div
        className="flex flex-col gap-7"
        animate={{ y: translateY }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {duplicatedItems.map((item, index) => (
          <DetailedCard key={`${item.id}-${index}`} data={item} />
        ))}
      </motion.div>
    </div>
  );
}

/* CARD */
function DetailedCard({ data }: { data: CardData }) {
  return (
    <div className="flex min-h-[320px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-zinc-200/50 bg-white/80 p-6 shadow-xl shadow-zinc-200/30 backdrop-blur-md transition-all hover:border-zinc-300 dark:border-white/5 dark:bg-[#0a0a0a]/80 dark:shadow-none dark:hover:border-white/10 sm:min-h-[340px] xl:min-h-[360px] xl:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            {data.category}
          </span>
          <h3 className="mt-1 truncate text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {data.title}
          </h3>
        </div>

        {data.badge && (
          <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            {data.badge}
          </span>
        )}
      </div>

      {/* Chart */}
      <div className="my-5 w-full">
        {data.type === "bar-chart" && <BarChart />}
        {data.type === "line-chart" && <LineChart />}
        {data.type === "donut-chart" && <DonutChart />}
        {data.type === "stat-metric" && <StatMetric />}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-[10px] font-semibold text-zinc-400 dark:border-zinc-800/50 dark:text-zinc-500">
        <span>Updated 2m ago</span>
        <span className="cursor-pointer text-zinc-900 transition-colors hover:text-amber-500 dark:text-zinc-300 dark:hover:text-amber-400">
          View report →
        </span>
      </div>
    </div>
  );
}

/* CHARTS & ICONS (Luxurified) */
function BarChart() {
  const bars = [45, 65, 90, 55, 75];

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <span>Basic</span>
        <span>Pro</span>
        <span>Enterprise</span>
      </div>

      <div className="flex h-32 items-end gap-3 border-b border-zinc-100 pb-1 dark:border-zinc-800/50">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`w-1/5 rounded-t-sm transition-all ${
              index === 2
                ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" // Highlight
                : index === 4
                ? "bg-zinc-800 dark:bg-zinc-200"
                : "bg-zinc-200 dark:bg-zinc-800"
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function LineChart() {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          128.4K
        </span>
        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
          ↑ 14.2%
        </span>
      </div>

      <div className="h-28 w-full pt-2">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0 30 Q 25 5, 50 20 T 100 10 L 100 40 L 0 40 Z"
            className="fill-zinc-100 dark:fill-zinc-800/50"
          />
          <path
            d="M0 30 Q 25 5, 50 20 T 100 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-zinc-900 dark:text-zinc-300"
          />
        </svg>
      </div>
    </div>
  );
}

function DonutChart() {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[8px] border-zinc-100 dark:border-zinc-800/50" />
        <div className="absolute inset-0 -rotate-45 rounded-full border-[8px] border-zinc-900 border-r-amber-500 border-t-transparent dark:border-zinc-100 dark:border-r-amber-500" />
        <span className="text-xs font-black text-zinc-900 dark:text-white">74% US</span>
      </div>

      <div className="space-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
          <span>United States (62%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Germany (24%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <span>Other (14%)</span>
        </div>
      </div>
    </div>
  );
}

function StatMetric() {
  return (
    <div className="space-y-4">
      <div className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
        $42,800
      </div>
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Sales target reached for Q3
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400" />
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}