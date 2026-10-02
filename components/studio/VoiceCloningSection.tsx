/* eslint-disable react-hooks/purity */
"use client";

import React, { useState } from "react";
import { Play, Pause, Mic, Sparkles, Globe, Sliders, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const PROFILES = [
  { id: "lily", name: "Lily", desc: "Graceful female narrator" },
  { id: "chris", name: "Chris", desc: "Deep cinematic voice" },
  { id: "laura", name: "Laura", desc: "Energetic conversational" },
];

export default function VoiceCloningSection() {
  const [activeProfile, setActiveProfile] = useState(PROFILES[0]);
  const [mode, setMode] = useState<"original" | "cloned">("cloned");
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <section className="relative w-full bg-[#fafafa] dark:bg-[#030303] py-24 px-6 md:px-12 font-sans text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 overflow-hidden transition-colors duration-500">
      
      {/* Dark Mode Ambient Glow - Sadece dark modda arkada lüks bir derinlik yaratır */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] dark:bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        
        {/* ================= HEADER & HERO ================= */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm backdrop-blur-md transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 dark:bg-white opacity-70"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-900 dark:bg-white"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
              Trusted by 1M+ Creators
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.05]">
            Create a replica of your voice that <span className="text-zinc-400 dark:text-zinc-500">sounds like you.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Upload a short audio sample and generate natural-sounding speech from text for voiceovers, ads, podcasts, and more — all in your own voice.
          </p>
          
          {/* Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 transition-all hover:bg-zinc-800 dark:hover:bg-white hover:shadow-lg hover:shadow-zinc-900/20 dark:hover:shadow-white/20 active:scale-95 cursor-pointer">
              <span>Clone your voice</span>
              <Sparkles className="size-4 opacity-70" />
            </button>
            <button className="flex items-center gap-2 rounded-full bg-white dark:bg-transparent border border-zinc-200 dark:border-white/20 px-6 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-50 dark:hover:bg-white/5 active:scale-95 cursor-pointer">
              Explore the docs
            </button>
          </div>
        </div>

        {/* ================= INTERACTIVE DEMO CARD ================= */}
        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-white/60 dark:border-white/5 bg-white/40 dark:bg-white/5 p-2 sm:p-4 shadow-[0_8px_40px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.4)] backdrop-blur-2xl transition-colors">
          <div className="rounded-[2rem] border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-8 sm:p-12 shadow-sm transition-colors">
            
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
              
              {/* Left: Profile Selection */}
              <div className="w-full lg:w-1/3 space-y-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Select a voice profile</h3>
                <div className="space-y-3">
                  {PROFILES.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        setActiveProfile(profile);
                        setIsPlaying(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                        activeProfile.id === profile.id
                          ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-white/10 shadow-sm"
                          : "border-zinc-100 dark:border-white/10 bg-white dark:bg-transparent hover:border-zinc-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-semibold ${activeProfile.id === profile.id ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}>
                          {profile.name}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{profile.desc}</span>
                      </div>
                      {activeProfile.id === profile.id && (
                        <CheckCircle2 className="size-5 text-zinc-900 dark:text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Audio Player & Waveform */}
              <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-50 dark:bg-[#0f0f0f] border border-zinc-100 dark:border-white/5 transition-colors">
                
                {/* Toggle Original vs Cloned */}
                <div className="flex items-center p-1 bg-zinc-200/60 dark:bg-white/5 rounded-full mb-10 border border-transparent dark:border-white/5">
                  <button
                    onClick={() => { setMode("original"); setIsPlaying(false); }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      mode === "original" 
                        ? "bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white shadow-sm border border-transparent dark:border-white/10" 
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Original voice
                  </button>
                  <button
                    onClick={() => { setMode("cloned"); setIsPlaying(false); }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      mode === "cloned" 
                        ? "bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white shadow-sm border border-transparent dark:border-white/10" 
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Cloned voice
                  </button>
                </div>

                {/* Big Play Button */}
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center size-20 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 hover:scale-105 transition-all cursor-pointer mb-8"
                >
                  {isPlaying ? <Pause className="size-8 fill-current" /> : <Play className="size-8 ml-1 fill-current" />}
                </button>

                {/* Animated Waveform - Renkleri Light/Dark uyumlu */}
                <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-sm">
                  {Array.from({ length: 40 }).map((_, i) => {
                    // Klon modunda çalarken ana rengi alır, aksi halde gri kalır
                    const isHighlight = isPlaying && mode === "cloned";
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isHighlight 
                            ? "bg-zinc-900 dark:bg-white" 
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : "20%",
                        }}
                      />
                    );
                  })}
                </div>
                <p className="mt-4 text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  {mode === "cloned" ? "AI Generated Speech" : "Human Audio Sample"}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ================= CORE FEATURES (PVC vs IVC) ================= */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-4 transition-colors">
              AI voices that stay unmistakably yours
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 transition-colors">
              Create lifelike voice clones that carry your tone, emotion, delivery, and personality with unmatched realism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PVC Card */}
            <div className="group rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-zinc-200/80 dark:border-white/10 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-zinc-300 dark:hover:border-white/20 transition-all">
              <div className="size-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center mb-6 transition-colors">
                <Mic className="size-6 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Professional Voice Cloning (PVC)</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                Capture every nuance of a voice using a dedicated hyper-realistic voice model that’s virtually indistinguishable from the original voice.
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer">
                Learn more <ArrowRight className="size-4" />
              </button>
            </div>

            {/* IVC Card */}
            <div className="group rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-zinc-200/80 dark:border-white/10 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-zinc-300 dark:hover:border-white/20 transition-all">
              <div className="size-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center mb-6 transition-colors">
                <Sparkles className="size-6 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Instant Voice Cloning (IVC)</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                Create a lifelike voice in moments using just a 10-second recording. Ideal for fast, high-quality voice generation without studio time.
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer">
                Try it now <ArrowRight className="size-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ================= SUB-FEATURES (3 Columns) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-200/60 dark:border-white/10">
          
          <div className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all cursor-default">
            <Globe className="size-6 text-zinc-400 dark:text-zinc-500 mb-4" />
            <h5 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Multilingual voice clones</h5>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Generated voice clones can automatically speak 32+ languages with native accents.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all cursor-default">
            <Sliders className="size-6 text-zinc-400 dark:text-zinc-500 mb-4" />
            <h5 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Control emotion & delivery</h5>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Adjust pacing, energy, clarity, and emotion to craft your exact vocal style.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all cursor-default">
            <ShieldCheck className="size-6 text-zinc-400 dark:text-zinc-500 mb-4" />
            <h5 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Security and privacy</h5>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Your voice data is encrypted and strictly protected from unauthorized use.</p>
          </div>

        </div>

      </div>
    </section>
  );
}