"use client";

import { useMemo } from "react";
import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useCycle } from "../../../hooks/use-cycle";
import { cn } from "../../../lib/utils";

type Msg = { role: "user" | "ai"; text: string };

const THREADS: Msg[][] = [
  [
    {
      role: "ai",
      text: "Shorter blue wavelengths scatter more off air molecules than longer red ones.",
    },
    { role: "user", text: "How do black holes form?" },
    {
      role: "ai",
      text: "A massive star exhausts its fuel and gravity collapses the core into a singularity.",
    },
    { role: "user", text: "What causes aurora borealis?" },
    {
      role: "ai",
      text: "Solar particles hit atmospheric gases near the poles, exciting them to glow.",
    },
  ],
  [
    { role: "user", text: "Why does time slow near a black hole?" },
    {
      role: "ai",
      text: "Gravity warps spacetime. Clocks deeper in the well tick slower relative to distant observers.",
    },
    { role: "user", text: "Could we ever leave the event horizon?" },
    {
      role: "ai",
      text: "No. Inside, every future path points inward. Escape would require faster than light.",
    },
  ],
  [
    { role: "user", text: "What is entanglement, simply?" },
    {
      role: "ai",
      text: "Two particles share one state. Measure one, and the other is instantly determined — even far away.",
    },
    { role: "user", text: "Does that send information?" },
    {
      role: "ai",
      text: "No usable signal. The outcomes are correlated, but locally random until compared.",
    },
  ],
];

const CPS = 48;
const GAP = 380;
const HOLD = 1600;

function schedule(thread: Msg[]) {
  let t = 80;
  return thread.map((m) => {
    const start = t;
    const duration = (m.text.length / CPS) * 1000;
    t += duration + GAP;
    return { ...m, start, duration };
  });
}

const PLANS = THREADS.map(schedule);
const DURS = PLANS.map((p) => p[p.length - 1].start + p[p.length - 1].duration + HOLD);
const PERIOD = DURS.reduce((a, b) => a + b, 0);

export function ChatCard() {
  const reduced = usePrefersReducedMotion();
  const t = useCycle(PERIOD, reduced);
  const clock = reduced ? DURS[0] - 1 : (t + 2800) % PERIOD;

  let acc = 0;
  let threadIndex = 0;
  let local = clock;
  
  // ✅ Düzeltildi: break olmayınca son değerler eziliyordu
  for (let i = 0; i < DURS.length; i++) {
    if (clock < acc + DURS[i]) {
      threadIndex = i;
      local = clock - acc;
      break;
    }
    acc += DURS[i];
  }

  const planned = useMemo(() => PLANS[threadIndex], [threadIndex]);

  const visible = planned
    .map((m) => {
      if (local < m.start) return null;
      const typed = Math.min(m.text.length, Math.floor(((local - m.start) / 1000) * CPS));
      return {
        role: m.role,
        text: m.text.slice(0, typed),
        done: typed >= m.text.length,
        key: `${threadIndex}-${m.start}`,
      };
    })
    .filter(Boolean) as {
    role: "user" | "ai";
    text: string;
    done: boolean;
    key: string;
  }[];

  return (
    <CardShell label="Chat" className="min-h-96 md:h-[28rem] rounded-xl">
      <div className="flex h-full flex-col justify-end gap-2.5 p-4">
        {visible.map((m) => (
          <div
            key={m.key}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[92%] text-[13px] leading-relaxed",
                m.role === "user"
                  ? "rounded-full bg-stone-100 px-3.5 py-2 text-stone-900"
                  : "rounded-2xl bg-stone-100 px-3.5 py-2.5 text-stone-700",
              )}
            >
              {m.text}
              {!m.done ? <span className="caret" /> : null}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}