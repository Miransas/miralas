"use client";

import { RevealHeading, RevealParagraph, Reveal } from "@/components/motion/primitives";
import Link from "next/link";

import { Play } from "lucide-react";
import { ShaderAnimation } from "./shader-hero";
import { GlowButton } from "../ui/glow-button";
import { HERO_CONTENT } from "@/constants/hero";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

export default function HeroSection() {
  return (
    <section className="dark relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-[#050505] pb-20 pt-16 text-white">
      {/* Shader background and readability mask */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 px-6 lg:px-12">
        {/* Main heading and actions */}
        <div className="max-w-5xl pt-8">
          <RevealHeading trigger="load" as="h1"
            className="text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            {HERO_CONTENT.title}{" "}
            <br />
            <span className="font-semibold text-text-primary">
              {HERO_CONTENT.titleItalic}
            </span>
          </RevealHeading>

          <RevealParagraph trigger="load"
            className="mt-6 max-w-2xl text-base leading-[1.6] text-text-primary sm:text-lg lg:text-[1.1875rem]"
          >
            {HERO_CONTENT.description}
          </RevealParagraph>

          <Reveal trigger="load"
            className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <Link href={HERO_CONTENT.primaryCtaHref} className={FOCUS_RING}>
              <GlowButton className="w-full sm:w-auto">
                {HERO_CONTENT.primaryCta}
              </GlowButton>
            </Link>

            <Link
              href={HERO_CONTENT.secondaryCtaHref}
              className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-white/[0.06] px-5 py-3 text-sm font-medium text-text-primary backdrop-blur-md transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-(--motion-interaction-duration) hover:bg-white/[0.12] hover:text-white ${FOCUS_RING}`}
            >
              <Play className="size-4 fill-white/20 transition-transform group-hover:scale-110" />
              <span>{HERO_CONTENT.secondaryCta}</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
