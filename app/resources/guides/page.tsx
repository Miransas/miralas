"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Cpu,
  Terminal,
  Sliders,
  ArrowRight,
  Clock,
  Layers
} from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";

// ─── CATEGORIES ─────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "AI Voice", "API & Dev", "Studio"];

// ─── GUIDE DATA ──────────────────────────────────────────────────────────
const GUIDES_DATA = [
  {
    slug: "instant-voice-cloning-setup",
    category: "AI Voice",
    title: "Instant Voice Cloning: Best Practices for Perfect Fidelity",
    description: "Learn how to record and prepare your 10-second audio sample to achieve 99% human-like accuracy with our zero-shot cloning engine.",
    duration: "4 min read",
    level: "Beginner",
    icon: Cpu,
  },
  {
    slug: "grpc-streaming-api-guide",
    category: "API & Dev",
    title: "Streaming Audio in Real-Time via gRPC and Rust",
    description: "A comprehensive developer guide on connecting your backend directly to our Python/Rust pipeline for sub-50ms text-to-speech rendering.",
    duration: "8 min read",
    level: "Advanced",
    icon: Terminal,
  },
  {
    slug: "mastering-studio-ssml-tags",
    category: "Studio",
    title: "Mastering Studio Parameters and Fine-Tuning Voice Emotion",
    description: "Explore the advanced parameters inside the Miralas Studio console. Control breathing, emphasis, and emotional tones programmatically.",
    duration: "5 min read",
    level: "Intermediate",
    icon: Sliders,
  },
  {
    slug: "integrating-stream-donate-widget",
    category: "Studio",
    title: "Setting Up Stream Donate Widgets for Live Creators",
    description: "Step-by-step instructions to connect your console project with OBS or Streamlabs to enable AI voice generation for live stream alerts.",
    duration: "3 min read",
    level: "Beginner",
    icon: Layers,
  },
  {
    slug: "node-python-sdk-authentication",
    category: "API & Dev",
    title: "Securing API Requests with Temporary Bearer Tokens",
    description: "How to handle authorization inside your Next.js application when making high-volume requests to our secure models server.",
    duration: "6 min read",
    level: "Advanced",
    icon: Terminal,
  }
];

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Search and category filtering logic
  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesCategory = activeCategory === "All" || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#010101] text-[#FAF9F6] font-sans selection:bg-[#FAF9F6] selection:text-stone-950">
      <Header variant="dark"/>
      {/* Top navigation bar */}
      {/* <header className="border-b border-[#FAF9F6]/10 bg-[#010101]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-[#FAF9F6] transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[#FAF9F6]/10 bg-stone-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 shadow-md">
            <BookOpen className="size-3 text-amber-500" />
            Documentation Hub
          </div>
        </div>
      </header> */}

      {/* Main body */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

        {/* Header area */}
        <div className="mb-16 text-center lg:text-left relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-amber-500/[0.02] blur-3xl pointer-events-none" />

          <div className="max-w-xl">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Guides & Tutorials
            </h1>
            <p className="mt-4 text-[15px] text-stone-400 leading-relaxed">
              Learn how to integrate the Miransas voice core into your apps, optimize your voice models, and dominate text-to-speech synthesis.
            </p>
          </div>

          {/* Live search input area */}
          <div className="relative w-full max-w-xs mx-auto lg:mx-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full bg-stone-950 border border-[#FAF9F6]/5 focus:border-[#FAF9F6]/20 text-[#FAF9F6] text-xs rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-stone-600 shadow-inner"
            />
          </div>
        </div>

        {/* Category selection tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10 border-b border-stone-900 pb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${activeCategory === category
                  ? "bg-[#FAF9F6] text-stone-950 shadow-md shadow-black/40"
                  : "text-stone-400 hover:text-white bg-stone-900/30 border border-transparent hover:border-[#FAF9F6]/5"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Guide list grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGuides.map((guide, index) => {
              const IconComponent = guide.icon;
              return (
                <motion.div
                  key={guide.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-[#FAF9F6]/5 bg-stone-950 p-6 flex flex-col justify-between shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] hover:border-[#FAF9F6]/10 transition-all duration-300"
                >
                  <div>
                    {/* Top card information */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#FAF9F6]/5 border border-[#FAF9F6]/5 text-amber-400/90 group-hover:bg-[#FAF9F6]/10 transition-colors">
                        <IconComponent className="size-4" strokeWidth={2} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                        <Clock className="size-3 text-stone-600" />
                        <span>{guide.duration}</span>
                      </div>
                    </div>

                    {/* Content title and description */}
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-stone-400 line-clamp-3">
                      {guide.description}
                    </p>
                  </div>

                  {/* Bottom card detail and button */}
                  <div className="mt-6 pt-4 border-t border-stone-900/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-stone-800 text-stone-400 bg-stone-900/40">
                      {guide.level}
                    </span>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#FAF9F6]/80 group-hover:text-[#FAF9F6] transition-colors"
                    >
                      Read Guide
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty search results */}
        {filteredGuides.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-stone-900 rounded-2xl"
          >
            <p className="text-sm text-stone-500">No guides found matching your filters.</p>
          </motion.div>
        )}

      </main>

      {/* Footer area */}
       <Footer/>
    </div>
  )
}
