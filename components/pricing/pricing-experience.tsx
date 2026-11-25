"use client";

import { RevealHeading } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { TRANSITION_MICRO, TRANSITION_UI } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { pricingFaq } from "@/lib/pricing/config";
import type { TabId } from "@/lib/pricing/types";
import { StudioPricing } from "./studio-pricing";
import { ApiPricing } from "./api-pricing";
import { AgentPricing } from "./agent-pricing";
import { label, SectionHeading, shell } from "./pricing-ui";

const tabs: { id: TabId; name: string; number: string }[] = [{ id: "studio", name: "Studio", number: "01" }, { id: "api", name: "API", number: "02" }, { id: "agents", name: "Voice Agents", number: "03" }];
function getTab(value: string | null): TabId { return value === "api" || value === "agents" ? value : "studio"; }

export default function PricingExperience({ initialTab }: { initialTab: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  useEffect(() => {
    const onPopState = () => setTab(getTab(new URLSearchParams(window.location.search).get("tab")));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  function selectTab(next: TabId) {
    if (next === tab) return;
    setTab(next);
    const url = new URL(window.location.href); url.searchParams.set("tab", next);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault(); selectTab(tabs[next].id); refs.current[next]?.focus();
  }
  return <main className="overflow-hidden bg-surface-page text-foreground ">
    <div className={shell}>
      <section className="pb-0 pt-36 sm:pt-44 lg:pt-48"><div className="grid gap-10 lg:grid-cols-[1fr_250px] lg:items-end"><div><p className={`${label} flex items-center gap-3`}><span className="h-1.5 w-1.5 rounded-full bg-[#89927b]" />PRICING / MIRALAS</p><RevealHeading as="h1" className="mt-8 max-w-[850px] text-[clamp(3rem,7.5vw,6.8rem)] font-medium leading-[0.99] tracking-[-0.065em]">Simple pricing.<br /><span className="text-text-muted">Built around your usage.</span></RevealHeading><p className="mt-8 max-w-xl text-base leading-7 text-text-primary sm:text-lg sm:leading-8">Explore the pricing direction for speech generation and future voice workflows. Rates, billing and public access have not been announced.</p><p className="mt-4 text-xs leading-6 text-text-muted">Pricing and billing are being developed. Details shown here are subject to confirmation.</p></div><div className="hidden border-l border-black/15 pl-6 dark:border-white/15 lg:block"><p className={label}>THREE WAYS TO BUILD</p><p className="mt-3 text-sm leading-6 text-text-muted">One platform. Different workflows, designed around how you use voice.</p></div></div>
        <div role="tablist" aria-label="Pricing products" className="mt-16 grid grid-cols-3 gap-1.5 rounded-2xl border border-black/10 bg-black/[0.04] p-1.5 dark:border-white/10 dark:bg-white/[0.05] sm:mt-20 sm:inline-grid sm:min-w-[480px] sm:gap-2">{tabs.map((item, i) => <button key={item.id} ref={el => { refs.current[i] = el; }} id={`tab-${item.id}`} type="button" role="tab" aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1} onClick={() => selectTab(item.id)} onKeyDown={e => onKeyDown(e, i)} className={`relative isolate flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:gap-3 sm:px-5 sm:text-sm ${tab === item.id ? "text-foreground" : "text-neutral-600 hover:bg-white/60 hover:text-foreground dark:text-neutral-400 dark:hover:bg-white/[0.07]"}`}>{tab === item.id && <motion.span layoutId="pricing-tab-indicator" transition={reduce ? { duration: 0 } : TRANSITION_MICRO} className="absolute inset-0 -z-10 rounded-xl bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-[#292929] dark:ring-white/10" />}<span className="hidden font-mono text-[10px] font-normal opacity-50 sm:inline">{item.number}</span>{item.name}</button>)}</div>
      </section>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-20">{tabs.map(item => <div key={item.id} id={`panel-${item.id}`} role="tabpanel" aria-labelledby={`tab-${item.id}`} hidden={tab !== item.id} tabIndex={0}>{tab === item.id && <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : TRANSITION_UI}>{item.id === "studio" ? <StudioPricing /> : item.id === "api" ? <ApiPricing /> : <AgentPricing />}</motion.div>}</div>)}</div>
    </div>
    <section className="bg-surface-card py-24 dark:bg-surface-card sm:py-32"><div className={shell}><SectionHeading eyebrow="BILLING / THE BIG PICTURE" title="Know exactly what you're paying for." description="Different ways to use voice call for different billing models. These are the directions being considered, with details to be confirmed." /><div className="mt-14 grid gap-8 sm:grid-cols-3">{[{ number: "01", title: "Studio", text: "Subscriptions are intended to organize usage through the web interface, with allowances to be determined." }, { number: "02", title: "API", text: "A prepaid balance is proposed for eligible API usage. Service rates and balance behavior are not yet published." }, { number: "03", title: "Voice Agents", text: "A usage-based approach is proposed for conversations. The unit, infrastructure costs and billing relationship are not yet confirmed." }].map(item => <div key={item.number} className="border-t border-black/20 pt-5 dark:border-white/20"><p className={label}>{item.number} / {item.title.toUpperCase()}</p><RevealHeading as="h3" className="mt-7 text-xl font-medium tracking-tight">{item.title}</RevealHeading><p className="mt-3 max-w-xs text-sm leading-7 text-text-primary">{item.text}</p></div>)}</div></div></section>
    <section className={`${shell} grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.3fr] lg:gap-24`}><div><p className={label}>GOOD TO KNOW</p><RevealHeading className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Questions, answered.</RevealHeading><p className="mt-4 max-w-sm text-sm leading-7 text-text-muted">A little more detail on how we&apos;re thinking about pricing and usage.</p></div><div className="border-t border-black/15 dark:border-white/15">{pricingFaq.map(item => <details key={item.question} className="group border-b border-black/10 dark:border-white/10"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-sm font-medium leading-6 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2">{item.question}<Plus size={17} aria-hidden="true" className="shrink-0 text-text-muted transition-transform group-open:rotate-45" /></summary><p className="max-w-xl pb-6 pr-8 text-sm leading-7 text-text-muted">{item.answer}</p></details>)}</div></section>
    <section className={`${shell} pb-24 sm:pb-32`}><div className="flex flex-col justify-between gap-10 border-t border-black/15 pt-14 dark:border-white/15 sm:flex-row sm:items-end"><div><p className={label}>WHAT WILL YOU BUILD?</p><RevealHeading className="mt-5 text-4xl font-medium tracking-[-0.055em] sm:text-5xl">Build with voice.</RevealHeading><p className="mt-4 max-w-lg text-sm leading-7 text-text-muted">Explore the active speech engine and the development plans for API access and conversational experiences.</p></div><div className="flex flex-wrap gap-3"><Link href="/product" className={buttonVariants()}>Explore products <ArrowRight size={16} /></Link><Link href="/product/api" className={buttonVariants({ variant: "secondary" })}>Explore API <ArrowRight size={16} /></Link></div></div></section>
  </main>;
}
