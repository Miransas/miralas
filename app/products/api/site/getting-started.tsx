"use client"
import { useState } from "react";
import { Check, Copy, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading, SectionLead } from "./section";

const STEPS = [
  {
    n: "01",
    title: "Create an account",
    body: "Sign up at the Console. One account covers keys, billing, the Playground, and usage.",
  },
  {
    n: "02",
    title: "Generate an API key",
    body: "Open API Keys and create a key. It takes about a minute — then you are ready to call Grok.",
  },
  {
    n: "03",
    title: "Point your SDK at xAI",
    body: "Set the base URL to https://api.x.ai/v1 and call grok-4.6. OpenAI and Anthropic SDKs work as-is.",
  },
];

function fakeKey() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "xai-";
  const bytes = new Uint8Array(28);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

export function GettingStarted() {
  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <Section id="start">
      <Reveal>
        <Eyebrow>Zero to first token</Eyebrow>
        <SectionHeading>Start building with your API key</SectionHeading>
        <SectionLead>
          Create an account, generate a key, and ship your first Grok request in about a
          minute. Works with the AI SDKs you already use — Python, TypeScript, or plain curl.
        </SectionLead>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col rounded-2xl bg-elevated p-6 shadow-[var(--shadow-border)]">
              <span className="font-mono text-xs text-subtle">{step.n}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-4 rounded-2xl bg-elevated p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface text-fg">
                <KeyRound className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-fg">Try a demo key locally</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generates a sample key in this browser — nothing is sent to a server.
                </p>
              </div>
            </div>
            <Button
              variant={key ? "secondary" : "default"}
              onClick={() => {
                setKey(fakeKey());
                setCopied(false);
              }}
              className="w-full sm:w-auto"
            >
              {key ? "Regenerate" : "Create API key"}
            </Button>
          </div>

          {key ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-bg px-3 py-2.5 shadow-[var(--shadow-border)]">
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-code sm:text-sm">
                {key}
              </code>
              <button
                type="button"
                onClick={() => copy(key)}
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-fg/5 hover:text-fg"
                aria-label="Copy demo key"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            </div>
          ) : null}

          <p className="mt-4 font-mono text-xs text-subtle">
            base URL · https://api.x.ai/v1 · model · grok-4.6
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
