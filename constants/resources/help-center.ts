
import {
  Search,
  Zap,
  CreditCard,
  Mic2,
  Code2,
  Shield,
  Wrench,
} from "lucide-react";



function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── CATEGORIES ───
export const CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting Started",
    desc: "API keys, first steps, SDK setup",
    icon: Zap,
    color: "#c9a87c",
    articles: [
      "How do I create an API key?",
      "Which SDK should I use?",
      "First TTS request in 60 seconds",
      "Understanding the dashboard",
      "Webhook setup guide",
    ],
  },
  {
    id: "billing",
    title: "Billing & Usage",
    desc: "Credits, invoices, limits, plans",
    icon: CreditCard,
    color: "#10b981",
    articles: [
      "How does pay-as-you-go billing work?",
      "Where can I see my usage?",
      "How to top up credits",
      "Volume discounts explained",
      "Enterprise invoicing",
    ],
  },
  {
    id: "voice",
    title: "Voice & Audio",
    desc: "Cloning, languages, quality, tuning",
    icon: Mic2,
    color: "#0ea5e9",
    articles: [
      "How to clone a voice",
      "Supported languages & accents",
      "Adjusting tone and speed",
      "Audio format options (MP3, WAV, OGG)",
      "Best practices for voice samples",
    ],
  },
  {
    id: "api",
    title: "API & Integration",
    desc: "gRPC, REST, SDKs, errors",
    icon: Code2,
    color: "#8b5cf6",
    articles: [
      "REST vs gRPC: which to choose?",
      "Authentication & API keys",
      "Rate limits & throttling",
      "Common error codes",
      "Streaming audio in real-time",
    ],
  },
  {
    id: "security",
    title: "Account & Security",
    desc: "Keys, teams, compliance, privacy",
    icon: Shield,
    color: "#f43f5e",
    articles: [
      "How to rotate an API key",
      "Team member access control",
      "SOC 2 & compliance overview",
      "Voice cloning privacy policy",
      "Two-factor authentication",
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    desc: "Errors, latency, audio issues",
    icon: Wrench,
    color: "#78716c",
    articles: [
      "Audio is choppy or distorted",
      "High latency: what to check",
      "Voice cloning failed: common causes",
      "API returns 429 (rate limited)",
      "Webhook not firing",
    ],
  },
];

const ALL_ARTICLES = CATEGORIES.flatMap((cat) =>
  cat.articles.map((title) => ({ title, category: cat.title, catId: cat.id, color: cat.color }))
);

const POPULAR = [
  { title: "How do I create an API key?", category: "Getting Started", catId: "getting-started", color: "#c9a87c" },
  { title: "How does pay-as-you-go billing work?", category: "Billing & Usage", catId: "billing", color: "#10b981" },
  { title: "How to clone a voice", category: "Voice & Audio", catId: "voice", color: "#0ea5e9" },
  { title: "REST vs gRPC: which to choose?", category: "API & Integration", catId: "api", color: "#8b5cf6" },
  { title: "Audio is choppy or distorted", category: "Troubleshooting", catId: "troubleshooting", color: "#78716c" },
];

export const HelpFaqs = [
  {
    q: "What is Miralas TTS?",
    a: "Miralas is an AI-powered text-to-speech platform built on open-source Chatterbox models. We convert text into natural, human-like speech with sub-200ms latency.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. Miralas uses a pay-as-you-go model. You start with $25 in free credit and only pay for what you use. No monthly fees, no commitments.",
  },
  {
    q: "How many languages are supported?",
    a: "28+ languages including Uzbek, Kazakh, Azerbaijani, and all major world languages. We built Uzbek and four other low-resource languages from scratch.",
  },
  {
    q: "Can I use my own voice?",
    a: "Yes. Our Voice Cloning feature needs just 10 seconds of clean audio. Upload it in the Studio and your custom voice is ready in under a minute.",
  },
  {
    q: "What is the difference between REST and gRPC?",
    a: "REST is simpler and works everywhere. gRPC is faster (sub-50ms) and supports bidirectional streaming — ideal for live voice agents and real-time applications.",
  },
  {
    q: "Is my data secure?",
    a: "All API traffic uses TLS 1.3. API keys are scoped and revocable. Voice embeddings are stored with AES-256 encryption. We are SOC 2 Type II compliant.",
  },
];
