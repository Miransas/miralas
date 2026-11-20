"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { MODEL_LANGUAGES, VOICE_TECHNOLOGY } from "@/lib/voice-technology";
import { WordReveal } from "@/components/motion/reveal";
import {
  RevealCard,
  RevealContainer,
  RevealEyebrow,
  RevealHeading,
  RevealParagraph,
} from "@/components/motion/primitives";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2";

export default function LanguageCoverage() {
  const id = useId();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const languages = MODEL_LANGUAGES.filter(
    ({ name, code }) =>
      name.toLowerCase().includes(normalized) || code.includes(normalized),
  );
  const isUzbekQuery =
    normalized.length >= 2 &&
    ["uzbek", "o‘zbek", "o'zbek", "ozbek", "uz"].some(
      (term) => term.startsWith(normalized) || normalized.startsWith(term),
    );

  return (
    <section
      id="languages"
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 overflow-x-clip bg-surface-page py-24 text-text-heading sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealContainer className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <RevealEyebrow className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              Language coverage
            </RevealEyebrow>
            <RevealHeading
              id={`${id}-heading`}
              className="mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
            >
              <WordReveal text="More ways to be heard." />
            </RevealHeading>
            <RevealParagraph className="mt-6 max-w-xl text-[15px] leading-[1.6] text-text-muted sm:text-base">
              {MODEL_LANGUAGES.length} model-supported languages. A foundation for multilingual
              speech, with quality that varies by language and reference recording.
            </RevealParagraph>
          </div>
          <div>
            <label
              htmlFor={`${id}-search`}
              className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
            >
              Find a language
            </label>
            <div className="relative mt-3">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted"
              />
              <input
                id={`${id}-search`}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or code"
                className={`surface-shadow h-14 w-full rounded-[20px] bg-surface-card pl-12 pr-4 text-base text-text-heading placeholder:text-text-muted transition-colors duration-200 hover:bg-surface-card-hover ${FOCUS_RING}`}
                aria-controls={`${id}-results`}
              />
            </div>
          </div>
        </RevealContainer>

        <p
          className="mt-10 text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]"
          role="status"
          aria-live="polite"
        >
          {languages.length} of {MODEL_LANGUAGES.length} languages
        </p>

        <ul
          id={`${id}-results`}
          className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {languages.map((language) => (
            <li
              key={language.code}
              className="flex items-center justify-between gap-3 rounded-2xl bg-surface-card px-4 py-4 transition-colors duration-200 hover:bg-surface-card-hover sm:px-5"
            >
              <span className="text-[15px] font-medium text-text-primary sm:text-base">
                {language.name}
              </span>
              <span className="font-mono text-xs uppercase tabular-nums text-text-muted sm:text-[13px]">
                {language.code}
              </span>
            </li>
          ))}
        </ul>

        {languages.length === 0 && (
          <p className="mt-4 rounded-[20px] bg-surface-card p-6 text-[15px] leading-[1.6] text-text-primary sm:text-base">
            {isUzbekQuery
              ? "Uzbek isn’t part of the current model coverage. Native Uzbek speech is in development; see the research note below."
              : "No matching model language. Try another name or code."}
          </p>
        )}

        <p className="mt-6 max-w-2xl text-xs leading-[1.6] text-text-muted sm:text-[13px]">
          Model coverage describes the speech engine, not a published voice library. Curated public
          voices have not been announced.{" "}
          <a
            href={VOICE_TECHNOLOGY.modelSource}
            className={`text-text-primary underline underline-offset-4 transition-colors hover:text-text-heading ${FOCUS_RING}`}
          >
            View language source
          </a>
          .
        </p>

        {/* Highlighted Uzbek Research Card — Strategic Violet Gradient */}
        <RevealCard
          standalone
          className="surface-accent surface-shadow mt-12 rounded-[28px] p-7 sm:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
            <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
              {VOICE_TECHNOLOGY.uzbekStatus}
            </h3>
            <p className="text-[15px] leading-[1.6] text-text-primary sm:text-base">
              {VOICE_TECHNOLOGY.uzbekDescription}
            </p>
            <Link
              href="/#research"
              className={`group inline-flex w-fit items-center gap-2 rounded-full bg-text-heading px-5 py-2.5 text-sm font-semibold text-surface-page transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
            >
              <span>Follow the research</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </RevealCard>
      </div>
    </section>
  );
}
