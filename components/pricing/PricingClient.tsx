"use client";

import { RevealCard, StaggerReveal, RevealEyebrow, RevealHeading, RevealParagraph } from "@/components/motion/primitives";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Lock, Minus, Plus, Sparkles } from "lucide-react";
import { DURATION_UI, EASE_OUT_EXPO } from "@/lib/motion";
import type { TabId } from "@/lib/pricing/types";
import { VOICE_TECHNOLOGY } from "@/lib/voice-technology";

/* -------------------------------------------------------------------------- */
/* Types & Data                                                               */
/* -------------------------------------------------------------------------- */
type BillingCycle = "monthly" | "annual";

type PlanFeature = {
  label: string;
  locked?: boolean;
};

type PlanTier = {
  id: string;
  name: string;
  badge?: string;
  featured?: boolean;
  monthlyPrice: number | null; // null => Custom
  subtitle: string;
  quota: string;
  features: PlanFeature[];
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
};

type MatrixRow = {
  feature: string;
  values: (string | boolean)[];
};

type PricingTabConfig = {
  id: TabId;
  label: string;
  previewBadge?: boolean;
  sectionNote?: string;
  gridClass: string;
  tiers: PlanTier[];
  matrixTitle: string;
  matrixSubtitle: string;
  matrixRows: MatrixRow[];
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

const FEATURED_CARD_SURFACE =
  "bg-surface-elevated";

const PRICING_TABS: PricingTabConfig[] = [
  {
    id: "studio",
    label: "Voice Studio",
    gridClass: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5",
    tiers: [
      {
        id: "free",
        name: "Free",
        monthlyPrice: 0,
        subtitle: "Explore Miralas Studio in your browser.",
        quota: "10,000 characters / mo",
        features: [
          { label: "10,000 characters per month" },
          { label: "Up to 3 voice clones" },
          { label: "Standard Text-to-Speech (web preview)" },
          { label: "Audio downloads (locked)", locked: true },
          { label: "Speech-to-Speech & Speech-to-Text (locked)", locked: true },
          { label: "Commercial license & API access (locked)", locked: true },
        ],
        ctaLabel: "Start for free",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "pro",
        name: "Pro",
        badge: "Most Popular",
        featured: true,
        monthlyPrice: 9,
        subtitle: "For creators shipping real audio workflows.",
        quota: "100,000 characters / mo",
        features: [
          { label: "100,000 characters per month" },
          { label: "Up to 25 voice clones" },
          { label: "Full audio downloads (MP3 & WAV)" },
          { label: "Text-to-Speech (TTS), Speech-to-Speech (STS) & Speech-to-Text (STT)" },
          { label: "Commercial usage rights" },
          { label: "Multilingual voice library" },
        ],
        ctaLabel: "Get Pro",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "max",
        name: "Max",
        monthlyPrice: 29,
        subtitle: "Higher volume and studio-grade throughput.",
        quota: "500,000 characters / mo",
        features: [
          { label: "500,000 characters per month" },
          { label: "Up to 100 voice clones" },
          { label: "Studio lossless WAV export & batch processing" },
          { label: "Full TTS, STS & STT suite" },
          { label: "Priority generation queue" },
          { label: "Developer API access included" },
        ],
        ctaLabel: "Choose Max",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "ultra",
        name: "Ultra",
        monthlyPrice: 99,
        subtitle: "Maximum capacity for teams and heavy production.",
        quota: "2,000,000 characters / mo",
        features: [
          { label: "2,000,000 characters per month" },
          { label: "Unlimited voice clones" },
          { label: "Highest concurrency & priority inference" },
          { label: "Full TTS, STS, STT & early access to new models" },
          { label: "Shared team workspace & voice catalog" },
          { label: "Priority engineering support" },
        ],
        ctaLabel: "Choose Ultra",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
    ],
    matrixTitle: "Compare Voice Studio tiers",
    matrixSubtitle: "Every allowance and workflow capability across Free, Pro, Max, and Ultra.",
    matrixRows: [
      { feature: "Monthly characters", values: ["10,000", "100,000", "500,000", "2,000,000"] },
      { feature: "Voice clones", values: ["Up to 3", "Up to 25", "Up to 100", "Unlimited"] },
      { feature: "Audio downloads", values: [false, "MP3 & WAV", "Lossless WAV + batch", "Lossless WAV + batch"] },
      { feature: "TTS, STS & STT suite", values: ["TTS preview", true, true, "Full + early models"] },
      { feature: "Commercial license", values: [false, true, true, true] },
      { feature: "Developer API access", values: [false, false, true, true] },
      { feature: "Support", values: ["Community", "Standard", "Priority queue", "Priority engineering"] },
    ],
  },
  {
    id: "api",
    label: "Developer API",
    gridClass: "grid-cols-1 lg:grid-cols-3 gap-5",
    tiers: [
      {
        id: "starter-api",
        name: "Starter API",
        monthlyPrice: 9,
        subtitle: "Predictable entry tier for apps and prototypes.",
        quota: "100,000 characters / mo included",
        features: [
          { label: "100,000 characters included per month" },
          { label: "REST API access & API keys" },
          { label: "Standard concurrency limits" },
          { label: "Webhook delivery events" },
          { label: "Usage & request telemetry dashboard" },
        ],
        ctaLabel: "Start with Starter API",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "scale-api",
        name: "Scale API",
        badge: "Most Popular",
        featured: true,
        monthlyPrice: 49,
        subtitle: "Production voice infrastructure over gRPC and REST.",
        quota: "750,000 characters / mo included",
        features: [
          { label: "750,000 characters included per month" },
          { label: "Low-latency gRPC & REST endpoints" },
          { label: "Higher concurrency & streaming audio" },
          { label: "Programmatic voice cloning endpoints" },
          { label: "Priority inference queue" },
        ],
        ctaLabel: "Get Scale API",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "enterprise-api",
        name: "Enterprise",
        monthlyPrice: null,
        subtitle: "Dedicated throughput and private deployment options.",
        quota: "Custom volume & throughput",
        features: [
          { label: "Dedicated inference capacity" },
          { label: "Custom latency & uptime SLA" },
          { label: "Private deployment & VPC options" },
          { label: "Volume character discounts" },
          { label: "Dedicated engineering support" },
        ],
        ctaLabel: "Contact sales",
        ctaHref: "/resources/contact",
      },
    ],
    matrixTitle: "Compare Developer API tiers",
    matrixSubtitle: "Protocols, throughput, and support across API plans.",
    matrixRows: [
      { feature: "Included characters", values: ["100,000 / mo", "750,000 / mo", "Custom volume"] },
      { feature: "Protocols", values: ["REST", "gRPC & REST", "gRPC, REST & private"] },
      { feature: "Concurrency", values: ["Standard", "High concurrency", "Dedicated capacity"] },
      { feature: "Voice cloning endpoints", values: [false, true, true] },
      { feature: "Webhook events", values: [true, true, true] },
      { feature: "Queue & SLA", values: ["Standard queue", "Priority queue", "Custom SLA + VPC"] },
      { feature: "Support", values: ["Docs & email", "Priority email", "Dedicated engineer"] },
    ],
  },
  {
    id: "agents",
    label: "Voice Agents",
    previewBadge: true,
    sectionNote: "Voice Agents are currently in private preview. Plan limits and telephony integrations are being finalized ahead of general availability.",
    gridClass: "grid-cols-1 lg:grid-cols-3 gap-5",
    tiers: [
      {
        id: "starter-agent",
        name: "Starter Agent",
        monthlyPrice: 19,
        subtitle: "Launch interactive web voice experiences quickly.",
        quota: "150 conversational mins / mo",
        features: [
          { label: "150 included conversational minutes" },
          { label: "Visual conversation workflow builder" },
          { label: "Standard multilingual voices" },
          { label: "Embeddable web voice widget" },
        ],
        ctaLabel: "Join Agent Preview",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "business-agent",
        name: "Business Agent",
        badge: "Most Popular",
        featured: true,
        monthlyPrice: 79,
        subtitle: "Operational voice agents built around your workflows.",
        quota: "1,000 conversational mins / mo",
        features: [
          { label: "1,000 included conversational minutes" },
          { label: "Human handoff & escalation routing" },
          { label: "Custom brand voice identity" },
          { label: "CRM & webhook tool integrations" },
        ],
        ctaLabel: "Get Business Agent",
        ctaHref: VOICE_TECHNOLOGY.consoleUrl,
        external: true,
      },
      {
        id: "enterprise-agent",
        name: "Enterprise Agent",
        monthlyPrice: null,
        subtitle: "High-concurrency telephony and custom latency guarantees.",
        quota: "Unlimited concurrency & scale",
        features: [
          { label: "Unlimited concurrent sessions" },
          { label: "Telephony & SIP trunk integration" },
          { label: "Custom latency & reliability SLAs" },
          { label: "Dedicated solutions engineering" },
        ],
        ctaLabel: "Contact sales",
        ctaHref: "/resources/contact",
      },
    ],
    matrixTitle: "Compare Voice Agents tiers",
    matrixSubtitle: "Conversational minutes, routing, and integrations across agent plans.",
    matrixRows: [
      { feature: "Included minutes", values: ["150 / mo", "1,000 / mo", "Custom volume"] },
      { feature: "Workflow builder", values: [true, true, true] },
      { feature: "Voice identity", values: ["Standard voices", "Custom voice identity", "Dedicated models"] },
      { feature: "Human handoff routing", values: [false, true, true] },
      { feature: "Integrations", values: ["Web widget", "CRM & webhooks", "Telephony / SIP + custom"] },
      { feature: "Concurrency", values: ["Standard", "Team scale", "Unlimited"] },
      { feature: "Support", values: ["Preview support", "Priority support", "Dedicated engineer"] },
    ],
  },
];

const PRICING_FAQS = [
  {
    question: "How does Monthly vs. Annual billing work?",
    answer:
      "Monthly plans renew on a 30-day cycle and can be cancelled anytime. Switching to Annual billing saves 20% across every paid Voice Studio, Developer API, and Voice Agents tier, billed once per year.",
  },
  {
    question: "Do unused monthly characters roll over?",
    answer:
      "Included monthly character allowances reset at the start of each UTC billing period so quotas stay predictable. If your workload spikes regularly, you can move up a tier instantly without waiting for the cycle to end.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Yes. Upgrades take effect immediately with prorated billing and instant access to higher character quotas, voice clone slots, and audio exports. Downgrades apply at the start of your next billing cycle.",
  },
  {
    question: "What is available during private preview?",
    answer:
      "You can explore Miralas Console and Text-to-Speech workflows in private preview right now. Paid checkout, Developer API keys, and Voice Agents are rolling out progressively as billing and GPU benchmarks finalize.",
  },
  {
    question: "How do I get Enterprise capacity or custom Uzbek speech support?",
    answer:
      "Reach out to our team through the Contact page for dedicated inference throughput, VPC deployment, telephony/SIP requirements, or early collaboration on native Uzbek speech evaluation.",
  },
];

/* -------------------------------------------------------------------------- */
/* Helper Functions                                                           */
/* -------------------------------------------------------------------------- */
function getTabFromParam(value: string | null): TabId {
  if (value === "api" || value === "agents") return value;
  return "studio";
}

function getDisplayPrice(monthlyPrice: number | null, cycle: BillingCycle) {
  if (monthlyPrice === null) {
    return { main: "Custom", annualTotal: null as number | null };
  }
  if (monthlyPrice === 0) {
    return { main: "$0", annualTotal: null as number | null };
  }
  if (cycle === "annual") {
    const discountedMonthly = Math.round(monthlyPrice * 0.8);
    return {
      main: `$${discountedMonthly}`,
      annualTotal: discountedMonthly * 12,
    };
  }
  return { main: `$${monthlyPrice}`, annualTotal: null as number | null };
}

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */
function PricingCard({
  tier,
  cycle,
  isPreviewTab,
}: {
  tier: PlanTier;
  cycle: BillingCycle;
  isPreviewTab?: boolean;
}) {
  const { main, annualTotal } = getDisplayPrice(tier.monthlyPrice, cycle);
  const isCustom = tier.monthlyPrice === null;
  const isFree = tier.monthlyPrice === 0;

  const ctaClasses = tier.featured
    ? `group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-5 text-sm font-semibold text-white transition-[transform,opacity,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] dark:bg-white dark:text-[#050505] dark:hover:bg-[#D1D1D1] ${FOCUS_RING}`
    : `group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-surface-page px-5 text-sm font-semibold text-text-heading transition-[transform,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:bg-black/[0.08] active:scale-[0.98] dark:bg-white/[0.07] dark:hover:bg-white/[0.13] ${FOCUS_RING}`;

  const ctaContent = (
    <>
      <span>{tier.ctaLabel}</span>
      {(tier.featured || isCustom) && (
        <ArrowRight
          className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <RevealCard as="article"
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-4xl p-6 transition-[transform,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 sm:p-7",
        tier.featured
          ? `${FEATURED_CARD_SURFACE} surface-shadow-lg`
          : "bg-surface-card surface-shadow hover:bg-surface-card-hover",
      ].join(" ")}
    >

      <div className="relative z-10 flex h-full flex-col">
        {/* Tier Name + Badge */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl">
            {tier.name}
          </h3>
          {tier.badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-text-heading dark:bg-surface-elevated dark:text-text-primary">
              <Sparkles className="size-3" aria-hidden="true" />
              {tier.badge}
            </span>
          ) : isPreviewTab ? (
            <span className="rounded-full bg-surface-page px-2.5 py-1 text-[11px] font-medium text-text-muted dark:bg-white/[0.06]">
              Preview
            </span>
          ) : null}
        </div>

        <p className="mt-2.5 min-h-[2.75rem] text-[15px] leading-[1.55] text-text-muted">
          {tier.subtitle}
        </p>

        {/* Price Block — strictly tabular-nums for zero jitter */}
        <div className="mt-6">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold leading-none tracking-[-0.03em] tabular-nums text-text-heading sm:text-[2.75rem]">
              {main}
            </span>
            {!isCustom && (
              <span className="text-sm font-medium text-text-muted">/ mo</span>
            )}
          </div>
          <p className="mt-2 min-h-[1.25rem] text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]">
            {isCustom
              ? "Tailored to volume & SLA"
              : isFree
                ? "Free forever · No card required"
                : annualTotal
                  ? `Billed $${annualTotal.toLocaleString("en-US")}/year (20% off)`
                  : "Billed monthly · Cancel anytime"}
          </p>
        </div>

        {/* Quota Highlight Pill */}
        <div className="mt-5 rounded-2xl bg-surface-page/80 px-4 py-3 dark:bg-white/[0.04]">
          <span className="block text-xs font-semibold tabular-nums text-text-primary sm:text-[13px]">
            {tier.quota}
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          {tier.external ? (
            <a
              href={tier.ctaHref}
              className={ctaClasses}
            >
              {ctaContent}
            </a>
          ) : (
            <Link href={tier.ctaHref} className={ctaClasses}>
              {ctaContent}
            </Link>
          )}
        </div>

        {/* Features List */}
        <ul className="mt-7 flex flex-1 flex-col gap-3">
          {tier.features.map((feature) => (
            <li
              key={feature.label}
              className="flex items-start gap-2.5 text-[14px] leading-[1.5] sm:text-[15px]"
            >
              {feature.locked ? (
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-black/[0.04] text-text-muted dark:bg-white/[0.04]"
                >
                  <Lock className="size-3" strokeWidth={2} />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                    tier.featured
                      ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-white"
                      : "bg-black/[0.06] text-text-heading dark:bg-white/[0.08] dark:text-text-primary"
                  }`}
                >
                  <Check className="size-3" strokeWidth={2.4} />
                </span>
              )}
              <span
                className={
                  feature.locked ? "text-text-muted" : "text-text-primary"
                }
              >
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </RevealCard>
  );
}

function ComparisonMatrix({ config }: { config: PricingTabConfig }) {
  return (
    <RevealCard as="section"
      aria-label={config.matrixTitle}
      className="mt-16 sm:mt-20"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
            Feature breakdown
          </span>
          <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.025em] text-text-heading sm:text-4xl">
            {config.matrixTitle}
          </h2>
        </div>
        <p className="max-w-md text-[15px] leading-[1.6] text-text-muted sm:text-base">
          {config.matrixSubtitle}
        </p>
      </div>

      <div className="surface-shadow overflow-hidden rounded-4xl bg-surface-card">
        <div
          data-lenis-prevent
          className="overflow-x-auto overscroll-x-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left">
            <caption className="sr-only">{config.matrixTitle}</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-6 text-xs font-medium uppercase tracking-[0.12em] text-text-muted sm:px-7"
                >
                  Capability
                </th>
                {config.tiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={[
                      "px-5 py-6 text-sm font-semibold tracking-[-0.015em] sm:px-6 sm:text-base",
                      tier.featured
                        ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated"
                        : "text-text-primary",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      {tier.featured && (
                        <span className="size-1.5 rounded-full bg-text-heading" />
                      )}
                      <span>{tier.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {config.matrixRows.map((row, rowIndex) => (
                <tr
                  key={row.feature}
                  className={
                    rowIndex % 2 === 1
                      ? "bg-black/[0.02] dark:bg-white/[0.02]"
                      : ""
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-5 text-sm font-medium text-text-primary sm:px-7"
                  >
                    {row.feature}
                  </th>
                  {row.values.map((val, colIndex) => {
                    const tier = config.tiers[colIndex];
                    const isFeatured = Boolean(tier?.featured);
                    return (
                      <td
                        key={`${row.feature}-${tier?.id ?? colIndex}`}
                        className={[
                          "px-5 py-5 text-sm tabular-nums sm:px-6",
                          isFeatured
                            ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated"
                            : "text-text-muted",
                        ].join(" ")}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <span
                              className="inline-flex size-6 items-center justify-center rounded-full bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-white"
                              aria-label="Included"
                            >
                              <Check className="size-3.5" strokeWidth={2.4} />
                            </span>
                          ) : (
                            <span
                              className="inline-flex size-6 items-center justify-center text-text-muted/60"
                              aria-label="Not included"
                            >
                              <Minus className="size-3.5" strokeWidth={2} />
                            </span>
                          )
                        ) : (
                          <span className={isFeatured ? "font-medium text-text-heading" : "text-text-primary"}>
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-text-muted md:hidden">
        Swipe horizontally to compare all tiers.
      </p>
    </RevealCard>
  );
}

function PricingFaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <RevealCard as="article"
      className={[
        "group relative overflow-hidden rounded-4xl transition-[background-color,box-shadow] duration-(--motion-interaction-duration)",
        isOpen
          ? "bg-surface-elevated surface-shadow"
          : "bg-surface-card hover:bg-surface-card-hover",
      ].join(" ")}
    >

      <h3 className="relative z-10">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`flex w-full items-center justify-between gap-5 rounded-4xl px-5 py-5 text-left transition-colors sm:px-7 sm:py-6 ${FOCUS_RING}`}
        >
          <span
            className={`text-[15px] font-semibold leading-[1.45] tracking-[-0.015em] transition-colors duration-(--motion-interaction-duration) sm:text-base ${
              isOpen
                ? "text-text-heading"
                : "text-text-primary group-hover:text-text-heading"
            }`}
          >
            {question}
          </span>

          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-(--motion-interaction-duration) ${
              isOpen
                ? "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-white"
                : "bg-black/[0.05] text-text-muted group-hover:bg-surface-elevated group-hover:text-text-heading dark:bg-white/[0.06] dark:group-hover:bg-surface-elevated"
            }`}
          >
            <Plus
              className={`size-4 transition-transform duration-(--motion-interaction-duration) ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
              strokeWidth={1.9}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-(--motion-interaction-duration) ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-6 pt-1 text-[15px] leading-[1.6] text-text-primary sm:px-7 sm:pb-7 sm:text-base">
            {answer}
          </div>
        </div>
      </div>
    </RevealCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Pricing Client Component                                              */
/* -------------------------------------------------------------------------- */
export default function PricingClient({ initialTab }: { initialTab: TabId }) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(
        getTabFromParam(new URLSearchParams(window.location.search).get("tab")),
      );
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectTab = (next: TabId) => {
    if (next === activeTab) return;
    setActiveTab(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", next);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % PRICING_TABS.length;
    else if (event.key === "ArrowLeft") {
      nextIndex = (index + PRICING_TABS.length - 1) % PRICING_TABS.length;
    } else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = PRICING_TABS.length - 1;
    else return;

    event.preventDefault();
    const target = PRICING_TABS[nextIndex];
    if (target) {
      selectTab(target.id);
      tabButtonRefs.current[nextIndex]?.focus();
    }
  };

  const currentTabConfig =
    PRICING_TABS.find((tab) => tab.id === activeTab) ?? PRICING_TABS[0];

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-clip bg-surface-page text-text-heading"
    >
      {/* Hero & Controls */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-32 sm:pt-40 lg:px-12 lg:pt-44">
        <StaggerReveal trigger="load"
          className="mx-auto max-w-3xl text-center"
        >
          <RevealEyebrow as="div" >
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              <span className="size-1.5 rounded-full bg-text-heading" />
              Pricing
            </span>
          </RevealEyebrow>

          <RevealHeading as="h1"
            className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] text-text-heading sm:text-6xl lg:text-[4.5rem]"
          >
            Simple pricing for every voice workflow.
          </RevealHeading>

          <RevealParagraph
            className="mx-auto mt-6 max-w-2xl text-base leading-[1.6] text-text-muted sm:text-lg lg:text-[1.1875rem]"
          >
            Start free in the Studio, scale with predictable tiers, or build on
            our voice infrastructure.
          </RevealParagraph>
        </StaggerReveal>

        {/* 3-Tab Switcher + Monthly / Annual Toggle */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 lg:mt-16 lg:flex-row">
          {/* 3-Tab Pill Switcher */}
          <div
            role="tablist"
            aria-label="Miralas pricing products"
            className="surface-shadow inline-grid w-full max-w-xl grid-cols-3 gap-1 rounded-full bg-surface-card p-1.5 lg:w-auto"
          >
            {PRICING_TABS.map((tab, index) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabButtonRefs.current[index] = el;
                  }}
                  id={`pricing-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`pricing-panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative isolate inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-(--motion-interaction-duration) sm:px-5 sm:text-sm ${FOCUS_RING} ${
                    isSelected
                      ? "text-white dark:text-[#050505]"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="pricing-active-tab"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: DURATION_UI, ease: EASE_OUT_EXPO }
                      }
                      className="absolute inset-0 -z-10 rounded-full bg-[#1d1d1f] dark:bg-white"
                    />
                  )}
                  <span className="truncate">{tab.label}</span>
                  {tab.previewBadge && (
                    <span
                      className={`hidden rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] sm:inline-flex ${
                        isSelected
                          ? "bg-surface-elevated text-white dark:bg-surface-elevated dark:text-text-heading"
                          : "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-text-primary"
                      }`}
                    >
                      Preview
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Billing Cycle Toggle */}
          <div
            role="group"
            aria-label="Billing cycle"
            className="surface-shadow inline-flex items-center gap-1 rounded-full bg-surface-card p-1.5"
          >
            {(["monthly", "annual"] as const).map((cycle) => {
              const isSelected = billingCycle === cycle;
              return (
                <button
                  key={cycle}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setBillingCycle(cycle)}
                  className={`relative isolate inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors duration-(--motion-interaction-duration) sm:text-sm ${FOCUS_RING} ${
                    isSelected
                      ? "text-text-heading"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="pricing-billing-pill"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: DURATION_UI, ease: EASE_OUT_EXPO }
                      }
                      className="absolute inset-0 -z-10 rounded-full bg-surface-page dark:bg-white/[0.09]"
                    />
                  )}
                  <span>{cycle === "monthly" ? "Monthly" : "Annual"}</span>
                  {cycle === "annual" && (
                    <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-[11px] font-medium text-text-heading dark:bg-surface-elevated dark:text-text-primary">
                      Save 20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Tab Pricing Grid + Comparison Matrix */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTabConfig.id}
            id={`pricing-panel-${currentTabConfig.id}`}
            role="tabpanel"
            aria-labelledby={`pricing-tab-${currentTabConfig.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: DURATION_UI, ease: EASE_OUT_EXPO }}
          >
            {currentTabConfig.sectionNote && (
              <div className="mb-6 flex flex-wrap items-center gap-3 rounded-[20px] bg-surface-card px-5 py-3.5 text-xs leading-[1.5] text-text-primary sm:text-[13px]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-text-heading dark:bg-surface-elevated dark:text-text-primary">
                  <span className="size-1.5 rounded-full bg-text-heading" />
                  Preview
                </span>
                <span className="text-text-muted">{currentTabConfig.sectionNote}</span>
              </div>
            )}

            <StaggerReveal trigger="load"
              className={`grid items-stretch ${currentTabConfig.gridClass}`}
            >
              {currentTabConfig.tiers.map((tier) => (
                <PricingCard
                  key={tier.id}
                  tier={tier}
                  cycle={billingCycle}
                  isPreviewTab={currentTabConfig.previewBadge}
                />
              ))}
            </StaggerReveal>

            <ComparisonMatrix config={currentTabConfig} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Borderless Pricing FAQ Strip */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
          <StaggerReveal
            className="flex flex-col lg:sticky lg:top-28 lg:self-start"
          >
            <RevealEyebrow as="div"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-card px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
            >
              <span className="size-1.5 rounded-full bg-text-heading" />
              Pricing · FAQ
            </RevealEyebrow>

            <RevealHeading
              className="mt-6 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
            >
              Questions about billing.
            </RevealHeading>

            <RevealParagraph
              className="mt-5 max-w-sm text-[15px] leading-[1.6] text-text-muted sm:text-base"
            >
              Straightforward answers on quotas, billing cycles, and private
              preview access.
            </RevealParagraph>
          </StaggerReveal>

          <StaggerReveal
            className="flex w-full flex-col gap-3"
          >
            {PRICING_FAQS.map((item, index) => (
              <PricingFaqAccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openFaqIndex === index}
                onToggle={() =>
                  setOpenFaqIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
        <RevealCard
          className={`${FEATURED_CARD_SURFACE} surface-shadow-lg flex flex-col justify-between gap-8 rounded-4xl p-8 sm:p-12 lg:flex-row lg:items-end`}
        >
          <div className="max-w-xl">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              Ready to build
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl">
              Start in Studio, scale on your terms.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-text-primary sm:text-base">
              Begin with 10,000 free monthly characters or talk with our
              engineering team about dedicated API and Voice Agent deployments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={VOICE_TECHNOLOGY.consoleUrl}
              className={`group inline-flex h-12 items-center gap-2.5 rounded-full bg-[#1d1d1f] px-6 text-sm font-semibold text-white transition-[transform,opacity] duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] dark:bg-white dark:text-[#050505] ${FOCUS_RING}`}
            >
              <span>Open Studio</span>
              <ArrowRight
                className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <Link
              href="/resources/contact"
              className={`inline-flex h-12 items-center gap-2 rounded-full bg-surface-page px-6 text-sm font-semibold text-text-heading transition-[transform,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:bg-black/[0.08] active:scale-[0.98] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] ${FOCUS_RING}`}
            >
              <span>Contact sales</span>
            </Link>
          </div>
        </RevealCard>
      </section>
    </main>
  );
}
