"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  [
    "Does Miralas support Uzbek language?",
    "Yes. Uzbek support is a core priority, including natural pronunciation, Latin and Cyrillic workflows, and localized product details.",
  ],
  [
    "Can I generate voices for commercial products?",
    "Yes. Paid plans are designed for production use across apps, videos, education products and customer experiences.",
  ],
  [
    "How do donations work?",
    "Creators can share donation pages, accept supporter payments and connect voice content to campaign moments.",
  ],
  [
    "Is voice cloning available?",
    "Voice cloning is available with consent-focused verification and controls for safe usage.",
  ],
  [
    "Do you provide an API?",
    "Yes. Developers can integrate text-to-speech, voice generation and donation events through API-first workflows.",
  ],
  [
    "Can teams use dark and light mode dashboards?",
    "Yes. The product interface is designed to work beautifully in both themes for long working sessions.",
  ],
  [
    "Is Miralas suitable for education?",
    "Yes. Schools and edtech teams can create lessons, listening exercises and accessible audio content quickly.",
  ],
  [
    "Do you offer enterprise support?",
    "Enterprise customers can request dedicated onboarding, security review, custom usage limits and priority support.",
  ],
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-background px-6 py-28 sm:py-36 lg:px-8">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.035] blur-[120px] dark:bg-emerald-400/[0.055]" />
        <div className="absolute bottom-[-15%] right-[-5%] h-[380px] w-[380px] rounded-full bg-sky-500/[0.025] blur-[120px] dark:bg-sky-400/[0.035]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* LEFT */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/15 dark:bg-emerald-400/[0.06] dark:text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-current" />
              </span>
              FAQ
            </div>

            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.8rem]">
              Clear answers
              <br />
              <span className="text-muted-foreground/50">
                before you build.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">
              Everything teams usually ask about Uzbek voice generation,
              safety, API access and donation workflows.
            </p>

            {/* Decorative line */}
            <div className="mt-10 hidden h-px w-24 bg-gradient-to-r from-emerald-500/70 to-transparent lg:block" />

            <div className="mt-8 hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
                Still have questions?
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                We are building Miralas for creators and developers.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => {
              const active = open === index;

              return (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(index * 0.045, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group"
                >
                  <div
                    className={[
                      "relative overflow-hidden rounded-[22px] border transition-all duration-500",
                      active
                        ? "border-emerald-500/20 bg-card shadow-[0_20px_60px_-30px_rgba(16,185,129,0.28)] dark:border-emerald-400/15 dark:shadow-[0_20px_70px_-30px_rgba(16,185,129,0.16)]"
                        : "border-border/70 bg-card/60 hover:border-border hover:bg-card",
                    ].join(" ")}
                  >
                    {/* Active glow */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: active ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/[0.035] via-transparent to-transparent dark:from-emerald-400/[0.045]"
                    />

                    {/* Active left accent */}
                    <motion.div
                      initial={false}
                      animate={{
                        scaleY: active ? 1 : 0,
                        opacity: active ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute left-0 top-0 h-full w-[2px] origin-center bg-emerald-500 dark:bg-emerald-400"
                    />

                    <button
                      type="button"
                      onClick={() => setOpen(active ? -1 : index)}
                      aria-expanded={active}
                      className="relative flex w-full items-center gap-4 px-5 py-5 text-left outline-none sm:px-6 sm:py-6"
                    >
                      {/* Number */}
                      <span
                        className={[
                          "hidden size-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold tabular-nums transition-all duration-500 sm:flex",
                          active
                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground/50",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={[
                          "flex-1 text-[15px] font-semibold tracking-[-0.015em] transition-colors duration-300 sm:text-base",
                          active
                            ? "text-foreground"
                            : "text-foreground/85 group-hover:text-foreground",
                        ].join(" ")}
                      >
                        {question}
                      </span>

                      {/* Icon */}
                      <motion.span
                        animate={{
                          rotate: active ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={[
                          "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          active
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
                            : "border-border bg-muted/50 text-muted-foreground group-hover:border-border group-hover:bg-muted",
                        ].join(" ")}
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
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
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            },
                            opacity: {
                              duration: 0.25,
                              delay: 0.05,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:pl-[5.25rem] sm:pr-16">
                            <div className="h-px w-full bg-border/60" />

                            <p className="pt-5 text-sm leading-7 text-muted-foreground">
                              {answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom detail */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex items-center gap-3 px-2"
          >
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
              Miralas
            </span>
            <div className="h-px flex-1 bg-border/60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;