"use client";

import React from 'react';
import { ArrowRight, Globe2, FileAudio, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';

export default function FeaturesGridSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Bütünleşik Grid (Seamless Grid) Konteyneri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#141210] rounded-[32px] border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm">
          
          {/* ════ ROW 1 ════ */}
          {/* Text Area */}
          <div className="order-1 flex flex-col justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 lg:border-r">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Her yerde kristal netliğinde aramalar
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Modern VoIP altyapısı üzerine inşa edildi. En son teknoloji, minimum gecikme. Kullanıcıların %96'sı tarafından "kusursuz kalite" olarak derecelendirildi.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-zinc-950 dark:text-white font-bold text-sm hover:opacity-70 transition-opacity mt-8 w-fit">
              <span>Miransas'a Geçin</span>
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Image Placeholder */}
          <div className="order-2 flex items-center justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative size-48 rounded-full bg-amber-300 dark:bg-amber-400/90 shadow-lg flex items-center justify-center animate-pulse-slow">
              <div className="absolute -bottom-2 -left-2 bg-zinc-950 dark:bg-white rounded-full p-3 shadow-xl">
                <PhoneCall className="size-6 text-white dark:text-zinc-950" />
              </div>
              <Globe2 className="size-24 text-amber-50/50 dark:text-amber-900/20" strokeWidth={1} />
            </div>
          </div>

          {/* ════ ROW 2 (Zikzak - Image Left, Text Right on Desktop) ════ */}
          {/* Image Placeholder (Masaüstünde solda, mobilde altta) */}
          <div className="order-4 lg:order-3 flex items-center justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 lg:border-r min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.04)_0%,transparent_70%)] pointer-events-none" />
            <div className="w-full max-w-sm rounded-2xl bg-amber-100 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 p-6 transform -rotate-3 shadow-sm z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-amber-400 flex items-center justify-center">
                    <FileAudio className="size-4 text-amber-950" />
                  </div>
                  <span className="text-xs font-bold text-amber-950 dark:text-amber-200">00:16</span>
                </div>
                <div className="h-1 w-12 bg-amber-200 dark:bg-amber-900/50 rounded-full" />
              </div>
              <p className="text-sm font-medium text-amber-950 dark:text-amber-100/80 leading-relaxed italic">
                "Müşteri 25. caddedeki daireyi soruyor. Kiralamak için acele ediyor..."
              </p>
            </div>
          </div>

          {/* Text Area (Masaüstünde sağda, mobilde üstte) */}
          <div className="order-3 lg:order-4 flex flex-col justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Yapay zeka notlarınızı otomatik yazar
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Her arama kaydedilir ve özetlenir. Notlar CRM'inize anında düşer. Ekibiniz klavye başında yazı yazmak yerine satış yapmaya odaklanır.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-zinc-950 dark:text-white font-bold text-sm hover:opacity-70 transition-opacity mt-8 w-fit">
              <span>Miransas'a Geçin</span>
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* ════ ROW 3 ════ */}
          {/* Text Area */}
          <div className="order-5 flex flex-col justify-center p-10 lg:p-20 border-b lg:border-b-0 border-zinc-200 dark:border-white/5 lg:border-r">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Her şey dahil, sadece 32$/ay
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Kayıt, Yapay Zeka, SMS, entegrasyonlar. Satın alınacak ek eklenti yok. Faturanız her ay aynı kalır. Sürpriz maliyetler yok.
              </p>
            </div>
          </div>

          {/* Image Placeholder (En son hücre, bordersız) */}
          <div className="order-6 flex items-center justify-center p-10 lg:p-20 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative w-full max-w-sm aspect-video flex items-center justify-center gap-4 z-10">
              <div className="flex flex-col gap-4 transform translate-y-4">
                <div className="size-16 rounded-2xl bg-amber-400 shadow-lg flex items-center justify-center">
                  <MessageSquare className="size-7 text-amber-950" />
                </div>
                <div className="size-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg border border-zinc-100 dark:border-zinc-700 flex items-center justify-center">
                  <div className="size-6 border-4 border-zinc-300 dark:border-zinc-600 rounded-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-4 transform -translate-y-4">
                <div className="size-16 rounded-2xl bg-amber-200 dark:bg-amber-500/80 shadow-lg flex items-center justify-center">
                  <Sparkles className="size-7 text-amber-900" />
                </div>
                <div className="size-16 rounded-full bg-zinc-950 dark:bg-white shadow-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white dark:text-zinc-950">$32</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}