'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';
import { providers, getRadarData } from '@/lib/benchmark-data';

const tooltipStyle = {
  backgroundColor: 'hsl(222 44% 8%)',
  border: '1px solid hsl(217 33% 20%)',
  borderRadius: '0.5rem',
  fontSize: '12px',
  color: 'hsl(210 40% 96%)',
};

export function LatencyChart() {
  const data = providers.map((p) => ({
    name: p.vendor,
    TTFB: p.scores.ttfbMs,
    Streaming: p.scores.streamingMs,
    color: p.color,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
        />
        <YAxis
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
        <Bar dataKey="TTFB" radius={[4, 4, 0, 0]} name="Time to First Byte">
          {data.map((entry, index) => (
            <Cell key={`ttfb-${index}`} fill={entry.color} fillOpacity={0.9} />
          ))}
        </Bar>
        <Bar dataKey="Streaming" radius={[4, 4, 0, 0]} name="Streaming Latency" fill="hsl(199 89% 52% / 0.4)">
          {data.map((entry, index) => (
            <Cell key={`stream-${index}`} fill={entry.color} fillOpacity={0.4} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MosChart() {
  const data = providers
    .map((p) => ({ name: p.vendor, mos: p.scores.mosScore, color: p.color }))
    .sort((a, b) => b.mos - a.mos);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 5]}
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'MOS Score', position: 'insideBottom', offset: -5, fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          width={80}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }} />
        <Bar dataKey="mos" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LanguageChart() {
  const data = providers
    .map((p) => ({ name: p.vendor, languages: p.scores.languages, color: p.color }))
    .sort((a, b) => b.languages - a.languages);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
        />
        <YAxis
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'Languages', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }} />
        <Bar dataKey="languages" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CostChart() {
  const data = providers
    .map((p) => ({
      name: p.vendor,
      cost: p.scores.costPer1k === 0 ? 0.001 : p.scores.costPer1k,
      color: p.color,
      display: p.scores.costPer1k === 0 ? 'Free' : `$${p.scores.costPer1k.toFixed(3)}`,
    }))
    .sort((a, b) => a.cost - b.cost);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          tickFormatter={(v) => (v <= 0.001 ? 'Free' : `$${v.toFixed(3)}`)}
          label={{ value: 'USD per 1K tokens', position: 'insideBottom', offset: -5, fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          width={80}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }}
          formatter={(v: unknown) =>
            typeof v === 'number' && v > 0.001 ? `$${v.toFixed(3)}` : 'Free (open source)'
          }
        />
        <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WerChart() {
  const data = providers
    .map((p) => ({ name: p.vendor, wer: p.scores.wordErrorRate, color: p.color }))
    .sort((a, b) => a.wer - b.wer);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
        />
        <YAxis
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'WER %', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }} />
        <Bar dataKey="wer" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RadarComparisonChart({ selectedIds }: { selectedIds: string[] }) {
  const selected = providers.filter((p) => selectedIds.includes(p.id));
  if (selected.length === 0) return null;

  const data = getRadarData();
  const radarData: Record<string, string | number>[] = data.map((entry) => {
    const result: Record<string, string | number> = { metric: entry['metric'] as string };
    selected.forEach((p) => {
      result[p.vendor] = entry[p.vendor] as number;
    });
    return result;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="hsl(217 33% 20%)" />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fill: 'hsl(215 20% 65%)', fontSize: 11 }}
        />
        <PolarRadiusAxis
          domain={[0, 10]}
          tick={{ fill: 'hsl(215 20% 40%)', fontSize: 9 }}
          stroke="hsl(217 33% 16%)"
        />
        {selected.map((p) => (
          <Radar
            key={p.id}
            name={p.vendor}
            dataKey={p.vendor}
            stroke={p.color}
            fill={p.color}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function CloningFidelityChart() {
  const data = providers
    .filter((p) => p.scores.cloningFidelity > 0)
    .map((p) => ({
      name: p.vendor,
      fidelity: p.scores.cloningFidelity,
      sampleTime: p.scores.cloningSeconds,
      color: p.color,
    }))
    .sort((a, b) => b.fidelity - a.fidelity);

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
        />
        <YAxis
          domain={[0, 10]}
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'Fidelity / 10', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(217 33% 12% / 0.5)' }} />
        <Bar dataKey="fidelity" radius={[4, 4, 0, 0]} barSize={50}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LatencyTrendChart() {
  const trendData = [
    { period: 'Q1 2025', ChatGPT: 450, Gemini: 500, xAI: 400, Claude: 600 },
    { period: 'Q2 2025', ChatGPT: 380, Gemini: 420, xAI: 350, Claude: 520 },
    { period: 'Q3 2025', ChatGPT: 320, Gemini: 360, xAI: 300, Claude: 480 },
    { period: 'Q4 2025', ChatGPT: 290, Gemini: 320, xAI: 280, Claude: 450 },
    { period: 'Q1 2026', ChatGPT: 260, Gemini: 290, xAI: 250, Claude: 400 },
    { period: 'Q2 2026', ChatGPT: 230, Gemini: 250, xAI: 230, Claude: 380 },
    { period: 'Q3 2026', ChatGPT: 230, Gemini: 250, xAI: 280, Claude: 420 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="chatgptGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10a37f" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#10a37f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="geminiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4285f4" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4285f4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="xaiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1990ea" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1990ea" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="claudeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 16%)" />
        <XAxis
          dataKey="period"
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
        />
        <YAxis
          tick={{ fill: 'hsl(215 20% 60%)', fontSize: 11 }}
          axisLine={{ stroke: 'hsl(217 33% 16%)' }}
          label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', fill: 'hsl(215 20% 60%)', fontSize: 11 }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
        <Area type="monotone" dataKey="ChatGPT" stroke="#10a37f" strokeWidth={2} fill="url(#chatgptGrad)" />
        <Area type="monotone" dataKey="Gemini" stroke="#4285f4" strokeWidth={2} fill="url(#geminiGrad)" />
        <Area type="monotone" dataKey="xAI" stroke="#1990ea" strokeWidth={2} fill="url(#xaiGrad)" />
        <Area type="monotone" dataKey="Claude" stroke="#d97706" strokeWidth={2} fill="url(#claudeGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
