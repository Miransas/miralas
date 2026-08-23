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
    <div className="min-h-screen bg-white text-zinc-950 font-sans pt-24 pb-20">
      <Header variant="light"/>
      {/* Hero / Arama Bölümü */}
      <section className="relative px-6 pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-6">
            <LifeBuoy className="w-3.5 h-3.5 text-indigo-600" />
            <span>Miralas Help Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            How can we help you today?
          </h1>
          <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Search our documentation, look through frequently asked questions, or reach out to the Miralas team.
          </p>

          {/* Arama Kutusu */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or terms..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-zinc-200 bg-white shadow-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-base"
            />
          </div>

        </div>
      </section>

      {/* Destek Kategorileri Grid Yapısı */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Browse by Category
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
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
                className="group relative flex flex-col justify-between p-6 rounded-3xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-950/[0.03] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full border border-zinc-100">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900">
                  <span>Explore topic</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sık Sorulan Sorular (FAQ) Bölümü */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Quick answers to common questions about Miralas.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:border-zinc-300 transition-colors"
              >
                <h3 className="text-base font-semibold text-zinc-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  {faq.answer}
                </p>
                <Link
                  href={faq.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-200 rounded-2xl">
              <p className="text-zinc-500 text-sm">No matching questions found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Destek / İletişim Kartı */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-medium mb-4">
              <MessageSquareText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dedicated Support</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Need direct assistance for your organization?
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Our engineering and customer success teams are ready to help you set up custom voice models and enterprise security configurations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/resources/help-center"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-100 transition-colors shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
      <SupportTicket/>
   <div className="mt-10">
      <Footer/>
   </div>
    </div>
  );
}