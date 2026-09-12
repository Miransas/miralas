"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ShieldCheck,
  CreditCard,
  MessageSquareText,
  ArrowUpRight,
  LifeBuoy,
  FileText,
  Mail
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SupportTicket from "./ticket-support";
import Velaris from "./velaris";

const supportCategories = [
  {
    title: "Documentation & Guides",
    description: "Learn how to integrate Miralas APIs, TTS models, and voice cloning into your apps.",
    icon: BookOpen,
    href: "/resources/docs",
    count: "12 articles"
  },
  {
    title: "Security & Privacy",
    description: "Read about our compliance standards, data protection, and enterprise security policies.",
    icon: ShieldCheck,
    href: "https://privacy.miransas.com/miralas/security",
    count: "5 articles"
  },
  {
    title: "Billing & Subscriptions",
    description: "Manage your workspace plan, credit usage limits, invoices, and payment methods.",
    icon: CreditCard,
    href: "/pricing",
    count: "8 articles"
  },
  {
    title: "Voice Models & Terms",
    description: "Understand voice actor licensing, commercial usage rights, and terms of service.",
    icon: FileText,
    href: "https://privacy.miransas.com/miralas/terms",
    count: "6 articles"
  }
];

const popularFaqs = [
  {
    question: "How do I start cloning a voice with Miralas Studio?",
    answer: "Navigate to the Voice Clone section in your workspace, upload clean audio samples following our guidelines, and initiate the training pipeline.",
    href: "/resources/guides"
  },
  {
    question: "What are the rate limits for the Miralas TTS API?",
    answer: "Rate limits vary depending on your tier. Standard developer plans include up to 60 requests per minute, while enterprise plans offer custom throughput limits.",
    href: "/resources/docs"
  },
  {
    question: "How are commercial voice rights handled?",
    answer: "All generated or cloned assets used commercially must adhere to our platform licensing agreements and voice actor consent frameworks.",
    href: "https://privacy.miransas.com/miralas/terms"
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = popularFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-stone-900 dark:text-zinc-50 f pt-24 pb-20">
      <Header />
      
      {/* Hero / Arama Bölümü */}
      <section className="relative px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-white/10 dark:border-white/10 shadow-sm text-zinc-600 dark:text-zinc-300 text-xs font-medium mb-8">
            <LifeBuoy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Miralas Help Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6">
            How can we help you today?
          </h1>
          <p className="text-zinc-600 dark:stone-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Search our documentation, look through frequently asked questions, or reach out to the Miralas team.
          </p>

          {/* Arama Kutusu */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none stone-400 group-focus-within:text-green-500 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or terms..."
              className="w-full h-16 pl-12 pr-4 rounded-2xl bg-white dark:bg-black border border-white/10 dark:border-white/10 shadow-sm text-stone-900 dark:text-white placeholder:stone-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-green-500 dark:focus:border-green-500 transition-all text-base md:text-lg"
            />
          </div>
        </div>
      </section>

      {/* Destek Kategorileri Grid Yapısı */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="text-zinc-600 dark:stone-400 mt-2">
            Explore dedicated resources tailored to your workspace needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex flex-col justify-between p-6 rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-black  hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-2xl bg-zinc-50 dark:bg-black border border-white/10 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-700 bg-green-500 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-white/10 mb-2 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-zinc-500 dark:stone-400">
                  <span className="group-hover:text-indigo-600 dark:group-hover:text-green-400 transition-colors">Explore topic</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sık Sorulan Sorular (FAQ) Bölümü */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 dark:stone-400 mt-2">
            Quick answers to common questions about Miralas.
          </p>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-black shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all group"
              >
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-200 mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-zinc-600 dark:stone-400 leading-relaxed mb-5">
                  {faq.answer}
                </p>
                <Link
                  href={faq.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 dark:text-green-400 hover:text-indigo-700 dark:hover:text-green-300 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-white/10 dark:border-white/10 rounded-3xl bg-white/50 dark:bg-stone-900/20">
              <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 dark:stone-400 text-base font-medium">No matching questions found for "{searchQuery}".</p>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Destek / İletişim Kartı */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <Velaris height="400px" className="rounded-[2rem] border border-white/10 dark:border-white/10 bg-white dark:bg-black p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-white/10/50 dark:shadow-none">
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-black text-stone-700 dark:text-stone-300 text-xs font-bold mb-6 border border-indigo-100 dark:border-indigo-500/20">
              <MessageSquareText className="w-4 h-4" />
              <span>Dedicated Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-400 dark:text-white mb-4">
              Need direct assistance for your organization?
            </h2>
            <p className="text-zinc-600 dark:stone-400 text-base md:text-lg leading-relaxed">
              Our engineering and customer success teams are ready to help you set up custom voice models and enterprise security configurations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col mt-5 sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link
              href="/resources/help-center"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-sm hover:bg-zinc-800 dark:hover:bg-stone-200 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </Velaris>
      </section>

      <SupportTicket />
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}