/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Search,
  SlidersHorizontal,
  Wand2,
  Zap,
  Globe,
  Layers,
  ArrowRight,
  Lock,
  Sparkles,
  Mic,
  Volume2,
  Timer,
  CheckCircle2,
  Copy,
  Check,
  Headphones,
  MessageSquare,
  BookOpen,
  Radio,
  Gamepad2,
  Phone,
  ShoppingBag,
  GraduationCap,
  Clapperboard,
  Star,
  TrendingUp,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

// ============================================================
// TYPES
// ============================================================
interface Voice {
  id: string;
  name: string;
  tag: string;
  description: string;
  demoText: string;
  accent: string;
  gender: "Male" | "Female" | "Neutral";
  age: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  featured?: boolean;
  waveform: number[];
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface UseCase {
  icon: React.ElementType;
  title: string;
  description: string;
}

// ============================================================
// MOCK DATA - 10 VOICE SAMPLES
// ============================================================
const VOICES: Voice[] = [
  {
    id: "narrator",
    name: "Narrator",
    tag: "Deep & Authoritative",
    description: "Rich, resonant tone perfect for documentaries and e-learning.",
    demoText: "In the vast expanse of the digital frontier, voice is the new interface...",
    accent: "American",
    gender: "Male",
    age: "Middle-aged",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    accentColor: "#ea580c",
    featured: true,
    waveform: [12, 24, 18, 45, 32, 58, 42, 68, 55, 38, 72, 48, 35, 62, 28, 44, 52, 36, 66, 30, 25, 48, 55, 38, 42, 58, 35, 50, 28, 45, 38, 52, 30, 42, 55, 35, 48, 40, 52, 38],
  },
  {
    id: "energetic",
    name: "Energetic",
    tag: "Fast & Dynamic",
    description: "High-energy delivery for commercials and action content.",
    demoText: "Get ready to experience the future of voice technology right now!",
    accent: "American",
    gender: "Male",
    age: "Young",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "#f59e0b",
    featured: true,
    waveform: [45, 62, 38, 72, 55, 88, 42, 78, 65, 92, 48, 82, 58, 95, 52, 68, 75, 45, 82, 60, 55, 78, 65, 88, 48, 72, 58, 85, 52, 68, 75, 55, 82, 60, 48, 72, 58, 85, 52, 68],
  },
  {
    id: "dramatic",
    name: "Dramatic",
    tag: "Intense & Dark",
    description: "Deep, intense voice for thrillers and dramatic storytelling.",
    demoText: "The shadows lengthened as the mystery deepened into darkness...",
    accent: "British",
    gender: "Male",
    age: "Mature",
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-300",
    accentColor: "#475569",
    featured: false,
    waveform: [18, 22, 15, 35, 28, 42, 25, 38, 32, 48, 22, 35, 28, 45, 20, 38, 30, 25, 42, 18, 22, 35, 28, 42, 25, 38, 32, 48, 22, 35, 28, 45, 20, 38, 30, 25, 42, 18, 22, 35],
  },
  {
    id: "fluid",
    name: "Fluid",
    tag: "Smooth & Calm",
    description: "Seamless, smooth voice blending with AI avatars.",
    demoText: "Welcome to your personal assistant. How may I help you today?",
    accent: "American",
    gender: "Female",
    age: "Young",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    accentColor: "#0ea5e9",
    featured: false,
    waveform: [22, 28, 25, 32, 28, 35, 30, 38, 32, 28, 35, 30, 38, 32, 28, 35, 30, 32, 28, 35, 22, 28, 25, 32, 28, 35, 30, 38, 32, 28, 35, 30, 38, 32, 28, 35, 30, 32, 28, 35],
  },
  {
    id: "somber",
    name: "Somber",
    tag: "Melancholic",
    description: "Soft, emotional tone for documentaries and sensitive content.",
    demoText: "Some stories touch the heart in ways words alone never could...",
    accent: "British",
    gender: "Female",
    age: "Middle-aged",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    accentColor: "#6366f1",
    featured: false,
    waveform: [15, 18, 12, 25, 20, 28, 15, 22, 18, 30, 12, 20, 15, 25, 10, 18, 22, 12, 28, 15, 18, 12, 25, 20, 28, 15, 22, 18, 30, 12, 20, 15, 25, 10, 18, 22, 12, 28, 15, 18],
  },
  {
    id: "cheerful",
    name: "Cheerful",
    tag: "Bright & Happy",
    description: "Upbeat and friendly voice for ads and social content.",
    demoText: "Hey there! Ready to make something amazing together? Let's go!",
    accent: "American",
    gender: "Female",
    age: "Young",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    accentColor: "#f43f5e",
    featured: false,
    waveform: [35, 48, 42, 55, 38, 62, 45, 58, 52, 68, 42, 55, 48, 62, 38, 52, 58, 42, 65, 48, 42, 55, 38, 62, 45, 58, 52, 68, 42, 55, 48, 62, 38, 52, 58, 42, 65, 48, 42, 55],
  },
  {
    id: "professional",
    name: "Professional",
    tag: "Corporate & Clear",
    description: "Crisp, authoritative tone for business and training materials.",
    demoText: "Our quarterly results demonstrate consistent growth across all sectors.",
    accent: "American",
    gender: "Male",
    age: "Middle-aged",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accentColor: "#10b981",
    featured: false,
    waveform: [25, 30, 28, 35, 32, 38, 30, 35, 32, 40, 28, 35, 30, 38, 28, 35, 32, 30, 38, 28, 25, 30, 28, 35, 32, 38, 30, 35, 32, 40, 28, 35, 30, 38, 28, 35, 32, 30, 38, 28],
  },
  {
    id: "whisper",
    name: "Whisper",
    tag: "Soft & Intimate",
    description: "Gentle, close-mic feel for ASMR and intimate narration.",
    demoText: "Close your eyes and listen... the world fades away into calm.",
    accent: "British",
    gender: "Female",
    age: "Young",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    accentColor: "#8b5cf6",
    featured: false,
    waveform: [8, 12, 10, 15, 12, 18, 10, 14, 12, 16, 10, 14, 12, 18, 8, 12, 14, 10, 16, 8, 12, 10, 15, 12, 18, 10, 14, 12, 16, 10, 14, 12, 18, 8, 12, 14, 10, 16, 8, 12],
  },
  {
    id: "news",
    name: "News Anchor",
    tag: "Confident & Crisp",
    description: "Broadcast-quality delivery for news and announcements.",
    demoText: "Breaking news: voice technology reaches new heights in clarity and speed.",
    accent: "American",
    gender: "Male",
    age: "Mature",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "#3b82f6",
    featured: false,
    waveform: [30, 35, 32, 40, 35, 42, 32, 38, 35, 45, 32, 38, 35, 42, 30, 38, 35, 32, 42, 35, 32, 38, 35, 42, 32, 38, 35, 45, 32, 38, 35, 42, 30, 38, 35, 32, 42, 35, 32, 38],
  },
  {
    id: "storyteller",
    name: "Storyteller",
    tag: "Warm & Engaging",
    description: "Captivating narrative voice for audiobooks and stories.",
    demoText: "Once upon a time, in a land where voices carried magic...",
    accent: "British",
    gender: "Male",
    age: "Middle-aged",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    accentColor: "#14b8a6",
    featured: false,
    waveform: [22, 28, 25, 35, 28, 42, 25, 32, 28, 38, 22, 30, 25, 35, 20, 28, 32, 22, 38, 25, 28, 35, 28, 42, 25, 32, 28, 38, 22, 30, 25, 35, 20, 28, 32, 22, 38, 25, 28, 35],
  },
];

const FEATURES: Feature[] = [
  {
    icon: Wand2,
    title: "Ultra-Realistic",
    description: "AI voices indistinguishable from human speech with natural intonation and emotion.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate hours of audio in seconds. Real-time synthesis for live applications.",
  },
  {
    icon: Globe,
    title: "29+ Languages",
    description: "Support for major world languages with native accent and pronunciation accuracy.",
  },
  {
    icon: Layers,
    title: "Voice Cloning",
    description: "Clone any voice with just 30 seconds of sample audio. Perfect consistency.",
  },
  {
    icon: Volume2,
    title: "Fine Control",
    description: "Adjust speed, pitch, tone, and emotion with granular precision.",
  },
  {
    icon: Timer,
    title: "Long-Form Ready",
    description: "Synthesize entire audiobooks and podcasts without quality degradation.",
  },
];

const USE_CASES: UseCase[] = [
  { icon: BookOpen, title: "Audiobooks", description: "Turn manuscripts into immersive listening experiences." },
  { icon: Radio, title: "Podcasts", description: "Produce shows without recording equipment." },
  { icon: Clapperboard, title: "Video Content", description: "Professional voiceovers for YouTube and social media." },
  { icon: Gamepad2, title: "Game Development", description: "Dynamic NPC dialogue and narration at scale." },
  { icon: Phone, title: "IVR & Call Centers", description: "Natural-sounding automated phone systems." },
  { icon: ShoppingBag, title: "E-Commerce", description: "Product descriptions and marketing voiceovers." },
  { icon: GraduationCap, title: "E-Learning", description: "Engaging course narration in multiple languages." },
  { icon: MessageSquare, title: "Chatbots", description: "Conversational AI with expressive voice replies." },
];

// ============================================================
// ANIMATION
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ============================================================
// COMPONENTS - MIRALAS VOICE EXPLORER
// ============================================================

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function VoiceOrb({
  voice,
  active = false,
  size = "md",
}: {
  voice: Voice;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "size-10",
    md: "size-14",
    lg: "size-24 sm:size-28",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border bg-gradient-to-br",
        sizes[size],
        active ? "border-border shadow-xl" : "border-white/60",
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 35% 30%, white 0%, ${voice.accentColor}88 28%, ${voice.accentColor} 62%, #2d2a26 125%)`,
      }}
    >
      <div
        className={cn(
          "absolute inset-[18%] rounded-full border border-white/30 bg-card/10 backdrop-blur-sm",
          active && "animate-pulse",
        )}
      />
      <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card shadow-lg" />
    </div>
  );
}

function MiniWaveform({
  voice,
  isPlaying,
  large = false,
}: {
  voice: Voice;
  isPlaying: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[2px]",
        large ? "h-20 sm:h-24" : "h-8",
      )}
    >
      {voice.waveform.map((height, index) => (
        <motion.span
          key={`${voice.id}-${index}`}
          className="min-w-[2px] flex-1 rounded-full"
          style={{
            height: `${Math.max(8, height * (large ? 0.86 : 0.42))}%`,
            backgroundColor: voice.accentColor,
          }}
          animate={
            isPlaying
              ? {
                  scaleY: [0.65, 1.15, 0.75, 1],
                  opacity: [0.45, 0.95, 0.55, 0.85],
                }
              : { scaleY: 1, opacity: 0.42 }
          }
          transition={{
            duration: 1.1,
            repeat: isPlaying ? Infinity : 0,
            delay: index * 0.018,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function VoiceListItem({
  voice,
  selected,
  playing,
  onSelect,
  onTogglePlay,
}: {
  voice: Voice;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
  onTogglePlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 border-b border-border px-3 py-3 text-left transition",
        selected
          ? "bg-muted text-foreground border-l-[3px] border-l-[#c9a87c]"
          : "hover:bg-muted",
      )}
    >
      <div className="relative">
        <VoiceOrb voice={voice} active={selected} size="sm" />
        <span
          onClick={(event) => {
            event.stopPropagation();
            onTogglePlay();
          }}
          className={cn(
            "absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border shadow-sm transition",
            selected
              ? "border-border bg-card text-foreground"
              : "border-white bg-primary text-primary-foreground opacity-0 group-hover:opacity-100",
          )}
        >
          {playing ? (
            <Pause className="size-3 fill-current" />
          ) : (
            <Play className="ml-0.5 size-3 fill-current" />
          )}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{voice.name}</p>
          {voice.featured && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                selected ? "bg-border text-muted-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              Pick
            </span>
          )}
        </div>
        <p className={cn(
          "mt-0.5 truncate text-xs",
          selected ? "text-muted-foreground" : "text-muted-foreground",
        )}>
          {voice.tag}
        </p>
      </div>

      <ChevronRight
        className={cn(
          "size-4 shrink-0 transition-transform",
          selected
            ? "translate-x-0 text-amber-600"
            : "-translate-x-1 text-muted-foreground group-hover:translate-x-0",
        )}
      />
    </button>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function VoiceExplorer({
  voices,
  selectedId,
  setSelectedId,
  playingId,
  togglePlay,
}: {
  voices: Voice[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  playingId: string | null;
  togglePlay: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<"All" | Voice["gender"]>("All");
  const [accent, setAccent] = useState<"All" | "American" | "British">("All");

  const filteredVoices = voices.filter((voice) => {
    const matchesQuery =
      !query ||
      `${voice.name} ${voice.tag} ${voice.description}`
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesGender = gender === "All" || voice.gender === gender;
    const matchesAccent = accent === "All" || voice.accent === accent;

    return matchesQuery && matchesGender && matchesAccent;
  });

  const selected =
    voices.find((voice) => voice.id === selectedId) ??
    filteredVoices[0] ??
    voices[0];

  return (
    <section id="voices" className="pb-8 pt-4 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Mic className="size-3.5" />
              Voice Library
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Choose a voice.
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                  No long cards. Browse voices on the left, preview your
                  selected voice on the right, and send it straight to Miralas Studio.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{filteredVoices.length} voices</span>
                <span className="size-1 rounded-full bg-border" />
                <span>29+ languages</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by voice, character, or use case..."
                className="h-10 w-full rounded-xl bg-muted pl-9 pr-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:bg-muted"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              <FilterChip label="All" active={gender === "All"} onClick={() => setGender("All")} />
              <FilterChip label="Male" active={gender === "Male"} onClick={() => setGender("Male")} />
              <FilterChip label="Female" active={gender === "Female"} onClick={() => setGender("Female")} />
              <FilterChip label="American" active={accent === "American"} onClick={() => setAccent("American")} />
              <FilterChip label="British" active={accent === "British"} onClick={() => setAccent("British")} />
            </div>

            <button
              type="button"
              className="hidden h-10 items-center justify-center gap-2 rounded-xl border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted sm:flex"
            >
              <SlidersHorizontal className="size-3.5" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid min-h-[640px] overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_20px_70px_-35px_rgba(45,42,38,0.28)] lg:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="border-b border-border bg-background lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Voices
              </div>
              <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Explore
              </span>
            </div>

            <div className="max-h-[420px] overflow-y-auto lg:max-h-[570px]">
              <AnimatePresence initial={false}>
                {filteredVoices.map((voice) => (
                  <motion.div
                    key={voice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <VoiceListItem
                      voice={voice}
                      selected={voice.id === selected.id}
                      playing={playingId === voice.id}
                      onSelect={() => setSelectedId(voice.id)}
                      onTogglePlay={() => togglePlay(voice.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredVoices.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <Search className="mx-auto mb-3 size-5 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">No voices found</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>
          </aside>

          <div className="relative flex min-h-[640px] flex-col overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(45,42,38,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(45,42,38,.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative flex flex-1 flex-col p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <VoiceOrb voice={selected} active size="lg" />
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {selected.tag}
                      </span>
                      {selected.featured && (
                        <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                          Miralas Pick
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {selected.name}
                    </h3>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
                      {selected.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-border hover:text-foreground"
                  aria-label="Add to favorites"
                >
                  <Heart className="size-4" />
                </button>
              </div>

              <div className="mt-10 rounded-3xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur sm:p-6">
                <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Voice preview</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="size-3.5" />
                      {selected.accent}
                    </span>
                    <span>{selected.gender}</span>
                    <span>{selected.age}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted px-4 py-5 sm:px-6">
                  <MiniWaveform
                    voice={selected}
                    isPlaying={playingId === selected.id}
                    large
                  />
                  <div className="mt-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    <span>Preview</span>
                    <span>{playingId === selected.id ? "Playing" : "Ready"}</span>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Demo text
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-foreground">
                      "{selected.demoText}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePlay(selected.id)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary"
                  >
                    {playingId === selected.id ? (
                      <>
                        <Pause className="size-4 fill-current" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-4 fill-current" />
                        Listen
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Wand2 className="size-4" />
                    Move this voice to Miralas Studio
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enter your text, adjust the tone, and start generating.
                  </p>
                </div>

                <a
                  href="https://console.miralas/auth"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary"
                >
                  Use Voice
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <div className="border-t border-border bg-card/80 px-5 py-3 backdrop-blur sm:px-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Volume2 className="size-3.5" />
                Preview player · Miralas Voice Library
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="border-y border-border bg-background py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-border bg-border px-0 sm:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: "Natural Expression",
            description: "More human speech without losing tone, rhythm, or emotion.",
          },
          {
            icon: Zap,
            title: "Fast Generation",
            description: "A workflow that turns even long text into speech without delay.",
          },
          {
            icon: Globe,
            title: "Multiple Languages",
            description: "A consistent product experience across different languages and accents.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-card p-6 sm:p-7">
              <Icon className="mb-5 size-5 text-foreground" />
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LoginWall() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-primary px-6 py-12 text-center sm:px-10 sm:py-16">
          <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card/[0.06] blur-3xl" />
          <div className="relative z-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/40">
              Miralas TTS
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Start bringing your voice to life.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/45 sm:text-base">
              Take your selected voice from the Voice Library straight into Studio
              and create your first generation in seconds.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://console.miralas.io/auth"
                className="inline-flex h-11 items-center justify-center rounded-full bg-muted px-6 text-sm font-semibold text-foreground transition hover:bg-card"
              >
                Start for Free
              </a>
              <a
                href="https://console.miralas.io/auth"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium text-primary-foreground transition hover:bg-card/5"
              >
                Log In
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary-foreground/35">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" /> No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" /> 10,000 characters free
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" /> 29+ languages
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function TTSPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(VOICES[0].id);

  const togglePlay = (id: string) => {
    setPlayingId((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-border pt-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-10 size-64 rounded-full bg-muted blur-3xl" />
            <div className="absolute right-[8%] top-20 size-72 rounded-full bg-muted blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm">
                <Sparkles className="size-3.5" />
                Miralas Voice Library
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">
                Find the right voice.
                <br />
                Then make it speak.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                The new Voice Library built for Miralas TTS lets you explore
                voices like a real product panel instead of browsing them one
                long card at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-10 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-700" />
                Natural speech
              </span>
              <span className="size-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-700" />
                23+ languages
              </span>
              <span className="size-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-700" />
                Voice cloning
              </span>
              <span className="size-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-700" />
                API
              </span>
            </motion.div>
          </div>
        </section>

        <VoiceExplorer
          voices={VOICES}
          selectedId={selectedId}
          setSelectedId={(id) => {
            setSelectedId(id);
            setPlayingId(null);
          }}
          playingId={playingId}
          togglePlay={togglePlay}
        />

        <FeatureStrip />
        <LoginWall />
      </main>

      <Footer />
    </div>
  );
}
