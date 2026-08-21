/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Globe,
  Code2,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Server,
  Cpu,
  Wifi,
  Layers,
  MessageSquare,
  Smartphone,
  Globe2,
  Bot,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Gauge,
  Lock,
  BookOpen,
  ExternalLink,
  
  Play,
  Pause,
  Timer,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";

// ============================================================
// TYPES
// ============================================================
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface EndpointItem {
  method: string;
  path: string;
  desc: string;
}

interface SdkItem {
  name: string;
  lang: string;
  install: string;
}

// ============================================================
// DATA
// ============================================================
const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: "gRPC Streaming",
    description:
      "Bidirectional streaming with sub-50ms latency. Real-time TTS, voice cloning, and live donation reads over a single persistent connection.",
  },
  {
    icon: Cpu,
    title: "Rust-Powered Core",
    description:
      "Zero-cost abstractions, memory safety without GC, and Tokio async runtime handling tens of thousands of concurrent connections.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "API keys with scoped permissions, rate limiting, request signing, and optional mTLS. Every request is logged and auditable.",
  },
  {
    icon: Globe,
    title: "29+ Languages",
    description:
      "Native-quality synthesis in 29 languages with automatic language detection, transliteration, and accent control.",
  },
  {
    icon: Gauge,
    title: "Pay-As-You-Go",
    description:
      "$25 starting credit. No monthly fees, no hidden charges. Top up anytime. Usage is billed per character with volume discounts.",
  },
  {
    icon: Layers,
    title: "Multi-Format Output",
    description:
      "MP3, WAV, OGG, FLAC, and raw PCM. Stream or download. Custom sample rates from 8kHz to 48kHz.",
  },
];

const ENDPOINTS: EndpointItem[] = [
  { method: "POST", path: "/v1/tts/generate", desc: "Generate speech from text" },
  { method: "POST", path: "/v1/tts/stream", desc: "Real-time TTS streaming" },
  { method: "POST", path: "/v1/voice/clone", desc: "Clone a voice from audio" },
  { method: "GET", path: "/v1/voices", desc: "List available voices" },
  { method: "POST", path: "/v1/donate/send", desc: "Send a live donation" },
  { method: "GET", path: "/v1/usage", desc: "Check usage and balance" },
];

const SDKS: SdkItem[] = [
  { name: "Node.js", lang: "javascript", install: "npm install @miralas/sdk" },
  { name: "Python", lang: "python", install: "pip install miralas" },
  { name: "Go", lang: "go", install: "go get github.com/miralas/sdk-go" },
  { name: "Rust", lang: "rust", install: "cargo add miralas-sdk" },
];

// ============================================================
// ANIMATION
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ============================================================
// COMPONENTS
// ============================================================
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ---- Code Block ---- */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-400" />
          <div className="size-3 rounded-full bg-amber-400" />
          <div className="size-3 rounded-full bg-emerald-400" />
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/20 transition"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ---- Feature Card ---- */
function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
        <Icon className="size-5" />
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-1">{feature.title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

/* ---- Endpoint Row ---- */
function EndpointRow({ ep, index }: { ep: EndpointItem; index: number }) {
  const methodColors: Record<string, string> = {
    GET: "bg-sky-50 text-sky-700 border-sky-200",
    POST: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      <span className={cn("inline-flex shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", methodColors[ep.method])}>
        {ep.method}
      </span>
      <code className="text-sm font-mono text-gray-900 shrink-0">{ep.path}</code>
      <span className="text-sm text-gray-500 ml-auto">{ep.desc}</span>
    </motion.div>
  );
}

/* ---- SDK Tab ---- */
function SdkTabs() {
  const [active, setActive] = useState(0);

  const examples = [
    {
      lang: "javascript",
      label: "Node.js",
      code: `import { MiralasClient } from "@miralas/sdk";

const client = new MiralasClient({
  apiKey: process.env.MIRALAS_API_KEY,
});

// Generate speech
const audio = await client.tts.generate({
  text: "Hello world, this is Miralas TTS.",
  voice: "narrator-01",
  language: "en",
  speed: 1.0,
  format: "mp3",
});

// Stream to file
await audio.save("./output.mp3");

// Real-time streaming
const stream = await client.tts.stream({
  text: "Live streaming test...",
  voice: "energetic-01",
});

for await (const chunk of stream) {
  // Play or buffer chunk
}`,
    },
    {
      lang: "python",
      label: "Python",
      code: `import miralas
from miralas.tts import TTSClient

client = TTSClient(api_key="your_api_key")

# Generate speech
audio = client.tts.generate(
    text="Hello world, this is Miralas TTS.",
    voice="narrator-01",
    language="en",
    speed=1.0,
    format="mp3"
)

audio.save("output.mp3")

# Real-time streaming
stream = client.tts.stream(
    text="Live streaming test...",
    voice="energetic-01"
)

for chunk in stream:
    # Process audio chunk
    pass`,
    },
    {
      lang: "go",
      label: "Go",
      code: `package main

import (
    "context"
    "log"
    "github.com/miralas/sdk-go"
)

func main() {
    client, err := miralas.NewClient("your_api_key")
    if err != nil {
        log.Fatal(err)
    }

    // Generate speech
    audio, err := client.TTS.Generate(context.Background(), &miralas.TTSRequest{
        Text:     "Hello world, this is Miralas TTS.",
        Voice:    "narrator-01",
        Language: "en",
        Speed:    1.0,
        Format:   "mp3",
    })

    // Stream audio
    stream, err := client.TTS.Stream(context.Background(), &miralas.TTSRequest{
        Text:  "Live streaming test...",
        Voice: "energetic-01",
    })
}`,
    },
    {
      lang: "rust",
      label: "Rust",
      code: `use miralas_sdk::{Client, TtsRequest};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("your_api_key").await?;

    // Generate speech
    let audio = client
        .tts()
        .generate(TtsRequest {
            text: "Hello world, this is Miralas TTS.".into(),
            voice: "narrator-01".into(),
            language: "en".into(),
            speed: 1.0,
            format: "mp3".into(),
        })
        .await?;

    audio.save("output.mp3").await?;

    // Streaming
    let mut stream = client
        .tts()
        .stream(TtsRequest { /* ... */ })
        .await?;

    while let Some(chunk) = stream.next().await {
        // Process chunk
    }

    Ok(())
}`,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {examples.map((ex, i) => (
          <button
            key={ex.label}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === i
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50",
            )}
          >
            {ex.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <CodeBlock code={examples[active].code} language={examples[active].lang} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---- Use Case Card ---- */
function UseCaseCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
        <Icon className="size-5" />
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ApiPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===================== HERO ===================== */}
      <Header variant="light"/>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gray-100 blur-3xl opacity-60" />
          <div className="absolute top-20 right-0 size-96 rounded-full bg-indigo-50 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 size-96 rounded-full bg-sky-50 blur-3xl opacity-50" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-6">
              <Sparkles className="size-3.5 text-amber-500" />
              New: gRPC streaming with 50ms latency
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Miralas API</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              The fastest voice AI API on the market. Rust-powered, gRPC-native, and pay-as-you-go.
              Start with $25 credit. Build Telegram bots, web apps, mobile apps — anything you imagine.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://console.miralas/auth"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gray-900 px-8 text-sm font-semibold text-white shadow-xl hover:bg-gray-800 transition-all hover:-translate-y-0.5"
              >
                <Terminal className="size-4" />
                Get API Key — $25 Credit
              </a>
              <a
                href="/docs"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-300 px-8 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <BookOpen className="size-4" />
                Read Docs
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-emerald-500" /> $25 starting credit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-emerald-500" /> No monthly fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-emerald-500" /> 29+ languages</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-emerald-500" /> gRPC + REST</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Developers
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to integrate world-class voice AI into your product.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== CODE EXAMPLES ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SDKs for Every Stack
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Official SDKs with type safety, auto-retry, connection pooling, and streaming support.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <SdkTabs />
          </div>
        </div>
      </section>

      {/* ===================== ENDPOINTS ===================== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-6">
                <Server className="size-3.5 text-indigo-500" />
                REST + gRPC
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Clean, Predictable Endpoints
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                REST for quick integrations. gRPC for high-performance, real-time streaming.
                Both use the same authentication and rate-limiting system.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "OpenAPI 3.0 spec with auto-generated docs",
                  "Consistent JSON and Protobuf schemas",
                  "Idempotent retry-safe endpoints",
                  "Detailed error codes and messages",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/docs/api-reference"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors group"
              >
                Full API Reference
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <div className="flex flex-col gap-3">
              {ENDPOINTS.map((ep, i) => (
                <EndpointRow key={ep.path} ep={ep} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Will You Build?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our API powers everything from chatbots to streaming platforms. Here are some ideas.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <UseCaseCard
              icon={Bot}
              title="Telegram Bot"
              description="Build a bot that reads messages aloud in group chats. Perfect for accessibility and entertainment."
              index={0}
            />
            <UseCaseCard
              icon={Globe2}
              title="Web Application"
              description="Add voice narration to articles, generate dynamic audio ads, or create interactive voice experiences."
              index={1}
            />
            <UseCaseCard
              icon={Smartphone}
              title="Mobile App"
              description="iOS and Android apps with offline caching, push notifications, and real-time voice streaming."
              index={2}
            />
            <UseCaseCard
              icon={MessageSquare}
              title="Customer Support IVR"
              description="Natural-sounding phone menus and call routing with dynamic TTS responses."
              index={3}
            />
            <UseCaseCard
              icon={Wifi}
              title="Live Streaming Overlay"
              description="Donation alerts with AI voice reads. Sub-50ms latency keeps it perfectly synced."
              index={4}
            />
            <UseCaseCard
              icon={Layers}
              title="SaaS Integration"
              description="White-label voice features inside your own product. Resell with your branding."
              index={5}
            />
          </motion.div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Pay only for what you use. No monthly commitments, no hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-gray-200 bg-white p-8"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Starter</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$25</span>
                <span className="text-sm text-gray-500">upfront</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Then pay-as-you-go</p>
              <ul className="space-y-3 mb-8">
                {[
                  "$25 starting credit",
                  "All voices included",
                  "REST + gRPC access",
                  "Community support",
                  "Rate limit: 60 req/min",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://console.miralas/auth"
                className="block w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold text-center leading-[44px] hover:bg-gray-800 transition"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pro — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-3xl border-2 border-gray-900 bg-white p-8 shadow-xl"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Most Popular
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$100</span>
                <span className="text-sm text-gray-500">upfront</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Volume discount applied</p>
              <ul className="space-y-3 mb-8">
                {[
                  "$100 starting credit",
                  "All voices + Voice Cloning",
                  "Priority gRPC streams",
                  "Email support (48h)",
                  "Rate limit: 300 req/min",
                  "Usage analytics dashboard",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://console.miralas/auth"
                className="block w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold text-center leading-[44px] hover:bg-gray-800 transition"
              >
                Get Started
              </a>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-gray-200 bg-white p-8"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Enterprise</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">For teams and scale</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Custom credit packages",
                  "Dedicated infrastructure",
                  "SSO & team management",
                  "SLA with 99.99% uptime",
                  "Unlimited rate limits",
                  "Dedicated support channel",
                  "Custom voice model training",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/enterprise/contact"
                className="block w-full h-11 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold text-center leading-[44px] hover:bg-gray-50 transition"
              >
                Contact Sales
              </a>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400">
              All plans include the same API. You only pay for characters synthesized.
              {" "}
              <a href="/pricing" className="text-gray-900 font-medium hover:underline">See detailed pricing</a>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== AUTH / QUICK START ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-6">
                <Lock className="size-3.5 text-amber-500" />
                Secure by Default
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Authentication in Seconds
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Every request is authenticated with a simple API key passed in the header.
                Keys are scoped, revocable, and rotatable from the console.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Create an account",
                    desc: "Sign up at console.miralas and get $25 free credit instantly.",
                  },
                  {
                    step: "2",
                    title: "Generate an API key",
                    desc: "Go to Settings → API Keys. Create a key with the scopes you need.",
                  },
                  {
                    step: "3",
                    title: "Make your first request",
                    desc: "Use our SDK or hit the REST endpoint directly. You're live in under a minute.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{s.title}</h4>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <CodeBlock
              language="bash"
              code={`# Get your API key from console.miralas
export MIRALAS_API_KEY="sk_miralas_xxxxxxxx"

# Generate speech with curl
curl -X POST https://api.miralas.com/v1/tts/generate \
  -H "Authorization: Bearer $MIRALAS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from Miralas API.",
    "voice": "narrator-01",
    "language": "en",
    "format": "mp3"
  }' \
  --output hello.mp3

# Check your balance
curl https://api.miralas.com/v1/usage \
  -H "Authorization: Bearer $MIRALAS_API_KEY"`}
            />
          </div>
        </div>
      </section>

      {/* ===================== FOOTER CTA ===================== */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 p-10 sm:p-16 text-center"
          >
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start Building Today
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
                $25 free credit. No credit card required. Build your first voice-powered app in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://console.miralas/auth"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-gray-900 shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-0.5"
                >
                  <Terminal className="size-4" />
                  Get API Key
                </a>
                <a
                  href="https://github.com/miralas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 text-sm font-medium text-white hover:bg-white/20 transition-all"
                >
                  {/* <Github className="size-4" /> */}
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}