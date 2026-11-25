"use client";

import { StaggerReveal, RevealHeading, RevealParagraph, SectionReveal } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal as Reveal } from "@/components/motion/reveal";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  Check,
  Fingerprint,
  Mic2,
  Radio,
  ShieldCheck,
  Waves,
} from "lucide-react";

function CinematicVideo({
  src,
  poster,
  className = "",
  objectPosition = "center",
}: {
  src: string;
  poster: string;
  className?: string;
  objectPosition?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) { video.pause(); return; }

    if (!("IntersectionObserver" in window)) {
      video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [reduce]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition }}
    />
  );
}

const voiceTraits = [
  {
    number: "01",
    icon: Waves,
    title: "Tone & texture",
    description:
      "The qualities that make a voice recognizable, from its warmth to its overall texture.",
  },
  {
    number: "02",
    icon: AudioLines,
    title: "Rhythm & expression",
    description:
      "The pace, pauses and emphasis that help spoken words feel more natural.",
  },
  {
    number: "03",
    icon: Fingerprint,
    title: "A consistent identity",
    description:
      "A reusable voice profile designed to keep a recognizable character across generated speech.",
  },
];

const workflow = [
  {
    number: "01",
    icon: Mic2,
    title: "Provide an authorized sample",
    description:
      "Start with a clear recording of your own voice, or a voice you have explicit permission to use.",
  },
  {
    number: "02",
    icon: AudioLines,
    title: "Build a voice profile",
    description:
      "The intended workflow is to shape a reusable voice identity from the recording's distinctive qualities.",
  },
  {
    number: "03",
    icon: Radio,
    title: "Create new speech",
    description:
      "Use the profile as the basis for new spoken content while keeping voice ownership and permission in view.",
  },
];

const useCases = [
  {
    title: "Creator narration",
    description: "Keep a consistent voice across videos, explainers and recurring content.",
  },
  {
    title: "Localized content",
    description: "Explore how a familiar voice identity could carry content into more languages.",
  },
  {
    title: "Product experiences",
    description: "Give a product or service a recognizable spoken identity.",
  },
];

const WAVEFORM = Array.from({ length: 68 }, (_, index) => {
  const shape = Math.abs(Math.sin(index * 0.43) * Math.cos(index * 0.17));
  return Math.round(16 + shape * 84);
});

export default function VoiceClonePage() {
  const reduce = useReducedMotion();

  return (
    <main className="overflow-hidden bg-surface-page text-text-heading transition-colors duration-500">
      {/* HERO — wide cinematic composition, distinct from the TTS split hero */}
      <section className="relative border-b border-black/[0.06] pb-16 pt-32 dark:border-white/[0.07] sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal trigger="load">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-300">
                <span className="size-1.5 rounded-full bg-neutral-800 dark:bg-neutral-200" />
                Miransas · Voice Cloning
                <span className="ml-1 rounded-full border border-black/10 px-2 py-0.5 text-[9px] tracking-[0.12em] text-text-muted dark:border-white/10 dark:text-neutral-400">
                  IN DEVELOPMENT
                </span>
              </div>
            </Reveal>

            <StaggerReveal trigger="load" delay={0.08}>
              <RevealHeading as="h1" className="mt-7 text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-text-heading">
                A voice has
                <span className="block text-text-muted">a signature.</span>
              </RevealHeading>
            </StaggerReveal>

            <Reveal trigger="load" delay={0.16}>
              <RevealParagraph className="mx-auto mt-7 max-w-2xl text-base leading-8 text-text-primary sm:text-lg">
                Create a reusable voice identity from a recording you own or are
                explicitly authorized to use. Miransas is developing a voice
                cloning workflow built around consistency, expression and
                permission.
              </RevealParagraph>
            </Reveal>

            <Reveal trigger="load" delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="https://console.miralas.io"
                  className={buttonVariants({ className: "group" })}
                >
                  View Console access
                  <ArrowUpRight className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#voice-clone-workflow"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Explore the workflow
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal trigger="load" delay={0.12} className="mt-14 sm:mt-16">
            <div className="relative isolate aspect-[16/9] min-h-[280px] overflow-hidden rounded-4xl border border-black/10 bg-[#090909] shadow-[0_35px_100px_-45px_rgba(0,0,0,0.38)] dark:border-white/10 dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.85)] sm:aspect-[2.05/1] sm:rounded-4xl">
              <CinematicVideo
                src="/voice-clone.mp4"
                poster="/img/violet.png"
                className="opacity-90"
                objectPosition="center 48%"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                      Voice identity · Visual study
                    </p>
                    <p className="mt-2 max-w-xl text-xl font-medium tracking-tight sm:text-2xl lg:text-3xl">
                      Recognizable character. Reusable expression.
                    </p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-[10px] font-medium tracking-[0.16em] text-white/70 backdrop-blur-md">
                    MIRANSAS / VOICE CLONE
                  </span>
                </div>
                <div className="mt-6 flex h-10 items-center gap-[3px] overflow-hidden" aria-hidden="true">
                  {WAVEFORM.map((height, index) => (
                    <motion.span
                      key={index}
                      className="min-w-[2px] flex-1 rounded-full bg-white/80"
                      style={{ height: `${height}%`, transformOrigin: "center" }}
                      animate={reduce ? { scaleY: 0.78 } : { scaleY: [0.42, 1, 0.58, 0.9, 0.42] }}
                      transition={{
                        duration: 1.35 + (index % 7) * 0.08,
                        delay: index * 0.012,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VOICE IDENTITY */}
      <SectionReveal className="border-b border-black/[0.06] dark:border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-28">
          <StaggerReveal className="max-w-xl">
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Beyond a recording
            </RevealParagraph>
            <RevealHeading className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-text-heading sm:text-5xl">
              Not just what a voice says. How it sounds.
            </RevealHeading>
            <RevealParagraph className="mt-6 text-base leading-8 text-text-primary">
              A voice identity is shaped by more than the words themselves.
              Tone, rhythm and expression all contribute to the character
              people recognize.
            </RevealParagraph>
          </StaggerReveal>

          <div className="divide-y divide-black/10 dark:divide-white/10">
            {voiceTraits.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.07}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-7">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="font-mono text-xs text-text-muted">
                        {item.number}
                      </span>
                      <Icon className="size-5 text-text-muted sm:mt-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <RevealHeading as="h3" className="text-xl font-medium tracking-tight text-text-heading sm:text-2xl">
                        {item.title}
                      </RevealHeading>
                      <RevealParagraph className="mt-2 max-w-2xl text-sm leading-7 text-text-primary sm:text-base">
                        {item.description}
                      </RevealParagraph>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      {/* WORKFLOW */}
      <SectionReveal id="voice-clone-workflow" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
          <StaggerReveal className="max-w-2xl">
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              The intended workflow
            </RevealParagraph>
            <RevealHeading className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-text-heading sm:text-5xl">
              From a voice sample to a voice identity.
            </RevealHeading>
            <RevealParagraph className="mt-5 text-base leading-8 text-text-primary">
              The experience is being developed. These steps describe the
              intended journey, not a claim that every capability is available
              today.
            </RevealParagraph>
          </StaggerReveal>

          <div className="mt-14 grid gap-0 border-y border-black/10 dark:border-white/10 md:grid-cols-3 md:divide-x md:divide-black/10 dark:md:divide-white/10">
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.08} className="h-full">
                  <article className="flex h-full flex-col py-8 md:px-7 md:py-9 first:md:pl-0 last:md:pr-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-text-muted">
                        {item.number}
                      </span>
                      <Icon className="size-5 text-text-muted" strokeWidth={1.5} />
                    </div>
                    <RevealHeading as="h3" className="mt-8 text-xl font-medium tracking-tight text-text-heading">
                      {item.title}
                    </RevealHeading>
                    <RevealParagraph className="mt-3 text-sm leading-7 text-text-primary">
                      {item.description}
                    </RevealParagraph>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      {/* RESPONSIBLE VOICE IDENTITY */}
      <SectionReveal className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl border border-black/[0.06] bg-surface-card p-7 dark:border-white/[0.08] dark:bg-surface-card sm:p-10 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
                    <ShieldCheck className="size-3.5" />
                    Permission comes first
                  </div>
                  <RevealHeading className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-text-heading sm:text-4xl">
                    A voice is personal. Its use should be, too.
                  </RevealHeading>
                  <RevealParagraph className="mt-5 max-w-xl text-sm leading-7 text-text-primary sm:text-base">
                    Voice cloning should only be used with your own voice or
                    with clear permission from the voice owner. Consent and
                    responsible use are central considerations as Miransas
                    develops this experience.
                  </RevealParagraph>
                </div>

                <div className="space-y-4">
                  {[
                    "Use recordings you own or are authorized to use.",
                    "Be clear about who the voice belongs to.",
                    "Use generated speech responsibly and transparently.",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3 border-b border-black/10 pb-4 last:border-0 last:pb-0 dark:border-white/10">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.06]">
                        <Check className="size-3.5 text-neutral-700 dark:text-neutral-200" />
                      </span>
                      <p className="text-sm leading-6 text-text-primary">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionReveal>

      {/* USE CASES */}
      <SectionReveal className="border-y border-black/[0.06] dark:border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-24">
          <StaggerReveal className="max-w-md">
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Where it could fit
            </RevealParagraph>
            <RevealHeading className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-text-heading sm:text-4xl">
              One voice identity. More ways to create.
            </RevealHeading>
            <RevealParagraph className="mt-5 text-sm leading-7 text-text-primary sm:text-base">
              Potential directions for creators, teams and products once the
              voice cloning workflow is ready.
            </RevealParagraph>
          </StaggerReveal>

          <div className="divide-y divide-black/10 dark:divide-white/10">
            {useCases.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <div className="grid gap-2 py-6 sm:grid-cols-[190px_1fr] sm:gap-8">
                  <RevealHeading as="h3" className="text-base font-medium text-text-heading">
                    {item.title}
                  </RevealHeading>
                  <RevealParagraph className="text-sm leading-7 text-text-primary">
                    {item.description}
                  </RevealParagraph>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* FINAL CTA */}
      <SectionReveal className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,0,0,0.055),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.055),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <StaggerReveal>
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Follow the development
            </RevealParagraph>
            <RevealHeading className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-text-heading sm:text-5xl">
              Your voice. Your identity.
            </RevealHeading>
            <RevealParagraph className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-primary sm:text-base">
              Voice cloning is in development. Follow Miransas for product
              updates as the experience takes shape.
            </RevealParagraph>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/resources/changelog"
                className={buttonVariants({ className: "group" })}
              >
                Follow development
                <ArrowUpRight className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://console.miralas.io"
                className="inline-flex h-12 items-center rounded-full border border-black/10 bg-white/45 px-6 text-sm font-medium text-neutral-700 transition-colors hover:bg-white/80 dark:border-white/15 dark:bg-white/[0.035] dark:text-neutral-300 dark:hover:bg-white/[0.08]"
              >
                View Console access
              </Link>
            </div>
          </StaggerReveal>
        </div>
      </SectionReveal>
    </main>
  );
}
