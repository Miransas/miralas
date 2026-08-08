"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white sm:py-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_75%_10%,rgba(16,185,129,0.16),transparent_28%),linear-gradient(135deg,rgba(168,85,247,0.10),transparent_45%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-[64px] bg-cyan-400/16 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
          <Sparkles className="size-4" />
          Uzbek voice models, global-grade infrastructure
        </div>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Launch a voice experience that feels local, fast and human.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          Generate Uzbek speech, receive donations and ship expressive audio features from one polished platform.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/get-started" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 shadow-2xl shadow-white/10 outline-none transition hover:scale-[1.03] hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-white/70">
            Start Free
          </Link>
          <Link href="/demo" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 text-sm font-semibold text-white backdrop-blur-xl outline-none transition hover:scale-[1.03] hover:bg-white/[0.14] focus-visible:ring-2 focus-visible:ring-white/50">
            <Play className="size-4" />
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
