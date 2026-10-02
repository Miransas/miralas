"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  Plus,
  MessageSquare,
  ArrowUpRight,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { CATEGORIES, HelpFaqs } from "../../constants/resources/help-center";
import SmoothScroll from "../providers/SmoothScroll";



function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for guides, API endpoints, or billing..."
        className="w-full bg-card/40 backdrop-blur-md border border-border/50 rounded-full py-5 pl-16 pr-16 text-lg font-light text-foreground focus:outline-none focus:border-[#c9a87c]/50 focus:bg-card/80 transition-all placeholder:text-muted-foreground shadow-2xl"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
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
      className="group overflow-hidden rounded-2xl bg-card/20 border border-border/40 hover:bg-card/40 hover:border-border/80 transition-all duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-6 text-left"
      >
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border border-border/50 transition-colors"
          style={{ color: cat.color }}
        >
          <Icon className="size-4" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1 mt-0.5">
          <h3 className="text-base font-medium text-foreground group-hover:text-[#c9a87c] transition-colors">
            {cat.title}
          </h3>
          <p className="text-sm font-light text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1 rounded-full border border-transparent group-hover:border-border/50 transition-colors shrink-0 mt-0.5"
        >
          <Plus className="size-4 text-muted-foreground" />
        </motion.div>
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
            <div className="px-6 pb-6 pt-0">
              <div className="mb-4 h-px bg-border/30 ml-14" />
              <ul className="space-y-1 ml-14">
                {cat.articles.map((article) => (
                  <li key={article}>
                    <Link
                      href={`/help/${cat.id}/${article.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-light text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      <FileText className="size-3.5 opacity-50 shrink-0" />
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
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="group rounded-2xl bg-card/20 border border-border/40 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-card/40 transition-colors"
            >
              <span className="text-base font-medium text-foreground">{faq.q}</span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="p-1 rounded-full border border-border/30 group-hover:border-border/80 transition-colors shrink-0"
              >
                <Plus className="size-4 text-muted-foreground" />
              </motion.div>
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
                  <p className="px-6 pb-6 text-sm font-light leading-relaxed text-muted-foreground max-w-3xl">
                    {faq.a}
                  </p>
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
      <div className="min-h-screen bg-background text-foreground selection:bg-muted selection:text-foreground">
        
        {/* HERO / ARAMA BÖLÜMÜ (Merkez Odaklı) */}
        <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center max-w-4xl mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Clock className="size-3 text-[#c9a87c]" />
              24/7 Support Center
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6"
          >
            How can we <span className="italic text-muted-foreground">help?</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-light text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
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
              <div className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md p-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {filtered.length} results for "{query}"
                </h3>
                {filtered.length > 0 ? (
                  <ul className="space-y-1">
                    {filtered.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={`/help/${item.catId}`}
                          className="flex items-center gap-4 rounded-2xl px-4 py-3 hover:bg-muted/50 transition-colors group"
                        >
                          <span
                            className="size-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                            style={{ backgroundColor: item.color, color: item.color }}
                          />
                          <span className="text-sm font-medium text-foreground">{item.title}</span>
                          <span className="text-xs font-light text-muted-foreground ml-auto shrink-0">{item.category}</span>
                          <ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="size-6 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm font-light text-muted-foreground">No results found. Try alternative keywords.</p>
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
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
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
                      className="group flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/20 p-6 hover:bg-card/40 hover:border-border/80 transition-all duration-300 h-full"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                          {item.category}
                        </span>
                        <span
                          className="size-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: item.color, color: item.color }}
                        />
                      </div>
                      <p className="text-base font-medium text-foreground group-hover:text-[#c9a87c] transition-colors">
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
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
            <h2 className="text-2xl font-light text-foreground mb-8 tracking-tight text-center">
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
            <div className="p-12 rounded-[2rem] bg-gradient-to-b from-card/30 to-transparent border border-border/40 flex flex-col items-center">
              <h2 className="text-2xl font-light text-foreground mb-4 tracking-tight">Can't find what you're looking for?</h2>
              <p className="text-sm font-light text-muted-foreground mb-8 max-w-md leading-relaxed">
                Our engineering and support teams are available to help you build the future of voice.
              </p>
              <Link
                href="/resources/support"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
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