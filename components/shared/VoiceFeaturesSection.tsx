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
  AudioWaveform,
  Activity,
  ArrowUpRight,
  Database
} from 'lucide-react';

export default function VoiceAISection() {
  return (
    <section className="w-full bg-[#0C0A09] text-[#F5F2EB] py-24 px-6 md:px-8 transition-colors duration-500 antialiased selection:bg-white/20">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-mono font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="size-3.5" />
            <span>// Developer Ecosystem</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to build <span className="text-zinc-500 font-serif italic">out of the box.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Miransas AI, harici araçlarla vakit kaybetmeden gerçek zamanlı konuşma asistanları ve otonom ses hatları geliştirmeniz için tasarlanmış yüksek performanslı sinirsel altyapıdır.
          </p>
        </div>

        {/* ================= BENTO GRID CONTAINER ================= */}
        <div className="space-y-6">
          
          {/* TOP ROW: 3 CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* KART 1: Voice AI & Neural Engine */}
            <div className="group relative rounded-3xl bg-[#141210] border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Isometric Wireframe Graphic Placeholder / SVG */}
              <div className="relative w-full h-44 mb-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                {/* Simulated 3D Isometric Layers */}
                <div className="relative flex flex-col items-center justify-center space-y-[-20px] transition-transform duration-500 group-hover:scale-105">
                  <div className="w-32 h-16 rounded-xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-md transform -rotate-12 skew-x-12 shadow-2xl flex items-center justify-center">
                    <AudioWaveform className="size-6 text-rose-400" />
                  </div>
                  <div className="w-36 h-16 rounded-xl border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md transform -rotate-12 skew-x-12 shadow-2xl flex items-center justify-center">
                    <BrainCircuit className="size-6 text-indigo-400" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">Neural Voice Synthesis</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sıfır-atım ses klonlama, ultra düşük gecikme ve insan doğallığında duygu tonlaması sunan sinirsel motor altyapısı.
                </p>
              </div>

              {/* Badges / Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {['SHAHZODA', 'MIRALAS V2', 'WHISPER', 'GPT-4O', 'ZERO-SHOT', 'EMOTION AI'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* KART 2: Multi-Agent Orchestration */}
            <div className="group relative rounded-3xl bg-[#141210] border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Wireframe Graphic */}
              <div className="relative w-full h-44 mb-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative flex items-center justify-center space-x-[-15px] transition-transform duration-500 group-hover:scale-105">
                  <div className="size-16 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-md transform rotate-6 flex items-center justify-center shadow-2xl">
                    <Bot className="size-6 text-purple-400" />
                  </div>
                  <div className="size-20 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md transform -rotate-6 z-10 flex items-center justify-center shadow-2xl">
                    <Workflow className="size-8 text-amber-400" />
                  </div>
                  <div className="size-16 rounded-xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md transform rotate-12 flex items-center justify-center shadow-2xl">
                    <Activity className="size-6 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">Multi-Agent Orchestration</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Birden fazla uzman ajanı orkestre edin; akustik filtreleme, diyalog yönlendirme ve anlık durum yönetimini otomatize edin.
                </p>
              </div>

              {/* Badges / Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {['DIALOGUE AGENT', 'ACOUSTIC FILTER', 'ORCHESTRATOR', 'STREAMING', 'VOICE ROUTING'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* KART 3: Full-Stack Voice Engineering */}
            <div className="group relative rounded-3xl bg-[#141210] border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
              {/* Wireframe Graphic */}
              <div className="relative w-full h-44 mb-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <div className="w-40 h-24 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md transform rotate-3 flex items-center justify-center shadow-2xl space-x-2">
                    <Code2 className="size-6 text-emerald-400" />
                    <Terminal className="size-6 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">Full-Stack Integration</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  REST API, WebSockets, Python & Node.js SDK'ları ile mevcut sistemlerinize ve veritabanlarınıza sorunsuz bağlanın.
                </p>
              </div>

              {/* Badges / Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {['REST API', 'WEBSOCKETS', 'PYTHON SDK', 'NODE.JS', 'REACT', 'WEBHOOKS', 'GLOBAL EDGE', 'ENTERPRISE'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: 2 WIDE CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* KART 4: Conversational Telephony & IVR */}
            <div className="group relative rounded-3xl bg-[#141210] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="relative w-full h-48 mb-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative w-3/4 h-28 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md transform -rotate-2 flex items-center justify-around px-6 transition-transform duration-500 group-hover:scale-105 shadow-2xl">
                  <Radio className="size-8 text-amber-400 animate-pulse" />
                  <div className="h-px w-16 bg-amber-500/40 border-dashed border-t" />
                  <Cpu className="size-8 text-amber-300" />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">Conversational Telephony & IVR</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Gelen ve giden tüm telefon çağrılarını yapay zeka ile karşılayın. SIP Trunking ve otomatik çağrı aktarımı ile kurumsal santrallere direkt entegrasyon.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {['SIP TRUNKING', 'TELEPHONY', 'IVR PIPELINES', 'VOICE MAIL', 'INBOUND', 'OUTBOUND', 'REAL-TIME CALLS'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* KART 5: Global Infrastructure & Edge */}
            <div className="group relative rounded-3xl bg-[#141210] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="relative w-full h-48 mb-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative w-3/4 h-28 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md transform rotate-2 flex items-center justify-around px-6 transition-transform duration-500 group-hover:scale-105 shadow-2xl">
                  <Globe2 className="size-8 text-cyan-400" />
                  <ShieldCheck className="size-8 text-teal-400" />
                  <Database className="size-8 text-blue-400" />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">Global Low-Latency Edge</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Dünya genelinde dağıtık Edge sunucu ağımız sayesinde ses işleme gecikmesini min 40ms seviyesinde tutun. GDPR ve yüksek güvenlik standartları dahilinde.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {['AMSTERDAM HUB', 'LOW LATENCY', 'GDPR COMPLIANT', '24/7 UPTIME', 'CUSTOM VOICE', 'FEDRAMP CERTIFIED'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}