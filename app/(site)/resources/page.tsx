"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  CalendarDays,
  ChevronRight,
  Code2,
  FileText,
  
  GitBranch,
  
  Layers3,
  LifeBuoy,
  Newspaper,
  Rss,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";

const resources = [
  {
    number: "01",
    title: "Documentation",
    description:
      "Start with the fundamentals, understand the platform and build your first voice experience.",
    href: "/docs",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "API Reference",
    description:
      "Explore clean primitives for voice generation, models, authentication and production workflows.",
    href: "/docs/api",
    icon: Braces,
  },
  {
    number: "03",
    title: "Guides",
    description:
      "Practical patterns for education, creators, applications, localization and real-world products.",
    href: "/guides",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Changelog",
    description:
      "Follow every meaningful improvement across models, infrastructure and the Miralas platform.",
    href: "/changelog",
    icon: Newspaper,
  },
];

const articles = [
  {
    category: "Engineering",
    title: "Building Uzbek-first voice experiences",
    date: "Aug 08, 2026",
    href: "/blog/uzbek-first-voice",
  },
  {
    category: "Product",
    title: "Designing voice interfaces people actually enjoy",
    date: "Aug 02, 2026",
    href: "/blog/voice-interfaces",
  },
  {
    category: "Developers",
    title: "From your first request to production",
    date: "Jul 27, 2026",
    href: "/blog/production",
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
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
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

export default function ResourcesPage() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px] overflow-hidden"
      >
        <div className="absolute left-[8%] top-[8%] size-[420px] rounded-full bg-sky-400/[0.09] blur-[120px] dark:bg-sky-500/[0.10]" />
        <div className="absolute right-[5%] top-[15%] size-[360px] rounded-full bg-emerald-400/[0.07] blur-[120px] dark:bg-emerald-400/[0.07]" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT INDEX */}
            <Reveal>
              <div className="max-w-sm">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                  <span className="size-2 rounded-full bg-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.8)]" />
                  Resources
                </div>

                <div className="mt-12 border-l border-zinc-200 dark:border-white/10">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;

                    return (
                      <Link
                        key={resource.title}
                        href={resource.href}
                        className="group relative block px-6 py-4 transition-colors"
                      >
                        <span className="absolute -left-px top-0 h-full w-px origin-top scale-y-0 bg-zinc-950 transition-transform duration-500 group-hover:scale-y-100 dark:bg-white" />

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-zinc-400 transition-colors group-hover:text-sky-500">
                            {resource.number}
                          </span>

                          <Icon className="size-4 text-zinc-400 transition-all duration-300 group-hover:scale-110 group-hover:text-zinc-950 dark:group-hover:text-white" />

                          <span className="text-sm font-semibold text-zinc-600 transition-colors group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white">
                            {resource.title}
                          </span>

                          <ArrowUpRight className="ml-auto size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* RIGHT HERO */}
            <Reveal delay={0.08}>
              <div>
                <p className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                  Everything you need
                  <span className="block text-zinc-400 dark:text-zinc-600">
                    to build with Miralas.
                  </span>
                </p>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  Documentation, guides, APIs and product updates for
                  developers, creators and teams building the next generation
                  of voice experiences.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/docs"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-xl shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Start with docs
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="/blog"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-6 text-sm font-semibold text-zinc-800 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                  >
                    Explore the blog
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED RESOURCE */}
      <section className="relative px-6 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/docs"
              className="group relative block overflow-hidden rounded-[36px] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-[0_40px_120px_-70px_rgba(2,6,23,0.8)] transition duration-500 hover:-translate-y-1 sm:p-12 lg:p-16 dark:border-white/10"
            >
              {/* glow */}
              <div
                aria-hidden="true"
                className="absolute -right-32 -top-32 size-[500px] rounded-full bg-sky-500/20 blur-[100px] transition duration-700 group-hover:bg-sky-400/30"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-full w-1/2 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                  maskImage:
                    "radial-gradient(circle at center, black, transparent 72%)",
                }}
              />

              <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                      <BookOpen className="size-5 text-sky-300" />
                    </span>

                    <span className="text-sm font-semibold text-white/60">
                      Featured resource
                    </span>
                  </div>

                  <h2 className="mt-8 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                    The Miralas Developer Handbook
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
                    Learn how the platform works from your first API request
                    through production voice generation, authentication and
                    scalable application architecture.
                  </p>

                  <div className="mt-10 flex items-center gap-2 text-sm font-semibold">
                    Read the handbook
                    <ArrowRightIcon />
                  </div>
                </div>

                {/* CODE / TERMINAL VISUAL */}
                <div className="relative flex items-center">
                  <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl backdrop-blur-xl">
                    <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
                      <span className="size-2.5 rounded-full bg-white/20" />
                      <span className="size-2.5 rounded-full bg-white/20" />
                      <span className="size-2.5 rounded-full bg-white/20" />
                      <span className="ml-3 text-[11px] font-mono text-white/30">
                        miralas.ts
                      </span>
                    </div>

                    <pre className="overflow-x-auto p-6 text-xs leading-7 text-white/70 sm:text-sm">
                      <code>{`const voice = await miralas.voice.generate({
  model: "narrator-pro",
  language: "uz-Latn",
  text: "Assalomu alaykum, Miralas."
});

await voice.play();`}</code>
                    </pre>

                    <div className="flex items-center gap-2 border-t border-white/10 px-6 py-3 text-[11px] font-mono text-emerald-300/80">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      response 200 · audio ready
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* RESOURCE STRIP */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid overflow-hidden rounded-[30px] border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035] md:grid-cols-3">
              <Link
                href="/docs/api"
                className="group border-b border-zinc-200 p-7 transition hover:bg-white md:border-b-0 md:border-r dark:border-white/10 dark:hover:bg-white/[0.04]"
              >
                <Code2 className="size-6 text-sky-500" />

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  API Reference
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  Every endpoint, parameter and response you need to integrate
                  Miralas.
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                  Open reference
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/guides"
                className="group border-b border-zinc-200 p-7 transition hover:bg-white md:border-b-0 md:border-r dark:border-white/10 dark:hover:bg-white/[0.04]"
              >
                <Sparkles className="size-6 text-emerald-500" />

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  Guides & tutorials
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  Opinionated examples for shipping useful voice products
                  faster.
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                  Browse guides
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/changelog"
                className="group p-7 transition hover:bg-white dark:hover:bg-white/[0.04]"
              >
                <Rss className="size-6 text-violet-500" />

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  Changelog
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  New models, features and infrastructure improvements as
                  they ship.
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                  See what&apos;s new
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                From the journal
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Ideas behind the product.
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/[0.06]"
            >
              All articles
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
            {articles.map((article, index) => (
              <Reveal key={article.title} delay={index * 0.05}>
                <Link
                  href={article.href}
                  className="group grid gap-4 py-7 transition md:grid-cols-[140px_1fr_auto] md:items-center"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    {article.category}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-sky-500 sm:text-2xl">
                      {article.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                      <CalendarDays className="size-3.5" />
                      {article.date}
                    </div>
                  </div>

                  <span className="flex size-10 items-center justify-center rounded-full border border-zinc-200 transition duration-300 group-hover:-rotate-45 group-hover:bg-zinc-950 group-hover:text-white dark:border-white/10 dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER / COMMUNITY */}
      <section className="px-6 pb-24 sm:pb-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/[0.035] sm:p-10">
              <div className="absolute right-0 top-0 size-64 rounded-full bg-sky-500/[0.07] blur-3xl" />

              <Terminal className="relative size-7 text-sky-500" />

              <h2 className="relative mt-6 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for developers who want less friction.
              </h2>

              <p className="relative mt-4 max-w-xl leading-8 text-zinc-600 dark:text-zinc-400">
                Predictable APIs, clear documentation and primitives that fit
                naturally into the products you&apos;re already building.
              </p>

              <div className="relative mt-8 flex flex-wrap gap-3">
                {["TypeScript", "REST API", "Webhooks", "SDKs"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/docs"
                className="relative mt-9 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Read developer docs
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[32px] bg-zinc-950 p-8 text-white sm:p-10 dark:bg-zinc-900">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                <GitBranch className="size-5" />
              </div>

              <h2 className="mt-7 text-3xl font-semibold tracking-tight">
                Build in public.
              </h2>

              <p className="mt-4 leading-8 text-white/55">
                Follow the ecosystem, explore open-source work and see what
                we&apos;re building next.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  ["GitHub", "Explore the codebase"],
                  ["Community", "Talk with other builders"],
                  ["Updates", "Follow product releases"],
                ].map(([title, description]) => (
                  <Link
                    key={title}
                    href="/community"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:bg-white/[0.08]"
                  >
                    <div>
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {description}
                      </p>
                    </div>

                    <ArrowUpRight className="size-4 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/[0.08] blur-[100px]"
        />

        <Reveal className="relative mx-auto max-w-4xl text-center">
          <LifeBuoy className="mx-auto size-8 text-sky-500" />

          <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Don&lsquo;t just read.
            <span className="block text-zinc-400 dark:text-zinc-600">
              Build something with it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Pick a guide, open the API and start turning your idea into a
            real voice experience.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open documentation
            </Link>

            <Link
              href="/get-started"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            >
              Get started
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}