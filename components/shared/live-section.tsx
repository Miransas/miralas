"use client";

import React, { useState } from "react";
import VoiceSphere from "./VoiceSphere";
import { Sparkles, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { id: "agents", label: "Eleven Agents", hasIcon: true },
  { id: "music", label: "Music", hasIcon: false },
  { id: "stt", label: "Speech to Text", hasIcon: false },
  { id: "cloning", label: "Voice Cloning", hasIcon: false },
];

export default function LiveSection() {
  const [activeTab, setActiveTab] = useState("agents");

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-background text-zinc-900 font-sans overflow-hidden flex flex-col justify-between p-6 md:p-12">
      
      {/* ================= 1. ORTADAKİ 3D SPHERE BÖLGESİ ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-full max-w-[700px] h-[600px]">
          <VoiceSphere />
        </div>
      </div>

      {/* ================= 2. SOL TARAFTAKİ YÜZEN MENÜ ================= */}
      <div className="relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col items-start space-y-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive ? "text-zinc-900 font-semibold" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {/* Sol Çizgi / Aktif Göstergesi */}
                <div
                  className={`h-[1px] transition-all duration-300 ${
                    isActive ? "w-6 bg-zinc-900" : "w-0 bg-transparent group-hover:w-3 group-hover:bg-zinc-300"
                  }`}
                />

                {/* İkon (Varsa) */}
                {item.hasIcon && (
                  <div className="flex items-center justify-center size-6 rounded-lg bg-zinc-100 text-zinc-700">
                    <Sparkles className="size-3.5" />
                  </div>
                )}

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 3. ALT BÖLÜM: BAŞLIK, AÇIKLAMA VE BUTONLAR ================= */}
      <div className="relative z-10 pt-20 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Sol: Dev Tipografi */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-zinc-950 leading-[1.05]">
              Your Voice. Any <br />
              Language. Infinite Scale.
            </h1>
          </div>

          {/* Sağ: Açıklama ve CTA Butonları */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-normal">
              Generate natural speech in seconds. Clone voices with precision. Deploy across apps, videos, podcasts, and products. Fast. Reliable. Studio-grade quality.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Siyah Ana Buton */}
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span>Start creating for free</span>
                <ArrowUpRight className="size-4" />
              </button>

              {/* İkincil Buton */}
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 rounded-full bg-zinc-100 text-zinc-800 text-sm font-medium hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}