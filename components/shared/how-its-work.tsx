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
  ArrowRight,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Gift,
  Coins,
  Crown,
  Star,
  MessageCircle,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Download,
  Copy,
  Check
} from "lucide-react";
import { IconBrandGithub, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';


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
    <div className="flex items-end gap-[3px] h-8">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-purple-500/60 transition-all duration-300"
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

// ─── VOICE DEMO CARD ─────────────────────────────────────────

function VoiceDemoCard({ 
  language, 
  text, 
  flag,
  delay = 0 
}: { 
  language: string; text: string; flag: string; delay?: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FadeIn delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 transition-all duration-500 hover:border-purple-500/20 hover:bg-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{flag}</span>
            <span className="text-xs font-semibold text-white/60">{language}</span>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all duration-300 hover:border-purple-500/30 hover:text-purple-400 hover:bg-purple-500/5"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
          </button>
        </div>

        <div className="mb-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
          <p className="text-[13px] text-white/50 leading-relaxed">{text}</p>
        </div>

        <div className="flex items-center justify-between">
          <AudioWave isPlaying={isPlaying} />
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[11px] text-white/20 transition-colors hover:text-white/50"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── DONATION TIER CARD ──────────────────────────────────────

function DonationTier({ 
  icon: Icon,
  name,
  amount,
  color,
  features,
  delay = 0
}: { 
  icon: React.ElementType; name: string; amount: string; color: string; features: string[]; delay?: number;
}) {
  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    bronze: { border: "border-amber-700/30", bg: "bg-amber-700/10", text: "text-amber-600", glow: "shadow-amber-700/10" },
    silver: { border: "border-slate-400/30", bg: "bg-slate-400/10", text: "text-slate-400", glow: "shadow-slate-400/10" },
    gold: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-500", glow: "shadow-yellow-500/10" },
    diamond: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/10" },
  };
  const c = colorMap[color];

  return (
    <FadeIn delay={delay}>
      <div className={`group relative overflow-hidden rounded-2xl border ${c.border} bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-500 hover:shadow-2xl ${c.glow} hover:bg-white/[0.04]`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.text} mb-4`}>
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="text-lg font-bold text-white/90">{name}</h3>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{amount}</span>
          <span className="text-xs text-white/30">/month</span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-white/40">
              <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-white/20" />
              {f}
            </li>
          ))}
        </ul>

        <button className={`mt-6 w-full rounded-full border ${c.border} ${c.bg} py-2.5 text-xs font-semibold ${c.text} transition-all duration-300 hover:opacity-80`}>
          Subscribe
        </button>
      </div>
    </FadeIn>
  );
}

// ─── PLATFORM INTEGRATION CARD ───────────────────────────────

function PlatformCard({ 
  icon: Icon,
  name,
  description,
  status,
  color,
  delay = 0
}: { 
  icon: React.ElementType; name: string; description: string; status: string; color: string; delay?: number;
}) {
  const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
    red: { border: "border-red-500/20", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
    green: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
    purple: { border: "border-purple-500/20", bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
  };
  const c = colorMap[color];

  return (
    <FadeIn delay={delay}>
      <div className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg} ${c.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/80">{name}</span>
            <span className={`flex h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
          </div>
          <p className="text-[11px] text-white/30 mt-0.5">{description}</p>
        </div>
        <span className={`shrink-0 rounded-full ${c.bg} ${c.text} px-2 py-0.5 text-[10px] font-semibold`}>
          {status}
        </span>
      </div>
    </FadeIn>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"voice" | "donate" | "platforms">("voice");

  const voiceDemos = [
    { language: "English (US)", text: "Hello! I'm your AI voice assistant. I can speak naturally in over 50 languages with perfect emotion and tone.", flag: "🇺🇸" },
    { language: "Uzbek", text: "Salom! Men sizning sun'iy intellekt ovoz yordamchingizman. Men 50 dan ortiq til tabiiy ravishda gapira olaman.", flag: "🇺🇿" },
    { language: "Russian", text: "Здравствуйте! Я ваш голосовой помощник на базе ИИ. Говорю естественно на 50+ языках.", flag: "🇷🇺" },
    { language: "Turkish", text: "Merhaba! Ben yapay zeka ses asistanınızım. 50'den fazla dilde doğal bir şekilde konuşabilirim.", flag: "🇹🇷" },
    { language: "Arabic", text: "مرحباً! أنا مساعدك الصوتي بالذكاء الاصطناعي. يمكنني التحدث بشكل طبيعي بأكثر من 50 لغة.", flag: "🇸🇦" },
    { language: "Japanese", text: "こんにちは！AI音声アシスタントです。50以上の言語で自然に話せます。", flag: "🇯🇵" },
  ];

  const donationTiers = [
    { icon: Heart, name: "Supporter", amount: "$5", color: "bronze", features: ["Priority TTS queue", "Basic voice cloning", "Community Discord access", "Monthly updates"] },
    { icon: Star, name: "Creator", amount: "$15", color: "silver", features: ["Everything in Supporter", "Advanced voice cloning", "Custom voice presets", "API access (1K req/mo)", "Direct support"] },
    { icon: Crown, name: "Producer", amount: "$49", color: "gold", features: ["Everything in Creator", "Unlimited voice cloning", "Commercial license", "API access (50K req/mo)", "Early access to features"] },
    { icon: Sparkles, name: "Enterprise", amount: "$199", color: "diamond", features: ["Everything in Producer", "Dedicated infrastructure", "Custom model training", "Unlimited API", "SLA guarantee", "White-label option"] },
  ];

  const platforms = [
    { icon: IconBrandYoutube, name: "YouTube", description: "Super Chat & Membership alerts with AI voice", status: "Live", color: "red" },
    { icon: Radio, name: "Kick", description: "Stream donations with custom AI voice messages", status: "Live", color: "green" },
    { icon: Tv, name: "Twitch", description: "Bits & Sub alerts with multilingual TTS", status: "Live", color: "purple" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-white font-sans">
      <div className="relative z-10 mx-auto max-w-full px-5 py-24 sm:px-8 lg:px-16">

        {/* ═══ HEADER ═══ */}
        <FadeIn className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.5)] animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">How It Works</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[0.95]">
            Voice AI for
            <br />
            <span className="font-serif italic font-light text-white/40">every creator.</span>
          </h1>
          <div className="mt-5 flex items-start justify-center gap-4 max-w-lg mx-auto">
            <div className="mt-2.5 h-px w-8 bg-gradient-to-r from-purple-500/50 to-transparent" />
            <p className="text-sm leading-relaxed text-white/30">
              Clone your voice in seconds. Speak 50+ languages. Accept donations on YouTube, Kick, and Twitch with AI-powered voice messages.
            </p>
          </div>
        </FadeIn>

        {/* ═══ TABS ═══ */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.02] p-1 backdrop-blur-xl">
              {([
                { id: "voice", label: "Voice Demo", icon: Mic },
                { id: "donate", label: "Donations", icon: Gift },
                { id: "platforms", label: "Platforms", icon: Zap },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-white/[0.08] text-white shadow-lg" 
                      : "text-white/30 hover:text-white/50"
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
          <div className="space-y-6">
            <FadeIn>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white/90">Try the Voices</h2>
                  <p className="mt-1 text-xs text-white/30">Click play to hear AI-generated speech in different languages</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                  <Globe className="h-3.5 w-3.5 text-white/30" />
                  <span className="text-[11px] text-white/40">50+ Languages</span>
                </div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {voiceDemos.map((demo, i) => (
                <VoiceDemoCard key={i} {...demo} delay={i * 0.08} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: DONATIONS ═══ */}
        {activeTab === "donate" && (
          <div className="space-y-6">
            <FadeIn>
              <div className="mb-8 text-center">
                <h2 className="text-xl font-bold text-white/90">Support with Voice</h2>
                <p className="mt-1 text-xs text-white/30">Monetize your content with AI-powered donation messages</p>
              </div>
            </FadeIn>

            {/* Platform integrations */}
            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {platforms.map((p, i) => (
                <PlatformCard key={i} {...p} delay={i * 0.1} />
              ))}
            </div>

            {/* Donation tiers */}
            <FadeIn delay={0.3}>
              <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-white/80">Creator Tiers</h3>
                <p className="mt-1 text-xs text-white/30">Choose your plan and start earning</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {donationTiers.map((tier, i) => (
                <DonationTier key={i} {...tier} delay={0.4 + i * 0.1} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: PLATFORMS ═══ */}
        {activeTab === "platforms" && (
          <div className="space-y-6">
            <FadeIn>
              <div className="mb-8 text-center">
                <h2 className="text-xl font-bold text-white/90">Platform Integrations</h2>
                <p className="mt-1 text-xs text-white/30">Connect your streaming platforms in one click</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* YouTube */}
              <FadeIn delay={0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                    <IconBrandYoutube size={24} color="red" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">YouTube Super Chat</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/30">
                        When viewers send Super Chat, Miralas reads their message aloud in your cloned voice. Supports English, Uzbek, Russian, and 47 more languages.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Super Chat", "Memberships", "Premieres", "Live Streams"].map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] text-white/40">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Kick */}
              <FadeIn delay={0.2}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Radio className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">Kick Donations</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/30">
                        Automatic TTS for every donation on Kick. Custom triggers, sound effects, and multi-language support for global audiences.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Donations", "Sub Alerts", "Follow Alerts", "Bits"].map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] text-white/40">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Twitch */}
              <FadeIn delay={0.3}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                      <Tv className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">Twitch Integration</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/30">
                        Full Twitch EventSub support. Bits, subs, raids, and channel points all trigger AI voice responses in real-time.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Bits", "Subs", "Raids", "Channel Points"].map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] text-white/40">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Stats */}
              <FadeIn delay={0.4}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Live Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Active Creators", value: "12,847" },
                      { label: "Messages/Day", value: "2.4M" },
                      { label: "Languages", value: "50+" },
                      { label: "Uptime", value: "99.97%" },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                        <div className="text-lg font-bold text-white/80">{stat.value}</div>
                        <div className="text-[10px] text-white/25 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        )}

        {/* ═══ BOTTOM CTA ═══ */}
        <FadeIn delay={0.3} className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-8 py-12 text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[500px] rounded-full bg-purple-500/[0.04] blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">Ready to Start?</p>
              <h3 className="mx-auto mt-4 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Clone your voice. Go live. Earn more.
              </h3>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white/50 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/70">
                  <Download className="h-4 w-4" />
                  Download App
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}