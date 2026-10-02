/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import { FAQS, FaqItem } from "@/constants/faq";
import RobotEyes from "./robot-eyes";
import Integration from "./integration";

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
          group overflow-hidden rounded-2xl border transition-all duration-300
          ${
            isOpen
              ? "border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a] shadow-sm"
              : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02] hover:border-zinc-200/50 dark:hover:border-white/[0.04]"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
        >
          <span
            className={`text-base sm:text-lg font-medium tracking-tight pr-4 transition-colors duration-200 ${
              isOpen
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
            }`}
          >
            {item.question}
          </span>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease }}
            className={`
              flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200
              ${
                isOpen
                  ? "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white"
                  : "border-zinc-200/50 dark:border-white/5 text-zinc-400 dark:text-zinc-500 group-hover:border-zinc-300 dark:group-hover:border-white/20"
              }
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
              <div className="px-6 pb-6 pt-1">
                <div className="w-full h-px bg-zinc-100 dark:bg-white/[0.06] mb-4" />
                <p className="text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
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
  // İlk elemanın açık kalmasını önlemek için null yaptık
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background dark:bg-black py-24 sm:py-32 font-sans transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

          {/* SOL KOLON: Başlık + RobotEyes AI Widget Kartı */}
          <div className="flex flex-col lg:sticky lg:top-32 lg:col-span-5 space-y-8">

            {/* Rozet */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 w-fit">
              <HelpCircle className="size-3.5" />
              <span>FAQ & Documentation</span>
            </div>

            {/* Başlık ve Metin */}
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl leading-[1.1]">
                Everything you need to know.
              </h2>
              <p className="text-base font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
                Got questions about Miralas Voice AI, cloning, or API integration? We&apos;ve got answers.
              </p>
            </div>

            {/* RobotEyes AI Widget Kartı */}
            <div className="relative overflow-hidden p-8 flex flex-col items-center justify-center gap-6 text-center ">
              <div className="flex items-center gap-2 self-start bg-background dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-full">
                <span className="relative flex size-2">
                  {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span> */}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                  Interactive Assistant
                </span>
              </div>

              {/* RobotEyes Bileşeni */}
              <div className="">
                {/* <Integration/> */}
                <RobotEyes /> 
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium tracking-wide">
                Looking for something specific? <br className="hidden sm:block"/> Ask our engine directly.
              </p>
            </div>

            {/* Destek Butonu */}
            <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a] p-5 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Need dedicated support?</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Response time: under 24 hours.</p>
              </div>
              <a
                href="mailto:support@miralas.com"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white"
              >
                <Mail className="size-3.5" />
                Contact
              </a>
            </div>

          </div>

          {/* SAĞ KOLON: Akordeon Listesi */}
          <div className="flex w-full flex-col lg:col-span-7 gap-2 lg:pt-16">
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