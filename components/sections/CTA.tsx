"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-28 sm:py-36 lg:px-8">
      {/* Deep atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[42%] h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.08] blur-[130px] dark:bg-sky-400/[0.1]"
        />

        {/* Secondary glow */}
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[20%] size-[320px] rounded-full bg-emerald-500/[0.045] blur-[120px] dark:bg-emerald-400/[0.06]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[12%] bottom-[5%] size-[300px] rounded-full bg-violet-500/[0.035] blur-[120px] dark:bg-violet-400/[0.045]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/70 px-6 py-16 shadow-[0_40px_120px_-70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-10 sm:py-20 lg:px-16 lg:py-24 dark:shadow-[0_40px_120px_-65px_rgba(0,0,0,0.8)]"
        >
          {/* Card glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.09),transparent_38%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_38%)]"
          />

          {/* Top highlight */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent dark:via-sky-400/50"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-500/15 bg-sky-500/[0.055] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.17em] text-sky-700 dark:border-sky-400/15 dark:bg-sky-400/[0.06] dark:text-sky-400"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-current" />
              </span>

              <Sparkles className="size-3" />

              Uzbek voice models
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.25rem]"
            >
              Build something
              <br />
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground/50 bg-clip-text text-transparent">
                people can hear.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base"
            >
              Generate Uzbek speech, receive donations and ship expressive
              audio experiences from one polished platform.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {/* Primary */}
              <Link
                href="/get-started"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-foreground/40 active:scale-[0.98]"
              >
                Start Free

                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary */}
              <Link
                href="/demo"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:ring-2 focus-visible:ring-foreground/20 active:scale-[0.98]"
              >
                <span className="flex size-5 items-center justify-center rounded-full border border-border bg-muted transition-all duration-300 group-hover:border-sky-500/20 group-hover:bg-sky-500/[0.06]">
                  <Play className="ml-px size-2.5 fill-current" />
                </span>

                Watch Demo
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3"
            >
              <div className="h-px flex-1 bg-border/60" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
                Built for creators & developers
              </span>

              <div className="h-px flex-1 bg-border/60" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;