
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Globe,
  Shield,
  GitBranch,
  Layers,
  ExternalLink,

  ArrowRight,
  Sparkles,
  Activity,
  Mic2,
  Radio,
} from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SmoothScroll from "../../../components/providers/SmoothScroll";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── DATA ───
const MODELS = [
  {
    id: "chatterbox-v3",
    name: "Chatterbox Multilingual V3",
    badge: "Base Model",
    params: "500M",
    latency: "< 200ms",
    languages: "23+",
    desc: "Resemble AI's general-purpose multilingual TTS. T3 token generator + S3Gen diffusion decoder with flow matching. We fine-tuned it on regional dialects and added Uzbek from scratch.",
    features: [
      "Zero-shot voice cloning from 10s audio",
      "Cross-lingual speaker consistency",
      "Reduced hallucination vs V2",
      "PerTh watermarking on every output",
    ],
    // color: "#c9a87c",
    // gradient: "from-[#c9a87c]/20 via-[#a89060]/10 to-transparent",
    // border: "border-[#c9a87c]/30",
  },
  {
    id: "chatterbox-turbo",
    name: "Chatterbox Turbo",
    badge: "Fast Inference",
    params: "350M",
    latency: "~ 75ms",
    languages: "English + tuned",
    desc: "Streamlined architecture with single-step decoder. 6× faster than real-time on GPU. We tuned it for low-latency voice agents and added paralinguistic tag support.",
    features: [
      "Single-step mel decoder (10 → 1 step)",
      "Paralinguistic tags: [laugh], [sigh], [gasp]",
      "6× real-time inference on GPU",
      "Emotion exaggeration control",
    ],
    // color: "#0ea5e9",
    // gradient: "from-[#0ea5e9]/20 via-[#0284c7]/10 to-transparent",
    // border: "border-[#0ea5e9]/30",
  },
  {
    id: "miralas-custom",
    name: "Miralas Fine-Tunes",
    badge: "Custom",
    params: "500M",
    latency: "< 200ms",
    languages: "Uzbek + 4 new",
    desc: "Built from V3 weights, trained from zero on Uzbek and four additional languages not in the original 23. Regional accent preservation and dialect-aware tokenization.",
    features: [
      "Uzbek TTS from zero-shot MVP",
      "4 additional low-resource languages",
      "Dialect-aware tokenizer",
      "Regional accent preservation",
    ],
    // color: "#10b981",
    // gradient: "from-[#10b981]/20 via-[#059669]/10 to-transparent",
    // border: "border-[#10b981]/30",
  },
];

const SPECS = [
  { label: "Architecture", value: "T3 + S3Gen Flow Matching", icon: Layers },
  { label: "Parameters", value: "500M / 350M / 110M", icon: Cpu },
  { label: "Latency", value: "75ms – 200ms", icon: Zap },
  { label: "Voice Cloning", value: "Zero-shot, 5–10s", icon: Mic2 },
  { label: "Languages", value: "28+ (incl. Uzbek)", icon: Globe },
  { label: "Watermarking", value: "PerTh (imperceptible)", icon: Shield },
];

const LINKS = [
  {
    label: "Resemble AI — Chatterbox",
    url: "https://www.resemble.ai/learn/models/chatterbox",
    desc: "Official model page, docs, and demos",
    icon: ExternalLink,
  },
  {
    label: "GitHub — resemble-ai/chatterbox",
    url: "https://github.com/resemble-ai/chatterbox",
    desc: "MIT-licensed source, reference scripts, voice conversion tools",
    icon: IconBrandGithub,
  },
  {
    label: "Hugging Face — ResembleAI/chatterbox",
    url: "https://huggingface.co/ResembleAI/chatterbox",
    desc: "Model weights, demos, and Spaces integration",
    icon: Sparkles,
  },
];

// ─── COMPONENTS ───

function ModelCard({
  model,
  index,
}: {
  model: (typeof MODELS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-3xl border border-border bg-card backdrop-blur-xl p-7 sm:p-8 transition-all duration-500 hover:bg-accent",

        "hover:shadow-[0_0_60px_-12px_rgba(0,0,0,0.06)]"
      )}
    >

      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-5 flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground"
          >
            {model.badge}
          </span>
          <span className="text-[11px] text-muted-foreground font-medium tabular-nums">
            {model.params} params
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
          {model.name}
        </h3>

        {/* Meta */}
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="size-3" /> {model.latency}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="size-3" /> {model.languages}
          </span>
        </div>

        {/* Desc */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
          {model.desc}
        </p>

        {/* Features */}
        <ul className="space-y-2.5">
          {model.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-1.5 size-1.5 rounded-full shrink-0 bg-foreground/50" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SpecGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-3xl border border-border overflow-hidden bg-border">
      {SPECS.map((spec, i) => {
        const Icon = spec.icon;
        return (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-background p-5 sm:p-6 group hover:bg-accent transition-colors"
          >
            <Icon className="size-5 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{spec.label}</div>
            <div className="text-sm font-semibold text-foreground">{spec.value}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

function LinkCard({
  link,
  index,
}: {
  link: (typeof LINKS)[0];
  index: number;
}) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:bg-accent hover:border-border transition-all duration-300"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border group-hover:bg-accent transition-colors">
        <Icon className="size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-foreground transition-colors">
          {link.label}
          <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{link.desc}</p>
      </div>
    </motion.a>
  );
}

// ─── PAGE ───
export default function ModelPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground ">
        <Header />
        {/* Ambient background */}
        {/* <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#c9a87c]/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-[#0ea5e9]/[0.02] blur-[100px]" />
        </div> */}

        <div className="relative z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Activity className="size-3" />
                Open Source at Core
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Built on{" "}
                <span className="text-muted-foreground">Chatterbox</span>.
                <br />
                Tuned for the world.
              </h1>
            </motion.div>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-16"
            >
              We started with Resemble AI's open-source Chatterbox family — V3 for
              multilingual depth, Turbo for speed — then trained from scratch on
              Uzbek and four additional languages no one else supports yet.
            </motion.p>

            {/* Model Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
              {MODELS.map((model, i) => (
                <ModelCard key={model.id} model={model} index={i} />
              ))}
            </div>

            {/* Spec Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">
                Technical Specifications
              </h2>
            </motion.div>
            <div className="mb-20">
              <SpecGrid />
            </div>

            {/* Uzbek Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20 rounded-3xl border border-[#10b981]/20 bg-[#10b981]/[0.03] p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 rounded-full blur-[80px]" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20">
                  <Radio className="size-6 text-[#10b981]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Uzbek & Low-Resource Languages
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xl mb-4">
                    While Chatterbox V3 ships with 23+ languages, Uzbek was not among them.
                    We built a zero-shot MVP from scratch — training on curated Uzbek speech
                    corpora, designing dialect-aware tokenization, and preserving regional
                    accent characteristics. Four additional low-resource languages followed
                    the same pipeline.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Uzbek", "Kazakh", "Azerbaijani", "Turkmen", "Kyrgyz"].map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-card border border-border px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">
                Open Source & References
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-20">
              {LINKS.map((link, i) => (
                <LinkCard key={link.label} link={link} index={i} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent" />
              <div className="relative z-10">
                <GitBranch className="size-6 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Fork it. Tune it. Ship it.
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Everything we built on top of Chatterbox is documented. Start from the
                  original weights, apply our fine-tuning recipes, or train your own
                  language from zero.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://github.com/resemble-ai/chatterbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <IconBrandGithub className="size-4" />
                    View on GitHub
                  </a>
                  <a
                    href="https://www.resemble.ai/learn/models/chatterbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Resemble AI Docs
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Footer note */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Licensed under MIT. Chatterbox is developed by{" "}
                <a
                  href="https://www.resemble.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-foreground/80 transition-colors underline underline-offset-2"
                >
                  Resemble AI
                </a>
                . Miralas fine-tunes and extensions are independent contributions.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SmoothScroll>
  );
}