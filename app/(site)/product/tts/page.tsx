"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Code2,
  Languages,
  Mic2,
  Sparkles,
  Volume2,
} from "lucide-react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className, delay = 0 }: RevealProps) {
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
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
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

const steps = [
  {
    number: "01",
    icon: AudioLines,
    title: "Start with your script",
    description:
      "Bring the words you want to turn into speech. Keep the message clear and shape the text for the way it should be heard.",
  },
  {
    number: "02",
    icon: Mic2,
    title: "Choose a voice",
    description:
      "Select the voice that fits the role and the feeling of your content. Voice availability depends on the current product release.",
  },
  {
    number: "03",
    icon: Volume2,
    title: "Create your audio",
    description:
      "Generate a spoken version of your script and review the result as part of your creative workflow.",
  },
];

const useCases = [
  {
    number: "01",
    title: "Videos & content",
    description: "Create narration for explainers, social videos and educational content.",
  },
  {
    number: "02",
    title: "Products & experiences",
    description: "Bring spoken guidance and audio experiences into digital products.",
  },
  {
    number: "03",
    title: "Developer workflows",
    description: "Explore how generated speech can fit into applications and automated workflows.",
  },
];

export default function TTSPage() {
  const reduce = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#EFEFEF] text-[#111111] transition-colors duration-500 dark:bg-[#050505] dark:text-[#F5F5F5]">
      {/* HERO */}
      <section className="relative isolate min-h-[760px] overflow-hidden border-b border-black/[0.06] dark:border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(255,255,255,0.8),transparent_44%)] dark:bg-[radial-gradient(ellipse_at_72%_38%,rgba(255,255,255,0.07),transparent_44%)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-12">
          <div className="relative z-10 max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-300">
                <span className="size-1.5 rounded-full bg-neutral-800 dark:bg-neutral-200" />
                Miransas · Text to Speech
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-[760px] text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-neutral-950 dark:text-white">
                Words become
                <span className="block text-neutral-500 dark:text-neutral-400">voice.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
                Turn written language into spoken audio with Miransas Text to
                Speech. A focused voice workflow for creators, product teams and
                developers who want their words to be heard.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/studio"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#111111] px-6 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-[#080808] dark:hover:bg-neutral-200"
                >
                  Open Studio
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white/45 px-6 text-sm font-medium text-neutral-700 backdrop-blur transition-colors hover:bg-white/80 dark:border-white/15 dark:bg-white/[0.035] dark:text-neutral-300 dark:hover:bg-white/[0.08]"
                >
                  Explore the process
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:border-white/10 dark:text-neutral-500">
                <span>Written input</span>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span>Voice output</span>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span>Creative control</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/4.25] min-h-[420px] overflow-hidden rounded-[30px] border border-black/10 bg-[#111111] shadow-[0_35px_100px_-45px_rgba(0,0,0,0.38)] dark:border-white/10 dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.85)] sm:aspect-[5/4] lg:aspect-[0.95/1]">
              <CinematicVideo
                src="/stack-card-1.mp4"
                poster="/img/ember.png"
                className="opacity-90"
                objectPosition="center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    The sound of your words
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] text-white/75 backdrop-blur-md">
                    MIRANSAS / TTS
                  </span>
                </div>
                <div className="mt-5 flex h-12 items-center gap-[3px] overflow-hidden" aria-hidden="true">
                  {Array.from({ length: 54 }, (_, i) => {
                    const height = 14 + Math.abs(Math.sin(i * 0.51) * Math.cos(i * 0.19)) * 82;
                    return (
                      <motion.span
                        key={i}
                        className="w-[3px] min-w-[2px] flex-1 rounded-full bg-white/85"
                        style={{ height: `${height}%`, transformOrigin: "center" }}
                        animate={reduce ? { scaleY: 0.8 } : { scaleY: [0.45, 1, 0.62, 0.9, 0.45] }}
                        transition={{
                          duration: 1.25 + (i % 6) * 0.08,
                          delay: i * 0.018,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                  <span>Speech synthesis</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white/80" />
                    Audio visualization
                  </span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-2/3 w-2/3 rounded-[36px] border border-black/[0.06] dark:border-white/[0.07]" />
          </Reveal>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-b border-black/[0.06] dark:border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-6 py-9 sm:grid-cols-3 sm:gap-8 lg:px-12">
          {[
            { icon: AudioLines, title: "Speech from text", text: "Move from a written script to spoken audio." },
            { icon: Sparkles, title: "Made for expression", text: "Think about rhythm, clarity and the way words are heard." },
            { icon: Code2, title: "Built for workflows", text: "A voice capability designed to fit into digital experiences." },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white/65 text-neutral-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-200">
                    <Icon className="size-[18px]" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h2>
                    <p className="mt-1.5 max-w-xs text-sm leading-6 text-neutral-500 dark:text-neutral-500">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">A simple workflow</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.03] tracking-[-0.06em] text-neutral-950 dark:text-white sm:text-5xl">
                From script to speech, in three steps.
              </h2>
              <p className="mt-6 text-base leading-8 text-neutral-600 dark:text-neutral-400">
                A clear process keeps the creative work in your hands. Prepare
                the words, choose an available voice, then create and review
                your audio.
              </p>
              <Link href="/studio" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500 dark:text-white dark:hover:text-neutral-300">
                Try the Studio
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="border-t border-black/10 dark:border-white/10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.number} delay={index * 0.08}>
                    <div className="grid gap-4 border-b border-black/10 py-7 dark:border-white/10 sm:grid-cols-[64px_1fr_1fr] sm:items-start sm:gap-6 sm:py-9">
                      <span className="font-mono text-xs tracking-wider text-neutral-400 dark:text-neutral-600">{step.number}</span>
                      <div>
                        <span className="mb-4 grid size-10 place-items-center rounded-xl border border-black/10 bg-white/65 text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
                          <Icon className="size-[18px]" />
                        </span>
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">{step.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* LANGUAGE FOCUS */}
      <section className="border-y border-black/[0.06] bg-[#F7F7F7] py-24 dark:border-white/[0.07] dark:bg-[#0D0D0D] sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr] lg:gap-24 lg:px-12">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-black/10 bg-[#111111] dark:border-white/10">
              <CinematicVideo src="/stack-card-2.mp4" poster="/img/violet.png" objectPosition="center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                <Languages className="size-3.5" />
                Language-first development
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">A language with a place of its own</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.03] tracking-[-0.06em] text-neutral-950 dark:text-white sm:text-5xl">
              Uzbek is where our work begins.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 dark:text-neutral-400">
              We believe language deserves more than an afterthought. Uzbek is
              Miransas&apos; first language focus, and model training is in
              progress. We will share availability and supported workflows as
              they are ready.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
              <span className="grid size-7 place-items-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <Languages className="size-3.5" />
              </span>
              <span className="font-medium">Uzbek · Model training in progress</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">Where voice fits</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-neutral-950 dark:text-white sm:text-5xl">
              Made for the moments that need a voice.
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-400">
              From a single narration to a feature inside a product, generated
              speech can make information easier to experience.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-0 border-t border-black/10 dark:border-white/10 md:grid-cols-3 md:divide-x md:divide-black/10 dark:md:divide-white/10">
            {useCases.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.07}>
                <div className="h-full border-b border-black/10 py-7 md:border-b-0 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0 dark:border-white/10">
                  <span className="font-mono text-xs tracking-wider text-neutral-400 dark:text-neutral-600">{item.number}</span>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600 dark:text-neutral-400">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#111111] px-7 py-14 text-white sm:px-12 sm:py-20 dark:bg-[#0D0D0D] dark:ring-1 dark:ring-white/10">
            <div className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -right-8 -top-16 size-[290px] rounded-full border border-white/[0.07]" />
            <div className="relative z-10 max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Start creating</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl">
                Give your words a voice.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Explore the Miransas Studio and follow the development of our
                voice generation tools.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studio" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-neutral-200">
                  Open Studio <ArrowUpRight className="size-4" />
                </Link>
                <Link href="/resources/changelog" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/[0.06] hover:text-white">
                  Follow development <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
