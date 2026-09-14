"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Heart,
  Mic,
  Pause,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Volume2,
} from "lucide-react";

import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import HeroSection from "./hero-tts";
import FeatureScrollSection from "./FeatureScrollSection";

// ============================================================
// TYPES
// ============================================================

type Gender = "Male" | "Female" | "Neutral";
type Accent = "American" | "British";

interface Voice {
  id: string;
  name: string;
  tag: string;
  description: string;
  demoText: string;
  accent: Accent;
  gender: Gender;
  age: string;
  featured?: boolean;
  waveform: number[];
}

// ============================================================
// DATA
// ============================================================

const VOICES: Voice[] = [
  {
    id: "narrator",
    name: "Narrator",
    tag: "Deep & Authoritative",
    description:
      "Rich, resonant delivery for documentaries, education and long-form narration.",
    demoText:
      "In the vast expanse of the digital frontier, voice is the new interface...",
    accent: "American",
    gender: "Male",
    age: "Middle-aged",
    featured: true,
    waveform: [
      12, 24, 18, 45, 32, 58, 42, 68, 55, 38, 72, 48, 35, 62, 28, 44, 52,
      36, 66, 30, 25, 48, 55, 38, 42, 58, 35, 50, 28, 45, 38, 52, 30, 42, 55,
      35, 48, 40, 52, 38,
    ],
  },
  {
    id: "energetic",
    name: "Energetic",
    tag: "Fast & Dynamic",
    description:
      "High-energy delivery for commercials, social content and action-driven scripts.",
    demoText:
      "Get ready to experience the future of voice technology right now!",
    accent: "American",
    gender: "Male",
    age: "Young",
    featured: true,
    waveform: [
      45, 62, 38, 72, 55, 88, 42, 78, 65, 92, 48, 82, 58, 95, 52, 68, 75,
      45, 82, 60, 55, 78, 65, 88, 48, 72, 58, 85, 52, 68, 75, 55, 82, 60, 48,
      72, 58, 85, 52, 68,
    ],
  },
  {
    id: "dramatic",
    name: "Dramatic",
    tag: "Intense & Dark",
    description:
      "Deep, cinematic delivery for thrillers, trailers and dramatic storytelling.",
    demoText:
      "The shadows lengthened as the mystery deepened into darkness...",
    accent: "British",
    gender: "Male",
    age: "Mature",
    waveform: [
      18, 22, 15, 35, 28, 42, 25, 38, 32, 48, 22, 35, 28, 45, 20, 38, 30,
      25, 42, 18, 22, 35, 28, 42, 25, 38, 32, 48, 22, 35, 28, 45, 20, 38, 30,
      25, 42, 18, 22, 35,
    ],
  },
  {
    id: "fluid",
    name: "Fluid",
    tag: "Smooth & Calm",
    description:
      "Natural, seamless delivery designed for assistants, avatars and conversational products.",
    demoText:
      "Welcome to your personal assistant. How may I help you today?",
    accent: "American",
    gender: "Female",
    age: "Young",
    waveform: [
      22, 28, 25, 32, 28, 35, 30, 38, 32, 28, 35, 30, 38, 32, 28, 35, 30,
      32, 28, 35, 22, 28, 25, 32, 28, 35, 30, 38, 32, 28, 35, 30, 38, 32, 28,
      35, 30, 32, 28, 35,
    ],
  },
  {
    id: "somber",
    name: "Somber",
    tag: "Melancholic",
    description:
      "Soft and emotional delivery for documentaries and sensitive storytelling.",
    demoText:
      "Some stories touch the heart in ways words alone never could...",
    accent: "British",
    gender: "Female",
    age: "Middle-aged",
    waveform: [
      15, 18, 12, 25, 20, 28, 15, 22, 18, 30, 12, 20, 15, 25, 10, 18, 22,
      12, 28, 15, 18, 12, 25, 20, 28, 15, 22, 18, 30, 12, 20, 15, 25, 10, 18,
      22, 12, 28, 15, 18,
    ],
  },
  {
    id: "cheerful",
    name: "Cheerful",
    tag: "Bright & Happy",
    description:
      "Friendly, upbeat delivery for ads, social media and everyday content.",
    demoText:
      "Hey there! Ready to make something amazing together? Let's go!",
    accent: "American",
    gender: "Female",
    age: "Young",
    waveform: [
      35, 48, 42, 55, 38, 62, 45, 58, 52, 68, 42, 55, 48, 62, 38, 52, 58,
      42, 65, 48, 42, 55, 38, 62, 45, 58, 52, 68, 42, 55, 48, 62, 38, 52, 58,
      42, 65, 48, 42, 55,
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tag: "Corporate & Clear",
    description:
      "Crisp and authoritative delivery for business, training and presentations.",
    demoText:
      "Our quarterly results demonstrate consistent growth across all sectors.",
    accent: "American",
    gender: "Male",
    age: "Middle-aged",
    waveform: [
      25, 30, 28, 35, 32, 38, 30, 35, 32, 40, 28, 35, 30, 38, 28, 35, 32,
      30, 38, 28, 25, 30, 28, 35, 32, 38, 30, 35, 32, 40, 28, 35, 30, 38, 28,
      35, 32, 30, 38, 28,
    ],
  },
  {
    id: "whisper",
    name: "Whisper",
    tag: "Soft & Intimate",
    description:
      "Gentle close-mic delivery for ASMR, intimate narration and calm experiences.",
    demoText:
      "Close your eyes and listen... the world fades away into calm.",
    accent: "British",
    gender: "Female",
    age: "Young",
    waveform: [
      8, 12, 10, 15, 12, 18, 10, 14, 12, 16, 10, 14, 12, 18, 8, 12, 14, 10,
      16, 8, 12, 10, 15, 12, 18, 10, 14, 12, 16, 10, 14, 12, 18, 8, 12, 14,
      10, 16, 8, 12,
    ],
  },
  {
    id: "news",
    name: "News Anchor",
    tag: "Confident & Crisp",
    description:
      "Broadcast-quality delivery for news, announcements and informational content.",
    demoText:
      "Breaking news: voice technology reaches new heights in clarity and speed.",
    accent: "American",
    gender: "Male",
    age: "Mature",
    waveform: [
      30, 35, 32, 40, 35, 42, 32, 38, 35, 45, 32, 38, 35, 42, 30, 38, 35,
      32, 42, 35, 32, 38, 35, 42, 32, 38, 35, 45, 32, 38, 35, 42, 30, 38, 35,
      32, 42, 35, 32, 38,
    ],
  },
  {
    id: "storyteller",
    name: "Storyteller",
    tag: "Warm & Engaging",
    description:
      "Captivating narrative voice for audiobooks, stories and immersive content.",
    demoText:
      "Once upon a time, in a land where voices carried magic...",
    accent: "British",
    gender: "Male",
    age: "Middle-aged",
    waveform: [
      22, 28, 25, 35, 28, 42, 25, 32, 28, 38, 22, 30, 25, 35, 20, 28, 32,
      22, 38, 25, 28, 35, 28, 42, 25, 32, 28, 38, 22, 30, 25, 35, 20, 28, 32,
      22, 38, 25, 28, 35,
    ],
  },
];

// ============================================================
// HELPERS
// ============================================================

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// WAVEFORM
// ============================================================

function Waveform({
  voice,
  playing,
  large = false,
}: {
  voice: Voice;
  playing: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[2px]",
        large ? "h-24 sm:h-28" : "h-8",
      )}
    >
      {voice.waveform.map((height, index) => (
        <motion.span
          key={`${voice.id}-${index}`}
          className="min-w-[2px] flex-1 rounded-full bg-gradient-to-t from-rose-500 to-rose-300 transition-colors"
          style={{
            height: `${Math.max(10, height * (large ? 0.85 : 0.42))}%`,
          }}
          animate={
            playing
              ? {
                  scaleY: [0.65, 1.15, 0.75, 1],
                  opacity: [0.35, 0.9, 0.5, 0.8],
                }
              : {
                  scaleY: 1,
                  opacity: 0.35,
                }
          }
          transition={{
            duration: 1.1,
            repeat: playing ? Infinity : 0,
            delay: index * 0.018,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// VOICE AVATAR
// ============================================================

function VoiceAvatar({
  voice,
  size = "md",
}: {
  voice: Voice;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "size-9",
    md: "size-12",
    lg: "size-20 sm:size-24",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-white/10 bg-rose-600",
        sizes[size],
      )}
    >
      <div className="absolute inset-[15%] rounded-full border border-foreground/10 bg-red-600" />

      <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,hsl(var(--foreground)/.12),transparent_40%)]" />

      <div className="absolute inset-0 rounded-full border border-foreground/[0.04]" />
    </div>
  );
}

// ============================================================
// VOICE ROW
// ============================================================

function VoiceRow({
  voice,
  selected,
  playing,
  onSelect,
  onPlay,
}: {
  voice: Voice;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
  onPlay: () => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 border-b bg-black border-white/10 px-3 py-3 transition-colors",
        selected ? "bg-white/5" : "hover:bg-muted/40",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <VoiceAvatar voice={voice} size="sm" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {voice.name}
            </span>

            {voice.featured && (
              <span className="shrink-0 rounded-full bg-foreground px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-background">
                Pick
              </span>
            )}
          </div>

          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {voice.tag}
          </div>
        </div>

        <ChevronRight
          className={cn(
            "size-4 shrink-0 transition-all",
            selected
              ? "translate-x-0 text-foreground"
              : "-translate-x-1 text-muted-foreground/50 group-hover:translate-x-0",
          )}
        />
      </button>

      <button
        type="button"
        onClick={onPlay}
        aria-label={playing ? `Pause ${voice.name}` : `Play ${voice.name}`}
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border transition",
          playing || selected
            ? "border-white/10 bg-card text-foreground"
            : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-card",
        )}
      >
        {playing ? (
          <Pause className="size-3.5 fill-current" />
        ) : (
          <Play className="ml-0.5 size-3.5 fill-current" />
        )}
      </button>
    </div>
  );
}

// ============================================================
// FILTER
// ============================================================

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-white/10 bg-black text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

// ============================================================
// VOICE EXPLORER
// ============================================================

function VoiceExplorer() {
  const [selectedId, setSelectedId] = useState(VOICES[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<"All" | Gender>("All");
  const [accent, setAccent] = useState<"All" | Accent>("All");

  const filteredVoices = useMemo(() => {
    return VOICES.filter((voice) => {
      const search = query.toLowerCase().trim();

      const matchesSearch =
        !search ||
        `${voice.name} ${voice.tag} ${voice.description}`
          .toLowerCase()
          .includes(search);

      const matchesGender =
        gender === "All" || voice.gender === gender;

      const matchesAccent =
        accent === "All" || voice.accent === accent;

      return matchesSearch && matchesGender && matchesAccent;
    });
  }, [query, gender, accent]);

  const selected =
    VOICES.find((voice) => voice.id === selectedId) ??
    filteredVoices[0] ??
    VOICES[0];

  const selectVoice = (id: string) => {
    setSelectedId(id);
    setPlayingId(null);
  };

  const togglePlay = (id: string) => {
    setPlayingId((current) => (current === id ? null : id));
  };

  return (
    <section id="voices" className=" bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">

        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Mic className="size-3.5" />
              Voice Library
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
              Find your voice.
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Explore natural voices, preview them instantly, and move the one
              you like directly into Studio.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{filteredVoices.length} voices</span>
            <span className="size-1 rounded-full bg-border" />
            <span>29+ languages</span>
          </div>
        </div>

        {/* Search / filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search voices..."
              className="h-10 w-1/2 rounded-xl border border-white/10 bg-card pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <FilterButton
              active={gender === "All" && accent === "All"}
              onClick={() => {
                setGender("All");
                setAccent("All");
              }}
            >
              All
            </FilterButton>

            <FilterButton
              active={gender === "Female"}
              onClick={() => {
                setGender(gender === "Female" ? "All" : "Female");
              }}
            >
              Female
            </FilterButton>

            <FilterButton
              active={gender === "Male"}
              onClick={() => {
                setGender(gender === "Male" ? "All" : "Male");
              }}
            >
              Male
            </FilterButton>

            <FilterButton
              active={accent === "American"}
              onClick={() => {
                setAccent(accent === "American" ? "All" : "American");
              }}
            >
              American
            </FilterButton>

            <FilterButton
              active={accent === "British"}
              onClick={() => {
                setAccent(accent === "British" ? "All" : "British");
              }}
            >
              British
            </FilterButton>

            <button
              type="button"
              className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card text-muted-foreground transition hover:text-foreground"
              aria-label="More filters"
            >
              <SlidersHorizontal className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Explorer */}
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-card lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* Voice list */}
          <aside className="border-b border-white/10 bg-background lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Voices
              </span>

              <span className="text-[10px] text-muted-foreground">
                {filteredVoices.length}
              </span>
            </div>

            <div className="max-h-[430px] overflow-y-auto lg:max-h-[560px]">
              <AnimatePresence initial={false}>
                {filteredVoices.map((voice) => (
                  <motion.div
                    key={voice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <VoiceRow
                      voice={voice}
                      selected={voice.id === selected.id}
                      playing={playingId === voice.id}
                      onSelect={() => selectVoice(voice.id)}
                      onPlay={() => togglePlay(voice.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredVoices.length === 0 && (
                <div className="px-5 py-14 text-center">
                  <Search className="mx-auto mb-3 size-5 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    No voices found
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Preview */}
          <div className="relative min-h-[500px] overflow-hidden bg-background">

            {/* subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative flex h-full flex-col p-6 sm:p-8 lg:p-10">

              {/* Selected voice */}
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <VoiceAvatar voice={selected} size="lg" />

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {selected.tag}
                      </span>

                      {selected.featured && (
                        <span className="rounded-full bg-foreground px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-background">
                          Miralas Pick
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {selected.name}
                    </h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                      {selected.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Add voice to favorites"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card text-muted-foreground transition hover:text-foreground"
                >
                  <Heart className="size-4" />
                </button>
              </div>

              {/* Preview area */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black p-5 sm:p-6">

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Voice preview
                  </span>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="size-3.5" />
                      {selected.accent}
                    </span>

                    <span>{selected.gender}</span>
                    <span>{selected.age}</span>
                  </div>
                </div>

                <div className="rounded-xl  px-4 py-5">
                  <Waveform
                    voice={selected}
                    playing={playingId === selected.id}
                    large
                  />

                  <div className="mt-3 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span>00:00</span>
                    <span>
                      {playingId === selected.id ? "Playing" : "Ready"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Demo text
                    </div>

                    <p className="text-base leading-7 text-foreground">
                      “{selected.demoText}”
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePlay(selected.id)}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    {playingId === selected.id ? (
                      <>
                        <Pause className="size-3.5 fill-current" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-3.5 fill-current" />
                        Listen
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom action */}
              <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <Volume2 className="size-3.5 text-foreground" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Ready for Studio
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Use {selected.name} for your next generation.
                    </p>
                  </div>
                </div>

                <a
                  href="https://console.miralas.io/auth"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Use Voice
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Small trust row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            Natural speech
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            29+ languages
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            Voice cloning
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            API ready
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function TTSPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <HeroSection />
        <FeatureScrollSection />
        <VoiceExplorer />
      </main>

      <Footer />
    </div>
  );
}
