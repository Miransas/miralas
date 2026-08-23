"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading } from "./section";

const FAQS = [
  {
    q: "How do I get an API key for Grok?",
    a: "Create a free account in the Console, open API Keys, and create a key. It takes about a minute. Then point your existing SDK at https://api.x.ai/v1 and make your first call.",
  },
  {
    q: "Is Grok free to use through the API?",
    a: "API usage is billed per token rather than free, but the Playground comes with every Console account, so you can test the latest Grok models before adding billing.",
  },
  {
    q: "How much does Grok cost through the API?",
    a: "Usage-based, in USD. grok-4.6 is $2 / $6 per million input/output tokens below 200K context, with cached input at $0.50. Prompts at or above 200K bill the whole request at $4 / $12. Imagine, Voice, and server-side tools are priced separately — open the Pricing section for the full tables and estimator.",
  },
  {
    q: "Can I use the OpenAI or Anthropic SDK with Grok?",
    a: "Yes. Point your existing SDK at base URL https://api.x.ai/v1 with your xAI API key. Most integrations need no other changes.",
  },
  {
    q: "Which Grok models are available in the API?",
    a: "The xAI API serves grok-4.6 and grok-4.5 for text, grok-build-0.1 for coding, grok-4.3 and grok-4.20 for 1M-context work, plus the Grok Imagine and Grok Voice families. Every model runs on the same API key.",
  },
  {
    q: "Where is the API documentation for Grok?",
    a: "The full API reference, guides, and quickstart live in the docs. This page covers pricing, API keys, and what you can build.",
  },
  {
    q: "Can I use Grok through my cloud provider?",
    a: "Yes. Grok models are offered in the AI catalogs of the major clouds, including Microsoft, Oracle, Google, and Amazon platforms, alongside the native xAI API.",
  },
  {
    q: "Can I use Grok to generate videos, ads, logos, or voiceovers?",
    a: "Yes. The Grok Imagine API creates and edits images and video — from logos and product shots to animated campaign clips — and the Grok Voice API handles voiceovers, dubbing, and realtime voice agents.",
  },
];

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full min-h-14 items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-stone-400text-base font-medium tracking-tight text-fg">{q}</span>
        <Plus
          className={cn(
            "size-4 shrink-0 text-stone-400 transition-transform duration-200 ease-out",
            open && "rotate-45",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone-400text-sm leading-relaxed text-stone-400">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" narrow>
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <SectionHeading>Questions, answered</SectionHeading>
      </Reveal>
      <div className="mt-10 border-t border-border">
        {FAQS.map((item, i) => (
          <Item
            key={item.q}
            q={item.q}
            a={item.a}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}
