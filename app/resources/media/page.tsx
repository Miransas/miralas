
/* eslint-disable react-hooks/set-state-in-effect */
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
} from "lucide-react";
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SmoothScroll from "../../../components/providers/SmoothScroll";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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

const PRESS_LOGOS = [
  "TechCrunch", "The Verge", "Product Hunt", "Hacker News",
  "Ars Technica", "VentureBeat", "Wired", "The Information",
  "Bloomberg", "Forbes", "Rest of World", "Sifted",
];

// ─── MARQUEE ───
function Marquee({ items, speed = 35 }: { items: string[]; speed?: number }) {
  return (
    <div className="relative overflow-hidden py-5 border-y border-[#e8e0d5]/40 bg-white/40">
      <div className="flex w-max animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-[#a8a095] tracking-tight whitespace-nowrap select-none">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CREATOR CARD ───
function CreatorCard({ creator, index }: { creator: (typeof CREATORS)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const RoleIcon = creator.roleIcon;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.play().catch(() => { });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden border border-[#e8e0d5]/60 bg-white shadow-sm hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
    >
      {/* Media Container — aspect-[4/5] like Instagram */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Image (fallback / poster) */}
        {/* <img
          src={creator.image}
          alt={creator.name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-105" : "scale-100"
          )}
        /> */}

        {/* Video overlay (auto-plays on hover) */}
        {/* Video overlay (plays ONLY on hover) */}
        <video
          ref={videoRef}
          src={creator.video}
          poster={creator.video.replace(/\.mp4$/, ".jpg")}
          muted
          loop
          playsInline
          preload="none" // <-- Tarayıcı hover olana kadar videoyu indirmez, belleği şişirmez
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          )}
        />

        {/* Top bar — role badge + verified */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            style={{ backgroundColor: `${creator.color}CC` }}
          >
            <RoleIcon className="size-3" />
            {creator.role}
          </span>
          {creator.verified && (
            <span className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-white">
              <CheckCircle2 className="size-3" />
              Verified
            </span>
          )}
        </div>

        {/* Mute toggle (visible on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={toggleMute}
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
            >
              {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Play indicator when not hovered */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <Play className="size-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Glass Overlay — half card */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-20 pb-5 px-5">
          {/* Name & Handle */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white tracking-tight">{creator.name}</h3>
              {creator.verified && (
                <CheckCircle2 className="size-4 text-[#0ea5e9] fill-[#0ea5e9]" />
              )}
            </div>
            <p className="text-xs text-white/70 font-mono">{creator.handle}</p>
          </div>

          {/* Bio */}
          <p className="text-[13px] text-white/80 leading-relaxed mb-4 line-clamp-2">
            {creator.bio}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-white/90 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats + Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Mic2 className="size-3" /> {creator.stats.clips}
              </span>
              <span className="flex items-center gap-1">
                <User className="size-3" /> {creator.stats.followers}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full backdrop-blur-md transition-all",
                  liked ? "bg-red-500/80 text-white" : "bg-white/15 text-white/80 hover:bg-white/25"
                )}
              >
                <Heart className={cn("size-3.5", liked && "fill-current")} />
              </button>
              <button className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur-md transition-all">
                <Share2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer — Social Links (visible below image) */}
      <div className="px-5 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {creator.social.instagram && (
              <a
                href={creator.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#8a8278] hover:text-[#c9a87c] transition-colors"
              >
                <IconBrandInstagram className="size-3.5" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
            )}
            {creator.social.youtube && (
              <a
                href={creator.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#8a8278] hover:text-red-500 transition-colors"
              >
                <IconBrandYoutube className="size-3.5" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            )}
            {creator.social.twitter && (
              <a
                href={creator.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#8a8278] hover:text-sky-500 transition-colors"
              >
                <IconBrandX className="size-3.5" />
                <span className="hidden sm:inline">Twitter</span>
              </a>
            )}
          </div>
          <a
            href={creator.social.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d2a26] hover:text-[#c9a87c] transition-colors"
          >
            Follow
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── HERO VIDEO ───
function HeroVideo() {
  return (
    <section className="relative w-full bg-[#fdfbf7] pt-20">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-[#e8e0d5]/60 shadow-[0_20px_60px_-20px_rgba(45,42,38,0.08)]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/media/hero-poster.jpg"
            >
              <source src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1787354584/7088057-uhd_4096_2160_25fps_pt294h.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/80 via-[#2d2a26]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2d2a26]/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 mb-6">
                  <Sparkles className="size-3" />
                  Our Creator Community
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl"
              >
                Voices that move
                <br />
                <span className="text-white/70">the world forward</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-5 text-sm sm:text-base text-white/60 max-w-lg leading-relaxed"
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
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2d2a26] hover:bg-white/90 transition-colors shadow-lg"
                >
                  <User className="size-4" />
                  Explore Creators
                </a>
                <a
                  href="https://instagram.com/miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
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

// ─── MAIN PAGE ───
export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Voice Artist", "Actor & Dubbing", "Content Creator"];

  const filtered = activeFilter === "All"
    ? CREATORS
    : CREATORS.filter((c) => {
      if (activeFilter === "Voice Artist") return c.role.includes("Voice Artist");
      if (activeFilter === "Actor & Dubbing") return c.role.includes("Actor") || c.role.includes("Dubbing");
      if (activeFilter === "Content Creator") return c.role.includes("Content");
      return true;
    });

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#fdfbf7] text-[#2d2a26] font-sans selection:bg-[#c9a87c]/30">
        {/* Header */}
        <Header variant="light" />

        {/* Hero Video */}
        <HeroVideo />

        {/* Marquee */}
        {/* <Marquee items={PRESS_LOGOS} speed={40} /> */}

        {/* Creators Section */}
        <section id="creators" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a8278] mb-4">
              <Mic2 className="size-3" />
              Featured Creators
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2d2a26] mb-3">
              The people behind the voices
            </h2>
            <p className="text-base text-[#8a8278] max-w-lg mx-auto leading-relaxed">
              Uzbek voice artists, actors, and content creators using Miralas to reach millions.
              Follow their journey.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200",
                  activeFilter === filter
                    ? "bg-[#2d2a26] text-white shadow-sm"
                    : "bg-white border border-[#e8e0d5] text-[#5c5548] hover:border-[#c9a87c]/40 hover:text-[#2d2a26]"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Creator Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((creator, i) => (
                <CreatorCard key={creator.id} creator={creator} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Join CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 rounded-3xl border border-[#e8e0d5]/60 bg-white p-8 sm:p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/50 to-transparent" />
            <div className="relative z-10">
              <Mic2 className="size-6 text-[#c9a87c] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-[#2d2a26] mb-2">
                Are you a voice artist or creator?
              </h3>
              <p className="text-sm text-[#8a8278] max-w-md mx-auto mb-6">
                Join our creator program. Get early access to new voices, revenue share, and featured placement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:creators@miransas.com"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2d2a26] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1c1917] transition-colors"
                >
                  <MessageSquare className="size-4" />
                  Apply to Join
                </a>
                <a
                  href="https://instagram.com/miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] px-6 py-3 text-sm font-medium text-[#5c5548] hover:bg-[#faf6f0] transition-colors"
                >
                  <IconBrandInstagram className="size-4" />
                  Follow on Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </section>

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