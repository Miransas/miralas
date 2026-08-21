"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Crown, Building2 } from "lucide-react";
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

// ============================================================
// DATA
// ============================================================
interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  price: string;
  period: string;
  badge?: string;
  description: string;
  stats: { label: string; value: string }[];
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    price: "$0",
    period: "forever",
    badge: "Try it out",
    description: "Perfect for exploring Miransas. No credit card required.",
    stats: [
      { label: "Characters", value: "10K" },
      { label: "Voices", value: "10" },
    ],
    features: [
      "10,000 characters / month",
      "10 standard voices",
      "MP3 & WAV export",
      "REST API access",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    ctaHref: "https://console.miralas/auth",
    highlighted: false,
  },
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: "$25",
    period: "one-time",
    badge: "Most Pick",
    description: "Ideal for indie developers and small projects getting started with voice AI.",
    stats: [
      { label: "Characters", value: "250K" },
      { label: "Voices", value: "50+" },
    ],
    features: [
      "$25 starting credit",
      "50+ voices included",
      "Voice cloning (1 model)",
      "REST + gRPC API",
      "MP3, WAV, OGG, FLAC",
      "Rate limit: 60 req/min",
      "Email support (48h)",
      "Usage analytics",
    ],
    cta: "Start Building",
    ctaHref: "https://console.miralas/auth",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: "$100",
    period: "one-time",
    badge: "Recommended",
    description: "For teams and products that need scale, speed, and premium voice quality.",
    stats: [
      { label: "Characters", value: "1.2M" },
      { label: "Voices", value: "100+" },
    ],
    features: [
      "$100 starting credit",
      "All 100+ voices",
      "Unlimited voice clones",
      "Priority gRPC streams",
      "Custom sample rates",
      "SSO & team management",
      "Rate limit: 300 req/min",
      "Priority support (24h)",
      "Advanced analytics & logs",
    ],
    cta: "Go Pro",
    ctaHref: "https://console.miralas/auth",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "contact us",
    description: "Dedicated infrastructure, custom models, and white-glove support for organizations.",
    stats: [
      { label: "Characters", value: "Unlimited" },
      { label: "Voices", value: "Custom" },
    ],
    features: [
      "Unlimited characters",
      "Custom voice model training",
      "Dedicated GPU infrastructure",
      "99.99% uptime SLA",
      "Unlimited rate limits",
      "mTLS & advanced security",
      "Dedicated support channel",
      "Quarterly architecture reviews",
      "Custom contracts & invoicing",
    ],
    cta: "Contact Sales",
    ctaHref: "/enterprise/contact",
    highlighted: false,
  },
];

// ============================================================
// COMPONENTS
// ============================================================
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col rounded-3xl border p-7 sm:p-8 transition-all duration-500",
        plan.highlighted
          ? "border-blue-500/30 bg-[#0d1117] shadow-2xl shadow-blue-500/10 scale-[1.02]"
          : "border-white/[0.06] bg-[#0a0a0c] hover:border-white/10 hover:shadow-xl hover:shadow-white/5",
      )}
    >
      {/* Glow for highlighted */}
      {plan.highlighted && (
        <div className="absolute -top-20 -right-20 size-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-6 right-6">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide",
              plan.highlighted
                ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                : "bg-white/5 text-neutral-400 border border-white/10",
            )}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl mb-5",
          plan.highlighted
            ? "bg-blue-500/10 text-blue-400"
            : "bg-white/5 text-neutral-500",
        )}
      >
        <Icon className="size-5" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {plan.price}
        </span>
        <span className="text-sm text-neutral-500">/ {plan.period}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed mb-6">
        {plan.description}
      </p>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {plan.stats.map((stat) => (
          <span
            key={stat.label}
            className="inline-flex items-center rounded-lg bg-white/5 border border-white/[0.06] px-3 py-1.5 text-xs font-medium text-neutral-300"
          >
            <span className="text-white font-semibold mr-1">{stat.value}</span>
            {stat.label}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                plan.highlighted
                  ? "bg-blue-500/15 text-blue-400"
                  : "bg-white/5 text-neutral-500",
              )}
            >
              <Check className="size-3" />
            </div>
            <span className="text-neutral-400">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={plan.ctaHref}
        className={cn(
          "flex h-12 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300",
          plan.highlighted
            ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10",
        )}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
     <Header variant="dark"/>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Plans for all{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                businesses
              </span>
              , Suitable for everyone.
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              Our pricing plans are designed to make getting started as effortless as possible.
              Pay-as-you-go with no monthly fees. Start with $25 and scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================== PRICING CARDS ===================== */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-neutral-600">
              All plans include the same API quality. You only pay for characters synthesized.
              Need more?{" "}
              <Link href="/enterprise/contact" className="text-neutral-400 hover:text-white transition-colors underline underline-offset-4">
                Contact our sales team
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================== COMPARISON TABLE ===================== */}
      <section className="py-20 sm:py-28 bg-[#08080a]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Compare Plans
            </h2>
            <p className="text-neutral-500 text-lg">
              A side-by-side look at what each plan includes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-4 text-neutral-500 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-neutral-400 font-medium">Free</th>
                  <th className="text-center py-4 px-4 text-neutral-400 font-medium">Starter</th>
                  <th className="text-center py-4 px-4 text-blue-400 font-medium">Pro</th>
                  <th className="text-center py-4 px-4 text-neutral-400 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                {[
                  { feature: "Starting Credit", free: "$0", starter: "$25", pro: "$100", enterprise: "Custom" },
                  { feature: "Characters / Month", free: "10K", starter: "250K", pro: "1.2M", enterprise: "Unlimited" },
                  { feature: "Voices", free: "10", starter: "50+", pro: "100+", enterprise: "All + Custom" },
                  { feature: "Voice Cloning", free: "—", starter: "1 model", pro: "Unlimited", enterprise: "Custom training" },
                  { feature: "API Access", free: "REST only", starter: "REST + gRPC", pro: "REST + gRPC", enterprise: "REST + gRPC" },
                  { feature: "Audio Formats", free: "MP3, WAV", starter: "4 formats", pro: "5 formats", enterprise: "All + custom" },
                  { feature: "Rate Limit", free: "30 req/min", starter: "60 req/min", pro: "300 req/min", enterprise: "Unlimited" },
                  { feature: "Support", free: "Community", starter: "Email (48h)", pro: "Priority (24h)", enterprise: "Dedicated 24/7" },
                  { feature: "Analytics", free: "Basic", starter: "Standard", pro: "Advanced", enterprise: "Custom reports" },
                  { feature: "SSO / Team", free: "—", starter: "—", pro: "Included", enterprise: "Included" },
                  { feature: "SLA", free: "—", starter: "—", pro: "99.9%", enterprise: "99.99%" },
                ].map((row, i) => (
                  <tr key={row.feature} className="border-b border-white/[0.04]">
                    <td className="py-3.5 pr-4 text-neutral-300">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">{row.free}</td>
                    <td className="py-3.5 px-4 text-center">{row.starter}</td>
                    <td className="py-3.5 px-4 text-center text-white font-medium">{row.pro}</td>
                    <td className="py-3.5 px-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ===================== FAQ TEASER ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions?
            </h2>
            <p className="text-neutral-500 mb-8">
              Everything you need to know about pricing and billing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/faq"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-medium text-neutral-300 hover:bg-white/5 transition"
              >
                Read FAQ
              </Link>
              <Link
                href="mailto:support@miralas.com"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-neutral-200 transition"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}