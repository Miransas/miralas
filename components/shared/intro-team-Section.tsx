'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrbitShader from '../shaders/orbit-shader';

const metrics = [
  {
    title: 'Call handling',
    value: 99,
    displayValue: '99%',
    description: 'Every call greeted, qualified and routed correctly.',
  },
  {
    title: 'Scheduling accuracy',
    value: 98,
    displayValue: '98%',
    description: 'Books against live availability — no double bookings.',
  },
  {
    title: 'Caller sentiment',
    value: 95,
    displayValue: '95% positive',
    description: 'Measured from real call transcripts, every week.',
  },
  {
    title: 'Shift coverage',
    value: 100,
    displayValue: '100%',
    description: 'No lunch breaks, no time off, no turnover.',
  },
];

export default function IntroTeammateSection() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? 'dark' : ''}>
      <section className="relative transition-colors duration-500 bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white py-24 px-6 md:px-16 flex flex-col justify-center items-center min-h-screen overflow-hidden selection:bg-blue-600 selection:text-white">
        


        {/* Kraliyet Mavisi Arka Plan Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0044ff] opacity-20 dark:opacity-25 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
          
          {/* SOL TARAF: Telefon Card & Canlı Glow Küre */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] bg-white/70 dark:bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-[36px] p-5 shadow-[0_20px_50px_rgba(0,102,255,0.15)] dark:shadow-[0_20px_60px_rgba(0,68,255,0.3)] transition-all duration-500">
              
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-widest px-1">
                <span>SASSONE STAFF</span>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  On shift
                </div>
              </div>

              {/* Kraliyet Mavisi Glow Canlı Orb */}
              <div className="relative h-64 flex items-center justify-center my-4">
                {/* Dış Halka Glow Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-44 h-44 rounded-full bg-[#0055ff] blur-2xl opacity-70"
                />

                {/* Ana Dönen Küre (Royal Blue & Deep Purple Gradient) */}
                <OrbitShader/>
              </div>

              {/* Alt Bilgi Kartı */}
              <div className="bg-slate-100/80 dark:bg-[#131826]/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-2.5 shadow-inner transition-colors duration-500">
                <div>
                  <div className="text-slate-900 dark:text-white font-bold text-base">SassOne</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Front Desk Teammate</div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">Inbound Calls</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shift</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">24 / 7 / 365</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reports to</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">You</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sick days taken</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">0</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  <span>ID · TC-9001</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">NEVER EXPIRES</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Başlık, Metin ve Canlı Progress Barları */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tag / Badge */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-500 bg-slate-200/60 border-slate-300 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
              Meet The Teammate
            </div>

            {/* Ana Başlık */}
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              The teammate that’s always on the <span className="text-slate-400 dark:text-slate-500">clock.</span>
            </h2>

            {/* Açıklama */}
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              Unlike voicemail or basic answering services, your AI receptionist works like a trained member of your team. It answers every call, follows your workflows, books appointments, and delivers consistent customer service—24 hours a day.
            </p>

            {/* Metrikler & Kraliyet Mavisi Live Glow Progress Barları */}
            <div className="space-y-6 pt-2">
              {metrics.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{item.title}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{item.displayValue}</span>
                  </div>

                  {/* Progress Track */}
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-[#111622] rounded-full overflow-hidden p-[1px] border border-slate-300/50 dark:border-slate-800">
                    {/* Canlı Dolum Barı + Kraliyet Mavisi Glow Shadow */}
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 1.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0038ff] via-[#0055ff] to-[#3b82f6] shadow-[0_0_16px_rgba(0,85,255,0.95)]"
                    />
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}