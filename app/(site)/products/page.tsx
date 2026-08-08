"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  Code2,
  Globe2,
  Headphones,
  Mic2,
  Play,
  Radio,
  Sparkles,
  Volume2,
  Wand2,
  Zap,
} from "lucide-react";

const products = [
  {
    id: "voice",
    eyebrow: "VOICE ENGINE",
    title: "Miralas Voice",
    description:
      "Uzbek-first text-to-speech built for narration, education, media and product experiences.",
    icon: Mic2,
    accent: "sky",
    tags: ["Uzbek", "TTS", "Realtime"],
  },
  {
    id: "studio",
    eyebrow: "CREATOR STUDIO",
    title: "Miralas Studio",
    description:
      "Shape voice, pacing and expression from one focused creative workspace.",
    icon: Wand2,
    accent: "violet",
    tags: ["Creators", "Voice", "Studio"],
  },
  {
    id: "api",
    eyebrow: "DEVELOPER PLATFORM",
    title: "Miralas API",
    description:
      "Production-ready primitives for generating speech and building voice into your applications.",
    icon: Code2,
    accent: "emerald",
    tags: ["API", "SDK", "Automation"],
  },
  {
    id: "donations",
    eyebrow: "CREATOR ECONOMY",
    title: "Miralas Donations",
    description:
      "Turn audience support into meaningful creator experiences with voice-powered moments.",
    icon: Sparkles,
    accent: "amber",
    tags: ["Support", "Creators", "Payments"],
  },
];

const modelBars = [
  32, 58, 44, 76, 52, 88, 62, 42, 72, 94, 55, 78, 48, 68, 84, 46, 74,
  58, 90, 52, 70, 42, 82, 64, 48, 76, 56, 86,
];

const capabilities = [
  {
    icon: Globe2,
    title: "Uzbek-first",
    body: "Latin and Cyrillic workflows designed around the language from the beginning.",
  },
  {
    icon: AudioLines,
    title: "Expressive audio",
    body: "Control pacing, emphasis and delivery instead of producing flat synthetic speech.",
  },
  {
    icon: Zap,
    title: "Realtime-ready",
    body: "Architecture designed for interactive products, assistants and live experiences.",
  },
  {
    icon: Code2,
    title: "API-native",
    body: "Simple primitives that fit naturally into existing product and automation stacks.",
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
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: 24,
              filter: "blur(8px)",
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
      viewport={{ once: true, margin: "-80px" }}
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

function Waveform({
  compact = false,
}: {
  compact?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`flex items-center justify-center gap-[3px] ${
        compact ? "h-16" : "h-32"
      }`}
    >
      {modelBars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-[3px] rounded-full bg-gradient-to-t from-sky-500 via-cyan-400 to-emerald-300"
          animate={
            reduced
              ? undefined
              : {
                  height: [
                    `${Math.max(12, height * 0.52)}%`,
                    `${height}%`,
                    `${Math.max(18, height * 0.68)}%`,
                  ],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: index * 0.045,
            ease: "easeInOut",
          }}
          style={
            reduced
              ? {
                  height: `${height}%`,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function ProductIcon({
  icon: Icon,
  accent,
}: {
  icon: typeof Mic2;
  accent: string;
}) {
  const styles: Record<string, string> = {
    sky: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
    violet: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
  };

  return (
    <div
      className={`flex size-12 items-center justify-center rounded-2xl ring-1 ${
        styles[accent]
      }`}
    >
      <Icon className="size-5" />
    </div>
  );
}

function VoiceProductVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white shadow-[0_40px_120px_-70px_rgba(15,23,42,0.65)] dark:border-white/10 dark:bg-[#0b0b0c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.16),transparent_45%)]" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Live generation
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
              Narrator Pro
            </h3>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition hover:scale-105 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
            aria-label="Play preview"
          >
            <Play className="ml-0.5 size-4 fill-current" />
          </button>
        </div>

        <div className="mt-8 rounded-[24px] border border-zinc-200/80 bg-zinc-50/80 px-5 py-6 dark:border-white/10 dark:bg-white/[0.035]">
          <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            Assalomu alaykum. Miralas bilan tabiiy ovoz tajribalarini
            mahsulotingizga olib keling.
          </p>

          <div className="mt-6">
            <Waveform />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["UZ-Latn", "Natural", "0.8x", "24 kHz"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["Language", "Uzbek"],
            ["Quality", "Studio"],
            ["Status", "Ready"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-4 dark:border-white/10 dark:bg-white/[0.025]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute -right-20 -top-20 size-48 rounded-full bg-sky-400/10 blur-3xl"
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.2, 1],
                opacity: [0.35, 0.65, 0.35],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* HERO */}

      <section className="relative min-h-[780px] overflow-hidden px-6 pb-24 pt-32 sm:pt-40 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-[15%] size-[420px] rounded-full bg-sky-400/10 blur-[120px] dark:bg-sky-500/10" />
          <div className="absolute bottom-[5%] right-[5%] size-[360px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              The Miralas product ecosystem
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Voice products built around{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                real language.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Miralas brings voice generation, creative tooling, developer
              infrastructure and creator monetization into one focused
              ecosystem.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-xl shadow-zinc-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Start creating
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                Explore the API
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Uzbek-first
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                API ready
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Creator focused
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <VoiceProductVisual />
          </Reveal>
        </div>
      </section>

      {/* PRODUCT ECOSYSTEM */}

      <section className="border-y border-zinc-200/70 bg-zinc-50/70 px-6 py-24 dark:border-white/10 dark:bg-[#070707] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
              One ecosystem
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Four products. One voice infrastructure.
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Start with generation, move into creation, connect your product,
              then build an audience around it.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {products.map((product, index) => {
              const Icon = product.icon;

              return (
                <Reveal key={product.id} delay={index * 0.06}>
                  <Link
                    href={`/products/${product.id}`}
                    className="group relative block h-full overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white p-7 shadow-[0_25px_80px_-60px_rgba(15,23,42,0.7)] transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_35px_100px_-60px_rgba(15,23,42,0.85)] dark:border-white/10 dark:bg-[#0c0c0d] dark:hover:border-white/20"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <ProductIcon icon={Icon} accent={product.accent} />

                      <span className="flex size-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition duration-300 group-hover:translate-x-1 group-hover:text-zinc-950 dark:border-white/10 dark:text-zinc-500 dark:group-hover:text-white">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>

                    <p className="mt-8 text-[10px] font-bold tracking-[0.2em] text-zinc-400">
                      {product.eyebrow}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {product.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {product.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-zinc-200/70 pt-5 dark:border-white/10">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                        Explore product
                        <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VOICE ENGINE */}

      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20">
              <AudioLines className="size-5" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
              Miralas Voice
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Give your product a voice that does not sound translated.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Build narration, assistants, lessons, support experiences and
              media workflows around expressive Uzbek speech.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {[
                "Latin & Cyrillic",
                "Natural pacing",
                "Production audio",
                "Realtime workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <Check className="size-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[32px] border border-zinc-200/80 bg-zinc-50 p-6 dark:border-white/10 dark:bg-[#0a0a0a] sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Voice intelligence
                  </p>
                  <p className="mt-2 font-semibold">Natural delivery</p>
                </div>

                <Volume2 className="size-5 text-sky-500" />
              </div>

              <div className="mt-8 rounded-[24px] bg-white p-5 dark:bg-white/[0.04]">
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  &quot;Bugun yangi loyihangizni boshlash uchun ajoyib kun.&quot;
                </p>

                <div className="mt-7">
                  <Waveform compact />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                    Model
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Narrator Pro
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                    Mode
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Expressive
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}

      <section className="border-y border-zinc-200/70 bg-zinc-50/60 px-6 py-24 dark:border-white/10 dark:bg-[#060606] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
              Built underneath
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              The details that make voice feel like a product.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="group h-full rounded-[26px] border border-zinc-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/[0.04] dark:border-white/10 dark:bg-[#0b0b0c] dark:hover:shadow-black/30">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-950 text-white transition duration-300 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                      <Icon className="size-4.5" />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* API */}

      <section className="bg-[#070707] px-6 py-24 text-white sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <Code2 className="size-5 text-sky-300" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Miralas API
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              From one request to production audio.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/60">
              Keep the interface beautiful for creators and the underlying
              infrastructure predictable for developers.
            </p>

            <Link
              href="/docs"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-sky-300"
            >
              Read the documentation
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_120px_-70px_rgba(56,189,248,0.45)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-amber-400/70" />
                <span className="size-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs text-white/35">
                  generate.ts
                </span>
              </div>

              <pre className="overflow-x-auto p-6 text-sm leading-7">
                <code>
                  <span className="text-violet-300">const</span>{" "}
                  <span className="text-sky-300">audio</span>{" "}
                  <span className="text-white/50">=</span>{" "}
                  <span className="text-violet-300">await</span>{" "}
                  <span className="text-emerald-300">
                    miralas.voice.generate
                  </span>
                  <span className="text-white/50">({"{"}</span>
                  {"\n  "}
                  <span className="text-sky-200">language</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-amber-200">
                    &quot;uz-Latn&quot;
                  </span>
                  <span className="text-white/50">,</span>
                  {"\n  "}
                  <span className="text-sky-200">model</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-amber-200">
                    &quot;narrator-pro&quot;
                  </span>
                  <span className="text-white/50">,</span>
                  {"\n  "}
                  <span className="text-sky-200">text</span>
                  <span className="text-white/50">:</span>{" "}
                  <span className="text-amber-200">
                    &quot;Assalomu alaykum, Miralas&quot;
                  </span>
                  {"\n"}
                  <span className="text-white/50">{"});"}</span>
                </code>
              </pre>

              <div className="border-t border-white/10 px-6 py-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Request completed
                  </span>
                  <span className="text-white/35">201 Created</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL */}

      <section className="relative overflow-hidden px-6 py-28 sm:py-36 lg:px-8">
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[130px] dark:bg-sky-500/10" />

        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xl dark:bg-white dark:text-zinc-950">
            <Headphones className="size-6" />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
            Your next product can have a voice.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
            Start with one voice workflow and grow into a complete audio
            platform when you are ready.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Start with Miralas
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}