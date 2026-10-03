'use client';

import React from 'react';

export default function MomentumSection() {
  return (
    <section className="w-full dark:bg-[#050505] bg-background text-zinc-100 py-20 px-4 sm:px-6 md:px-8 transition-colors duration-500 antialiased selection:bg-cyan-500/30">
      <div className="max-w-[1280px] mx-auto border border-zinc-800/80 rounded-3xl bg-[#0A0A0A] overflow-hidden shadow-2xl">
        
        {/* ================= ÜST KISIM: KARŞILAŞTIRMA KARTLARI ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
          
          {/* Sol Üst: Traditional Cleanup */}
          <div className="p-8 md:p-12 space-y-8 bg-[#070708]">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100">
                Traditional Cleanup
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                Progress constantly stopping. Waiting for answers. Edge cases blocking everything.
              </p>
            </div>

            {/* Kesintili / Faded Ticks Bar Grafiği */}
            <div className="space-y-2 pt-4">
              {/* Row 1 */}
              <div className="flex gap-[3px] overflow-hidden opacity-30">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-[3px] h-6 bg-zinc-400 rounded-full flex-shrink-0" />
                ))}
              </div>
              {/* Row 2 (Kısmen Doygun, Tıkanmış Görünüm) */}
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

          {/* Sağ Üst: Catch Up */}
          <div className="p-8 md:p-12 space-y-8 bg-[#070708]">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100">
                Catch Up
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                Steady forward motion with intelligent checkpoints. Progress doesn't depend on perfection.
              </p>
            </div>

            {/* Tam Parlak Cyan Progress Bar Grafiği */}
            <div className="space-y-2 pt-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex gap-[3px] overflow-hidden">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[3px] h-6 bg-cyan-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= ALT KISIM: VİDEO VE AÇIKLAMA METNİ ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80 border-t border-zinc-800/80">
          
          {/* Sol Alt: Video Alanı (purple.webm) */}
          <div className="relative min-h-[360px] md:min-h-[460px] bg-black flex items-center justify-center overflow-hidden p-6">
            {/* Arka plan ızgara deseni */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
            
            <video
              src="/videos/purple.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain relative z-10 rounded-xl"
            />
          </div>

          {/* Sağ Alt: Detaylı Metin Alanı */}
          <div className="p-8 md:p-14 space-y-6 bg-[#070708] flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-100">
              Momentum without waiting for perfect
            </h2>

            <div className="w-full h-px bg-zinc-800/80 my-2" />

            <div className="space-y-4 text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
              <p>
                We ingest everything at once: bank accounts, credit cards, payment processors, prior ledgers, filings, and historical records. Instead of treating inconsistencies as blockers, the system analyzes activity across time, accounts, and thousands of comparable businesses to establish a reliable starting point.
              </p>
              <p>
                When information is missing, work doesn't stop. The system determines which gaps must be resolved now, which can be addressed later, and which do not affect forward progress.
              </p>
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