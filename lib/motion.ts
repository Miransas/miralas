import type { Transition, Variants } from "framer-motion";

/**
 * Centralized motion tokens for the Miralas public marketing site.
 *
 * All transitions animate compositor-only properties (`transform`, `opacity`)
 * and stay restrained, crisp, and predictable under `<MotionConfig reducedMotion="user">`.
 */

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

export const DURATION_MICRO = 0.18;
export const DURATION_UI = 0.32;
export const DURATION_REVEAL = 0.52;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.15,
  margin: "-48px 0px",
} as const;

export const VIEWPORT_EARLY = {
  once: true,
  amount: 0.08,
  margin: "-24px 0px",
} as const;

export const TRANSITION_MICRO: Transition = {
  duration: DURATION_MICRO,
  ease: EASE_OUT_EXPO,
};

export const TRANSITION_UI: Transition = {
  duration: DURATION_UI,
  ease: EASE_OUT_EXPO,
};

export function staggerContainer(stagger = 0.06, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

export const eyebrowReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_OUT_EXPO },
  },
};

export const paragraphReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_OUT_EXPO },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const wordmarkReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_OUT_EXPO },
  },
};
