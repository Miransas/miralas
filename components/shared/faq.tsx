/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Sparkles, HelpCircle } from "lucide-react";
import { FAQS, FaqItem } from "@/constants/faq";
import RobotEyes from "./robot-eyes";

const ease = [0.22, 1, 0.36, 1] as const;

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        ease,
        delay: index * 0.04,
      }}
      className="group"
    >
      <div
        className={`
          overflow-hidden rounded-2xl border transition-all duration-300
          ${
            isOpen
              ? "border-border bg-card shadow-sm"
              : "border-border/60 bg-card/50 hover:bg-card hover:border-border"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
        >
          <span className="text-base sm:text-lg font-semibold tracking-tight text-foreground pr-4">
            {item.question}
          </span>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease }}
            className={`
              flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200
              ${isOpen ? "border-border bg-secondary text-foreground" : "border-border/40 text-muted-foreground group-hover:text-foreground"}
            `}
          >
            <ChevronDown className="size-4" strokeWidth={2} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.3, ease },
                opacity: { duration: 0.2, ease },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1 border-t border-border/40">
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground pt-4">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background py-24 text-foreground sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

          {/* SOL KOLON: Başlık + RobotEyes AI Widget Kartı */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:col-span-5 space-y-6">

            {/* Rozet */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground w-fit shadow-sm">
              <HelpCircle className="size-3.5 text-foreground" />
              <span>FAQ & Documentation</span>
            </div>

            {/* Başlık ve Metin */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
                Everything you need to know.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Got questions about Miralas Voice AI, cloning, or API integration? We&apos;ve got answers.
              </p>
            </div>

            {/* RobotEyes AI Widget Kartı */}
            <div className="relative overflow-hidden  p-6  flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2 self-start">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  AI Interactive Assistant
                </span>
              </div>

              {/* RobotEyes Bileşeni */}
              <div className="py-2 scale-110">
                <RobotEyes />
              </div>

              <p className="text-xs mt-6 text-muted-foreground font-mono">
                Looking for something specific? Ask our engine directly.
              </p>
            </div>

            {/* Destek Butonu */}
            <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-foreground">Need dedicated support?</p>
                <p className="text-xs text-muted-foreground">Response time: under 24 hours.</p>
              </div>
              <a
                href="mailto:support@miralas.com"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:bg-accent"
              >
                <Mail className="size-3.5 text-muted-foreground" />
                Contact
              </a>
            </div>

          </div>

          {/* SAĞ KOLON: Akordeon Listesi */}
          <div className="flex w-full flex-col lg:col-span-7 space-y-4">
            {FAQS.map((faq, i) => (
              <FaqAccordionItem
                key={faq.question}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex((current) => (current === i ? null : i))
                }
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
