"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import LaserFlow from "../LaserFlow";
import VoiceStudioDemo from "./voice-studio-demo";
import { ScrollReveal, WordReveal } from "@/components/motion/reveal";
import { VOICE_TECHNOLOGY } from "@/lib/voice-technology";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2";

const LaserHero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home-hero"
      data-home-hero
      className="dark relative isolate min-h-screen w-full overflow-clip bg-[#050505] text-white md:h-[1200px]"
      style={{ colorScheme: "dark" }}
    >
      {/* Cinematic laser background — DPR capped at 1.5, paused when off-screen */}
      <LaserFlow
        surfaceRef={cardRef}
        beamPosition={0.59}
        color="#7c3aed"
        intensity={1.8}
        flare={1.5}
        spread={1.5}
        spill={1.15}
        fog={0.55}
        dust={1.2}
        revealImage="/"
        revealRadius={290}
        revealOpacity={0.6}
        beamWidth={1.2}
        streaks={1.55}
        dots={0.45}
        pulse={1.25}
        speed={2.2}
        seed={8}
        mouseInteraction
        intro
      />

      {/* Hero content: CSS-only entrance (≤ 0.65s total) so LCP never waits for JS. */}
      <div className="pointer-events-none relative z-10 mx-[7%] max-w-[700px] pb-12 pt-32 md:absolute md:left-[8%] md:right-[7%] md:top-[13%] md:mx-0 md:pb-0 md:pt-0">
        <ScrollReveal trigger="load" className="pointer-events-auto">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2 text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-[#D1D1D1] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.9)]" />
            AI Voice Infrastructure
          </span>
        </ScrollReveal>

        <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] [word-spacing:0.04em] text-white sm:text-6xl lg:text-[4.5rem]">
          <WordReveal trigger="load" delay={0.05} text="Give intelligence" />
          <br />
          <WordReveal trigger="load" delay={0.13} text="a natural voice." className="text-[#D1D1D1]" />
        </h1>

        <ScrollReveal trigger="load" delay={0.2}>
          <p className="mt-6 max-w-[580px] text-base leading-[1.6] text-[#D1D1D1] sm:text-lg lg:text-[1.1875rem]">
            Create natural speech, shape unique voice identities, and build
            real-time voice agents—all on one unified platform.
          </p>
        </ScrollReveal>

        <ScrollReveal trigger="load" delay={0.26}>
          <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={VOICE_TECHNOLOGY.consoleUrl}
              className={`group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#050505] shadow-[0_12px_36px_-8px_rgba(124,58,237,0.45)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#D1D1D1] hover:shadow-[0_16px_44px_-8px_rgba(124,58,237,0.6)] active:scale-[0.98] ${FOCUS_RING}`}
            >
              <span>Open Studio</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#technology"
              className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-[#D1D1D1] backdrop-blur-sm transition-[background-color,color,transform] duration-200 hover:bg-white/[0.11] hover:text-white active:scale-[0.98] ${FOCUS_RING}`}
            >
              Explore the platform
            </a>
          </div>

          <p className="mt-4 text-xs sm:text-[13px] leading-[1.45] text-[#6E6E74]">
            Currently in private preview ·{" "}
            <a
              href="/resources/changelog"
              className={`pointer-events-auto text-[#D1D1D1] underline underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
            >
              Follow development updates
            </a>
          </p>
        </ScrollReveal>
      </div>

      {/* Voice Studio preview — borderless #000103 surface */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="relative mx-[5%] h-[280px] overflow-hidden rounded-t-[24px] bg-[#000103] shadow-[0_-24px_80px_-16px_rgba(0,0,0,0.85)] sm:h-[380px] md:absolute md:bottom-[-24px] md:left-[18%] md:right-[12%] md:top-[65%] md:mx-0 md:h-auto"
      >
        <VoiceStudioDemo />
      </div>
    </section>
  );
};

export default LaserHero;
