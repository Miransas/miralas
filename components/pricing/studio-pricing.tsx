"use client";
import { useState } from "react";
import { studioComparison, studioPlans } from "@/lib/pricing/config";
import { formatMoney, published } from "@/lib/pricing/calculations";
import type { BillingCycle } from "@/lib/pricing/types";
import { Comparison, label, SectionHeading, Status, TextLink } from "./pricing-ui";

export function StudioPricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  return <>
    <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="01 / STUDIO" title="A space to create with voice." description="Explore the plans being designed for the Studio experience. Pricing and included usage are being finalized." />
      <div className="inline-flex w-fit rounded-full border border-black/10 bg-white/50 p-1 dark:border-white/10 dark:bg-white/[0.03]" role="group" aria-label="Billing period">{(["monthly", "yearly"] as const).map(c => <button key={c} type="button" aria-pressed={cycle === c} onClick={() => setCycle(c)} className={`cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${cycle === c ? "bg-foreground text-background" : "text-neutral-500 hover:text-foreground"}`}>{c === "monthly" ? "Monthly" : "Yearly"}</button>)}</div>
    </div>
    <div className="mt-10 grid gap-3 md:grid-cols-3">{studioPlans.map((plan, index) => { const price = published(plan.prices[cycle]); return <article key={plan.id} className="flex min-h-[300px] flex-col rounded-[22px] border border-black/[0.07] bg-white/70 p-6 dark:border-white/[0.07] dark:bg-[#101010] sm:p-8"><div className="flex items-start justify-between"><span className={label}>0{index + 1} / STUDIO</span><Status>In development</Status></div><h3 className="mt-9 text-2xl font-medium tracking-tight">{plan.name}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-neutral-500">{plan.description}</p><div className="mt-8 border-t border-black/10 pt-5 dark:border-white/10"><p className="text-lg font-medium tracking-tight">{price ? formatMoney(price) : "Pricing to be announced"}</p><p className="mt-1 text-xs text-neutral-500">{price ? `per ${cycle === "monthly" ? "month" : "year"}` : "Plans and allowances are being finalized."}</p></div><div className="mt-7"><TextLink href="/product/tts">Explore text to speech</TextLink></div></article>; })}</div>
    <p className="mt-4 text-xs leading-6 text-neutral-500">Studio plans are not available for purchase yet. API usage is not included unless explicitly stated in the final terms.</p>
    <Comparison title="Compare the details." description="A closer look at the features and limits being considered. Details will appear as they are confirmed." columns={studioPlans} groups={studioComparison} />
  </>;
}
