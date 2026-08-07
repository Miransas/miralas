/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export default function HeroSection() {
  const [sliderValue, setSliderValue] = useState(100);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black overflow-hidden px-6 py-24 transition-colors duration-500 font-sans">

      {/* Arka Plan: Light modda açık grid/nokta, Dark modda siyah nokta deseni */}
      <div
        className="absolute inset-0 z-0 transition-colors duration-500"
        style={{
          backgroundImage: 'radial-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes stream-flow {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        .animate-stream {
          background-size: 250% 100%;
          animation: stream-flow 7s linear infinite;
        }
      `}} />

      {/* --- GÖRSEL EFEKTLER (Yatay Lazer, Prizma Küre ve Renkli Akış) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">

        {/* 1. Soldan Sağa Yatay Lazer Hüzmesi (Kartın sol sınırına vurur) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[35%] h-[2px] bg-gradient-to-r from-transparent via-zinc-400 to-white dark:via-white dark:to-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
        
        {/* Lazer Odak / Çarpışma Parlaması */}
        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-40 h-10 bg-white rounded-full blur-[25px] opacity-80 dark:opacity-90 z-30" />

        {/* 2. Cam Küre (Prizma Lens) */}
        <div className="absolute left-[20%] lg:left-[30%] top-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[36rem] sm:h-[36rem] rounded-full border border-zinc-300 dark:border-white/10 bg-white/10 dark:bg-transparent backdrop-blur-[10px] shadow-2xl z-20" />

        {/* 3. KARTIN İÇİNE AKAN GÖKKUŞAĞI YELPAZESİ (Rainbow Stream) */}
        <div className="absolute left-[32%] top-1/2 -translate-y-1/2 w-[65%] h-[40rem] z-0 opacity-80 dark:opacity-100 flex flex-col justify-center mix-blend-multiply dark:mix-blend-screen">
          
          {/* Üst Akış (Mavi / Mor / Beyaz) */}
          <div className="absolute top-[20%] left-0 w-full h-[35%] origin-left -rotate-[10deg] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(99,102,241,1)_25%,rgba(168,85,247,0.8)_60%,rgba(236,72,153,0)_90%)] blur-[45px] animate-stream" />
          
          {/* Orta Akış (Fuşya / Pembe / Kırmızı) */}
          <div className="absolute top-[35%] left-0 w-full h-[36%] origin-left rotate-0 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(236,72,153,1)_30%,rgba(239,68,68,0.9)_65%,rgba(249,115,22,0)_95%)] blur-[45px] animate-stream" style={{ animationDelay: "-2.5s" }} />
          
          {/* Alt Akış (Sarı / Mavi / Beyaz) */}
          <div className="absolute top-[50%] left-0 w-full h-[35%] origin-left rotate-[10deg] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(59,130,246,1)_25%,rgba(34,197,94,0.8)_60%,rgba(16,185,129,0)_90%)] blur-[45px] animate-stream" style={{ animationDelay: "-5s" }} />
          
        </div>

      </div>

      {/* --- ANA İÇERİK --- */}
      <div className="relative z-30 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Sol Taraf (Metinler) */}
        <div className="lg:col-span-5 flex flex-col space-y-6 z-40">
          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
            Pay for what<br />you send.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-md leading-relaxed">
            One plan that scales with your volume. No seats, no feature gates — every account gets the whole API.
          </p>
          <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pt-2">
            Your first 10,000 emails are free, every month, forever.
          </p>
        </div>

        {/* Sağ Taraf (Fiyatlandırma Kartı) */}
        
        <div className="lg:col-span-7 w-full max-w-xl ml-auto z-40">
          <div className="relative rounded-[2rem] border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.5)] p-8 sm:p-10 transition-all duration-300">
            
            {/* Slider Alanı */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Emails per month</span>
                <span className="text-2xl font-semibold text-zinc-900 dark:text-white">{sliderValue}k</span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="10"
                max="1000"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-1 bg-zinc-300 dark:bg-zinc-700/50 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white focus:outline-none"
              />
              
              {/* Slider Etiketleri */}
              <div className="flex justify-between text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-4">
                <span>10k</span>
                <span>50k</span>
                <span>100k</span>
                <span>250k</span>
                <span>500k</span>
                <span>1M</span>
                <span>1M+</span>
              </div>
            </div>

            {/* Ayırıcı Çizgi */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent mb-8" />

            {/* Fiyat ve Buton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight">$39</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">/mo</span>
                </div>
                <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mt-1">Billed monthly. Cancel anytime.</p>
              </div>
              <button className="px-6 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:scale-105 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 shadow-xl">
                Start sending
              </button>
            </div>

            {/* Özellikler Listesi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Unlimited sending domains",
                "Full deliverability analytics",
                "99.99% uptime SLA",
                "Dedicated IPs from 250k up",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-200 dark:bg-white/10">
                    <svg className="w-2.5 h-2.5 text-zinc-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}