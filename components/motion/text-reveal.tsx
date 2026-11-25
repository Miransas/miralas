"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { observeTextLayout } from "./text-layout";
import { headingReveal } from "@/lib/motion";
import { RevealGroup, useReveal, type RevealTrigger } from "./use-reveal";

interface Line {
  text: string;
  top: number;
  left: number;
  height: number;
  bleed: number;
}
interface TextRevealProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  trigger?: RevealTrigger;
  delay?: number;
}

/** Measures real wrapped lines without inserting per-word animation nodes. */
export function TextReveal({ text, children, className, trigger = "view" }: TextRevealProps) {
  const content = text ?? children;
  const plain = typeof content === "string" || typeof content === "number" ? String(content) : null;
  const { ref, initial, animate, nested } = useReveal<HTMLSpanElement>(trigger);
  const source = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const host = ref.current;
    const element = source.current;
    if (nested === "block" || !host || !element || plain === null || !("ResizeObserver" in window)) return;

    const measure = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLines([]); return; }
      const node = element.firstChild;
      if (!(node instanceof Text)) return;
      const bounds = host.getBoundingClientRect();
      const style = getComputedStyle(host);
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2;
      const bleed = fontSize * 0.18;
      const result: Line[] = [];
      const range = document.createRange();
      for (const match of plain.matchAll(/\S+/gu)) {
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        const top = rect.top - bounds.top + (rect.height - lineHeight) / 2 - bleed;
        const last = result[result.length - 1];
        if (last && Math.abs(last.top - top) < 2) last.text += ` ${match[0]}`;
        else result.push({ text: match[0], top, left: rect.left - bounds.left, height: lineHeight, bleed });
      }
      setLines(result);
    };
    return observeTextLayout(host, measure);
  }, [plain, ref, nested]);

  return (
    <RevealGroup.Provider value="block">
      <motion.span ref={ref} data-motion-text data-reveal className={`relative block ${className ?? ""}`} initial={initial} animate={animate}>
        {plain === null ? (
          <motion.span className="block" variants={nested === "block" ? undefined : headingReveal}>{content}</motion.span>
        ) : (
          <>
            <span ref={source} data-motion-text-source style={{ opacity: lines.length ? 0 : 1 }}>{plain}</span>
            {lines.map((line, index) => (
              <span key={`${index}-${line.text}`} aria-hidden="true" data-motion-text-line className="pointer-events-none absolute overflow-hidden select-none" style={{ top: line.top, left: line.left, paddingBlock: line.bleed, height: line.height + line.bleed * 2 }}>
                <motion.span className="block whitespace-pre" initial={false} variants={headingReveal} style={{ lineHeight: `${line.height}px` }}>{line.text}</motion.span>
              </span>
            ))}
          </>
        )}
      </motion.span>
    </RevealGroup.Provider>
  );
}
