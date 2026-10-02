"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  LifeBuoy,
  ArrowUpRight,
  MessageSquareText,
  Mail,
  ChevronRight,
  Plus
} from "lucide-react";
import { popularFaqs, supportCategories } from "../../constants/resources/support";


export default function SupportSections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = popularFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 ">
      
      {/* Hero / Arama Bölümü */}
      <section className="relative px-6 pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <LifeBuoy className="size-3.5 text-[#c9a87c]" />
          <span>Miralas Support Center</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-6">
          How can we <span className="italic text-muted-foreground">help you?</span>
        </h1>
        <p className="text-muted-foreground font-light text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Search our documentation, look through frequently asked questions, or reach out to the Miralas engineering team.
        </p>

        {/* Minimalist ve Zarif Arama Kutusu */}
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles, guides, or terms..."
            className="w-full dark:bg-accent bg-[#efefef] backdrop-blur-md border border-border/50 rounded-full py-5 pl-16 pr-16 text-lg font-light text-foreground focus:outline-none focus:border-[#c9a87c]/50 focus:bg-card/80 transition-all placeholder:text-muted-foreground "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Destek Kategorileri Grid Yapısı */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Categories
          </h2>
          <p className="text-xl font-light text-foreground tracking-tight">
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
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/40 dark:bg-card/20 bg-[#efefef] hover:bg-card/40 hover:border-border/80 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-foreground group-hover:scale-105 transition-transform">
                      <Icon className="size-4" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/30">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-foreground group-hover:text-[#c9a87c] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/30 flex items-center justify-between text-xs font-light text-muted-foreground">
                  <span className="group-hover:text-foreground transition-colors">Explore topic</span>
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sık Sorulan Sorular (FAQ) Bölümü */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light text-foreground mb-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Quick answers to common questions about Miralas.
          </p>
        </div>

        <div className="space-y-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl dark:bg-card/20 bg-[#efefef] border border-border/40 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-card/40 transition-colors"
                  >
                    <span className="text-base font-medium text-foreground">{faq.question}</span>
                    <div className="p-1 rounded-full border border-border/30 group-hover:border-border/80 transition-colors shrink-0">
                      <Plus className={`size-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm font-light leading-relaxed text-muted-foreground">
                      <p className="mb-4">{faq.answer}</p>
                      <Link
                        href={faq.href}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-[#c9a87c] transition-colors"
                      >
                        <span>Learn more</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 border border-dashed border-border/50 rounded-3xl bg-card/10">
              <Search className="size-6 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-light text-muted-foreground">No matching questions found for "{searchQuery}".</p>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Destek / İletişim Kartı */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="p-10 md:p-12 rounded-[2rem] dark:bg-[#020202] bg-[#efefef] border border-border/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-border/50 text-muted-foreground text-[10px] font-semibold uppercase tracking-wider mb-4">
              <MessageSquareText className="size-3.5" />
              <span>Dedicated Support</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              Need direct assistance for your organization?
            </h2>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Our engineering and customer success teams are ready to help you set up custom voice models and enterprise security configurations.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/resources/help-center"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
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