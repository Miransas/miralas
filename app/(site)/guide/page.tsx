"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Code2,
  Terminal,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learn the platform",
    text: "Understand how Miralas products, models and APIs fit together.",
  },
  {
    number: "02",
    icon: Braces,
    title: "Build your first flow",
    text: "Connect generation, voice controls and product events.",
  },
  {
    number: "03",
    icon: Terminal,
    title: "Ship with confidence",
    text: "Production guides and SDK examples are being prepared.",
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950 dark:bg-[#050505] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-28 pt-36 sm:pb-36 sm:pt-44 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.10),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_55%)]"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              <Code2 className="size-3.5" />
              Developer guide
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
              Build with Miralas.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              API references, SDK guides and practical examples are coming
              together for developers building the next generation of voice
              products.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.12 + index * 0.1,
                  }}
                  className="group relative overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white p-7 shadow-[0_30px_100px_-70px_rgba(2,6,23,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_120px_-70px_rgba(2,6,23,0.65)] dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-zinc-300 dark:text-white/20">
                      {step.number}
                    </span>

                    <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h2 className="mt-12 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    {step.text}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 overflow-hidden rounded-[30px] border border-zinc-200 bg-zinc-950 p-6 text-white dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold text-white/50">
                DOCUMENTATION STATUS
              </span>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  The developer experience is taking shape.
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                  Full guides will appear here as the Miralas API and SDK
                  surface stabilizes.
                </p>
              </div>

              <Link
                href="/developers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-sky-300"
              >
                Developer platform
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}