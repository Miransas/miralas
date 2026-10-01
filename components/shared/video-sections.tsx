/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reval";

export function VideoSections() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="bg-background">
        <div className="px-4 py-6 md:p-[100px]">
          <VideoFrame className="aspect-video overflow-hidden rounded-2xl md:rounded-3xl border border-border" />
        </div>
        <CardRow />
      </section>
    );
  }

  return (
    <section className="bg-background">
      <PinnedVideo />
      <CardRow />
    </section>
  );
}

function PinnedVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [maxInset, setMaxInset] = useState(100);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMaxInset(mq.matches ? 100 : 16);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const inset = useTransform(scrollYProgress, [0, 1], [0, maxInset]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.4]);

  return (
    <div ref={ref} className="relative h-[170vh] md:h-[150vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-background">
        <motion.div
          style={{
            position: "absolute",
            top: inset,
            right: inset,
            bottom: inset,
            left: inset,
            borderRadius: radius,
            opacity,
          }}
          className="overflow-hidden bg-card border border-border shadow-2xl"
        >
          <motion.div style={{ scale }} className="h-full w-full">
            <VideoFrame className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function VideoFrame({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const src = "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787512184/229254_medium_qc3ckw.mp4";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src.endsWith(src)) el.src = src;
          setActive(true);
          void el.play().catch(() => {});
        } else {
          el.pause();
          setActive(false);
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) {
    return (
      <img
        src="/media/studio.jpg"
        alt="Studio background"
        width={1280}
        height={720}
        decoding="async"
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={`object-cover ${className ?? ""}`}
      muted
      loop
      playsInline
      preload="none"
      poster="/media/studio.jpg"
      width={1280}
      height={720}
      src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1787512184/229254_medium_qc3ckw.mp4"
      disablePictureInPicture
      disableRemotePlayback
      aria-label="Miralas platform preview video"
      aria-hidden={!active}
    />
  );
}

function CardRow() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity: cardOpacity }}
      className="bg-background px-5 pb-24 pt-6 md:px-8 md:pb-32 md:pt-10 max-w-7xl mx-auto"
    >
      <div className="grid max-w-full gap-6 md:grid-cols-3">
        {VIDEO_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <article className="h-full rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-border/80">
              <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {card.kicker}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </motion.div>
  );
}

export const VIDEO_CARDS = [
  {
    kicker: "01",
    title: "High-Fidelity Voice Cloning",
    body: "Upload a brief audio sample to replicate your exact vocal identity—timbre, pitch, and accent. Maintain consistent brand voice across marketing campaigns, e-learning platforms, and podcasts.",
    badge: "Neural Cloning",
    metrics: "99.2% Similarity Score"
  },
  {
    kicker: "02",
    title: "Ultra-Low Latency Speech Generation",
    body: "Convert complex text to natural audio streams in milliseconds. Engine-optimized for native phonetics, regional cadence, and emotional inflection without robotic pauses.",
    badge: "Streaming TTS",
    metrics: "<150ms Latency"
  },
  {
    kicker: "03",
    title: "Conversational AI Voice Layer",
    body: "Upgrade text-only chatbots into real-time voice agents. Delivers expressive, studio-quality speech output that mimics natural human back-and-forth interaction.",
    badge: "Interactive Voice",
    metrics: "24kHz HD Audio"
  },
] as const;
