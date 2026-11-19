"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { cancelFrame, frame } from "framer-motion";

const LENIS_CLASSES = [
  "lenis",
  "lenis-smooth",
  "lenis-scrolling",
  "lenis-stopped",
  "lenis-autoToggle",
];

function stripLenisArtifacts() {
  const html = document.documentElement;
  const body = document.body;
  html.classList.remove(...LENIS_CLASSES);
  body.classList.remove(...LENIS_CLASSES);
  if (html.style.overflow === "hidden" || html.style.overflow === "clip") {
    html.style.removeProperty("overflow");
  }
  if (html.style.height === "auto") {
    html.style.removeProperty("height");
  }
  if (body.style.height === "auto") {
    body.style.removeProperty("height");
  }
}

/**
 * Landing-page-only Lenis smooth scroll wrapper.
 *
 * - Mounted exclusively in `app/(site)/page.tsx` so other routes keep 100% native scrolling.
 * - Synced directly to Framer Motion's `frame.update` loop (zero dual-RAF drift).
 * - Disabled automatically when `prefers-reduced-motion: reduce` is active.
 * - Cleans up RAF, Lenis instance, and any `<html>`/`<body>` classes on unmount.
 */
export function LandingSmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      stripLenisArtifacts();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      syncTouch: false, // keep native mobile touch physics
      autoRaf: false, // driven by Framer Motion frame loop
    });

    const onFrame = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp);
    };

    frame.update(onFrame, true);

    // Intercept same-page anchor links (`#section` or `/#section`) cleanly via Lenis.
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf("#");
      const id = hashIndex >= 0 ? rawHref.slice(hashIndex + 1) : "";
      if (!id) return;

      const target = document.getElementById(decodeURIComponent(id));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      window.history.pushState(null, "", `#${id}`);
    };

    const cleanup = () => {
      cancelFrame(onFrame);
      document.removeEventListener("click", onDocumentClick);
      lenis.destroy();
      stripLenisArtifacts();
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cleanup();
      }
    };

    document.addEventListener("click", onDocumentClick);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    return () => {
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      cleanup();
    };
  }, []);

  return <>{children}</>;
}

export default LandingSmoothScroll;
