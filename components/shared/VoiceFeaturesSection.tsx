"use client";

import React from "react";
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
} from "lucide-react";

// Section 1: Mini Grid Kartları
const TOOLS = [
  { name: "REST API", icon: Code2, color: "text-blue-500 dark:text-blue-400" },
  { name: "WebSockets", icon: Radio, color: "text-amber-500 dark:text-amber-400" },
  { name: "Python SDK", icon: Terminal, color: "text-yellow-500 dark:text-yellow-400" },
  { name: "Node.js", icon: Workflow, color: "text-green-500 dark:text-green-400" },
  { name: "React", icon: Layers, color: "text-cyan-500 dark:text-cyan-400" },
  { name: "Webhooks", icon: Zap, color: "text-purple-500 dark:text-purple-400" },
  { name: "ElevenLabs", icon: Mic, color: "text-zinc-900 dark:text-zinc-200" },
  { name: "OpenAI", icon: Bot, color: "text-emerald-500 dark:text-emerald-400" },
  { name: "Whisper", icon: Sparkles, color: "text-indigo-500 dark:text-indigo-400" },
  { name: "Pipelines", icon: Cpu, color: "text-red-500 dark:text-red-400" },
  { name: "Enterprise", icon: ShieldCheck, color: "text-blue-600 dark:text-blue-500" },
  { name: "Global Edge", icon: Globe2, color: "text-teal-500 dark:text-teal-400" },
];

export default function VoiceAISection() {
  return (
    <section className="w-full bg-white dark:bg-black py-24 px-6 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* ================= BÖLÜM 1: 6x2 MİNİ KART GRİDİ ================= */}
        <div className="rounded-[2.5rem] bg-zinc-50/50 dark:bg-[#0a0a0a] border border-zinc-200/80 dark:border-white/[0.08] p-8 md:p-14 backdrop-blur-xl shadow-sm">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-5 tracking-tight">
              Ready to use out of the box.
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
              Miransas AI offers a complete voice synthesis experience that lets you develop real-time conversational agents quickly and safely without juggling external tools. It supports major frameworks and advanced neural streaming immediately.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center h-28 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] hover:border-zinc-300 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-none hover:bg-zinc-50 dark:hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
                >
                  <Icon 
                    className={`w-7 h-7 mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${tool.color}`} 
                    strokeWidth={1.5} 
                  />
                  <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BÖLÜM 2: İKİYE BÖLÜNMÜŞ KART ================= */}
        <div className="rounded-[2.5rem] bg-zinc-50/50 dark:bg-[#0a0a0a] border border-zinc-200/80 dark:border-white/[0.08] overflow-hidden shadow-sm backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/80 dark:divide-white/[0.08]">
            
            {/* Sol Taraf */}
            <div className="p-8 md:p-14">
              <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-4 tracking-tight">
                Intelligent voice assistance
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-medium">
                Miransas' powerful neural engine deeply understands modern conversational structures, from zero-shot cloning to real-time latency optimization. It delivers context-aware intonation, on-the-fly multi-dialect analysis, and fast audio rendering.
              </p>
            </div>

            {/* Sağ Taraf */}
            <div className="p-8 md:p-14 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-4 tracking-tight">
                  Covers all your needs
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-medium mb-8">
                  Whether you're just getting started or developing interactive voice response (IVR) systems professionally, Miransas supports you every step of the way.
                </p>
              </div>
              
              {/* Premium Hap Butonlar (Pills) */}
              <div className="flex flex-wrap gap-3">
                {["For real-time streaming", "For voice cloning →", "For learning models"].map((tag, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer shadow-sm dark:shadow-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BÖLÜM 3: NATIVELY INTEGRATED AI ================= */}
        <div className="pt-10">
          <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 dark:text-white mb-10 tracking-tighter text-center lg:text-left">
            Natively integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">AI.</span>
          </h2>

          <div className="rounded-[2.5rem] bg-zinc-900 dark:bg-[#070707] border border-zinc-800 dark:border-white/[0.08] shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 dark:divide-white/[0.08]">
              
              {/* Sol: Latest Models */}
              <div className="p-8 md:p-14">
                <h3 className="text-lg md:text-xl font-medium text-white mb-6 tracking-wide">
                  Latest voice models
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Shahzoda", icon: BrainCircuit },
                    { name: "Miralas v2", icon: AudioWaveform },
                    { name: "Whisper", icon: Sparkles },
                    { name: "GPT-4o", icon: Bot }
                  ].map((model, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-center gap-2.5 px-4 py-2.5 bg-black/50 border border-white/10 rounded-2xl text-sm font-medium text-zinc-300 hover:border-white/20 hover:text-white transition-all cursor-default"
                    >
                      <model.icon className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                      {model.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sağ: Multi-agent */}
              <div className="p-8 md:p-14">
                <h3 className="text-lg md:text-xl font-medium text-white mb-6 tracking-wide">
                  Multi-agent experience
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Dialogue Agent", icon: MessageSquare },
                    { name: "Acoustic Filter", icon: Activity },
                    { name: "Orchestrator", icon: Workflow }
                  ].map((agent, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-center gap-2.5 px-4 py-2.5 bg-black/50 border border-white/10 rounded-2xl text-sm font-medium text-zinc-300 hover:border-white/20 hover:text-white transition-all cursor-default"
                    >
                      <agent.icon className="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400 transition-colors" />
                      {agent.name}
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