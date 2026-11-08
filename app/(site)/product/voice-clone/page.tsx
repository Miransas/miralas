"use client";

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

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
    if (!video || reduce) return;

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
    return () => observer.disconnect();
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
    <main className="overflow-hidden bg-[#EFEFEF] text-[#111111] transition-colors duration-500 dark:bg-[#050505] dark:text-[#F5F5F5]">
      {/* HERO — wide cinematic composition, distinct from the TTS split hero */}
      <section className="relative border-b border-black/[0.06] pb-16 pt-32 dark:border-white/[0.07] sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-300">
                <span className="size-1.5 rounded-full bg-neutral-800 dark:bg-neutral-200" />
                Miransas · Voice Cloning
                <span className="ml-1 rounded-full border border-black/10 px-2 py-0.5 text-[9px] tracking-[0.12em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                  IN DEVELOPMENT
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-neutral-950 dark:text-white">
                A voice has
                <span className="block text-neutral-500 dark:text-neutral-400">a signature.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
                Create a reusable voice identity from a recording you own or are
                explicitly authorized to use. Miransas is developing a voice
                cloning workflow built around consistency, expression and
                permission.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/studio"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#111111] px-6 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-[#080808] dark:hover:bg-neutral-200"
                >
                  Explore Studio
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#voice-clone-workflow"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white/45 px-6 text-sm font-medium text-neutral-700 backdrop-blur transition-colors hover:bg-white/80 dark:border-white/15 dark:bg-white/[0.035] dark:text-neutral-300 dark:hover:bg-white/[0.08]"
                >
                  Explore the workflow
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14 sm:mt-16">
            <div className="relative isolate aspect-[16/9] min-h-[280px] overflow-hidden rounded-[28px] border border-black/10 bg-[#090909] shadow-[0_35px_100px_-45px_rgba(0,0,0,0.38)] dark:border-white/10 dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.85)] sm:aspect-[2.05/1] sm:rounded-[34px]">
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
      <section className="border-b border-black/[0.06] dark:border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-28">
          <Reveal className="max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
              Beyond a recording
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-neutral-950 dark:text-white sm:text-5xl">
              Not just what a voice says. How it sounds.
            </h2>
            <p className="mt-6 text-base leading-8 text-neutral-600 dark:text-neutral-400">
              A voice identity is shaped by more than the words themselves.
              Tone, rhythm and expression all contribute to the character
              people recognize.
            </p>
          </Reveal>

          <div className="divide-y divide-black/10 dark:divide-white/10">
            {voiceTraits.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.07}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-7">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                        {item.number}
                      </span>
                      <Icon className="size-5 text-neutral-500 dark:text-neutral-400 sm:mt-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="voice-clone-workflow" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
              The intended workflow
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-neutral-950 dark:text-white sm:text-5xl">
              From a voice sample to a voice identity.
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400">
              The experience is being developed. These steps describe the
              intended journey, not a claim that every capability is available
              today.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-0 border-y border-black/10 dark:border-white/10 md:grid-cols-3 md:divide-x md:divide-black/10 dark:md:divide-white/10">
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.08} className="h-full">
                  <article className="flex h-full flex-col py-8 md:px-7 md:py-9 first:md:pl-0 last:md:pr-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                        {item.number}
                      </span>
                      <Icon className="size-5 text-neutral-500 dark:text-neutral-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESPONSIBLE VOICE IDENTITY */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-[#F7F7F7] p-7 dark:border-white/[0.08] dark:bg-[#0D0D0D] sm:p-10 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
                    <ShieldCheck className="size-3.5" />
                    Permission comes first
                  </div>
                  <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-neutral-950 dark:text-white sm:text-4xl">
                    A voice is personal. Its use should be, too.
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
                    Voice cloning should only be used with your own voice or
                    with clear permission from the voice owner. Consent and
                    responsible use are central considerations as Miransas
                    develops this experience.
                  </p>
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
                      <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-y border-black/[0.06] dark:border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-24">
          <Reveal className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
              Where it could fit
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] text-neutral-950 dark:text-white sm:text-4xl">
              One voice identity. More ways to create.
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
              Potential directions for creators, teams and products once the
              voice cloning workflow is ready.
            </p>
          </Reveal>

          <div className="divide-y divide-black/10 dark:divide-white/10">
            {useCases.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <div className="grid gap-2 py-6 sm:grid-cols-[190px_1fr] sm:gap-8">
                  <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,0,0,0.055),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.055),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
              Follow the development
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-neutral-950 dark:text-white sm:text-5xl">
              Your voice. Your identity.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
              Voice cloning is in development. Follow Miransas for product
              updates as the experience takes shape.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/resources/changelog"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#111111] px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-[#080808] dark:hover:bg-neutral-200"
              >
                Follow development
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/studio"
                className="inline-flex h-12 items-center rounded-full border border-black/10 bg-white/45 px-6 text-sm font-medium text-neutral-700 transition-colors hover:bg-white/80 dark:border-white/15 dark:bg-white/[0.035] dark:text-neutral-300 dark:hover:bg-white/[0.08]"
              >
                Explore Studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
