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

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2";

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
    <section className="relative overflow-x-clip bg-surface-page py-24 text-text-heading md:py-32">
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
              <motion.p
                variants={eyebrowReveal}
                className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
              >
                The Miransas voice layer
              </motion.p>
              <motion.h2
                variants={headingReveal}
                className="mt-5 max-w-[620px] text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
              >
                From a single voice to a whole conversation.
              </motion.h2>
              <motion.p
                variants={paragraphReveal}
                className="mt-6 max-w-xl text-[15px] leading-[1.6] text-text-muted sm:text-base"
              >
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
              className="mt-10 flex flex-col gap-3"
            >
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    variants={cardReveal}
                    className="group relative grid grid-cols-[34px_1fr] gap-4 overflow-hidden rounded-[22px] bg-surface-card p-5 transition-colors duration-300 hover:bg-surface-card-hover sm:grid-cols-[34px_1fr_auto] sm:items-start sm:gap-5"
                  >
                    <div
                      aria-hidden="true"
                      className="surface-hover-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="relative z-10 pt-0.5 font-mono text-xs tabular-nums text-text-muted">
                      {item.number}
                    </span>
                    <div className="relative z-10 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 shrink-0 text-[#7c3aed]" strokeWidth={1.7} />
                        <h3 className="text-base font-semibold tracking-[-0.02em] text-text-heading sm:text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-lg text-[15px] leading-[1.6] text-text-muted">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex rounded-full bg-surface-page px-3 py-1 text-xs font-medium text-text-muted dark:bg-white/[0.06] sm:hidden">
                        {item.status}
                      </span>
                    </div>
                    <span className="relative z-10 hidden whitespace-nowrap rounded-full bg-surface-page px-3 py-1 text-xs font-medium text-text-muted dark:bg-white/[0.06] sm:inline-flex">
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
                className={`group inline-flex h-12 items-center gap-3 rounded-full bg-text-heading px-6 text-sm font-semibold text-surface-page transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
              >
                Explore products
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/resources/changelog"
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:text-text-heading ${FOCUS_RING}`}
              >
                Follow development <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* One cinematic visual — borderless elevated surface */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
            className="relative min-w-0"
          >
            <div className="group surface-shadow-lg relative aspect-[4/4.5] overflow-hidden rounded-[28px] bg-[#000103] sm:aspect-[5/4] lg:aspect-[4/4.5]">
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
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000103]/85 via-[#000103]/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#D1D1D1]">
                    Miransas / Voice
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-2xl">
                    Sound, shaped by intelligence.
                  </p>
                </div>
                <span className="mb-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.12] text-white backdrop-blur-md">
                  <AudioLines className="size-[17px]" strokeWidth={1.6} />
                </span>
              </div>
            </div>
            <p className="mt-3 text-right text-xs leading-[1.45] text-text-muted sm:text-[13px]">
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
