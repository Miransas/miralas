/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export default function Feature() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "Lightning-Fast Global Edge",
      description: "Deploy your endpoints across 300+ cities instantly. Zero configuration required with absolute low latency.",
      tag: "Performance",
      codeSnippet: "edge.deploy({ region: 'auto', ttl: '30s' })",
      metric: "< 12ms",
      metricLabel: "Global Latency"
    },
    {
      id: 1,
      title: "Real-time Telemetry & Logs",
      description: "Stream every single request and payload securely with end-to-end encryption and sub-millisecond tracking.",
      tag: "Security & Observability",
      codeSnippet: "stream.listen('api.v2.telemetry', { secure: true })",
      metric: "99.99%",
      metricLabel: "Data Accuracy"
    },
    {
      id: 2,
      title: "Automated Scaling & Failover",
      description: "Never drop a connection. Intelligent traffic balancing handles massive traffic spikes automatically without breaking a sweat.",
      tag: "Reliability",
      codeSnippet: "cluster.scale({ minNodes: 10, maxNodes: 10000 })",
      metric: "10M+",
      metricLabel: "Req / Second"
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black overflow-hidden px-6 py-28 transition-colors duration-500 font-sans">

      {/* Hareketli Nokta Deseni (Animated Dot Pattern) */}
      <div
        className="absolute inset-0 z-0 opacity-70 dark:opacity-100 animate-dot-pan pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dotPan {
          0% { background-position: 0px 0px; }
          100% { background-position: 56px 56px; }
        }
        .animate-dot-pan {
          animation: dotPan 25s linear infinite;
        }
      `}} />

      {/* --- ANA İÇERİK (Grid Layout: Sticky Sol + Değişen Sağ Kartlar) --- */}
      <div className="relative z-30 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* SOL TARAF: Sticky Başlık ve Navigasyon */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col space-y-8">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest bg-zinc-200/60 dark:bg-white/10 px-3 py-1.5 rounded-full">
              Built for Scale
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.1] mt-4">
              Engineered for the modern web.
            </h2>
          </div>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Everything you need to run high-performance workloads at global scale, packaged into clean, developer-first primitives.
          </p>

          {/* Özellik Seçim Butonları (Sticky Alan İçinde Etkileşim) */}
          <div className="flex flex-col space-y-3 pt-2">
            {features.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveFeature(idx)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 border ${
                  activeFeature === idx 
                    ? "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-white/20 shadow-lg" 
                    : "bg-transparent border-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-900/40 text-zinc-500 dark:text-zinc-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${activeFeature === idx ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                    0{item.id + 1}. {item.title}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFeature === idx ? "bg-blue-500 dark:bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-transparent"}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SAĞ TARAF: Dinamik Öne Çıkan Kart (Görsel / Kod Paneli) */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-[2.5rem] border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-8 sm:p-12 transition-all duration-500">
            
            {/* Kart Üst Etiketi */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 px-3 py-1 rounded-md">
                {features[activeFeature].tag}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                SYSTEM_STATUS: ONLINE
              </span>
            </div>

            {/* Başlık ve Açıklama */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-4 transition-all duration-300">
              {features[activeFeature].title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed mb-8 transition-all duration-300">
              {features[activeFeature].description}
            </p>

            {/* Metrik Gösterge Kutusu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
                <div className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-1">
                  {features[activeFeature].metric}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {features[activeFeature].metricLabel}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-white/10 flex items-center justify-center text-blue-600 dark:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Kod / Terminal Örneği */}
            <div className="rounded-xl bg-zinc-900 dark:bg-black border border-zinc-800 p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-500">
                <span>runtime.ts</span>
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                </span>
              </div>
              <code>{"> "}{features[activeFeature].codeSnippet}</code>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}