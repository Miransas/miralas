'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    id: 'agents-cost',
    question: 'How much do MiransasAgents plans cost per minute, and what do they include?',
    answer: (
      <p>
        Every plan includes a set number of <strong>free call minutes</strong> each month. Once those minutes are used, additional usage is billed at a per-minute overage rate based on your plan. Plans include high-quality voice synthesis, WebRTC live streaming, built-in LLM integration, and real-time interruption handling.
      </p>
    ),
  },
  {
    id: 'agent-limits',
    question: 'How many voice agents can I create?',
    answer: (
      <p>
        There is no strict limit on the number of agents you can create. The Free plan lets you create <strong>one</strong> test agent, while Pro and Business plans let you define as many agents as you need for different scenarios and languages. Limits are based on concurrent call capacity, not the number of agents.
      </p>
    ),
  },
  {
    id: 'llm-costs',
    question: 'Is there an extra charge for the LLM used by a voice agent?',
    answer: (
      <p>
        No. Miransas-optimized built-in language models are included in the per-minute cost of our standard plans. If you prefer, our <strong>BYOK (Bring Your Own Key)</strong> architecture lets you connect your OpenAI, Anthropic, or Groq API keys and pay your model provider directly.
      </p>
    ),
  },
  {
    id: 'telephony-charges',
    question: 'Are there extra charges for telephony integrations (SIP / Twilio / PBX)?',
    answer: (
      <p>
        Browser and mobile app calls over WebRTC are included in your plan. Incoming and outgoing calls over phone lines (PSTN / Twilio / SIP trunk) incur a small per-minute carrier fee, or you can connect your own SIP infrastructure with no commission.
      </p>
    ),
  },
  {
    id: 'burst-pricing',
    question: 'What is Burst Pricing?',
    answer: (
      <p>
        Burst Pricing is an intelligent scaling mechanism that keeps your system running during unexpected call surges, such as campaigns or crises. When you exceed your concurrent call limit, our servers automatically add capacity and process the extra traffic without interruption. You pay only for the additional call time you use at a flexible rate.
      </p>
    ),
  },
  {
    id: 'plan-changes',
    question: 'What happens if I upgrade, downgrade, or cancel my subscription?',
    answer: (
      <p>
        When you upgrade, your unused balance for the current month is prorated as a discount on your new plan, and you get immediate access to its features. If you cancel or downgrade, you can keep using your current plan's benefits until the end of your billing period.
      </p>
    ),
  },
  {
    id: 'cancellation-terms',
    question: 'When and how can I cancel my subscription?',
    answer: (
      <p>
        There are no commitments or hidden terms. You can cancel your subscription at any time with one click from the <strong>Subscription Management</strong> tab in your dashboard. You will not be charged for any future billing periods after cancellation.
      </p>
    ),
  },
  {
    id: 'credit-tracking',
    question: 'How can I track my remaining minutes or character credits?',
    answer: (
      <p>
        You can monitor your usage statistics, remaining minutes, and live charts in the Miransas Console. You can also receive email and webhook alerts when your minutes reach 80% and 95% of usage.
      </p>
    ),
  },
  {
    id: 'payment-methods',
    question: 'Which payment methods do you accept?',
    answer: (
      <p>
        We accept all internationally recognized credit and debit cards (Visa, Mastercard, and American Express) securely through Stripe. Companies on Enterprise and Ultra plans can also pay by <strong>bank transfer and invoiced billing</strong>.
      </p>
    ),
  },
];

export function PricingFAQ() {
  const [openId, setOpenId] = useState<string | null>('agents-cost');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 bg-background dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        
        {/* ── SECTION HEADING ── */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* ── ACCORDION LIST ── */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-8 py-4 text-left focus:outline-none gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="md:text-[17px] text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="shrink-0 text-zinc-900 dark:text-white"
                  >
                    <ChevronDown className="size-6" strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-8 pb-8 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PricingFAQ;