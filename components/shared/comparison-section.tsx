"use client";

import { StaggerReveal, RevealEyebrow, RevealHeading, RevealParagraph, RevealCard } from "@/components/motion/primitives";



type ComparisonRow = {
  label: string;
  miransas: string;
  voiceActor: string;
  genericTts: string;
};

const rows: ComparisonRow[] = [
  {
    label: "Language focus",
    miransas: "Uzbek speech research — in development",
    voiceActor: "Native speakers and talent selected per project",
    genericTts: "Language coverage and quality vary by provider",
  },
  {
    label: "Voice ownership",
    miransas: "Consent-led voice creation",
    voiceActor: "Usage rights agreed with each voice talent",
    genericTts: "Voice rights and licensing depend on the provider",
  },
  {
    label: "Revisions",
    miransas: "Designed for repeatable audio generation",
    voiceActor: "Changes may require another recording session",
    genericTts: "Regeneration options vary by tool",
  },
  {
    label: "Production workflow",
    miransas: "A software-based workflow for creating voice content",
    voiceActor: "Recording, direction and editing are arranged per project",
    genericTts: "Usually generated through a provider's interface or API",
  },
  {
    label: "Pricing",
    miransas: "Launch plans and usage details will be announced",
    voiceActor: "Typically quoted per session or project",
    genericTts: "Subscription or usage-based pricing",
  },
];

const tableRows = [
  { key: "miransas", title: "Miransas", featured: true },
  { key: "voiceActor", title: "Voice actor", featured: false },
  { key: "genericTts", title: "Generic TTS", featured: false },
] as const;

export function ComparisonSection() {
  return (
    <section className="relative overflow-x-clip bg-surface-page py-24 text-text-heading md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <StaggerReveal
          className="mx-auto max-w-2xl text-center"
        >
          <RevealEyebrow as="span"
            className="inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
          >
            <span className="size-1.5 rounded-full bg-text-heading" />
            The difference
          </RevealEyebrow>
          <RevealHeading
            className="mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
          >
            A voice workflow built around your needs.
          </RevealHeading>
          <RevealParagraph
            className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.6] text-text-muted sm:text-base"
          >
            Compare the approaches to creating voice content — from working
            with a voice actor to using an AI voice platform.
          </RevealParagraph>
        </StaggerReveal>

        <RevealCard
          className="surface-shadow mt-12 overflow-hidden rounded-4xl bg-surface-card md:mt-16"
        >
          <div
            data-lenis-prevent
            className="overflow-x-auto overscroll-x-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                Comparison of Miransas, hiring a voice actor, and generic text-to-speech tools.
              </caption>
              <colgroup>
                <col className="w-[21%]" />
                <col className="w-[27%]" />
                <col className="w-[26%]" />
                <col className="w-[26%]" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-7 text-xs font-medium uppercase tracking-[0.12em] text-text-muted md:px-8"
                  >
                    Compared by
                  </th>
                  {tableRows.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={[
                        "px-6 py-7 text-base font-semibold tracking-[-0.02em] md:px-7",
                        column.featured
                          ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated"
                          : "text-text-primary",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2.5">
                        {column.featured && (
                          <span className="size-2 rounded-full bg-text-heading" />
                        )}
                        {column.title}
                      </div>
                      {column.featured && (
                        <span className="mt-2 block text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                          Voice infrastructure
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row.label}
                    className={
                      rowIndex % 2 === 1
                        ? "bg-black/[0.02] dark:bg-white/[0.02]"
                        : ""
                    }
                  >
                    <th
                      scope="row"
                      className="px-6 py-6 text-sm font-semibold text-text-primary md:px-8 md:py-7"
                    >
                      {row.label}
                    </th>
                    <td className="bg-surface-elevated px-6 py-6 text-[15px] leading-[1.6] text-text-heading dark:bg-surface-elevated md:px-7 md:py-7">
                      {row.miransas}
                    </td>
                    <td className="px-6 py-6 text-[15px] leading-[1.6] text-text-muted md:px-7 md:py-7">
                      {row.voiceActor}
                    </td>
                    <td className="px-6 py-6 text-[15px] leading-[1.6] text-text-muted md:px-7 md:py-7">
                      {row.genericTts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 bg-surface-page/55 px-6 py-4 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="text-xs leading-[1.45] text-text-muted sm:text-[13px]">
              Product capabilities and availability may vary by development stage.
            </p>
            <span className="shrink-0 font-mono text-xs tracking-[0.12em] text-text-muted">
              MIRANSAS / OVERVIEW
            </span>
          </div>
        </RevealCard>

        <p className="mt-4 text-center text-xs text-text-muted md:hidden">
          Swipe horizontally to compare all columns.
        </p>
      </div>
    </section>
  );
}

export default ComparisonSection;
