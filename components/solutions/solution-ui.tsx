import Link from "next/link";
import { ArrowRight,ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12";
export const eyebrow = "font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-neutral-500 dark:text-neutral-400";

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="overflow-hidden bg-[#efefef] text-foreground dark:bg-[#050505]">{children}</main>;
}
export function Hero({ label, title, description, aside }: { label: string; title: string; description: string; aside?: ReactNode }) {
  return <section className={`${wrap} pt-36 pb-16 sm:pt-44 sm:pb-24 lg:pt-48`}><div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(230px,0.38fr)] lg:items-end"><div><p className={`${eyebrow} flex items-center gap-3`}><span className="size-1.5 rounded-full bg-[#89927b]" />{label}</p><h1 className="mt-8 max-w-4xl text-[clamp(3rem,7.5vw,6.8rem)] font-medium leading-[1] tracking-[-0.065em]">{title}</h1><p className="mt-8 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg sm:leading-8">{description}</p></div>{aside && <div className="border-l border-black/15 pl-6 dark:border-white/15">{aside}</div>}</div></section>;
}
export function Heading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div><p className={eyebrow}>{label}</p><h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{title}</h2>{description && <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">{description}</p>}</div>;
}
export function FeatureRows({ items }: { items: { number: string; title: string; description: string }[] }) {
  return <div className="border-t border-black/15 dark:border-white/15">{items.map(item => <article key={item.number} className="grid gap-4 border-b border-black/10 py-8 dark:border-white/10 md:grid-cols-[60px_1fr_1fr] md:gap-8 md:py-10"><span className={eyebrow}>{item.number}</span><h3 className="text-xl font-medium tracking-tight sm:text-2xl">{item.title}</h3><p className="max-w-lg text-sm leading-7 text-neutral-600 dark:text-neutral-400">{item.description}</p></article>)}</div>;
}
export function EndCTA({ eyebrow: caption = "KEEP EXPLORING", title, description, href, link }: { eyebrow?: string; title: string; description: string; href: string; link: string }) {
  return <section className={`${wrap} pb-24 sm:pb-32`}><div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-14 dark:border-white/15 sm:flex-row sm:items-end"><div><p className={eyebrow}>{caption}</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{title}</h2><p className="mt-4 max-w-lg text-sm leading-7 text-neutral-500">{description}</p></div><Link href={href} className="inline-flex h-12 w-fit items-center gap-3 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4">{link}<ArrowRight size={16} aria-hidden="true" /></Link></div></section>;
}
export function BackLink() {
  return <Link href="/solutions" className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 underline-offset-4 hover:text-foreground hover:underline">All solutions <ArrowUpRight size={13} aria-hidden="true" /></Link>;
}
