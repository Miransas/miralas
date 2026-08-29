"use client";

import { useState, useEffect } from "react";
import { Mail, ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";

const STEPS = [
  {
    title: "Connect",
    body: "Link your existing phone line, WhatsApp Business, or embed on your website. Works with any VoIP provider — no hardware needed.",
    icon: "wave",
  },
  {
    title: "Train",
    body: "Upload your menu, pricing, policies, and FAQs. The agent learns your business in seconds and speaks with your brand voice.",
    icon: "layers",
  },
  {
    title: "Go Live",
    body: "Answer calls 24/7. Take orders, book tables, handle complaints, and transfer to humans only when needed.",
    icon: "live",
  },
];

const FAQS = [
  {
    q: "How does the voice agent work for restaurants and cafés?",
    a: "Your agent answers incoming calls, takes reservations, confirms opening hours, and handles menu inquiries. It can process takeaway orders by speaking the order back for confirmation, then push the details directly to your POS or kitchen printer via webhook. During rush hours, it eliminates missed calls entirely.",
  },
  {
    q: "Can it integrate with my existing phone system?",
    a: "Yes. Forward your existing business number to our SIP trunk, or use the web widget for browser calls. We support Twilio, Vonage, and most VoIP providers. Setup takes under 2 minutes — just update your forwarding rules.",
  },
  {
    q: "How many languages does it speak?",
    a: "32 languages with native accent accuracy, including Turkish, English, Spanish, German, French, and Arabic. The agent auto-detects the caller's language on the first sentence and switches instantly. You can also set a default language per phone line.",
  },
  {
    q: "What happens when the agent can't answer?",
    a: "The agent recognizes its own limits. If a caller asks something outside its knowledge base, or explicitly requests a human, it smoothly transfers the call to your team with a full transcript and context summary. You set the escalation rules — immediate, after 2 attempts, or never.",
  },
  {
    q: "Is customer call data secure and private?",
    a: "All calls are encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II compliant and GDPR ready. Call recordings and transcripts are stored in your region of choice and auto-deleted based on your retention policy. We never use your customer conversations to train models.",
  },
  {
    q: "What is the pricing for small businesses?",
    a: "Pay-as-you-go per minute of conversation. No monthly subscription, no setup fees. A typical café spends less than $40/month for full call coverage. Enterprise plans with dedicated infrastructure, custom voices, and SLA guarantees are available for chains and franchises.",
  },
];

function WaveIcon() {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {[0.6, 0.8, 0.4, 0.7, 0.5].map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-indigo-400 animate-[sound-wave_1.2s_ease-in-out_infinite]"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/30" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </div>
  );
}

const ICONS = [WaveIcon, LayersIcon, LiveIcon];

export function VoiceHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setActiveStep((s) => (s + 1) % 3), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-28 bg-background">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">Voice Agent</p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">How it works</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Your AI phone agent goes live in minutes. No code, no hardware, no headaches.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        {STEPS.map((step, i) => {
          const Icon = ICONS[i];
          const isActive = activeStep === i;
          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(i)}
              className={cn(
                "relative rounded-2xl border p-6 md:p-8 text-left transition-all duration-300 hover:border-border/80",
                isActive
                  ? "border-indigo-500/50 bg-indigo-500/[0.04]"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-foreground shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {i + 1}
                </div>
                <Icon />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </button>
          );
        })}
      </div>

      {/* Live Badge */}
      <div className="mb-20 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-muted-foreground">
            Currently handling calls for <span className="text-foreground">1,240+</span> businesses
          </span>
        </div>
      </div>

      {/* FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">FAQ</p>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Everything you need to know
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            Can't find what you're looking for? Our team is here to help you get your voice agent running in under 10 minutes.
          </p>
          <a
            href="mailto:miralas@miransas.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
          >
            <Mail className="size-3.5" strokeWidth={1.5} />
            Contact Support
          </a>
        </div>

        <div className="lg:col-span-8">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-normal text-foreground/80 transition-colors group-hover:text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS for sound wave animation */}
      <style jsx>{`
        @keyframes sound-wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}