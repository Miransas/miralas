"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const topics = [
  {
    title: "General inquiries",
    description:
      "Questions about Miransas, products, partnerships or anything else.",
    icon: MessageSquare,
  },
  {
    title: "Product & API",
    description:
      "Talk to us about voice generation, integrations, APIs and product workflows.",
    icon: Sparkles,
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[8%] top-[-10%] size-[420px] rounded-full bg-sky-400/10 blur-[120px] dark:bg-sky-500/10" />
        <div className="absolute right-[5%] top-[20%] size-[360px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
        <div className="absolute bottom-[-10%] left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-violet-400/8 blur-[140px] dark:bg-violet-500/8" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-14 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                We&lsquo;re here to help
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  meaningful.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Have a question, an idea, a partnership opportunity or just
                want to talk about what you&apos;re building? Reach out to the
                Miransas team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:pb-2"
            >
              <a
                href="mailto:contact@miransas.com"
                className="group relative block overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white/75 p-7 shadow-[0_30px_100px_-65px_rgba(2,6,23,0.45)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_40px_120px_-65px_rgba(14,165,233,0.35)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/20"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-40 rounded-full bg-sky-400/10 blur-3xl transition duration-500 group-hover:bg-sky-400/20"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg dark:bg-white dark:text-zinc-950">
                      <Mail className="size-5" />
                    </span>

                    <ArrowUpRight className="size-5 text-zinc-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950 dark:group-hover:text-white" />
                  </div>

                  <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Email us
                  </p>

                  <p className="mt-2 break-all text-xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
                    contact@miransas.com
                  </p>

                  <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    Open your email client and start a conversation.
                  </p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="relative px-6 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Talk to Miransas
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              What can we help with?
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {topics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className="group rounded-[28px] border border-zinc-200/80 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_30px_90px_-65px_rgba(2,6,23,0.7)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/20"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-800 transition duration-300 group-hover:scale-105 dark:bg-white/10 dark:text-white">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {topic.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {topic.description}
                  </p>

                  <a
                    href="mailto:contact@miransas.com"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 transition hover:gap-3 dark:text-white"
                  >
                    Start a conversation
                    <ArrowRight className="size-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-6 pb-28 pt-10 sm:pb-36 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_40px_130px_-75px_rgba(2,6,23,0.9)] dark:border-white/10 sm:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
          />

          <div className="relative text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              No complicated forms
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Just send us an email.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
              Tell us what you&apos;re building, what you need, or what you
              think Miransas could do better.
            </p>

            <a
              href="mailto:contact@miransas.com"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-[1.03] hover:bg-zinc-100"
            >
              contact@miransas.com
              <ArrowUpRight className="size-4" />
            </a>

            <div className="mt-7">
              <Link
                href="/"
                className="text-sm text-white/45 transition hover:text-white/80"
              >
                Back to Miransas
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}