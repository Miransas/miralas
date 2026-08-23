"use client"

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading, SectionLead } from "./section";

type Tab = "text" | "imagine" | "voice" | "tools";

const TABS: { id: Tab; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "imagine", label: "Imagine" },
  { id: "voice", label: "Voice" },
  { id: "tools", label: "Tools" },
];

type TextModel = {
  model: string;
  tag: string | null;
  desc: string;
  ctx: string;
  threshold: string;
  input: number;
  cached: number;
  output: number;
  longInput: number;
  longCached: number;
  longOutput: number;
};

const TEXT_MODELS: TextModel[] = [
  {
    model: "grok-4.6",
    tag: "New",
    desc: "Flagship for coding, long-running agents, and visual work.",
    ctx: "500K",
    threshold: "200K",
    input: 2,
    cached: 0.5,
    output: 6,
    longInput: 4,
    longCached: 1,
    longOutput: 12,
  },
  {
    model: "grok-4.5",
    tag: null,
    desc: "Previous flagship for reasoning, chat, and analysis.",
    ctx: "500K",
    threshold: "200K",
    input: 2,
    cached: 0.3,
    output: 6,
    longInput: 4,
    longCached: 0.6,
    longOutput: 12,
  },
  {
    model: "grok-build-0.1",
    tag: null,
    desc: "Fast coding model for agentic software engineering.",
    ctx: "256K",
    threshold: "200K",
    input: 1,
    cached: 0.2,
    output: 2,
    longInput: 2,
    longCached: 0.4,
    longOutput: 4,
  },
  {
    model: "grok-4.3",
    tag: "Batch −20%",
    desc: "1M context. Batch API is 20% off all token types.",
    ctx: "1M",
    threshold: "200K",
    input: 1.25,
    cached: 0.2,
    output: 2.5,
    longInput: 2.5,
    longCached: 0.4,
    longOutput: 5,
  },
  {
    model: "grok-4.20",
    tag: "Batch −20%",
    desc: "multi-agent, reasoning, and non-reasoning variants — same rates.",
    ctx: "1M",
    threshold: "200K",
    input: 1.25,
    cached: 0.2,
    output: 2.5,
    longInput: 2.5,
    longCached: 0.4,
    longOutput: 5,
  },
];

const IMAGINE_GROUPS = [
  {
    model: "grok-imagine-image-2.0",
    io: "Text, Image → Image",
    media: "$0.01 / img",
    rows: [
      { res: "1K · Low", output: "$0.04 / img" },
      { res: "2K · Low", output: "$0.06 / img" },
      { res: "1K · Medium", output: "$0.06 / img" },
      { res: "2K · Medium", output: "$0.08 / img" },
    ],
  },
  {
    model: "grok-imagine-image-quality",
    io: "Text, Image → Image",
    media: "$0.01 / img",
    rows: [
      { res: "1K", output: "$0.05 / img" },
      { res: "2K", output: "$0.07 / img" },
    ],
  },
  {
    model: "grok-imagine-image",
    io: "Text, Image → Image",
    media: "$0.002 / img",
    rows: [
      { res: "1K", output: "$0.02 / img" },
      { res: "2K", output: "$0.02 / img" },
    ],
  },
  {
    model: "grok-imagine-video-1.5",
    io: "Text, Image, Audio → Video",
    media: "$0.01 / img",
    rows: [
      { res: "480p", output: "$0.08 / sec" },
      { res: "720p", output: "$0.14 / sec" },
      { res: "1080p", output: "$0.25 / sec" },
    ],
  },
  {
    model: "grok-imagine-video",
    io: "Text, Image, Video → Video",
    media: "$0.01 / sec · $0.002 / img",
    rows: [
      { res: "480p", output: "$0.05 / sec" },
      { res: "720p", output: "$0.07 / sec" },
    ],
  },
];

const VOICE_ROWS = [
  {
    mode: "Speech to Speech",
    model: "grok-voice-think-fast-2.0",
    cost: "$0.08 / min audio · $0.004 text input",
    note: "$4.80 / hr",
  },
  {
    mode: "Speech to Speech",
    model: "grok-voice-think-fast-1.0",
    cost: "$0.05 / min audio · $0.004 text input",
    note: "Deprecated · $3.00 / hr",
  },
  {
    mode: "Text to Speech",
    model: "tts",
    cost: "$15.00 / 1M characters",
    note: null,
  },
  {
    mode: "Speech to Text",
    model: "stt",
    cost: "$0.10 / hr REST · $0.20 / hr streaming",
    note: null,
  },
];

const TOOL_ROWS = [
  { name: "web_search", desc: "Search the web and browse pages", cost: "$5 / 1k calls" },
  { name: "x_search", desc: "Search posts, profiles, and threads on X", cost: "$5 / 1k calls" },
  { name: "code_execution", desc: "Run Python in a sandbox", cost: "$5 / 1k calls" },
  { name: "attachment_search", desc: "Search files attached to the request", cost: "$10 / 1k calls" },
  { name: "collections_search", desc: "Query uploaded document collections (RAG)", cost: "$2.50 / 1k calls" },
  { name: "image_generation", desc: "Generate and edit images", cost: "Imagine API rates" },
  { name: "view_image", desc: "Analyze images found by search", cost: "Token-based" },
  { name: "view_x_video", desc: "Analyze videos found by X Search", cost: "Token-based" },
  { name: "MCP tools", desc: "Remote MCP servers you connect", cost: "Token-based" },
];

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 });
}

function rate(n: number) {
  return `$${n.toFixed(n % 1 === 0 ? 2 : 2)}`;
}

export function Pricing() {
  const [tab, setTab] = useState<Tab>("text");

  return (
    <Section id="pricing">
      <Reveal>
        <Eyebrow>API pricing</Eyebrow>
        <SectionHeading>Usage-based, billed per token</SectionHeading>
        <SectionLead>
          All prices in USD. Prepaid credits and enterprise invoicing in the Console. Once a
          prompt crosses the long-context threshold, the entire request bills at the long rate.
        </SectionLead>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 flex w-full rounded-xl bg-elevated p-1 shadow-[var(--shadow-border)]">
          {TABS.map((item) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative h-10 min-h-10 flex-1 rounded-lg px-2 text-sm font-medium transition-[color] duration-150 ease-out",
                  active ? "text-stone-400" : "text-stone-200 hover:text-fg",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="price-tab"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 overflow-hidden rounded-2xl bg-elevated shadow-[var(--shadow-border)]">
          {tab === "text" ? <TextTable /> : null}
          {tab === "imagine" ? <ImagineTable /> : null}
          {tab === "voice" ? <VoiceTable /> : null}
          {tab === "tools" ? <ToolsTable /> : null}
        </div>
      </Reveal>

      {tab === "text" ? (
        <Reveal delay={0.14}>
          <Estimator />
        </Reveal>
      ) : null}
    </Section>
  );
}

function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "px-3 py-3 text-left text-xs font-medium tracking-wide text-subtle uppercase sm:px-4",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <td className={cn("px-3 py-3.5 align-top text-sm text-stone-400 sm:px-4", className)}>
      {children}
    </td>
  );
}

function TextTable() {
  return (
    <div>
      <div className="divide-y divide-border md:hidden">
        {TEXT_MODELS.map((row) => (
          <article key={row.model} className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm text-fg">{row.model}</span>
              {row.tag ? (
                <span className="rounded-full bg-fg/10 px-1.5 py-0.5 text-xs font-medium text-fg">
                  {row.tag}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-subtle">{row.desc}</p>
            <p className="mt-3 font-mono text-xs tabular-nums text-muted">
              {row.ctx} context · long ≥ {row.threshold}
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-bg px-2 py-2">
                <dt className="text-xs text-subtle">Input</dt>
                <dd className="mt-0.5 font-mono text-sm tabular-nums text-fg">{rate(row.input)}</dd>
              </div>
              <div className="rounded-lg bg-bg px-2 py-2">
                <dt className="text-xs text-subtle">Cached</dt>
                <dd className="mt-0.5 font-mono text-sm tabular-nums text-fg">{rate(row.cached)}</dd>
              </div>
              <div className="rounded-lg bg-bg px-2 py-2">
                <dt className="text-xs text-subtle">Output</dt>
                <dd className="mt-0.5 font-mono text-sm tabular-nums text-fg">{rate(row.output)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-subtle">
              Long · {rate(row.longInput)} / {rate(row.longCached)} / {rate(row.longOutput)}
            </p>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-5xl border-collapse">
          <thead className="border-b border-border">
            <tr>
              <Th>Model</Th>
              <Th>Context</Th>
              <Th className="text-right">Input</Th>
              <Th className="text-right">Cached</Th>
              <Th className="text-right">Output</Th>
              <Th className="text-right">Long in</Th>
              <Th className="text-right">Long cached</Th>
              <Th className="text-right">Long out</Th>
            </tr>
          </thead>
          <tbody>
            {TEXT_MODELS.map((row) => (
              <tr key={row.model} className="border-b border-border last:border-0">
                <Td>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-fg">{row.model}</span>
                    {row.tag ? (
                      <span className="rounded-full bg-fg/10 px-1.5 py-0.5 text-xs font-medium text-fg">
                        {row.tag}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-xs text-xs leading-relaxed text-subtle">{row.desc}</p>
                </Td>
                <Td className="font-mono tabular-nums text-fg">{row.ctx}</Td>
                <Td className="text-right font-mono tabular-nums text-fg">{rate(row.input)}</Td>
                <Td className="text-right font-mono tabular-nums text-fg">{rate(row.cached)}</Td>
                <Td className="text-right font-mono tabular-nums text-fg">{rate(row.output)}</Td>
                <Td className="text-right font-mono tabular-nums">{rate(row.longInput)}</Td>
                <Td className="text-right font-mono tabular-nums">{rate(row.longCached)}</Td>
                <Td className="text-right font-mono tabular-nums">{rate(row.longOutput)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-subtle">
        Per 1M tokens. Long-context rates apply to every token in a request once the prompt
        reaches the model threshold (200K). Cached column is prompt-cache reads. grok-4.3 and
        grok-4.20 get 20% off on the Batch API.
      </p>
    </div>
  );
}

function ImagineTable() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-3xl border-collapse">
          <thead className="border-b border-border">
            <tr>
              <Th>Model</Th>
              <Th>Media input</Th>
              <Th>Resolution</Th>
              <Th className="text-right">Output</Th>
            </tr>
          </thead>
          <tbody>
            {IMAGINE_GROUPS.map((group) =>
              group.rows.map((row, i) => (
                <tr
                  key={`${group.model}-${row.res}`}
                  className="border-b border-border last:border-0"
                >
                  {i === 0 ? (
                    <Td>
                      <span className="font-mono text-fg">{group.model}</span>
                      <p className="mt-1 text-xs text-subtle">{group.io}</p>
                    </Td>
                  ) : (
                    <Td />
                  )}
                  {i === 0 ? (
                    <Td className="font-mono tabular-nums">{group.media}</Td>
                  ) : (
                    <Td />
                  )}
                  <Td className="text-fg">{row.res}</Td>
                  <Td className="text-right font-mono tabular-nums text-fg">{row.output}</Td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-subtle">
        Image billed per output image. Video billed per second of generated clip. Media input
        is charged when you send a reference image or video into an edit.
      </p>
    </div>
  );
}

function VoiceTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-2xl border-collapse">
        <thead className="border-b border-border">
          <tr>
            <Th>Mode</Th>
            <Th>Model</Th>
            <Th className="text-right">Cost</Th>
          </tr>
        </thead>
        <tbody>
          {VOICE_ROWS.map((row) => (
            <tr key={row.model} className="border-b border-border last:border-0">
              <Td className="text-fg">{row.mode}</Td>
              <Td>
                <span className="font-mono text-fg">{row.model}</span>
                {row.note ? <p className="mt-1 text-xs text-subtle">{row.note}</p> : null}
              </Td>
              <Td className="text-right font-mono text-xs tabular-nums text-fg sm:text-sm">
                {row.cost}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ToolsTable() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-2xl border-collapse">
          <thead className="border-b border-border">
            <tr>
              <Th>Tool</Th>
              <Th>Description</Th>
              <Th className="text-right">Cost</Th>
            </tr>
          </thead>
          <tbody>
            {TOOL_ROWS.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <Td className="font-mono text-fg">{row.name}</Td>
                <Td>{row.desc}</Td>
                <Td className="text-right font-mono tabular-nums text-fg">{row.cost}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-subtle">
        Tool requests bill token usage for the model plus invocations. Search and code tools
        are $5 per 1k calls. Image/video understanding and MCP are token-only — no invocation
        fee.
      </p>
    </div>
  );
}

function Estimator() {
  const [id, setId] = useState(TEXT_MODELS[0].model);
  const [inputM, setInputM] = useState("1");
  const [outputM, setOutputM] = useState("0.25");
  const [cachedPct, setCachedPct] = useState("40");
  const [longCtx, setLongCtx] = useState(false);

  const model = TEXT_MODELS.find((m) => m.model === id) ?? TEXT_MODELS[0];

  const result = useMemo(() => {
    const inn = Number(inputM);
    const out = Number(outputM);
    const cache = Math.min(100, Math.max(0, Number(cachedPct))) / 100;
    if (![inn, out, cache].every((n) => Number.isFinite(n))) return null;
    const inRate = longCtx ? model.longInput : model.input;
    const cachedRate = longCtx ? model.longCached : model.cached;
    const outRate = longCtx ? model.longOutput : model.output;
    const fresh = inn * (1 - cache) * inRate;
    const cached = inn * cache * cachedRate;
    const completion = out * outRate;
    return { fresh, cached, completion, total: fresh + cached + completion };
  }, [inputM, outputM, cachedPct, longCtx, model]);

  return (
    <div className="mt-4 rounded-2xl bg-elevated p-5 shadow-[var(--shadow-border)] sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fg">Estimate a request</p>
          <p className="mt-1 text-sm text-stone-300">
            Token volumes in millions. Toggle long context if the prompt is ≥ 200K tokens.
          </p>
        </div>
        {result ? (
          <p className="font-mono text-title font-semibold tabular-nums text-fg">
            {usd(result.total)}
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex min-h-11 flex-col gap-1.5 text-xs text-subtle">
          Model
          <select
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="h-11 rounded-lg bg-bg px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)] outline-none"
          >
            {TEXT_MODELS.map((m) => (
              <option key={m.model} value={m.model}>
                {m.model}
              </option>
            ))}
          </select>
        </label>
        <Field label="Input · M tokens" value={inputM} onChange={setInputM} />
        <Field label="Output · M tokens" value={outputM} onChange={setOutputM} />
        <Field label="Cached · %" value={cachedPct} onChange={setCachedPct} />
        <label className="flex min-h-11 cursor-pointer items-end gap-2 pb-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={longCtx}
            onChange={(e) => setLongCtx(e.target.checked)}
            className="size-4 accent-fg"
          />
          Long context ≥ 200K
        </label>
      </div>

      {result ? (
        <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-sm sm:grid-cols-3">
          <div className="flex justify-between gap-3 sm:block">
            <dt className="text-subtle">Fresh input</dt>
            <dd className="font-mono tabular-nums text-fg">{usd(result.fresh)}</dd>
          </div>
          <div className="flex justify-between gap-3 sm:block">
            <dt className="text-subtle">Cached input</dt>
            <dd className="font-mono tabular-nums text-fg">{usd(result.cached)}</dd>
          </div>
          <div className="flex justify-between gap-3 sm:block">
            <dt className="text-subtle">Output</dt>
            <dd className="font-mono tabular-nums text-fg">{usd(result.completion)}</dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex min-h-11 flex-col gap-1.5 text-xs text-subtle">
      {label}
      <input
        type="number"
        min={0}
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg bg-bg px-3 font-mono text-sm tabular-nums text-fg shadow-[var(--shadow-border)] outline-none"
      />
    </label>
  );
}
