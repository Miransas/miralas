'use client';

import React from 'react';

export default function MomentumSection() {
  return (
    <section className="w-full dark:bg-[#050505] bg-background text-zinc-100 py-20 px-4 sm:px-6 md:px-8 transition-colors duration-500 antialiased selection:bg-cyan-500/30">
      <div className="max-w-[1280px] mx-auto border border-zinc-800/80 rounded-3xl dark:bg-[#0A0A0A]  overflow-hidden shadow-2xl">
        
        {/* ================= TOP SECTION: COMPARISON CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
          
          {/* Top left: traditional cleanup */}
          <div className="p-8 md:p-12 space-y-8 bg-[#070708]">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-zinc-100">
                Traditional Cleanup
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                Progress constantly stopping. Waiting for answers. Edge cases blocking everything.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              {/* Row 1 */}
              <div className="flex gap-[3px] overflow-hidden opacity-30">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-[3px] h-6 bg-zinc-400 rounded-full flex-shrink-0" />
                ))}
              </div>
              {/* Row 2 (partially saturated, blocked appearance) */}
              <div className="flex gap-[3px] overflow-hidden">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[3px] h-6 rounded-full flex-shrink-0 ${
                      i < 24 ? 'bg-zinc-300 opacity-80' : 'bg-zinc-800 opacity-40'
                    }`}
                  />
                ))}
              </div>
              {/* Row 3 */}
              <div className="flex gap-[3px] overflow-hidden opacity-20">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-[3px] h-6 bg-zinc-500 rounded-full flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>

          {/* Top right: catch up */}
          <div className="p-8 md:p-12 space-y-8 bg-[#070708]">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-zinc-100">
                Catch Up
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                Steady forward motion with intelligent checkpoints. Progress doesn't depend on perfection.
              </p>
            </div>

            {/* Bright cyan progress bar chart */}
            <div className="space-y-2 pt-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex gap-[3px] overflow-hidden">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[3px] h-6 animate-pulse bg-cyan-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= BOTTOM SECTION: VIDEO AND DESCRIPTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80 border-t border-zinc-800/80">
          
          {/* Bottom left: video area (purple.webm) */}
          <div className="relative min-h-[360px] md:min-h-[460px] bg-black flex items-center justify-center overflow-hidden  ">
            {/* Background grid pattern */}
            <video
              src="/videos/purple.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative  "
            />
          </div>

          {/* Bottom right: detailed copy */}
          <div className="p-8 md:p-14 space-y-6 bg-[#070708] flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-100">
              Momentum without waiting for perfect
            </h2>

            <div className="w-full h-px bg-zinc-800/80 my-2" />

            <div className="space-y-4 text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                We ingest everything at once: bank accounts, credit cards, payment processors, prior ledgers, filings, and historical records. Instead of treating inconsistencies as blockers, the system analyzes activity across time, accounts, and thousands of comparable businesses to establish a reliable starting point.
              </p>
              <strong>
                When information is missing, work doesn't stop. The system determines which gaps must be resolved now, which can be addressed later, and which do not affect forward progress.
              </strong>
              <p>
                Decisions are grounded in patterns, prior outcomes, and industry context, and every step is built to be revisited if better information emerges.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}