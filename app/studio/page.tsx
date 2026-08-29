


"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Globe2,
  Mic2,
  Sparkles,
  Volume2,
  VolumeX,
  WandSparkles,
  Waves,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import SmoothScroll from "../../components/providers/SmoothScroll";

const VIDEO_SRC = "/videos/studio_hero.mp4";

const languages = ["English", "Uzbek", "Turkish", "Kazakh", "Kyrgyz", "Azerbaijani"];

const useCases = [
  {
    label: "Voice Clone",
    title: "Your voice, recreated with precision.",
    description:
      "Create a production-ready digital voice from a short recording. Keep the identity, tone, pacing, and character consistent across every generation.",
    points: ["Fast voice capture", "Natural speech patterns", "Reusable voice profiles"],
  },
  {
    label: "Text to Speech",
    title: "Turn writing into natural speech.",
    description:
      "Generate expressive narration from text with control over delivery, pacing, pronunciation, and emotion. Built for real products, not demos.",
    points: ["Expressive delivery", "Pronunciation control", "Long-form generation"],
  },
];

export default function MiralasStudio() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) videoRef.current.volume = 1;
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <Header />
        <section id="top" className="px-4 pt-4 mt-18 md:px-8 md:pt-6 ">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto aspect-[16/10] w-full max-w-[1480px] overflow-hidden rounded-[30px] bg-foreground shadow-[0_30px_100px_rgba(0,0,0,0.16)] md:aspect-[21/9] md:rounded-[38px]"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

            <div className="absolute left-5 right-5 top-5 flex items-start justify-between md:left-8 md:right-8 md:top-8">
              <div className="rounded-full border border-border bg-background/20 px-3.5 py-2 text-[11px] font-medium tracking-[0.12em] text-foreground/80 backdrop-blur-xl">
                MIRALAS STUDIO
              </div>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/20 text-foreground backdrop-blur-xl transition hover:bg-background/35"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            <div className="absolute inset-x-5 bottom-5 max-w-3xl md:inset-x-8 md:bottom-8">
              <div className="mb-4 flex items-center gap-2 text-[12px] font-medium text-foreground/65">
                <span className="h-1.5 w-1.5 rounded-full bg-card" />
                Voice AI for creators and products
              </div>
              <h1 className="max-w-4xl text-[38px] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-5xl md:text-7xl">
                Build voices that sound real.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65 sm:text-base md:text-lg">
                Clone a voice, generate natural speech, and shape the final performance in one focused studio.
              </p>
            </div>

            <div className="absolute bottom-5 right-5 hidden md:block md:bottom-8 md:right-8">
              <a
                href="#studio"
                className="group flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-[13px] font-semibold text-foreground transition hover:gap-3"
              >
                Explore Studio
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>

        <section id="studio" className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                One studio
              </div>
              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From a recording to a finished voice.
              </h2>
            </div>

            <div className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Miralas Studio keeps the creative workflow simple. Create a voice once, then use it across narration, assistants, videos, podcasts, audiobooks, and product experiences.
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground">
                <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Voice cloning</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Text to speech</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Multilingual output</span>
              </div>
            </div>
          </div>
        </section>

        {useCases.map((item, index) => (
          <section
            key={item.label}
            id={index === 0 ? "voice-clone" : "tts"}
            className="border-t border-border px-5 md:px-8"
          >
            <div className="mx-auto grid max-w-[1240px] gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-28">
              <div>
                <div className="mb-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {index === 0 ? <Mic2 className="h-4 w-4" /> : <Waves className="h-4 w-4" />}
                  {item.label}
                </div>
                <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {item.title}
                </h2>
              </div>

              <div>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                  {item.points.map((point) => (
                    <div key={point} className="text-sm font-medium text-foreground">
                      <div className="mb-3 h-px w-8 bg-foreground" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border px-5 md:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-8 py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-20 md:py-28">
            <div className="overflow-hidden rounded-[30px] bg-foreground p-7 text-background md:p-10">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-background/40">Voice workspace</div>
                  <div className="mt-2 text-xl font-medium">A voice you can actually work with.</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10">
                  <WandSparkles className="h-4 w-4" />
                </div>
              </div>

              <div className="rounded-2xl border border-background/10 bg-background/[0.04] p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-foreground">
                    <Mic2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Studio Voice</div>
                    <div className="text-xs text-background/40">Ready for generation</div>
                  </div>
                </div>

                <div className="flex h-14 items-center gap-1 overflow-hidden rounded-xl bg-background/[0.04] px-4">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 shrink-0 rounded-full bg-background/35"
                      style={{ height: `${10 + ((i * 17) % 30)}px` }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-background/40">
                  <span>00:00</span>
                  <span>00:18</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Globe2 className="h-4 w-4" />
                Built for global voices
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One voice layer for every market.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Keep the same voice identity while creating content in multiple languages and delivery styles.
              </p>

              <div id="languages" className="mt-8 flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground"
                  >
                    {language}
                  </span>
                ))}
              </div>

              <a href="#top" className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground">
                Back to Studio
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-border px-5 py-10 md:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 Miralas Studio</div>
            <div className="flex items-center gap-5">
              <span>Voice Clone</span>
              <span>Text to Speech</span>
              <span>Studio</span>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}