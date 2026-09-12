
 
"use client";
// bu joyga keyin qoyiladi odam kim kelsa ham artist bolib hozriga default bor 
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Mic2,
  Clapperboard,
  User,
  Globe,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SmoothScroll from "../../../components/providers/SmoothScroll";



// ─── CREATOR DATA ───
const CREATORS = [
  {
    id: "c1",
    name: "Aziz Rakhimov",
    handle: "@azizvoice",
    role: "Uzbek Voice Artist",
    roleIcon: Mic2,
    color: "#c9a87c",
    image: "/media/creators/aziz.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787355850/7509024-uhd_2160_4096_25fps_eacmdw.mp4",
    bio: "Professional Uzbek narrator. 500+ audiobook sessions. Miralas voice partner since 2026.",
    stats: { clips: "1.2K", followers: "45K" },
    tags: ["Uzbek", "Narration", "Audiobook"],
    social: { instagram: "https://instagram.com/azizvoice", youtube: "https://youtube.com/@azizvoice" },
    verified: true,
  },
  {
    id: "c2",
    name: "Nodira Karimova",
    handle: "@nodira.uz",
    role: "Actor & Dubbing",
    roleIcon: Clapperboard,
    color: "#f43f5e",
    image: "/media/creators/nodira.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787354903/12330928-uhd_2160_3840_25fps_mvprvw.mp4",
    bio: "Theatre actress turned voice actor. Leading dubbing artist for Uzbek cinema and streaming content.",
    stats: { clips: "890", followers: "128K" },
    tags: ["Dubbing", "Theatre", "Streaming"],
    social: { instagram: "https://instagram.com/nodira.uz", twitter: "https://twitter.com/nodira_uz" },
    verified: true,
  },
  {
    id: "c3",
    name: "Timur Saidov",
    handle: "@timur.tech",
    role: "Content Creator",
    roleIcon: User,
    color: "#0ea5e9",
    image: "/media/creators/timur.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787355404/5659595-uhd_2160_4096_25fps_qtum4o.mp4",
    bio: "Tech educator building in public. Tutorials on AI voice, automation, and Uzbek tech ecosystem.",
    stats: { clips: "2.4K", followers: "89K" },
    tags: ["Tutorial", "AI", "Education"],
    social: { youtube: "https://youtube.com/@timurtech", twitter: "https://twitter.com/timurtech" },
    verified: true,
  },
  {
    id: "c4",
    name: "Zarina Umarova",
    handle: "@zarina.vox",
    role: "Uzbek Voice Artist",
    roleIcon: Mic2,
    color: "#8b5cf6",
    image: "/media/creators/zarina.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787355404/6962492-hd_1080_1920_25fps_f0vzgy.mp4",
    bio: "Emotional storytelling specialist. Documentary voiceovers and podcast production in Uzbek and Russian.",
    stats: { clips: "650", followers: "34K" },
    tags: ["Documentary", "Podcast", "Russian"],
    social: { instagram: "https://instagram.com/zarina.vox", youtube: "https://youtube.com/@zarina.vox" },
    verified: true,
  },
  {
    id: "c5",
    name: "Dilshod Khasanov",
    handle: "@dilshod.actor",
    role: "Actor & Voice",
    roleIcon: Clapperboard,
    color: "#10b981",
    image: "/media/creators/dilshod.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787355935/17752354-uhd_2160_3840_30fps_hjm7lz.mp4",
    bio: "Veteran actor with 15+ years on screen. Now lending his voice to AI training and character work.",
    stats: { clips: "430", followers: "67K" },
    tags: ["Character", "Film", "AI Training"],
    social: { instagram: "https://instagram.com/dilshod.actor", twitter: "https://twitter.com/dilshod_actor" },
    verified: true,
  },
  {
    id: "c6",
    name: "Madina Yusupova",
    handle: "@madina.creates",
    role: "Content Creator",
    roleIcon: User,
    color: "#d97706",
    image: "/media/creators/madina.jpg",
    video: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787356204/14988018_2160_3840_30fps_hd9qc0.mp4",
    bio: "Digital storyteller. Creates short-form content about Uzbek culture, language, and modern tech.",
    stats: { clips: "3.1K", followers: "210K" },
    tags: ["Culture", "Short-form", "Language"],
    social: { instagram: "https://instagram.com/madina.creates", youtube: "https://youtube.com/@madina.creates" },
    verified: true,
  },
];

// ─── HERO VIDEO ───
function HeroVideo() {
  return (
    <section className="relative w-full bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[0_20px_60px_-20px_rgba(45,42,38,0.08)]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/media/hero-poster.jpg"
            >
              <source src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1788042336/26537-357886155_mzac24.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/80 via-[#2d2a26]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2d2a26]/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 mb-6">
                  <Sparkles className="size-3" />
                  Our Creator Community
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl"
              >
                Voices that move
                <br />
                <span className="text-foreground/70">the world forward</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-5 text-sm sm:text-base text-foreground/60 max-w-lg leading-relaxed"
              >
                Meet the artists, actors, and creators shaping the future of voice in Uzbekistan and beyond.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <a
                  href="#creators"
                  className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/90 transition-colors shadow-lg"
                >
                  <User className="size-4" />
                  Explore Creators
                </a>
                <a
                  href="https://instagram.com/miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-foreground hover:bg-card/20 transition-colors"
                >
                  <IconBrandInstagram className="size-4" />
                  Follow Us
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediaPage() {



  return (
    <SmoothScroll>
      
      <div className="min-h-screen bg-white dark:bg-black text-foreground font-sans selection:bg-stone-200">
        {/* Header */}
        <Header />

        {/* Hero Video */}
        <HeroVideo />

      
        {/* Footer */}
        <Footer />

        {/* Marquee CSS */}
        <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
      </div>
    </SmoothScroll>
  );
}