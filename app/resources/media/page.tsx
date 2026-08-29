
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
  ChevronDown,
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
    <div className="relative overflow-hidden py-5 border-y border-border/40 bg-card/40">
      <div className="flex w-max animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-muted-foreground tracking-tight whitespace-nowrap select-none">
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
      className="group relative rounded-3xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
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
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-md"
            style={{ backgroundColor: `${creator.color}CC` }}
          >
            <RoleIcon className="size-3" />
            {creator.role}
          </span>
          {creator.verified && (
            <span className="flex items-center gap-1 rounded-full bg-card/20 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-foreground">
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
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-background/30 backdrop-blur-md text-foreground hover:bg-background/50 transition-colors"
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
          <div className="flex size-14 items-center justify-center rounded-full bg-card/20 backdrop-blur-md border border-border">
            <Play className="size-6 text-foreground fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Glass Overlay — half card */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-20 pb-5 px-5">
          {/* Name & Handle */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground tracking-tight">{creator.name}</h3>
              {creator.verified && (
                <CheckCircle2 className="size-4 text-[#0ea5e9] fill-[#0ea5e9]" />
              )}
            </div>
            <p className="text-xs text-foreground/70 font-mono">{creator.handle}</p>
          </div>

          {/* Bio */}
          <p className="text-[13px] text-foreground/80 leading-relaxed mb-4 line-clamp-2">
            {creator.bio}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-card/15 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-foreground/90 border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats + Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-foreground/60">
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
                  liked ? "bg-red-500/80 text-foreground" : "bg-card/15 text-foreground/80 hover:bg-card/25"
                )}
              >
                <Heart className={cn("size-3.5", liked && "fill-current")} />
              </button>
              <button className="flex size-8 items-center justify-center rounded-full bg-card/15 text-foreground/80 hover:bg-card/25 backdrop-blur-md transition-all">
                <Share2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer — Social Links (visible below image) */}
      <div className="px-5 py-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {creator.social.instagram && (
              <a
                href={creator.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-600 transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-sky-500 transition-colors"
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-amber-600 transition-colors"
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

// --- 1. TİP TANIMI ---
type FaqItem = {
  question: string;
  answer: string;
};

// --- 2. MEDYA SAYFASI İÇİN SORULAR ---
const MEDIA_FAQS: FaqItem[] = [
  {
    question: "Ses sanatçıları ve aktörler için gelir paylaşımı nasıl çalışıyor?",
    answer:
      "Miralas ekosisteminde sesinizi lisansladığınızda, modelinizin kullanıldığı her üretimden pay alırsınız. Şeffaf panel üzerinden kullanım istatistiklerini ve gelirinizi anlık takip edebilirsiniz.",
  },
  {
    question: "Ses haklarımı ve teliflerimi nasıl koruyorsunuz?",
    answer:
      "Tüm ses modelleri ticari lisans sözleşmeleri ile hukuki güvence altına alınır. Sesinizin yetkisiz kullanımını engellemek için izinsiz klonlama koruması ve filigran (watermark) teknolojisi kullanıyoruz.",
  },
  {
    question: "Kendi ses modelimi eğitmek için nasıl bir stüdyo kaydı gerekiyor?",
    answer:
      "Yüksek kalitede sonuç için en az 15-30 dakikalık, arkada gürültü bulunmayan (dry recording) profesyonel stüdyo kaydı yeterlidir. Ekibimiz veri setinizi hazırlamanızda destek olur.",
  },
  {
    question: "Medya, basın veya ajanslar için Miralas marka materyallerine nasıl erişirim?",
    answer:
      "Logolarımız, renk paletimiz ve kurumsal kimlik rehberimizi içeren Media Kit dosyamıza doğrudan iletişim kurarak veya basın sayfamızdan ulaşabilirsiniz.",
  },
];

// --- 3. GÖRSELDEKİ GİBİ MİNİMALİST AKORDEON BİLEŞENİ ---
function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: "easeOut" }}
      className={cn(
        "transition-all duration-200",
        isOpen
          ? "rounded-xl border-2 border-stone-50 bg-card p-1 shadow-sm"
          : "border-b border-dotted border-border py-2 hover:border-stone-400"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 text-left transition-colors",
          isOpen ? "px-5 py-4" : "py-3 px-1"
        )}
      >
        <span
          className={cn(
            "text-base font-normal transition-colors sm:text-[17px]",
            isOpen ? "text-foreground font-medium" : "text-foreground "
          )}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex shrink-0 items-center justify-center text-muted-foreground"
        >
          <ChevronDown className="size-4" strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1">
              <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
// ─── MAIN PAGE ───
export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      {/* Arka plan saf beyaz ve temiz stone tonlarına çekildi */}
      <div className="min-h-screen bg-card text-foreground font-sans selection:bg-stone-200">
        {/* Header */}
        <Header />

        {/* Hero Video */}
        <HeroVideo />

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
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">
              <Mic2 className="size-3 text-muted-foreground" />
              Featured Creators
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              The people behind the voices
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
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
                    ? "bg-card text-foreground shadow-sm"
                    : "bg-muted border border-border text-muted-foreground hover:border-border hover:text-foreground"
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
            className="mt-20 rounded-3xl border border-border bg-muted/50 p-8 sm:p-10 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <Mic2 className="size-6 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Are you a voice artist or creator?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Join our creator program. Get early access to new voices, revenue share, and featured placement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:creators@miransas.com"
                  className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-card transition-colors shadow-sm"
                >
                  <MessageSquare className="size-4" />
                  Apply to Join
                </a>
                <a
                  href="https://instagram.com/miransaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  <IconBrandInstagram className="size-4" />
                  Follow on Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section Eklendi */}
       <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20 px-14 py-12 ">
          
          <div className="flex flex-col lg:sticky lg:top-28 lg:col-span-5">
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Creators & Media FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Partnering with<br />our creators
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Ses sanatçıları, ajanslar ve içerik üreticileri için Miralas iş birliği, lisanslama ve telif detayları.
            </p>
          </div>

          <div className="flex w-full flex-col gap-1 lg:col-span-7">
            {MEDIA_FAQS.map((faq, i) => (
              <FaqAccordionItem
                key={faq.question}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
              />
            ))}
          </div>

        </div>
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