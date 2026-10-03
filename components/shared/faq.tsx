/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import { FAQS, FaqItem } from "@/constants/faq";
import RobotEyes from "./robot-eyes";
// import Integration from "./integration";

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
    >
      <div
        className={`
          group overflow-hidden rounded-[32px] transition-colors duration-300
          ${
            isOpen
              ? "bg-white dark:bg-[#141210]"
              : "bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-[#1a1816]"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left focus:outline-none"
        >
          <span
            className={`text-[17px] font-bold tracking-tight pr-4 transition-colors duration-200 ${
              isOpen
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-800 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
            }`}
          >
            {item.question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease }}
            className={`
              shrink-0 transition-colors duration-200
              ${
                isOpen
                  ? "text-zinc-950 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white"
              }
            `}
          >
            <ChevronDown className="size-6" strokeWidth={2.5} />
          </motion.div>
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
              <div className="px-8 pb-8 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#F2F2F2] dark:bg-zinc-950 py-24 sm:py-32 transition-colors duration-300 font-sans antialiased">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">

          {/* SOL KOLON: Başlık + RobotEyes AI Widget Kartı */}
          <div className="flex flex-col lg:sticky lg:top-32 lg:col-span-5 space-y-10">

            {/* Rozet */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 w-fit">
              <HelpCircle className="size-4" />
              <span>FAQ & Documentation</span>
            </div>

            {/* Başlık ve Metin */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Everything you need to know.
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-md">
                Got questions about Miralas Voice AI, cloning, or API integration? We&apos;ve got answers.
              </p>
            </div>

            {/* RobotEyes AI Widget Kartı */}
            <div className="rounded-[32px] bg-white dark:bg-[#141210] p-8 flex flex-col items-center justify-center gap-8 text-center shadow-sm">
              <div className="flex items-center gap-2 self-start bg-[#F2F2F2] dark:bg-white/5 px-4 py-2 rounded-full">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Interactive Assistant
                </span>
              </div>

              {/* RobotEyes Bileşeni */}
              {/* <div className="transform scale-110">
                <RobotEyes /> 
              </div> */}

              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Looking for something specific? <br className="hidden sm:block"/> Ask our engine directly.
              </p>
            </div>

            {/* Destek Butonu */}
            <div className="rounded-[24px] bg-white dark:bg-[#141210] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="text-center sm:text-left">
                <p className="text-base font-bold text-zinc-950 dark:text-white">Need dedicated support?</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Response time: under 24 hours.</p>
              </div>
              <a
                href="mailto:support@miralas.com"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-zinc-950 dark:bg-white px-6 py-3 text-sm font-bold text-white dark:text-zinc-950 transition-transform hover:scale-105"
              >
                <Mail className="size-4" />
                Contact Us
              </a>
            </div>

          </div>

          {/* SAĞ KOLON: Akordeon Listesi */}
          <div className="flex w-full flex-col lg:col-span-7 gap-4 lg:pt-8">
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