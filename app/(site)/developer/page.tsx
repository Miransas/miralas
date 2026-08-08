"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Gauge,

  Globe2,
  LockKeyhole,
  Mic2,
  Network,
  Package,
  Play,
  Puzzle,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

const stack = [
  {
    name: "TypeScript",
    label: "SDK & Web",
    description: "Type-safe APIs and first-class tooling for modern applications.",
    icon: Braces,
    className: "text-sky-500",
  },
  {
    name: "JavaScript",
    label: "Universal runtime",
    description: "Simple integration for browsers, servers and edge applications.",
    icon: Code2,
    className: "text-amber-500",
  },
  {
    name: "Rust",
    label: "Core Engine",
    description: "High-performance systems designed for predictable execution.",
    icon: Cpu,
    className: "text-orange-500",
  },
  {
    name: "Python",
    label: "AI Runtime",
    description: "Flexible model workflows, experimentation and intelligent pipelines.",
    icon: Sparkles,
    className: "text-emerald-500",
  },
];

const capabilities = [
  {
    icon: Zap,
    title: "Low-latency execution",
    body: "Built around fast request handling and streaming-friendly voice workloads.",
  },
  {
    icon: ShieldCheck,
    title: "Production reliability",
    body: "Predictable APIs, controlled execution and infrastructure designed for real products.",
  },
  {
    icon: Network,
    title: "Composable architecture",
    body: "Connect voice generation, models, events and your own application logic.",
  },
  {
    icon: LockKeyhole,
    title: "Security by design",
    body: "Keep credentials, generation workflows and application data behind controlled boundaries.",
  },
];

const endpoints = [
  ["POST", "/v1/voices/generate", "Generate speech"],
  ["GET", "/v1/voices", "List available voices"],
  ["GET", "/v1/models", "List voice models"],
  ["POST", "/v1/webhooks", "Create an event endpoint"],
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
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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

function ArchitectureNode({
  icon: Icon,
  title,
  subtitle,
  active = false,
}: {
  icon: typeof Code2;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={[
        "relative rounded-2xl border p-4 backdrop-blur-xl transition-all",
        active
          ? "border-sky-500/30 bg-sky-500/[0.08] shadow-[0_20px_60px_-35px_rgba(14,165,233,0.7)]"
          : "border-zinc-200/80 bg-white/75 dark:border-white/10 dark:bg-white/[0.045]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.06]">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="font-semibold tracking-tight">{title}</p>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FlowLine() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <div className="relative h-px w-full overflow-hidden bg-zinc-200 dark:bg-white/10">
        <motion.div
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
          animate={{ x: ["-120%", "420%"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <ChevronRight className="ml-1 size-4 shrink-0 text-zinc-400" />
    </div>
  );
}

function TerminalWindow() {
  const reduced = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-[0_45px_140px_-70px_rgba(0,0,0,0.9)]">
      <div className="flex h-12 items-center gap-2 border-b border-white/10 px-5">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <div className="ml-4 flex items-center gap-2 text-xs text-white/35">
          <Terminal className="size-3.5" />
          miralas-api
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_0.8fr]">
        <div className="border-b border-white/10 p-6 font-mono text-[13px] leading-7 text-white/75 lg:border-b-0 lg:border-r">
          <p>
            <span className="text-sky-300">const</span>{" "}
            <span className="text-emerald-300">response</span>{" "}
            = <span className="text-purple-300">await</span>{" "}
            miralas.voice.generate({"{"}
          </p>
          <p className="pl-5">
            language: <span className="text-amber-300">&quot;uz-Latn&quot;</span>,
          </p>
          <p className="pl-5">
            model: <span className="text-amber-300">&quot;narrator-pro&quot;</span>,
          </p>
          <p className="pl-5">
            text:{" "}
            <span className="text-amber-300">
              &quot;Assalomu alaykum, Miralas&quot;
            </span>
          </p>
          <p>{"});"}</p>

          <motion.div
            className="mt-7 h-px bg-white/10"
            initial={reduced ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: "left" }}
          />

          <p className="mt-5 text-white/35">
            {"// streaming response ready"}
          </p>
          <p className="text-emerald-300">
            200 <span className="text-white/40">· 184ms</span>
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Response
            </span>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
              200 OK
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
              <span className="text-white/35">status</span>
              <span className="text-emerald-300">&quot;ready&quot;</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
              <span className="text-white/35">language</span>
              <span className="text-sky-300">&quot;uz-Latn&quot;</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
              <span className="text-white/35">format</span>
              <span className="text-amber-300">&quot;audio/mpeg&quot;</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
              <span className="text-white/35">stream</span>
              <span className="text-purple-300">true</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeveloperPage() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* HERO */}

      <section className="relative px-6 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 size-[680px] -translate-x-1/2 rounded-full bg-sky-400/[0.09] blur-[130px] dark:bg-sky-400/[0.08]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                <Code2 className="size-3.5 text-sky-500" />
                Miralas Developer Platform
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Build on top of{" "}
                <span className="bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500 bg-clip-text text-transparent">
                  serious voice infrastructure.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
                Build voice products with a high-performance Rust core,
                intelligent Python workflows and first-class TypeScript
                tooling.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-xl shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Read the docs
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/get-started"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                >
                  <Play className="size-4" />
                  Try the API
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500 dark:text-zinc-500">
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Type-safe SDK
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Streaming ready
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  Production API
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <TerminalWindow />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-500">
              Architecture
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Different languages. One execution layer.
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              Use the language you already know while Miralas handles the
              performance-critical work underneath.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="rounded-[34px] border border-zinc-200/80 bg-zinc-50/70 p-5 shadow-[0_35px_100px_-70px_rgba(2,6,23,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.025] sm:p-7 lg:p-8">
              <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <ArchitectureNode
                  icon={Braces}
                  title="TypeScript / JS"
                  subtitle="SDK · Web · Apps"
                />

                <FlowLine />

                <ArchitectureNode
                  icon={ServerCog}
                  title="Miralas API"
                  subtitle="Routing · Auth · Events"
                  active
                />

                <FlowLine />

                <ArchitectureNode
                  icon={Cpu}
                  title="Rust Core"
                  subtitle="Performance · Runtime"
                  active
                />
              </div>

              <div className="mt-3 hidden md:flex md:justify-center">
                <div className="h-10 w-px border-l border-dashed border-zinc-300 dark:border-white/15" />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <ArchitectureNode
                  icon={Sparkles}
                  title="Python AI Runtime"
                  subtitle="Models · orchestration · research"
                />

                <ArchitectureNode
                  icon={Mic2}
                  title="Voice Output"
                  subtitle="Streaming · audio · delivery"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STACK */}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">
                Built with
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                The stack behind Miralas.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              Each layer has a purpose. Product velocity at the edge,
              performance at the core and intelligence where it matters.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {stack.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.name} delay={index * 0.05}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    className="group relative h-full overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white p-7 shadow-[0_25px_80px_-65px_rgba(2,6,23,0.7)] transition-shadow hover:shadow-[0_35px_100px_-65px_rgba(2,6,23,0.8)] dark:border-white/10 dark:bg-zinc-950"
                  >
                    <div className="absolute right-0 top-0 size-40 rounded-full bg-sky-400/[0.05] blur-3xl transition-opacity group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04]">
                            <Icon className={`size-6 ${item.className}`} />
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold tracking-tight">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
                              {item.label}
                            </p>
                          </div>
                        </div>

                        <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>

                      <span className="hidden font-mono text-xs text-zinc-300 dark:text-white/15 sm:block">
                        0{index + 1}
                      </span>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* API */}

      <section className="relative overflow-hidden bg-[#070707] px-6 py-24 text-white sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute left-1/4 top-0 size-[420px] rounded-full bg-sky-500/[0.08] blur-[120px]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
              <Terminal className="size-5 text-sky-300" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              API surface
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Small primitives.
              <br />
              Serious infrastructure.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/55">
              Keep your application logic yours. Miralas gives you focused
              primitives for voices, models, generation and events.
            </p>

            <Link
              href="/docs"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-sky-300"
            >
              Explore API reference
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035]">
              {endpoints.map(([method, path, description], index) => (
                <motion.div
                  key={path}
                  whileHover={{ x: 5 }}
                  className="group flex flex-col gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 sm:flex-row sm:items-center"
                >
                  <span
                    className={[
                      "w-fit rounded-md px-2 py-1 font-mono text-[10px] font-bold",
                      method === "GET"
                        ? "bg-sky-400/10 text-sky-300"
                        : "bg-emerald-400/10 text-emerald-300",
                    ].join(" ")}
                  >
                    {method}
                  </span>

                  <code className="font-mono text-sm text-white/85">
                    {path}
                  </code>

                  <span className="text-xs text-white/35 sm:ml-auto">
                    {description}
                  </span>

                  <ArrowRight className="hidden size-4 text-white/20 transition group-hover:text-white/60 sm:block" />

                  <span className="absolute" aria-hidden="true">
                    {index}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-500">
              Engineering principles
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Designed for developers who care about the details.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[30px] border border-zinc-200/80 bg-zinc-200/80 dark:border-white/10 dark:bg-white/10 md:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full bg-white p-8 dark:bg-zinc-950">
                    <Icon className="size-6 text-sky-500" />

                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLING STRIP */}

      <section className="px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[34px] border border-zinc-200/80 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/[0.035] lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["SDK", Package],
                    ["REST API", Globe2],
                    ["Webhooks", Network],
                    ["CLI", Terminal],
                    ["OpenAPI", Braces],
                  ].map(([label, Icon]) => {
                    const ToolIcon = Icon as typeof Package;

                    return (
                      <span
                        key={label as string}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                      >
                        <ToolIcon className="size-3.5" />
                        {label as string}
                      </span>
                    );
                  })}
                </div>

                <h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Everything you need to go from prototype to production.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  Start with one API request. Add streaming, events, model
                  controls and your own product logic when you&lsquo;re ready.
                </p>
              </div>

              <div className="hidden lg:block">
                <div className="flex size-24 items-center justify-center rounded-[28px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-black">
                  <Gauge className="size-9 text-sky-500" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}

      <section className="px-6 pb-28 pt-16 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[38px] border border-zinc-200/80 bg-zinc-950 px-8 py-16 text-center text-white shadow-[0_40px_140px_-80px_rgba(14,165,233,0.6)] dark:border-white/10 sm:px-12">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-sky-500/[0.12] blur-[100px]"
            />

            <div className="relative">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
                <Puzzle className="size-5 text-sky-300" />
              </div>

              <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Your product. Our voice infrastructure.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/55">
                Build the next generation of Uzbek voice experiences with
                Miralas.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/get-started"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02] hover:bg-zinc-100"
                >
                  Start building
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                >
                  <Code2 className="size-4" />
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}