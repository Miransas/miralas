/* eslint-disable react-hooks/purity */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { 
  PhoneCall, 
  MessageSquare, 
  RefreshCw,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Users,
  Bot,
  ArrowRight,
  Star,
  BarChart3,
  Headphones,
  Workflow,
  Mic,
  Radio,
  Volume2
} from "lucide-react";

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

// ─── VOICE WAVE VISUAL ───────────────────────────────────────

function VoiceWaveVisual() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Animated wave bars */}
      <div className="flex items-center gap-[2px] h-16">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-purple-600 to-purple-400"
            style={{
              height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
              animation: `voiceBar 1.2s ease-in-out ${i * 0.05}s infinite alternate`,
              opacity: 0.6 + Math.sin(i * 0.3) * 0.4,
            }}
          />
        ))}
      </div>
      {/* Center orb */}
      <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-900 shadow-[0_0_60px_rgba(147,51,234,0.4)]">
        <PhoneCall className="h-8 w-8 text-white" />
        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse" />
      </div>
      {/* Orbiting rings */}
      <div className="absolute h-32 w-32 rounded-full border border-purple-500/10 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute h-40 w-40 rounded-full border border-purple-500/5" />
      <style jsx>{`
        @keyframes voiceBar {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// ─── CHAT BUBBLE VISUAL ──────────────────────────────────────

function ChatBubbleVisual() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full gap-3 p-6">
      {/* Incoming */}
      <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/[0.08] p-3 backdrop-blur-sm">
        <p className="text-[11px] text-white/60">Hi Alex! Just following up on your quote. Happy to answer any questions.</p>
      </div>
      {/* Typing indicator */}
      <div className="self-end flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
      </div>
      {/* AI Avatar */}
      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg">
        <Bot className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

// ─── REVIVE VISUAL ───────────────────────────────────────────

function ReviveVisual() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Concentric circles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-purple-500/10"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            animation: `pulseRing 3s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
      {/* Center */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
        <RefreshCw className="h-7 w-7 text-white animate-spin" style={{ animationDuration: "8s" }} />
      </div>
      {/* Floating stats */}
      <div className="absolute top-4 right-4 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-3 py-2">
        <div className="text-[10px] text-white/30 uppercase tracking-wider">Recovered</div>
        <div className="text-sm font-bold text-amber-400">$28K</div>
        <div className="text-[9px] text-white/20">in 90 days</div>
      </div>
      <style jsx>{`
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ─── GLASS CARD ──────────────────────────────────────────────

function GlassCard({ children, className = "", glowColor = "purple" }: { 
  children: React.ReactNode; className?: string; glowColor?: "purple" | "blue" | "amber";
}) {
  const glowMap = {
    purple: "hover:shadow-purple-500/10 hover:border-purple-500/20",
    blue: "hover:shadow-blue-500/10 hover:border-blue-500/20",
    amber: "hover:shadow-amber-500/10 hover:border-amber-500/20",
  };
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] ${glowMap[glowColor]} ${className}`}>
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-purple-500/20 transition-colors">
        <Icon className="h-3.5 w-3.5 text-purple-400/70" />
      </div>
      <div>
        <h4 className="text-[12px] font-semibold text-white/80">{title}</h4>
        <p className="text-[10px] text-white/30 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ────────────────────────────────────────────

export default function FeatureSection() {
  const features = [
    {
      badge: "Miralas Voice",
      badgeColor: "purple",
      title: "Your AI Receptionist",
      description: "Answers every inbound call in under 30 seconds. Qualifies the lead. Books the appointment. Syncs to your CRM. 24/7/365 — including nights and weekends.",
      visual: <VoiceWaveVisual />,
      stats: { label: "Calls answered", value: "< 30s" },
      features: [
        { icon: Zap, title: "Instant Response", desc: "Sub-30s pickup, zero hold time" },
        { icon: Workflow, title: "CRM Sync", desc: "HubSpot, Salesforce, Pipedrive" },
        { icon: BarChart3, title: "Lead Scoring", desc: "Qualifies in real-time" },
      ],
      glowColor: "purple" as const,
    },
    {
      badge: "Miralas Blue",
      badgeColor: "blue",
      title: "Your AI Sales Rep",
      description: "We don't build a bot. We build YOU. Your voice, your knowledge, your close rate — cloned into automated channels. 92% open rate.",
      visual: <ChatBubbleVisual />,
      stats: { label: "Open rate", value: "92%" },
      features: [
        { icon: Users, title: "Personality Clone", desc: "Your tone, vocabulary, style" },
        { icon: MessageSquare, title: "Omnichannel", desc: "SMS, WhatsApp, Email, DMs" },
        { icon: TrendingUp, title: "Conversion Lift", desc: "3.2x vs traditional outreach" },
      ],
      glowColor: "blue" as const,
    },
    {
      badge: "Miralas Revive",
      badgeColor: "amber",
      title: "Your Dead Lead Reactivator",
      description: "Those thousands of leads sitting in your CRM that 'went cold'? Miralas works that list automatically — re-opening conversations and qualifying real interest.",
      visual: <ReviveVisual />,
      stats: { label: "Recovered", value: "$28K" },
      features: [
        { icon: RefreshCw, title: "Auto-Resurrection", desc: "Re-engages dormant leads" },
        { icon: Headphones, title: "Warm Handoff", desc: "Hot leads with full context" },
        { icon: BarChart3, title: "ROI Tracking", desc: "Revenue attribution per campaign" },
      ],
      glowColor: "amber" as const,
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
     

      <div className="relative z-10 mx-auto max-w-full px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <FadeIn className="mb-16 text-center">
          <div className="flex items-center gap-3 mb-4">
            {/* <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" /> */}
            <span className="text-[10px] font-medium text-white/25 uppercase tracking-[0.2em]">The Engine</span>
            {/* <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" /> */}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Three AI workers. <span className="text-white/35">One voice.</span>
          </h2>
        </FadeIn>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.15}>
              <GlassCard glowColor={feature.glowColor} className="h-full flex flex-col">
                {/* Visual Area */}
                <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                  {/* <div className={`absolute inset-0 bg-gradient-to-b ${
                    feature.glowColor === 'purple' ? 'from-purple-500/[0.06]' :
                    feature.glowColor === 'blue' ? 'from-blue-500/[0.06]' :
                    'from-amber-500/[0.06]'
                  } via-transparent to-transparent`} /> */}

                  {feature.visual}

                  {/* Floating stat badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 backdrop-blur-xl ${
                      feature.glowColor === 'purple' ? 'border-purple-500/20 bg-black/40' :
                      feature.glowColor === 'blue' ? 'border-blue-500/20 bg-black/40' :
                      'border-amber-500/20 bg-black/40'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        feature.glowColor === 'purple' ? 'bg-emerald-400' :
                        feature.glowColor === 'blue' ? 'bg-blue-400' :
                        'bg-amber-400'
                      } animate-pulse`} />
                      <span className={`text-[10px] font-semibold ${
                        feature.glowColor === 'purple' ? 'text-purple-300' :
                        feature.glowColor === 'blue' ? 'text-blue-300' :
                        'text-amber-300'
                      }`}>
                        {feature.stats.label}: {feature.stats.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 p-5 sm:p-6 flex flex-col">
                  <span className={`inline-flex w-fit rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                    feature.glowColor === 'purple' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    feature.glowColor === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {feature.badge}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-white/90">{feature.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/30 flex-1">{feature.description}</p>

                  <div className="mt-5 space-y-2.5">
                    {feature.features.map((f, j) => (
                      <FeatureRow key={j} icon={f.icon} title={f.title} description={f.desc} />
                    ))}
                  </div>

                  <div className={`mt-5 flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    feature.glowColor === 'purple' ? 'text-purple-400/50 group-hover:text-purple-400' :
                    feature.glowColor === 'blue' ? 'text-blue-400/50 group-hover:text-blue-400' :
                    'text-amber-400/50 group-hover:text-amber-400'
                  }`}>
                    <span>Explore {feature.badge.split(' ')[1]}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Ambient glow */}
                <div className={`absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 blur-[60px] ${
                  feature.glowColor === 'purple' ? 'bg-purple-500/10' :
                  feature.glowColor === 'blue' ? 'bg-blue-500/10' :
                  'bg-amber-500/10'
                }`} />
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}