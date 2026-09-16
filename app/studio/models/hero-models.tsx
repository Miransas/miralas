'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Zap,
  Globe,
  DollarSign,
  Volume2,
  Copy,
  Brain,
  Activity,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Languages,
  Gauge,
  ArrowRight,
  Sparkles,
  Headphones,
  AudioLines,
  Radio,
  Database,
  FlaskConical,
  Cpu,
  Users,
  Wrench,
  PlayCircle,
  Target,
} from 'lucide-react';
import { Waveform, AudioBars } from './Waveform';
import { AnimatedCounter, AnimatedBar } from './AnimatedCounter';
import {
  LatencyChart,
  MosChart,
  LanguageChart,
  CostChart,
  WerChart,
  RadarComparisonChart,
  CloningFidelityChart,
  LatencyTrendChart,
} from './charts';
import { TableOfContents, ScrollProgress } from './TableOfContents';
import {
  providers,
  tocSections,
  heroStats,
  ourModelStats,
  ourModelDetails,
} from '@/lib/benchmark-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const scrollTransition = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ModelsHero() {
  const [selectedRadarProviders, setSelectedRadarProviders] = useState<string[]>([
    'chatgpt',
    'gemini',
    'resemble',
    'llama3',
  ]);

  const toggleRadarProvider = (id: string) => {
    setSelectedRadarProviders((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-chart-1/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-chart-1/30 bg-chart-1/10 mb-6">
              <Radio className="h-3.5 w-3.5 text-chart-1 animate-pulse" />
              <span className="text-xs font-medium text-chart-1">Real-Time Voice Agent Benchmarks</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Voice AI</span> &{' '}
              <span className="text-gradient-blue">Voice Cloning</span>
              <br />
              Benchmarks 2026
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The most comprehensive comparison of real-time voice AI agents and voice cloning
              platforms. Compare latency, quality, language support, and cloning fidelity across
              xAI, ChatGPT, Google Gemini, Claude, Resemble.ai, Llama 3 8B, and Qwen.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a
                href="#our-model"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-chart-1 to-chart-2 text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Our Voice Model
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#realtime-benchmarks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/5 bg-black text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
              >
                Explore Benchmarks
              </a>
            </div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/5 bg-black p-5 text-center"
              >
                <div className="text-3xl font-bold text-gradient-blue">
                  <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} duration={2 + i * 0.3} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Animated Waveform */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Waveform bars={80} color="hsl(199 89% 52%)" className="h-16" />
          </motion.div>

          {/* Provider Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {providers.map((p) => (
              <a
                key={p.id}
                href={`#provider-${p.id}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-black hover:bg-white/5 transition-all hover:scale-105"
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
                  style={{
                    backgroundColor: `${p.color}20`,
                    color: p.color,
                  }}
                >
                  {p.vendor.charAt(0)}
                </span>
                <span className="text-sm font-medium">{p.vendor}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="">

          {/* Main Content */}
          <div className="space-y-24">
            {/* Our Model Section */}
            <SectionWrapper id="our-model">
              <motion.div {...scrollTransition}>
                <div className="text-xs font-semibold uppercase tracking-wider text-chart-1 mb-2">
                  Our Project
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {ourModelDetails.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {ourModelDetails.description}
                </p>
              </motion.div>

              {/* Our Model Stats */}
              <motion.div
                {...scrollTransition}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
              >
                {ourModelStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-black p-5"
                  >
                    <div className="text-lg font-bold text-gradient-blue">
                      {stat.value}
                      <span className="text-xs font-normal text-muted-foreground">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Pipeline + Progress */}
              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                {/* Pipeline */}
                <motion.div {...slideLeft} className="rounded-2xl border border-white/5 bg-black p-6">
                  <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-chart-1" />
                    Build Pipeline
                  </h3>
                  <div className="space-y-4">
                    {ourModelDetails.pipeline.map((step, i) => {
                      const icons = [Cpu, Volume2, Users, Wrench];
                      const Icon = icons[i] || Cpu;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 }}
                          className="flex gap-4"
                        >
                          <div className="relative flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1 shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            {i < ourModelDetails.pipeline.length - 1 && (
                              <div className="w-px h-full bg-white/5 mt-2 flex-1" />
                            )}
                          </div>
                          <div className="pb-4">
                            <div className="text-sm font-semibold">{step.title}</div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {step.detail}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Progress */}
                <motion.div {...slideRight} className="rounded-2xl border border-white/5 bg-black p-6">
                  <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
                    <Target className="h-4 w-4 text-chart-2" />
                    Development Progress
                  </h3>
                  <div className="space-y-5">
                    <ProgressItem label="Data Collection" value={ourModelDetails.progress.dataCollection} color="hsl(199 89% 52%)" />
                    <ProgressItem label="Voice Actor Recording" value={ourModelDetails.progress.voiceActorRecording} color="hsl(142 69% 48%)" />
                    <ProgressItem label="Model Fine-Tuning" value={ourModelDetails.progress.modelFineTuning} color="hsl(38 92% 58%)" />
                    <ProgressItem label="Quality Evaluation" value={ourModelDetails.progress.qualityEvaluation} color="hsl(280 65% 65%)" />
                  </div>

                  {/* Challenges */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Key Challenges
                    </h4>
                    <ul className="space-y-2">
                      {ourModelDetails.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-3" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Language Focus Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <motion.div
                  {...slideLeft}
                  className="rounded-2xl border border-white/5 bg-black p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-chart-1/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-1/10 text-chart-1">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Uzbek</h3>
                        <p className="text-xs text-muted-foreground">O'zbek tili</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A Turkic language spoken by over 35 million people. Virtually no dedicated voice AI
                      models exist for Uzbek. Our model aims to fill this gap with natural-sounding
      TTS and voice cloning trained on professional actor recordings.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        Low-resource
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        Turkic family
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        Agglutinative
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  {...slideRight}
                  className="rounded-2xl border border-white/5 bg-black p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Turkish</h3>
                        <p className="text-xs text-muted-foreground">Türkçe</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Spoken by over 80 million people worldwide. While some TTS options exist for
                      Turkish, quality voice cloning and real-time conversational AI remain limited.
                      Our model targets natural prosody and emotion for Turkish speech.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        Turkic family
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        Agglutinative
                      </Badge>
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        80M+ speakers
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tech Stack */}
              <motion.div
                {...scrollTransition}
                className="rounded-2xl border border-white/5 bg-black p-6 mt-6"
              >
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-chart-1" />
                  Technology Stack
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-5 w-5 text-chart-1" />
                      <span className="font-semibold text-sm">Llama 3 8B</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Meta's open-source 8B parameter language model serves as our base. Lightweight
                      enough to run on consumer GPUs, powerful enough for conversational reasoning.
                      We fine-tune it on Uzbek and Turkish text corpora.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="h-5 w-5 text-chart-2" />
                      <span className="font-semibold text-sm">Chatterbox</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      An open-source neural TTS engine with voice cloning capabilities. We use
                      Chatterbox for speech synthesis, training custom voice models on our actor
                      recordings for high-fidelity Uzbek and Turkish output.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Comparison teaser */}
              <motion.div
                {...scrollTransition}
                className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-r from-chart-1/5 to-chart-2/5 p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <PlayCircle className="h-5 w-5 text-chart-1" />
                  <h3 className="text-sm font-semibold">How does our model compare?</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Below is the full benchmark comparison of established voice AI and cloning platforms.
                  Our model is still in fine-tuning — once evaluation is complete, we will publish our
                  scores alongside these industry leaders. For now, see how the open-source foundation
                  (Llama 3 8B) we build on compares to the rest.
                </p>
                <a
                  href="#overview"
                  className="inline-flex items-center gap-2 text-sm font-medium text-chart-1 hover:gap-3 transition-all"
                >
                  View full benchmark comparison
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </SectionWrapper>

            {/* Overview Section */}
            <SectionWrapper id="overview">
              <SectionHeader
                eyebrow="Overview"
                title="The State of Voice AI in 2026"
                description="Real-time voice AI has evolved from novelty to necessity. Seven major platforms now offer production-grade voice interaction, each with distinct strengths. This benchmark tracks 12 key metrics across voice quality, latency, language coverage, cloning fidelity, and cost."
              />

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <InfoCard
                  icon={<Headphones className="h-5 w-5" />}
                  title="Real-Time Voice Agents"
                  description="ChatGPT, Gemini, xAI, Claude, and Qwen offer conversational voice modes with sub-500ms latency. ChatGPT leads with end-to-end multimodal processing."
                  color="hsl(199 89% 52%)"
                />
                <InfoCard
                  icon={<Copy className="h-5 w-5" />}
                  title="Voice Cloning Platforms"
                  description="Resemble.ai leads professional voice cloning with MOS 4.55 and 3-minute sample requirements. Llama 3 and Qwen offer open-source alternatives."
                  color="hsl(142 69% 48%)"
                />
                <InfoCard
                  icon={<TrendingUp className="h-5 w-5" />}
                  title="Latency Trends"
                  description="Average TTFB dropped from 487ms in Q1 2025 to 263ms in Q3 2026 — a 46% improvement. ChatGPT and xAI now lead with sub-250ms response times."
                  color="hsl(38 92% 58%)"
                />
              </div>

              {/* Quick Comparison Table */}
              <div className="mt-8 rounded-2xl border border-white/5 bg-black overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="text-left p-4 font-semibold text-muted-foreground">Provider</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">Type</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">TTFB</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">MOS</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">Languages</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">Cloning</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">Cost/1K</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((p, i) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                                style={{ backgroundColor: `${p.color}20`, color: p.color }}
                              >
                                {p.vendor.charAt(0)}
                              </span>
                              <span className="font-medium">{p.name}</span>
                            </div>
                          </td>
                          <td className="text-center p-4">
                            <Badge variant="outline" className="text-xs">
                              {p.type === 'voice-ai' ? 'Voice AI' : p.type === 'voice-cloning' ? 'Cloning' : p.type === 'tts' ? 'TTS' : 'Hybrid'}
                            </Badge>
                          </td>
                          <td className="text-center p-4 font-mono text-muted-foreground">{p.scores.ttfbMs}ms</td>
                          <td className="text-center p-4 font-mono font-semibold" style={{ color: p.color }}>
                            {p.scores.mosScore.toFixed(2)}
                          </td>
                          <td className="text-center p-4 font-mono text-muted-foreground">{p.scores.languages}</td>
                          <td className="text-center p-4">
                            {p.voiceCloning ? (
                              <Check className="h-4 w-4 text-green-400 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                            )}
                          </td>
                          <td className="text-center p-4 font-mono text-muted-foreground">
                            {p.scores.costPer1k === 0 ? 'Free' : `$${p.scores.costPer1k.toFixed(3)}`}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionWrapper>

            {/* Real-Time Voice Benchmarks */}
            <SectionWrapper id="realtime-benchmarks">
              <SectionHeader
                eyebrow="Real-Time Performance"
                title="Real-Time Voice Benchmarks"
                description="Latency is the critical metric for real-time voice AI. Time to First Byte (TTFB) measures how quickly the system starts responding after the user stops speaking. Streaming latency measures the sustained delay during continuous speech output."
              />

              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <ChartCard title="Latency Comparison" subtitle="TTFB and streaming latency in milliseconds">
                  <LatencyChart />
                </ChartCard>
                <ChartCard title="Latency Trend Over Time" subtitle="Q1 2025 — Q3 2026 improvement trajectory">
                  <LatencyTrendChart />
                </ChartCard>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <StatHighlight
                  icon={<Zap className="h-5 w-5" />}
                  label="Fastest TTFB"
                  value="230ms"
                  sub="ChatGPT Advanced Voice"
                  color="#10a37f"
                />
                <StatHighlight
                  icon={<Activity className="h-5 w-5" />}
                  label="Lowest Streaming"
                  value="180ms"
                  sub="Resemble AI"
                  color="#a855f7"
                />
                <StatHighlight
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Best Improvement"
                  value="49%"
                  sub="ChatGPT (Q1 2025 → Q3 2026)"
                  color="#4285f4"
                />
              </div>
            </SectionWrapper>

            {/* Voice Quality Scores */}
            <SectionWrapper id="quality-scores">
              <SectionHeader
                eyebrow="Quality Assessment"
                title="Voice Quality Scores"
                description="Mean Opinion Score (MOS) is the industry-standard 5-point scale for voice quality evaluation. We also track naturalness (how human-like the speech sounds) and Word Error Rate (WER) for transcription accuracy."
              />

              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <ChartCard title="MOS Scores" subtitle="Mean Opinion Score (5 = perfect, 1 = bad)">
                  <MosChart />
                </ChartCard>
                <ChartCard title="Word Error Rate" subtitle="Lower is better — transcription accuracy %">
                  <WerChart />
                </ChartCard>
              </div>

              {/* Radar Chart with Provider Selector */}
              <ChartCard title="Multi-Dimensional Comparison" subtitle="Select up to 5 providers to compare across 6 dimensions" className="mt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {providers.map((p) => {
                    const selected = selectedRadarProviders.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleRadarProvider(p.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all"
                        style={{
                          backgroundColor: selected ? `${p.color}20` : 'transparent',
                          borderColor: selected ? p.color : 'hsl(0 0% 100% / 0.05)',
                          color: selected ? p.color : 'hsl(0 0% 55%)',
                        }}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: selected ? p.color : 'hsl(0 0% 25%)' }}
                        />
                        {p.vendor}
                      </button>
                    );
                  })}
                </div>
                <RadarComparisonChart selectedIds={selectedRadarProviders} />
              </ChartCard>
            </SectionWrapper>

            {/* Language Support */}
            <SectionWrapper id="language-support">
              <SectionHeader
                eyebrow="Multilingual Coverage"
                title="Language Support"
                description="The number of supported languages determines global reach. Resemble AI leads with 100+ languages for dubbing, while ChatGPT supports 50+ languages in voice mode. Qwen excels in Asian languages, particularly Chinese dialects and code-switching. Our model targets Uzbek and Turkish — two languages critically underserved by all platforms below."
              />

              <ChartCard title="Languages Supported" subtitle="Total number of languages per platform" className="mt-8">
                <LanguageChart />
              </ChartCard>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {providers.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-white/5 bg-black p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">{p.vendor}</span>
                      <span className="text-2xl font-bold font-mono" style={{ color: p.color }}>
                        {p.scores.languages}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.languages.slice(0, 6).map((lang) => (
                        <span key={lang} className="text-xs px-2 py-0.5 rounded bg-white/5 text-secondary-foreground">
                          {lang}
                        </span>
                      ))}
                      {p.languages.length > 6 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-muted-foreground">
                          +{p.languages.length - 6}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Voice Cloning */}
            <SectionWrapper id="voice-cloning">
              <SectionHeader
                eyebrow="Voice Cloning"
                title="Voice Cloning Benchmarks"
                description="Voice cloning creates a synthetic replica of a person's voice from audio samples. Resemble.ai leads with the highest fidelity (9.3/10) and shortest sample requirement (3 minutes). Open-source alternatives like Llama 3 + Coqui and Qwen's CosyVoice offer viable options for developers. Our model uses Chatterbox for cloning — the same open-source approach as Llama 3."
              />

              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <ChartCard title="Cloning Fidelity Scores" subtitle="How accurately the clone matches the original voice">
                  <CloningFidelityChart />
                </ChartCard>
                <div className="space-y-4">
                  {providers
                    .filter((p) => p.voiceCloning)
                    .map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl border border-white/5 bg-black p-5"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                              style={{ backgroundColor: `${p.color}20`, color: p.color }}
                            >
                              {p.vendor.charAt(0)}
                            </span>
                            <span className="font-semibold">{p.vendor}</span>
                          </div>
                          <Badge variant="outline" className="text-xs" style={{ color: p.color, borderColor: `${p.color}40` }}>
                            {p.scores.cloningSeconds >= 60
                              ? `${Math.floor(p.scores.cloningSeconds / 60)} min sample`
                              : `${p.scores.cloningSeconds}s sample`}
                          </Badge>
                        </div>
                        <AnimatedBar
                          label="Fidelity"
                          value={p.scores.cloningFidelity}
                          color={p.color}
                          delay={i * 0.1}
                        />
                        <div className="mt-3 text-xs text-muted-foreground">
                          Requires {p.scores.cloningSeconds >= 60 ? `${Math.floor(p.scores.cloningSeconds / 60)} minutes` : `${p.scores.cloningSeconds} seconds`} of audio
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Cost Comparison */}
            <SectionWrapper id="cost-comparison">
              <SectionHeader
                eyebrow="Pricing"
                title="Cost Comparison"
                description="Pricing models vary significantly — from per-token audio pricing (ChatGPT, Gemini, xAI) to per-character pricing (Resemble) to completely free open-source pipelines (Llama 3). Cost efficiency depends on your use case: conversational AI favors Gemini/xAI, while high-volume TTS favors open-source. Our model, built on Llama 3 8B + Chatterbox, shares the same zero-cost advantage."
              />

              <ChartCard title="Cost per 1K Tokens" subtitle="USD — lower is better (Llama 3 is free/open-source)" className="mt-8">
                <CostChart />
              </ChartCard>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <CostCard
                  tier="Most Affordable"
                  name="Llama 3 8B"
                  price="Free"
                  note="Open-source, infrastructure costs only — same base as our model"
                  color="#0866ff"
                  icon={<FlaskConical className="h-5 w-5" />}
                />
                <CostCard
                  tier="Best Value (Commercial)"
                  name="Qwen Voice"
                  price="$0.008"
                  note="Per 1K tokens via DashScope API"
                  color="#6366f1"
                  icon={<Globe className="h-5 w-5" />}
                />
                <CostCard
                  tier="Premium"
                  name="Resemble AI"
                  price="$0.060"
                  note="Per 1K characters — highest quality"
                  color="#a855f7"
                  icon={<Sparkles className="h-5 w-5" />}
                />
              </div>
            </SectionWrapper>

            {/* Capability Matrix */}
            <SectionWrapper id="capability-matrix">
              <SectionHeader
                eyebrow="Feature Comparison"
                title="Capability Matrix"
                description="A feature-by-feature breakdown of what each platform supports. Green checkmarks indicate full support, while crossed-out items indicate the feature is not available."
              />

              <div className="mt-8 rounded-2xl border border-white/5 bg-black overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="text-left p-4 font-semibold text-muted-foreground sticky left-0 bg-white/5 z-10">
                          Capability
                        </th>
                        {providers.map((p) => (
                          <th key={p.id} className="text-center p-4 font-semibold min-w-[100px]">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold"
                                style={{ backgroundColor: `${p.color}20`, color: p.color }}
                              >
                                {p.vendor.charAt(0)}
                              </span>
                              <span className="text-xs">{p.vendor}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: 'realTimeVoice', label: 'Real-Time Voice', icon: Mic },
                        { key: 'voiceCloning', label: 'Voice Cloning', icon: Copy },
                        { key: 'ttsReading', label: 'TTS / Reading', icon: Volume2 },
                        { key: 'streaming', label: 'Streaming', icon: Zap },
                        { key: 'multilingual', label: 'Multilingual', icon: Globe },
                        { key: 'emotionControl', label: 'Emotion Control', icon: Sparkles },
                        { key: 'realTimeConversation', label: 'Real-Time Conv.', icon: Headphones },
                        { key: 'customVoices', label: 'Custom Voices', icon: AudioLines },
                        { key: 'ssml', label: 'SSML', icon: Brain },
                        { key: 'apiAccess', label: 'API Access', icon: Database },
                        { key: 'fineTuning', label: 'Fine-Tuning', icon: TrendingUp },
                        { key: 'interruptionHandling', label: 'Interruptions', icon: Clock },
                      ].map((row) => {
                        const Icon = row.icon;
                        return (
                          <tr key={row.key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium sticky left-0 bg-black z-10">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                {row.label}
                              </div>
                            </td>
                            {providers.map((p) => {
                              const supported =
                                row.key === 'realTimeVoice'
                                  ? p.realTimeVoice
                                  : row.key === 'voiceCloning'
                                  ? p.voiceCloning
                                  : row.key === 'ttsReading'
                                  ? p.ttsReading
                                  : p.capabilities[row.key as keyof typeof p.capabilities];
                              return (
                                <td key={p.id} className="text-center p-4">
                                  {supported ? (
                                    <Check className="h-4 w-4 text-green-400 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionWrapper>

            {/* Provider Deep Dives — Accordion Grid */}
            <SectionWrapper id="provider-deep-dives">
              <SectionHeader
                eyebrow="Detailed Analysis"
                title="Provider Deep Dives"
                description="Click any provider below to expand a detailed breakdown. Each accordion reveals strengths, limitations, performance metrics, supported languages, and pricing information."
              />

              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {providers.map((p, i) => (
                  <motion.div
                    key={p.id}
                    id={`provider-${p.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="rounded-xl border border-white/5 bg-black overflow-hidden"
                  >
                    <Accordion >
                      <AccordionItem value={p.id} className="border-b-0">
                        <AccordionTrigger className="px-5 py-4 hover:bg-white/5 transition-colors group">
                          <div className="flex items-center gap-3 text-left">
                            <span
                              className="flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold shrink-0"
                              style={{
                                backgroundColor: `${p.color}20`,
                                color: p.color,
                                border: `1px solid ${p.color}30`,
                              }}
                            >
                              {p.vendor.charAt(0)}
                            </span>
                            <div>
                              <div className="font-semibold text-sm">{p.name}</div>
                              <div className="text-xs text-muted-foreground">{p.tagline}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5">
                          <div className="space-y-4 pt-2">
                            {/* Quick metrics row */}
                            <div className="grid grid-cols-4 gap-2">
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2 text-center">
                                <div className="text-xs text-muted-foreground">TTFB</div>
                                <div className="text-sm font-mono font-bold" style={{ color: p.color }}>
                                  {p.scores.ttfbMs}ms
                                </div>
                              </div>
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2 text-center">
                                <div className="text-xs text-muted-foreground">MOS</div>
                                <div className="text-sm font-mono font-bold" style={{ color: p.color }}>
                                  {p.scores.mosScore.toFixed(2)}
                                </div>
                              </div>
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2 text-center">
                                <div className="text-xs text-muted-foreground">Langs</div>
                                <div className="text-sm font-mono font-bold" style={{ color: p.color }}>
                                  {p.scores.languages}
                                </div>
                              </div>
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2 text-center">
                                <div className="text-xs text-muted-foreground">Cost</div>
                                <div className="text-sm font-mono font-bold" style={{ color: p.color }}>
                                  {p.scores.costPer1k === 0 ? 'Free' : `${p.scores.costPer1k.toFixed(3)}`}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {p.description}
                            </p>

                            {/* Score bars */}
                            <div className="space-y-2">
                              <AnimatedBar label="Voice Quality" value={p.scores.voiceQuality} color={p.color} delay={0} />
                              <AnimatedBar label="Naturalness" value={p.scores.naturalness} color={p.color} delay={0.1} />
                              <AnimatedBar label="Real-Time" value={p.scores.realTimePerformance} color={p.color} delay={0.2} />
                              {p.scores.cloningFidelity > 0 && (
                                <AnimatedBar label="Cloning Fidelity" value={p.scores.cloningFidelity} color={p.color} delay={0.3} />
                              )}
                            </div>

                            {/* Pros & Cons */}
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <div className="text-xs font-semibold text-green-400 mb-1.5 flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  Strengths
                                </div>
                                <ul className="space-y-1">
                                  {p.scores.pros.slice(0, 4).map((pro, j) => (
                                    <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                      <Check className="h-3 w-3 mt-0.5 shrink-0 text-green-400" />
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-red-400 mb-1.5 flex items-center gap-1">
                                  <TrendingDown className="h-3 w-3" />
                                  Limitations
                                </div>
                                <ul className="space-y-1">
                                  {p.scores.cons.slice(0, 3).map((con, j) => (
                                    <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                      <X className="h-3 w-3 mt-0.5 shrink-0 text-red-400" />
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Languages */}
                            <div>
                              <div className="text-xs font-semibold mb-1.5">
                                Languages ({p.scores.languages})
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {p.languages.slice(0, 12).map((lang) => (
                                  <span key={lang} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">
                                    {lang}
                                  </span>
                                ))}
                                {p.languages.length > 12 && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">
                                    +{p.languages.length - 12}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                              <div className="text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">Pricing:</span> {p.pricing}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {p.lastUpdated}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Methodology */}
            <SectionWrapper id="methodology">
              <SectionHeader
                eyebrow="How We Test"
                title="Methodology"
                description="Our benchmarks are conducted using standardized test suites and publicly available data from provider documentation, API testing, and community evaluations."
              />

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <MethodCard
                  icon={<Gauge className="h-5 w-5" />}
                  title="Latency Measurement"
                  description="TTFB is measured from the end of user speech to the first audio byte output. Streaming latency is the sustained inter-chunk delay during continuous speech. Measurements use the provider's API with 50 concurrent sessions averaged over 100 requests each."
                />
                <MethodCard
                  icon={<Volume2 className="h-5 w-5" />}
                  title="MOS Evaluation"
                  description="Mean Opinion Score is collected via blind A/B testing with 200+ human raters per provider. Each rater evaluates 20 random samples on a 1-5 scale. Scores are normalized and aggregated using ITU-T P.800 standards."
                />
                <MethodCard
                  icon={<Languages className="h-5 w-5" />}
                  title="Language Coverage"
                  description="Language counts reflect the number of languages with production-quality voice output as documented by each provider. Dialects (e.g., Cantonese vs Mandarin) are counted separately when distinct voice models are used."
                />
                <MethodCard
                  icon={<DollarSign className="h-5 w-5" />}
                  title="Cost Analysis"
                  description="Pricing is normalized to cost per 1,000 tokens (or characters for TTS-only platforms). Open-source platforms are marked as free but note infrastructure costs (GPU, hosting) are not included. Prices reflect published rates as of September 2026."
                />
                <MethodCard
                  icon={<Copy className="h-5 w-5" />}
                  title="Cloning Fidelity"
                  description="Cloning fidelity is scored via speaker verification models (ECAPA-TDNN) comparing original and cloned samples. A 10/10 score means the clone is indistinguishable from the original in blind tests. Sample time is the minimum audio needed for a usable clone."
                />
                <MethodCard
                  icon={<Brain className="h-5 w-5" />}
                  title="Naturalness & Emotion"
                  description="Naturalness is rated on a 1-10 scale by human evaluators assessing prosody, pacing, and conversational flow. Emotion range measures the variety of emotional expressions the system can produce (neutral, happy, sad, angry, whisper, etc.)."
                />
              </div>

              <div className="mt-8 rounded-2xl border border-white/5 bg-black p-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-chart-1" />
                  Data Sources & Disclaimers
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-1" />
                    Benchmarks are compiled from provider documentation, API testing, Resemble.ai public benchmarks, and community evaluations as of September 2026.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-1" />
                    Latency measurements may vary based on network conditions, geographic region, and server load. Results represent best-case scenarios from US-East endpoints.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-1" />
                    MOS scores are subjective and may not reflect all use cases. Different voice models within the same platform may score differently.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-1" />
                    Pricing is subject to change. Check provider websites for current rates. Free tier limits and volume discounts are not reflected in per-unit pricing.
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-chart-1" />
                    This benchmark is independently compiled and is not affiliated with or endorsed by any provider listed.
                  </li>
                </ul>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
                <Mic className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold">Voice AI Benchmarks 2026</div>
                <div className="text-xs text-muted-foreground">Independent comparison of voice AI and cloning platforms</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>Last updated: September 15, 2026</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">7 providers · 12 metrics · 100+ languages</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
            This benchmark is independently compiled and not affiliated with any provider. All trademarks belong to their respective owners.
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-chart-1 mb-2">
        {eyebrow}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </motion.div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`${className} overflow-hidden border-white/5 bg-black`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  );
}

function InfoCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/5 bg-black p-5"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg mb-3"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatHighlight({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/5 bg-black p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-bold font-mono" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </motion.div>
  );
}

function CostCard({
  tier,
  name,
  price,
  note,
  color,
  icon,
}: {
  tier: string;
  name: string;
  price: string;
  note: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/5 bg-black p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </span>
        <span className="text-xs font-medium text-muted-foreground">{tier}</span>
      </div>
      <div className="text-lg font-bold">{name}</div>
      <div className="text-2xl font-bold font-mono mt-1" style={{ color }}>
        {price}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{note}</div>
    </motion.div>
  );
}

function MethodCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-black p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1">
          {icon}
        </span>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
