"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Mic, Sparkles, Check, Cpu, Zap, Globe } from "lucide-react";

// Örnek Transkript Verisi (Konuşmacı ayrıştırmalı)
const TRANSCRIPT_DATA = [
  {
    time: "00:01",
    speaker: "Speaker A",
    avatarColor: "bg-sky-500",
    text: "Welcome everyone. Today we are launching our next-generation Speech to Text engine.",
  },
  {
    time: "00:05",
    speaker: "Speaker B",
    avatarColor: "bg-indigo-500",
    text: "Does it support real-time streaming with low latency?",
  },
  {
    time: "00:08",
    speaker: "Speaker A",
    avatarColor: "bg-sky-500",
    text: "Absolutely. Under 200 milliseconds latency with over 99% accuracy across 100+ languages.",
  },
];

export default function SpeechToTextSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Metin akışı simülasyonu
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev >= 25 ? 0 : prev + 1));
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="w-full bg-[#fafafa] dark:bg-background text-zinc-900 py-24 px-6 md:px-14 ">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start gap-3 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-black text-xs font-semibold tracking-wide border border-sky-200/60">
            <Sparkles className="size-3.5" />
            <span>SPEECH-TO-TEXT ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-foreground leading-[1.1]">
            Turn spoken audio into <br className="hidden sm:inline" />
            actionable intelligence.
          </h2>
          <p className="text-stone-400/90 text-base leading-relaxed">
            Transcribe raw audio with unmatched precision. Built for real-time applications, multi-speaker meetings, and global language coverage.
          </p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: FEATURE HIGHLIGHTS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-4  rounded-2xl transition-all hover:bg-white dark:bg-[#0a0a0a] dark:hover:bg-[#1a1a1a] hover:shadow-sm border dark:border-white/5 border-stone-200 ">
                <div className="p-3 rounded-xl bg-zinc-900 text-white shrink-0">
                  <Zap className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-foreground text-base mb-1">Ultra-Low Latency Streaming</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Get instant text output as audio plays with less than 200ms processing delay.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4  rounded-2xl transition-all hover:bg-white dark:bg-[#0a0a0a] dark:hover:bg-[#1a1a1a] hover:shadow-sm border dark:border-white/5 border-stone-200">
                <div className="p-3 rounded-xl bg-zinc-900 text-white shrink-0">
                  <Cpu className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-foreground text-base mb-1">Smart Speaker Diarization</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Automatically recognize and label different speakers in multi-party conversations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4  rounded-2xl transition-all hover:bg-white dark:bg-[#0a0a0a] dark:hover:bg-[#1a1a1a] hover:shadow-sm border dark:border-white/5 border-stone-200">
                <div className="p-3 rounded-xl bg-zinc-900 text-white shrink-0">
                  <Globe className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-foreground text-base mb-1">100+ Languages & Dialects</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    High accuracy across accent variations, background noise, and technical jargon.
                  </p>
                </div>
              </div>

            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-white/5">
              <div>
                <div className="text-2xl font-bold text-zinc-950">99.2%</div>
                <div className="text-xs text-zinc-500 mt-0.5">Word Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-950">&lt;200ms</div>
                <div className="text-xs text-zinc-500 mt-0.5">Realtime Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-950">100+</div>
                <div className="text-xs text-zinc-500 mt-0.5">Languages</div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE DEMO CARD */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white dark:bg-[#1a1a1a] border dark:border-white/5 border-stone-200 p-6 md:p-8 overflow-hidden">
              
              {/* TOP CARD BAR */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center justify-center size-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-200 uppercase tracking-wider">Live Input Sample</div>
                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Product_Keynote_Demo.wav</div>
                  </div>
                </div>

                {/* ANIMATED WAVEFORM */}
                <div className="flex items-center gap-1 h-8 px-3  bg-rose-500 rounded-3xl">
                  {[40, 70, 30, 90, 60, 100, 50, 80, 40, 60, 90, 30].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full bg-white transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : "opacity-40"
                      }`}
                      style={{ height: isPlaying ? `${h}%` : "30%" }}
                    />
                  ))}
                </div>
              </div>

              {/* TRANSCRIPT FLOW AREA */}
              <div className="py-6 space-y-6 min-h-[280px]">
                {TRANSCRIPT_DATA.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    
                    {/* SPEAKER BADGE & TIMESTAMP */}
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${item.avatarColor}`} />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{item.speaker}</span>
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-200">{item.time}</span>
                    </div>

                    {/* TRANSCRIBED TEXT */}
                    <p className="text-sm md:text-base text-zinc-700  dark:text-zinc-300 font-normal leading-relaxed pl-4 border-l-2 border-zinc-100 dark:border-white/5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CARD FOOTER STATS */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-zinc-700  dark:text-zinc-300 font-medium">Auto-Formatting Active</span>
                </div>
                <span className="text-zinc-700  dark:text-zinc-300 font-medium">JSON / VTT / TXT Export Ready</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}