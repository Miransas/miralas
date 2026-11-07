"use client";

import { motion, useReducedMotion } from "framer-motion";

type ComparisonRow = {
  label: string;
  miransas: string;
  voiceActor: string;
  genericTts: string;
};

const rows: ComparisonRow[] = [
  {
    label: "Language focus",
    miransas: "Uzbek-first model development",
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
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#EFEFEF] py-24 text-[#171717] transition-colors duration-500 dark:bg-[#050505] dark:text-[#F5F5F5] md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.025] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55 dark:border-white/10 dark:bg-white/[0.035] dark:text-white/55">
            The difference
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-4xl md:text-5xl">
            A voice workflow built around your needs.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/60 dark:text-white/55 sm:text-base">
            Compare the approaches to creating voice content — from working
            with a voice actor to using an AI voice platform.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-[26px] border border-black/[0.075] bg-[#F7F7F7] shadow-[0_18px_60px_-42px_rgba(0,0,0,0.22)] dark:border-white/[0.09] dark:bg-[#0D0D0D] dark:shadow-none md:mt-16 md:rounded-[30px]"
        >
          <div className="overflow-x-auto overscroll-x-contain">
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
                  <th scope="col" className="px-6 py-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35 dark:text-white/35 md:px-8">
                    Compared by
                  </th>
                  {tableRows.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={[
                        "px-6 py-7 text-sm font-semibold tracking-tight md:px-7 md:text-base",
                        column.featured
                          ? "border-x border-black/[0.07] bg-[#ECECEC] text-[#171717] dark:border-white/[0.09] dark:bg-[#151515] dark:text-white"
                          : "text-black/75 dark:text-white/75",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2.5">
                        {column.featured && (
                          <span className="size-1.5 rounded-full bg-[#242424] dark:bg-white" />
                        )}
                        {column.title}
                      </div>
                      {column.featured && (
                        <span className="mt-2 block text-[9px] font-medium uppercase tracking-[0.16em] text-black/45 dark:text-white/40">
                          Voice infrastructure
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <motion.tr
                    key={row.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.055, ease: "easeOut" }}
                  >
                    <th
                      scope="row"
                      className="border-t border-black/[0.075] px-6 py-6 text-[12px] font-semibold text-black/75 dark:border-white/[0.085] dark:text-white/75 md:px-8 md:py-7 md:text-[13px]"
                    >
                      {row.label}
                    </th>
                    <td className="border-x border-t border-black/[0.07] bg-[#ECECEC] px-6 py-6 text-[12px] leading-6 text-[#292929] dark:border-white/[0.09] dark:bg-[#151515] dark:text-white/85 md:px-7 md:py-7 md:text-[13px]">
                      {row.miransas}
                    </td>
                    <td className="border-t border-black/[0.075] px-6 py-6 text-[12px] leading-6 text-black/55 dark:border-white/[0.085] dark:text-white/55 md:px-7 md:py-7 md:text-[13px]">
                      {row.voiceActor}
                    </td>
                    <td className="border-t border-black/[0.075] px-6 py-6 text-[12px] leading-6 text-black/55 dark:border-white/[0.085] dark:text-white/55 md:px-7 md:py-7 md:text-[13px]">
                      {row.genericTts}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.07] sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="text-[10px] leading-5 text-black/45 dark:text-white/40">
              Product capabilities and availability may vary by development stage.
            </p>
            <span className="shrink-0 font-mono text-[9px] tracking-[0.16em] text-black/35 dark:text-white/30">
              MIRANSAS / OVERVIEW
            </span>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-[11px] text-black/40 dark:text-white/35 md:hidden">
          Swipe horizontally to compare all columns.
        </p>
      </div>
    </section>
  );
}

export default ComparisonSection;
