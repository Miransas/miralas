"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Globe2,
  Layers3,
  Mic2,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";

const principles = [
  {
    number: "01",
    icon: Globe2,
    title: "Local first",
    text: "We start with the language, culture and listening habits that global platforms often treat as an afterthought.",
  },
  {
    number: "02",
    icon: Waves,
    title: "Human by design",
    text: "Natural rhythm, timing and expression matter more than simply turning text into sound.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Developer first",
    text: "Voice should be infrastructure. Clean APIs, predictable systems and tools that disappear into the product.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Built to scale",
    text: "From a single creator to production infrastructure, every layer is designed with the next stage in mind.",
  },
];

const layers = [
  {
    icon: Sparkles,
    label: "Intelligence",
    title: "Voice models",
    text: "Expressive models designed around real language rather than generic output.",
  },
  {
    icon: Network,
    label: "Infrastructure",
    title: "Miralas Core",
    text: "The systems that connect generation, orchestration, identity and delivery.",
  },
  {
    icon: Code2,
    label: "Interface",
    title: "Developer API",
    text: "Simple primitives that let teams build voice directly into their products.",
  },
  {
    icon: Radio,
    label: "Experience",
    title: "Products",
    text: "Tools for creators, education, media, support and the next generation of local applications.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        margin: "-100px",
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

function SignalVisual() {
  const reduced = useReducedMotion();

  const bars = [
    32, 48, 74, 44, 86, 58, 92, 66, 38, 78, 54, 88, 46, 70, 96, 52, 82,
    42, 68, 90, 56, 76, 36, 62,
  ];

  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-50 shadow-[0_40px_120px_-70px_rgba(2,6,23,0.35)] dark:border-white/[0.08] dark:bg-[#080808] dark:shadow-[0_40px_120px_-70px_rgba(0,0,0,0.9)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 dark:opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,24,27,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.055) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[90px] dark:bg-sky-400/[0.07]"
      />

      <div className="relative flex h-full min-h-[440px] flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
              Miralas signal
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Language → intelligence → voice
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            System online
          </div>
        </div>

        <div className="relative mt-auto flex h-52 items-center gap-1.5 sm:gap-2">
          {bars.map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300"
              animate={
                reduced
                  ? undefined
                  : {
                      height: [
                        `${height * 0.45}%`,
                        `${height}%`,
                        `${height * 0.62}%`,
                      ],
                    }
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: index * 0.055,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {["UZ-Latn", "Natural prosody", "Realtime", "API"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="relative mt-14">
      <div className="absolute left-[12.5%] right-[12.5%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent lg:block dark:via-white/10" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {layers.map((layer, index) => {
          const Icon = layer.icon;

          return (
            <Reveal key={layer.title} delay={index * 0.06}>
              <div className="group relative h-full rounded-[28px] border border-zinc-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-65px_rgba(2,6,23,0.8)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_35px_100px_-65px_rgba(2,6,23,0.8)] dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-white/[0.15]">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-950 text-white transition duration-500 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                    <Icon className="size-5" />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-600">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                  {layer.label}
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {layer.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {layer.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:pb-32 sm:pt-40 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(24,24,27,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.035) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 size-[620px] rounded-full bg-sky-400/[0.08] blur-[120px] dark:bg-sky-400/[0.055]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                <Sparkles className="size-3.5 text-sky-500" />
                About Miralas
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                Voice should sound
                <span className="block text-zinc-400 dark:text-zinc-600">
                  like it belongs here.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Miralas is building voice infrastructure for products that
                need language to feel natural, expressive and local — starting
                with Uzbek.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-started"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-xl shadow-zinc-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Start building
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="#story"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-6 text-sm font-semibold text-zinc-700 backdrop-blur-xl transition duration-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300 dark:hover:bg-white/[0.07]"
                >
                  Our story
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SignalVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MANIFESTO
      ========================================================= */}

      <section
        id="story"
        className="border-y border-zinc-200/70 bg-zinc-50/70 px-6 py-24 dark:border-white/[0.06] dark:bg-[#090909] sm:py-32 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
              Why we exist
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Local language deserves first-class technology.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-4xl">
              <p className="text-2xl font-medium leading-[1.45] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                The internet became global. Voice technology should not mean
                that every language sounds the same.
              </p>

              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-8 text-zinc-600 dark:text-zinc-400">
                  We believe the next generation of digital products will not
                  only read and display information. They will speak, listen
                  and communicate naturally with the people using them.
                </p>

                <p className="text-sm leading-8 text-zinc-600 dark:text-zinc-400">
                  That future needs infrastructure that understands the
                  details of local languages instead of treating them as a
                  translation layer added at the end.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          WHAT WE BUILD
      ========================================================= */}

      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
              What we&lsquo;re building
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              One voice layer.
              <span className="block text-zinc-400 dark:text-zinc-600">
                Many ways to build with it.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Miralas connects models, infrastructure, APIs and products into
              one system so teams can focus on what their users experience.
            </p>
          </Reveal>

          <Architecture />
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <Reveal>
              <div className="sticky top-32">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                  Our principles
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  How we think about building.
                </h2>

                <p className="mt-5 max-w-md text-base leading-8 text-zinc-600 dark:text-zinc-400">
                  Technology is only useful when the decisions behind it are
                  intentional.
                </p>
              </div>
            </Reveal>

            <div className="divide-y divide-zinc-200 dark:divide-white/[0.08]">
              {principles.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.number} delay={index * 0.04}>
                    <div className="group grid gap-6 py-8 sm:grid-cols-[70px_48px_1fr] sm:items-start">
                      <span className="text-sm font-bold tabular-nums text-zinc-300 dark:text-zinc-700">
                        {item.number}
                      </span>

                      <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 transition duration-300 group-hover:border-zinc-300 group-hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:group-hover:border-white/20 dark:group-hover:bg-white/[0.06]">
                        <Icon className="size-5 text-zinc-600 dark:text-zinc-300" />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SCALE / INFRASTRUCTURE
      ========================================================= */}

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[40px] bg-zinc-950 px-7 py-12 text-white shadow-[0_45px_140px_-80px_rgba(2,6,23,0.9)] dark:border dark:border-white/[0.08] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
                maskImage:
                  "radial-gradient(circle at center, black, transparent 78%)",
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                  The long game
                </p>

                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                  We are not building another voice demo.
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                  We are building the layer underneath products that need
                  voice to work reliably, naturally and at scale.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  ["01", "Models that understand context"],
                  ["02", "Infrastructure that stays invisible"],
                  ["03", "Interfaces developers actually enjoy"],
                  ["04", "Products people want to use"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 backdrop-blur-xl"
                  >
                    <span className="text-xs font-bold text-sky-300">
                      {number}
                    </span>
                    <span className="text-sm font-medium text-white/85">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          VISION
      ========================================================= */}

      <section className="px-6 py-24 pb-32 sm:py-32 sm:pb-40 lg:px-8">
        <Reveal className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04]">
            <Mic2 className="size-6 text-sky-500" />
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
            The vision
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            A future where technology
            <span className="block text-zinc-400 dark:text-zinc-600">
              speaks your language naturally.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Starting with Uzbek is not a limitation. It is our point of
            conviction: build something deeply local, then make the technology
            capable of reaching much further.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/get-started"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Build with Miralas
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
            >
              Explore the platform
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}