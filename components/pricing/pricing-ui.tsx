import { RevealHeading, RevealParagraph } from "@/components/motion/primitives";
import type { ReactNode } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";
import type { ComparisonGroup, Publication } from "@/lib/pricing/types";
import { published } from "@/lib/pricing/calculations";

export const shell = "mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12";
export const label = "font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted";
export const input = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 dark:border-white/10 dark:bg-surface-elevated";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-2xl"><p className={label}>{eyebrow}</p><RevealHeading className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{title}</RevealHeading><RevealParagraph className="mt-4 max-w-xl text-sm leading-7 text-text-primary sm:text-base">{description}</RevealParagraph></div>;
}
export function Status({ children }: { children: ReactNode }) {
  return <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600 dark:border-white/10 dark:text-neutral-400"><span className="h-1.5 w-1.5 rounded-full bg-[#a5ac96]" />{children}</span>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">{children}<ArrowUpRight aria-hidden="true" size={15} /></Link>;
}
export function comparisonValue(value: Publication<string>): string { return published(value) ?? "To be announced"; }
export function Comparison<K extends string>({ title, description, columns, groups }: { title: string; description: string; columns: { id: K; name: string }[]; groups: ComparisonGroup<K>[] }) {
  return <section className="mt-24 sm:mt-32"><SectionHeading eyebrow="THE DETAILS" title={title} description={description} />
    <div className="mt-10 border-t border-black/15 dark:border-white/15">
      <div className="hidden grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] gap-4 py-5 md:grid"><span className={label}>Features</span>{columns.map(c => <span key={c.id} className="text-xs font-semibold">{c.name}</span>)}</div>
      {groups.map(group => <div key={group.title}><RevealHeading as="h3" className="border-y border-black/10 bg-black/[0.025] px-3 py-3 text-xs font-semibold dark:border-white/10 dark:bg-white/[0.035]">{group.title}</RevealHeading>{group.rows.map(row => <div key={row.label} className="grid gap-3 border-b border-black/[0.07] px-3 py-4 dark:border-white/[0.07] md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] md:items-center md:gap-4"><div className="flex items-center gap-2 text-sm">{row.label}{row.explanation && <span title={row.explanation} aria-label={row.explanation} tabIndex={0} className="text-text-muted"><Info size={13} aria-hidden="true" /></span>}</div><div className="grid grid-cols-3 gap-2 md:contents">{columns.map(col => <div key={col.id} className="text-[11px] leading-5 text-text-muted sm:text-xs"><span className="mb-1 block font-medium text-text-primary md:hidden">{col.name}</span>{comparisonValue(row.values[col.id])}</div>)}</div></div>)}</div>)}
    </div>
  </section>;
}
