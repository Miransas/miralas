"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import RobotEyes from "@/components/shared/robot-eyes";
import { cn } from "@/lib/utils";

type Scene = {
  id: string;
  label: string;
  persona: { name: string; role: string };
  prompt: string;
  reply: string;
  status: string;
  chips: string[];
  wave?: boolean;
};

const SCENES: Scene[] = [
  {
    id: "tts",
    label: "Text-to-speech",
    persona: { name: "Aziza", role: "Video creator" },
    prompt: "Read this intro in a calm, warm voice.",
    reply: "Done. Here is your intro. Want it a little slower?",
    status: "Text-to-speech",
    chips: ["English · internal", "Turkish · internal", "Russian · internal", "Uzbek · training"],
    wave: true,
  },
  {
    id: "clone",
    label: "Voice cloning",
    persona: { name: "Timur", role: "Streamer" },
    prompt: "I want a voice that sounds like me for my channel.",
    reply:
      "Record a short sample and confirm it is your own voice. We only clone voices with the owner's consent.",
    status: "Voice cloning",
    chips: ["In development", "Consent first"],
  },
  {
    id: "sts",
    label: "Speech-to-speech",
    persona: { name: "Madina", role: "Podcast host" },
    prompt: "Can I record a line and swap the voice, keeping my timing?",
    reply:
      "That is what speech-to-speech is for: same timing and emphasis, different voice. It is still in development.",
    status: "Speech-to-speech",
    chips: ["In development"],
  },
  {
    id: "agent",
    label: "Voice agent",
    persona: { name: "Rustam", role: "Shop owner" },
    prompt: "Can it answer calls for my shop?",
    reply:
      "A voice agent is in early development. The goal: answer in your language and hand the call to you when it cannot help.",
    status: "Voice agent",
    chips: ["Early development"],
  },
  {
    id: "uzbek",
    label: "Uzbek",
    persona: { name: "Dilnoza", role: "Student" },
    prompt: "Does it speak Uzbek?",
    reply:
      "Uzbek is the language we are building for first. Model training has started, and we will announce it in the changelog.",
    status: "Uzbek voice",
    chips: ["Uzbek · training"],
  },
];

// Rastgele değil: sunucu ve tarayıcı aynı çizimi üretir.
const WAVE = Array.from({ length: 40 }, (_, i) =>
  Math.round(18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82),
);

const HOLD_MS = 4500;
const TYPE_MS = 18;

const ctrl =
  "inline-flex size-11 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

function Avatar({ children, agent }: { children: string; agent?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        agent ? "bg-foreground text-background" : "bg-muted text-foreground",
      )}
    >
      {children}
    </span>
  );
}

export default function DemoCarousel() {
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"user" | "typing" | "reply" | "hold">("user");
  const [chars, setChars] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const scene = SCENES[index];
  const halted = paused || hovered || focused || reduced;

  // Hareket azaltma açıksa animasyon yok: cevap baştan tam görünür.
  const shownPhase = reduced ? "hold" : phase;
  const shownChars = reduced ? scene.reply.length : chars;

  const go = (i: number) => {
    setIndex((i + SCENES.length) % SCENES.length);
    setPhase("user");
    setChars(0);
  };

  // Senaryo: kullanıcı mesajı → yazıyor… → cevap harf harf
  useEffect(() => {
    if (reduced) return;

    const length = SCENES[index].reply.length;
    const timers: number[] = [];
    let interval: number | undefined;

    timers.push(window.setTimeout(() => setPhase("typing"), 500));
    timers.push(
      window.setTimeout(() => {
        setPhase("reply");
        let n = 0;
        interval = window.setInterval(() => {
          n += 1;
          setChars(n);
          if (n >= length) {
            window.clearInterval(interval);
            setPhase("hold");
          }
        }, TYPE_MS);
      }, 1400),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      if (interval) window.clearInterval(interval);
    };
  }, [index, reduced]);

  // Sonraki sahneye otomatik geçiş (üstüne gelince, odakta ya da duraklatınca durur)
  useEffect(() => {
    if (phase !== "hold" || halted) return;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SCENES.length);
      setPhase("user");
      setChars(0);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase, halted, index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Miralas preview scenes"
      className="py-20"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onFocusCapture={(e) =>
        setFocused((e.target as HTMLElement).matches(":focus-visible"))
      }
      onBlurCapture={() => setFocused(false)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="rounded-[2.5rem] bg-gradient-to-br from-sky-400 via-violet-400 to-fuchsia-400 p-3 dark:from-sky-600/50 dark:via-violet-600/50 dark:to-fuchsia-600/50 md:p-5"
        >
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${SCENES.length}`}
            className="grid gap-3 md:gap-5 lg:grid-cols-[1.6fr_1fr]"
          >
            {/* Ekran okuyucu için tam metin; görsel sohbet aria-hidden */}
            <p className="sr-only">
              {scene.persona.name}: {scene.prompt} Miralas: {scene.reply}
            </p>

            {/* SOL: sohbet */}
            <div
              aria-hidden
              className="flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] bg-card text-card-foreground ring-1 ring-black/5 dark:ring-white/10"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4 md:px-8">
                <span className="text-lg font-semibold">Demo conversation</span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Preview
                </span>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <div className="flex gap-4">
                  <Avatar>{scene.persona.name[0]}</Avatar>
                  <div className="min-w-0">
                    <p className="flex items-baseline gap-2">
                      <span className="font-semibold">{scene.persona.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {scene.persona.role}
                      </span>
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed">{scene.prompt}</p>
                  </div>
                </div>

                {shownPhase !== "user" && (
                  <div className="flex gap-4">
                    <Avatar agent>M</Avatar>
                    <div className="min-w-0">
                      <p className="flex items-baseline gap-2">
                        <span className="font-semibold">Miralas</span>
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          Agent
                        </span>
                      </p>

                      {shownPhase === "typing" ? (
                        <div className="mt-3 flex gap-1" aria-hidden>
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="size-2 rounded-full bg-muted-foreground/50 motion-safe:animate-bounce"
                              style={{ animationDelay: `${d * 120}ms` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="mt-1 text-[15px] leading-relaxed">
                          {scene.reply.slice(0, shownChars)}
                          {shownPhase === "reply" && (
                            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-foreground/60" />
                          )}
                        </p>
                      )}

                      {scene.wave && shownPhase === "hold" && (
                        <>
                          <div className="mt-3 flex h-10 items-center gap-[3px] rounded-xl bg-muted px-4">
                            {WAVE.map((h, i) => (
                              <span
                                key={i}
                                className="w-[3px] rounded-full bg-foreground/70"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Illustration, not a real recording.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SAĞ: maskot kartı */}
            <aside className="flex flex-col overflow-hidden rounded-[2rem] bg-card text-card-foreground ring-1 ring-black/5 dark:ring-white/10">
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">Miralas</h3>
                    <p className="mt-1 text-muted-foreground">{scene.status}</p>
                  </div>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium">
                    @miralas
                  </span>
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Status
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {scene.chips.map((c) => (
                    <li
                      key={c}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto aspect-[4/3] overflow-hidden">
                <RobotEyes />
              </div>
            </aside>
          </div>
        </div>

        {/* Gezinme */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" aria-label="Previous scene" className={ctrl} onClick={() => go(index - 1)}>
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-[18px]">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.label}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  i === index
                    ? "w-8 bg-foreground"
                    : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                )}
              />
            ))}
          </div>

          <button type="button" aria-label="Next scene" className={ctrl} onClick={() => go(index + 1)}>
            <ChevronRight className="size-5" />
          </button>

          {!reduced && (
            <button
              type="button"
              aria-label={paused ? "Play" : "Pause"}
              className={ctrl}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          A scripted preview of the experience we are building. Not a live conversation.
        </p>
      </div>
    </section>
  );
}