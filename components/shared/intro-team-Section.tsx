'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import OrbitShader from '../shaders/orbit-shader';

// Marka rengi gelince sadece burayı değiştir.
const ACCENT = {
  bar: 'bg-slate-900 dark:bg-white',
  headline:
    'bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500',
};

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
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.65, delay, ease: 'easeOut' as const },
        };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 py-24 text-slate-900 transition-colors duration-500 selection:bg-slate-900 selection:text-white dark:bg-[#050505] dark:text-white dark:selection:bg-white dark:selection:text-black md:px-16">
      {/* Çok hafif, nötr ambient ışık (sadece dark'ta) */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[100px] dark:block" />

      <div className="z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* SOL: Telefon kartı */}
        <motion.div {...reveal(0.1)} className="flex justify-center lg:col-span-5">
          <div className="relative w-full max-w-[340px] rounded-[36px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)] transition-colors duration-500 dark:border-white/10 dark:bg-[#0c0c0e] dark:shadow-none">
            {/* Header */}
            <div className="flex items-center justify-between px-1 font-mono text-[10px] tracking-widest text-slate-400 dark:text-slate-500">
              <span>SASSONE STAFF</span>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-sans text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                On shift
              </div>
            </div>

            {/* Orb: glow yok, shader kendi başına duruyor */}
            <div className="relative my-4 flex h-64 items-center justify-center">
              <OrbitShader />
            </div>

            {/* Alt bilgi kartı */}
            <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.03]">
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  SassOne
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Front Desk Teammate
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-200 pt-2 text-[11px] dark:border-white/10">
                {[
                  ['Department', 'Inbound Calls'],
                  ['Shift', '24 / 7 / 365'],
                  ['Reports to', 'You'],
                  ['Sick days taken', '0'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 font-mono text-[10px] text-slate-400 dark:border-white/10 dark:text-slate-500">
                <span>ID · TC-9001</span>
                <span className="font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                  NEVER EXPIRES
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SAĞ: Başlık, metin, progress */}
        <div className="space-y-7 lg:col-span-7">
          <motion.div
            {...reveal(0.15)}
            className="inline-flex items-center rounded-full border border-slate-300 bg-slate-200/60 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            Meet The Teammate
          </motion.div>

          <motion.h2
            {...reveal(0.2)}
            className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            The teammate that’s always on the{' '}
            <span
              className={`inline-block bg-clip-text text-transparent ${ACCENT.headline}`}
            >
              clock.
            </span>
          </motion.h2>

          <motion.p
            {...reveal(0.25)}
            className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-[#6E6E74] md:text-base"
          >
            Unlike voicemail or basic answering services, your AI receptionist works
            like a trained member of your team. It answers every call, follows your
            workflows, books appointments, and delivers consistent customer
            service—24 hours a day.
          </motion.p>

          <div className="space-y-6 pt-2">
            {metrics.map((item, index) => (
              <motion.div
                key={item.title}
                {...reveal(0.3 + index * 0.08)}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-[#6E6E74]">
                    {item.displayValue}
                  </span>
                </div>

                {/* Track: gölge yok, sadece ince çizgi */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <motion.div
                    role="progressbar"
                    aria-label={item.title}
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    initial={{ width: shouldReduceMotion ? `${item.value}%` : '0%' }}
                    whileInView={
                      shouldReduceMotion ? undefined : { width: `${item.value}%` }
                    }
                    viewport={{ once: true, amount: 0.8 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 1.4,
                            delay: index * 0.15,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    className={`h-full rounded-full ${ACCENT.bar}`}
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-[#6E6E74]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}