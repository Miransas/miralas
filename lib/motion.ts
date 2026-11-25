import type { CSSProperties } from "react";
import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_SMOOTH = EASE_OUT_EXPO;
export const DURATION_MICRO = 0.18;
export const DURATION_UI = 0.3;
export const DURATION_REVEAL = 0.6;
export const DURATION_HEADING = 0.68;
export const DURATION_PARAGRAPH = 0.5;
export const DURATION_META = 0.4;
export const DURATION_THEME = 0.22;
export const STAGGER_INTERVAL = 0.06;
export const MAX_STAGGER_DELAY = 0.18;
export const VIEWPORT_ONCE = { once: true, amount: 0.12 } as const;
export const VIEWPORT_EARLY = VIEWPORT_ONCE;
export const TRANSITION_MICRO: Transition = { duration: DURATION_MICRO, ease: EASE_OUT_EXPO };
export const TRANSITION_UI: Transition = { duration: DURATION_UI, ease: EASE_OUT_EXPO };

export const motionCssVariables = {
  "--motion-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
  "--motion-interaction-duration": `${DURATION_MICRO * 1000}ms`,
  "--motion-theme-duration": `${DURATION_THEME * 1000}ms`,
} as CSSProperties;

/** Staggers use a bounded group budget, including large language/feature lists. */
export function staggerContainer(stagger = STAGGER_INTERVAL, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: (index: number) => Math.min(Math.max(delay, 0) + index * Math.min(Math.max(stagger, 0.05), 0.07), MAX_STAGGER_DELAY),
      },
    },
  };
}

export const eyebrowReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION_META, ease: EASE_OUT_EXPO } },
};
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION_HEADING, ease: EASE_OUT_EXPO } },
};
export const paragraphReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION_PARAGRAPH, ease: EASE_OUT_EXPO } },
};
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_OUT_EXPO } },
};
export const wordmarkReveal = cardReveal;
export const dropdownMotion = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 4 } };
export const modalMotion = { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 } };
