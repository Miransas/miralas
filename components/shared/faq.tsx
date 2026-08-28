"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageCircle,
} from "lucide-react";

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

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
      transition={{ duration: 0.4, ease, delay: index * 0.05 }}
      // ❌ transition-all duration-200 kaldırıldı
      // ❌ animate/exit prop'ları kaldırıldı (dış kart statik olmalı)
      className={cn(
        isOpen
          ? "rounded-xl bg-white p-1 shadow-sm ring-1 ring-stone-200"
          : "border-b border-dotted border-stone-300 py-2 hover:border-stone-400"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 text-left",
          isOpen ? "px-5 py-4" : "py-3 px-1"
        )}
      >
        <span
          className={cn(
            "text-base font-normal transition-colors sm:text-[17px]",
            isOpen ? "font-medium text-stone-900" : "text-stone-900 hover:text-blue-600"
          )}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="flex shrink-0 items-center justify-center text-stone-400"
        >
          <ChevronDown className="size-4" strokeWidth={1.5} />
        </motion.span>
      </button>

      {/* ✅ Sadece içerik AnimatePresence ile yüksekliğini değiştirir */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1">
              <p className="text-[14px] leading-relaxed text-stone-600 sm:text-[15px]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 text-stone-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Sol Taraf: Görseldeki Temiz Başlık Yapısı */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:col-span-5">
            <h2 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Everything youneed to know
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone-500">
              Can&apos;t find what you&apos;re looking for? Reach out to our support
              team and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Sağ Taraf: Soru Listesi & Destek Bloğu */}
          <div className="flex w-full flex-col gap-1 lg:col-span-7">
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

            {/* Alt Destek Bloğu - Minimalist Açık Tema */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50/60 p-6 sm:flex-row sm:items-center sm:p-7"
            >
              <div>
                <p className="text-base font-medium text-stone-900">
                  Still have questions?
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Our team is here to help you get started with Miralas TTS.
                </p>
              </div>

              <a
                href="mailto:support@miralas.com"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 shadow-sm transition-all hover:bg-stone-100 hover:text-stone-950"
              >
                <Mail className="size-4 text-stone-600" strokeWidth={1.75} />
                Contact Support
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}