"use client";

import { useMemo } from "react";
import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useCycle } from "../../../hooks/use-cycle";
import { cn } from "../../../lib/utils";

type Msg = { role: "user" | "bot"; text: string };

const THREAD: Msg[] = [
  {
    role: "bot",
    text: "the harbor hotel charged $412 on the 12th and again on the 14th. double-billed, or two separate nights?",
  },
  { role: "user", text: "two nights, mia stayed the second one" },
  {
    role: "bot",
    text: "that clears it. report filed: 9 receipts matched, $2,340 across 3 trips, nothing outstanding.",
  },
  { role: "user", text: "any leftover holds on the card?" },
  {
    role: "bot",
    text: "none. the $412 hold from the 12th released this morning. books are clean.",
  },
];

const CPS = 38;
const GAP = 500;
const PERIOD = 18000;

function schedule(thread: Msg[]) {
  let t = 120;
  return thread.map((m) => {
    const start = t;
    const duration = (m.text.length / CPS) * 1000;
    t += duration + GAP;
    return { ...m, start, duration };
  });
}

export function BotCard() {
  const reduced = usePrefersReducedMotion();
  const t = useCycle(PERIOD, reduced);
  const planned = useMemo(() => schedule(THREAD), []);
  const clock = reduced ? PERIOD : (t + 4200) % PERIOD;

  const visible = planned
    .map((m) => {
      if (clock < m.start) return null;
      const typed = Math.min(m.text.length, Math.floor(((clock - m.start) / 1000) * CPS));
      return {
        role: m.role,
        text: m.text.slice(0, typed),
        done: typed >= m.text.length,
        key: m.start,
      };
    })
    .filter(Boolean) as { role: "user" | "bot"; text: string; done: boolean; key: number }[];

  return (
    <CardShell label="Bot" className="min-h-96 md:h-[28rem]">
      <div className="flex h-full flex-col justify-end gap-2.5 p-4">
        {visible.map((m) => (
          <div
            key={m.key}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[94%] text-[13px] leading-relaxed",
                m.role === "user"
                  ? "rounded-full bg-blue-600 px-3.5 py-2 font-medium text-foreground"
                  : "rounded-2xl bg-muted px-3.5 py-2.5 text-muted-foreground",
              )}
            >
              {m.role === "bot" && m.text.includes("9 receipts") ? (
                <HighlightReceipts text={m.text} />
              ) : (
                m.text
              )}
              {!m.done ? <span className="caret" /> : null}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function HighlightReceipts({ text }: { text: string }) {
  const parts = text.split(/(9 receipts)/);
  return (
    <>
      {parts.map((p, i) =>
        p === "9 receipts" ? (
          <span key={i} className="font-medium text-foreground">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}