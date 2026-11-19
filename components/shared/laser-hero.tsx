
"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import LaserFlow from "../LaserFlow";
import VoiceStudioDemo from "./voice-studio-demo";
import { ScrollReveal, WordReveal } from "@/components/motion/reveal";
import { VOICE_TECHNOLOGY } from "@/lib/voice-technology";

const LaserHero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home-hero"
      data-home-hero
      className="dark relative isolate min-h-[900px] w-full overflow-clip bg-[#050505] text-white md:h-[1000px]"
      style={{ colorScheme: "dark" }}
    >
      {/* Cinematic laser background — DPR capped at 1.5, paused when off-screen */}
      <LaserFlow
        surfaceRef={cardRef}
        beamPosition={0.6}
        color="#f97316"
        intensity={1.8}
        flare={1.5}
        spread={1.5}
        spill={1.35}
        fog={0.45}
        dust={0.25}
        beamWidth={1.4}
        streaks={1.1}
        dots={0.2}
        pulse={0.35}
        speed={0.55}
        seed={17}
        dpr={1.5}
        mouseInteraction
        intro
      />

      {/* Hero content: CSS-only entrance (≤ 0.65s total) so LCP never waits for JS. */}
      <div className="pointer-events-none relative z-10 mx-[7%] max-w-[680px] pb-12 pt-32 md:absolute md:left-[8%] md:right-[7%] md:top-[14%] md:mx-0 md:pb-0 md:pt-0">
        <ScrollReveal trigger="load" className="pointer-events-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-white/75 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.7)]" />
            AI VOICE INFRASTRUCTURE
          </span>
        </ScrollReveal>

        <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.03em] [word-spacing:0.04em] text-white sm:text-6xl md:text-7xl">
          <WordReveal trigger="load" delay={0.05} text="Give intelligence" />
          <br />
          <WordReveal trigger="load" delay={0.13} text="a natural voice." className="text-white/75" />
        </h1>

        <ScrollReveal trigger="load" delay={0.2}>
          <p className="mt-6 max-w-[580px] text-base leading-relaxed text-white/65 sm:text-lg md:text-xl">
            Create natural speech, shape unique voice identities, and build
            real-time voice agents—all on one unified platform.
          </p>
        </ScrollReveal>

        <ScrollReveal trigger="load" delay={0.26}>
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={VOICE_TECHNOLOGY.consoleUrl}
              className="group inline-flex min-h-10 items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold text-[#241207] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(249,115,22,0.4)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              style={{
                background:
                  "linear-gradient(100deg, #d6d6d8 0%, #f0f0f0 55%, #fff0dc 100%)",
                boxShadow:
                  "0 0 30px rgba(249,115,22,0.32), inset 0 0 0 1px rgba(255,255,255,0.45)",
              }}
            >
              <span>Open Studio</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>

            <a
              href="#technology"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-[border-color,background-color,color,transform] duration-200 hover:border-white/35 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Explore the platform
            </a>
          </div>

          <p className="mt-4 text-sm text-white/55">
            Currently in private preview ·{" "}
            <a href="/resources/changelog" className="pointer-events-auto underline underline-offset-4 transition-colors hover:text-white">
              Follow development updates
            </a>
          </p>
        </ScrollReveal>
      </div>

      {/* Voice Studio preview */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="relative mx-[5%] h-[280px] overflow-hidden sm:h-[380px] md:absolute md:bottom-[-24px] md:mx-0 md:h-auto rounded-t-[18px] md:left-[18%] md:right-[12%] md:top-[65%] border border-white/[0.09] bg-[#0b0b0d] shadow-[0_-20px_100px_rgba(0,0,0,0.35)]"
      >
        <VoiceStudioDemo />
      </div>
    </section>
  )
};

export default LaserHero;
