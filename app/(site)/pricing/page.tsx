"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "For exploring Uzbek voice generation and prototyping early ideas.",
    features: ["Voice studio preview", "Uzbek TTS experiments", "Community support", "Starter usage limits"],
  },
  {
    name: "Growth",
    price: "$29",
    description: "For creators and startups shipping real audio content.",
    features: ["Higher generation limits", "Donation page readiness", "Commercial usage", "Priority model updates"],
    popular: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For companies bringing Miralas into products and teams.",
    features: ["API access planning", "Custom usage limits", "Security review", "Launch support"],
  },
];

export default function PricingPage() {
  return (
    <div className="overflow-hidden bg-[#fbfbfa] text-zinc-950 dark:bg-black dark:text-white">
      <section className="relative px-6 pb-20 pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(16,185,129,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.23),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(16,185,129,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,39,42,0.045)_1px,transparent_1px),linear-gradient(rgba(39,39,42,0.045)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)]" />
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7 }} className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:text-zinc-300">
            <Sparkles className="size-4 text-sky-500" />
            Pricing
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
            Plans for every stage of building with Uzbek AI voice.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Start free, grow with creator workflows, and scale into API-backed voice infrastructure.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-[32px] border p-7 shadow-[0_35px_110px_-76px_rgba(2,6,23,0.9)] backdrop-blur-2xl transition hover:-translate-y-1 ${
                plan.popular
                  ? "border-sky-400/40 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  : "border-zinc-200/80 bg-white/74 dark:border-white/10 dark:bg-white/[0.055]"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
              {plan.popular && (
                <div className="mb-5 inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-300 dark:text-sky-700">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-semibold tracking-tight">{plan.name}</h2>
              <p className={`mt-3 min-h-14 text-sm leading-7 ${plan.popular ? "text-white/68 dark:text-zinc-600" : "text-zinc-600 dark:text-zinc-400"}`}>
                {plan.description}
              </p>
              <p className="mt-8 text-5xl font-semibold tracking-tight">{plan.price}</p>
              <Link href="/get-started" className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition hover:scale-[1.02] ${plan.popular ? "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white" : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"}`}>
                Start Creating
              </Link>
              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 text-emerald-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
