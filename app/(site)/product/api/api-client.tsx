"use client";

import { RevealHeading, StaggerReveal, RevealParagraph, SectionReveal } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal as Reveal } from "@/components/motion/reveal";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Fingerprint,
  KeyRound,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Radio,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

const API_EXAMPLE = `// Illustrative integration pattern — use the current API docs for the exact route and fields.
const response = await fetch(
  process.env.MIRANSAS_API_URL!,
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.MIRANSAS_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Hello from Miransas.",
    }),
  }
);

if (!response.ok) {
  throw new Error(\`Miransas API error: \${response.status}\`);
}

const audio = await response.arrayBuffer();`;

const capabilities = [
  {
    number: "01",
    eyebrow: "TEXT TO SPEECH",
    title: "Turn written content into spoken audio.",
    description:
      "Create a path from text to voice in your own product. Shape the experience around your content, your audience and the way your application works.",
    status: "Internal testing",
    image: "/studio/blue.png",
    imageAlt: "Abstract blue-toned voice studio artwork",
    icon: MessageSquareText,
    bullets: ["Text-led speech workflows", "Audio output for product experiences", "A foundation for multilingual use"],
    reverse: false,
  },
  {
    number: "02",
    eyebrow: "DEVELOPER WORKFLOWS",
    title: "Connect voice to the products you build.",
    description:
      "Keep integration logic in your own backend. Organize access around individual clients, scoped credentials and usage limits as API access is rolled out.",
    status: "API integration direction",
    image: "/studio/green.png",
    imageAlt: "Abstract green-toned developer studio artwork",
    icon: Workflow,
    bullets: ["Separate credentials for integrations", "Scoped access and usage controls", "Designed for apps, services and bots"],
    reverse: true,
  },
  {
    number: "03",
    eyebrow: "VOICE IDENTITY",
    title: "Build toward more expressive voice experiences.",
    description:
      "Voice cloning and speech-to-speech are part of the broader direction. These capabilities are still in development and will be introduced with consent and clear usage boundaries.",
    status: "In development",
    image: "/studio/red.png",
    imageAlt: "Abstract red-toned voice identity artwork",
    icon: Fingerprint,
    bullets: ["Consent-first voice identity", "Speech transformation workflows", "Capabilities introduced in stages"],
    reverse: false,
  },
];

const faqs = [
  {
    q: "What can I build with the Miransas API?",
    a: "The API architecture is intended to connect Miransas voice capabilities to your own applications, services and bots. Text-to-speech is the core workflow being developed first; additional voice capabilities will be introduced in stages.",
  },
  {
    q: "Which API capabilities are available today?",
    a: "Availability depends on the current release and access granted to your account. The engineering baseline uses a Rust API and Python inference worker connected through gRPC. Public API access is not confirmed. Voice cloning and speech-to-speech remain in development, so this page does not present them as generally available endpoints.",
  },
  {
    q: "How should I manage API credentials?",
    a: "Keep API credentials on your server and never expose secret keys in browser-side code. The intended access model uses separate credentials, scopes and limits for integrations. Check the current documentation for the exact authentication requirements before connecting a production service.",
  },
  {
    q: "How is API usage measured?",
    a: "Usage and account limits depend on the API release and plan. Exact quotas, rate limits and billing details should be taken from the current documentation or account console rather than assumed from an example on this page.",
  },
  {
    q: "Can I call the API directly from a browser?",
    a: "For requests that require a secret API key, use your own backend as the secure intermediary. Your frontend should call your server, and your server should handle authentication with Miransas.",
  },
  {
    q: "Where can I find endpoint details and updates?",
    a: "Visit the developer documentation for the latest integration details and the changelog for product and API release updates. Endpoint names, request fields and response formats should always follow the current documentation.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-300">
      {children}
    </span>
  );
}

function CapabilityRow({ item }: { item: (typeof capabilities)[number] }) {
  const Icon = item.icon;
  return (
    <Reveal>
      <article className="grid items-center gap-8 border-t border-black/10 py-10 dark:border-white/10 md:grid-cols-2 md:gap-14 md:py-14">
        <div className={item.reverse ? "md:order-2" : ""}>
          <div className="relative aspect-[5/3] overflow-hidden rounded-4xl border border-black/[0.06] bg-surface-card dark:border-white/[0.08] dark:bg-surface-card">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
            />
          </div>
        </div>

        <div className={item.reverse ? "md:order-1" : ""}>
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-text-muted">
            <span className="font-mono tabular-nums">{item.number}</span>
            <span className="h-px w-8 bg-current opacity-30" />
            <span>{item.eyebrow}</span>
          </div>
          <RevealHeading as="h3" className="mt-5 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#101012] dark:text-[#F5F5F5] sm:text-4xl">
            {item.title}
          </RevealHeading>
          <RevealParagraph className="mt-5 max-w-xl text-[15px] leading-7 text-text-primary">
            {item.description}
          </RevealParagraph>
          <div className="mt-6 inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[11px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
            <span className="mr-2 size-1.5 rounded-full bg-neutral-500" />
            {item.status}
          </div>
          <ul className="mt-7 space-y-3">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-text-primary">
                <Icon className="mt-0.5 size-4 shrink-0 text-text-muted" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <RevealHeading as="h3">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-5 py-5 text-left text-[15px] font-medium text-[#151517] transition-colors hover:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 dark:text-neutral-100 dark:hover:text-white/65"
        >
          <span className="flex items-start gap-4">
            <span className="pt-0.5 font-mono text-[11px] text-text-muted">{String(index + 1).padStart(2, "0")}</span>
            {question}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-text-muted">
            <ChevronDown className="size-5" />
          </motion.span>
        </button>
      </RevealHeading>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <RevealParagraph className="max-w-2xl pb-6 pl-9 text-sm leading-7 text-text-primary">{answer}</RevealParagraph>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ApiPage() {
  const [copied, setCopied] = useState(false);

  const copyExample = async () => {
    try {
      await navigator.clipboard.writeText(API_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="overflow-hidden bg-surface-page text-[#101012] transition-colors duration-500  dark:text-[#F5F5F5]">
      {/* HERO */}
      <section className="relative border-b border-black/[0.06] pb-20 pt-36 dark:border-white/[0.08] md:pb-28 md:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-12">
          <StaggerReveal trigger="load" className="relative z-10">
            <Eyebrow><Code2 className="size-3.5" /> DEVELOPER API</Eyebrow>
            <RevealHeading as="h1" className="mt-7 max-w-3xl text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#080809] dark:text-white">
              Voice, built into <span className="text-text-muted">your product.</span>
            </RevealHeading>
            <RevealParagraph className="mt-7 max-w-xl text-base leading-8 text-text-primary md:text-lg">
              Connect your applications to Miransas voice technology. Start with speech workflows and build toward richer voice experiences as capabilities become available.
            </RevealParagraph>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/docs" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#111113] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-[#080808] dark:hover:bg-neutral-200">
                Read the docs <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#usage" className={buttonVariants({ variant: "secondary" })}>
                Explore API usage <ArrowDownRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium tracking-wide text-text-muted">
              <span className="inline-flex items-center gap-2"><LockKeyhole className="size-3.5" /> Server-side credentials</span>
              <span className="inline-flex items-center gap-2"><Layers3 className="size-3.5" /> Modular integrations</span>
            </div>
          </StaggerReveal>

          <Reveal trigger="load" delay={0.12}>
            <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-surface-card p-4 shadow-[0_24px_80px_-46px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-surface-card dark:shadow-none sm:p-6">
              <div className="flex items-center justify-between border-b border-black/10 px-1 pb-4 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[#111113] text-white dark:bg-white dark:text-black"><Terminal className="size-4" /></span>
                  <div>
                    <p className="text-xs font-semibold text-text-heading">API request</p>
                    <p className="mt-0.5 text-[10px] text-text-muted">Illustrative integration</p>
                  </div>
                </div>
                <span className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] text-text-muted dark:border-white/10 dark:text-neutral-400">SERVER</span>
              </div>
              <div className="space-y-4 px-1 py-5 font-mono text-[11px] leading-6 sm:text-xs">
                <div className="flex gap-3"><span className="text-text-muted">01</span><span><span className="text-text-muted">const</span> <span className="text-text-heading">voiceRequest</span> <span className="text-text-muted">=</span> <span className="text-text-primary">&#123;</span></span></div>
                <div className="flex gap-3"><span className="text-text-muted">02</span><span className="pl-5"><span className="text-text-muted">task:</span> <span className="text-text-heading">"text-to-speech"</span>,</span></div>
                <div className="flex gap-3"><span className="text-text-muted">03</span><span className="pl-5"><span className="text-text-muted">text:</span> <span className="text-text-heading">"Give your product a voice."</span></span></div>
                <div className="flex gap-3"><span className="text-text-muted">04</span><span className="text-text-primary">&#125;;</span></div>
                <div className="my-2 h-px bg-black/10 dark:bg-white/10" />
                <div className="flex gap-3"><span className="text-text-muted">05</span><span><span className="text-text-muted">await</span> <span className="text-text-heading">sendToMiransas</span>(voiceRequest);</span></div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-black/[0.07] bg-white/70 px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.035]">
                <span className="text-[11px] text-text-muted">One integration. Your application.</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300"><span className="size-1.5 rounded-full bg-neutral-400" /> API concept</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}
      <SectionReveal id="capabilities" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <StaggerReveal className="mb-12 max-w-2xl md:mb-16">
            <Eyebrow><Radio className="size-3.5" /> VOICE CAPABILITIES</Eyebrow>
            <RevealHeading className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#101012] dark:text-white md:text-6xl">One API direction.<br /><span className="text-text-muted">Multiple ways to speak.</span></RevealHeading>
            <RevealParagraph className="mt-5 max-w-xl text-base leading-7 text-text-primary">Explore the voice workflows Miransas is building for developers. Availability is labelled clearly as each capability moves forward.</RevealParagraph>
          </StaggerReveal>
          <div>
            {capabilities.map((item) => <CapabilityRow key={item.number} item={item} />)}
          </div>
        </div>
      </SectionReveal>

      {/* USAGE FLOW */}
      <SectionReveal id="usage" className="border-y border-black/[0.06] bg-surface-card py-20 dark:border-white/[0.08] dark:bg-surface-card md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <StaggerReveal className="max-w-2xl">
            <Eyebrow><Zap className="size-3.5" /> HOW INTEGRATION WORKS</Eyebrow>
            <RevealHeading className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#101012] dark:text-white md:text-5xl">From your backend<br />to a voice response.</RevealHeading>
            <RevealParagraph className="mt-5 max-w-xl text-base leading-7 text-text-primary">A simple mental model for connecting an application to a voice service. Follow the current developer docs for the actual request and response contract.</RevealParagraph>
          </StaggerReveal>

          <div className="mt-14 grid gap-0 border-y border-black/10 dark:border-white/10 md:grid-cols-3 md:divide-x md:divide-black/10 dark:md:divide-white/10">
            {[
              { n: "01", title: "Authenticate", text: "Keep your API key in a secure server environment. Give each integration only the access it needs.", icon: KeyRound },
              { n: "02", title: "Send a request", text: "Your backend sends the task and input using the fields defined by the current API documentation.", icon: Code2 },
              { n: "03", title: "Handle the result", text: "Process the returned result in your application and present the audio or workflow outcome to your user.", icon: AudioIcon },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <StaggerReveal key={step.n} className="py-8 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0">
                  <span className="font-mono text-xs text-text-muted">{step.n}</span>
                  <span className="mt-6 flex size-11 items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-200"><Icon className="size-5" /></span>
                  <RevealHeading as="h3" className="mt-5 text-xl font-semibold tracking-tight text-[#111113] dark:text-white">{step.title}</RevealHeading>
                  <RevealParagraph className="mt-3 max-w-sm text-sm leading-7 text-text-primary">{step.text}</RevealParagraph>
                </StaggerReveal>
              );
            })}
          </div>

          <Reveal delay={0.08} className="mt-12 overflow-hidden rounded-4xl border border-black/10 bg-[#101012] text-white dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2.5"><Terminal className="size-4 text-white/65" /><span className="text-xs font-semibold">Server-side example</span><span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/50">Illustrative</span></div>
              <button type="button" onClick={copyExample} className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[11px] font-medium text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy example"}
              </button>
            </div>
            <pre className="overflow-x-auto p-5 text-[11px] leading-6 text-white/75 sm:p-7 sm:text-xs"><code>{API_EXAMPLE}</code></pre>
            <div className="border-t border-white/10 px-5 py-3 text-[10px] leading-5 text-white/70 sm:px-7">Example structure only. Replace the URL, authentication details and payload with the exact values from the current Miransas API documentation.</div>
          </Reveal>
        </div>
      </SectionReveal>

      {/* USAGE & ACCESS */}
      <SectionReveal className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
          <StaggerReveal>
            <Eyebrow><ShieldCheck className="size-3.5" /> ACCESS & USAGE</Eyebrow>
            <RevealHeading className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#101012] dark:text-white md:text-5xl">Control access.<br /><span className="text-text-muted">Understand usage.</span></RevealHeading>
            <RevealParagraph className="mt-5 max-w-lg text-base leading-7 text-text-primary">A developer integration should be easy to identify, manage and review. Miransas is being shaped around separate credentials, scoped access and usage limits for connected clients.</RevealParagraph>
          </StaggerReveal>
          <Reveal delay={0.1}>
            <div className="divide-y divide-black/10 rounded-4xl border border-black/10 bg-surface-card px-6 dark:divide-white/10 dark:border-white/10 dark:bg-surface-card sm:px-8">
              {[
                { icon: Fingerprint, title: "Client-level credentials", desc: "Keep integrations identifiable instead of sharing one secret everywhere." },
                { icon: LockKeyhole, title: "Scoped permissions", desc: "Separate the access an application needs from access it does not." },
                { icon: Layers3, title: "Usage and limits", desc: "Make consumption and account limits part of the integration model." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 py-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-200"><Icon className="size-4.5" /></span>
                  <div><RevealHeading as="h3" className="text-sm font-semibold text-text-heading">{title}</RevealHeading><p className="mt-1.5 text-sm leading-6 text-text-primary">{desc}</p></div>
                </div>
              ))}
            </div>
            <RevealParagraph className="mt-4 text-[11px] leading-5 text-text-muted">Specific quotas, rate limits and billing terms are not shown here; refer to your account and the current API documentation.</RevealParagraph>
          </Reveal>
        </div>
      </SectionReveal>

      {/* FAQ */}
      <SectionReveal id="faq" className="border-t border-black/[0.06] bg-surface-card py-20 dark:border-white/[0.08] dark:bg-surface-card md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <StaggerReveal>
            <Eyebrow><MessageSquareText className="size-3.5" /> API FAQ</Eyebrow>
            <RevealHeading className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#101012] dark:text-white md:text-5xl">Good questions.<br /><span className="text-text-muted">Clear answers.</span></RevealHeading>
            <RevealParagraph className="mt-5 max-w-sm text-sm leading-7 text-text-primary">A few things to know before connecting your application to Miransas.</RevealParagraph>
            <Link href="/docs" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition hover:gap-3 dark:text-neutral-200">Developer documentation <ArrowRight className="size-4" /></Link>
          </StaggerReveal>
          <Reveal delay={0.08}>
            <div className="border-t border-black/10 dark:border-white/10">
              {faqs.map((faq, index) => <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={index} />)}
            </div>
          </Reveal>
        </div>
      </SectionReveal>

      {/* FINAL CTA */}
      <SectionReveal className="py-20 md:py-28">
        <Reveal className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-surface-card px-6 py-12 dark:border-white/10 dark:bg-surface-card sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full border border-black/[0.06] dark:border-white/[0.06]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 size-52 rounded-full border border-black/[0.06] dark:border-white/[0.06]" />
            <div className="relative max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">BUILD WITH MIRANSAS</p>
              <RevealHeading className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#101012] dark:text-white sm:text-5xl">Put voice at the heart of your product.</RevealHeading>
              <RevealParagraph className="mt-5 max-w-xl text-sm leading-7 text-text-primary">Explore the integration guidance and follow the capabilities as they become available.</RevealParagraph>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/docs" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#111113] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-[#080808]">Open documentation <ArrowUpRight className="size-4" /></Link>
                <Link href="/resources/changelog" className={buttonVariants({ variant: "secondary" })}>View changelog <ArrowRight className="size-4" /></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionReveal>
    </main>
  );
}

function AudioIcon({ className }: { className?: string }) {
  return <Radio className={className} />;
}
