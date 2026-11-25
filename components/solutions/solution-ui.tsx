import { RevealHeading, StaggerReveal, RevealParagraph, RevealCard, RevealEyebrow } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight,ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12";
export const eyebrow = "font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-text-muted";

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="overflow-hidden bg-surface-page text-foreground ">{children}</main>;
}
export function Hero({ label, title, description, aside }: { label: string; title: string; description: string; aside?: ReactNode }) {
  return <section className={`${wrap} pt-36 pb-16 sm:pt-44 sm:pb-24 lg:pt-48`}>
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(230px,0.38fr)] lg:items-end">
      <StaggerReveal trigger="load">
        <RevealEyebrow className={`${eyebrow} flex items-center gap-3`}><span className="size-1.5 rounded-full bg-[#89927b]" />{label}</RevealEyebrow>
        <RevealHeading as="h1" className="mt-8 max-w-4xl text-[clamp(3rem,7.5vw,6.8rem)] font-medium leading-[1] tracking-[-0.065em]">{title}</RevealHeading>
        <RevealParagraph className="mt-8 max-w-xl text-base leading-7 text-text-primary sm:text-lg sm:leading-8">{description}</RevealParagraph>
      </StaggerReveal>
      {aside && <div className="border-l border-black/15 pl-6 dark:border-white/15">{aside}</div>}
    </div>
  </section>;
}
export function Heading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <StaggerReveal><RevealEyebrow className={eyebrow}>{label}</RevealEyebrow><RevealHeading className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{title}</RevealHeading>{description && <RevealParagraph className="mt-5 max-w-xl text-sm leading-7 text-text-primary sm:text-base">{description}</RevealParagraph>}</StaggerReveal>;
}
export function FeatureRows({ items }: { items: { number: string; title: string; description: string }[] }) {
  return <div className="border-t border-black/15 dark:border-white/15">{items.map(item => <RevealCard as="article" key={item.number} className="grid gap-4 border-b border-black/10 py-8 dark:border-white/10 md:grid-cols-[60px_1fr_1fr] md:gap-8 md:py-10"><span className={eyebrow}>{item.number}</span><RevealHeading as="h3" className="text-xl font-medium tracking-tight sm:text-2xl">{item.title}</RevealHeading><RevealParagraph className="max-w-lg text-sm leading-7 text-text-primary">{item.description}</RevealParagraph></RevealCard>)}</div>;
}
export function EndCTA({ eyebrow: caption = "KEEP EXPLORING", title, description, href, link }: { eyebrow?: string; title: string; description: string; href: string; link: string }) {
  return <section className={`${wrap} pb-24 sm:pb-32`}><div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-14 dark:border-white/15 sm:flex-row sm:items-end"><div><p className={eyebrow}>{caption}</p><RevealHeading className="mt-5 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{title}</RevealHeading><RevealParagraph className="mt-4 max-w-lg text-sm leading-7 text-text-muted">{description}</RevealParagraph></div><Link href={href} className={buttonVariants()}>{link}<ArrowRight size={16} aria-hidden="true" /></Link></div></section>;
}
export function BackLink() {
  return <Link href="/solutions" className="inline-flex items-center gap-1 text-xs font-medium text-text-muted underline-offset-4 hover:text-foreground hover:underline">All solutions <ArrowUpRight size={13} aria-hidden="true" /></Link>;
}
