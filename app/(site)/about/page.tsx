/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import React from "react";
// GrainGradient bileşeninin projedeki import yolunu kendi yapına göre ayarlayabilirsin


export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen bg-zinc-100 dark:bg-[#060608] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-500 overflow-hidden">

      {/* --- ARKA PLAN GRAIN GRADIENT (Dark ve Light Mod Uyumlu Konumlandırma) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30 dark:opacity-90 transition-opacity duration-500">
        <GrainGradient
          width={1480}
          height={1220}
          colors={["#00b3ff", "#1a0033", "#0055ff", "#000000"]}
          colorBack="#000000"
          softness={0.6}
          intensity={0.4}
          noise={0.3}
          shape="corners"
          speed={1.2}
        />
      </div>

      {/* Ekstra Aydınlatma Katmanı (Light modda okunabilirliği artırmak için) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-zinc-50/80 via-transparent to-zinc-100/90 dark:from-transparent dark:to-transparent" />

      {/* --- HERO BÖLÜMÜ --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-zinc-800 text-xs font-mono tracking-wide uppercase mb-6 shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Kelajak Ovoz Texnologiyasi
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
          Ovoz chegaralarni <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            butunlay yengib o&apos;tadi.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-medium">
          Millionlab ijodkorlar, streamerlar, dasturchilar va oddiy foydalanuvchilar uchun mo&apos;ljallangan eng ilg&apos;or sun&apos;iy intellekt asosidagi ovoz platformasi. Ovoz yarating, klonlang va auditoriyangiz bilan yangi darajada muloqot qiling.
        </p>
      </section>

      {/* --- STATS / ÖNE ÇIKAN DEĞERLER (Net Kartlar) --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">99.8%</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Tabiiy va hissiy talaffuz aniqligi</div>
          </div>
          <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">&lt; 300ms</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Real vaqt rejimidagi kechikish vaqti</div>
          </div>
          <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">1M+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Faol global va mahalliy foydalanuvchilar</div>
          </div>
        </div>
      </section>

      {/* --- ANA ÖZELLİKLER (Voice Clone, Superchat, Donate) --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Platformaning Asosiy Imkoniyatlari
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base font-medium">
            Birgina platforma ichida ijod qilish, monetizatsiya va muloqotni mukammal birlashtirdik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Voice Clone */}
          <div className="group relative p-8 rounded-[2rem] bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                01
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                Ovoz Klonlash (Voice Clone)
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                Atigi bir necha soniyalik audio yozuv orqali o&apos;z ovozingizning mukammal raqamli egizagini yarating. Istalgan matnni o&apos;z ovozingizda, turli xil hissiyotlar bilan o&apos;qish imkoniyati.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              ULTRA-HD AUDIO SYNTHESIS
            </div>
          </div>

          {/* 2. Superchat */}
          <div className="group relative p-8 rounded-[2rem] bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                02
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                Superchat Va Jonli Oqim
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                Jonli efirlar va tadbirlar paytida muxlislarning yozma xabarlarini real vaqt rejimida tabiiy sun&apos;iy intellekt ovoziga aylantirib o&apos;qib beruvchi maxsus superchat tizimi.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              REAL-TIME INTERACTION
            </div>
          </div>

          {/* 3. Donate System */}
          <div className="group relative p-8 rounded-[2rem] bg-white/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                03
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                Donate va Monetizatsiya
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                Muxlislaringizdan qo&apos;llab-quvvatlash qabul qiling. Donate xabarlari maxsus ovozli filtrlar va tayyor klonlangan modellar orqali to&apos;g&apos;ridan-to&apos;g&apos;ri efirda yangrasin.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              SECURE CREATOR ECONOMY
            </div>
          </div>

        </div>
      </section>

      {/* --- VİZYON / HİKAYE BÖLÜMÜ --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="p-10 sm:p-14 rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900/90 border border-zinc-800 text-white shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase mb-4 block">
            Bizning Maqsadimiz
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight mb-6 leading-snug">
            O&apos;zbek tilidagi va mintaqaviy kontent yaratuvchilarga jahon darajasidagi vositalarni taqdim etish.
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-medium">
            Til va texnologik to&apos;siqlarni yo&apos;q qilib, har bir inson o&apos;z g&apos;oyalarini ovoz orqali dunyoga yetkazishi uchun eng xavfsiz, tezkor va oson ekotizimni quramiz.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/register"
              className="px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-md"
            >
              Hoziroq boshlash
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-700 transition-all duration-200 border border-zinc-700"
            >
              Biz bilan bog&apos;lanish
            </a>
          </div>
        </div>
      </section>

      {/* --- ALT BİLGİ ÇİZGİSİ --- */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
        <div>© {new Date().getFullYear()} Barcha huquqlar himoyalangan.</div>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Barcha tizimlar ishlamoqda
          </span>
        </div>
      </div>

    </main>
  );
}