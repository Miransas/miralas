/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React from 'react';
import {
  Code2,
  Radio,
  Terminal,
  Workflow,
  Layers,
  Zap,
  Mic,
  Bot,
  Sparkles,
  Cpu,
  ShieldCheck,
  Globe2,
  BrainCircuit,
  MessageSquare,
  AudioWaveform,
  Activity,
  ArrowRight,
} from 'lucide-react';

const TOOLS = [
  { name: 'REST API', icon: Code2, accent: 'group-hover:border-blue-500/50 text-blue-500 bg-blue-500/10' },
  { name: 'WebSockets', icon: Radio, accent: 'group-hover:border-amber-500/50 text-amber-500 bg-amber-500/10' },
  { name: 'Python SDK', icon: Terminal, accent: 'group-hover:border-yellow-500/50 text-yellow-500 bg-yellow-500/10' },
  { name: 'Node.js', icon: Workflow, accent: 'group-hover:border-emerald-500/50 text-emerald-500 bg-emerald-500/10' },
  { name: 'React', icon: Layers, accent: 'group-hover:border-cyan-500/50 text-cyan-500 bg-cyan-500/10' },
  { name: 'Webhooks', icon: Zap, accent: 'group-hover:border-purple-500/50 text-purple-500 bg-purple-500/10' },
  { name: 'Voice Engine', icon: Mic, accent: 'group-hover:border-rose-500/50 text-rose-500 bg-rose-500/10' },
  { name: 'OpenAI', icon: Bot, accent: 'group-hover:border-emerald-500/50 text-emerald-500 bg-emerald-500/10' },
  { name: 'Whisper', icon: Sparkles, accent: 'group-hover:border-indigo-500/50 text-indigo-500 bg-indigo-500/10' },
  { name: 'Pipelines', icon: Cpu, accent: 'group-hover:border-rose-500/50 text-rose-500 bg-rose-500/10' },
  { name: 'Enterprise', icon: ShieldCheck, accent: 'group-hover:border-blue-500/50 text-blue-500 bg-blue-500/10' },
  { name: 'Global Edge', icon: Globe2, accent: 'group-hover:border-teal-500/50 text-teal-500 bg-teal-500/10' },
];

export default function VoiceAISection() {
  return (
    <section className="w-full bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#F5F2EB] py-24 px-6 md:px-8 transition-colors duration-500 antialiased">
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* ================= BÖLÜM 1: 6x2 MİNİ KART GRİDİ ================= */}
        <div className="relative rounded-[2.5rem] bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 p-8 md:p-14 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          {/* Lüks Arka Plan Işıltısı */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 dark:bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 mb-12 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFECE6] dark:border-white/10 bg-[#FAF8F5] dark:bg-white/5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
              <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>Geliştirici Ekosistemi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Ready to use <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">out of the box.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Miransas AI, harici araçlarla vakit kaybetmeden gerçek zamanlı konuşma asistanları geliştirmenizi sağlayan kusursuz bir ses sentezi deneyimi sunar. Majör framework'leri ve sinirsel akış altyapısını hemen destekler.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className={`group flex flex-col items-center justify-center h-32 rounded-2xl bg-[#FAF8F5]/60 dark:bg-white/[0.02] border border-[#EFECE6] dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer p-4`}
                >
                  <div className={`size-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${tool.accent}`}>
                    <Icon className="size-6" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors tracking-tight text-center">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BÖLÜM 2: İKİYE BÖLÜNMÜŞ KART ================= */}
        <div className="rounded-[2.5rem] bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#EFECE6] dark:divide-white/10">
            
            {/* Sol Taraf */}
            <div className="p-8 md:p-14 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                // Sinirsel Altyapı
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Intelligent voice assistance
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                Miransas'ın güçlü nöro-motoru, sıfır-atım ses klonlamadan gerçek zamanlı gecikme optimizasyonuna kadar modern konuşma yapılarını derinlemesine kavrar. Bağlam duyarlı tonlama ve çoklu lehçe analizi sunar.
              </p>
            </div>

            {/* Sağ Taraf */}
            <div className="p-8 md:p-14 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  // Ölçeklenebilir Mimari
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                  Covers all your needs
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  İster yeni başlıyor olun ister IVR sistemlerini profesyonelce geliştiriyor olun, Miransas her adımda yanınızdadır.
                </p>
              </div>
              
              {/* Renkli ve Şık Hap Butonlar */}
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'For real-time streaming', color: 'hover:border-indigo-500/50 hover:text-indigo-500' },
                  { text: 'For voice cloning →', color: 'hover:border-rose-500/50 hover:text-rose-500' },
                  { text: 'For learning models', color: 'hover:border-emerald-500/50 hover:text-emerald-500' }
                ].map((tag, i) => (
                  <span 
                    key={i} 
                    className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-[#FAF8F5] dark:bg-white/[0.04] border border-[#EFECE6] dark:border-white/10 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-sm ${tag.color}`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BÖLÜM 3: NATIVELY INTEGRATED AI ================= */}
        <div className="pt-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-8">
            Natively integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">AI.</span>
          </h2>

          <div className="rounded-[2.5rem] bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#EFECE6] dark:divide-white/10">
              
              {/* Sol: Latest Models */}
              <div className="p-8 md:p-14 bg-[#FAF8F5]/40 dark:bg-transparent space-y-6">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Latest voice models
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Shahzoda', icon: BrainCircuit, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
                    { name: 'Miralas v2', icon: AudioWaveform, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
                    { name: 'Whisper', icon: Sparkles, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
                    { name: 'GPT-4o', icon: Bot, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' }
                  ].map((model, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-white/[0.03] border border-[#EFECE6] dark:border-white/10 rounded-2xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-default shadow-sm hover:border-zinc-300 dark:hover:border-white/30`}
                    >
                      <div className={`p-1.5 rounded-xl ${model.color}`}>
                        <model.icon className="size-4" />
                      </div>
                      <span>{model.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sağ: Multi-agent */}
              <div className="p-8 md:p-14 bg-[#FAF8F5]/40 dark:bg-transparent space-y-6">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Multi-agent experience
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Dialogue Agent', icon: MessageSquare, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
                    { name: 'Acoustic Filter', icon: Activity, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
                    { name: 'Orchestrator', icon: Workflow, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' }
                  ].map((agent, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-white/[0.03] border border-[#EFECE6] dark:border-white/10 rounded-2xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-default shadow-sm hover:border-zinc-300 dark:hover:border-white/30"
                    >
                      <div className={`p-1.5 rounded-xl ${agent.color}`}>
                        <agent.icon className="size-4" />
                      </div>
                      <span>{agent.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}