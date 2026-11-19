"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import {
  VIEWPORT_EARLY,
  VIEWPORT_ONCE,
  cardReveal,
  eyebrowReveal,
  headingReveal,
  paragraphReveal,
  staggerContainer,
  wordmarkReveal,
} from "@/lib/motion";

/**
 * Global Framer Motion configuration for the public marketing site.
 * Respects OS reduced-motion preferences without SSR/client hydration mismatches.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  early?: boolean;
}

export function RevealContainer({
  children,
  className,
  stagger = 0.06,
  delay = 0,
  early = false,
}: RevealContainerProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={early ? VIEWPORT_EARLY : VIEWPORT_ONCE}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  early?: boolean;
  standalone?: boolean;
  id?: string;
}

export function RevealEyebrow({
  children,
  className,
  standalone = false,
  early = false,
}: RevealBlockProps) {
  return (
    <motion.p
      variants={eyebrowReveal}
      initial={standalone ? "hidden" : undefined}
      whileInView={standalone ? "visible" : undefined}
      viewport={standalone ? (early ? VIEWPORT_EARLY : VIEWPORT_ONCE) : undefined}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function RevealHeading({
  children,
  className,
  id,
  standalone = false,
  early = false,
}: RevealBlockProps) {
  return (
    <motion.h2
      id={id}
      variants={headingReveal}
      initial={standalone ? "hidden" : undefined}
      whileInView={standalone ? "visible" : undefined}
      viewport={standalone ? (early ? VIEWPORT_EARLY : VIEWPORT_ONCE) : undefined}
      className={className}
    >
      {children}
    </motion.h2>
  );
}

export function RevealParagraph({
  children,
  className,
  standalone = false,
  early = false,
}: RevealBlockProps) {
  return (
    <motion.p
      variants={paragraphReveal}
      initial={standalone ? "hidden" : undefined}
      whileInView={standalone ? "visible" : undefined}
      viewport={standalone ? (early ? VIEWPORT_EARLY : VIEWPORT_ONCE) : undefined}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function RevealCard({
  children,
  className,
  standalone = false,
  early = false,
}: RevealBlockProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial={standalone ? "hidden" : undefined}
      whileInView={standalone ? "visible" : undefined}
      viewport={standalone ? (early ? VIEWPORT_EARLY : VIEWPORT_ONCE) : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealWordmark({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={wordmarkReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={className}
    >
      {children}
    </motion.div>
  );
}
