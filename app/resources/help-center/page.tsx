"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Zap,
  CreditCard,
  Mic2,
  Code2,
  Shield,
  Wrench,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  Clock,
  Globe,
  Volume2,
  KeyRound,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── CATEGORIES ───
const CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting Started",
    desc: "API keys, first steps, SDK setup",
    icon: Zap,
    color: "#c9a87c",
    articles: [
      "How do I create an API key?",
      "Which SDK should I use?",
      "First TTS request in 60 seconds",
      "Understanding the dashboard",
      "Webhook setup guide",
    ],
  },
  {
    id: "billing",
    title: "Billing & Usage",
    desc: "Credits, invoices, limits, plans",
    icon: CreditCard,
    color: "#10b981",
    articles: [
      "How does pay-as-you-go billing work?",
      "Where can I see my usage?",
      "How to top up credits",
      "Volume discounts explained",
      "Enterprise invoicing",
    ],
  },
  {
    id: "voice",
    title: "Voice & Audio",
    desc: "Cloning, languages, quality, tuning",
    icon: Mic2,
    color: "#0ea5e9",
    articles: [
      "How to clone a voice",
      "Supported languages & accents",
      "Adjusting tone and speed",
      "Audio format options (MP3, WAV, OGG)",
      "Best practices for voice samples",
    ],
  },
  {
    id: "api",
    title: "API & Integration",
    desc: "gRPC, REST, SDKs, errors",
    icon: Code2,
    color: "#8b5cf6",
    articles: [
      "REST vs gRPC: which to choose?",
      "Authentication & API keys",
      "Rate limits & throttling",
      "Common error codes",
      "Streaming audio in real-time",
    ],
  },
  {
    id: "security",
    title: "Account & Security",
    desc: "Keys, teams, compliance, privacy",
    icon: Shield,
    color: "#f43f5e",
    articles: [
      "How to rotate an API key",
      "Team member access control",
      "SOC 2 & compliance overview",
      "Voice cloning privacy policy",
      "Two-factor authentication",
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    desc: "Errors, latency, audio issues",
    icon: Wrench,
    color: "#78716c",
    articles: [
      "Audio is choppy or distorted",
      "High latency: what to check",
      "Voice cloning failed: common causes",
      "API returns 429 (rate limited)",
      "Webhook not firing",
    ],
  },
];

// ─── POPULAR ARTICLES (flat list for search) ───
const ALL_ARTICLES = CATEGORIES.flatMap((cat) =>
  cat.articles.map((title) => ({ title, category: cat.title, catId: cat.id, color: cat.color }))
);

const POPULAR = [
  { title: "How do I create an API key?", category: "Getting Started", catId: "getting-started", color: "#c9a87c" },
  { title: "How does pay-as-you-go billing work?", category: "Billing & Usage", catId: "billing", color: "#10b981" },
  { title: "How to clone a voice", category: "Voice & Audio", catId: "voice", color: "#0ea5e9" },
  { title: "REST vs gRPC: which to choose?", category: "API & Integration", catId: "api", color: "#8b5cf6" },
  { title: "Audio is choppy or distorted", category: "Troubleshooting", catId: "troubleshooting", color: "#78716c" },
];

// ─── FAQ DATA ───
const FAQS = [
  {
    q: "What is Miralas TTS?",
    a: "Miralas is an AI-powered text-to-speech platform built on open-source Chatterbox models. We convert text into natural, human-like speech with sub-200ms latency.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. Miralas uses a pay-as-you-go model. You start with $25 in free credit and only pay for what you use. No monthly fees, no commitments.",
  },
  {
    q: "How many languages are supported?",
    a: "28+ languages including Uzbek, Kazakh, Azerbaijani, and all major world languages. We built Uzbek and four other low-resource languages from scratch.",
  },
  {
    q: "Can I use my own voice?",
    a: "Yes. Our Voice Cloning feature needs just 10 seconds of clean audio. Upload it in the Studio and your custom voice is ready in under a minute.",
  },
  {
    q: "What is the difference between REST and gRPC?",
    a: "REST is simpler and works everywhere. gRPC is faster (sub-50ms) and supports bidirectional streaming — ideal for live voice agents and real-time applications.",
  },
  {
    q: "Is my data secure?",
    a: "All API traffic uses TLS 1.3. API keys are scoped and revocable. Voice embeddings are stored with AES-256 encryption. We are SOC 2 Type II compliant.",
  },
];

// ─── COMPONENTS ───

function SearchBar({ query, setQuery }: { query: string; setQuery: (s: string) => void }) {
  return (
    <div className="relative max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#a8a095] pointer-events-none" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for answers, topics, or keywords..."
        className="w-full h-12 rounded-full bg-white border border-[#e8e0d5] pl-11 pr-4 text-sm text-[#2d2a26] outline-none focus:border-[#c9a87c] focus:ring-1 focus:ring-[#c9a87c]/20 transition-all placeholder:text-[#a8a095] shadow-sm"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8a095] hover:text-[#2d2a26] text-xs"
        >
          Clear
        </button>
      )}
    </div>
  );
}

function CategoryCard({ cat, index }: { cat: (typeof CATEGORIES)[0]; index: number }) {
  const Icon = cat.icon;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group rounded-2xl border border-[#e8e0d5]/60 bg-white overflow-hidden hover:border-[#c9a87c]/30 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] transition-all duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
          style={{
            backgroundColor: `${cat.color}10`,
            borderColor: `${cat.color}20`,
            color: cat.color,
          }}
        >
          <Icon className="size-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#2d2a26] group-hover:text-[#c9a87c] transition-colors">
            {cat.title}
          </h3>
          <p className="text-xs text-[#a8a095] mt-0.5">{cat.desc}</p>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#a8a095] shrink-0"
        >
          <ChevronRight className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-[#e8e0d5]/40 mb-3" />
              <ul className="space-y-1">
                {cat.articles.map((article) => (
                  <li key={article}>
                    <Link
                      href={`/help/${cat.id}/${article.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#5c5548] hover:bg-[#faf6f0] hover:text-[#2d2a26] transition-colors"
                    >
                      <FileText className="size-3.5 text-[#a8a095] shrink-0" />
                      <span className="truncate">{article}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqAccordion({ faqs }: { faqs: typeof FAQS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={cn(
              "rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-[#e8e0d5] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                : "border-[#e8e0d5]/60 bg-white hover:border-[#e8e0d5]"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                    isOpen ? "bg-[#2d2a26] text-white" : "bg-[#faf6f0] text-[#a8a095]"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("text-sm font-semibold", isOpen ? "text-[#2d2a26]" : "text-[#5c5548]")}>
                  {faq.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#faf6f0] text-[#a8a095]"
              >
                <ChevronDown className="size-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gradient-to-r from-[#e8e0d5] to-transparent mb-4 ml-9" />
                    <p className="ml-9 text-sm leading-relaxed text-[#8a8278] max-w-2xl">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── MAIN PAGE ───
export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_ARTICLES.filter((a) => a.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2d2a26] font-sans selection:bg-[#c9a87c]/30">
      <Header variant="light" />

      {/* Hero */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a87c]/[0.04] blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a8278]">
              <Clock className="size-3" />
              24/7 Self-Service
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2d2a26] mb-4"
          >
            How can we help you?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-[#8a8278] max-w-lg mx-auto mb-8 leading-relaxed"
          >
            Search our knowledge base for instant answers. If you can't find what you need, our team is one message away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SearchBar query={query} setQuery={setQuery} />
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      <AnimatePresence>
        {query.trim() && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto max-w-3xl px-6 mb-12 overflow-hidden"
          >
            <div className="rounded-2xl border border-[#e8e0d5]/60 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a8a095] mb-3">
                {filtered.length} results for "{query}"
              </h3>
              {filtered.length > 0 ? (
                <ul className="space-y-1">
                  {filtered.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={`/help/${item.catId}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#faf6f0] transition-colors"
                      >
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-[#2d2a26] font-medium">{item.title}</span>
                        <span className="text-[11px] text-[#a8a095] ml-auto shrink-0">{item.category}</span>
                        <ChevronRight className="size-3.5 text-[#a8a095] shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="size-5 text-[#a8a095] mx-auto mb-2" />
                  <p className="text-sm text-[#8a8278]">No results found. Try different keywords.</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Popular Articles */}
        {!query.trim() && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="size-4 text-[#c9a87c]" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a8a095]">
                Most Popular
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={`/help/${item.catId}`}
                    className="group flex items-center gap-3 rounded-xl border border-[#e8e0d5]/60 bg-white p-4 hover:border-[#c9a87c]/30 hover:shadow-sm transition-all duration-200"
                  >
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#2d2a26] group-hover:text-[#c9a87c] transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#a8a095]">{item.category}</p>
                    </div>
                    <ChevronRight className="size-4 text-[#e8e0d5] group-hover:text-[#c9a87c] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Categories Grid */}
        {!query.trim() && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a8a095]">
                Browse by Topic
              </h2>
              <span className="text-xs text-[#a8a095]">{CATEGORIES.length} categories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="size-4 text-[#c9a87c]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a8a095]">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion faqs={FAQS} />
        </section>

        {/* Still need help CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-[#e8e0d5]/60 bg-white p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/50 to-transparent" />
          <div className="relative z-10">
            <MessageSquare className="size-6 text-[#a8a095] mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-[#2d2a26] mb-2">Still need help?</h3>
            <p className="text-sm text-[#8a8278] max-w-md mx-auto mb-6">
              Can't find what you're looking for? Our support team is available 24/7 and usually responds within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/support"
                className="inline-flex items-center gap-2 rounded-full bg-[#2d2a26] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1c1917] transition-colors"
              >
                <MessageSquare className="size-4" />
                Open a Ticket
              </Link>
              <a
                href="mailto:support.miransas"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] px-6 py-3 text-sm font-medium text-[#5c5548] hover:bg-[#faf6f0] transition-colors"
              >
                support.miransas
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}