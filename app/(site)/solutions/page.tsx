"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  GraduationCap,
  Headphones,
  Layers3,
  Mic2,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  type LucideIcon,
} from "lucide-react";

const solutions: Array<{
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  features: string[];
}> = [
  {
    title: "Education",
    eyebrow: "Learn without limits",
    description:
      "Turn lessons, courses and learning platforms into natural Uzbek audio experiences that feel made for the learner.",
    icon: GraduationCap,
    accent: "sky",
    features: [
      "Natural Uzbek narration",
      "Latin & Cyrillic workflows",
      "Listening exercises",
      "Accessible course audio",
    ],
  },
  {
    title: "Creators",
    eyebrow: "Give your voice a platform",
    description:
      "Build expressive voice content, connect supporters and turn individual moments into a sustainable creator experience.",
    icon: Mic2,
    accent: "violet",
    features: [
      "Creator voice profiles",
      "Donation-ready workflows",
      "Expressive narration",
      "Audience experiences",
    ],
  },
  {
    title: "Media",
    eyebrow: "Publish faster",
    description:
      "Generate localized narration for news, video, podcasts and digital media without slowing down your publishing workflow.",
    icon: Radio,
    accent: "emerald",
    features: [
      "Newsroom narration",
      "Fast content localization",
      "Voice presets",
      "Production automation",
    ],
  },
  {
    title: "Customer Support",
    eyebrow: "Make support sound human",
    description:
      "Bring natural Uzbek voice into customer journeys, automated responses and real-time product experiences.",
    icon: Headphones,
    accent: "amber",
    features: [
      "Voice support flows",
      "Localized responses",
      "Realtime-ready architecture",
      "Product notifications",
    ],
  },
  {
    title: "Enterprise",
    eyebrow: "Built for serious scale",
    description:
      "Give larger teams the controls, reliability and infrastructure needed to bring voice into production.",
    icon: BriefcaseBusiness,
    accent: "rose",
    features: [
      "Usage controls",
      "Security workflows",
      "Team collaboration",
      "Priority infrastructure",
    ],
  },
  {
    title: "Developers",
    eyebrow: "Voice as infrastructure",
    description:
      "Integrate generation directly into your application with clean APIs and primitives designed for product teams.",
    icon: Code2,
    accent: "cyan",
    features: [
      "API-first architecture",
      "Generation endpoints",
      "Status & automation",
      "Production integrations",
    ],
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose the experience",
    body: "Start with education, creators, media, support or your own product workflow.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Shape the voice",
    body: "Control language, personality, timing and the way your content should sound.",
    icon: Wand2,
  },
  {
    number: "03",
    title: "Ship it",
    body: "Move from a prototype to a production workflow through the Miralas platform and API.",
    icon: Sparkles,
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
          ? undefined
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

function SolutionVisual({
  icon: Icon,
  index,
}: {
  icon: LucideIcon;
  index: number;
}) {
  const reduced = useReducedMotion();

  const bars = [38, 62, 48, 78, 56, 88, 44, 70, 52, 82];

  return (
    <div className="relative h-52 overflow-hidden rounded-[24px] border border-zinc-200/70 bg-zinc-50/80 p-5 dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-400/10" />

      <div className="relative flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <Icon className="size-5 text-zinc-800 dark:text-zinc-100" />
        </div>

        <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Ready
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex h-20 items-end gap-1.5">
        {bars.map((height, barIndex) => (
          <motion.span
            key={barIndex}
            className="flex-1 rounded-full bg-gradient-to-t from-zinc-900 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300"
            animate={
              reduced
                ? undefined
                : {
                    height: [
                      `${Math.max(18, height - 22)}%`,
                      `${height}%`,
                      `${Math.max(24, height - 12)}%`,
                    ],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: barIndex * 0.07 + index * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[number];
  index: number;
}) {
  const Icon = solution.icon;

  return (
    <Reveal delay={index * 0.05}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative h-full overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white/80 p-5 shadow-[0_30px_100px_-70px_rgba(2,6,23,0.9)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-zinc-950/70 dark:shadow-[0_30px_100px_-70px_rgba(0,0,0,1)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -right-20 -top-20 size-52 rounded-full bg-sky-400/[0.08] blur-3xl" />
        </div>

        <SolutionVisual icon={Icon} index={index} />

        <div className="relative px-2 pb-2 pt-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            {solution.eyebrow}
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {solution.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {solution.description}
          </p>

          <div className="mt-7 space-y-2.5">
            {solution.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/[0.08]">
                  <Check className="size-3 text-emerald-500" />
                </span>
                {feature}
              </div>
            ))}
          </div>

          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 transition-all group-hover:gap-3 dark:text-white"
          >
            Explore solution
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function SolutionsPage() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[8%] top-40 size-[420px] rounded-full bg-sky-400/[0.07] blur-[120px] dark:bg-sky-500/[0.08]" />
        <div className="absolute right-[4%] top-[700px] size-[380px] rounded-full bg-emerald-400/[0.06] blur-[120px] dark:bg-emerald-500/[0.06]" />
      </div>

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-32 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.045] dark:text-zinc-300">
              <Sparkles className="size-3.5 text-sky-500" />
              Solutions built around real workflows
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Voice that adapts to{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                what you build.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Miralas gives education teams, creators, media companies and
              developers the voice infrastructure to create experiences that
              actually feel local.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-xl shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Find your solution
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
              >
                <Play className="size-4" />
                See the platform
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-zinc-500 dark:text-zinc-500">
              <span className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-emerald-500" />
                Uzbek-first
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-sky-500" />
                Built for production
              </span>
              <span className="flex items-center gap-2">
                <Code2 className="size-4 text-violet-500" />
                API ready
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-sky-400/10 via-transparent to-emerald-400/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-50/90 p-5 shadow-[0_45px_140px_-75px_rgba(2,6,23,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_45px_140px_-75px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between border-b border-zinc-200/70 pb-5 dark:border-white/10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                      Miralas Workspace
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Voice infrastructure
                    </p>
                  </div>

                  <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    <Mic2 className="size-4" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["Education", GraduationCap],
                    ["Creators", Users],
                    ["Media", Radio],
                    ["Developers", Code2],
                  ].map(([label, Icon], index) => {
                    const SolutionIcon = Icon as LucideIcon;

                    return (
                      <motion.div
                        key={label as string}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.35 + index * 0.08,
                          duration: 0.45,
                        }}
                        className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.035]"
                      >
                        <SolutionIcon className="size-5 text-sky-500" />
                        <p className="mt-4 text-sm font-semibold">
                          {label as string}
                        </p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.08]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${58 + index * 9}%` }}
                            transition={{
                              delay: 0.65 + index * 0.08,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.035]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">Active workflow</p>
                      <p className="mt-1 text-sm font-semibold">
                        Uzbek voice generation
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
                      LIVE
                    </span>
                  </div>

                  <div className="mt-5 flex h-16 items-end gap-1">
                    {[24, 42, 30, 68, 46, 78, 38, 60, 34, 72, 48, 64].map(
                      (height, index) => (
                        <motion.span
                          key={index}
                          className="flex-1 rounded-full bg-gradient-to-t from-zinc-900 to-sky-400 dark:from-white dark:to-sky-300"
                          animate={{
                            height: [`${height}%`, `${height * 0.65}%`, `${height}%`],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay: index * 0.06,
                            ease: "easeInOut",
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Built for your workflow
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              One platform.{" "}
              <span className="text-zinc-400 dark:text-zinc-600">
                Different ways to use it.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Choose the environment closest to your product and start with
              the workflows that matter most.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.title}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Simple by design
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                From idea to voice in three moves.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-zinc-600 dark:text-zinc-400">
                You do not need to redesign your product around voice. Miralas
                is designed to fit into the workflow you already have.
              </p>

              <Link
                href="/docs"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Read the documentation
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            <div className="space-y-4">
              {workflow.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.number} delay={index * 0.08}>
                    <div className="group flex gap-5 rounded-[26px] border border-zinc-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.09] dark:bg-white/[0.035]">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                        <Icon className="size-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>

                          <span className="text-xs font-bold tracking-widest text-zinc-300 dark:text-zinc-700">
                            {item.number}
                          </span>
                        </div>

                        <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                          {item.body}
                        </p>
                      </div>

                      <ChevronRight className="mt-1 hidden size-5 text-zinc-300 transition-transform group-hover:translate-x-1 dark:text-zinc-700 sm:block" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT DEPTH */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[38px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_45px_140px_-75px_rgba(2,6,23,0.9)] dark:border-white/10 sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(16,185,129,0.13),transparent_28%)]"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
                  One foundation
                </p>

                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Build one voice system. Use it everywhere.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  Start with one use case and expand naturally into your
                  broader product ecosystem without changing the underlying
                  voice infrastructure.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Voice generation",
                    "API automation",
                    "Creator tools",
                    "Localized audio",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["Local-first", "Uzbek language experience"],
                  ["Developer-ready", "Clean integration primitives"],
                  ["Production", "Built to grow with teams"],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
                  >
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-white/50">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 py-28 sm:py-36 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
            <BookOpen className="size-6 text-sky-500" />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
            Your product has a voice.
            <br />
            <span className="text-zinc-400 dark:text-zinc-600">
              Now make it sound right.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Start with the workflow that matters today. Build toward the
            voice experience your product needs tomorrow.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950"
            >
              Start with Miralas
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            >
              Talk to our team
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}