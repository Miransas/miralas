'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Mic,
  Zap,
  Globe,
  Gauge,
  Copy,
  Check,
  Languages,
  AudioLines,
  MessageSquareCode,
  Sparkles,
  Cpu,
  Clock,
  Headphones,
  ArrowRight,
  Code,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ---------------------------------------------------------------------------
// CodeBlock — client micro-component with copy-to-clipboard
// ---------------------------------------------------------------------------

const CODE_SNIPPET = `import fs from "fs";

async function cloneVoiceAndSpeak() {
  const audioRef = fs.readFileSync("./my-voice-sample.wav");
  const base64Audio = audioRef.toString("base64");

  const response = await fetch("https://api.miralas.io/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "chatterbox-multilingual",
      input: "Merhaba, Miralas altyapısı ile sesimi anında klonlayabilirim!",
      voice_reference: \`data:audio/wav;base64,\${base64Audio}\`,
      language: "tr"
    })
  });

  const result = await response.blob();
  // Save or play the generated audio buffer...
}`;

function CodeBlock() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op — clipboard may be blocked in some environments
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/80 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80 dark:bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/80 dark:bg-green-500/70" />
          </div>
          <span className="ml-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            typescript
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      {/* Code body */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code className="font-mono text-zinc-700 dark:text-zinc-300">
            {CODE_SNIPPET}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature row helper for model cards
// ---------------------------------------------------------------------------

interface FeatureRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function FeatureRow({ icon, label, value }: FeatureRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          {value}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Model card component
// ---------------------------------------------------------------------------

interface ModelCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureRowProps[];
}

function ModelCard({
  icon,
  iconBg,
  iconColor,
  badge,
  title,
  subtitle,
  description,
  features,
}: ModelCardProps) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="group relative h-full overflow-hidden border-zinc-200 bg-white/80 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:shadow-blue-500/10">
        {/* Glow border effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:group-hover:opacity-100">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent" />
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
            >
              {icon}
            </div>
            <div>
              <Badge
                variant="secondary"
                className="mb-1 text-[10px] uppercase tracking-wide"
              >
                {badge}
              </Badge>
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
          </div>
          <CardDescription className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            {subtitle}
          </CardDescription>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </CardHeader>

        <CardContent className="relative">
          <div className="grid gap-1">
            {features.map((f, i) => (
              <FeatureRow key={i} {...f} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Comparison table data
// ---------------------------------------------------------------------------

const comparisonData: { feature: string; llama: string; chatterbox: string }[] =
  [
    {
      feature: 'Primary Role',
      llama: 'Text / Logic / Dialogue',
      chatterbox: 'Audio / TTS / Cloning',
    },
    {
      feature: 'Size',
      llama: '8 Billion',
      chatterbox: '~0.5 Billion',
    },
    {
      feature: 'Native Languages',
      llama: '8',
      chatterbox: '23+',
    },
    {
      feature: 'Input Needed',
      llama: 'Text Prompt',
      chatterbox: 'Text + 3s Audio Ref',
    },
    {
      feature: 'Output Generated',
      llama: 'Text Output',
      chatterbox: 'High-Fidelity Audio',
    },
  ];

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ModelsDocsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-black">

      {/* Page content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
      >
        {/* ----------------------------------------------------------------- */}
        {/* 1. Page Header                                                     */}
        {/* ----------------------------------------------------------------- */}
        <motion.section variants={itemVariants} className="relative mb-16 text-center">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-cyan-500/10 to-transparent blur-3xl dark:from-blue-600/20 dark:via-cyan-600/15" />

          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-zinc-200 bg-white/50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
          >
            <Sparkles className="h-3 w-3" />
            Open-Source Model Infrastructure
          </Badge>

          <h1 className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Supported AI Models
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Miralas.io utilizes category-leading open-source models for
            ultra-low latency voice agents and zero-shot voice cloning. Data
            privacy and speed are our top priorities.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#models">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                Explore Models
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#quickstart">
              <Button
                variant="outline"
                className="gap-2 border-zinc-200 dark:border-zinc-800"
              >
                <Code className="h-4 w-4" />
                Quick Start
              </Button>
            </a>
          </div>
        </motion.section>

        {/* ----------------------------------------------------------------- */}
        {/* 2 & 3. Model Feature Cards                                         */}
        {/* ----------------------------------------------------------------- */}
        <motion.section
          id="models"
          variants={itemVariants}
          className="mb-16"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Model 1: Meta Llama 3.1 8B */}
            <ModelCard
              icon={<Brain className="h-6 w-6" />}
              iconBg="bg-blue-50 dark:bg-blue-950/60"
              iconColor="text-blue-600 dark:text-blue-400"
              badge="The Brain / LLM"
              title="Meta Llama 3.1 8B"
              subtitle="Dialogue, Reasoning & Logic Engine"
              description="A highly optimized large language model fine-tuned for real-time conversational AI, delivering rapid reasoning and natural dialogue."
              features={[
                {
                  icon: <Cpu className="h-4 w-4" />,
                  label: 'Parameters',
                  value:
                    '8 Billion (8B) — optimized for extremely high Tokens Per Second (TPS).',
                },
                {
                  icon: <MessageSquareCode className="h-4 w-4" />,
                  label: 'Context Window',
                  value:
                    '128,000 tokens — perfect for remembering long conversations.',
                },
                {
                  icon: <Gauge className="h-4 w-4" />,
                  label: 'Speed & Latency',
                  value:
                    'Time To First Token (TTFT) <200ms on optimized hardware (L40S/H100), crucial for real-time voice agents.',
                },
                {
                  icon: <Languages className="h-4 w-4" />,
                  label: 'Language Support',
                  value:
                    'Native support for 8 languages (English, German, French, Italian, Portuguese, Hindi, Spanish, Thai). Highly capable in tool-use and API calling.',
                },
              ]}
            />

            {/* Model 2: Resemble AI Chatterbox */}
            <ModelCard
              icon={<Mic className="h-6 w-6" />}
              iconBg="bg-cyan-50 dark:bg-cyan-950/60"
              iconColor="text-cyan-600 dark:text-cyan-400"
              badge="The Voice / TTS"
              title="Resemble AI Chatterbox"
              subtitle="TTS & Zero-Shot Voice Cloning Engine"
              description="A powerful text-to-speech and voice cloning model trained on hundreds of thousands of hours of audio for natural, expressive speech."
              features={[
                {
                  icon: <AudioLines className="h-4 w-4" />,
                  label: 'Architecture',
                  value:
                    '~0.5B parameters, trained on 500,000 hours of audio data.',
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: 'Zero-Shot Voice Cloning',
                  value:
                    'Clone any voice with just a 3–5 second clean audio reference.',
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  label: 'Emotion & Prosody Control',
                  value:
                    'Context-aware speech synthesis — whispering, excitement, pacing, and more.',
                },
                {
                  icon: <Globe className="h-4 w-4" />,
                  label: 'Language Support',
                  value:
                    'Multilingual support across 23+ languages with cross-lingual voice cloning (e.g., clone an English speaker and make them speak fluent Japanese).',
                },
              ]}
            />
          </motion.div>
        </motion.section>

        {/* ----------------------------------------------------------------- */}
        {/* 4. Comparison Summary Table                                       */}
        {/* ----------------------------------------------------------------- */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Gauge className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Comparison Summary
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white/60 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/30">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800">
                    <TableHead className="h-14 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Feature
                    </TableHead>
                    <TableHead className="h-14 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Brain className="h-3.5 w-3.5 text-blue-500" />
                        Meta Llama 3.1 (8B)
                      </div>
                    </TableHead>
                    <TableHead className="h-14 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Mic className="h-3.5 w-3.5 text-cyan-500" />
                        Chatterbox
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row) => (
                    <TableRow
                      key={row.feature}
                      className="border-zinc-200 dark:border-zinc-800"
                    >
                      <TableCell className="py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row.feature}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {row.llama}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {row.chatterbox}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.section>

        {/* ----------------------------------------------------------------- */}
        {/* 5. Quick Start API Code Snippet                                    */}
        {/* ----------------------------------------------------------------- */}
        <motion.section id="quickstart" variants={itemVariants} className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Code className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Quick Start: Voice Cloning API
            </h2>
          </div>

          <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Get started with Miralas.io&apos;s voice cloning API in just a few
            lines of TypeScript. Provide a short audio reference and generate
            speech in any supported language.
          </p>

          <CodeBlock />
        </motion.section>

        {/* ----------------------------------------------------------------- */}
        {/* Footer                                                             */}
        {/* ----------------------------------------------------------------- */}
        <motion.footer
          variants={itemVariants}
          className="border-t border-zinc-200 pt-8 dark:border-zinc-800"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Headphones className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Miralas.io — Open-Source Model Infrastructure
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Ultra-Low Latency
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                23+ Languages
              </span>
            </div>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}
