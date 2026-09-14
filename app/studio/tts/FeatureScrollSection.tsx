"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BellIcon, ChevronDown, SearchIcon } from "lucide-react";

export default function FeatureScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  /* Masaüstü mü kontrolü (mobilde transform'lar farklı olacak) */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Takılmayı önleyen hafif yumuşatma.
     Hâlâ kasma hissedersen useSpring'i silip smooth yerine
     doğrudan scrollYProgress kullan. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.3,
  });

  /* QUOTE — scroll başlar başlamaz kaybolur */
  const quoteOpacity = useTransform(smooth, [0, 0.08, 0.22], [1, 1, 0]);
  const quoteY = useTransform(smooth, [0, 0.22], [0, -60]);

  /* SOL PANEL (sadece desktop'ta görünür, CSS ile gizliyoruz) */
  const leftOpacity = useTransform(smooth, [0.18, 0.45], [0, 1]);
  const leftX = useTransform(smooth, [0.18, 0.45], [-60, 0]);

  /* DASHBOARD
     - Desktop: merkezde büyük (1.15x) -> sağa kayarak küçülür (1x)
     - Mobil:  hiç x hareketi yok, sadece çok hafif küçülür */
  const dashboardX = useTransform(
    smooth,
    [0, 0.7],
    isDesktop ? ["0%", "34%"] : ["0%", "0%"]
  );
  const dashboardScale = useTransform(
    smooth,
    [0, 0.7],
    isDesktop ? [1.15, 1] : [1.04, 1]
  );
  const dashboardY = useTransform(smooth, [0, 0.45, 1], [20, 0, -16]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-[220vh] w-full overflow-clip bg-white font-sans text-stone-800 dark:bg-[#0a0a0a] dark:text-white"
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col">
          {/* QUOTE */}
          <motion.div
            style={{ opacity: quoteOpacity, y: quoteY }}
            className="pointer-events-none relative z-20 mx-auto w-full max-w-3xl shrink-0 pt-1 text-center sm:pt-2"
          >
            <h2 className="text-xl font-bold leading-tight tracking-tight text-stone-800 dark:text-white sm:text-4xl md:text-5xl">
              insights into action—
              <span className="text-stone-400 dark:text-stone-500">
                {" "}
                all in seconds.
              </span>
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-stone-400 sm:text-base">
              It's intelligent. It's effortless. It's beautiful. And it thinks
              with you.
            </p>

            <p className="mx-auto max-w-xl pt-1 text-sm font-semibold text-stone-700 dark:text-stone-200 sm:text-base">
              Because you deserve more than endless formatting. You deserve
              illumination.
            </p>

            <div className="pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 sm:text-xs">
              Marcus Patel{" "}
              <span className="text-slate-300 dark:text-zinc-700">
                — CEO at Lumis
              </span>
            </div>
          </motion.div>

          {/* SAHNE */}
          <div className="relative min-h-0 flex-1">
            {/* SOL PANEL — sadece lg ve üzeri */}
            <motion.div
              style={{ opacity: leftOpacity, x: leftX }}
              className="absolute left-0 top-1/2 z-10 hidden w-[36%] -translate-y-1/2 pr-6 lg:block"
            >
              <span className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-500">
                Speed meets intelligence
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-stone-800 dark:text-white xl:text-4xl">
                What used to take hours now happens in minutes.{" "}
                <span className="font-normal text-stone-400 dark:text-stone-500">
                  Focus on insights, not chart formatting.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                Stop wasting time on manual visualization work. Lumis handles
                the charts so you can focus on what actually matters—understanding
                your data and making decisions.
              </p>

              <div className="mt-5 space-y-3.5">
                {features.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-slate-100 p-2 text-stone-600 shadow-sm dark:bg-black dark:text-stone-200">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs leading-normal text-slate-500 dark:text-stone-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DASHBOARD — wrapper her zaman merkezler, motion ile sağa kayar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                style={{
                  x: dashboardX,
                  y: dashboardY,
                  scale: dashboardScale,
                }}
                className="h-full w-full max-w-[680px] py-2 lg:max-w-[720px]"
              >
                <DummyDashboard />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* FEATURES DATA */
const features = [
  {
    title: "Instant visualizations.",
    desc: "Upload your data and get AI-generated charts in seconds.",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Deeper analysis.",
    desc: "Find patterns you'd never have time to explore manually.",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Built-in best practices.",
    desc: "Every chart is clear, accurate, and tells the right story.",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* DASHBOARD */
function DummyDashboard() {
  const stats = [
    { title: "Total visits", val: "4,732", perc: "+12% this month", color: "text-emerald-500" },
    { title: "Views per visit", val: "65", perc: "-1.2% this month", color: "text-rose-500" },
    { title: "Avg. visit duration", val: "5m 16sec", perc: "+2.4% this month", color: "text-emerald-500" },
    { title: "Bounce rate", val: "94%", perc: "+8% this month", color: "text-emerald-500" },
  ];

  return (
    <div className="flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-[#0a0a0a] dark:shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:min-h-[420px] lg:max-h-[620px]">
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 dark:border-white/5 dark:bg-black dark:text-stone-400 sm:px-6 sm:py-3.5">
        <div className="flex gap-4 sm:gap-6">
          <span className="border-b-2 border-blue-600 pb-0.5 font-bold text-stone-800 dark:text-white">
            Dashboard
          </span>
          <span className="hidden transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 sm:block">
            Management
          </span>
          <span className="hidden transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 sm:block">
            Calendar
          </span>
          <span className="hidden transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 sm:block">
            Settings
          </span>
        </div>
        <div className="flex gap-3 text-stone-400 dark:text-stone-500">
          <SearchIcon className="h-4 w-4" />
          <BellIcon className="h-4 w-4" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#FAFAFA] p-3 dark:bg-[#0a0a0a] sm:p-6">
        {/* Welcome */}
        <div className="flex shrink-0 items-center justify-between">
          <h3 className="text-sm font-extrabold text-stone-800 dark:text-white sm:text-base">
            Welcome back 👋
          </h3>
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-stone-500 shadow-sm dark:border-white/10 dark:bg-black dark:text-stone-300 sm:px-3 sm:text-xs">
            <span>Last Month</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>

        {/* STATS */}
        <div className="my-2.5 grid shrink-0 grid-cols-2 gap-2 sm:my-3 sm:grid-cols-4 sm:gap-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-black sm:p-3"
            >
              <span className="block truncate text-[9px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {stat.title}
              </span>
              <div className="mt-0.5 text-sm font-black text-stone-800 dark:text-white sm:text-base">
                {stat.val}
              </div>
              <span className={`mt-0.5 block text-[9px] font-bold sm:text-[10px] ${stat.color}`}>
                {stat.perc}
              </span>
            </div>
          ))}
        </div>

        {/* CHARTS — mobilde de yan yana, taşmayı önler */}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3">
          <ChartCard title="Performance" color="bg-indigo-500" offset={0} />
          <ChartCard title="Engagement" color="bg-blue-500" offset={2} />
        </div>
      </div>
    </div>
  );
}

/* CHART CARD */
function ChartCard({ title, color, offset }: { title: string; color: string; offset: number }) {
  return (
    <div className="flex min-h-[110px] flex-col justify-between rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-black sm:min-h-[150px] sm:p-4">
      <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 sm:text-xs">
        {title}
      </span>
      <div className="flex h-14 items-end justify-between gap-0.5 pt-2 sm:h-24 sm:gap-1">
        {Array.from({ length: 24 }).map((_, i) => {
          const height = ((i + offset) % 6) * 12 + 25;
          return (
            <div
              key={i}
              className={`w-full rounded-t-sm ${color}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}