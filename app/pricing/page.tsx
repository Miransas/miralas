"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Crown, Building2 } from "lucide-react";
import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import SmoothScroll from "../../components/providers/SmoothScroll";
import PricingSection from "../../components/pricing/pricing-section";
import PricingFAQ from "../../components/pricing/pricing-faq";


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


// ============================================================
// MAIN PAGE
// ============================================================
export default function PricingPage() {
  return (
    <SmoothScroll>
     
      <PricingSection/>
      <PricingFAQ/>
      {/* <div className="min-h-screen bg-card text-foreground transition-colors duration-300 dark:bg-background dark:text-foreground">
       
       
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                Plans for all{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  businesses
                </span>
                , Suitable for everyone.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Our pricing plans are designed to make getting started as effortless as possible.
                Pay-as-you-go with no monthly fees. Start with $25 and scale as you grow.
              </p>
            </motion.div>
          </div>
        </section>

       
        <section className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PLANS.map((plan, i) => (
                <PricingCard key={plan.id} plan={plan} index={i} />
              ))}
            </div>

          
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-muted-foreground">
                All plans include the same API quality. You only pay for characters synthesized.
                Need more?{" "}
                <Link href="/enterprise/contact" className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                  Contact our sales team
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Compare Plans
              </h2>
              <p className="text-muted-foreground text-lg">
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
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Free</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Starter</th>
                    <th className="text-center py-4 px-4 text-blue-400 font-medium">Pro</th>
                    <th className="text-center py-4 px-4 text-muted-foreground font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
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
                      <td className="py-3.5 pr-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">{row.free}</td>
                      <td className="py-3.5 px-4 text-center">{row.starter}</td>
                      <td className="py-3.5 px-4 text-center text-foreground font-medium">{row.pro}</td>
                      <td className="py-3.5 px-4 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

     
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Everything you need to know about pricing and billing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/faq"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-muted-foreground hover:bg-card/5 transition"
                >
                  Read FAQ
                </Link>
                <Link
                  href="mailto:support@miralas.com"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-card px-6 text-sm font-semibold text-foreground hover:bg-neutral-200 transition"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
       
      </div> */}
    </SmoothScroll>
  );
}