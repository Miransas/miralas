"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Globe2,
  Headphones,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

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

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Security by design",
    text: "Enterprise controls, protected infrastructure and access patterns designed for serious production environments.",
  },
  {
    icon: Globe2,
    title: "Global infrastructure",
    text: "Build voice experiences that can move from a local prototype to globally distributed production traffic.",
  },
  {
    icon: Code2,
    title: "API-first architecture",
    text: "Integrate generation, models, usage and workflows directly into the systems your teams already operate.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    text: "Work with a team that understands your architecture, rollout requirements and production priorities.",
  },
];

const enterprisePoints = [
  "Dedicated onboarding",
  "Priority technical support",
  "Custom usage limits",
  "Security review",
  "Production architecture guidance",
  "Flexible deployment planning",
];

export default function EnterprisePage() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* =====================================================
          AMBIENT SYSTEM BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden"
      >
        <div className="absolute left-[5%] top-[5%] size-[520px] rounded-full bg-sky-400/[0.07] blur-[140px] dark:bg-sky-500/[0.10]" />
        <div className="absolute right-[2%] top-[12%] size-[440px] rounded-full bg-violet-400/[0.06] blur-[140px] dark:bg-violet-500/[0.08]" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 78%)",
          }}
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-6 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              <span className="size-2 rounded-full bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.8)]" />
              Enterprise
            </div>
          </Reveal>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <Reveal>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[78px]">
                Voice infrastructure
                <span className="block text-zinc-400 dark:text-zinc-600">
                  built for serious scale.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
                Bring Miralas into your organization with production-grade
                APIs, dedicated support, security controls and infrastructure
                designed around your team.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Talk to Enterprise
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-7 text-sm font-semibold backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                >
                  Explore architecture
                </Link>
              </div>
            </Reveal>

            {/* SYSTEM DIAGRAM */}
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-10 rounded-full bg-sky-400/[0.07] blur-[80px]" />

                <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-50 p-5 shadow-[0_40px_120px_-70px_rgba(2,6,23,0.5)] dark:border-white/10 dark:bg-white/[0.035]">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        Miralas infrastructure
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-zinc-400">
                      LIVE
                    </span>
                  </div>

                  <div className="relative mt-5 grid grid-cols-3 gap-3">
                    {[
                      { icon: Globe2, label: "Global Edge" },
                      { icon: Server, label: "Voice Engine" },
                      { icon: Database, label: "Data Layer" },
                    ].map(({ icon: Icon, label }, index) => (
                      <motion.div
                        key={label}
                        animate={{
                          y: [0, index % 2 === 0 ? -4 : 4, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                        className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.045]"
                      >
                        <Icon className="size-5 text-sky-500" />

                        <p className="mt-4 text-xs font-semibold">
                          {label}
                        </p>

                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                          <motion.div
                            animate={{ width: ["35%", "82%", "55%"] }}
                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                            className="h-full rounded-full bg-sky-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative my-5 flex items-center justify-center">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

                    <div className="absolute flex size-10 items-center justify-center rounded-full border border-sky-500/20 bg-white shadow-lg dark:bg-zinc-950">
                      <Zap className="size-4 text-sky-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.045]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        Availability
                      </p>
                      <p className="mt-2 text-2xl font-semibold">99.9%</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.045]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        Regions
                      </p>
                      <p className="mt-2 text-2xl font-semibold">Global</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          ENTERPRISE SIGNALS
      ===================================================== */}

      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid overflow-hidden rounded-[30px] border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["99.9%", "Production availability"],
                ["24/7", "Infrastructure monitoring"],
                ["API", "Built for integration"],
                ["Global", "Deployment ready"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`p-7 ${
                    index !== 3
                      ? "border-b border-zinc-200 sm:border-r dark:border-white/10"
                      : ""
                  }`}
                >
                  <p className="text-3xl font-semibold tracking-tight">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Enterprise capabilities
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Everything changes when voice becomes infrastructure.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Miralas gives teams the foundation to move from individual
              experiments to dependable voice systems used across products,
              customers and internal workflows.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 md:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="group h-full bg-white p-8 transition-colors hover:bg-zinc-50 dark:bg-black dark:hover:bg-white/[0.035] sm:p-10">
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04]">
                        <Icon className="size-5 text-sky-500" />
                      </span>

                      <ArrowUpRight className="size-5 text-zinc-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-950 dark:text-zinc-700 dark:group-hover:text-white" />
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-lg leading-7 text-zinc-600 dark:text-zinc-400">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECURITY
      ===================================================== */}

      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-zinc-950 p-8 text-white shadow-[0_50px_140px_-80px_rgba(2,6,23,0.95)] sm:p-12 lg:p-16 dark:border dark:border-white/10">
              <div className="absolute right-[-10%] top-[-30%] size-[500px] rounded-full bg-sky-500/10 blur-[100px]" />

              <div className="relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                    <LockKeyhole className="size-5 text-sky-300" />
                  </div>

                  <h2 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Your infrastructure.
                    <span className="block text-white/40">
                      Your control.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-xl leading-8 text-white/55">
                    Enterprise deployments need more than a fast API. They
                    need predictable access, clear ownership and a platform
                    that can fit into existing security processes.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {enterprisePoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                        <Check className="size-3.5 text-emerald-300" />
                      </span>

                      <span className="text-sm font-medium text-white/80">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Built around your team
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              From architecture review to production.
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/15 lg:block"
            />

            <div className="grid gap-10 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Discover",
                  text: "Understand your use case, traffic profile and technical requirements.",
                  icon: Users,
                },
                {
                  number: "02",
                  title: "Architect",
                  text: "Design the right integration and deployment path with your team.",
                  icon: Network,
                },
                {
                  number: "03",
                  title: "Launch",
                  text: "Move from controlled testing to production with dedicated support.",
                  icon: Cloud,
                },
                {
                  number: "04",
                  title: "Scale",
                  text: "Expand across products, markets and voice-powered workflows.",
                  icon: Sparkles,
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal key={step.number} delay={index * 0.07}>
                    <div className="relative text-center">
                      <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-black">
                        <Icon className="size-6 text-sky-500" />
                      </div>

                      <span className="mt-6 block text-xs font-mono text-zinc-400">
                        {step.number}
                      </span>

                      <h3 className="mt-2 text-xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          API PANEL
      ===================================================== */}

      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid overflow-hidden rounded-[36px] border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035] lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-8 sm:p-12">
                <Code2 className="size-7 text-sky-500" />

                <h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Designed for engineering teams.
                </h2>

                <p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-400">
                  Keep your application architecture yours. Miralas provides
                  the voice primitives without forcing your team into a new
                  workflow.
                </p>

                <Link
                  href="/docs"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Explore API docs
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              <div className="border-t border-zinc-200 bg-zinc-950 p-6 text-white dark:border-white/10 sm:p-10 lg:border-l lg:border-t-0">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />

                    <span className="ml-3 font-mono text-[10px] text-white/30">
                      enterprise.ts
                    </span>
                  </div>

                  <pre className="overflow-x-auto p-6 text-xs leading-7 text-sky-100 sm:text-sm">
                    <code>{`const audio = await miralas.voice.generate({
  model: "narrator-pro",
  language: "uz-Latn",
  text: "Assalomu alaykum, Miralas.",
  options: {
    quality: "enterprise",
    realtime: true
  }
});

await audio.publish();`}</code>
                  </pre>

                  <div className="border-t border-white/10 px-6 py-3 font-mono text-[11px] text-emerald-300">
                    ✓ production request accepted
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden px-6 py-28 sm:py-36 lg:px-8">
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />

        <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/[0.07] blur-[120px]" />

        <Reveal className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <ShieldCheck className="size-5 text-sky-500" />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Ready to build at enterprise scale?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Tell us what you&apos;re building. We&apos;ll help you design the right
            Miralas architecture for your team and your users.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Contact Enterprise
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            >
              View pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}