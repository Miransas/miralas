"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Crown,
  Headphones,
  Infinity,
  Mic2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description:
      "Miralas'ı keşfetmek, küçük projeler oluşturmak ve ilk ses deneyimini geliştirmek için.",
    monthly: 0,
    yearly: 0,
    icon: Sparkles,
    features: [
      "Aylık 10.000 karakter",
      "Uzbek Latin & Cyrillic",
      "Temel ses modelleri",
      "Standart API erişimi",
      "Topluluk desteği",
    ],
    button: "Ücretsiz Başla",
    href: "/get-started",
  },
  {
    name: "Growth",
    description:
      "Üretime geçen creator'lar, startup'lar ve büyüyen ürün ekipleri için.",
    monthly: 29,
    yearly: 24,
    icon: Zap,
    popular: true,
    features: [
      "Aylık 250.000 karakter",
      "Premium Uzbek modelleri",
      "Voice cloning",
      "Realtime generation",
      "Developer API",
      "Donation workflows",
      "Öncelikli destek",
    ],
    button: "Growth'a Başla",
    href: "/get-started",
  },
  {
    name: "Enterprise",
    description:
      "Büyük ekipler, yüksek trafik ve özel güvenlik ihtiyaçları için özel altyapı.",
    monthly: null,
    yearly: null,
    icon: Crown,
    features: [
      "Özel kullanım limitleri",
      "Dedicated infrastructure",
      "Enterprise API",
      "Gelişmiş güvenlik",
      "Özel onboarding",
      "SLA & priority support",
      "Özel model seçenekleri",
    ],
    button: "Ekiple Konuş",
    href: "/contact",
  },
];

const comparison = [
  ["Uzbek Latin & Cyrillic", true, true, true],
  ["Temel voice models", true, true, true],
  ["Premium voice models", false, true, true],
  ["Voice cloning", false, true, true],
  ["Realtime generation", false, true, true],
  ["Developer API", true, true, true],
  ["Donation workflows", false, true, true],
  ["Dedicated infrastructure", false, false, true],
  ["SLA", false, false, true],
  ["Priority support", false, true, true],
];

const faqs = [
  {
    q: "Fiyatlar kesin mi?",
    a: "Hayır. Bu sayfadaki fiyatlar şimdilik ürün yapısını göstermek için placeholder olarak hazırlanmıştır. Gerçek kullanım limitleri ve fiyatlandırma daha sonra güncellenecektir.",
  },
  {
    q: "Ücretsiz plan gerçekten ücretsiz olacak mı?",
    a: "Plan yapısında ücretsiz bir başlangıç katmanı bulunması hedefleniyor. Kesin limitler ve kullanım koşulları ürün yayına yaklaşırken netleşecek.",
  },
  {
    q: "Voice cloning hangi planda?",
    a: "Şimdilik Growth ve Enterprise planlarında konumlandırıldı. Enterprise tarafında daha gelişmiş güvenlik ve kullanım kontrolleri bulunacak.",
  },
  {
    q: "API bütün planlarda kullanılabilir mi?",
    a: "Starter'da temel API erişimi, Growth'ta daha yüksek limitler ve Enterprise'ta özel API altyapısı planlanıyor.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CheckItem({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={[
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
          muted
            ? "bg-zinc-100 text-zinc-400 dark:bg-white/[0.06] dark:text-zinc-600"
            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
        ].join(" ")}
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>

      <span
        className={
          muted
            ? "text-sm text-zinc-400 dark:text-zinc-600"
            : "text-sm text-zinc-700 dark:text-zinc-300"
        }
      >
        {children}
      </span>
    </li>
  );
}

export function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-sky-400/[0.09] blur-[120px] dark:bg-sky-400/[0.07]" />

        <div className="absolute right-[-180px] top-[620px] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.06] blur-[120px]" />

        <div className="absolute left-[-200px] top-[1100px] h-[500px] w-[500px] rounded-full bg-violet-400/[0.05] blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative px-6 pb-20 pt-32 sm:pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                <Sparkles className="size-3.5 text-sky-500" />
                Simple pricing. Serious voice infrastructure.
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                Build without worrying
                <span className="block bg-gradient-to-r from-zinc-950 via-zinc-600 to-sky-500 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-sky-300">
                  about the next bill.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Start small, scale when your voice product grows. Miralas
                pricing is designed around creators, developers and teams
                building real products.
              </p>
            </Reveal>

            {/* Billing switch */}
            <Reveal delay={0.18}>
              <div className="mt-10 flex items-center justify-center">
                <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-100/80 p-1.5 shadow-inner dark:border-white/10 dark:bg-white/[0.05]">
                  <button
                    type="button"
                    onClick={() => setYearly(false)}
                    className={[
                      "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                      !yearly
                        ? "bg-white text-zinc-950 shadow-sm dark:bg-white dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                    ].join(" ")}
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    onClick={() => setYearly(true)}
                    className={[
                      "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                      yearly
                        ? "bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                    ].join(" ")}
                  >
                    Yearly
                    <span className="ml-2 text-[10px] text-emerald-500">
                      SAVE 17%
                    </span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative px-6 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <Reveal key={plan.name} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={[
                    "relative h-full overflow-hidden rounded-[32px] border p-7 sm:p-8",
                    plan.popular
                      ? "border-sky-500/40 bg-zinc-950 text-white shadow-[0_35px_100px_-45px_rgba(14,165,233,0.5)] dark:bg-[#0b0d0f]"
                      : "border-zinc-200/80 bg-white/80 shadow-[0_30px_100px_-70px_rgba(24,24,27,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]",
                  ].join(" ")}
                >
                  {plan.popular && (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_70%)]"
                      />

                      <div className="absolute right-6 top-6 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300">
                        Most Popular
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white">
                      <Icon className="size-5" />
                    </div>

                    <h2 className="mt-7 text-2xl font-semibold tracking-tight">
                      {plan.name}
                    </h2>

                    <p
                      className={
                        plan.popular
                          ? "mt-3 min-h-[72px] text-sm leading-7 text-white/60"
                          : "mt-3 min-h-[72px] text-sm leading-7 text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {plan.description}
                    </p>

                    <div className="mt-8 flex min-h-[58px] items-end gap-2">
                      {price === null ? (
                        <span className="text-4xl font-semibold tracking-tight">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-5xl font-semibold tracking-tight">
                            ${price}
                          </span>

                          {price > 0 && (
                            <span
                              className={
                                plan.popular
                                  ? "pb-1 text-sm text-white/45"
                                  : "pb-1 text-sm text-zinc-400"
                              }
                            >
                              /month
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {plan.name === "Growth" && yearly && (
                      <p className="mt-2 text-xs font-medium text-emerald-400">
                        Billed annually · $288/year
                      </p>
                    )}

                    <Link
                      href={plan.href}
                      className={[
                        "mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all hover:scale-[1.015]",
                        plan.popular
                          ? "bg-white text-zinc-950 hover:bg-zinc-100"
                          : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
                      ].join(" ")}
                    >
                      {plan.button}
                      <ArrowRight className="size-4" />
                    </Link>

                    <div
                      className={
                        plan.popular
                          ? "my-8 h-px bg-white/10"
                          : "my-8 h-px bg-zinc-200 dark:bg-white/10"
                      }
                    />

                    <p
                      className={
                        plan.popular
                          ? "mb-5 text-xs font-bold uppercase tracking-widest text-white/40"
                          : "mb-5 text-xs font-bold uppercase tracking-widest text-zinc-400"
                      }
                    >
                      Includes
                    </p>

                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <CheckItem key={feature}>{feature}</CheckItem>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative border-y border-zinc-200/80 bg-zinc-50/70 px-6 py-12 dark:border-white/10 dark:bg-white/[0.025] lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {[
            [ShieldCheck, "Secure by design", "Consent-focused voice workflows."],
            [Infinity, "Scale with confidence", "From prototype to production."],
            [Headphones, "Human support", "Help when your team needs it."],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof ShieldCheck;

            return (
              <Reveal key={title as string}>
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">
                    <I className="size-5 text-sky-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{title as string}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {body as string}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="relative px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Compare plans
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Choose the amount of infrastructure you need.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12 overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white/80 shadow-[0_30px_100px_-70px_rgba(24,24,27,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-zinc-200 px-6 py-5 dark:border-white/10">
                  <span className="text-sm font-semibold text-zinc-500">
                    Features
                  </span>
                  {plans.map((plan) => (
                    <span
                      key={plan.name}
                      className="text-center text-sm font-semibold"
                    >
                      {plan.name}
                    </span>
                  ))}
                </div>

                {comparison.map(([feature, starter, growth, enterprise], i) => {
                  const values = [starter, growth, enterprise];

                  return (
                    <div
                      key={feature as string}
                      className={[
                        "grid grid-cols-[1.5fr_repeat(3,1fr)] px-6 py-5",
                        i !== comparison.length - 1
                          ? "border-b border-zinc-100 dark:border-white/[0.06]"
                          : "",
                      ].join(" ")}
                    >
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {feature as string}
                      </span>

                      {values.map((value, index) => (
                        <span
                          key={index}
                          className="flex justify-center"
                        >
                          {value ? (
                            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                              <Check className="size-3.5" />
                            </span>
                          ) : (
                            <span className="text-zinc-300 dark:text-zinc-700">
                              —
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUE */}
      <section className="relative px-6 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[32px] bg-zinc-950 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="absolute right-[-100px] top-[-100px] size-[360px] rounded-full bg-sky-400/15 blur-[90px]"
              />

              <div className="relative">
                <Mic2 className="size-8 text-sky-300" />

                <h2 className="mt-7 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  More than characters.
                  <span className="block text-white/40">
                    Build an actual voice product.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl leading-8 text-white/60">
                  Miralas is designed around the full lifecycle of voice:
                  generation, APIs, creators, localization, donations and
                  production infrastructure.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {[
              ["01", "Prototype fast", "Start experimenting without infrastructure overhead."],
              ["02", "Ship confidently", "Move from demos into real user-facing experiences."],
              ["03", "Scale intelligently", "Upgrade only when your product actually needs it."],
            ].map(([number, title, body], index) => (
              <Reveal key={number} delay={index * 0.06}>
                <div className="rounded-[28px] border border-zinc-200/80 bg-white/80 p-7 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
                  <span className="text-xs font-bold tracking-[0.2em] text-zinc-400">
                    {number}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 pb-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Before you choose a plan.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-3">
            {faqs.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.04}>
                <details className="group rounded-[24px] border border-zinc-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
                  <summary className="cursor-pointer list-none font-semibold outline-none marker:hidden">
                    <div className="flex items-center justify-between gap-6">
                      <span>{item.q}</span>

                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-transform group-open:rotate-45 dark:bg-white/10">
                        <span className="text-lg leading-none">+</span>
                      </span>
                    </div>
                  </summary>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 pb-24 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-zinc-950 px-8 py-16 text-center text-white shadow-[0_40px_140px_-70px_rgba(14,165,233,0.5)] sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.2),transparent_45%),radial-gradient(circle_at_20%_100%,rgba(16,185,129,0.12),transparent_35%)]"
            />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Start building
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                Your next voice product starts here.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/60">
                Start free, test the models and upgrade when your product is
                ready for production.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/get-started"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 transition hover:scale-[1.03] hover:bg-zinc-100"
                >
                  Start Free
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.1]"
                >
                  Talk to Enterprise
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default PricingPage;