"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  ["Does Miralas support Uzbek language?", "Yes. Uzbek support is a core priority, including natural pronunciation, Latin and Cyrillic workflows, and localized product details."],
  ["Can I generate voices for commercial products?", "Yes. Paid plans are designed for production use across apps, videos, education products and customer experiences."],
  ["How do donations work?", "Creators can share donation pages, accept supporter payments and connect voice content to campaign moments."],
  ["Is voice cloning available?", "Voice cloning is available with consent-focused verification and controls for safe usage."],
  ["Do you provide an API?", "Yes. Developers can integrate text-to-speech, voice generation and donation events through API-first workflows."],
  ["Can teams use dark and light mode dashboards?", "Yes. The product interface is designed to work beautifully in both themes for long working sessions."],
  ["Is Miralas suitable for education?", "Yes. Schools and edtech teams can create lessons, listening exercises and accessible audio content quickly."],
  ["Do you offer enterprise support?", "Enterprise customers can request dedicated onboarding, security review, custom usage limits and priority support."],
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-6 py-24 dark:bg-zinc-950 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Clear answers before you build.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            Everything teams usually ask about Uzbek voice generation, safety, API access and donation workflows.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map(([question, answer], index) => {
            const active = open === index;
            return (
              <div key={question} className="rounded-[22px] border border-zinc-200/80 bg-zinc-50/80 shadow-sm transition hover:border-zinc-300/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 rounded-[22px] px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-expanded={active}
                >
                  <span className="font-semibold text-zinc-950 dark:text-white">{question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm dark:bg-zinc-900 dark:text-zinc-200">
                    {active ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-7 text-zinc-600 dark:text-zinc-400">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
