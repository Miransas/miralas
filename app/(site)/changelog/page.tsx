"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Code2,
  Layers3,
  Rocket,
  Sparkles,
  Wrench,
} from "lucide-react";

const releases = [
  {
    date: "September 2025",
    version: "The Beginning",
    title: "The idea existed before the product.",
    description:
      "The first Miransas product plans started here. Architecture, product direction and the long-term vision were outlined before the public product began taking shape.",
    icon: Layers3,
    status: "Foundation",
    featured: true,
    changes: [
      "Initial product vision",
      "Long-term platform direction",
      "Early architecture planning",
    ],
  },
  {
    date: "April 2026",
    version: "Active Development",
    title: "Miransas started becoming real.",
    description:
      "The project moved from planning into active development. Core ideas started turning into working systems, interfaces and reusable infrastructure.",
    icon: Wrench,
    status: "Development",
    changes: [
      "Core development started",
      "Initial application architecture",
      "First reusable UI foundations",
    ],
  },
  {
    date: "2026",
    version: "Product Foundation",
    title: "Building the platform layer.",
    description:
      "The ecosystem began taking shape around products, APIs, developer tooling and a consistent design language.",
    icon: Code2,
    status: "Building",
    changes: [
      "Product architecture",
      "Developer experience",
      "Design system foundations",
      "Shared components and utilities",
    ],
  },
  {
    date: "2026",
    version: "Interface System",
    title: "The interface got serious.",
    description:
      "Miransas evolved into a cohesive product experience with dedicated pages, responsive layouts, premium interactions and a complete dark/light visual system.",
    icon: Sparkles,
    status: "Design",
    changes: [
      "Premium navigation system",
      "Dark and light mode",
      "Motion and interaction system",
      "Dedicated product experiences",
    ],
  },
  {
    date: "Now",
    version: "Current",
    title: "Still building.",
    description:
      "Miransas is actively evolving. More products, developer tools, infrastructure and platform capabilities are being built behind the scenes.",
    icon: Rocket,
    status: "Active",
    featured: true,
    changes: [
      "More products in development",
      "Developer platform expansion",
      "Infrastructure improvements",
      "New experiences coming soon",
    ],
  },
];

function ReleaseCard({
  release,
  index,
}: {
  release: (typeof releases)[number];
  index: number;
}) {
  const Icon = release.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative grid gap-6 md:grid-cols-[150px_1fr] md:gap-10"
    >
      {/* Timeline point */}
      <div className="relative hidden md:block">
        <div className="sticky top-28 pt-2">
          <p className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
            {release.date}
          </p>

          <p className="mt-1 text-xs font-medium text-zinc-400">
            {release.version}
          </p>
        </div>
      </div>

      {/* Mobile date */}
      <div className="md:hidden">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
          <CalendarDays className="size-3.5" />
          {release.date}
        </div>
      </div>

      <div
        className={[
          "group relative overflow-hidden rounded-[30px] border p-7 transition duration-500 sm:p-8",
          release.featured
            ? "border-zinc-300/80 bg-white shadow-[0_30px_100px_-65px_rgba(2,6,23,0.55)] hover:-translate-y-1 hover:shadow-[0_40px_120px_-65px_rgba(14,165,233,0.25)] dark:border-white/15 dark:bg-white/[0.055]"
            : "border-zinc-200/80 bg-white/65 shadow-sm hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_30px_100px_-70px_rgba(2,6,23,0.6)] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-white/20",
        ].join(" ")}
      >
        {release.featured && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-sky-400/10 blur-3xl transition duration-700 group-hover:bg-sky-400/20"
          />
        )}

        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 dark:bg-white dark:text-zinc-950">
              <Icon className="size-5" />
            </div>

            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
              {release.status}
            </span>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              {release.version}
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              {release.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {release.description}
            </p>
          </div>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {release.changes.map((change) => (
              <div
                key={change}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 px-4 py-3 dark:border-white/8 dark:bg-white/[0.035]"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <Check className="size-3" />
                </span>

                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ChangelogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[10%] top-[-8%] size-[430px] rounded-full bg-sky-400/8 blur-[130px] dark:bg-sky-500/10" />
        <div className="absolute right-[5%] top-[28%] size-[380px] rounded-full bg-emerald-400/8 blur-[130px] dark:bg-emerald-500/8" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              Product evolution
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Building in public,
              <br />
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                one release at a time.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              A living record of how Miransas moves from ideas and
              experiments into products, infrastructure and experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-6 pb-28 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            {/* Timeline line */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[74px] top-0 hidden w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent dark:via-white/10 md:block"
            />

            <div className="space-y-7">
              {releases.map((release, index) => (
                <ReleaseCard
                  key={`${release.date}-${release.version}`}
                  release={release}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coming next */}
      <section className="relative px-6 pb-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_40px_130px_-75px_rgba(2,6,23,0.9)] dark:border-white/10 sm:p-12"
        >
          <div className="relative text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
              <Rocket className="size-5 text-sky-300" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              What&apos;s next
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              More is being built.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
              New products, developer tools, infrastructure and experiments
              will appear here as they become ready.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/55">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Actively developing
            </div>
          </div>
        </motion.div>
      </section>

      {/* Back */}
      <div className="relative px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Miransas
            <ArrowUpRight className="ml-1 size-3.5 opacity-40" />
          </Link>
        </div>
      </div>
    </main>
  );
}