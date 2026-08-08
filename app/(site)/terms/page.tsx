"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, LockKeyhole, Scale } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"
        >
          <div className="absolute left-[12%] top-20 size-72 rounded-full bg-sky-400/10 blur-[100px] dark:bg-sky-500/10" />
          <div className="absolute right-[10%] top-40 size-80 rounded-full bg-violet-400/10 blur-[120px] dark:bg-violet-500/10" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Miralas
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              <FileText className="size-3.5" />
              Legal foundation
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Terms are almost ready.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              We&apos;re finalizing the legal foundation for Miralas before
              opening the platform to everyone.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Scale,
                title: "Fair by design",
                text: "Clear rules for using the platform.",
              },
              {
                icon: LockKeyhole,
                title: "Built responsibly",
                text: "Privacy and safety remain central.",
              },
              {
                icon: FileText,
                title: "Coming soon",
                text: "The complete agreement will be published here.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                  className="rounded-[26px] border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <Icon className="size-5 text-sky-500" />
                  <h2 className="mt-6 font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}