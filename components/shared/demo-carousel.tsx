"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
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

/**
 * Keep these asset paths in /public. The three existing stack-card videos are
 * reused as cinematic visual material; no extra image or shader dependency is
 * required for this section.
 */
const SCENES: Scene[] = [
  {
    id: "tts",
    label: "Text-to-speech",
    prompt: "Read this intro in a calm, warm voice.",
    reply: "Done. Here is your intro. Want it a little slower?",
    status: "Text-to-speech",
    chips: ["English · internal", "Turkish · internal", "Russian · internal", "Uzbek · training"],
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
    chips: ["Uzbek · training"],
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
      void video.play().catch(() => {
        // Autoplay can be blocked by browser policy; controls are intentionally
        // omitted because this is decorative background media.
      });
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
    <div className="relative isolate min-h-[340px] overflow-hidden rounded-[24px] bg-[#080808] sm:min-h-[420px] lg:min-h-0 lg:h-full">
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
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_38%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(135deg,#171717,#050505_72%)]"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between p-5 text-white sm:min-h-[420px] sm:p-7 lg:min-h-0">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.17em] text-white/80 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-white" />
            Miransas / voice systems
          </div>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-2 font-mono text-[10px] text-white/65 backdrop-blur-md">
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
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
              {scene.status}
            </p>
            <h3 className="max-w-[420px] text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.03] tracking-[-0.055em]">
              {scene.visualTitle}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65 sm:text-[15px]">
              {scene.visualDescription}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
              Current capability
            </p>
            <p className="mt-1 truncate text-sm font-medium text-white/90">{scene.label}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] text-white/75 backdrop-blur-md">
            <Activity className="size-3.5" />
            Visual preview
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceWaveform({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-4 max-w-[360px] rounded-[18px] border border-black/[0.07] bg-[#F5F5F4] p-4 dark:border-white/10 dark:bg-white/[0.035]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-white text-neutral-800 shadow-sm dark:bg-white/10 dark:text-white">
            <Volume2 className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">Voice response</p>
            <p className="mt-0.5 text-[10px] text-neutral-500 dark:text-white/45">Speech preview · waveform</p>
          </div>
        </div>
        <AudioLines className="size-4 text-neutral-500 dark:text-white/55" />
      </div>
      <div className="flex h-9 items-center justify-between gap-[3px] overflow-hidden px-0.5" aria-label="Animated voice waveform">
        {WAVE.map((height, index) => (
          <motion.span
            key={index}
            className="w-[3px] min-w-[2px] rounded-full bg-neutral-500 dark:bg-white/75"
            style={{ height: `${height}%`, transformOrigin: "center" }}
            animate={reduced ? { scaleY: 0.7 } : { scaleY: [0.38, 1, 0.58, 0.92, 0.38] }}
            transition={{
              duration: 1.05 + (index % 5) * 0.08,
              delay: index * 0.016,
              repeat: reduced ? 0 : Infinity,
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
    if (reduced || paused) return;

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
  }, [index, phase, typed, chars, reduced, paused]);

  useEffect(() => {
    if (reduced || paused || phase !== "thinking") return;
    const interval = window.setInterval(
      () => setThinkingStep((value) => (value + 1) % THINK_STEPS.length),
      760,
    );
    return () => window.clearInterval(interval);
  }, [phase, reduced, paused]);

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

  const controlClass =
    "inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 dark:border-white/10 dark:bg-[#111113] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.07]";

  return (
    <section
      id="voice-demo"
      ref={sectionRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Miransas interactive voice demo"
      className="relative isolate overflow-hidden bg-[#EFEFEF] py-24 text-[#111111] transition-colors duration-500 selection:bg-neutral-900 selection:text-white dark:bg-[#050505] dark:text-white dark:selection:bg-white dark:selection:text-black md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1.1fr_0.9fr] md:items-end"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-white/45">
              <span className="h-px w-7 bg-neutral-400 dark:bg-white/35" />
              Experience Miransas
            </div>
            <h2 className="max-w-[760px] text-[clamp(36px,5.5vw,68px)] font-medium leading-[0.98] tracking-[-0.06em]">
              See how voice becomes <span className="text-neutral-400 dark:text-white/40">conversation.</span>
            </h2>
          </div>
          <p className="max-w-[440px] text-sm leading-7 text-neutral-600 dark:text-white/50 md:justify-self-end md:text-[15px]">
            Explore the ideas behind the Miransas voice platform. Switch between
            capabilities and watch a guided product preview move from a written
            request to a voice response.
          </p>
        </motion.div>

        {/* Main demo surface */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26, scale: 0.99 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_24px_80px_-48px_rgba(0,0,0,0.24)] dark:border-white/[0.09] dark:bg-[#0B0B0C] dark:shadow-[0_28px_90px_-48px_rgba(0,0,0,0.85)] md:rounded-[34px]"
        >
          <div className="grid lg:min-h-[660px] lg:grid-cols-[1.02fr_0.98fr]">
            {/* Conversation panel */}
            <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-9">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-[15px] border border-black/10 bg-[#F3F3F2] text-neutral-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
                    <AudioLines className="size-[19px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold tracking-tight">Miransas AI</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/15 bg-emerald-600/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.07] dark:text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Interactive preview
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-white/40">
                      A guided conversation flow
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-black/[0.07] px-3 py-1.5 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:text-white/40">
                  {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="my-6 h-px bg-neutral-200 dark:bg-white/10" />

              <div className="flex min-h-[330px] flex-1 flex-col gap-5" aria-live="polite" aria-atomic="false">
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
                        <p className="mb-1.5 pr-1 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400 dark:text-white/35">
                          You
                        </p>
                        <div className="rounded-[20px] rounded-br-md border border-black/[0.06] bg-[#F2F2F0] px-4 py-3 text-[13px] leading-6 text-neutral-800 dark:border-white/[0.07] dark:bg-white/[0.055] dark:text-white/85 sm:text-sm">
                          {scene.prompt}
                        </div>
                      </div>
                      <div className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[9px] font-semibold tracking-[0.12em] text-neutral-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65">
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
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#111111] text-white dark:bg-white dark:text-[#090909]">
                      <AudioLines className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold">Miransas</span>
                        <span className="text-[10px] text-neutral-400 dark:text-white/35">Voice assistant</span>
                        {visiblePhase === "reply" && replyFinished && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/[0.06] px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-400/[0.07] dark:text-emerald-300">
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
                          className="max-w-[95%] rounded-[19px] rounded-tl-md border border-black/[0.07] bg-[#F7F7F5] p-4 dark:border-white/10 dark:bg-white/[0.035]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-neutral-700 dark:bg-white/[0.08] dark:text-white">
                              <Sparkles className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">{THINK_STEPS[thinkingStep]}</p>
                              <p className="mt-0.5 text-xs text-neutral-500 dark:text-white/40">
                                Preparing the voice response
                              </p>
                            </div>
                            <div className="flex items-center gap-1" aria-label="Processing">
                              {[0, 1, 2].map((dot) => (
                                <motion.span
                                  key={dot}
                                  className="size-1.5 rounded-full bg-neutral-500 dark:bg-white/70"
                                  animate={reduced ? { opacity: 1 } : { opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                                  transition={{ duration: 0.9, delay: dot * 0.13, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-neutral-700 dark:bg-white/75"
                              initial={{ width: "7%" }}
                              animate={reduced ? { width: "100%" } : { width: ["12%", "54%", "88%"] }}
                              transition={{ duration: THINK_DURATION / 1000, ease: "easeInOut" }}
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <div className="max-w-[98%]">
                          <p className="whitespace-pre-wrap text-[13px] leading-[1.8] text-neutral-700 dark:text-white/80 sm:text-sm">
                            {scene.reply.slice(0, visibleChars)}
                            {!replyFinished && !reduced && (
                              <motion.span
                                aria-hidden="true"
                                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-neutral-700 dark:bg-white"
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </p>
                          {scene.hasWaveform && replyFinished && <VoiceWaveform reduced={reduced} />}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Composer preview */}
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-[18px] border border-black/10 bg-[#FAFAF9] px-3 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.025)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-neutral-600 dark:bg-white/[0.07] dark:text-white/70">
                    <AudioLines className="size-4" />
                  </span>
                  <span className="min-h-6 min-w-0 flex-1 truncate text-[12px] leading-6 text-neutral-600 dark:text-white/65 sm:text-[13px]">
                    {composerText || (phase === "compose" && !reduced ? "Preparing your message…" : "Message preview complete")}
                    {composerText && !reduced && (
                      <motion.span
                        aria-hidden="true"
                        className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] rounded-full bg-neutral-700 dark:bg-white"
                        animate={{ opacity: [1, 0.15, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#111111] text-white dark:bg-white dark:text-[#080808]">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-neutral-400 dark:text-white/35 sm:text-[11px]">
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="size-3.5" />
                    Text and voice in one interface
                  </span>
                  <span>Illustrative product preview</span>
                </div>
              </div>
            </div>

            {/* Video / capability panel */}
            <div className="min-w-0 border-t border-black/[0.07] bg-[#F5F5F3] p-3 dark:border-white/[0.08] dark:bg-[#080808] sm:p-4 lg:border-l lg:border-t-0 lg:p-4">
              <VideoVisual scene={scene} />
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4 sm:px-3">
                <div className="flex flex-wrap gap-1.5">
                  {scene.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-black/[0.08] bg-white/80 px-2.5 py-1.5 text-[9px] font-medium text-neutral-500 dark:border-white/10 dark:bg-white/[0.045] dark:text-white/50"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[9px] tracking-[0.14em] text-neutral-400 dark:text-white/30">
                  MIRANSAS / AI
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene navigation */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous demo scene" className={controlClass} onClick={() => go(index - 1)}>
              <ChevronLeft className="size-[17px]" />
            </button>
            <div className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-3 shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none" aria-label="Choose a demo scene">
              {SCENES.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.label}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => go(itemIndex)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 ${
                    itemIndex === index
                      ? "w-7 bg-neutral-800 dark:bg-white"
                      : "w-1.5 bg-neutral-300 hover:bg-neutral-500 dark:bg-white/25 dark:hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
            <button type="button" aria-label="Next demo scene" className={controlClass} onClick={() => go(index + 1)}>
              <ChevronRight className="size-[17px]" />
            </button>
            {!reduced && (
              <button
                type="button"
                aria-label={paused ? "Resume demo" : "Pause demo"}
                aria-pressed={paused}
                className={`${controlClass} ${paused ? "border-neutral-400 bg-neutral-100 dark:border-white/25 dark:bg-white/10" : ""}`}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-white/40">
            <span className="font-mono text-[10px] tracking-[0.12em]">NOW VIEWING</span>
            <span className="h-3 w-px bg-neutral-300 dark:bg-white/15" />
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-neutral-800 dark:text-white/80"
              >
                {scene.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Capability footer */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-black/[0.08] pt-7 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:border-white/10 dark:text-white/30 md:mt-20">
          <span>Text-to-speech</span>
          <span className="hidden size-1 rounded-full bg-neutral-300 dark:bg-white/20 sm:block" />
          <span>Voice cloning</span>
          <span className="hidden size-1 rounded-full bg-neutral-300 dark:bg-white/20 sm:block" />
          <span>Speech-to-speech</span>
          <span className="hidden size-1 rounded-full bg-neutral-300 dark:bg-white/20 sm:block" />
          <span>Voice agents</span>
        </div>
      </div>
    </section>
  );
}
