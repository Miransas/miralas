"use client";

import { useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";

import { FAQS, FaqItem } from "@/constants/faq";

const ease = [0.22, 1, 0.36, 1] as const;
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

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
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease, delay: index * 0.04 }}
    >
      <div
        className={`group overflow-hidden rounded-[32px] transition-colors duration-300 ${
          isOpen
            ? "bg-white dark:bg-[#1b1b1e] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] dark:ring-1 dark:ring-white/10"
            : "bg-white/60 hover:bg-white dark:bg-[#121214] dark:ring-1 dark:ring-white/[0.06] dark:hover:bg-[#18181b]"
        }`}
      >
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 rounded-[32px] px-8 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/30 dark:focus-visible:ring-white/40"
        >
          <span
            className={`pr-4 text-sm font-bold tracking-tight transition-colors duration-200 md:text-[17px] ${
              isOpen
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white"
            }`}
          >
            {item.question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease }}
            className={`shrink-0 transition-colors duration-200 ${
              isOpen
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white"
            }`}
          >
            <ChevronDown className="size-6" strokeWidth={2.5} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.3, ease },
                opacity: { duration: 0.2, ease },
              }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
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
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#EBE9E5] py-24 font-sans antialiased transition-colors duration-300 dark:bg-[#08080a] sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent)] dark:block"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
            {/* LEFT */}
            <div className="flex flex-col space-y-10 lg:sticky lg:top-32 lg:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/50 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <HelpCircle className="size-4" />
                <span>FAQ</span>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
                  What we can say today.
                </h2>
                <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Miralas is in development. These are straight answers about
                  where we are.
                </p>
              </div>

              {SUPPORT_EMAIL && (
                <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white p-6 shadow-sm dark:bg-[#121214] dark:ring-1 dark:ring-white/[0.06] sm:flex-row">
                  <div className="text-center sm:text-left">
                    <p className="text-base font-bold text-zinc-950 dark:text-white">
                      Still have a question?
                    </p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Write to us, we read every message.
                    </p>
                  </div>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
                  >
                    <Mail className="size-4" />
                    Contact us
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex w-full flex-col gap-4 lg:col-span-7 lg:pt-8">
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
    </MotionConfig>
  );
}