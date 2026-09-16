
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is Miralas TTS and how does it work?",
    answer:
      "Miralas TTS is an AI-powered text-to-speech platform that converts written text into natural, human-like speech. Our neural network models are trained on thousands of hours of human speech, allowing them to capture subtle nuances like intonation, emotion, and pacing. Simply send text via our API or web interface, and receive high-quality audio in seconds.",
  },
  {
    question: "How do I get started with the API?",
    answer:
      "Getting started is easy. Sign up for a free account at console.miralas.com, and you will instantly receive $25 in API credit. Generate an API key from your dashboard, install one of our official SDKs (Node.js, Python, Go, or Rust), and make your first request. Our documentation includes quick-start guides and copy-paste code examples.",
  },
  {
    question: "What is the pricing model? Do I need a subscription?",
    answer:
      "Miralas uses a pay-as-you-go model with no monthly subscriptions or hidden fees. You start with a $25 credit, and usage is billed per character synthesized. Volume discounts apply automatically as your usage grows. You can top up your balance anytime. Enterprise customers can opt for custom packages with dedicated infrastructure.",
  },
  {
    question: "How many languages and voices are supported?",
    answer:
      "We currently support 29+ languages with native accent accuracy. Our voice library includes 100+ distinct voices ranging from narrators and news anchors to energetic presenters and soft ASMR-style whispers. You can also clone your own voice with just 30 seconds of sample audio using our Voice Cloning feature.",
  },
  {
    question: "What makes Miralas different from other TTS providers?",
    answer:
      "Three things set us apart: (1) Our Rust-powered backend with gRPC streaming delivers sub-50ms latency — the fastest in the industry. (2) Our voice quality is trained on proprietary datasets for unmatched naturalness and emotional range. (3) Our pay-as-you-go model with $25 starting credit means you can start building immediately without committing to a subscription.",
  },
  {
    question: "Can I use Miralas for live streaming and real-time applications?",
    answer:
      "Absolutely. Our gRPC bidirectional streaming API is specifically designed for real-time use cases like live donation reads, IVR systems, and interactive voice agents. With an average latency of under 50ms, audio is generated and delivered almost instantaneously, making it perfect for time-sensitive applications.",
  },
  {
    question: "Is my data secure? What about voice cloning privacy?",
    answer:
      "Security is our top priority. All API requests use TLS 1.3 encryption. API keys are scoped and revocable. For voice cloning, we require explicit consent verification and store voice embeddings using AES-256 encryption. We are SOC 2 Type II compliant and never use your cloned voices for training or any purpose other than your own API requests.",
  },
  {
    question: "Do you offer support for developers and enterprises?",
    answer:
      "Yes. All users have access to our comprehensive documentation, community Discord, and GitHub examples. Pro plan users receive email support with a 48-hour response guarantee. Enterprise customers get a dedicated Slack channel, quarterly architecture reviews, and a 99.99% uptime SLA with dedicated support engineers.",
  },
];

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
      {/* Stable outer geometry: no padding/border changes when opening */}
      <div
        className={`
          overflow-hidden rounded-xl border transition-colors duration-200
          ${
            isOpen
              ? "border-border bg-card"
              : "border-transparent border-b-border bg-transparent"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`
            flex min-h-14 w-full items-center justify-between
            gap-5 px-1 py-4 text-left sm:min-h-15 sm:px-2
          `}
        >
          <span
            className={`
              pr-4 text-[15px] leading-6 sm:text-[17px] sm:leading-7
              ${
                isOpen
                  ? "font-medium text-foreground"
                  : "font-normal text-foreground/90"
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
              strokeWidth={1.6}
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
              <div className="px-1 pb-5 pt-0 sm:px-2">
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
          {/* Left */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:col-span-5">
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Everything you need to know
            </h2>

            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Reach out to our
              support team and we&apos;ll get back to you within 24 hours.
            </p>

            <img
              src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1789247452/sinir_kqen8j.png"
              alt="FAQ illustration"
              loading="lazy"
              className="mt-8 w-full max-w-md rounded-2xl object-cover"
            />
          </div>

          {/* Right */}
          <div className="flex w-full flex-col lg:col-span-7">
            <div className="divide-y divide-dotted divide-border">
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

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.45,
                ease,
              }}
              className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl border border-border bg-muted/40 p-6 sm:flex-row sm:items-center sm:p-7"
            >
              <div>
                <p className="text-base font-medium text-foreground">
                  Still have questions?
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Our team is here to help you get started with Miralas TTS.
                </p>
              </div>

              <a
                href="mailto:support@miralas.com"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-accent"
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

