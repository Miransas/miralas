"use client";

import { useRef } from "react";
import LaserFlow from "../LaserFlow";
import VoiceStudioDemo from "./voice-studio-demo";

const capabilities = [
  "TEXT TO SPEECH",
  "VOICE CLONING",
  "SPEECH TO SPEECH",
  "VOICE AGENTS",
];

export default function LaserHero() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section
      aria-labelledby="miransas-hero-title"
      className="dark relative isolate h-[1000px] w-full overflow-hidden bg-[#060608] text-white [color-scheme:dark]"
    >
      {/* Keep the existing laser treatment and its visual tuning. */}
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
      <div className="pointer-events-none absolute left-[7%] right-[7%] top-[10%] z-10 max-w-[820px] md:left-[8%] md:right-auto md:top-[13%]">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-[11px]">
            Miransas · AI voice infrastructure
          </span>
        </div>

        <h1
          id="miransas-hero-title"
          className="max-w-[820px] bg-gradient-to-b from-white via-white to-orange-100/75 bg-clip-text text-[clamp(3.35rem,7.3vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-transparent"
        >
          Give intelligence
          <br />
          a natural voice.
        </h1>

        <p className="mt-6 max-w-[570px] text-[15px] leading-[1.75] text-white/65 sm:text-base md:mt-7 md:text-lg">
          Create lifelike speech, shape unique voice identities, and build
          real-time voice experiences. Everything you need to bring voice AI
          into your products, connected through one platform.
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
          <a
            href="/studio"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[linear-gradient(100deg,#dedee1_0%,#f4f1ec_58%,#ffe5cc_100%)] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.13em] text-[#24160e] shadow-[0_0_34px_rgba(249,115,22,0.23),inset_0_0_0_1px_rgba(255,255,255,0.65)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(249,115,22,0.38)] sm:px-8"
          >
            Explore the studio
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </a>

          <a
            href="#voice-demo"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.035] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/[0.08] hover:text-white sm:px-7"
          >
            Experience the voice
            <span className="text-base text-orange-300" aria-hidden="true">
              ↘
            </span>
          </a>
        </div>

        <div className="mt-7 flex max-w-[670px] flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-medium tracking-[0.17em] text-white/40 sm:mt-8 sm:gap-x-4 sm:text-[10px]">
          {capabilities.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-3">
              {index > 0 && (
                <span className="h-1 w-1 rounded-full bg-orange-400/70" aria-hidden="true" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive studio preview: also the LaserFlow surface. */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="absolute left-[5%] right-[5%] top-[59%] bottom-[-24px] overflow-hidden rounded-[14px] border border-white/[0.09] bg-[#0b0b0d] shadow-[0_-18px_80px_rgba(0,0,0,0.24)] md:left-[18%] md:right-[28%] md:top-[52%]"
      >
        <VoiceStudioDemo />
      </div>
    </section>
  );
}
