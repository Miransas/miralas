"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Globe2,
  Layers3,
  Mic2,
  Play,
  Sparkles,
  Star,
  Wand2,
  Volume2,
  Activity,
  Zap,
  ShieldCheck,
  Radio,
  Cpu,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import HeroSection from "@/components/shared/hero";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

/* =========================================================
   DATA
========================================================= */

const logos = [
  "BilimLab",
  "Ovoza",
  "Payme",
  "Najot",
  "UzEdu",
  "Creator Hub",
];

const features: Array<{
  title: string;
  body: string;
  icon: LucideIcon;
  label: string;
}> = [
    {
      title: "Uzbek-first generation",
      body: "Natural prosody, Latin and Cyrillic workflows, pronunciation control and speech that feels native.",
      icon: Mic2,
      label: "VOICE",
    },
    {
      title: "Voice cloning",
      body: "Build recognizable voices with consent-led identity controls designed for creators and teams.",
      icon: Wand2,
      label: "IDENTITY",
    },
    {
      title: "Creator donations",
      body: "Turn supporter events into polished voice moments, alerts and personalized experiences.",
      icon: Sparkles,
      label: "CREATOR",
    },
    {
      title: "Developer API",
      body: "Generate speech, monitor jobs and connect audio generation directly to your own product.",
      icon: Code2,
      label: "DEVELOPER",
    },
  ];

const models = [
  {
    name: "Narrator Pro",
    description: "Deep, confident and cinematic.",
    tone: "Professional",
    bars: [34, 62, 48, 84, 54, 76, 42, 92, 58, 70, 38, 80],
  },
  {
    name: "Creator Soft",
    description: "Warm, intimate and expressive.",
    tone: "Expressive",
    bars: [62, 44, 72, 38, 86, 52, 66, 46, 78, 42, 70, 58],
  },
  {
    name: "Newsroom Clear",
    description: "Crisp, balanced and precise.",
    tone: "Broadcast",
    bars: [72, 70, 68, 76, 64, 78, 72, 70, 80, 68, 74, 76],
  },
  {
    name: "Teacher Warm",
    description: "Natural pacing for learning.",
    tone: "Education",
    bars: [46, 64, 58, 72, 42, 68, 52, 80, 48, 62, 56, 74],
  },
];

const cases = [
  {
    title: "Education",
    description: "Lessons, listening exercises and accessible audio.",
    icon: Globe2,
    size: "large",
  },
  {
    title: "Creators",
    description: "Narration, supporter alerts and personalized content.",
    icon: Sparkles,
    size: "small",
  },
  {
    title: "Media",
    description: "Fast localized production for modern publishing.",
    icon: Radio,
    size: "small",
  },
  {
    title: "Support",
    description: "Human-sounding automated customer experiences.",
    icon: Volume2,
    size: "small",
  },
  {
    title: "Fintech",
    description: "Clear transactional and product communication.",
    icon: ShieldCheck,
    size: "small",
  },
  {
    title: "Developers",
    description: "Voice infrastructure that fits directly into your stack.",
    icon: Code2,
    size: "large",
  },
];

const stats = [
  ["98.7%", "Target Uzbek clarity"],
  ["24ms", "Realtime-ready architecture"],
  ["4", "Core voice models"],
  ["UZ", "Primary language"],
];

/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
          }
      }
      whileInView={
        reduced
          ? undefined
          : {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }
      }
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SECTION SHELL
========================================================= */

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

/* =========================================================
   AI VOICE STUDIO
========================================================= */

function VoiceStudio() {
  const reduced = useReducedMotion();

  const waveform = [
    18, 34, 48, 32, 62, 76, 54, 86, 64, 92, 70, 48, 78, 96, 58, 82, 42,
    72, 54, 88, 66, 38, 74, 52, 90, 68, 46, 80, 58, 72, 44, 84, 62, 36,
    70, 52, 88, 64, 42, 76, 56, 92, 68, 48, 82, 60, 74, 40,
  ];

  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-20 rounded-[60px] bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.20),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.14),transparent_35%)] blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative overflow-hidden rounded-[34px] border border-zinc-200/80 bg-white/80 p-4 shadow-[0_40px_140px_-65px_rgba(2,6,23,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0b0c]/90 dark:shadow-[0_40px_140px_-65px_rgba(0,0,0,0.95)] sm:p-5"
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-2 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg dark:bg-white dark:text-zinc-950">
              <Mic2 className="size-4" />

              <motion.span
                animate={
                  reduced
                    ? undefined
                    : {
                      scale: [1, 1.35, 1],
                      opacity: [0.5, 0.15, 0.5],
                    }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-xl bg-sky-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                Miralas Voice Studio
              </p>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                AI generation active
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
              uz-Latn
            </span>

            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
              Narrator Pro
            </span>
          </div>
        </div>

        {/* transcript */}
        <div className="rounded-[26px] border border-zinc-200/80 bg-zinc-50/80 p-5 dark:border-white/[0.07] dark:bg-white/[0.025] sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            <Sparkles className="size-3" />
            AI transcript
          </div>

          <p className="mt-5 max-w-xl text-xl font-medium leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            Assalomu alaykum.
            <span className="text-zinc-400 dark:text-zinc-600">
              {" "}
              Miralas bilan o&apos;zbek tilida tabiiy ovozlar yarating.
            </span>
          </p>

          {/* waveform */}
          <div className="relative mt-7 flex h-28 items-center gap-[3px] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white px-4 dark:border-white/[0.06] dark:bg-black/30">
            <div className="pointer-events-none absolute inset-y-0 left-[28%] w-px bg-sky-500/60 shadow-[0_0_20px_rgba(14,165,233,0.8)]" />

            <div className="pointer-events-none absolute inset-y-0 left-0 w-[29%] bg-gradient-to-r from-sky-500/[0.04] to-transparent" />

            {waveform.map((height, index) => (
              <motion.span
                key={index}
                className="min-w-[2px] flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300"
                animate={
                  reduced
                    ? undefined
                    : {
                      height: [
                        `${Math.max(10, height * 0.55)}%`,
                        `${height}%`,
                        `${Math.max(12, height * 0.72)}%`,
                      ],
                    }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: index * 0.035,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* controls */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Play voice preview"
                className="flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg transition hover:scale-105 dark:bg-white dark:text-zinc-950"
              >
                <Play className="ml-0.5 size-4 fill-current" />
              </button>

              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Voice preview
                </p>
                <p className="text-[11px] text-zinc-500">00:08 / 00:21</p>
              </div>
            </div>

            <div className="hidden items-center gap-5 text-right sm:flex">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                  Latency
                </p>
                <p className="mt-1 text-xs font-semibold text-zinc-900 dark:text-white">
                  24ms
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                  Quality
                </p>
                <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Excellent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom metrics */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            ["Language", "Uzbek"],
            ["Model", "N-Pro"],
            ["Status", "Ready"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-200/70 bg-zinc-50/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.025]"
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-xs font-semibold text-zinc-900 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   FEATURE VISUAL
========================================================= */

function FeatureVisual({
  type,
}: {
  type: number;
}) {
  if (type === 0) {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-white/[0.07] dark:bg-white/[0.025]">
        <div className="flex h-20 items-center gap-1">
          {[42, 68, 54, 86, 62, 92, 48, 74, 56, 80, 44, 70].map(
            (height, index) => (
              <motion.span
                key={index}
                className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 to-sky-400 dark:from-white dark:to-sky-300"
                animate={{
                  height: [`${height * 0.65}%`, `${height}%`, `${height * 0.75}%`],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.05,
                }}
              />
            ),
          )}
        </div>
      </div>
    );
  }

  if (type === 1) {
    return (
      <div className="relative mt-8 h-24 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 dark:border-white/[0.07] dark:bg-white/[0.025]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex size-14 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Wand2 className="size-5" />

            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-sky-400"
            />
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-semibold dark:border-white/10 dark:bg-black">
          Consent verified
        </div>

        <div className="absolute bottom-4 right-4 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-semibold dark:border-white/10 dark:bg-black">
          Voice ID
        </div>
      </div>
    );
  }

  if (type === 2) {
    return (
      <div className="mt-8 grid grid-cols-3 gap-2">
        {["Supporter", "+$5.00", "Voice alert"].map((item, index) => (
          <motion.div
            key={item}
            animate={{
              y: index === 1 ? [0, -3, 0] : undefined,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 text-center dark:border-white/[0.07] dark:bg-white/[0.025]"
          >
            <p className="text-[9px] uppercase tracking-wider text-zinc-400">
              {item}
            </p>

            <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-white">
              {index === 0 ? "New" : index === 1 ? "Received" : "Ready"}
            </p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 font-mono text-[11px] dark:border-white/[0.07] dark:bg-black/30">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="size-2 rounded-full bg-emerald-400" />
        POST /v1/voice/generate
      </div>

      <div className="mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
        <p>
          <span className="text-sky-500">model:</span> narrator-pro
        </p>
        <p>
          <span className="text-sky-500">language:</span> uz-Latn
        </p>
        <p>
          <span className="text-emerald-500">status:</span> 200 OK
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <HeroSection />

      {/* =====================================================
          TRUST
      ===================================================== */}

      <SectionShell className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Built for the next generation of Uzbek products
            </div>

            <div className="mt-10 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <span
                    key={`${logo}-${index}`}
                    className="whitespace-nowrap text-lg font-semibold tracking-tight text-zinc-400/60 dark:text-zinc-500/60"
                  >
                    {logo}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* =====================================================
          INTERACTIVE VOICE STUDIO
      ===================================================== */}

      <SectionShell className="pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-300">
              <Activity className="size-3.5" />
              LIVE AI VOICE ENGINE
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-6xl">
              Don&lsquo;t just generate audio.
              <span className="block text-zinc-400 dark:text-zinc-600">
                Hear intelligence forming.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Miralas turns text into expressive Uzbek speech with live
              generation signals, model controls and production-ready
              infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["24ms", "Latency"],
                ["98.7%", "Clarity"],
                ["UZ", "Language"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {value}
                  </p>
                  <p className="text-[11px] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <VoiceStudio />
        </div>
      </SectionShell>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              AI infrastructure
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              Everything you need to
              <span className="text-zinc-400 dark:text-zinc-600">
                {" "}
                make voice feel alive.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="group relative h-full overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white/75 p-7 shadow-[0_25px_100px_-70px_rgba(2,6,23,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none sm:p-8"
                  >
                    <div className="absolute right-0 top-0 size-48 rounded-full bg-sky-400/[0.06] blur-3xl transition duration-500 group-hover:bg-sky-400/[0.12]" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg dark:bg-white dark:text-zinc-950">
                        <Icon className="size-5" />
                      </div>

                      <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">
                        {feature.label}
                      </span>
                    </div>

                    <h3 className="relative mt-8 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="relative mt-3 max-w-lg text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {feature.body}
                    </p>

                    <FeatureVisual type={index} />
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* =====================================================
          WHY MIRALAS
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="overflow-hidden rounded-[38px] border border-zinc-200/80 bg-zinc-950 text-white shadow-[0_40px_140px_-80px_rgba(2,6,23,0.9)] dark:border-white/10">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden p-8 sm:p-12 lg:p-14">
                  <div className="absolute -left-20 -top-20 size-72 rounded-full bg-sky-500/15 blur-3xl" />

                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
                      <Zap className="size-5 text-sky-300" />
                    </div>

                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                      Why Miralas
                    </p>

                    <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                      Voice should feel native.
                      <span className="text-white/35">
                        {" "}
                        Not translated.
                      </span>
                    </h2>

                    <p className="mt-6 max-w-lg leading-8 text-white/55">
                      Language quality, product craft and creator
                      infrastructure designed around the way Uzbek products
                      actually work.
                    </p>
                  </div>
                </div>

                <div className="grid border-t border-white/10 sm:grid-cols-3 lg:border-l lg:border-t-0">
                  {[
                    [
                      "01",
                      "Uzbek first",
                      "Pronunciation and prosody designed around local language patterns.",
                    ],
                    [
                      "02",
                      "Production ready",
                      "Realtime architecture, API primitives and scalable workflows.",
                    ],
                    [
                      "03",
                      "Creator native",
                      "Donation events and voice experiences built into the ecosystem.",
                    ],
                  ].map(([number, title, body]) => (
                    <div
                      key={number}
                      className="border-b border-white/10 p-7 last:border-b-0 sm:border-b-0 sm:border-r sm:p-8 sm:last:border-r-0"
                    >
                      <span className="text-sm font-mono text-white/25">
                        {number}
                      </span>

                      <h3 className="mt-16 text-xl font-semibold">
                        {title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/45">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* =====================================================
          MODELS
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                Voice models
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                Different voices.
                <span className="text-zinc-400 dark:text-zinc-600">
                  {" "}
                  Different personalities.
                </span>
              </h2>
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Explore models
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {models.map((model, index) => (
              <Reveal key={model.name} delay={index * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white/75 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                      <Volume2 className="size-4" />
                    </div>

                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                      {model.tone}
                    </span>
                  </div>

                  <div className="mt-10 flex h-24 items-center gap-1">
                    {model.bars.map((height, barIndex) => (
                      <motion.span
                        key={barIndex}
                        className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 to-sky-400 dark:from-white dark:to-sky-300"
                        animate={{
                          height: [
                            `${height * 0.7}%`,
                            `${height}%`,
                            `${height * 0.8}%`,
                          ],
                        }}
                        transition={{
                          duration: 2.3,
                          repeat: Infinity,
                          delay: barIndex * 0.04,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <h3 className="mt-7 text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {model.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {model.description}
                  </p>

                  <button
                    type="button"
                    className="group mt-6 flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white"
                  >
                    Preview voice
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* =====================================================
          LANGUAGES
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[38px] border border-zinc-200/80 bg-white/75 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] sm:p-12 lg:p-14">
              <div className="absolute right-0 top-0 size-96 rounded-full bg-emerald-400/[0.06] blur-3xl" />

              <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                    <Globe2 className="size-6" />
                  </div>

                  <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    Languages,
                    <span className="block text-zinc-400 dark:text-zinc-600">
                      with Uzbek first.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-xl leading-8 text-zinc-600 dark:text-zinc-400">
                    Multilingual by architecture. Local-first by design.
                    Build for Uzbek users without sacrificing global reach.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["O'zbek", "Latin", true],
                      ["Ўзбек", "Cyrillic", false],
                      ["Qaraqalpaq", "Latin", false],
                      ["English", "Global", false],
                      ["Русский", "Cyrillic", false],
                      ["Türkçe", "Latin", false],
                    ] as const
                  ).map(([language, type, primary]) => (
                    <div
                      key={language}
                      className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition ${primary
                        ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                        : "border-zinc-200/80 bg-zinc-50/70 text-zinc-950 hover:border-zinc-300 dark:border-white/10 dark:bg-white/[0.025] dark:text-white dark:hover:bg-white/[0.05]"
                        }`}
                    >
                      <div>
                        <p className="font-semibold">{language}</p>
                        <p
                          className={`mt-0.5 text-[11px] ${primary
                            ? "text-white/50 dark:text-zinc-500"
                            : "text-zinc-400"
                            }`}
                        >
                          {type}
                        </p>
                      </div>

                      {primary && <Check className="size-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* =====================================================
          API
      ===================================================== */}

      <SectionShell className="bg-[#060607] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
              <Code2 className="size-5 text-sky-300" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Developer API
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              Voice infrastructure.
              <span className="block text-white/30">
                Without the friction.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
              Generate speech, monitor jobs and route audio into your product
              using simple primitives built for developers.
            </p>

            <Link
              href="/docs"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02]"
            >
              Read the API docs
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] shadow-[0_40px_100px_-50px_rgba(14,165,233,0.35)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />

                <span className="ml-3 font-mono text-[11px] text-white/30">
                  miralas.ts
                </span>
              </div>

              <pre className="overflow-x-auto p-6 font-mono text-xs leading-7 text-sky-100 sm:p-8 sm:text-sm">
                <code>{`const audio = await miralas.voice.generate({
  language: "uz-Latn",
  model: "narrator-pro",
  text: "Assalomu alaykum, Miralas",
  format: "mp3",
});

console.log(audio.url);

// → generated in 24ms
// → quality: excellent
// → status: ready`}</code>
              </pre>

              <div className="border-t border-white/10 px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Request completed successfully
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* =====================================================
          USE CASES BENTO
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Use cases
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              Voice belongs
              <span className="text-zinc-400 dark:text-zinc-600">
                {" "}
                everywhere.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cases.map((item, index) => {
              const Icon = item.icon;
              const large = item.size === "large";

              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.04}
                  className={large ? "lg:col-span-2" : ""}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative h-full min-h-[230px] overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white/75 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="absolute -right-10 -top-10 size-36 rounded-full bg-sky-400/[0.07] blur-3xl transition duration-500 group-hover:bg-sky-400/[0.14]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                          <Icon className="size-5" />
                        </div>

                        <ArrowRight className="size-4 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-zinc-900 dark:text-zinc-700 dark:group-hover:text-white" />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <SectionShell className="bg-zinc-50/80 dark:bg-white/[0.015]">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Built with teams
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              When the voice sounds right,
              <span className="text-zinc-400 dark:text-zinc-600">
                {" "}
                people notice.
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              "The Uzbek pronunciation feels intentional, not bolted on.",
              "The donation direction is exactly what creators need.",
              "The product feels like infrastructure, not a toy.",
            ].map((quote, index) => (
              <Reveal key={quote} delay={index * 0.06}>
                <article className="h-full rounded-[30px] border border-zinc-200/80 bg-white p-7 shadow-[0_25px_90px_-70px_rgba(2,6,23,0.7)] dark:border-white/10 dark:bg-[#0b0b0c]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star
                          key={star}
                          className="size-3.5 fill-current"
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-700">
                      Verified
                    </span>
                  </div>

                  <p className="mt-10 text-xl font-medium leading-8 tracking-tight text-zinc-900 dark:text-zinc-100">
                    “{quote}”
                  </p>

                  <div className="mt-10 flex items-center gap-3 border-t border-zinc-200 pt-5 dark:border-white/10">
                    <div className="flex size-9 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                        Miralas Customer
                      </p>
                      <p className="text-xs text-zinc-400">
                        Product team
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* =====================================================
          STATS
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <div className="grid divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {stats.map(([value, label], index) => (
              <Reveal key={value} delay={index * 0.05}>
                <div className="px-6 py-10 text-center sm:px-8">
                  <p className="text-5xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white sm:text-6xl">
                    {value}
                  </p>

                  <p className="mx-auto mt-3 max-w-[150px] text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <SectionShell>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Pricing
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Start simple.
              <span className="text-zinc-400 dark:text-zinc-600">
                {" "}
                Scale when ready.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Explore the Miralas voice stack.",
                features: ["Voice previews", "Basic models", "Developer sandbox"],
              },
              {
                name: "Growth",
                price: "$29",
                description: "For products actively shipping voice.",
                features: [
                  "Production generation",
                  "Advanced models",
                  "API access",
                  "Creator workflows",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Infrastructure for larger teams.",
                features: [
                  "Dedicated support",
                  "Custom limits",
                  "Security review",
                  "Priority infrastructure",
                ],
              },
            ].map((plan, index) => (
              <Reveal key={plan.name} delay={index * 0.05}>
                <div
                  className={`relative h-full overflow-hidden rounded-[30px] p-7 ${index === 1
                    ? "border border-sky-400/30 bg-zinc-950 text-white shadow-[0_40px_120px_-65px_rgba(14,165,233,0.7)] dark:bg-[#0b0b0c]"
                    : "border border-zinc-200/80 bg-white/75 text-zinc-950 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:text-white"
                    }`}
                >
                  {index === 1 && (
                    <div className="absolute right-5 top-5 rounded-full bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      Most popular
                    </div>
                  )}

                  <p
                    className={`text-sm font-semibold ${index === 1 ? "text-sky-300" : "text-zinc-500"
                      }`}
                  >
                    {plan.name}
                  </p>

                  <p className="mt-6 text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </p>

                  <p
                    className={`mt-3 text-sm leading-6 ${index === 1
                      ? "text-white/50"
                      : "text-zinc-500 dark:text-zinc-400"
                      }`}
                  >
                    {plan.description}
                  </p>

                  <div
                    className={`my-7 h-px ${index === 1 ? "bg-white/10" : "bg-zinc-200 dark:bg-white/10"
                      }`}
                  />

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <Check
                          className={`size-4 ${index === 1
                            ? "text-emerald-300"
                            : "text-emerald-500"
                            }`}
                        />
                        <span
                          className={
                            index === 1
                              ? "text-white/75"
                              : "text-zinc-600 dark:text-zinc-400"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/pricing"
                    className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition hover:scale-[1.02] ${index === 1
                      ? "bg-white text-zinc-950"
                      : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                      }`}
                  >
                    View pricing
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <FAQ />

      <CTA />
    </div>
  );
}

export default LandingPage;