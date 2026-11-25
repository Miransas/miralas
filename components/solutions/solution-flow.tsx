"use client";
import { RevealCard, StaggerReveal } from "@/components/motion/primitives";
import { motion,useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { eyebrow } from "./solution-ui";

export function SolutionFlow({ steps, caption }: { steps: string[]; caption: string }) {
  const reduce = useReducedMotion();
  return <div className="dark rounded-4xl bg-surface-card px-6 py-10 text-white sm:px-10 sm:py-14"><p className={`${eyebrow} text-text-muted`}>{caption}</p><StaggerReveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-0">{steps.map((step, index) => <div key={step} className="flex flex-1 items-center gap-4"><RevealCard as="span" className="whitespace-nowrap text-xl font-medium tracking-tight sm:text-2xl">{step}</RevealCard>{index < steps.length - 1 && <div className="flex flex-1 items-center text-text-muted"><motion.span initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.12 }} className="hidden h-px w-full origin-left bg-white/25 sm:block" /><ArrowRight size={16} aria-hidden="true" className="rotate-90 sm:rotate-0" /></div>}</div>)}</StaggerReveal><p className="mt-10 text-xs leading-6 text-text-muted">Illustrative workflow. Availability and capabilities depend on the product release.</p></div>;
}
