"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { MotionConfig, motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cardReveal, eyebrowReveal, paragraphReveal, staggerContainer, TRANSITION_MICRO } from "@/lib/motion";
import { TextReveal } from "./text-reveal";
import { RevealGroup, useReveal, type RevealTrigger } from "./use-reveal";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={TRANSITION_MICRO}>{children}</MotionConfig>;
}

type BlockProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  trigger?: RevealTrigger;
  delay?: number;
  early?: boolean;
  standalone?: boolean;
  as?: "div" | "article" | "section" | "span" | "header";
};

type GroupProps = BlockProps & { stagger?: number; variants?: Variants };

/** Group scopes own viewport observation; descendants inherit a single reveal. */
export function StaggerReveal({ children, trigger = "view", stagger = 0.06, delay = 0, variants, early: _early, standalone: _standalone, as = "div", ...props }: GroupProps) {
  const { ref, initial, animate, nested } = useReveal<HTMLDivElement>(trigger);
  const Tag = motion[as];
  return (
    <RevealGroup.Provider value={nested || "group"}>
      <Tag {...props} ref={ref} data-reveal initial={initial} animate={animate} variants={nested ? undefined : variants ?? staggerContainer(stagger, delay)}>
        {children}
      </Tag>
    </RevealGroup.Provider>
  );
}

export const RevealContainer = StaggerReveal;

/** One meaningful content block. Nested wrappers never add another transform. */
export function Reveal({ children, trigger = "view", delay: _delay, early: _early, standalone: _standalone, as = "div", variants = cardReveal, ...props }: BlockProps) {
  const { ref, initial, animate, nested } = useReveal<HTMLDivElement>(trigger);
  const Tag = motion[as];
  return (
    <RevealGroup.Provider value="block">
      <Tag {...props} ref={ref} data-reveal initial={initial} animate={animate} variants={nested === "block" ? undefined : variants}>
        {children}
      </Tag>
    </RevealGroup.Provider>
  );
}
export const ScrollReveal = Reveal;
export function SectionReveal({ as = "section", ...props }: GroupProps) {
  return <StaggerReveal as={as} {...props} />;
}
export const RevealCard = Reveal;
export const RevealWordmark = Reveal;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  trigger?: RevealTrigger;
  early?: boolean;
  standalone?: boolean;
  as?: "h1" | "h2" | "h3" | "h4";
}
export function RevealHeading({ children, trigger = "view", as = "h2", early: _early, standalone: _standalone, ...props }: HeadingProps) {
  const Tag = as;
  return <Tag {...props}><TextReveal trigger={trigger}>{children}</TextReveal></Tag>;
}

type TextProps = Omit<HTMLMotionProps<"p">, "initial" | "animate" | "whileInView"> & { trigger?: RevealTrigger; early?: boolean; standalone?: boolean; as?: "p" | "div" | "span" };

export function RevealParagraph({ children, trigger = "view", early: _early, standalone: _standalone, as = "p", ...props }: TextProps) {
  const { ref, initial, animate, nested } = useReveal<HTMLParagraphElement>(trigger);
  const Tag = motion[as];
  return <Tag {...props} ref={ref} data-reveal initial={initial} animate={animate} variants={nested === "block" ? undefined : paragraphReveal}>{children}</Tag>;
}
export function RevealEyebrow({ children, trigger = "view", early: _early, standalone: _standalone, as = "p", ...props }: TextProps) {
  const { ref, initial, animate, nested } = useReveal<HTMLParagraphElement>(trigger);
  const Tag = motion[as];
  return <Tag {...props} ref={ref} data-reveal initial={initial} animate={animate} variants={nested === "block" ? undefined : eyebrowReveal}>{children}</Tag>;
}
