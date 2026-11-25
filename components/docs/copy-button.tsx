"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

export function CopyButton({ text, label = "Copy code", className }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "pending" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    setState("pending");
    try {
      await copyText(text, navigator.clipboard);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }
  const Icon = state === "copied" ? Check : state === "error" ? RotateCcw : Copy;
  const message = state === "copied" ? "Copied" : state === "error" ? "Copy failed — retry" : state === "pending" ? "Copying…" : label;
  return (
    <span className="inline-flex min-w-0 items-center">
      <button type="button" disabled={state === "pending"} onClick={copy} aria-label={state === "idle" ? label : `${label}: ${message}`} className={cn("inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-text-primary transition-colors duration-150 hover:bg-surface-card-hover hover:text-text-heading focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-wait", className)}>
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />{message}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{state === "copied" ? `${label} copied to clipboard.` : state === "error" ? "Clipboard access failed. You can select and copy the content manually, or try again." : ""}</span>
    </span>
  );
}
