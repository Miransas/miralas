export interface FeatureCard {
  id: number;
  number?: string;
  title?: string;
  description: string;
  subDescription?: string;
  iconName?: "Mic" | "Globe" | "Zap" | "Layers" | "Radio";
  isSpecial?: boolean;
  colSpan: string;
}

export const FEATURES_DATA: FeatureCard[] = [
  {
    id: 1,
    number: "100+",
    title: "AI Voices",
    description:
      "Ultra-realistic voices across every tone — narrator, energetic, dramatic, whisper, and more. Preview instantly, clone your own.",
    iconName: "Mic",
    colSpan: "md:col-span-1",
  },
  {
    id: 2,
    number: "29+",
    title: "Languages",
    description:
      "Native-quality synthesis with automatic language detection, transliteration, and accent control. Sound local everywhere.",
    iconName: "Globe",
    colSpan: "md:col-span-1",
  },
  {
    id: 3,
    number: "450K+",
    title: "API Calls / Month",
    description:
      "Production-grade infrastructure handling tens of thousands of concurrent requests with zero degradation.",
    iconName: "Zap",
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    number: "1-Click",
    title: "Voice Cloning",
    description:
      "Upload 30 seconds of audio and get a perfect digital replica. Private, encrypted, never used for training.",
    iconName: "Layers",
    colSpan: "md:col-span-1",
  },
  {
    id: 5,
    number: "<50ms",
    title: "gRPC Streaming",
    description:
      "Bidirectional real-time streaming for live donation reads, IVR, and interactive voice agents. Rust + Tokio powered.",
    iconName: "Radio",
    colSpan: "md:col-span-1",
  },
  {
    id: 6,
    isSpecial: true,
    description:
      "Official SDKs for Node.js, Python, Go, and Rust. OpenAPI spec, auto-generated docs, and copy-paste examples. Install via npm, pip, cargo, or go get.",
    subDescription: "$25 starting credit. No monthly fees.",
    colSpan: "md:col-span-1",
  },
];
