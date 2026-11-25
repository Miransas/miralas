"use client";

import { StaggerReveal, RevealCard, RevealParagraph } from "@/components/motion/primitives";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { DURATION_UI, EASE_OUT_EXPO } from "@/lib/motion";
import {
  Activity,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Radio,
  Sparkles,
  Volume2,
} from "lucide-react";

type Phase = "compose" | "thinking" | "reply";

type Scene = {
  id: string;
  label: string;
  prompt: string;
  reply: string;
  status: string;
  chips: string[];
  video: string;
  visualTitle: string;
  visualDescription: string;
  hasWaveform?: boolean;
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

const SCENES: Scene[] = [
  {
    id: "tts",
    label: "Text-to-speech",
    prompt: "Read this intro in a calm, warm voice.",
    reply: "Done. Here is your intro. Want it a little slower?",
    status: "Text-to-speech",
    chips: ["English · internal", "Turkish · internal", "Russian · internal", "Uzbek · in development"],
    video: "/stack-card-1.mp4",
    visualTitle: "Words become voice.",
    visualDescription: "Turn written language into natural-sounding speech.",
    hasWaveform: true,
  },
  {
    id: "clone",
    label: "Voice cloning",
    prompt: "I want a voice that sounds like me for my channel.",
    reply:
      "Start with a voice sample and confirm that you have permission to use it. Voice cloning is being developed with consent at its core.",
    status: "Voice cloning",
    chips: ["In development", "Consent first"],
    video: "/stack-card-3.mp4",
    visualTitle: "A voice with an identity.",
    visualDescription: "Build a reusable voice profile from an authorized recording.",
  },
  {
    id: "sts",
    label: "Speech-to-speech",
    prompt: "Can I record a line and change the voice while keeping my timing?",
    reply:
      "Speech-to-speech is designed to transform vocal character while preserving the delivery. This capability is still in development.",
    status: "Speech-to-speech",
    chips: ["In development"],
    video: "/stack-card-3.mp4",
    visualTitle: "The same delivery. A new voice.",
    visualDescription: "Transform the voice while retaining the original expression.",
  },
  {
    id: "agent",
    label: "Voice agent",
    prompt: "Could a voice agent answer calls for my business?",
    reply:
      "The voice agent is in early development. The goal is to answer in your language, follow your workflow and hand the call to your team when needed.",
    status: "Voice agent",
    chips: ["Early development"],
    video: "/stack-card-2.mp4",
    visualTitle: "Conversations that keep moving.",
    visualDescription: "A voice interface designed to work with your business workflows.",
  },
  {
    id: "uzbek",
    label: "Uzbek voice",
    prompt: "Is Miransas being built for Uzbek?",
    reply:
      "Yes. Uzbek is the first language focus for the voice work. Model training is underway, with progress shared through the product updates.",
    status: "Uzbek voice",
    chips: ["Uzbek · in development"],
    video: "/stack-card-1.mp4",
    visualTitle: "Voice that feels familiar.",
    visualDescription: "A language-first approach to natural Uzbek speech.",
  },
];

const THINK_STEPS = [
  "Understanding the request",
  "Preparing a response",
  "Preparing voice output",
];

const WAVE = Array.from({ length: 36 }, (_, index) => {
  const curve = Math.abs(Math.sin(index * 0.47) * Math.cos(index * 0.19));
  return Math.round(24 + curve * 76);
});

const START_DELAY = 220;
const PROMPT_CHAR_DELAY = 31;
const SEND_PAUSE = 520;
const THINK_DURATION = 1250;
const REPLY_CHAR_DELAY = 25;
const NEXT_SCENE_DELAY = 2400;

function VideoVisual({ scene }: { scene: Scene }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [scene.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    let visible = false;
    const playWhenVisible = () => {
      if (!visible) return;
      void video.play().catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      visible = true;
      playWhenVisible();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) playWhenVisible();
        else video.pause();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [scene.video, videoFailed]);

  return (
    <div className="dark relative isolate min-h-[340px] overflow-hidden rounded-4xl bg-surface-card sm:min-h-[420px] lg:h-full lg:min-h-0">
      {!videoFailed ? (
        <video
          key={scene.video}
          ref={videoRef}
          src={scene.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-surface-card"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-surface-card/15 to-surface-card/90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-card/40 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between p-5 text-white sm:min-h-[420px] sm:p-7 lg:min-h-0">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-card/55 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-text-primary backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-text-heading" />
            Miransas / voice systems
          </div>
          <span className="rounded-full bg-surface-card/50 px-3 py-2 font-mono text-xs text-text-primary backdrop-blur-md">
            0{SCENES.findIndex((item) => item.id === scene.id) + 1} / 0{SCENES.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[440px]"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-text-primary">
              {scene.status}
            </p>
            <h3 className="max-w-[420px] text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-2xl lg:text-[1.75rem]">
              {scene.visualTitle}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-text-primary sm:text-base">
              {scene.visualDescription}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
              Current capability
            </p>
            <p className="mt-1 truncate text-sm font-medium text-white">{scene.label}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-card/55 px-3 py-2 text-xs text-text-primary backdrop-blur-md">
            <Activity className="size-3.5 text-text-heading" />
            Visual preview
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceWaveform({ active }: { active: boolean }) {
  return (
    <div className="mt-4 max-w-[360px] rounded-[18px] bg-surface-page p-4 dark:bg-white/[0.04]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-surface-card text-text-heading dark:bg-white/[0.08]">
            <Volume2 className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-text-heading sm:text-[13px]">Voice response</p>
            <p className="mt-0.5 text-xs text-text-muted">Speech preview · waveform</p>
          </div>
        </div>
        <AudioLines className="size-4 text-text-heading" />
      </div>
      <div
        className="flex h-9 items-center justify-between gap-[3px] overflow-hidden px-0.5"
        aria-label="Animated voice waveform"
      >
        {WAVE.map((height, index) => (
          <motion.span
            key={index}
            className="w-[3px] min-w-[2px] rounded-full bg-surface-elevated dark:bg-[#D1D1D1]"
            style={{ height: `${height}%`, transformOrigin: "center" }}
            animate={active ? { scaleY: [0.38, 1, 0.58, 0.92, 0.38] } : { scaleY: 0.7 }}
            transition={{
              duration: 1.05 + (index % 5) * 0.08,
              delay: index * 0.016,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DemoCarousel() {
  const reduced = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("compose");
  const [typed, setTyped] = useState(0);
  const [chars, setChars] = useState(0);
  const [paused, setPaused] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.08 });

  const scene = SCENES[index];
  const visiblePhase: Phase = reduced ? "reply" : phase;
  const visibleChars = reduced ? scene.reply.length : chars;
  const composerText = !reduced && phase === "compose" ? scene.prompt.slice(0, typed) : "";
  const userMessageVisible = visiblePhase !== "compose";
  const replyFinished = visibleChars >= scene.reply.length;

  const go = useCallback((nextIndex: number) => {
    const next = (nextIndex + SCENES.length) % SCENES.length;
    setIndex(next);
    setPhase("compose");
    setTyped(0);
    setChars(0);
    setThinkingStep(0);
  }, []);

  useEffect(() => {
    if (reduced || paused || !isInView) return;

    const current = SCENES[index];
    if (phase === "compose") {
      if (typed >= current.prompt.length) {
        const timer = window.setTimeout(() => {
          setThinkingStep(0);
          setPhase("thinking");
        }, SEND_PAUSE);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(
        () => setTyped((value) => Math.min(value + 1, current.prompt.length)),
        typed === 0 ? START_DELAY : PROMPT_CHAR_DELAY,
      );
      return () => window.clearTimeout(timer);
    }

    if (phase === "thinking") {
      const timer = window.setTimeout(() => setPhase("reply"), THINK_DURATION);
      return () => window.clearTimeout(timer);
    }

    if (phase === "reply") {
      if (chars >= current.reply.length) {
        const timer = window.setTimeout(() => go(index + 1), NEXT_SCENE_DELAY);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(
        () => setChars((value) => Math.min(value + 1, current.reply.length)),
        REPLY_CHAR_DELAY,
      );
      return () => window.clearTimeout(timer);
    }
  }, [index, phase, typed, chars, reduced, paused, isInView, go]);

  useEffect(() => {
    if (reduced || paused || !isInView || phase !== "thinking") return;
    const interval = window.setInterval(
      () => setThinkingStep((value) => (value + 1) % THINK_STEPS.length),
      760,
    );
    return () => window.clearInterval(interval);
  }, [phase, reduced, paused, isInView]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select")) return;
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    };
    section.addEventListener("keydown", handleKey);
    return () => section.removeEventListener("keydown", handleKey);
  }, [index, go]);

  const controlClass = `inline-flex size-10 items-center justify-center rounded-full bg-surface-card text-text-primary transition duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:bg-surface-card-hover hover:text-text-heading ${FOCUS_RING}`;

  return (
    <section
      id="voice-demo"
      ref={sectionRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Miransas interactive voice demo"
      className="relative isolate overflow-x-clip bg-surface-page py-24 text-text-heading md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <StaggerReveal
          className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1.1fr_0.9fr] md:items-end"
        >
          <RevealCard as="div" >
            <div className="mb-5 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              <span className="size-1.5 rounded-full bg-text-heading" />
              Experience Miransas
            </div>
            <h2 className="max-w-[760px] text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]">
              See how voice becomes <span className="text-text-muted">conversation.</span>
            </h2>
          </RevealCard>
          <RevealParagraph as="p"
            className="max-w-[440px] text-[15px] leading-[1.6] text-text-muted sm:text-base md:justify-self-end"
          >
            Explore the ideas behind the Miransas voice platform. Switch between
            capabilities and watch a guided product preview move from a written
            request to a voice response.
          </RevealParagraph>
        </StaggerReveal>

        {/* Main demo surface — Strategic Violet Gradient focal container */}
        <RevealCard
          className="bg-surface-card surface-shadow-lg overflow-hidden rounded-4xl"
        >
          <div className="grid lg:min-h-[660px] lg:grid-cols-[1.02fr_0.98fr]">
            {/* Conversation panel */}
            <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-9">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-[15px] bg-surface-page text-text-heading dark:bg-white/[0.07]">
                    <AudioLines className="size-[19px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-text-heading">
                        Miransas AI
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-text-heading dark:bg-surface-elevated dark:text-text-primary">
                        <span className="size-1.5 rounded-full bg-text-heading" />
                        Interactive preview
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-text-muted sm:text-[13px]">
                      A guided conversation flow
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-surface-page px-3 py-1.5 font-mono text-xs text-text-muted dark:bg-white/[0.06]">
                  {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                </span>
              </div>

              <div
                className="mt-7 flex min-h-[330px] flex-1 flex-col gap-5"
                aria-live="polite"
                aria-atomic="false"
              >
                <AnimatePresence mode="wait">
                  {userMessageVisible && (
                    <motion.div
                      key={`user-${scene.id}`}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-end justify-end gap-3"
                    >
                      <div className="max-w-[86%]">
                        <p className="mb-1.5 pr-1 text-right text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                          You
                        </p>
                        <div className="rounded-[20px] rounded-br-md bg-surface-page px-4 py-3 text-[15px] leading-[1.6] text-text-primary dark:bg-white/[0.06]">
                          {scene.prompt}
                        </div>
                      </div>
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-page text-[10px] font-semibold tracking-[0.12em] text-text-muted dark:bg-white/[0.06]">
                        YOU
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {(visiblePhase === "thinking" || visiblePhase === "reply") && (
                  <motion.div
                    key={`assistant-${scene.id}`}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-text-heading text-surface-page">
                      <AudioLines className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-text-heading">Miransas</span>
                        <span className="text-xs text-text-muted">Voice assistant</span>
                        {visiblePhase === "reply" && replyFinished && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-text-heading dark:bg-surface-elevated dark:text-text-primary">
                            <Check className="size-3" />
                            Ready
                          </span>
                        )}
                      </div>

                      {visiblePhase === "thinking" ? (
                        <motion.div
                          key="thinking-state"
                          initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="max-w-[95%] rounded-[19px] rounded-tl-md bg-surface-page p-4 dark:bg-white/[0.04]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-surface-card text-text-heading dark:bg-white/[0.08]">
                              <Sparkles className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-text-heading">
                                {THINK_STEPS[thinkingStep]}
                              </p>
                              <p className="mt-0.5 text-xs text-text-muted">
                                Preparing the voice response
                              </p>
                            </div>
                            <div className="flex items-center gap-1" aria-label="Processing">
                              {[0, 1, 2].map((dot) => (
                                <motion.span
                                  key={dot}
                                  className="size-1.5 rounded-full bg-text-heading"
                                  animate={
                                    reduced
                                      ? { opacity: 1 }
                                      : { opacity: [0.25, 1, 0.25], y: [0, -2, 0] }
                                  }
                                  transition={{
                                    duration: 0.9,
                                    delay: dot * 0.13,
                                    repeat: reduced ? 0 : Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                            <motion.div
                              className="h-full w-full origin-left rounded-full bg-text-heading"
                              initial={{ scaleX: 0.08 }}
                              animate={reduced ? { scaleX: 1 } : { scaleX: [0.12, 0.54, 0.88] }}
                              transition={{ duration: THINK_DURATION / 1000, ease: "easeInOut" }}
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <div className="max-w-[98%]">
                          <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-text-primary sm:text-base">
                            {scene.reply.slice(0, visibleChars)}
                            {!replyFinished && !reduced && isInView && (
                              <motion.span
                                aria-hidden="true"
                                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-text-heading"
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </p>
                          {scene.hasWaveform && replyFinished && (
                            <VoiceWaveform active={isInView && !reduced && !paused} />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Composer preview */}
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-[18px] bg-surface-page px-3.5 py-2.5 dark:bg-white/[0.04]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-surface-card text-text-muted dark:bg-white/[0.07]">
                    <AudioLines className="size-4" />
                  </span>
                  <span className="min-h-6 min-w-0 flex-1 truncate text-xs leading-6 text-text-primary sm:text-[13px]">
                    {composerText ||
                      (phase === "compose" && !reduced
                        ? "Preparing your message…"
                        : "Message preview complete")}
                    {composerText && !reduced && (
                      <motion.span
                        aria-hidden="true"
                        className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] rounded-full bg-text-heading"
                        animate={{ opacity: [1, 0.15, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-text-heading text-surface-page">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="size-3.5" />
                    Text and voice in one interface
                  </span>
                  <span>Illustrative product preview</span>
                </div>
              </div>
            </div>

            {/* Video / capability panel */}
            <div className="min-w-0 bg-surface-page/55 p-3 dark:bg-[#050505]/50 sm:p-4 lg:p-4">
              <VideoVisual scene={scene} />
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4 sm:px-3">
                <div className="flex flex-wrap gap-1.5">
                  {scene.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-surface-card px-3 py-1.5 text-xs font-medium text-text-muted dark:bg-white/[0.05]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs tracking-[0.12em] text-text-muted">
                  MIRANSAS / AI
                </span>
              </div>
            </div>
          </div>
        </RevealCard>

        {/* Scene navigation */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous demo scene"
              className={controlClass}
              onClick={() => go(index - 1)}
            >
              <ChevronLeft className="size-[17px]" />
            </button>
            <div
              className="flex items-center gap-1.5 rounded-full bg-surface-card px-3.5 py-3"
              aria-label="Choose a demo scene"
            >
              {SCENES.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.label}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => go(itemIndex)}
                  className={`h-1.5 rounded-full transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-(--motion-interaction-duration) ${FOCUS_RING} ${
                    itemIndex === index
                      ? "w-7 bg-text-heading"
                      : "w-1.5 bg-text-muted/40 hover:bg-text-primary"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next demo scene"
              className={controlClass}
              onClick={() => go(index + 1)}
            >
              <ChevronRight className="size-[17px]" />
            </button>
            {!reduced && (
              <button
                type="button"
                aria-label={paused ? "Resume demo" : "Pause demo"}
                aria-pressed={paused}
                className={`${controlClass} ${
                  paused ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-white" : ""
                }`}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-text-muted sm:text-[13px]">
            <span className="font-mono uppercase tracking-[0.12em]">Now viewing</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-text-heading"
              >
                {scene.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive capability tabs with layoutId pill */}
        <div
          role="tablist"
          aria-label="Voice capabilities"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 pt-2 md:mt-12"
        >
          {SCENES.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => go(itemIndex)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-(--motion-interaction-duration) ${FOCUS_RING} ${
                  active
                    ? "text-surface-page"
                    : "text-text-muted hover:text-text-heading"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-capability-pill"
                    transition={{ duration: DURATION_UI, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 -z-10 rounded-full bg-text-heading"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
