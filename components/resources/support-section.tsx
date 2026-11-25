"use client";

import { RevealHeading, RevealParagraph } from "@/components/motion/primitives";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LifeBuoy,
  ArrowUpRight,
  MessageSquareText,
  Mail,
  ChevronDown
} from "lucide-react";
import { popularFaqs, supportCategories } from "../../constants/resources/support";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SupportSections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = popularFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface-page text-text-heading pt-32 pb-24 font-sans antialiased transition-colors duration-(--motion-interaction-duration)">
      
      {/* Hero / search section */}
      <section className="relative px-6 pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-8 shadow-sm">
          <LifeBuoy className="size-3.5 text-text-heading" />
          <span>Miralas Support Center</span>
        </div>

        <RevealHeading as="h1" className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-heading mb-6 leading-[1.1]">
          How can we <span className="text-text-muted font-serif italic">help you?</span>
        </RevealHeading>
        <RevealParagraph className="text-lg text-text-primary max-w-xl mx-auto mb-12 leading-relaxed">
          Search our documentation, look through frequently asked questions, or reach out to the Miralas engineering team.
        </RevealParagraph>

        {/* Minimal, elegant search box */}
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-text-muted group-focus-within:text-zinc-950 dark:group-focus-within:text-white transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles, guides, or terms..."
            className="w-full bg-white dark:bg-surface-card rounded-4xl py-5 pl-16 pr-16 text-lg font-medium text-text-heading focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-3 transition-[color,background-color,border-color,box-shadow,opacity,transform] placeholder:text-text-muted shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted hover:text-zinc-950 dark:hover:text-white bg-surface-card dark:bg-white/5 px-4 py-2 rounded-full transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Support category grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <RevealHeading className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
            Categories
          </RevealHeading>
          <p className="text-2xl font-bold text-text-heading tracking-tight">
            Explore dedicated resources tailored to your workspace needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex flex-col justify-between p-8 rounded-4xl bg-white dark:bg-surface-card hover:scale-[1.02] transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-(--motion-interaction-duration) shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-2xl bg-surface-card dark:bg-white/5 flex items-center justify-center text-text-heading transition-transform">
                      <Icon className="size-5" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-bold text-text-muted bg-surface-card dark:bg-white/5 px-3 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  <RevealHeading as="h3" className="text-lg font-bold text-text-heading transition-colors mb-2">
                    {cat.title}
                  </RevealHeading>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-text-muted">
                  <span className="group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">Explore topic</span>
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-950 dark:group-hover:text-white transition-[color,background-color,border-color,box-shadow,opacity,transform]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Frequently asked questions */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <RevealHeading className="text-3xl font-bold text-text-heading mb-3 tracking-tight">
            Frequently Asked Questions
          </RevealHeading>
          <RevealParagraph className="text-base text-text-muted">
            Quick answers to common questions about Miralas.
          </RevealParagraph>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="group rounded-4xl bg-white dark:bg-surface-card overflow-hidden shadow-sm transition-colors duration-(--motion-interaction-duration)"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-8 py-4 text-left focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-3"
                  >
                    <span className="md:text-[17px] text-sm font-bold text-text-heading leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="shrink-0 text-text-heading"
                    >
                      <ChevronDown className="size-6" strokeWidth={2.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease },
                          opacity: { duration: 0.2, ease },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 text-[15px] text-text-muted leading-relaxed space-y-4">
                          <p>{faq.answer}</p>
                          <Link
                            href={faq.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-text-heading hover:opacity-80 transition-opacity"
                          >
                            <span>Learn more</span>
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 rounded-4xl bg-white dark:bg-surface-card shadow-sm">
              <Search className="size-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <RevealParagraph className="text-base font-medium text-text-muted">No matching questions found for "{searchQuery}".</RevealParagraph>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise support / contact card */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="p-10 md:p-16 rounded-[40px] bg-white dark:bg-surface-card flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm">
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card dark:bg-white/5 text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquareText className="size-4" />
              <span>Dedicated Support</span>
            </div>
            <RevealHeading className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-3">
              Need direct assistance for your organization?
            </RevealHeading>
            <RevealParagraph className="text-base text-text-muted leading-relaxed">
              Contact the team to discuss your use case and current product availability. Custom models and enterprise configurations are not confirmed public offerings.
            </RevealParagraph>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/resources/help-center"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-bold hover:scale-105 transition-transform"
            >
              <Mail className="size-4" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}