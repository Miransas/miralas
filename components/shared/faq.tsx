"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";

import { FAQS, type FaqItem } from "@/constants/faq";
import {
  VIEWPORT_EARLY,
  VIEWPORT_ONCE,
  cardReveal,
  eyebrowReveal,
  headingReveal,
  paragraphReveal,
  staggerContainer,
} from "@/lib/motion";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <motion.article
      variants={cardReveal}
      className={[
        "overflow-hidden rounded-4xl transition-colors duration-300",
        isOpen
          ? "bg-[#fff] dark:bg-[#101012]"
          : "bg-[#F7F7F7] dark:bg-[#0D0D0D]",
      ].join(" ")}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/40 dark:focus-visible:ring-white/50 sm:px-7 sm:py-[22px]"
        >
          <span
            className={`text-[14px] font-semibold leading-6 tracking-[-0.015em] transition-colors sm:text-[15px] ${
              isOpen
                ? "text-[#111111] dark:text-white"
                : "text-[#303034] group-hover:text-black dark:text-[#D5D5D8] dark:group-hover:text-white"
            }`}
          >
            {item.question}
          </span>

          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              isOpen
                ? "border-black/[0.10] bg-[#EFEFEF] text-black dark:border-white/[0.14] dark:bg-white/[0.08] dark:text-white"
                : "border-black/[0.07] bg-white/70 text-[#77777D] group-hover:border-black/[0.12] group-hover:text-black dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-[#8A8A91] dark:group-hover:text-white"
            }`}
          >
            <ChevronDown
              aria-hidden="true"
              className={`size-[17px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              strokeWidth={1.8}
            />
          </span>
        </button>
      </h3>

      {/* Pure CSS Grid transition avoids JS height measurement and layout thrashing. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-5 border-t border-black/[0.07] pb-6 pt-4 text-[13px] leading-[1.85] text-[#66666D] dark:border-white/[0.09] dark:text-[#A1A1A8] sm:mx-7 sm:pb-7 sm:pt-5 sm:text-[14px]">
            {item.answer}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative isolate overflow-x-clip bg-[#EFEFEF] py-20 text-[#111111] dark:bg-[#050505] dark:text-white sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.09] to-transparent dark:via-white/[0.10]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-7 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-20 lg:px-8">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col lg:sticky lg:top-28 lg:self-start"
        >
          <motion.div
            variants={eyebrowReveal}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.09] bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55555B] dark:border-white/[0.10] dark:bg-white/[0.045] dark:text-[#A5A5AC]"
          >
            <span className="size-1.5 rounded-full bg-[#77777D] dark:bg-[#C7C7CC]" />
            Miransas · FAQ
          </motion.div>

          <div className="mt-7 max-w-[440px]">
            <motion.h2
              variants={headingReveal}
              className="text-[clamp(36px,4.5vw,58px)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] dark:text-white"
            >
              Good questions.
              <br />
              Clear answers.
            </motion.h2>
            <motion.p
              variants={paragraphReveal}
              className="mt-5 max-w-[390px] text-[14px] leading-[1.85] text-[#68686E] dark:text-[#92929A] sm:text-[15px]"
            >
              Learn more about Miransas, our voice technology, and the capabilities we are building.
            </motion.p>
          </div>

          {SUPPORT_EMAIL ? (
            <motion.div
              variants={cardReveal}
              className="mt-9 flex max-w-[430px] flex-col gap-4 rounded-[22px] border border-black/[0.06] bg-[#F7F7F7] p-5 dark:border-white/[0.08] dark:bg-[#0D0D0D] sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="text-[14px] font-semibold tracking-tight text-[#171717] dark:text-white">
                  Still need a hand?
                </p>
                <p className="mt-1 text-[12px] leading-5 text-[#77777D] dark:text-[#92929A]">
                  Contact our team for more information.
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#111111] px-4 text-[12px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:bg-white dark:text-[#111111] dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-[#0D0D0D]"
              >
                <Mail className="size-3.5" />
                Contact us
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ) : null}

          <motion.p
            variants={paragraphReveal}
            className="mt-7 text-[10px] font-medium uppercase tracking-[0.16em] text-[#99999F] dark:text-[#626269]"
          >
            Updated as the platform evolves
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          className="flex w-full flex-col gap-3.5 lg:pt-1"
        >
          {FAQS.map((faq, index) => (
            <FaqAccordionItem
              key={faq.question}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
