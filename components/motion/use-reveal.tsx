"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { observeReveal } from "./viewport";

export type RevealTrigger = "view" | "load";
export const RevealGroup = createContext<false | "group" | "block">(false);

/** Visible SSR is enhanced only after successful viewport initialization. */
export function useReveal<T extends HTMLElement>(trigger: RevealTrigger = "view") {
  const nested = useContext(RevealGroup);
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<"hidden" | "visible">("visible");

  useEffect(() => {
    const element = ref.current;
    if (nested || !element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (trigger === "load") {
      setPhase("hidden");
      // Let the pooled line measurements commit before starting the entrance.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setPhase("visible"));
      });
      return () => cancelAnimationFrame(frame);
    }
    // Back/forward, hash navigation and initial on-screen content stay visible.
    if (element.getBoundingClientRect().top < window.innerHeight || !("IntersectionObserver" in window)) return;
    try {
      const cleanup = observeReveal(element, () => setPhase("visible"));
      setPhase("hidden");
      return cleanup;
    } catch {
      setPhase("visible");
    }
  }, [nested, trigger]);

  return { ref, initial: false as const, animate: nested ? undefined : phase, nested };
}
