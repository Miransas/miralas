/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        ease,
        delay: index * 0.04,
      }}
      className="relative"
    >
      <div
        className={`
          overflow-hidden rounded-2xl border transition-colors duration-200
          ${
            isOpen
              ? "border-border  shadow-sm"
              : "border-transparent border-b-border dark:bg-black bg-[#efefef] gap-1"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex min-h-14 w-full items-center justify-between gap-5 px-4 py-4 text-left sm:min-h-16 sm:px-6"
        >
          <span
            className={`
              pr-4 text-[15px] leading-6 sm:text-[17px] sm:leading-7
              ${
                isOpen
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground/90"
              }
            `}
          >
            {item.question}
          </span>

          <motion.span
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
            transition={{
              duration: 0.22,
              ease,
            }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground"
          >
            <ChevronDown
              className="size-4"
              strokeWidth={1.8}
            />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                height: {
                  duration: 0.28,
                  ease,
                },
                opacity: {
                  duration: 0.18,
                  ease,
                },
              }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-6 pt-0 sm:px-6">
                <p className="max-w-3xl pr-10 text-[14px] leading-7 text-muted-foreground sm:text-[15px]">
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
    <section className="bg-background py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Sol Kolon: Başlık ve İllüstrasyon */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:col-span-5">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Everything you need to know
            </h2>

            <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Reach out to our
              support team and we&apos;ll get back to you within 24 hours.
            </p>

            <RobotEyes/>
          </div>

          {/* Sağ Kolon: Akordeon ve Destek Kutusu */}
          <div className="flex w-full flex-col lg:col-span-7">
            <div className="divide-y divide-border/60 rounded-2xl border border-border bg-card p-2 sm:p-4 shadow-sm">
              {FAQS.map((faq, i) => (
                <FaqAccordionItem
                  key={faq.question}
                  item={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex((current) =>
                      current === i ? null : i,
                    )
                  }
                />
              ))}
            </div>

            {/* Destek Kartı */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.45,
                ease,
              }}
              className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-7 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-foreground">
                  Still have questions?
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Our team is here to help you get started with Miralas TTS.
                </p>
              </div>

              <a
                href="mailto:support@miralas.com"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground shadow-sm transition-colors duration-200 hover:opacity-80"
              >
                <Mail
                  className="size-4 text-muted-foreground"
                  strokeWidth={1.75}
                />
                Contact Support
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
