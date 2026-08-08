"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
 
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const nodes = [
  { x: "12%", y: "22%", delay: 0 },
  { x: "30%", y: "68%", delay: 0.8 },
  { x: "51%", y: "30%", delay: 0.4 },
  { x: "70%", y: "65%", delay: 1.1 },
  { x: "88%", y: "25%", delay: 0.6 },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-28 pt-32 sm:pb-36 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -25, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                <Users className="size-3.5" />
                Miralas Community
              </div>

              <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
                A community is taking shape.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                We&apos;re preparing a place for builders, creators and
                developers around Miralas.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/developers"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-zinc-950"
                >
                  <Code2 className="size-4" />
                  For Developers
                </Link>

                <Link
                  href="/"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                >
                  Learn about Miralas
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-[40px] border border-zinc-200 bg-zinc-50 shadow-[0_50px_140px_-80px_rgba(2,6,23,0.6)] dark:border-white/10 dark:bg-white/[0.025]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.12),transparent_45%)]" />

                <svg
                  aria-hidden
                  className="absolute inset-0 size-full"
                  viewBox="0 0 600 600"
                  fill="none"
                >
                  <path
                    d="M72 130 C190 210 240 130 310 210 S430 300 528 170"
                    stroke="currentColor"
                    className="text-zinc-300 dark:text-white/10"
                    strokeWidth="1"
                  />
                  <path
                    d="M90 450 C190 350 260 470 330 390 S440 330 520 430"
                    stroke="currentColor"
                    className="text-zinc-300 dark:text-white/10"
                    strokeWidth="1"
                  />
                  <path
                    d="M310 210 C330 280 330 320 330 390"
                    stroke="currentColor"
                    className="text-zinc-300 dark:text-white/10"
                    strokeWidth="1"
                  />
                </svg>

                <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border border-sky-400/30 bg-white shadow-[0_0_80px_rgba(14,165,233,0.2)] dark:bg-zinc-950">
                  <MessageCircle className="size-8 text-sky-500" />
                </div>

                {nodes.map((node, index) => (
                  <motion.span
                    key={index}
                    className="absolute size-3 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.8)]"
                    style={{
                      left: node.x,
                      top: node.y,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.45, 1, 0.45],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: node.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Builders",
                text: "Share ideas, experiments and product work.",
              },
              {
                icon: MessageCircle,
                title: "Creators",
                text: "Explore new ways to build with voice.",
              },
              {
                icon: FaGithub,
                title: "Open source",
                text: "Developer-facing projects will grow here.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[26px] border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <Icon className="size-5 text-sky-500" />
                  <h2 className="mt-5 font-semibold">{item.title}</h2>
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