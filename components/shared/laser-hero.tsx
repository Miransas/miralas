
"use client";

import { useRef } from "react";
import LaserFlow from "../LaserFlow";
import VoiceStudioDemo from "./voice-studio-demo";

const LaserHero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home-hero"
      data-home-hero
      className="dark relative isolate min-h-[900px] w-full overflow-hidden bg-[#050505] text-white md:h-[1000px]"
      style={{ colorScheme: "dark" }}
    >
      {/* Cinematic laser background */}
      <LaserFlow
        surfaceRef={cardRef}
        beamPosition={0.6}
        color="#f97316"
        intensity={1.8}
        flare={1.5}
        spread={1.5}
        spill={1.35}
        fog={1.45}
        dust={1.6}
        beamWidth={1.4}
        streaks={1.1}
        dots={1}
        pulse={1.5}
        speed={2.4}
        seed={17}
        mouseInteraction
        intro
      />

      {/* Hero content */}
      <div className="pointer-events-none absolute left-[7%] top-[15%] z-10 max-w-[680px] md:left-[8%] md:top-[14%]">
        <div className="pointer-events-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-white/75 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.7)]" />
            AI VOICE INFRASTRUCTURE
          </span>
        </div>

        <h1 className="mt-6 bg-gradient-to-b from-white via-white to-white/65 bg-clip-text text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-transparent sm:text-6xl md:text-7xl">
          Give intelligence
          <br />
          a natural voice.
        </h1>

        <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/60 sm:text-lg md:text-xl">
          Create natural speech, shape unique voice identities, and build
          intelligent voice experiences. Everything connected through one
          carefully engineered platform.
        </p>

        <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="/studio"
            className="group inline-flex items-center gap-3 rounded-full px-3.5 py-2 text-sm font-semibold text-[#241207] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(249,115,22,0.4)]"
            style={{
              background:
                "linear-gradient(100deg, #d6d6d8 0%, #f0f0f0 55%, #fff0dc 100%)",
              boxShadow:
                "0 0 30px rgba(249,115,22,0.32), inset 0 0 0 1px rgba(255,255,255,0.45)",
            }}
          >
            Explore the Studio
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#voice-demo"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition duration-300 hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
          >
            Experience the voice
          </a>
        </div>

        {/* Capability labels */}
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium tracking-[0.16em] text-white/40 sm:text-[11px]">
          <span>TEXT TO SPEECH</span>
          <span className="size-1 rounded-full bg-white/25" />
          <span>VOICE CLONING</span>
          <span className="size-1 rounded-full bg-white/25" />
          <span>SPEECH TO SPEECH</span>
          <span className="size-1 rounded-full bg-white/25" />
          <span>VOICE AGENTS</span>
        </div>
      </div>

      {/* Voice Studio preview */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="absolute overflow-hidden rounded-t-[18px] border border-white/[0.09] bg-[#0b0b0d] shadow-[0_-20px_100px_rgba(0,0,0,0.35)]"
        style={{
          left: "18%",
          right: "12%",
          top: "55%",
          bottom: "-24px",
        }}
      >
        <VoiceStudioDemo />
      </div>
    </section>
  );
};

export default LaserHero;
