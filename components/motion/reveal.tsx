"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";

/*
 * Motion primitives for the marketing site.
 *
 * trigger="view" (default)
 *   Server HTML is fully visible. After hydration, content that is still below
 *   the viewport is hidden and revealed once when it scrolls into view. Content
 *   already on screen at hydration keeps its server-rendered state, so nothing
 *   flickers on reload, deep links or back navigation.
 *
 * trigger="load"
 *   A CSS-only entrance for above-the-fold copy such as the hero. It runs on the
 *   first paint without waiting for JavaScript and always ends visible.
 *
 * Only opacity and transform animate, so layout space is reserved and nothing
 * shifts. Visitors who prefer reduced motion always get static, visible copy.
 * Text is rendered once with real spaces, keeping it readable for assistive
 * technology, search engines and copy/paste.
 */

type Trigger = "view" | "load";

const ease = [0.22, 1, 0.36, 1] as const;
const WORD_STAGGER = 0.045;

function useViewReveal<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    // Anything that starts above the bottom of the viewport has been seen.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    controls.set("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void controls.start("visible");
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const showNow = () => {
      if (!preference.matches) return;
      observer.disconnect();
      controls.stop();
      controls.set("visible");
    };

    observer.observe(element);
    preference.addEventListener("change", showNow);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showNow);
      controls.stop();
    };
  }, [controls, enabled]);

  return { ref, controls };
}

function loadStyle(delay: number, distance?: string): CSSProperties {
  return {
    animationDelay: `${delay}s`,
    ...(distance ? { "--reveal-distance": distance } : null),
  } as CSSProperties;
}

/** Fades and lifts a block of content into place. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: Trigger;
}) {
  const { ref, controls } = useViewReveal<HTMLDivElement>(trigger === "view");

  if (trigger === "load") {
    return (
      <div className={["reveal-rise", className].filter(Boolean).join(" ")} style={loadStyle(delay, "14px")}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a short line of text word by word. Use for headings, not body copy. */
export function WordReveal({
  text,
  className,
  delay = 0,
  trigger = "view",
}: {
  text: string;
  className?: string;
  delay?: number;
  trigger?: Trigger;
}) {
  const { ref, controls } = useViewReveal<HTMLSpanElement>(trigger === "view");
  const words = text.split(/\s+/).filter(Boolean);

  if (trigger === "load") {
    return (
      <span className={className}>
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span className="reveal-rise inline-block" style={loadStyle(delay + index * WORD_STAGGER)}>
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={false}
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: WORD_STAGGER } },
      }}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.35em" },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
            }}
          >
            {word}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
