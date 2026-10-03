/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, ArrowRight, Bot, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { PRICING_DATA } from "../../constants/pricing/pricing";

type TabType = "creative" | "agents" | "api";
type BillingCycle = "monthly" | "yearly";
type CardTheme = "default" | "indigo" | "rose" | "emerald" | "purple";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  theme?: CardTheme; 
  description: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  priceUnit?: string;
  subtext?: string;
  featuresTitle?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

// LÜKS RENK PALETİ HARİTASI
const THEME_STYLES: Record<CardTheme, any> = {
  default: {
    wrapper: "border border-border/60 bg-card/50 backdrop-blur-md hover:border-border",
    title: "text-foreground",
    desc: "text-muted-foreground",
    price: "text-foreground",
    unit: "text-muted-foreground",
    subtext: "text-[#c9a87c]",
    btn: "bg-muted/80 hover:bg-muted text-foreground border border-border/60",
    icon: "text-[#c9a87c]",
    feature: "text-foreground/90",
    divider: "border-border/40"
  },
  indigo: {
    wrapper: "bg-gradient-to-b from-indigo-600 via-indigo-700 to-slate-900 shadow-xl shadow-indigo-950/20 border border-indigo-400/30",
    title: "text-white",
    desc: "text-indigo-100/80",
    price: "text-white",
    unit: "text-indigo-200",
    subtext: "text-indigo-200 font-medium",
    btn: "bg-white text-slate-950 hover:bg-indigo-50",
    icon: "text-indigo-300",
    feature: "text-indigo-50",
    divider: "border-indigo-400/20"
  },
  rose: {
    wrapper: "bg-gradient-to-b from-rose-600 via-rose-700 to-slate-900 shadow-xl shadow-rose-950/20 border border-rose-400/30",
    title: "text-white",
    desc: "text-rose-100/80",
    price: "text-white",
    unit: "text-rose-200",
    subtext: "text-rose-200 font-medium",
    btn: "bg-white text-slate-950 hover:bg-rose-50",
    icon: "text-rose-300",
    feature: "text-rose-50",
    divider: "border-rose-400/20"
  },
  emerald: {
    wrapper: "bg-gradient-to-b from-emerald-600 via-emerald-800 to-slate-900 shadow-xl shadow-emerald-950/20 border border-emerald-400/30",
    title: "text-white",
    desc: "text-emerald-100/80",
    price: "text-white",
    unit: "text-emerald-200",
    subtext: "text-emerald-200 font-medium",
    btn: "bg-white text-slate-950 hover:bg-emerald-50",
    icon: "text-emerald-300",
    feature: "text-emerald-50",
    divider: "border-emerald-400/20"
  },
  purple: {
    wrapper: "bg-gradient-to-b from-purple-600 via-purple-800 to-slate-900 shadow-xl shadow-purple-950/20 border border-purple-400/30",
    title: "text-white",
    desc: "text-purple-100/80",
    price: "text-white",
    unit: "text-purple-200",
    subtext: "text-purple-200 font-medium",
    btn: "bg-white text-slate-950 hover:bg-purple-50",
    icon: "text-purple-300",
    feature: "text-purple-50",
    divider: "border-purple-400/20"
  }
};


export function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabType>('creative');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const currentPlans = PRICING_DATA[activeTab];

  const tabs = [
    { id: 'creative' as TabType, label: 'MiralasCreative', icon: Layers },
    { id: 'agents' as TabType, label: 'MiralasAgents', icon: Bot },
    { id: 'api' as TabType, label: 'MiralasAPI', icon: Cpu },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] dark:bg-background text-[#1C1917] dark:text-[#F5F2EB] overflow-hidden transition-colors duration-500 antialiased">
      {/* Lüks Ambient Arka Plan Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-amber-500/5 via-zinc-400/5 to-transparent dark:from-white/[0.03] dark:via-amber-500/[0.02] blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* ── ÜST BAŞLIK BÖLÜMÜ ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 shadow-sm">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Şeffaf & Esnek Ölçekleme</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            İhtiyacınıza uygun <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-950 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">gücü seçin</span>
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto">
            İster bireysel ses sentezi yapın, ister milyonlarca kullanıcıya hizmet veren AI ajansları işletin.
          </p>
        </div>

        {/* ── KONTROL PANELİ (SEGMENTED TABS & FATURA TOGGLE) ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-6 border-b border-[#EFECE6] dark:border-white/10">
          
          {/* ElevenLabs Tarzı Kayan Segmented Control */}
          <div className="relative flex items-center p-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full transition-colors duration-200 focus:outline-none z-10 ${
                    isActive
                      ? 'text-zinc-950 dark:text-zinc-950'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#FAF8F5] dark:bg-white rounded-full shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Fatura Periyodu Toggle (Aylık / Yıllık) */}
          <div className="flex items-center gap-3.5 bg-white/60 dark:bg-white/[0.02] px-4 py-2 rounded-full border border-[#EFECE6] dark:border-white/10 shadow-sm">
            <span
              className={`text-xs font-semibold transition-colors ${
                billingCycle === 'monthly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              Aylık
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-11 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors p-0.5 focus:outline-none"
              aria-label="Fatura periyodunu değiştir"
            >
              <motion.div
                animate={{ x: billingCycle === 'yearly' ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className="size-5 rounded-full bg-zinc-950 dark:bg-white shadow-md"
              />
            </button>

            <span
              className={`text-xs font-semibold flex items-center gap-2 transition-colors ${
                billingCycle === 'yearly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              <span>Yıllık Fatura</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                %20 İndirim
              </span>
            </span>
          </div>

        </div>

        {/* ── 4 KARTLI FİYATLANDIRMA GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {currentPlans.map((plan: PricingPlan) => {
              const isNumeric = typeof plan.monthlyPrice === 'number';
              const rawPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
              const activeTheme = THEME_STYLES[plan.theme || 'default'];

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${activeTheme.wrapper}`}
                >
                  {/* ÖNE ÇIKAN / POPÜLER BADGE */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full ${activeTheme.badge} text-[10px] font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Zap className="size-3 fill-current" />
                      <span>{plan.badge || 'En Popüler'}</span>
                    </div>
                  )}

                  <div>
                    {/* Kart Başlığı */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-bold tracking-tight ${activeTheme.title}`}>
                        {plan.name}
                      </h3>
                    </div>

                    {/* Açıklama */}
                    <p className={`text-xs leading-relaxed mb-6 min-h-[36px] ${activeTheme.desc}`}>
                      {plan.description}
                    </p>

                    {/* Fiyat Alanı */}
                    <div className="mb-8 pb-6 border-b border-inherit">
                      <div className="flex items-baseline gap-1">
                        {isNumeric && (
                          <span className={`text-2xl font-bold ${activeTheme.price}`}>$</span>
                        )}
                        <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${activeTheme.price}`}>
                          {rawPrice}
                        </span>
                        {plan.priceUnit && (
                          <span className={`text-xs font-medium ml-1 ${activeTheme.unit}`}>
                            {plan.priceUnit}
                          </span>
                        )}
                      </div>

                      {/* Subtext (Açıklama Notu) */}
                      {plan.subtext && (
                        <p className={`text-[11px] mt-2 ${activeTheme.subtext}`}>
                          {plan.subtext}
                        </p>
                      )}
                    </div>

                    {/* CTA Butonu */}
                    <Link
                      href={plan.ctaHref}
                      className={`group w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-xs font-bold transition-all duration-200 shadow-sm mb-8 ${activeTheme.btn}`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Özellikler Listesi */}
                    <div className="space-y-3">
                      {plan.featuresTitle && (
                        <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider block mb-4 ${activeTheme.desc}`}>
                          {plan.featuresTitle}
                        </span>
                      )}
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs font-normal">
                            <Check className={`size-4 shrink-0 mt-0.5 ${activeTheme.icon}`} />
                            <span className={`leading-snug ${activeTheme.feature}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

export default PricingSection;