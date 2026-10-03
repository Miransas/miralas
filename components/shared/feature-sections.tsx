"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight, 
  Mic, 
  Globe, 
  Zap, 
  Layers, 
  Radio, 
  Code2, 
  Sparkles,
  Cpu,
  Terminal
} from "lucide-react";

export function FeaturesBento() {
  return (
    <section className="relative bg-background py-24 px-6 text-foreground md:px-12 overflow-hidden">
      
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#c9a87c]/10 dark:bg-[#c9a87c]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Üst Başlık Alanı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              <Sparkles className="size-3.5 text-[#c9a87c]" />
              <span>Sınırsız Özellikler</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Bir sesin ihtiyacı olan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a87c] via-[#e8d5b5] to-[#c9a87c]">
                her şey ve daha fazlası.
              </span>
            </h2>
          </div>
          
          <Link
            href="/features"
            className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border/80 bg-card/60 backdrop-blur-md px-6 py-3 text-xs font-semibold text-foreground transition-all duration-300 hover:bg-[#c9a87c] hover:text-black hover:border-[#c9a87c] shadow-sm"
          >
            <span>Tüm Özellikleri İncele</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* BENTO GRID (Zenginleştirilmiş ve Dolu Kartlar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* KART 1: Text-to-Speech (Standart ama şık) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-1 lg:col-span-1 group relative flex flex-col justify-between rounded-3xl p-6 border border-border/60 bg-card/50 backdrop-blur-md hover:border-[#c9a87c]/50 hover:bg-card/80 transition-all duration-300 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="size-12 rounded-2xl border border-border/60 bg-muted/50 flex items-center justify-center text-[#c9a87c] group-hover:bg-[#c9a87c]/10 transition-colors">
                  <Mic className="size-5" />
                </div>
                <span className="text-2xl font-extrabold text-muted-foreground/40 group-hover:text-[#c9a87c] transition-colors font-mono">
                  01
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Text-to-Speech (TTS)</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Metinlerinizi nefes alışverişleri, duraksamalar ve insani duygularla kusursuz ses dosyalarına dönüştürün.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              <span>Stüdyo Kalitesi</span>
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* KART 2: Anında Ses Klonlama (Geniş & Vurgulu - Gradient Efektli) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 group relative flex flex-col justify-between rounded-3xl p-8 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-card border border-indigo-500/30 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl border border-indigo-400/30 bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                    <Radio className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-bold block">
                      Anında Klonlama
                    </span>
                    <h3 className="text-xl font-bold text-white">Sesinizi 3 Saniyede Klonlayın</h3>
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-indigo-400/40 font-mono">02</span>
              </div>
              <p className="text-xs md:text-sm text-indigo-100/80 font-light leading-relaxed max-w-lg mb-6">
                Sadece kısa bir ses kaydı yükleyerek kendi sesinizi ya da herhangi bir karakteri yapay zeka modeline dönüştürün. Aksanları ve tonlamaları %100 koruyun.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-indigo-200 font-medium">Anlık İşleme Aktif</span>
              </div>
              <ArrowUpRight className="size-4 text-indigo-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* KART 3: Real-time Agents (Dikey Vurgulu Kart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1 group relative flex flex-col justify-between rounded-3xl p-6 bg-gradient-to-b from-[#c9a87c]/20 via-card to-card border border-[#c9a87c]/40 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="size-12 rounded-2xl border border-[#c9a87c]/40 bg-[#c9a87c]/20 flex items-center justify-center text-[#c9a87c]">
                  <Zap className="size-5 fill-[#c9a87c]" />
                </div>
                <span className="text-2xl font-extrabold text-[#c9a87c]/40 font-mono">03</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Real-Time Agents</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Müşteri hizmetleri ve yapay zeka botları için ultra düşük gecikmeli (~150ms) canlı sesli görüşme altyapısı.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-[#c9a87c] font-medium">
              <span>Canlı Entegrasyon</span>
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* KART 4: Çoklu Dil Desteği (Geniş) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 group relative flex flex-col justify-between rounded-3xl p-8 border border-border/60 bg-card/50 backdrop-blur-md hover:border-border transition-all duration-300 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl border border-border/60 bg-muted/50 flex items-center justify-center text-foreground">
                    <Globe className="size-5 text-[#c9a87c]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a87c] font-bold block">
                      Global Erişim
                    </span>
                    <h3 className="text-xl font-bold text-foreground">30+ Dilde Kusursuz Sentez</h3>
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-muted-foreground/40 font-mono">04</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-lg mb-6">
                İngilizce, İspanyolca, Türkçe, Japonca ve onlarca farklı dilde ana dili gibi konuşan yapay zeka modelleriyle global pazarlara açılın.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/40">
              {["Türkçe", "English", "Español", "Français", "Deutsch", "日本語"].map((lang) => (
                <span key={lang} className="px-3 py-1 rounded-full border border-border/60 bg-background/60 text-[11px] font-medium text-muted-foreground">
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* KART 5: Developer Ready (Özel Kod / API Kartı) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 group relative flex flex-col justify-between rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-950 border border-emerald-500/30 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="size-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      Developer Ready
                    </span>
                    <h3 className="text-xl font-bold text-white">Güçlü REST & WebSocket API</h3>
                  </div>
                </div>
                <Terminal className="size-6 text-emerald-400/40" />
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-6">
                REST API ve WebSocket altyapısı ile saniyeler içinde kendi yazılımlarınıza ses sentezini entegre edin. Yüksek hız, güvenli token yönetimi ve sıfır kesinti.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {["Node.js", "Python", "Go", "Rust"].map((lang) => (
                  <span key={lang} className="px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-mono text-emerald-300 font-semibold">
                    {lang}
                  </span>
                ))}
              </div>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 group-hover:underline cursor-pointer">
                API Docs <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default FeaturesBento;