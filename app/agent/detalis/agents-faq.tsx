"use client";


import { Plus } from "lucide-react";
import { Accordion } from "../../../components/ui/accordion";

const FAQS = [
  {
    q: "What is included for free?",
    a: "Chat with Grok, basic Imagine stills, and short voice sessions. Limits reset on a rolling window. Upgrade when you hit the ceiling.",
  },
  {
    q: "Can I use Chat, Build, and Imagine in the same thread?",
    a: "Yes. One conversation can reason, edit a file, and generate a still or clip without switching products.",
  },
  {
    q: "How is Voice different from Chat?",
    a: "Voice is a realtime speech-to-speech path with barge-in. Same model family, tuned for talk — not a text bot reading aloud.",
  },
  {
    q: "Do Bots keep working when I close the tab?",
    a: "On SuperGrok Plus, bots have their own computer and continue jobs after you leave. You’ll see a report when they finish.",
  },
  {
    q: "Is there an API?",
    a: "Yes. Text, code, images, video, and voice share one API. Console usage is billed separately from the consumer plans.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Monthly plans stop at the end of the cycle. Yearly is prepaid; you keep access until the year ends. No lock-in after that.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
      <p className="text-xs tracking-[0.18em] text-dim uppercase">FAQ</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
        Questions, answered.
      </h2>
      <Accordion.Root type="single" collapsible className="mt-10 divide-y divide-line border-y border-line">
        {FAQS.map((item) => (
          <Accordion.Item key={item.q} value={item.q}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-medium text-fg">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-dim transition-transform duration-200 group-data-[state=open]:rotate-45"
                  strokeWidth={1.6}
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
              <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}