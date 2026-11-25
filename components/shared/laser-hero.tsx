"use client";

import { buttonVariants } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroLaser } from "../laser-flow/hero-laser";
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
      className="dark relative isolate flex min-h-svh w-full flex-col justify-between overflow-clip bg-[#050505] text-white md:block md:h-[1200px]"
      style={{ colorScheme: "dark" }}
    >
      {/* One canvas fills the hero; phone/tablet settings use DPR 1. */}
      <HeroLaser surfaceRef={cardRef} />

      {/* Visible server copy */}
      <StaggerReveal
        trigger="load"
        className="pointer-events-none relative z-10 mx-[5%] flex max-w-[700px] flex-col items-center pb-14 pt-28 text-center md:absolute md:left-[8%] md:right-[7%] md:top-[13%] md:mx-0 md:block md:pb-0 md:pt-0 md:text-left"
      >
        {/* Mobilde tüm metin bloğunu ("Follow development updates" dahil) kapsayan yumuşak çok duraklı + radial scrim; altında lazer tam parlaklıkla karta vurur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 top-0 -bottom-6 -z-10 bg-[radial-gradient(ellipse_95%_82%_at_50%_46%,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.85)_58%,rgba(5,5,5,0.45)_82%,transparent_100%),linear-gradient(180deg,rgba(5,5,5,0.84)_0%,rgba(5,5,5,0.78)_45%,rgba(5,5,5,0.88)_78%,rgba(5,5,5,0.42)_91%,transparent_100%)] md:hidden"
        />

        <RevealEyebrow as="div" className="pointer-events-auto">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-text-primary backdrop-blur-md sm:text-[13px]">
            <span className="size-1.5 rounded-full bg-text-heading" />
            AI Voice Infrastructure
          </span>
        </RevealEyebrow>

        <h1 className="mt-5 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] [word-spacing:0.04em] text-white sm:mt-6 sm:text-6xl lg:text-[4.5rem]">
          <TextReveal text="Give intelligence" />
          <TextReveal text="a natural voice." className="text-text-primary" />
        </h1>

        <RevealParagraph className="mt-5 max-w-[580px] text-[15px] leading-[1.6] text-text-primary sm:mt-6 sm:text-lg lg:text-[1.1875rem]">
          Create natural speech, shape unique voice identities, and build
          real-time voice agents—all on one unified platform.
        </RevealParagraph>

        <RevealCard>
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-7 sm:gap-4 md:justify-start">
            <a
              href={VOICE_TECHNOLOGY.consoleUrl}
              className={buttonVariants({ className: "group max-sm:px-4" })}
            >
              <span>Open Studio</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#technology"
              className={buttonVariants({ variant: "secondary", className: "max-sm:px-4" })}
            >
              Explore the platform
            </a>
          </div>

          <p className="mt-4 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
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

      {/* Voice Studio preview */}
      <div
        id="voice-demo"
        ref={cardRef}
        className="relative z-10 mx-4 h-[280px] overflow-hidden rounded-t-3xl bg-surface-card shadow-[0_-24px_80px_-16px_rgba(0,0,0,0.85)] sm:mx-[5%] sm:h-[380px] sm:rounded-t-4xl md:absolute md:bottom-[-24px] md:left-[18%] md:right-[12%] md:top-[65%] md:mx-0 md:h-auto"
      >
        <VoiceStudioDemo />
      </div>
    </section>
  );
};

export default LaserHero;
