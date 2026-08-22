"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Terminal, Cpu, Layers, CheckCircle2 } from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SmoothScroll from "../../../components/providers/SmoothScroll";

// ─── CHANGELOG DATA (directly inside client) ──────────────────────────────
const CHANGELOG_DATA = [
  {
    version: "v1.2.0",
    date: "November 2025",
    title: "The Genesis: Console & Architecture Foundations",
    description: "Project development officially started. We completed our multi-repo ecosystem, bridging our open-source Next.js web application with the closed-source AI core architecture.",
    tags: ["Core", "Infrastructure"],
    changes: [
      "Established the core Console infrastructure across independent Rust and Python repositories.",
      "Implemented high-performance gRPC communication layers for lightning-fast internal data streaming.",
      "Launched the public-facing Next.js web application utilizing Tailwind CSS and Framer Motion.",
      "Optimized AI speech model inference pipelines using Python background workers."
    ]
  },
  {
    version: "v1.1.5",
    date: "February 2026",
    title: "Next.js 16 Upgrade & Animation Polish",
    description: "Upgraded the main web ecosystem to Next.js 16 and transitioned completely to Tailwind CSS v4 architecture for pure CSS theme compiling.",
    tags: ["Frontend", "Performance"],
    changes: [
      "Migrated full design system to Tailwind CSS v4 CSS-only @theme configuration.",
      "Refactored FAQ Accordion interactions with custom spring physics via Framer Motion.",
      "Integrated premium Ivory white (#FAF9F6) and deep Stone-950 palettes across all marketing layers.",
      "Fixed client-side layout shifts and hydration rendering warnings on high-refresh rate displays."
    ]
  },
  {
    version: "v1.0.0",
    date: "August 2026 (Latest)",
    title: "Miralas Voice Platform Public Beta",
    description: "The complete voice synthesis engine is now accessible via the console layout. Global text-to-speech rendering and zero-shot voice cloning features are officially live.",
    tags: ["AI Voice", "Production"],
    changes: [
      "Released highly optimized Text to Speech (TTS) studio dashboard interface.",
      "Deployed secure cross-origin streaming token authorization protocols.",
      "Polished the dark theme dashboard aesthetics using rich obsidian contrasts.",
      "Optimized the Stream Donate widget API latency down to sub-15ms benchmarks."
    ]
  }
];

export default function ChangelogPage() {
  return (

    <SmoothScroll>
      <div className="min-h-screen bg-[#010101] text-[#FAF9F6] font-sans selection:bg-[#FAF9F6] selection:text-stone-950">
        <Header variant="dark" />
        {/* <header className="border-b border-[#FAF9F6]/10 bg-[#010101]/60 backdrop-blur-md sticky mt-24 top-0 z-50">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-[#FAF9F6] transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[#FAF9F6]/10 bg-stone-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 shadow-md">
            <Cpu className="size-3 text-amber-500 animate-pulse" />
            Ecosystem Active
          </div>
        </div>
      </header> */}

        {/* Main body */}
        <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">

          {/* Header area with premium glow effect */}
          <div className="mb-20 text-center sm:text-left relative">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-amber-500/[0.03] blur-3xl pointer-events-none" />

            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-stone-950 border border-[#FAF9F6]/10 text-[#FAF9F6] shadow-md">
              <Sparkles className="size-5 text-amber-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Changelog
            </h1>
            <p className="mt-4 text-[15px] text-stone-400 max-w-xl leading-relaxed">
              Tracking the technical evolution of the Miransas ecosystem. From high-performance Rust/gRPC pipelines to premium Next.js interfaces.
            </p>
          </div>

          {/* Timeline and items */}
          <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-6 before:w-px before:bg-gradient-to-b before:from-[#FAF9F6]/20 before:via-[#FAF9F6]/5 before:to-transparent">
            {CHANGELOG_DATA.map((item, index) => (
              <motion.div
                key={item.version}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative pl-12 sm:pl-16 group"
              >
                {/* Left timeline round icon */}
                <div className="absolute left-1.5 sm:left-3 top-1 flex size-6 items-center justify-center rounded-full bg-stone-950 border-2 border-[#FAF9F6]/20 text-[#FAF9F6] group-hover:border-amber-500 transition-colors z-10 shadow-md">
                  <div className="size-1.5 rounded-full bg-[#FAF9F6] group-hover:bg-amber-500 transition-colors" />
                </div>

                {/* Version card with premium stone-950 structure */}
                <div className="rounded-2xl border border-[#FAF9F6]/5 bg-stone-950 p-6 sm:p-7 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#FAF9F6]/10">

                  {/* Top row: version, date, and tags */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-[#FAF9F6] bg-[#FAF9F6]/10 px-2.5 py-1 rounded-md tracking-wider">
                        {item.version}
                      </span>
                      <span className="text-xs font-medium text-stone-500">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-stone-800 text-stone-400 bg-stone-900/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    {item.description}
                  </p>

                  {/* Change list */}
                  <ul className="mt-5 space-y-2.5 border-t border-stone-900 pt-4">
                    {item.changes.map((change, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3 text-[13px] text-stone-300 leading-relaxed">
                        <CheckCircle2 className="size-4 text-emerald-500/80 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mx-auto max-w-3xl px-6 py-16 border-t border-stone-900 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <p>&copy; {new Date().getFullYear()} Miransas Software. Build in public.</p>
            <div className="flex gap-3 items-center">
              <Terminal className="size-3.5" />
              <span>Rust • Python • gRPC • Next.js</span>
            </div>
          </div>
        </footer>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
