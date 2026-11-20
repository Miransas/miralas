"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Plus } from "lucide-react";

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
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2";

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
        "group relative overflow-hidden rounded-[22px] transition-[background-color,box-shadow] duration-300",
        isOpen
          ? "surface-accent-soft surface-shadow"
          : "bg-surface-card hover:bg-surface-card-hover",
      ].join(" ")}
    >
      {/* Subtle violet hover sheen when closed */}
      {!isOpen && (
        <div
          aria-hidden="true"
          className="surface-hover-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <h3 className="relative z-10">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`flex w-full items-center justify-between gap-5 rounded-[22px] px-5 py-5 text-left transition-colors sm:px-7 sm:py-6 ${FOCUS_RING}`}
        >
          <span
            className={`text-[15px] font-semibold leading-[1.45] tracking-[-0.015em] transition-colors duration-200 sm:text-base ${
              isOpen
                ? "text-text-heading"
                : "text-text-primary group-hover:text-text-heading"
            }`}
          >
            {item.question}
          </span>

          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
              isOpen
                ? "bg-[#7c3aed]/15 text-[#7c3aed] dark:bg-[#7c3aed]/25 dark:text-white"
                : "bg-black/[0.05] text-text-muted group-hover:bg-[#7c3aed]/10 group-hover:text-text-heading dark:bg-white/[0.06] dark:group-hover:bg-[#7c3aed]/18"
            }`}
          >
            <Plus
              className={`size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
              strokeWidth={1.9}
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
        className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-6 pt-1 text-[15px] leading-[1.6] text-text-primary sm:px-7 sm:pb-7 sm:text-base">
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
    <section className="relative isolate overflow-x-clip bg-surface-page py-20 text-text-heading sm:py-28 lg:py-32">
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
            className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-card px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
          >
            <span className="size-1.5 rounded-full bg-[#7c3aed]" />
            Miransas · FAQ
          </motion.div>

          <div className="mt-7 max-w-[440px]">
            <motion.h2
              variants={headingReveal}
              className="text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
            >
              Good questions.
              <br />
              Clear answers.
            </motion.h2>
            <motion.p
              variants={paragraphReveal}
              className="mt-5 max-w-[390px] text-[15px] leading-[1.6] text-text-muted sm:text-base"
            >
              Learn more about Miransas, our voice technology, and the capabilities we are building.
            </motion.p>
          </div>

          {SUPPORT_EMAIL ? (
            <motion.div
              variants={cardReveal}
              className="surface-shadow mt-9 flex max-w-[430px] flex-col gap-4 rounded-[24px] bg-surface-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-text-heading">
                  Still need a hand?
                </p>
                <p className="mt-1 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                  Contact our team for more information.
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-text-heading px-4 text-xs font-semibold text-surface-page transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${FOCUS_RING}`}
              >
                <Mail className="size-3.5" />
                Contact us
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ) : null}

          <motion.p
            variants={paragraphReveal}
            className="mt-7 text-xs font-medium uppercase tracking-[0.12em] text-text-muted sm:text-[13px]"
          >
            Updated as the platform evolves
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          className="flex w-full flex-col gap-3 lg:pt-1"
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
