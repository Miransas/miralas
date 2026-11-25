"use client";

import { buttonVariants } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import LaserFlow from "../LaserFlow";
import VoiceStudioDemo from "./voice-studio-demo";
import { TextReveal } from "@/components/motion/reveal";
import { StaggerReveal, RevealEyebrow, RevealParagraph, RevealCard } from "@/components/motion/primitives";
import { VOICE_TECHNOLOGY } from "@/lib/voice-technology";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

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
        color="#ad08ea"
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

      {/* Visible server copy, enhanced with grouped line and paragraph reveals. */}
      <StaggerReveal trigger="load" className="pointer-events-none relative z-10 mx-[7%] max-w-[700px] pb-12 pt-32 md:absolute md:left-[8%] md:right-[7%] md:top-[13%] md:mx-0 md:pb-0 md:pt-0">
        <RevealEyebrow as="div" className="pointer-events-auto">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2 text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-text-primary backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-text-heading" />
            AI Voice Infrastructure
          </span>
        </RevealEyebrow>

        <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] [word-spacing:0.04em] text-white sm:text-6xl lg:text-[4.5rem]">
          <TextReveal text="Give intelligence" />
          <TextReveal text="a natural voice." className="text-text-primary" />
        </h1>

        <RevealParagraph className="mt-6 max-w-[580px] text-base leading-[1.6] text-text-primary sm:text-lg lg:text-[1.1875rem]">
            Create natural speech, shape unique voice identities, and build
            real-time voice agents—all on one unified platform.
        </RevealParagraph>

        <RevealCard>
          <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={VOICE_TECHNOLOGY.consoleUrl}
              className={buttonVariants({ className: "group" })}
            >
              <span>Open Studio</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#technology"
              className={buttonVariants({ variant: "secondary" })}
            >
              Explore the platform
            </a>
          </div>

          <p className="mt-4 text-xs sm:text-[13px] leading-[1.45] text-text-muted">
            Currently in private preview ·{" "}
            <a
              href="/resources/changelog"
              className={`pointer-events-auto text-text-primary underline underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
            >
              Follow development updates
            </a>
          </p>
        </RevealCard>
      </StaggerReveal>

      {/* Voice Studio preview — neutral dark surface */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="relative mx-[5%] h-[280px] overflow-hidden rounded-t-4xl bg-surface-card shadow-[0_-24px_80px_-16px_rgba(0,0,0,0.85)] sm:h-[380px] md:absolute md:bottom-[-24px] md:left-[18%] md:right-[12%] md:top-[65%] md:mx-0 md:h-auto"
      >
        <VoiceStudioDemo />
      </div>
    </section>
  );
};

export default LaserHero;
