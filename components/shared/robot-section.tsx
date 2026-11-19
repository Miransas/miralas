"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, AudioLines, Fingerprint, Radio } from "lucide-react";
import {
  VIEWPORT_EARLY,
  VIEWPORT_ONCE,
  cardReveal,
  eyebrowReveal,
  headingReveal,
  paragraphReveal,
  staggerContainer,
} from "@/lib/motion";

const capabilities = [
  {
    number: "01",
    icon: AudioLines,
    title: "Text-to-speech",
    description:
      "Turn written content into spoken audio. Uzbek is the first language focus, with model training and validation underway.",
    status: "Internal testing",
  },
  {
    number: "02",
    icon: Fingerprint,
    title: "Voice identity",
    description:
      "Build reusable voice profiles from recordings. Consent, ownership and responsible use come first.",
    status: "In development",
  },
  {
    number: "03",
    icon: Radio,
    title: "Conversational voice",
    description:
      "Move beyond generated audio toward speech transformation and voice agents that can respond in real time.",
    status: "In development",
  },
];

export function VoiceLayerSection() {
  const reduceMotion = !!useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      void video.play().catch(() => undefined);
      return;
    }

    let isIntersecting = false;
    const syncPlayback = () => {
      if (isIntersecting && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = Boolean(entry?.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <section className="relative overflow-x-clip bg-[#EFEFEF] py-24 text-[#111111] dark:bg-[#050505] dark:text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Editorial copy and product capabilities */}
          <div className="relative z-10">
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <motion.p variants={eyebrowReveal} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-white/45">
                The Miransas voice layer
              </motion.p>
              <motion.h2 variants={headingReveal} className="mt-5 max-w-[620px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
                From a single voice to a whole conversation.
              </motion.h2>
              <motion.p variants={paragraphReveal} className="mt-6 max-w-xl text-[15px] leading-7 text-neutral-600 dark:text-white/55 md:text-base md:leading-8">
                Miransas brings speech generation, voice identity and conversational
                experiences into one voice-focused platform. Start with spoken
                content, then build toward more natural voice interactions.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_EARLY}
              className="mt-10 border-t border-black/10 dark:border-white/10"
            >
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    variants={cardReveal}
                    className="grid grid-cols-[34px_1fr] gap-4 border-b border-black/10 py-5 dark:border-white/10 sm:grid-cols-[34px_1fr_auto] sm:items-start sm:gap-5"
                  >
                    <span className="pt-0.5 font-mono text-[11px] tabular-nums text-neutral-400 dark:text-white/30">
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 shrink-0 text-neutral-500 dark:text-white/55" strokeWidth={1.7} />
                        <h3 className="text-[15px] font-semibold tracking-[-0.02em] sm:text-base">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-lg text-[13px] leading-6 text-neutral-600 dark:text-white/50 sm:text-sm">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-500 dark:border-white/10 dark:text-white/45 sm:hidden">
                        {item.status}
                      </span>
                    </div>
                    <span className="hidden whitespace-nowrap rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-500 dark:border-white/10 dark:text-white/45 sm:inline-flex">
                      {item.status}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={paragraphReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/product"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#111111] px-6 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-black active:scale-[0.98] dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
              >
                Explore products
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/resources/changelog"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-white/55 dark:hover:text-white"
              >
                Follow development <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* One cinematic visual — clean single-pass entrance */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
            className="relative min-w-0"
          >
            <div className="group relative aspect-[4/4.5] overflow-hidden rounded-[28px] border border-black/10 bg-[#0B0B0D] shadow-[0_28px_90px_-48px_rgba(0,0,0,0.35)] dark:border-white/10 dark:shadow-[0_30px_100px_-48px_rgba(0,0,0,0.8)] sm:aspect-[5/4] lg:aspect-[4/4.5]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                src="/stack-card-1.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Cinematic visualization of the Miransas voice generation experience"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    MIRANSAS / VOICE
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.035em] text-white sm:text-2xl">
                    Sound, shaped by intelligence.
                  </p>
                </div>
                <span className="mb-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md">
                  <AudioLines className="size-[17px]" strokeWidth={1.6} />
                </span>
              </div>
            </div>
            <p className="mt-3 text-right text-[10px] tracking-wide text-neutral-400 dark:text-white/30">
              A look inside the Miransas voice experience
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Keep the old named export temporarily so existing imports do not break.
export { VoiceLayerSection as RobotSection };
export default VoiceLayerSection;
