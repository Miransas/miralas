
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
    title: "Multilingual Speech",
    description: "Speech generation powered by Chatterbox Multilingual.",
  },
  {
    iconName: "Waves",
    badge: "Rust + Python",
    title: "API Architecture",
    description: "Rust API connected to Python inference over gRPC. GPU performance validation remains pending.",
  },
  {
    iconName: "ShieldCheck",
    badge: "In Development",
    title: "Voice Identity",
    description: "A reference-based voice workflow in development. Use recordings with permission.",
  },
];

export const HERO_CONTENT = {
  badge: "Miralas Voice AI Platform 2.0",
  title: "Intelligence",
  titleItalic: "in motion",
  description:
    "Explore multilingual speech technology, with native Uzbek speech in development.",
  primaryCta: "Explore products",
  primaryCtaHref: "/product",
  secondaryCta: "Explore languages",
  secondaryCtaHref: "/#languages",
};
