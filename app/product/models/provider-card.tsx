'use client';

import { motion } from 'framer-motion';
import {
  Check,
  X,
  Zap,
  Globe,
  DollarSign,
  Clock,
  Mic,
  Copy,
  Volume2,
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { AnimatedBar } from './AnimatedCounter';
import { AudioBars } from './Waveform';
import type { Provider } from '@/lib/benchmark-data';
import { Badge } from '@/components/ui/badge';

const capabilityIcons: Record<string, { icon: typeof Zap; label: string }> = {
  streaming: { icon: Zap, label: 'Streaming' },
  multilingual: { icon: Globe, label: 'Multilingual' },
  emotionControl: { icon: Sparkles, label: 'Emotion Control' },
  voiceCloning: { icon: Copy, label: 'Voice Cloning' },
  realTimeConversation: { icon: Mic, label: 'Real-Time Conv.' },
  customVoices: { icon: Volume2, label: 'Custom Voices' },
  ssml: { icon: Brain, label: 'SSML' },
  apiAccess: { icon: DollarSign, label: 'API Access' },
  fineTuning: { icon: TrendingUp, label: 'Fine-Tuning' },
  interruptionHandling: { icon: Clock, label: 'Interruptions' },
};

export function ProviderCard({ provider, index }: { provider: Provider; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="relative p-6 border-b border-border">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at top left, ${provider.color}, transparent 70%)`,
          }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold shrink-0"
              style={{
                backgroundColor: `${provider.color}20`,
                color: provider.color,
                border: `1px solid ${provider.color}40`,
              }}
            >
              {provider.vendor.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">{provider.name}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: `${provider.color}20`,
                    color: provider.color,
                  }}
                >
                  {provider.type === 'voice-ai'
                    ? 'Voice AI'
                    : provider.type === 'voice-cloning'
                    ? 'Voice Cloning'
                    : provider.type === 'tts'
                    ? 'TTS'
                    : 'Hybrid'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{provider.tagline}</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <AudioBars color={provider.color} count={5} className="h-8" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{provider.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricBox
            icon={<Zap className="h-4 w-4" />}
            label="TTFB"
            value={`${provider.scores.ttfbMs}ms`}
            color={provider.color}
          />
          <MetricBox
            icon={<Volume2 className="h-4 w-4" />}
            label="MOS Score"
            value={provider.scores.mosScore.toFixed(2)}
            color={provider.color}
          />
          <MetricBox
            icon={<Globe className="h-4 w-4" />}
            label="Languages"
            value={`${provider.scores.languages}`}
            color={provider.color}
          />
          <MetricBox
            icon={<DollarSign className="h-4 w-4" />}
            label="Cost / 1K"
            value={provider.scores.costPer1k === 0 ? 'Free' : `$${provider.scores.costPer1k.toFixed(3)}`}
            color={provider.color}
          />
        </div>

        {/* Score Bars */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Performance Scores</h4>
          <AnimatedBar label="Voice Quality" value={provider.scores.voiceQuality} color={provider.color} delay={0} />
          <AnimatedBar label="Naturalness" value={provider.scores.naturalness} color={provider.color} delay={0.1} />
          <AnimatedBar label="Real-Time Performance" value={provider.scores.realTimePerformance} color={provider.color} delay={0.2} />
          <AnimatedBar label="Emotion Range" value={provider.scores.emotionRange} color={provider.color} delay={0.3} />
          <AnimatedBar label="Cost Efficiency" value={provider.scores.costEfficiency} color={provider.color} delay={0.4} />
          {provider.scores.cloningFidelity > 0 && (
            <AnimatedBar label="Cloning Fidelity" value={provider.scores.cloningFidelity} color={provider.color} delay={0.5} />
          )}
        </div>

        {/* Capabilities */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(provider.capabilities).map(([key, supported]) => {
              const cap = capabilityIcons[key];
              if (!cap) return null;
              return (
                <Badge
                  key={key}
                  variant={supported ? 'default' : 'outline'}
                  className={`gap-1.5 text-xs ${
                    supported
                      ? 'border-transparent bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground line-through opacity-50'
                  }`}
                >
                  <cap.icon className="h-3 w-3" />
                  {cap.label}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1.5 text-green-400">
              <TrendingUp className="h-4 w-4" />
              Strengths
            </h4>
            <ul className="space-y-1.5">
              {provider.scores.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-green-400" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1.5 text-red-400">
              <TrendingDown className="h-4 w-4" />
              Limitations
            </h4>
            <ul className="space-y-1.5">
              {provider.scores.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <X className="h-3.5 w-3.5 mt-0.5 shrink-0 text-red-400" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Supported Languages ({provider.scores.languages})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {provider.languages.slice(0, 20).map((lang) => (
              <span
                key={lang}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
              >
                {lang}
              </span>
            ))}
            {provider.languages.length > 20 && (
              <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                +{provider.languages.length - 20} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Pricing:</span> {provider.pricing}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated: {provider.lastUpdated}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetricBox({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div className="text-lg font-bold font-mono" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
