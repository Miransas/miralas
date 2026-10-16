import Link from "next/link";
import {
  ArrowUpRight,
  AudioLines,
  Bot,
  Brackets,
  Check,
  CircleHelp,
  Clock3,
  Code2,
  Mic2,
} from "lucide-react";

import { getDocs } from "@/lib/docs";

export default function DocsPage() {
  const docs = getDocs();
  const featuredDocs = docs.filter((doc) => doc.slug !== "getting-started").slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-16 py-12 md:py-16">
      <header className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 shadow-sm md:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-primary/10 bg-primary/[0.04]" />
        <div className="relative max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Miralas documentation</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Build voice products with confidence.</h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Practical guides and API references for building voice agents, generating speech, and shipping reliable audio workflows.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/resources/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start building
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/resources/docs/api-reference"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              API reference
              <Code2 className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="capabilities-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Platform capabilities</p>
          <h2 id="capabilities-heading" className="text-2xl font-semibold tracking-tight text-foreground">Everything you need to ship voice.</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {[
            { icon: Bot, title: "Conversational agents", text: "Create agents that listen, respond, and complete business actions in real time." },
            { icon: AudioLines, title: "Natural speech", text: "Generate consistent, expressive audio for products, support, and content." },
            { icon: Brackets, title: "Developer infrastructure", text: "Use predictable APIs, structured responses, and production-ready workflows." },
          ].map((feature) => (
            <div key={feature.title} className="bg-card p-6">
              <feature.icon className="mb-5 size-5 text-primary" />
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="guides-heading" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Featured guides</p>
            <h2 id="guides-heading" className="text-2xl font-semibold tracking-tight text-foreground">Choose your starting point.</h2>
          </div>
          <Link href="/resources/docs/getting-started" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex">
            View all guides <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredDocs.map((doc) => (
            <Link key={doc.slug} href={`/resources/docs/${doc.slug}`} className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">{doc.category || "Guide"}</p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{doc.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{doc.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary">Read guide <ArrowUpRight className="size-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="use-cases-heading" className="grid gap-8 border-y border-border py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Use cases</p>
          <h2 id="use-cases-heading" className="text-2xl font-semibold tracking-tight text-foreground">Built for real product teams.</h2>
          <p className="text-sm leading-6 text-muted-foreground">Start with a focused workflow and expand as your voice experience matures.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Mic2, title: "Customer support", text: "Resolve common questions and route complex cases." },
            { icon: Clock3, title: "Scheduling", text: "Turn calls into appointments without manual steps." },
            { icon: Check, title: "Sales operations", text: "Qualify leads and keep follow-ups consistent." },
            { icon: CircleHelp, title: "Product assistance", text: "Give users a faster way to find answers." },
          ].map((useCase) => (
            <div key={useCase.title} className="flex gap-3 rounded-xl border border-border/70 p-4">
              <useCase.icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{useCase.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">{useCase.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="quick-links-heading" className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Ready to build?</p>
          <h2 className="mt-3 text-2xl font-semibold">Your first voice workflow starts here.</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/75">Follow the getting started guide and move from API key to working agent in a few focused steps.</p>
          <Link href="/resources/docs/getting-started" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90">
            Open getting started <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Quick links</p>
          <h2 id="quick-links-heading" className="mt-3 text-2xl font-semibold text-foreground">Keep moving.</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["API reference", "/resources/docs/api-reference"],
              ["Voice cloning", "/resources/docs/voice-cloning"],
              ["Text-to-speech", "/resources/docs/tts"],
              ["Speech-to-speech", "/resources/docs/speech-to-speech"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="flex items-center justify-between border-b border-border py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
                {label}
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
