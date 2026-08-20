/* eslint-disable react-hooks/purity */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { AsciiBackground } from "@/components/shaders/ascii-background";
import { AsciiIntensityProvider } from "@/components/shaders/ascii-intensity";
import { AsciiIntensitySlider } from "@/components/shaders/AsciiIntensitySlider";
import { 
  Mic, 
  Waves, 
  Globe, 
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Users,
  Bot,
  ChevronRight,
  Star,
  Volume2,
  Languages,
  Radio,
  Cpu,
  Headphones,
  Copy,
  Check,
  Play,
  Pause,
  Download
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

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
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full bg-purple-500/50 transition-all duration-150"
          style={{
            height: isPlaying ? `${15 + Math.sin(i * 0.8 + Date.now() * 0.005) * 50}%` : '15%',
            animation: isPlaying ? `wave 0.6s ease-in-out ${i * 0.04}s infinite alternate` : 'none',
          }}
        />
      ))}
      <style jsx>{`@keyframes wave { 0% { height: 15%; } 100% { height: 100%; } }`}</style>
    </div>
  );
}

// ─── VOICE DEMO CARD ─────────────────────────────────────────

function VoiceDemoCard({ language, text, flag, delay = 0 }: { language: string; text: string; flag: string; delay?: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 transition-all duration-500 hover:border-purple-500/20 hover:bg-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-base">{flag}</span>
            <span className="text-xs font-semibold text-white/60">{language}</span>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all hover:border-purple-500/30 hover:text-purple-400"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
          </button>
        </div>

        <div className="mb-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
          <p className="text-[12px] text-white/45 leading-relaxed">{text}</p>
        </div>

        <div className="flex items-center justify-between">
          <AudioWave isPlaying={isPlaying} />
          <button 
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-1 text-[10px] text-white/20 hover:text-white/50 transition-colors"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── GLASS CARD ──────────────────────────────────────────────

function GlassCard({ children, className = "", glowColor = "purple" }: { 
  children: React.ReactNode; className?: string; glowColor?: "purple" | "blue" | "emerald" | "amber";
}) {
  const glowMap = {
    purple: "hover:border-purple-500/20 hover:shadow-purple-500/5",
    blue: "hover:border-blue-500/20 hover:shadow-blue-500/5",
    emerald: "hover:border-emerald-500/20 hover:shadow-emerald-500/5",
    amber: "hover:border-amber-500/20 hover:shadow-amber-500/5",
  };
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] ${glowMap[glowColor]} ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

// ─── FEATURE ROW ─────────────────────────────────────────────

function FeatureRow({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-purple-500/20 transition-colors duration-300">
        <Icon className="h-4 w-4 text-purple-400/70" />
      </div>
      <div>
        <h4 className="text-[13px] font-semibold text-white/80">{title}</h4>
        <p className="mt-0.5 text-[11px] text-white/30 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function About() {
  const voiceDemos = [
    { language: "English (US)", text: "Hello! I'm your AI voice assistant. I can speak naturally in over 50 languages with perfect emotion and tone.", flag: "🇺🇸" },
    { language: "Uzbek", text: "Salom! Men sizning sun'iy intellekt ovoz yordamchingizman. Men 50 dan ortiq til tabiiy ravishda gapira olaman.", flag: "🇺🇿" },
    { language: "Russian", text: "Здравствуйте! Я ваш голосовой помощник на базе ИИ. Говорю естественно на 50+ языках.", flag: "🇷🇺" },
    { language: "Turkish", text: "Merhaba! Ben yapay zeka ses asistanınızım. 50'den fazla dilde doğal bir şekilde konuşabilirim.", flag: "🇹🇷" },
    { language: "Arabic", text: "مرحباً! أنا مساعدك الصوتي بالذكاء الاصطناعي. يمكنني التحدث بشكل طبيعي بأكثر من 50 لغة.", flag: "🇸🇦" },
    { language: "Japanese", text: "こんにちは！AI音声アシスタントです。50以上の言語で自然に話せます。", flag: "🇯🇵" },
  ];

  const features = [
    {
      icon: Mic,
      badge: "Voice Clone",
      title: "Clone Any Voice in 3 Seconds",
      description: "Upload a 3-second sample. Our neural network captures timbre, pitch, and emotional nuance. Your voice, perfectly replicated.",
      color: "purple" as const,
      features: [
        { icon: Zap, title: "3-Second Training", desc: "Minimal audio needed for high-fidelity clones" },
        { icon: Shield, title: "Voice Protection", desc: "Built-in watermarking and usage licensing" },
        { icon: TrendingUp, title: "99.7% Accuracy", desc: "Industry-leading voice similarity scores" },
      ]
    },
    {
      icon: Waves,
      badge: "Neural TTS",
      title: "Speak 50+ Languages Naturally",
      description: "Not translation. Native synthesis. Every dialect, every accent, with genuine emotional expression — not robotic monotone.",
      color: "blue" as const,
      features: [
        { icon: Languages, title: "50+ Languages", desc: "Including Uzbek, Turkish, Arabic, Japanese" },
        { icon: Volume2, title: "Emotion Control", desc: "Happy, sad, excited, calm — adjustable in real-time" },
        { icon: Cpu, title: "Real-Time API", desc: "Sub-100ms latency for live applications" },
      ]
    },
    {
      icon: Radio,
      badge: "Live Stream",
      title: "Donations with AI Voice",
      description: "YouTube Super Chat, Kick donations, Twitch bits — all read aloud in your cloned voice. Turn every donation into a personal moment.",
      color: "emerald" as const,
      features: [
        { icon: Users, title: "Platform Integrations", desc: "YouTube, Kick, Twitch, Discord, OBS" },
        { icon: Clock, title: "Instant TTS", desc: "Donation message to speech in under 1 second" },
        { icon: Headphones, title: "Custom Triggers", desc: "Sound effects, alerts, and personalized responses" },
      ]
    },
  ];

  return (
    <AsciiIntensityProvider>
      <Header/>
      <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white font-sans selection:bg-purple-500/30 selection:text-white">

        {/* ════════════════════════════════════════════
            ASCII BACKGROUND — DO NOT TOUCH
            ════════════════════════════════════════════ */}
        <AsciiBackground variant="sphere" />

        {/* Ambient glows */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[1200px] rounded-full bg-purple-900/[0.06] blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[600px] w-[800px] rounded-full bg-blue-900/[0.04] blur-[120px]" />
        </div>

        {/* Noise */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.012]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px 128px",
        }} />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-16">

          {/* ═══ HERO ═══ */}
          <FadeIn className="mb-20 sm:mb-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.5)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Miralas Voice AI</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95]">
              Clone your voice.
              <br />
              <span className="font-serif italic font-light text-white/40">Speak to the world.</span>
            </h1>

            <div className="mt-6 flex items-start gap-4 max-w-xl">
              <div className="mt-2.5 h-px w-8 bg-gradient-to-r from-purple-500/50 to-transparent" />
              <p className="text-sm sm:text-base leading-relaxed text-white/35">
                Advanced voice cloning, neural text-to-speech, and live streaming infrastructure. 
                Built for creators who want to sound like themselves — in every language, on every platform.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Start Cloning Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="group flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 sm:px-8 py-3.5 text-sm font-medium text-white/50 backdrop-blur-md transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-white/70">
                <Play className="h-4 w-4" />
                Hear a Demo
                <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">{[1,2,3,4,5].map((i) => <Star key={i} className="h-3 w-3 fill-amber-400/80 text-amber-400/80" />)}</div>
                <span className="text-[11px] text-white/25">4.9 from 12,000+ creators</span>
              </div>
            </div>

            {/* Shader Slider */}
            {/* <div className="mt-10 w-full max-w-sm">
              <GlassCard className="p-4" glowColor="purple">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Visual Intensity</span>
                  <span className="text-[9px] text-white/20 font-mono">ASCII SHADER</span>
                </div>
                <AsciiIntensitySlider />
              </GlassCard>
            </div> */}
          </FadeIn>

          {/* ═══ STATS ═══ */}
          <FadeIn delay={0.2} className="mb-20 sm:mb-28">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden">
              {[
                { label: "Voices Cloned", value: "50K+", icon: Mic, sub: "this month" },
                { label: "Languages", value: "50+", icon: Globe, sub: "native TTS" },
                { label: "Response Time", value: "<100ms", icon: Zap, sub: "API latency" },
                { label: "Uptime", value: "99.97%", icon: Shield, sub: "guaranteed" },
              ].map((stat, i) => (
                <div key={i} className="group p-5 sm:p-6 hover:bg-white/[0.02] transition-colors">
                  <stat.icon className="h-4 w-4 text-white/20 mb-3 group-hover:text-purple-400/60 transition-colors" />
                  <span className="text-2xl sm:text-3xl font-bold text-white/90">{stat.value}</span>
                  <span className="block mt-1 text-[10px] font-medium text-white/30 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-[9px] text-white/15">{stat.sub}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ═══ FEATURE CARDS ═══ */}
          <section className="mb-20 sm:mb-28">
            <FadeIn className="mb-10 text-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[10px] font-medium text-white/25 uppercase tracking-[0.2em]">The Platform</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                One voice. <span className="text-white/35">Infinite possibilities.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {features.map((feature, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <GlassCard glowColor={feature.color} className="h-full p-6">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-opacity-10 ${
                          feature.color === 'purple' ? 'border-purple-500/20 bg-purple-500/10 text-purple-400' :
                          feature.color === 'blue' ? 'border-blue-500/20 bg-blue-500/10 text-blue-400' :
                          'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                        }`}>
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          feature.color === 'purple' ? 'border-purple-500/20 bg-purple-500/10 text-purple-400' :
                          feature.color === 'blue' ? 'border-blue-500/20 bg-blue-500/10 text-blue-400' :
                          'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {feature.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white/90 mb-2">{feature.title}</h3>
                      <p className="text-[13px] leading-relaxed text-white/30 mb-6">{feature.description}</p>

                      <div className="space-y-3">
                        {feature.features.map((f, j) => (
                          <FeatureRow key={j} icon={f.icon} title={f.title} description={f.desc} />
                        ))}
                      </div>

                      <div className={`mt-5 flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                        feature.color === 'purple' ? 'text-purple-400/50 group-hover:text-purple-400' :
                        feature.color === 'blue' ? 'text-blue-400/50 group-hover:text-blue-400' :
                        'text-emerald-400/50 group-hover:text-emerald-400'
                      }`}>
                        <span>Learn more</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Ambient glow */}
                    <div className={`absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 blur-[60px] ${
                      feature.color === 'purple' ? 'bg-purple-500/10' :
                      feature.color === 'blue' ? 'bg-blue-500/10' :
                      'bg-emerald-500/10'
                    }`} />
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ═══ VOICE DEMOS ═══ */}
          <section className="mb-20 sm:mb-28">
            <FadeIn className="mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Try the Voices</h2>
                  <p className="mt-1 text-[13px] text-white/30">Click play to hear AI-generated speech</p>
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
          </section>

          {/* ═══ HOW IT WORKS ═══ */}
          <FadeIn className="mb-20 sm:mb-28">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 sm:p-10 backdrop-blur-xl">
              <div className="mb-8 text-center">
                <span className="text-[10px] font-medium text-white/25 uppercase tracking-[0.2em]">How It Works</span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">From sample to live <span className="text-white/35">in 60 seconds</span></h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { step: "01", title: "Upload", desc: "3-second voice sample. Any audio file works." },
                  { step: "02", title: "Clone", desc: "AI analyzes timbre, pitch, and emotional patterns." },
                  { step: "03", title: "Type", desc: "Write anything. Choose language and emotion." },
                  { step: "04", title: "Speak", desc: "Generate speech in real-time. Export or stream." },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <span className="text-4xl font-bold text-white/[0.03] select-none">{item.step}</span>
                    <div className="relative -mt-5">
                      <h4 className="text-sm font-bold text-white/80">{item.title}</h4>
                      <p className="mt-1.5 text-[11px] text-white/30 leading-relaxed">{item.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden lg:block absolute top-3 -right-3 h-px w-6 bg-gradient-to-r from-white/10 to-transparent" />}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ═══ TRUST ═══ */}
          <FadeIn className="mb-20 sm:mb-28">
            <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.3em]">Trusted by creators worldwide</p>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 opacity-25">
                {["YouTube", "Kick", "Twitch", "Discord", "OBS", "Spotify"].map((brand) => (
                  <span key={brand} className="text-sm font-semibold text-white/50 tracking-wide">{brand}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ═══ CTA ═══ */}
          <FadeIn className="mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-6 py-10 sm:px-10 text-center">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[500px] rounded-full bg-purple-500/[0.04] blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">Ready to Clone?</p>
                <h3 className="mx-auto mt-3 max-w-lg text-2xl sm:text-3xl font-bold text-white">Your voice. Every language. Every platform.</h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/30 leading-relaxed">Start free. No credit card. Clone your first voice in under 60 seconds.</p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                    Start Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white/50 backdrop-blur-md transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-white/70">
                    <Download className="h-4 w-4" />
                    Download App
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">
                    <Shield className="h-3 w-3" /> SOC 2
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">
                    <Clock className="h-3 w-3" /> 60s Setup
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">
                    <TrendingUp className="h-3 w-3" /> 4.9 Rating
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Footer */}
          <footer className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
            <span>© {new Date().getFullYear()} Miransas. All rights reserved.</span>
            <div className="flex gap-5">
              <span className="hover:text-white/40 transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white/40 transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white/40 transition-colors cursor-pointer">API</span>
            </div>
            <span className="font-mono text-[9px] text-white/10">MIRALAS VOICE AI v2.0</span>
          </footer>
        </div>
      </main>
      <Footer/>
    </AsciiIntensityProvider>
  );
}