"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  DatabaseZap,
  FileText,
  MessagesSquare,
  Mic2,
  Play,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

export type MarketingPageData = {
  eyebrow: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
  features: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  highlight: {
    title: string;
    body: string;
    bullets: string[];
  };
  faq?: { question: string; answer: string }[];
};

const icons = [
  Mic2,
  Wand2,
  Code2,
  MessagesSquare,
  ShieldCheck,
  DatabaseZap,
];

const easing = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};

function VisualPanel({ title }: { title: string }) {
  const bars = [
    42, 68, 54, 82, 61, 91, 48, 74, 58, 96, 47, 72, 88, 55, 79, 63,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: easing,
      }}
      className="relative"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-[60px] bg-sky-500/[0.08] blur-3xl dark:bg-sky-400/[0.08]"
      />

      <div className="relative overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white/80 p-5 shadow-[0_40px_120px_-70px_rgba(2,6,23,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] sm:p-6">
        {/* top shine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
        />

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Live system
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
              {title}
            </h3>
          </div>

          <div className="rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300">
            Active
          </div>
        </div>

        {/* waveform */}
        <div className="relative mt-10 h-36 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-5 dark:border-white/[0.08] dark:bg-black/30">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-white/[0.07]"
          />

          <div className="relative flex h-full items-center gap-1.5">
            {bars.map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300"
                animate={{
                  height: [
                    `${height * 0.48}%`,
                    `${height}%`,
                    `${height * 0.68}%`,
                    `${height * 0.88}%`,
                  ],
                  opacity: [0.65, 1, 0.8, 1],
                }}
                transition={{
                  duration: 2.4 + (index % 4) * 0.15,
                  repeat: Infinity,
                  delay: index * 0.06,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            <span>00:00</span>
            <span>VOICE STREAM</span>
            <span>00:12</span>
          </div>
        </div>

        {/* status chips */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["UZ", "Language"],
            ["API", "Connected"],
            ["TTS", "Processing"],
          ].map(([label, text]) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-3 py-3 dark:border-white/[0.08] dark:bg-white/[0.035]"
            >
              <p className="text-[10px] font-black tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                {label}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* bottom status */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200/70 pt-4 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Voice engine ready
            </span>
          </div>

          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            24ms
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-2xl"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

export function MarketingPage({ data }: { data: MarketingPageData }) {
  return (
    <div className="overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8">
        {/* background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-[8%] top-[8%] size-[420px] rounded-full bg-sky-400/[0.08] blur-[120px] dark:bg-sky-400/[0.10]" />
          <div className="absolute right-[5%] top-[18%] size-[360px] rounded-full bg-emerald-400/[0.06] blur-[110px] dark:bg-emerald-400/[0.07]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-white/10" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300">
              <Sparkles className="size-3.5 text-sky-500" />
              {data.eyebrow}
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              {data.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {data.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {data.primary}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-6 text-sm font-semibold text-zinc-800 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
              >
                <Play className="size-4" />
                {data.secondary}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Uzbek-first voice
              </span>

              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                API ready
              </span>

              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Production ready
              </span>
            </div>
          </motion.div>

          <VisualPanel title="Miralas Voice Engine" />
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {data.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: easing,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[26px] border border-zinc-200/80 bg-zinc-50/70 p-7 shadow-[0_24px_90px_-65px_rgba(2,6,23,0.8)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_35px_100px_-65px_rgba(2,6,23,0.5)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:shadow-[0_35px_100px_-65px_rgba(0,0,0,0.9)]"
            >
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-sky-400/[0.08] blur-2xl transition-opacity group-hover:opacity-100 dark:bg-sky-400/[0.1]"
              />

              <p className="relative text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                {stat.value}
              </p>

              <p className="relative mt-2 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="Built as a complete voice operating system."
            description="Everything needed to turn voice from a feature into a real product layer."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, index) => {
              const Icon = icons[index % icons.length];

              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: easing,
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white/75 p-7 shadow-[0_20px_70px_-55px_rgba(2,6,23,0.65)] backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_35px_100px_-60px_rgba(2,6,23,0.7)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/15 dark:hover:shadow-[0_35px_100px_-60px_rgba(0,0,0,0.9)]"
                >
                  {/* hover glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 size-32 rounded-full bg-sky-400/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-sky-400/[0.08]"
                  />

                  <div className="relative flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl dark:bg-white dark:text-zinc-950">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="relative mt-6 text-xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.body}
                  </p>

                  <div className="relative mt-6 flex items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors group-hover:text-sky-600 dark:text-zinc-500 dark:group-hover:text-sky-400">
                    Explore capability
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PLATFORM DEPTH
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easing }}
          className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-zinc-200/10 bg-zinc-950 p-8 text-white shadow-[0_45px_140px_-80px_rgba(2,6,23,0.95)] dark:border-white/10 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-12"
        >
          {/* background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.12),transparent_28%)]"
          />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Platform depth
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              {data.highlight.title}
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-white/65">
              {data.highlight.body}
            </p>

            <Link
              href="/docs"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-sky-300"
            >
              Explore the platform
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative mt-10 grid gap-3 lg:mt-0 lg:self-center">
            {data.highlight.bullets.map((bullet, index) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: easing,
                }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-xl transition-colors hover:bg-white/[0.09]"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                  <Check className="size-4 text-emerald-300" />
                </span>

                <span className="text-sm font-medium text-white/85">
                  {bullet}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      {data.faq && data.faq.length > 0 ? (
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions teams ask first."
              description="Straightforward answers before you start building with Miralas."
            />

            <div className="mt-12 grid gap-3">
              {data.faq.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.045,
                    ease: easing,
                  }}
                  className="group rounded-[24px] border border-zinc-200/80 bg-zinc-50/65 p-6 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/15 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-semibold tracking-tight text-zinc-950 dark:text-white">
                        {item.question}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden px-6 py-28 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-50/80 p-8 text-center shadow-[0_35px_120px_-80px_rgba(2,6,23,0.9)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/[0.12] blur-3xl dark:bg-sky-400/[0.10]"
          />

          <div className="relative">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xl dark:bg-white dark:text-zinc-950">
              <Mic2 className="size-5" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Start building
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-5xl">
              Ready to hear Miralas in your product?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-600 dark:text-zinc-400">
              Start with a prototype, then scale into voice generation,
              donations and API automation for real teams.
            </p>

            <Link
              href="/get-started"
              className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Start Creating
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}