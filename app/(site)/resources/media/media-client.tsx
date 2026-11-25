
"use client";
// bu joyga keyin qoyiladi odam kim kelsa ham artist bolib hozriga default bor 
import { Reveal, RevealHeading, RevealParagraph } from "@/components/motion/primitives";

import {
  Sparkles,
  User,
} from "lucide-react";
import { IconBrandInstagram } from "@tabler/icons-react";






// ─── HERO VIDEO ───
function HeroVideo() {
  return (
    <section className="relative w-full bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-border/60 surface-shadow">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Reveal trigger="load"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 mb-6">
                  <Sparkles className="size-3" />
                  Our Creator Community
                </span>
              </Reveal>
              <RevealHeading trigger="load" as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl"
              >
                Voices that move
                <br />
                <span className="text-foreground/70">the world forward</span>
              </RevealHeading>
              <RevealParagraph trigger="load"
                className="mt-5 text-sm sm:text-base text-foreground/60 max-w-lg leading-relaxed"
              >
                Meet the artists, actors, and creators shaping the future of voice in Uzbekistan and beyond.
              </RevealParagraph>
              <Reveal trigger="load"
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
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-foreground font-sans selection:bg-stone-200">
      <HeroVideo />
    </main>
  );
}