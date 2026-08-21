/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Mail,
  ArrowUpRight,
} from "lucide-react";

// ============================================================
// FAQ DATA
// ============================================================
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

// ============================================================
// UTILS
// ============================================================
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// COMPONENTS
// ============================================================

/* ---- FAQ Accordion Item ---- */
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
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group rounded-2xl border transition-all duration-500 ease-out",
        isOpen
          ? "border-[#FAF9F6]/10 bg-stone-950 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)]"
          : "border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7"
      >
        <div className="flex items-start gap-4">
          {/* Numara Yuvarlağı — İnce detaylar eklendi */}
          <span
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300",
              isOpen
                ? "bg-[#FAF9F6]/10 text-[#FAF9F6] border border-[#FAF9F6]/5"
                : "bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          
          {/* Soru Başlığı — Tatlı beyaz uygulandı */}
          <span
            className={cn(
              "text-[15px] font-semibold leading-snug transition-colors duration-300 sm:text-base",
              isOpen ? "text-[#FAF9F6]" : "text-stone-700 group-hover:text-stone-900",
            )}
          >
            {item.question}
          </span>
        </div>

        {/* Sağdaki Ok Butonu */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen
              ? "bg-[#FAF9F6]/10 text-[#FAF9F6] border border-[#FAF9F6]/5"
              : "bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600",
          )}
        >
          <ChevronDown className="size-4" strokeWidth={2.5} />
        </motion.span>
      </button>

      {/* Açılan İçerik Alanı */}
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-7 sm:pb-7">
              {/* Çizgi düzeltildi — Siyah arka planda eriyen lüks premium çizgi */}
              <div className="mb-5 ml-10 h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-[#FAF9F6]/15 to-transparent" />
              
              {/* Cevap Metni — Yazı boyutu dengelendi ve yumuşatıldı */}
              <p className="ml-10 max-w-2xl text-[14px] sm:text-[15px] leading-[1.65] text-[#FAF9F6]/70">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Sol Resim / Illustration ---- */

function FaqIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
    >
      {/* Ambient glow — Premium sıcak ışık katıldı */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="size-80 rounded-full bg-amber-500/[0.04] blur-[100px] sm:size-96" />
      </div>

      {/* SVG Illustration */}
      <div className="relative z-10 w-full max-w-[340px]">
        <svg
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          {/* Outer rings — Tatlı beyaz ve hafif stone geçişleri */}
          <circle
            cx="210"
            cy="210"
            r="150"
            fill="#FAF9F6"
            fillOpacity="0.4"
            stroke="#e7e5e4"
            strokeWidth="1.2"
          />
          <circle
            cx="210"
            cy="210"
            r="120"
            fill="#FAF9F6"
            fillOpacity="0.7"
            stroke="#e7e5e4"
            strokeWidth="1"
          />

          {/* Center microphone body — stone-950 tabanlı lüks tasarım */}
          <rect
            x="185"
            y="145"
            width="50"
            height="85"
            rx="25"
            fill="#0c0a09" 
          />
          <rect
            x="195"
            y="125"
            width="30"
            height="45"
            rx="15"
            fill="#292524"
          />
          {/* Mikrofon Izgarası Detayı */}
          <line x1="195" y1="140" x2="225" y2="140" stroke="#d97706" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="195" y1="150" x2="225" y2="150" stroke="#d97706" strokeOpacity="0.2" strokeWidth="1" />
          
          <path
            d="M165 210C165 234.853 185.147 255 210 255C234.853 255 255 234.853 255 210"
            stroke="#0c0a09"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="210"
            y1="255"
            x2="210"
            y2="285"
            stroke="#0c0a09"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="185"
            y1="285"
            x2="235"
            y2="285"
            stroke="#0c0a09"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Animated sound waves */}
          <motion.path
            d="M75 210 Q100 165 125 210 Q150 255 175 210"
            stroke="#78716c"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M75 210 Q100 165 125 210 Q150 255 175 210",
                "M75 210 Q100 255 125 210 Q150 165 175 210",
                "M75 210 Q100 165 125 210 Q150 255 175 210",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M245 210 Q270 165 295 210 Q320 255 345 210"
            stroke="#78716c"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M245 210 Q270 165 295 210 Q320 255 345 210",
                "M245 210 Q270 255 295 210 Q320 165 345 210",
                "M245 210 Q270 165 295 210 Q320 255 345 210",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Decorative dots */}
          <circle cx="95" cy="115" r="4" fill="#e7e5e4" />
          <circle cx="325" cy="105" r="5" fill="#e7e5e4" />
          <circle cx="340" cy="295" r="3" fill="#e7e5e4" />
          <circle cx="85" cy="285" r="4" fill="#e7e5e4" />

          {/* Floating question marks — Tatlı beyaz (#FAF9F6) uygulandı */}
          <motion.g
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle
              cx="130"
              cy="85"
              r="24"
              fill="#FAF9F6"
              stroke="#e7e5e4"
              strokeWidth="1"
            />
            <text
              x="130"
              y="93"
              textAnchor="middle"
              fontSize="20"
              fontWeight="600"
              fill="#0c0a09"
              fontFamily="system-ui, sans-serif"
            >
              ?
            </text>
          </motion.g>
          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <circle
              cx="300"
              cy="75"
              r="20"
              fill="#FAF9F6"
              stroke="#e7e5e4"
              strokeWidth="1"
            />
            <text
              x="300"
              y="81"
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              fill="#0c0a09"
              fontFamily="system-ui, sans-serif"
            >
              ?
            </text>
          </motion.g>
          <motion.g
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <circle
              cx="320"
              cy="330"
              r="18"
              fill="#FAF9F6"
              stroke="#e7e5e4"
              strokeWidth="1"
            />
            <text
              x="320"
              y="336"
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill="#0c0a09"
              fontFamily="system-ui, sans-serif"
            >
              ?
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Bottom contact hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 mt-8 text-center"
      >
        <p className="text-sm text-stone-400">Still have questions?</p>
        <a
          href="mailto:support@miralas.com"
          className="group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-stone-950"
        >
          <Mail className="size-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
          Contact our team
          <ArrowUpRight className="size-3 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-950" />
        </a>
      </motion.div>
    </motion.div>
  );
}


// ============================================================
// MAIN FAQ SECTION
// ============================================================


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-[#FAF9F6] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* İki Sütunlu Grid Yapısı */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* SOL TARAFI DOLDURAN PREMIUM STICKY ALAN (12 piksellik gridin 5'ini kaplar) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Üst Küçük Etiket */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500 shadow-sm"
            >
              <HelpCircle className="size-3.5 text-stone-400" strokeWidth={2.5} />
              Frequently Asked Questions
            </motion.div>

            {/* Büyük Ana Başlık */}
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-[1.15]">
              Everything You Need to Know
            </h2>

            {/* Kısa Açıklama */}
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-500">
              Can&apos;t find what you&apos;re looking for? Reach out to our support
              team and we&apos;ll get back to you within 24 hours.
            </p>

            {/* İllüstrasyon — Başlığın hemen altına yerleşerek boşluğu tamamen yok eder */}
            <div className="mt-10 w-full hidden lg:block">
              <FaqIllustration />
            </div>
          </div>

          {/* SAĞ TARAFTAKİ SSS LİSTESİ (12 piksellik gridin 7'sini kaplar) */}
          <div className="flex flex-col gap-4 lg:col-span-7 w-full">
            {FAQS.map((faq, i) => (
              <FaqAccordionItem
                key={i}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}

            {/* En Alttaki Lüks Destek Kartı */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 rounded-2xl border border-[#FAF9F6]/10 bg-stone-950 p-8 text-center shadow-xl relative overflow-hidden"
            >
              {/* Arka plana çok hafif lüks bir parlama */}
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
              
              {/* İkon Yuvarlağı */}
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#FAF9F6]/10 border border-[#FAF9F6]/5">
                <MessageCircle className="size-5 text-[#FAF9F6]" strokeWidth={2} />
              </div>
              
              <p className="text-base font-semibold text-[#FAF9F6]">
                Still have questions?
              </p>
              <p className="mt-1.5 text-sm text-[#FAF9F6]/60 max-w-sm mx-auto">
                Our team is here to help you get started with Miralas TTS.
              </p>
              
              {/* Buton — Tatlı beyaz arka plan, koyu yazı (Premium zıtlık) */}
              <a
                href="mailto:support@miralas.com"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FAF9F6] px-6 py-3 text-sm font-semibold text-stone-950 transition-all duration-200 hover:bg-[#FAF9F6]/90 hover:shadow-lg hover:shadow-black/20"
              >
                <Mail className="size-4" strokeWidth={2} />
                Contact Support
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
