"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  ArrowRight,
  HelpCircle,
  FileCode2
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const API_FAQS: FAQItem[] = [
  {
    id: 'what-is-api',
    question: 'What is the Miransas API?',
    answer: (
      <p>
        The Miransas API is a powerful REST and WebSocket interface that lets developers and companies integrate natural-sounding voice synthesis, real-time conversational agents, and voice cloning models directly into their software, websites, or mobile apps.
      </p>
    ),
  },
  {
    id: 'available-apis',
    question: 'Which API endpoints are available?',
    answer: (
      <p>
        We offer a comprehensive set of endpoints for text-to-speech, real-time streaming, voice cloning, voice design, language model integrations, and multi-agent orchestration.
      </p>
    ),
  },
  {
    id: 'what-can-i-build',
    question: 'What can I build with the API?',
    answer: (
      <p>
        You can build intelligent customer service bots (IVR), AI-powered voice assistants, audiobook generators, e-learning platforms, in-game NPC voiceovers, and automated content narration systems.
      </p>
    ),
  },
  {
    id: 'authentication',
    question: 'How does authentication work?',
    answer: (
      <p>
        All API requests require a secret <strong>API key (xi-api-key)</strong>, which you can generate in the Miransas Console. Pass this key securely in your request headers to authorize API calls.
      </p>
    ),
  },
  {
    id: 'usage-limits',
    question: 'What are the usage limits?',
    answer: (
      <p>
        Limits vary by subscription plan (Free, Pro, Scale, or Enterprise). Requests-per-minute (RPM) limits can be tailored to enterprise needs or increased with Burst Pricing.
      </p>
    ),
  },
  {
    id: 'sdks-provided',
    question: 'Do you provide SDKs?',
    answer: (
      <p>
        Yes. We provide official <strong>Python and TypeScript / JavaScript SDKs</strong> optimized for popular languages, so you can integrate the API into your projects in minutes.
      </p>
    ),
  },
 

 
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ApiSectionFAQ() {
  const [openId, setOpenId] = useState<string | null>('what-is-api');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-[#050505] text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-24">
        
     
        {/* ════ PART 2: API FREQUENTLY ASKED QUESTIONS (SSS) ════ */}
        <div className="max-w-3xl mx-auto space-y-10 pt-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
              <HelpCircle className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>API SSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Frequently asked <span className="  ">API questions</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
              Learn about authentication, SDKs, latency, and our security policies.
            </p>
          </div>

          {/* Akordeon Liste */}
          <div className="space-y-4">
            {API_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group rounded-[32px]  bg-white dark:bg-white/10 overflow-hidden shadow-sm transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-4 text-left focus:outline-none gap-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-bold text-zinc-950 dark:text-white leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="shrink-0 text-zinc-950 dark:text-white"
                    >
                      <ChevronDown className="size-6" strokeWidth={2.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease },
                          opacity: { duration: 0.2, ease },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-8 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
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

      </div>
    </section>
  );
}

export default ApiSectionFAQ;