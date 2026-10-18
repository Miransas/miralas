"use client";

import OrbitShader from "../shaders/orbit-shader";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
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
import { cn } from "@/lib/utils";
import { AgentAvatar } from "../agents/agent-avatar";

type Scene = {
  id: string;
  label: string;
  prompt: string;
  reply: string;
  status: string;
  chips: string[];
  wave?: boolean;
};

type Phase = "compose" | "thinking" | "reply";

const SCENES: Scene[] = [
  {
    id: "tts",
    label: "Text-to-speech",
    prompt: "Read this intro in a calm, warm voice.",
    reply: "Done. Here is your intro. Want it a little slower?",
    status: "Text-to-speech",
    chips: ["English · internal", "Turkish · internal", "Russian · internal", "Uzbek · training"],
    wave: true,
  },
  {
    id: "clone",
    label: "Voice cloning",
    prompt: "I want a voice that sounds like me for my channel.",
    reply:
      "Record a short sample and confirm it is your own voice. We only clone voices with the owner's consent.",
    status: "Voice cloning",
    chips: ["In development", "Consent first"],
  },
  {
    id: "sts",
    label: "Speech-to-speech",
    prompt: "Can I record a line and swap the voice, keeping my timing?",
    reply:
      "That is what speech-to-speech is for: same timing and emphasis, different voice. It is still in development.",
    status: "Speech-to-speech",
    chips: ["In development"],
  },
  {
    id: "agent",
    label: "Voice agent",
    prompt: "Can it answer calls for my shop?",
    reply:
      "A voice agent is in early development. The goal: answer in your language and hand the call to you when it cannot help.",
    status: "Voice agent",
    chips: ["Early development"],
  },
  {
    id: "uzbek",
    label: "Uzbek",
    prompt: "Does it speak Uzbek?",
    reply:
      "Uzbek is the language we are building for first. Model training has started, and we will announce it in the changelog.",
    status: "Uzbek voice",
    chips: ["Uzbek · training"],
  },
];

const WAVE = Array.from({ length: 42 }, (_, i) =>
  Math.round(20 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 80),
);

const THINK_STEPS = [
  "Understanding the request",
  "Preparing a response",
  "Preparing voice output",
];

const START_MS = 250;
const COMPOSE_MS = 27;
const SEND_PAUSE_MS = 460;
const THINK_MS = 1250;
const TYPE_MS = 19;
const AUTO_NEXT_DELAY_MS = 2300;

const controlClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

function useBoxSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize(Math.floor(Math.min(width, height)));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

/** Small visual identity for assistant messages; the full shader remains in the side panel. */
function AssistantAvatar({ active = false }: { active?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#080b14] shadow-[0_0_24px_rgba(99,102,241,0.16)]",
        active && "shadow-[0_0_28px_rgba(139,92,246,0.28)]",
      )}
    >
     <AgentAvatar/>
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-full border border-border/80 bg-gradient-to-br from-muted to-background text-[11px] font-semibold tracking-wide text-foreground"
    >
      YOU
    </div>
  );
}

export default function DemoCarousel() {
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("compose");
  const [typed, setTyped] = useState(0);
  const [chars, setChars] = useState(0);
  const [paused, setPaused] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [orbRef, orbSize] = useBoxSize<HTMLDivElement>();

  const scene = SCENES[index];
  const shownPhase: Phase = reduced ? "reply" : phase;
  const shownChars = reduced ? scene.reply.length : chars;
  const composerText = shownPhase === "compose" ? scene.prompt.slice(0, typed) : "";
  const userSent = shownPhase !== "compose";
  const replyFinished = shownChars >= scene.reply.length;
  const orbState =
    shownPhase === "thinking" ? "thinking" : shownPhase === "reply" ? "speaking" : "idle";

  const go = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + SCENES.length) % SCENES.length;
    setIndex(normalizedIndex);
    setPhase("compose");
    setTyped(0);
    setChars(0);
    setThinkingStep(0);
  };

  // Small state machine: type the prompt, show a processing state, then type the reply.
  // Pausing preserves the current phase instead of restarting the sequence.
  useEffect(() => {
    if (reduced || paused) return;

    const prompt = SCENES[index].prompt;
    const reply = SCENES[index].reply;

    if (phase === "compose") {
      if (typed >= prompt.length) {
        const timeout = window.setTimeout(() => {
          setThinkingStep(0);
          setPhase("thinking");
        }, SEND_PAUSE_MS);
        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(() => {
        setTyped((current) => Math.min(current + 1, prompt.length));
      }, typed === 0 ? START_MS : COMPOSE_MS);
      return () => window.clearTimeout(timeout);
    }

    if (phase === "thinking") {
      const timeout = window.setTimeout(() => setPhase("reply"), THINK_MS);
      return () => window.clearTimeout(timeout);
    }

    if (phase === "reply") {
      if (chars >= reply.length) {
        const timeout = window.setTimeout(() => {
          setIndex((current) => (current + 1) % SCENES.length);
          setPhase("compose");
          setTyped(0);
          setChars(0);
          setThinkingStep(0);
        }, AUTO_NEXT_DELAY_MS);
        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(() => {
        setChars((current) => Math.min(current + 1, reply.length));
      }, TYPE_MS);
      return () => window.clearTimeout(timeout);
    }
  }, [index, phase, typed, chars, reduced, paused]);

  useEffect(() => {
    if (reduced || paused || phase !== "thinking") return;

    const interval = window.setInterval(() => {
      setThinkingStep((current) => (current + 1) % THINK_STEPS.length);
    }, 760);

    return () => window.clearInterval(interval);
  }, [phase, reduced, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Miransas live demo"
      className="py-12"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-[2rem] bg-card text-card-foreground shadow-[0_28px_100px_-42px_rgba(20,25,45,0.35)] ring-1 ring-black/[0.06] dark:ring-white/[0.09]">
          <div className="grid min-h-[570px] lg:grid-cols-[1.08fr_0.92fr]">
            {/* Conversation */}
            <div className="flex min-w-0 flex-col border-b border-border/60 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-[#090c16]">
                    <span className="absolute inset-1 rounded-xl border border-cyan-300/25" />
                    <Sparkles className="size-[17px] text-cyan-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold tracking-tight">Miransas AI</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        LIVE PREVIEW
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">A conversation with voice</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-muted/70 px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
                  {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="flex flex-1 flex-col gap-5 py-1" aria-live="polite" aria-atomic="false">
                {userSent && (
                  <motion.div
                    key={`user-${scene.id}`}
                    initial={reduced ? false : { opacity: 0, y: 9, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="flex items-end justify-end gap-3"
                  >
                    <div className="max-w-[86%]">
                      <div className="mb-1.5 pr-1 text-right text-[11px] font-medium text-muted-foreground">You</div>
                      <div className="rounded-[1.35rem] rounded-br-md border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-primary/[0.07] to-cyan-500/[0.08] px-4 py-3 text-[14px] leading-6 shadow-sm">
                        {scene.prompt}
                      </div>
                    </div>
                    <UserAvatar />
                  </motion.div>
                )}

                {(shownPhase === "thinking" || shownPhase === "reply") && (
                  <motion.div
                    key={`assistant-${scene.id}`}
                    initial={reduced ? false : { opacity: 0, y: 11 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    <AssistantAvatar active={shownPhase === "thinking"} />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold">Miransas</span>
                        <span className="text-[10px] text-muted-foreground">AI assistant</span>
                        {shownPhase === "reply" && replyFinished && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-300">
                            <Check className="size-3" />
                            Ready
                          </span>
                        )}
                      </div>

                      {shownPhase === "thinking" ? (
                        <motion.div
                          key="thinking-card"
                          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="max-w-[95%] rounded-2xl rounded-tl-md border border-violet-500/20 bg-gradient-to-br from-cyan-500/[0.055] via-violet-500/[0.07] to-fuchsia-500/[0.055] p-4"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="relative grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/15 via-violet-500/15 to-fuchsia-500/15">
                              <Sparkles className="size-4 text-violet-500" />
                              {!reduced && (
                                <motion.span
                                  aria-hidden="true"
                                  className="absolute inset-0 rounded-xl border border-violet-400/35"
                                  animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.92, 1.04, 0.92] }}
                                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                />
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">{THINK_STEPS[thinkingStep]}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">Getting the response ready</p>
                            </div>
                            <div className="flex items-center gap-1" aria-label="Processing">
                              {[0, 1, 2].map((dot) => (
                                <motion.span
                                  key={dot}
                                  className={cn(
                                    "size-1.5 rounded-full",
                                    dot === 0 ? "bg-cyan-400" : dot === 1 ? "bg-violet-500" : "bg-fuchsia-400",
                                  )}
                                  animate={reduced ? { opacity: 1 } : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                  transition={{ duration: 0.9, delay: dot * 0.14, repeat: Infinity, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 h-1 overflow-hidden rounded-full bg-violet-500/10">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400"
                              initial={{ width: "8%" }}
                              animate={reduced ? { width: "100%" } : { width: ["12%", "58%", "84%"] }}
                              transition={{ duration: THINK_MS / 1000, ease: "easeInOut" }}
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <div className="max-w-[98%]">
                          <p className="whitespace-pre-wrap text-[14px] leading-[1.8] text-foreground/90 sm:text-[15px]">
                            {scene.reply.slice(0, shownChars)}
                            {!replyFinished && (
                              <motion.span
                                aria-hidden="true"
                                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-400"
                                animate={reduced ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            )}
                          </p>

                          {scene.wave && replyFinished && (
                            <motion.div
                              initial={reduced ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35 }}
                              className="mt-4 max-w-[350px] rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.07] via-violet-500/[0.08] to-fuchsia-500/[0.07] p-3.5"
                            >
                              <div className="mb-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                  <span className="grid size-8 place-items-center rounded-xl bg-background/80 text-violet-500 shadow-sm ring-1 ring-border/60">
                                    <Volume2 className="size-4" />
                                  </span>
                                  <div>
                                    <p className="text-xs font-semibold">Voice response</p>
                                    <p className="mt-0.5 text-[10px] text-muted-foreground">Natural speech · waveform preview</p>
                                  </div>
                                </div>
                                <AudioLines className="size-4 text-cyan-500" />
                              </div>
                              <div className="flex h-9 items-center justify-between gap-[3px] overflow-hidden rounded-lg px-1" aria-label="Voice waveform preview">
                                {WAVE.map((height, waveIndex) => (
                                  <motion.span
                                    key={waveIndex}
                                    className="w-[3px] min-w-[2px] rounded-full bg-gradient-to-t from-cyan-500 via-violet-500 to-fuchsia-400"
                                    style={{ height: `${height}%`, transformOrigin: "center" }}
                                    animate={reduced ? { scaleY: 0.8 } : { scaleY: [0.38, 1, 0.58, 0.92, 0.38] }}
                                    transition={{
                                      duration: 0.95 + (waveIndex % 5) * 0.1,
                                      delay: waveIndex * 0.018,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Composer-style preview */}
              <div className="mt-5">
                <div className="flex items-center gap-3 rounded-[1.25rem] border border-border/80 bg-background px-3 py-2.5 shadow-sm transition-colors">
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-xl transition-colors",
                      composerText ? "bg-violet-500/10 text-violet-500" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <AudioLines className="size-4" />
                  </span>
                  <span className={cn("min-h-6 min-w-0 flex-1 truncate text-[13px] leading-6 sm:text-sm", composerText ? "text-foreground" : "text-muted-foreground")}>
                    {composerText || "Message Miransas…"}
                    {composerText && (
                      <motion.span
                        aria-hidden="true"
                        className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] rounded-full bg-violet-500"
                        animate={reduced ? { opacity: 1 } : { opacity: [1, 0.15, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-300",
                      composerText ? "bg-foreground text-background shadow-sm" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <ArrowUp className="size-4" />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-muted-foreground sm:text-[11px]">
                  <span className="inline-flex items-center gap-1.5"><Radio className="size-3.5 text-cyan-500" /> Text and voice in one interface</span>
                  <span>Illustrative product preview</span>
                </div>
              </div>
            </div>

            {/* AI visual identity / shader */}
            <aside className="relative flex min-w-0 flex-col overflow-hidden bg-muted/20 p-5 sm:p-7 lg:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-violet-500/[0.08] blur-3xl" />
                <div className="absolute -bottom-24 -left-12 size-64 rounded-full bg-cyan-500/[0.08] blur-3xl" />
                <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(var(--foreground)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The voice layer</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-[1.8rem]">A voice that feels present.</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    One assistant identity, from the first thought to the final sound.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
                  <span className={cn("size-1.5 rounded-full", shownPhase === "thinking" ? "bg-violet-500" : shownPhase === "reply" ? "bg-cyan-500" : "bg-emerald-500")} />
                  {shownPhase === "thinking" ? "Thinking" : shownPhase === "reply" ? "Speaking" : "Ready"}
                </span>
              </div>

              <div ref={orbRef} className="relative z-10 my-2 flex min-h-[280px] flex-1 items-center justify-center sm:min-h-[320px]">
                <div aria-hidden="true" className="pointer-events-none absolute size-[min(76vw,330px)] rounded-full bg-gradient-to-br from-cyan-500/[0.08] via-violet-500/[0.1] to-fuchsia-500/[0.08] blur-2xl" />
                {orbSize > 0 && (
                  <OrbitShader
                    size={Math.max(orbSize, 280)}
                    state={orbState}
                    params={{ speed: 0.8 }}
                    statePresets={{
                      idle: { speed: 0.48 },
                      thinking: { speed: 0.82 },
                      speaking: { speed: 1.18 },
                    }}
                    stateVolumes={{
                      idle: { input: 0, output: 0.2 },
                      thinking: { input: 0.15, output: 0.5 },
                      speaking: { input: 0.3, output: 0.95 },
                    }}
                    volumes={{ input: 0, output: 0.8 }}
                    wrapper="ring"
                    wrapperColor="currentColor"
                    paused={reduced || paused}
                    pauseOffscreen
                    maxDpr={1.35}
                    ariaLabel="Miransas AI voice avatar"
                    className="scale-110 border-none"
                  />
                )}
              </div>

              <div className="relative z-10 rounded-2xl border border-border/70 bg-background/75 p-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 text-violet-500">
                      <AudioLines className="size-[18px]" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{scene.status}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">Current demo scene</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">MIRANSAS / AI</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {scene.chips.map((chip) => (
                    <span key={chip} className="rounded-lg border border-border/70 bg-muted/50 px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Scene controls */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button type="button" aria-label="Previous demo scene" className={controlClass} onClick={() => go(index - 1)}>
            <ChevronLeft className="size-[18px]" />
          </button>

          <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3.5 py-3 shadow-sm" aria-label="Choose a demo scene">
            {SCENES.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => go(itemIndex)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  itemIndex === index ? "w-7 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500" : "w-2 bg-muted-foreground/35 hover:bg-muted-foreground/65",
                )}
              />
            ))}
          </div>

          <button type="button" aria-label="Next demo scene" className={controlClass} onClick={() => go(index + 1)}>
            <ChevronRight className="size-[18px]" />
          </button>

          {!reduced && (
            <button
              type="button"
              aria-label={paused ? "Resume demo" : "Pause demo"}
              aria-pressed={paused}
              className={cn(controlClass, paused && "border-violet-500/30 bg-violet-500/10 text-violet-500")}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
          )}
          <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">{scene.label}</span>
        </div>
      </div>
    </section>
  );
}
