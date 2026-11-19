"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { MODEL_LANGUAGES, VOICE_TECHNOLOGY } from "@/lib/voice-technology";
import { ScrollReveal, WordReveal } from "@/components/motion/reveal";

export default function LanguageCoverage() {
  const id = useId();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const languages = MODEL_LANGUAGES.filter(({ name, code }) => name.toLowerCase().includes(normalized) || code.includes(normalized));
  const isUzbekQuery = normalized.length >= 2 && ["uzbek", "o‘zbek", "o'zbek", "ozbek", "uz"].some(term => term.startsWith(normalized) || normalized.startsWith(term));

  return (
    <section id="languages" aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Language coverage</p>
            <h2 id={`${id}-heading`} className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl"><WordReveal text="More ways to be heard." /></h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">{MODEL_LANGUAGES.length} model-supported languages. A foundation for multilingual speech, with quality that varies by language and reference recording.</p>
          </div>
          <div>
            <label htmlFor={`${id}-search`} className="text-sm font-medium">Find a language</label>
            <div className="relative mt-3">
              <Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input id={`${id}-search`} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name or code" className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-controls={`${id}-results`} />
            </div>
          </div>
        </div>
        <p className="mt-10 text-sm text-muted-foreground" role="status" aria-live="polite">{languages.length} of {MODEL_LANGUAGES.length} languages</p>
        <ul id={`${id}-results`} className="mt-4 grid grid-cols-2 gap-x-6 border-t border-border sm:grid-cols-3 lg:grid-cols-4">
          {languages.map(language => <li key={language.code} className="flex items-center justify-between gap-3 border-b border-border py-5"><span className="text-base font-medium">{language.name}</span><span className="font-mono text-sm uppercase text-muted-foreground">{language.code}</span></li>)}
        </ul>
        {languages.length === 0 && (
          <p className="py-8 text-base text-muted-foreground">
            {isUzbekQuery
              ? "Uzbek isn’t part of the current model coverage. Native Uzbek speech is in development; see the research note below."
              : "No matching model language. Try another name or code."}
          </p>
        )}
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Model coverage describes the speech engine, not a published voice library. Curated public voices have not been announced. <a href={VOICE_TECHNOLOGY.modelSource} className="underline underline-offset-4">View language source</a>.</p>
        <ScrollReveal className="mt-12 rounded-4xl bg-card p-7 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
            <h3 className="text-2xl font-medium tracking-tight">{VOICE_TECHNOLOGY.uzbekStatus}</h3>
            <p className="text-base leading-8 text-muted-foreground">{VOICE_TECHNOLOGY.uzbekDescription}</p>
            <Link href="/#research" className="w-fit text-sm font-semibold underline underline-offset-8">Follow the research</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
