"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  Plus,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  ChevronDown
} from "lucide-react";
import { CATEGORIES, HelpFaqs } from "../../constants/resources/help-center";
import SmoothScroll from "../providers/SmoothScroll";

// ─── DATA ───
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

// ─── COMPONENTS ───

function SearchBar({ query, setQuery }: { query: string; setQuery: (s: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-zinc-950 dark:group-focus-within:text-white transition-colors" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for guides, API endpoints, or billing..."
        className="w-full bg-white dark:bg-[#141210] rounded-[32px] py-5 pl-16 pr-16 text-lg font-medium text-zinc-950 dark:text-white focus:outline-none focus:ring-4 focus:ring-zinc-950/5 dark:focus:ring-white/5 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-sm"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white bg-[#F2F2F2] dark:bg-white/5 px-4 py-2 rounded-full transition-colors"
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
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group overflow-hidden rounded-[32px] bg-white dark:bg-[#141210] transition-colors duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-5 p-8 text-left focus:outline-none"
      >
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2F2F2] dark:bg-white/5 transition-colors"
          style={{ color: cat.color }}
        >
          <Icon className="size-5" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1 mt-1">
          <h3 className="text-[17px] font-bold text-zinc-950 dark:text-white transition-colors">
            {cat.title}
          </h3>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed pr-4">
            {cat.desc}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="p-1.5 rounded-full bg-[#F2F2F2] dark:bg-white/5 text-zinc-950 dark:text-white shrink-0 mt-1"
        >
          <Plus className="size-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0">
              <div className="mb-4 h-px bg-[#F2F2F2] dark:bg-white/5 ml-[68px]" />
              <ul className="space-y-1.5 ml-[68px]">
                {cat.articles.map((article) => (
                  <li key={article}>
                    <Link
                      href={`/help/${cat.id}/${article.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-[#F2F2F2] dark:hover:bg-white/5 hover:text-zinc-950 dark:hover:text-white"
                    >
                      <FileText className="size-4 shrink-0" />
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

function FaqAccordion({ faqs }: { faqs: typeof HelpFaqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="group rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden transition-colors duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-8 py-6 text-left focus:outline-none"
            >
              <span className="text-[17px] font-bold text-zinc-950 dark:text-white leading-snug">
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="shrink-0 text-zinc-900 dark:text-white"
              >
                <ChevronDown className="size-6" strokeWidth={2.5} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
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
export default function HelpCenter() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_ARTICLES.filter((a) => a.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F2F2F2] dark:bg-zinc-950 font-sans antialiased">
        
        {/* HERO / ARAMA BÖLÜMÜ */}
        <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
              <Clock className="size-3.5 text-zinc-950 dark:text-white" />
              24/7 Support Center
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-6 leading-[1.1]"
          >
            How can we <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">help?</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Search our knowledge base, explore API documentation, or get in touch with our engineering team.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <SearchBar query={query} setQuery={setQuery} />
          </motion.div>
        </section>

        {/* ARAMA SONUÇLARI */}
        <AnimatePresence>
          {query.trim() && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-auto max-w-3xl px-6 mb-16 overflow-hidden"
            >
              <div className="rounded-[32px] bg-white dark:bg-[#141210] p-8 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6">
                  {filtered.length} results for "{query}"
                </h3>
                {filtered.length > 0 ? (
                  <ul className="space-y-2">
                    {filtered.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={`/help/${item.catId}`}
                          className="flex items-center gap-4 rounded-2xl px-5 py-4 hover:bg-[#F2F2F2] dark:hover:bg-white/5 transition-colors group"
                        >
                          <span
                            className="size-2 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-base font-bold text-zinc-950 dark:text-white">{item.title}</span>
                          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-auto shrink-0">{item.category}</span>
                          <ChevronRight className="size-5 text-zinc-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="size-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
                    <p className="text-base font-medium text-zinc-500">No results found. Try alternative keywords.</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <main className="mx-auto max-w-5xl px-6 pb-32">
          
          {/* POPÜLER MAKALELER */}
          {!query.trim() && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-24"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Most Popular
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {POPULAR.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={`/help/${item.catId}`}
                      className="group flex flex-col gap-4 rounded-[32px] bg-white dark:bg-[#141210] p-8 hover:scale-[1.02] transition-transform duration-300 h-full shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          {item.category}
                        </span>
                        <span
                          className="size-2 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <p className="text-lg font-bold text-zinc-950 dark:text-white leading-snug">
                        {item.title}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* KATEGORİLER GRİDİ */}
          {!query.trim() && (
            <section className="mb-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Browse by Topic
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard key={cat.id} cat={cat} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* SSS (FAQ) */}
          <section className="mb-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-950 dark:text-white mb-10 tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={HelpFaqs} />
          </section>

          {/* ALT ÇAĞRI (Contact CTA) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="p-12 sm:p-16 rounded-[40px] bg-white dark:bg-[#141210] flex flex-col items-center shadow-sm">
              <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white mb-4 tracking-tight">
                Can't find what you're looking for?
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 mb-8 max-w-md leading-relaxed">
                Our engineering and support teams are available to help you build the future of voice.
              </p>
              <Link
                href="/resources/support"
                className="inline-flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                <span>Contact Support</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.section>
        </main>
      </div>
    </SmoothScroll>
  );
}