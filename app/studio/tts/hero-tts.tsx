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
    <section className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-white py-16 font-sans text-foreground dark:bg-[#0a0a0a] sm:py-24 lg:min-h-[105svh] lg:py-16">
      {/* ============================================================
          MOBİL: MARQUEE İÇERİĞİN ARKASINDA HAREKET EDİYOR
          - lg ve altı ekranlarda görünür
          - Soluk (opacity) + kenar maskesi + okunabilirlik için overlay
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden">
        <div className="absolute -inset-x-40 -inset-y-40 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div className="absolute inset-0 flex rotate-[24deg] scale-[1.35] items-center justify-center gap-6 opacity-40 dark:opacity-30">
            <MarqueeColumn items={dummyCards} direction="up" speed={30} />
            <MarqueeColumn items={dummyCards} direction="down" speed={34} />
          </div>
        </div>

        {/* Yazının okunabilirliği için hafif beyaz/koyu örtü */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/70 dark:from-[#0a0a0a]/80 dark:via-[#0a0a0a]/30 dark:to-[#0a0a0a]/80" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto grid w-full max-w-full grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
        {/* LEFT HERO */}
        <div className="relative z-30 flex flex-col items-start gap-7 lg:col-span-5 lg:gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm dark:border-white/10"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-bold text-foreground">MV</span>
            <span className="text-border">|</span>
            <span>Raises $15M Series A</span>
            <span className="text-muted-foreground/60">›</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="space-y-5"
          >
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
              Miransas
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              Connect any dataset and watch Lumis generate stunning, real-time
              charts and predictive analytics automatically.
            </p>
          </motion.div>

          {/* PROMPT INPUT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full max-w-xl"
          >
            <div className="relative rounded-2xl border border-slate-200 bg-background p-3 shadow-xl dark:border-white/10">
              <textarea
                rows={2}
                placeholder="So, can I clone my own voice?"
                className="w-full resize-none bg-transparent p-2 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
              />

              <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/10">
                <div className="flex gap-1">
                  <button
                    aria-label="Upload dataset"
                    className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>

                  <button
                    aria-label="Voice input"
                    className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <MicIcon />
                  </button>
                </div>

                <GlowButton size="sm" href="https://console.miralas.io/studio/create" color="rose">
                  Get Started<span>✨</span>
                </GlowButton>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex w-full flex-col gap-3 sm:w-auto"
          >
            <div className="flex flex-wrap items-center gap-3">
              <GlowButton size="sm" href="https://console.miralas.io/auth" color="purple">
                Get Started
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            DESKTOP: MARQUEE SAĞ KOLONDA
            - Kenarlar maskeli (üst/alt fade), blur yok
        ============================================================ */}
        <div
          className=" relative z-10 hidden h-[860px] w-full lg:col-span-7 lg:block xl:h-[960px]  [mask-image:linear-gradient(to_bottom,transparent,black_50%,black_95%,transparent),linear-gradient(to_right,transparent,black_50%,black_95%,transparent)]
            [mask-composite:intersect]"
        >
          <div className="absolute -inset-x-20 -inset-y-32 overflow-hidden">
            <div className="absolute -inset-x-32 -inset-y-40 flex rotate-[24deg] scale-[1.12] items-center justify-center gap-7 xl:scale-[1.18]">
              <MarqueeColumn items={dummyCards} direction="up" speed={30} />
              <MarqueeColumn items={dummyCards} direction="down" speed={34} />
              <MarqueeColumn items={dummyCards} direction="up" speed={27} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* MARQUEE COLUMN */
function MarqueeColumn({
  items,
  direction,
  speed = 30,
}: {
  items: CardData[];
  direction: "up" | "down";
  speed?: number;
}) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const translateY = direction === "up" ? ["0%", "-25%"] : ["-25%", "0%"];

  return (
    <div className="relative w-[280px] shrink-0 sm:w-[330px] xl:w-[350px]">
      <motion.div
        className="flex flex-col gap-7"
        animate={{ y: translateY }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
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
    <div className="flex min-h-[320px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 text-card-foreground shadow-lg dark:border-white/10 dark:bg-[#0f0f0f] sm:min-h-[340px] xl:min-h-[360px] xl:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {data.category}
          </span>
          <h3 className="mt-1 truncate text-lg font-extrabold tracking-tight text-foreground">
            {data.title}
          </h3>
        </div>

        {data.badge && (
          <span className="shrink-0 rounded-full border border-slate-200 bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground dark:border-white/10">
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
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-[10px] font-semibold text-muted-foreground dark:border-white/10">
        <span>Updated 2m ago</span>
        <span className="cursor-pointer text-blue-600 hover:underline dark:text-blue-400">
          View report →
        </span>
      </div>
    </div>
  );
}

/* CHARTS & ICONS */
function BarChart() {
  const bars = [45, 65, 90, 55, 75];

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
        <span>Basic</span>
        <span>Pro</span>
        <span>Enterprise</span>
      </div>

      <div className="flex h-32 items-end gap-3 border-b border-slate-100 pb-1 dark:border-white/10">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`w-1/5 rounded-t-lg ${index === 2
              ? "bg-rose-600 dark:bg-rose-500"
              : index === 4
                ? "bg-rose-500"
                : "bg-[#c084fc]"
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
        <span className="text-3xl font-black tracking-tight text-foreground">
          128.4K
        </span>
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
          ↑ 14.2%
        </span>
      </div>

      <div className="h-28 w-full pt-2">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 Q 25 5, 50 20 T 100 10 L 100 40 L 0 40 Z"
            className="fill-purple-500 dark:fill-purple-700"
          />
          <path
            d="M0 30 Q 25 5, 50 20 T 100 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-purple-500 dark:text-blue-400"
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
        <div className="absolute inset-0 rounded-full border-[10px] border-muted" />
        <div className="absolute inset-0 -rotate-45 rounded-full border-[10px] border-blue-600 border-r-indigo-500 border-t-transparent dark:border-blue-500" />
        <span className="text-xs font-black text-foreground">74% US</span>
      </div>

      <div className="space-y-2 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          <span>United States (62%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          <span>Germany (24%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span>Other (14%)</span>
        </div>
      </div>
    </div>
  );
}

function StatMetric() {
  return (
    <div className="space-y-4">
      <div className="text-4xl font-black tracking-tight text-foreground">
        $42,800
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        Sales target reached for Q3
      </p>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted p-0.5">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  );
}