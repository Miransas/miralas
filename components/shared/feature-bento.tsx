"use client";

import React from 'react';
import { ArrowRight, Globe2, FileAudio, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';

export default function FeaturesGridSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-black text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Seamless grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-white/5 rounded-[32px] border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
          
          {/* Text Area */}
          <div className="order-1 flex flex-col justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 lg:border-r">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Crystal-clear calls, everywhere
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Built on modern VoIP infrastructure with state-of-the-art technology and minimal latency. Rated "flawless quality" by 96% of users.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-zinc-950 dark:text-white font-bold text-sm hover:opacity-70 transition-opacity mt-8 w-fit">
              <span>Switch to Miransas</span>
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Image Placeholder */}
          <div className="order-2 flex items-center justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 min-h-[400px] relative overflow-hidden">
            <div className="relative  flex  ">
              <img src="./voice-ai-core.png" alt="" />
            </div>
          </div>

          {/* ════ ROW 2 (Zikzak - Image Left, Text Right on Desktop) ════ */}
          {/* Image placeholder (left on desktop, below on mobile) */}
          <div className="order-4 lg:order-3 flex items-center justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5 lg:border-r min-h-[400px] relative overflow-hidden">
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.04)_0%,transparent_70%)] pointer-events-none" /> */}
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
                "The customer is asking about the apartment on 25th Street. They're in a hurry to rent..."
              </p>
            </div>
          </div>

          {/* Text area (right on desktop, above on mobile) */}
          <div className="order-3 lg:order-4 flex flex-col justify-center p-10 lg:p-20 border-b border-zinc-200 dark:border-white/5">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                AI takes notes for you
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Every call is recorded and summarized, and notes appear in your CRM instantly. Your team can focus on selling instead of typing.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-zinc-950 dark:text-white font-bold text-sm hover:opacity-70 transition-opacity mt-8 w-fit">
              <span>Switch to Miransas</span>
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* ════ ROW 3 ════ */}
          {/* Text Area */}
          <div className="order-5 flex flex-col justify-center p-10 lg:p-20 border-b lg:border-b-0 border-zinc-200 dark:border-white/5 lg:border-r">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Everything included for just $32/month
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Recording, AI, SMS, and integrations—all included. No add-ons to buy, no surprise costs, and the same bill every month.
              </p>
            </div>
          </div>

          {/* Image placeholder (final cell, without borders) */}
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