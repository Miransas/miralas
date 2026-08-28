"use client";

import { BotCard } from "./bot-card";
import { BuildCard } from "./build-card";
import { ChatCard } from "./chat-card";
import { SphereCard } from "./sphere-card";
import { VoiceCard } from "./voice-card";
import { ArrowRight } from "lucide-react";

export function BentoSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-16 md:px-6 md:py-24 bg-black">
      {/* Header: Başlık + Açıklama + Button */}
      <div className="mb-10 flex flex-col items-start gap-4 md:mb-16">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Everything you need to ship faster
        </h2>
        <p className="max-w-xl text-base text-stone-400 md:text-lg">
          Voice agents, autonomous coding, and real-time AI — all in one platform.
        </p>
        <button className="group mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-stone-200">
          Get started
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Row 1: 3 eşit kolon */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="h-full min-h-[28rem]">
          <ChatCard />
        </div>
        <div className="h-full min-h-[28rem]">
          <BuildCard />
        </div>
        <div className="h-full min-h-[28rem]">
          <BotCard />
        </div>
      </div>

      {/* Row 2: Asimetrik 12-col grid */}
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="h-full min-h-72 md:col-span-4">
          <VoiceCard />
        </div>
        <div className="h-full min-h-72 md:col-span-3">
          {/* Imagine placeholder — istersen ImagineCard'i buraya aç */}
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 text-center">
            <div className="mb-3 text-3xl">🎨</div>
            <p className="text-sm font-medium text-white">Imagine</p>
            <p className="mt-1 text-xs text-stone-500">Generate images from text</p>
          </div>
        </div>
        <div className="h-full min-h-72 md:col-span-2">
          {/* Media placeholder */}
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 text-center">
            <div className="mb-3 text-3xl">🎬</div>
            <p className="text-sm font-medium text-white">Media</p>
            <p className="mt-1 text-xs text-stone-500">Video & audio tools</p>
          </div>
        </div>
        <div className="h-full min-h-72 md:col-span-3">
          <SphereCard />
        </div>
      </div>
    </section>
  );
}