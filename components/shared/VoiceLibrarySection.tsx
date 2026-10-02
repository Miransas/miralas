"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, SlidersHorizontal, ArrowRight, Activity } from "lucide-react";

const VOICES_DATA = [
  {
    id: "v1",
    name: "Marcus",
    tag: "Narrative",
    specs: "US • Male • Calm",
    description: "Deep, soothing resonance perfect for audiobooks and storytelling.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
  {
    id: "v2",
    name: "Elena",
    tag: "Conversational",
    specs: "ES • Female • Energetic",
    description: "Bright and professional tone, ideal for podcasts and e-learning.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
  {
    id: "v3",
    name: "Alaric",
    tag: "Characters",
    specs: "UK • Male • Gritty",
    description: "Cinematic and raspy voice tailored for gaming and animation.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
  {
    id: "v4",
    name: "Sophia",
    tag: "Corporate",
    specs: "AU • Female • Formal",
    description: "Articulate and trustworthy, designed for corporate presentations.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
  {
    id: "v5",
    name: "Kenji",
    tag: "Conversational",
    specs: "JP • Male • Friendly",
    description: "Warm and inviting, great for YouTube narration and social media.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
  {
    id: "v6",
    name: "Clara",
    tag: "Narrative",
    specs: "US • Female • Expressive",
    description: "Highly emotive and dynamic, perfect for dramatic readings.",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_river.ogg",
  },
];

const FILTERS = ["All Voices", "Narrative", "Conversational", "Corporate", "Characters"];

export default function PremiumVoiceLibrary() {
  const [activeFilter, setActiveFilter] = useState("All Voices");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (voiceId: string, audioUrl: string) => {
    if (playingId === voiceId) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      audioRef.current?.pause();
      const newAudio = new Audio(audioUrl);
      audioRef.current = newAudio;
      newAudio.play().catch(() => {});
      setPlayingId(voiceId);

      newAudio.onended = () => setPlayingId(null);
    }
  };

  const filteredVoices = VOICES_DATA.filter(
    (v) => activeFilter === "All Voices" || v.tag === activeFilter
  );

  return (
    <section className="w-full bg-[#fafafa] py-24 px-6 md:px-12 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER & FILTERS ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-950">
              Studio-grade voices. <br />
              <span className="text-zinc-400">Zero studio time.</span>
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed">
              Browse our curated library of ultra-realistic AI voices. Filter by accent, tone, and use-case to find the perfect match for your next project.
            </p>
          </div>

          <div className="flex items-center bg-zinc-200/50 p-1.5 rounded-full overflow-x-auto scrollbar-none border border-zinc-200/80">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === filter
                    ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {filter}
              </button>
            ))}
            <div className="px-3 border-l border-zinc-300 ml-1">
              <button className="flex items-center justify-center size-8 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer">
                <SlidersHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= VOICE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVoices.map((voice) => {
            const isPlaying = playingId === voice.id;

            return (
              <div
                key={voice.id}
                className={`group relative flex flex-col justify-between p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isPlaying
                    ? "bg-zinc-950 border-zinc-950 shadow-2xl shadow-zinc-900/20 scale-[1.02]"
                    : "bg-white border-zinc-200/80 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/40"
                }`}
              >
                {/* 1. ÜST KISIM: İsim ve Rozet */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3
                      className={`text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                        isPlaying ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      {voice.name}
                    </h3>
                    <p
                      className={`text-xs font-mono mt-1.5 transition-colors duration-300 ${
                        isPlaying ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {voice.specs}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-[11px] font-medium rounded-full transition-colors duration-300 border ${
                      isPlaying
                        ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    {voice.tag}
                  </span>
                </div>

                {/* 2. ORTA KISIM: Açıklama ve Canlı Dalga Formu */}
                <div className="mb-10 relative h-12 flex flex-col justify-end">
                  {/* Eğer çalmıyorsa açıklamayı göster */}
                  <p
                    className={`text-sm leading-relaxed transition-all duration-300 absolute inset-0 ${
                      isPlaying ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 text-zinc-500"
                    }`}
                  >
                    {voice.description}
                  </p>

                  {/* Eğer çalıyorsa ses dalgasını göster */}
                  <div
                    className={`flex items-center justify-between w-full h-8 transition-all duration-500 absolute bottom-0 left-0 ${
                      isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[3px] rounded-full bg-white transition-all duration-150"
                        style={{
                          height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : "20%",
                          opacity: isPlaying ? Math.random() * 0.5 + 0.5 : 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. ALT KISIM: Butonlar */}
                <div className="flex items-center justify-between pt-5 border-t transition-colors duration-300 border-zinc-200/50 group-[.bg-zinc-950]:border-zinc-800">
                  <button
                    onClick={() => togglePlay(voice.id, voice.audioUrl)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isPlaying
                        ? "bg-white text-zinc-950 hover:scale-105"
                        : "bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-105"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="size-4 fill-current" />
                        <span>Playing</span>
                      </>
                    ) : (
                      <>
                        <Play className="size-4 ml-0.5 fill-current" />
                        <span>Play Sample</span>
                      </>
                    )}
                  </button>

                  <button
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
                      isPlaying ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    <span>Use Voice</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}