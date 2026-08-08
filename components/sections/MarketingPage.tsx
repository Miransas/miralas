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
  highlight: { title: string; body: string; bullets: string[] };
  faq?: { question: string; answer: string }[];
};

const icons = [Mic2, Wand2, Code2, MessagesSquare, ShieldCheck, DatabaseZap];

function VisualPanel({ title }: { title: string }) {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white/70 p-5 shadow-[0_40px_120px_-70px_rgba(2,6,23,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/68">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(14,165,233,0.20),transparent_30%),radial-gradient(circle_at_78%_78%,rgba(16,185,129,0.14),transparent_28%),linear-gradient(90deg,rgba(39,39,42,0.045)_1px,transparent_1px),linear-gradient(rgba(39,39,42,0.045)_1px,transparent_1px)] bg-[length:100%_100%,100%_100%,38px_38px,38px_38px] dark:bg-[radial-gradient(circle_at_24%_18%,rgba(14,165,233,0.24),transparent_30%),radial-gradient(circle_at_78%_78%,rgba(16,185,129,0.15),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Live system</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">{title}</h3>
          </div>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Active
          </span>
        </div>
        <div className="mt-10 flex h-28 items-end gap-2 rounded-3xl border border-zinc-200/80 bg-white/68 p-4 dark:border-white/10 dark:bg-black/28">
          {[44, 70, 52, 86, 60, 94, 42, 76, 56, 88, 48, 68].map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300"
              animate={{ height: [`${height * 0.58}%`, `${height}%`, `${height * 0.72}%`] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.07, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {["UZ", "API", "TTS"].map((chip) => (
            <div key={chip} className="rounded-2xl border border-zinc-200/80 bg-white/72 px-4 py-3 text-center text-sm font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-white/6 dark:text-zinc-200">
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MarketingPage({ data }: { data: MarketingPageData }) {
  return (
    <div className="overflow-hidden bg-[#fbfbfa] text-zinc-950 dark:bg-black dark:text-white">
      <section className="relative px-6 pb-20 pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.15),transparent_30%),radial-gradient(circle_at_80%_8%,rgba(16,185,129,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_80%_8%,rgba(16,185,129,0.13),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,39,42,0.045)_1px,transparent_1px),linear-gradient(rgba(39,39,42,0.045)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 22, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:text-zinc-300">
              <Sparkles className="size-4 text-sky-500" />
              {data.eyebrow}
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">{data.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{data.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/get-started" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-[0_18px_50px_-24px_rgba(14,165,233,0.85)] transition hover:scale-[1.03] dark:bg-white dark:text-zinc-950">
                {data.primary}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/demo" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-6 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-xl transition hover:scale-[1.03] dark:border-white/10 dark:bg-white/[0.07] dark:text-white">
                <Play className="size-4" />
                {data.secondary}
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }}>
            <VisualPanel title={data.eyebrow} />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {data.stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[26px] border border-zinc-200/80 bg-white/74 p-7 shadow-[0_24px_90px_-65px_rgba(2,6,23,0.85)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
              <p className="text-4xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Capabilities</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Built as a complete voice operating system.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.article key={feature.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group rounded-[28px] border border-zinc-200/80 bg-white/76 p-7 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_100px_-70px_rgba(2,6,23,0.9)] dark:border-white/10 dark:bg-zinc-950/70">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 transition group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{feature.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_45px_140px_-80px_rgba(2,6,23,0.95)] dark:border-white/10 lg:grid-cols-[1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">Platform depth</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{data.highlight.title}</h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/68">{data.highlight.body}</p>
          </div>
          <div className="grid gap-3">
            {data.highlight.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 backdrop-blur-xl">
                <Check className="size-5 text-emerald-300" />
                <span className="text-sm font-medium text-white/86">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.faq && (
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-4xl font-semibold tracking-tight">Questions teams ask first.</h2>
            <div className="mt-10 grid gap-3">
              {data.faq.map((item) => (
                <div key={item.question} className="rounded-[24px] border border-zinc-200/80 bg-white/74 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-zinc-200/80 bg-white/76 p-8 text-center shadow-[0_35px_120px_-80px_rgba(2,6,23,0.95)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] sm:p-12">
          <FileText className="mx-auto size-8 text-sky-500" />
          <h2 className="mt-5 text-4xl font-semibold tracking-tight">Ready to hear Miralas in your product?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-zinc-600 dark:text-zinc-400">Start with a prototype, then scale into voice generation, donations and API automation for real teams.</p>
          <Link href="/get-started" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:scale-[1.03] dark:bg-white dark:text-zinc-950">
            Start Creating
          </Link>
        </div>
      </section>
    </div>
  );
}
