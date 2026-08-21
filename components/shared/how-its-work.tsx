/* eslint-disable react-hooks/purity */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { 
  Mic, 
  Globe, 
  Heart,
  Radio,
  Tv,
  Zap,
  Play,
  Pause,
  Gift,
  Crown,
  Star,
  Sparkles,
  Copy,
  Check,
  Languages,
  BadgeDollarSign
} from "lucide-react";
import { IconBrandYoutube } from '@tabler/icons-react';


// ─── ANIMATION UTILITIES ──────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function FadeIn({ children, className = "", delay = 0, direction = "up" }: { 
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right";
}) {
  const { ref, isInView } = useInView();
  const transforms = { up: "translateY(30px)", down: "translateY(-30px)", left: "translateX(30px)", right: "translateX(-30px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translate(0)" : transforms[direction],
      transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── AUDIO WAVE VISUALIZER ───────────────────────────────────

function AudioWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          // Renkler minimalist: Koyu gri -> Beyaz
          className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying ? 'bg-white' : 'bg-neutral-700'} group-hover:bg-neutral-900`}
          style={{
            height: isPlaying ? `${20 + Math.random() * 60}%` : '20%',
            animationDelay: `${i * 0.05}s`,
            animation: isPlaying ? `wave 0.8s ease-in-out ${i * 0.05}s infinite alternate` : 'none',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── MINIMALIST KRAFT-STYLE VOICE CARD ─────────────────────

function VoiceDemoCard({ language, text, flag, delay = 0, icon: Icon }: { language: string; text: string; flag: string; delay?: number; icon: React.ElementType; }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FadeIn delay={delay}>
      {/* Kart hover animasyonları ve referanstaki gibi beyazlaşma efekti */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:border-neutral-200 hover:shadow-2xl hover:shadow-white/10 text-white hover:text-neutral-950">
        
        {/* Başlık ve Oynatma Butonu */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xl">{flag}</span>
            <span className="text-sm font-semibold opacity-60 group-hover:opacity-80">{language}</span>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-neutral-400 transition-all duration-300 hover:border-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 group-hover:border-neutral-300 group-hover:bg-neutral-100 group-hover:text-neutral-800"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-1" />}
          </button>
        </div>

        {/* Ana İllüstrasyon İkonu (Büyük ve Ortada) */}
        <div className="flex justify-center mb-10">
          <Icon className="w-20 h-20 text-white/90 group-hover:text-neutral-950 transition-colors" />
        </div>

        {/* Özet Metin */}
        <div className="mb-6 rounded-2xl bg-black/30 group-hover:bg-neutral-100 p-5 pr-10 transition-colors duration-300">
          <p className="text-sm leading-relaxed opacity-70 group-hover:opacity-90">{text}</p>
        </div>

        {/* Alt Bilgi */}
        <div className="flex items-center justify-between">
          <AudioWave isPlaying={isPlaying} />
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs opacity-50 transition-colors hover:opacity-90 group-hover:hover:opacity-100"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── MINIMALIST KRAFT-STYLE DONATION CARD ──────────────────

function DonationTier({ icon: Icon, name, amount, features, delay = 0 }: { icon: React.ElementType; name: string; amount: string; features: string[]; delay?: number; }) {
  return (
    <FadeIn delay={delay}>
      {/* Kart hover animasyonları ve referanstaki gibi beyazlaşma efekti */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:border-neutral-200 hover:shadow-2xl hover:shadow-white/10 text-white hover:text-neutral-950">
        
        {/* Ana İllüstrasyon İkonu (Büyük ve Ortada) */}
        <div className="flex justify-center mb-10">
          <Icon className="w-20 h-20 text-white/90 group-hover:text-neutral-950 transition-colors" />
        </div>

        {/* Başlık ve Tutar */}
        <h3 className="text-2xl font-bold mb-2 group-hover:text-neutral-950 transition-colors">{name}</h3>
        <div className="mb-8 flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold group-hover:text-neutral-950 transition-colors">{amount}</span>
          <span className="text-sm opacity-50 group-hover:opacity-80 transition-colors">/month</span>
        </div>

        {/* Özellikler (Özet) */}
        <ul className="space-y-3.5 mb-10">
          {features.slice(0, 3).map((f, i) => ( // Sadece ilk 3 özelliği göstererek özetle
            <li key={i} className="flex items-start gap-2.5 text-sm opacity-70 group-hover:opacity-90 transition-colors">
              <Check className="h-4 w-4 shrink-0 mt-0.5 opacity-50 group-hover:opacity-80 transition-colors" />
              {f}
            </li>
          ))}
        </ul>

        {/* Buton (Hover'da Siyah Arka Plan) */}
        <button className="w-full rounded-xl bg-white/10 hover:bg-neutral-700 py-3.5 text-sm font-semibold transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-white group-hover:shadow-lg group-hover:shadow-black/10">
          Subscribe
        </button>
      </div>
    </FadeIn>
  );
}

// ─── MINIMALIST KRAFT-STYLE PLATFORM CARD ──────────────────

function PlatformCard({ icon: Icon, name, description, status, color, delay = 0 }: { icon: React.ElementType; name: string; description: string; status: string; color: string; delay?: number; }) {
 
  const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
    red: { border: "border-neutral-700/50", bg: "bg-black", text: "text-red-400", dot: "bg-red-400" },
    green: { border: "border-neutral-700/50", bg: "bg-black", text: "text-emerald-400", dot: "bg-emerald-400" },
    neutral: { border: "border-neutral-700/50", bg: "bg-black", text: "text-neutral-400", dot: "bg-neutral-400" },
  };
  const c = colorMap[color];

  return (
    <FadeIn delay={delay}>
      <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-balck p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.05)]">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/90">{name}</span>
            <span className={`flex h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
          </div>
          <p className="text-xs text-white/40 mt-0.5 group-hover:text-white/60 transition-colors leading-relaxed">{description}</p>
        </div>
        <span className={`shrink-0 rounded-full ${c.bg} ${c.text} px-2.5 py-1 text-[10px] font-semibold transition-transform duration-300 group-hover:scale-105`}>
          {status}
        </span>
      </div>
    </FadeIn>
  );
}

// ─── MAIN PAGE (KRAFT STYLE) ───────────────────────────────

export default function HowItWorksKraft() {
  const [activeTab, setActiveTab] = useState<"voice" | "donate" | "platforms">("voice");

  // Her sekme için 3, toplamda 9 minimalist kart verisi
  const voiceDemos = [
    { language: "English (US)", text: "I speak naturally with perfect emotion and tone, just like a human assistant.", flag: "🇺🇸", icon: Mic },
    { language: "Turkish", text: "Merhaba! 50'den fazla dilde doğal bir şekilde, Türkçe de dahil, iletişim kurabilirim.", flag: "🇹🇷", icon: Languages },
    { language: "Japanese", text: "こんにちは！ AI音声アシスタントです。 自然な発音で、 日本語を話せます。", flag: "🇯🇵", icon: Globe },
  ];

  const donationTiers = [
    { icon: Heart, name: "Supporter", amount: "$5", features: ["Priority TTS queue", "Basic voice cloning", "Community Discord access"] },
    { icon: Star, name: "Creator", amount: "$15", features: ["Advanced voice cloning", "API access (1K req/mo)", "Direct support"] },
    { icon: Crown, name: "Producer", amount: "$49", features: ["Unlimited voice cloning", "Commercial license", "API access (50K req/mo)"] },
  ];

const platforms = [
    { 
      icon: IconBrandYoutube, 
      name: "YouTube", 
      description: "Instantly have incoming Super Chat messages and new membership alerts read aloud during your live streams using an AI voice of your choice. Elevate viewer interaction with a natural tone.", 
      status: "Live", 
      color: "red" 
    },
    { 
      icon: Radio, 
      name: "Kick", 
      description: "Display the donations you receive during your stream—along with the donor's message—using fully customizable AI voice characters.", 
      status: "Live", 
      color: "green" 
    },
    { 
      icon: Tv, 
      name: "Twitch", 
      description: "Integrate alerts for Bits, subscriptions, and gift subscriptions with multilingual TTS (Text-to-Speech) support. Have your global viewers' messages read aloud in their own languages.", 
      status: "Live", 
      color: "neutral" 
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-white font-sans ">
      <div className="relative z-10 mx-auto max-w-full px-5 py-24 sm:px-8 lg:px-16">
        
        <FadeIn className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 transition-colors hover:bg-neutral-800/80">
            <span className="flex h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">How It Works</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[0.95]">
            From idea
            <br />
            <span className="font-serif italic font-light text-neutral-500">in simple steps.</span>
          </h1>
          <div className="mt-8 flex items-start justify-center gap-4 max-w-lg mx-auto">
            <div className="mt-2.5 h-px w-10 bg-neutral-800" />
            <p className="text-sm leading-relaxed text-neutral-500 max-w-md">
              Clone your voice. Speak 50+ languages. Connect your YouTube, Kick, or Twitch for AI voice alerts and donations.
            </p>
          </div>
        </FadeIn>

        
        <FadeIn delay={0.2} className="mb-16">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900 p-1.5 backdrop-blur-xl">
              {([
                { id: "voice", label: "Voice Demo", icon: Mic },
                { id: "donate", label: "Donations", icon: Gift },
                { id: "platforms", label: "Platforms", icon: Zap },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-white text-neutral-950 shadow-lg scale-105" 
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ═══ TAB: VOICE DEMO ═══ */}
        {activeTab === "voice" && (
          <div className="space-y-10">
            <FadeIn>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white/90 group-hover:text-neutral-950 transition-colors">Listen to the Voices</h2>
                  <p className="mt-1 text-sm text-neutral-500">Generate realistic speech instantly in different languages.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 transition-colors duration-300 hover:border-neutral-700">
                  <Globe className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[11px] font-medium text-white/80">50+ Languages</span>
                </div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {voiceDemos.map((demo, i) => (
                <VoiceDemoCard key={i} {...demo} delay={i * 0.08} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: DONATIONS ═══ */}
        {activeTab === "donate" && (
          <div className="space-y-10">
            <FadeIn>
              <div className="mb-10 text-center">
                <h2 className="text-xl font-bold text-white/90 group-hover:text-neutral-950 transition-colors">Support with AI Voice</h2>
                <p className="mt-1 text-sm text-neutral-500 max-w-sm mx-auto">Create custom donation alerts using your cloned AI voice.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {donationTiers.map((tier, i) => (
                <DonationTier key={i} {...tier} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: PLATFORMS ═══ */}
        {activeTab === "platforms" && (
          <div className="space-y-10">
            <FadeIn>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white/90 group-hover:text-neutral-950 transition-colors">Connect Integrations</h2>
                  <p className="mt-1 text-sm text-neutral-500">Connect your preferred streaming services in simple steps.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 transition-colors duration-300 hover:border-neutral-700">
                  <BadgeDollarSign className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-[11px] font-medium text-white/80">Alerts & TTS</span>
                </div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {platforms.map((p, i) => (
                <PlatformCard key={i} {...p} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )} 
      </div>
    </section>
  );
}