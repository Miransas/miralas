/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Sparkles, 
  ChevronDown, 
  Terminal, 
  Code2, 
  Volume2, 
  Layers, 
  Mic, 
  Music, 
  FileText,
  Cpu
} from "lucide-react";
import Link from "next"

// Tab Tipleri
type ApiTabType = "tts" | "transcription" | "music" | "sfx" | "engine";

interface TabContent {
  id: ApiTabType;
  label: string;
  icon: any;
  title: string;
  description: string;
  sampleText: string;
  defaultVoice: string;
  defaultLanguage: string;
  codeSnippet: string;
}

const API_TABS: TabContent[] = [
  {
    id: "tts",
    label: "Text to Speech API",
    icon: FileText,
    title: "Metni Canlı Sese Dönüştürün",
    description: "Yapay zeka modellerimizle metinlerinizi akıcı ve duygusal stüdyo seslerine aktarın.",
    sampleText: "In the ancient land of Eldoria, where skies shimmered and forests whispered secrets, lived a dragon named Zephyros. [sarcastically] Not the 'burn it all down' kind... [giggles] It was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.",
    defaultVoice: "Spuds Oxley",
    defaultLanguage: "English (US)",
    codeSnippet: `const response = await mlabs.textToSpeech.convert("voice_01", {
  text: "In the ancient land of Eldoria...",
  model_id: "miralas_multilingual_v2"
});`
  },
  {
    id: "transcription",
    label: "Transcription",
    icon: Mic,
    title: "Yüksek Doğruluklu Ses Analizi",
    description: "Ses dosyalarınızı milisaniyeler içinde kusursuz metinlere ve dökümlere dönüştürün.",
    sampleText: "[00:01.20] Miralas AI Studio altyapısı başlatıldı. [00:03.45] WebSocket akışı aktif ve kararlı.",
    defaultVoice: "Auto Detect",
    defaultLanguage: "Türkçe (TR)",
    codeSnippet: `const transcript = await mlabs.speechToText.convert({
  audio: fileStream,
  language: "tr"
});`
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    title: "Yapay Zeka Müzik Üretimi",
    description: "Projeleriniz için telifsiz, tamamen özgün arka plan müzikleri ve melodiler yaratın.",
    sampleText: "[Prompt: Epic cinematic orchestral theme with subtle mysterious ambient pads and soft piano beats.]",
    defaultVoice: "Cinematic 4K",
    defaultLanguage: "Enstrümantal",
    codeSnippet: `const track = await mlabs.music.generate({
  prompt: "Cinematic orchestral theme...",
  duration_seconds: 45
});`
  },
  {
    id: "sfx",
    label: "Sound Effects",
    icon: Volume2,
    title: "Sinematik Ses Efektleri (SFX)",
    description: "Olaylar, oyunlar ve videolar için metin komutlarıyla gerçekçi ses efektleri üretin.",
    sampleText: "[Prompt: Futuristic sci-fi spaceship warp door opening with heavy hydraulic echo.]",
    defaultVoice: "Sci-Fi Pack",
    defaultLanguage: "Efekt",
    codeSnippet: `const sfx = await mlabs.soundEffects.generate({
  text: "Sci-fi spaceship warp door...",
  duration: 2.5
});`
  },
  {
    id: "engine",
    label: "Speech Engine",
    icon: Cpu,
    title: "Özel Model Eğitimi & Engine",
    description: "Kendi ses modelinizi eğitin veya yüksek performanslı kurumsal motorları yönetin.",
    sampleText: "[Engine Status: Operational | Latency: 142ms | TPU Cluster #4 Active]",
    defaultVoice: "Custom Model #9",
    defaultLanguage: "Global",
    codeSnippet: `const engine = await mlabs.engines.deploy({
  base_model: "v2_turbo",
  custom_weights: "s3://models/client-x"
});`
  }
];

export function ApiHeroSection() {
  const [activeTab, setActiveTab] = useState<ApiTabType>("tts");
  const [viewMode, setViewMode] = useState<"demo" | "code">("demo");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  const currentData = API_TABS.find((t) => t.id === activeTab) || API_TABS[0];

  const [selectedVoice, setSelectedVoice] = useState(currentData.defaultVoice);
  const [selectedLang, setSelectedLang] = useState(currentData.defaultLanguage);

  // Tab değiştiğinde varsayılanları güncelle
  const handleTabChange = (tabId: ApiTabType) => {
    setActiveTab(tabId);
    setIsPlaying(false);
    const found = API_TABS.find((t) => t.id === tabId);
    if (found) {
      setSelectedVoice(found.defaultVoice);
      setSelectedLang(found.defaultLanguage);
    }
  };

  return (
    <section className="relative w-full py-24 bg-background text-foreground overflow-hidden">
      
      {/* Şık Arka Plan Parlaması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#c9a87c]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Üst Başlık (Görseldeki mantık, lüks tasarım) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              <Terminal className="size-3.5 text-[#c9a87c]" />
              <span>Geliştirici Platformu</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Dakikalar içinde <span className="text-[#c9a87c]">üretime hazır</span> ses AI kurun
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground font-light">
              Ölçeklenebilir API altyapısı; Text to Speech, Transcription[cite: 3], Voice Agents ve Müzik üretimi bir arada.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/dashboard/api-keys"
              className="px-6 py-3 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              API Anahtarı Al
            </a>
            <a href="/recorusec/docs"
             className="px-6 py-3 rounded-full border border-border/80 bg-card/50 backdrop-blur-md text-foreground text-xs font-semibold hover:bg-muted/50 transition-colors"

            >
            Docs
            </a>
          </div>
        </div>

        {/* ANA KASA KUTUSU (Görseldeki büyük arayüz kartı yerine lüks panel) */}
        <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Üst Küçük Başlık ve Demo/Code Seçici */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40 mb-8">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="size-4 text-[#c9a87c]" />
                {currentData.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-light">
                {currentData.description}
              </p>
            </div>

            {/* Demo / Code Toggle (Görseldeki sağ üst düğmeler) */}
            <div className="flex items-center p-1 rounded-full border border-border/60 bg-background/50 backdrop-blur-md shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("demo")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  viewMode === "demo"
                    ? "bg-[#c9a87c] text-black shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Demo
              </button>
              <button
                type="button"
                onClick={() => setViewMode("code")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  viewMode === "code"
                    ? "bg-[#c9a87c] text-black shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Kod
              </button>
            </div>
          </div>

          {/* İÇERİK ALANI: DEMO VEYA KOD */}
          <AnimatePresence mode="wait">
            {viewMode === "demo" ? (
              <motion.div
                key="demo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Metin & Kontrol Alanı (Görseldeki beyaz iç Kutu) */}
                <div className="rounded-2xl border border-border/60 bg-background/80 backdrop-blur-md p-6 shadow-inner">
                  <p className="text-sm md:text-base text-foreground font-light leading-relaxed mb-6 font-mono">
                    {currentData.sampleText}
                  </p>

                  {/* Alt Kontrol Barı: Dil, Aktör ve Play Butonu */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
                    
                    <div className="flex flex-wrap items-center gap-3">
                      
                      {/* Dil Seçici (Accordion / Dropdown mantığı) */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsLangDropdownOpen(!isLangDropdownOpen);
                            setIsVoiceDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card/60 text-xs font-medium text-foreground hover:border-[#c9a87c]/50 transition-colors"
                        >
                          <span className="size-2 rounded-full bg-[#c9a87c]" />
                          <span>{selectedLang}</span>
                          <ChevronDown className="size-3.5 text-muted-foreground" />
                        </button>

                        {isLangDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border/60 bg-card shadow-xl p-1 z-20">
                            {["English (US)", "Türkçe (TR)", "Español", "日本語", "Deutsch"].map((lang) => (
                              <button
                                key={lang}
                                onClick={() => {
                                  setSelectedLang(lang);
                                  setIsLangDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-xs rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                              >
                                {lang}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Ses / Aktör Seçici (Accordion / Dropdown mantığı) */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsVoiceDropdownOpen(!isVoiceDropdownOpen);
                            setIsLangDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card/60 text-xs font-medium text-foreground hover:border-[#c9a87c]/50 transition-colors"
                        >
                          <Mic className="size-3.5 text-[#c9a87c]" />
                          <span>{selectedVoice}</span>
                          <ChevronDown className="size-3.5 text-muted-foreground" />
                        </button>

                        {isVoiceDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border/60 bg-card shadow-xl p-1 z-20">
                            {["Spuds Oxley", "Miralas Pro Voice", "Aria Studio", "Marcus Prime"].map((voice) => (
                              <button
                                key={voice}
                                onClick={() => {
                                  setSelectedVoice(voice);
                                  setIsVoiceDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-xs rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                              >
                                {voice}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Play / Pause Düğmesi */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#c9a87c] text-black font-semibold text-xs hover:bg-[#b8976b] transition-all shadow-md group"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="size-4 fill-black" />
                          <span>Durdur</span>
                        </>
                      ) : (
                        <>
                          <Play className="size-4 fill-black group-hover:scale-110 transition-transform" />
                          <span>Oynat</span>
                        </>
                      )}
                    </button>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border/60 bg-slate-950 p-6 font-mono text-xs text-indigo-200 overflow-x-auto shadow-inner"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-slate-400">
                  <span className="flex items-center gap-2">
                    <Code2 className="size-4 text-emerald-400" />
                    <span>miralas-sdk.ts</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    TypeScript / Node.js
                  </span>
                </div>
                <pre className="leading-relaxed">
                  <code>{currentData.codeSnippet}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ALT SEKMELER (Görselin en altındaki Text to Speech API, Transcription vb. butonlar) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 mt-8 border-t border-border/40 scrollbar-none">
            {API_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-foreground text-background shadow-lg scale-105"
                      : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  <TabIcon className={`size-4 ${isActive ? "text-[#c9a87c]" : "text-muted-foreground"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default ApiHeroSection;