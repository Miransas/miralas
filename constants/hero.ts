import { Mic, Waves, ShieldCheck, LucideIcon } from "lucide-react";

export interface HeroHighlight {
  iconName: "Mic" | "Waves" | "ShieldCheck";
  badge: string;
  title: string;
  description: string;
}

export const HERO_HIGHLIGHTS: HeroHighlight[] = [
  {
    iconName: "Mic",
    badge: "Neural TTS",
    title: "Ultra-Realistic Speech",
    description: "Context-aware pronunciation and emotional cadence tuned for natural delivery.",
  },
  {
    iconName: "Waves",
    badge: "<50ms Latency",
    title: "Real-Time Streaming",
    description: "gRPC & WebSocket streaming for interactive voice bots and live audio.",
  },
  {
    iconName: "ShieldCheck",
    badge: "Enterprise",
    title: "Instant Voice Cloning",
    description: "Clone voices from 30s of sample audio with enterprise-grade privacy.",
  },
];

export const HERO_CONTENT = {
  badge: "Miralas Voice AI Platform 2.0",
  title: "Intelligence,",
  titleItalic: "in motion.",
  description:
    "Advanced text-to-speech, real-time voice cloning, and multilingual infrastructure in one platform. Natural, expressive speech — built for next-generation applications.",
  primaryCta: "Get Started",
  primaryCtaHref: "/studio",
  secondaryCta: "Listen to Demos",
  secondaryCtaHref: "/studio/tts",
};
