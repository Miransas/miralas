'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, ShieldCheck, Cpu, Globe2, ArrowUpRight, Radio } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#F5F2EB] overflow-hidden transition-colors duration-500 antialiased">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-amber-500/5 dark:bg-white/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ── 1. MANIFESTO & HERO ── */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 shadow-sm">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Studio & Voice Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            We don't just synthesize voices.{' '}
            <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">
              We bring human emotion
            </span>{' '}
            to code.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal pt-2">
            Miransas was founded to break through the cold, synthetic sound of AI. With ultra-low-latency (under 100 ms) streaming infrastructure and deep learning models, we build natural-sounding voice experiences for global brands and creators.
          </p>
        </div>

        {/* ── 2. BENTO GRID SHOWCASE ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Live Voice Engine & Waveform (large, 7 columns) */}
          <div className="md:col-span-3 lg:col-span-7 flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
            
            <div className="space-y-4 relative z-10">
              <div className="size-10 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                <Radio className="size-5 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                Neural Stream Engine v3
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                Our deep neural networks process breathing pauses, emotional shifts, and intonation in speech within milliseconds.
              </p>
            </div>

            {/* Interactive simulated sound waves */}
            <div className="mt-12 pt-6 border-t border-[#EFECE6] dark:border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-end gap-1.5 h-12 w-full">
                {[40, 70, 25, 90, 60, 30, 85, 100, 45, 65, 80, 35, 95, 50, 75, 20, 85, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h}%`, `${Math.max(15, (h + 30) % 100)}%`, `${h}%`] }}
                    transition={{ repeat: Infinity, duration: 1.5 + (i % 3) * 0.4, ease: 'easeInOut' }}
                    className="w-full bg-zinc-900 dark:bg-white rounded-full opacity-80"
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 shrink-0 ml-4">
                192kbps HQ
              </span>
            </div>
          </div>

          {/* Card 2: Low-latency metric (small, 5 columns) */}
          <div className="md:col-span-3 lg:col-span-5 flex flex-col justify-between rounded-3xl p-8 sm:p-10 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xl relative overflow-hidden">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-zinc-900/10 text-[10px] font-bold uppercase tracking-wider">
                <Activity className="size-3 text-emerald-400 dark:text-emerald-600" />
                <span>Latency</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                &lt; 90 ms
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 leading-relaxed pt-2">
                Our global edge network enables real-time audio streaming at speeds imperceptible to the human ear.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-medium border-t border-white/10 dark:border-zinc-950/10 mt-6">
              <span>WebRTC & WebSocket Direct</span>
              <ArrowUpRight className="size-4" />
            </div>
          </div>

          {/* Kart 3: Global Edge & Security (4 Kolon) */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between rounded-3xl p-8 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="space-y-4">
              <div className="size-10 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                <ShieldCheck className="size-5 text-zinc-900 dark:text-white" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                Zero-Data Retention
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Your enterprise data and voice cloning models are never recorded without authorization or used to train public models.
              </p>
            </div>
          </div>

          {/* Kart 4: Language & Emotion Model (4 Kolon) */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between rounded-3xl p-8 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="space-y-4">
              <div className="size-10 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                <Globe2 className="size-5 text-zinc-900 dark:text-white" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                32+ Accents and Intonations
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Control natural accents, whispers, excitement, and professional intonation across all major languages—including Turkish—through a single API.
              </p>
            </div>
          </div>

          {/* Kart 5: Dedicated Infrastructure (4 Kolon) */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between rounded-3xl p-8 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="space-y-4">
              <div className="size-10 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                <Cpu className="size-5 text-zinc-900 dark:text-white" />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                Dedicated Cluster SLA
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                99.99% uptime and dedicated GPU clusters for organizations with high call volumes.
              </p>
            </div>
          </div>

        </div>

        {/* ── 3. METRICS & TRUST ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-[#EFECE6] dark:border-white/10">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">50M+</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Characters Synthesized Monthly</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">&lt; 90ms</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Average End-to-End Latency</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">32+</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Supported Languages Worldwide</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">%99.99</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Kurumsal Sunucu SLA</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;