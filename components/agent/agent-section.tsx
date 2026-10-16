"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Square, 
  Activity, 
  Bot, 
  Briefcase, 
  Coffee, 
  Database, 
  ChevronDown, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const AGENT_FAQS: FAQItem[] = [
  {
    id: 'what-is-agent',
    question: 'What exactly is a Miransas AI agent?',
    answer: (
      <p>
        A Miransas AI agent is more than a passive system that transcribes or reads text. It is an autonomous virtual assistant that <strong>understands what people say, grasps context, connects to your databases to take action</strong>, and responds with natural-sounding speech.
      </p>
    ),
  },
  {
    id: 'daily-and-business',
    question: 'How can agents be used in everyday life and business?',
    answer: (
      <div className="space-y-2">
        <p>Our agents help across two key areas:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Business & Office:</strong> 24/7 customer support, appointment scheduling, meeting summaries, CRM data lookup, or outbound sales calls.</li>
          <li><strong>Everyday Life:</strong> Smart home management, language-learning practice, or in-car voice assistance.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'backend-integration',
    question: 'Can I connect an agent to my company systems (backend)?',
    answer: (
      <p>
        Absolutely. Connect an agent directly to your existing ERP, CRM (Salesforce, HubSpot, and more), or custom backend systems using webhooks, REST APIs, and WebSockets. During a call, the agent can retrieve a customer's order status from your database and share it verbally in seconds.
      </p>
    ),
  },
  {
    id: 'voice-customization',
    question: "Can I customize an agent's voice and personality (prompt)?",
    answer: (
      <p>
        Yes. In the Miransas Console, you can choose an agent's voice (including one you've cloned), speaking speed, emotional tone, and, most importantly, its <strong>system prompt</strong>. Configure it as a professional banking assistant or a cheerful gaming companion.
      </p>
    ),
  },
  {
    id: 'latency-live',
    question: 'What is the latency during live calls?',
    answer: (
      <p>
        Natural turn-taking is essential for real-time conversations. Thanks to our edge server architecture and optimized end-to-end models, agents typically begin responding within <strong>400–600 milliseconds</strong> after a user finishes speaking—almost as quickly as a human conversation.
      </p>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AgentSectionAndFAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('what-is-agent');
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');

  const handleDemoToggle = () => {
    if (isDemoActive) {
      setIsDemoActive(false);
      setDemoState('idle');
    } else {
      setIsDemoActive(true);
      setDemoState('connecting');
      setTimeout(() => setDemoState('listening'), 1500);
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ════ PART 1: AGENT HERO & LIVE DEMO ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: copy and use cases */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
                <Bot className="size-3.5" />
                <span>Miransas Agents</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
                More than a voice, <br />
                <span className="text-zinc-400 dark:text-zinc-500 font-serif ">your operational intelligence.</span>
              </h2>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-lg">
                Build autonomous AI agents that talk with your customers, understand what they say, retrieve data from your CRM, and deliver solutions in seconds.
              </p>
            </div>

            {/* Mini Use Case Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-8 rounded-[32px] bg-white dark:bg-[#141210] shadow-sm">
                <Briefcase className="size-6 text-zinc-950 dark:text-white mb-4" />
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">Business & Office</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  24/7 customer support, automated appointment scheduling, and intelligent phone sales.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-white dark:bg-[#141210] shadow-sm">
                <Coffee className="size-6 text-zinc-950 dark:text-white mb-4" />
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">Everyday Life</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Smart home assistants, personal language coaches, and interactive in-car guides.
                </p>
              </div>
            </div>
          </div>

          {/* Right: live demo interface */}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto">
            <div className="relative rounded-[40px] p-3 bg-white dark:bg-[#141210] shadow-sm">
              
              {/* Device screen */}
              <div className="relative rounded-[32px] bg-[#F2F2F2] dark:bg-zinc-900 overflow-hidden aspect-[4/5] flex flex-col">
                
                {/* Top bar */}
                <div className="px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                      {isDemoActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isDemoActive ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}></span>
                    </div>
                    <span className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                      {isDemoActive ? 'Live Backend' : 'Standby'}
                    </span>
                  </div>
                  <Database className="size-4 text-zinc-400" />
                </div>

                {/* Visualizer and status */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                  <div className="relative flex items-center justify-center">
                    <AnimatePresence>
                      {demoState === 'listening' && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute size-32 rounded-full bg-indigo-500/20"
                        />
                      )}
                    </AnimatePresence>
                    
                    <div className={`size-24 rounded-full flex items-center justify-center z-10 transition-colors duration-500 shadow-sm ${
                      demoState === 'idle' ? 'bg-white dark:bg-[#141210]' : 
                      demoState === 'connecting' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                      'bg-white dark:bg-[#141210] text-zinc-950 dark:text-white'
                    }`}>
                      {demoState === 'idle' ? <Bot className="size-10 text-zinc-400" /> :
                       demoState === 'connecting' ? <Activity className="size-10 text-amber-500 animate-pulse" /> :
                       <Activity className="size-10 animate-bounce" />}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                      {demoState === 'idle' ? 'Sales Assistant' :
                       demoState === 'connecting' ? 'Connecting to systems...' :
                       'Sizi Dinliyor...'}
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-[200px] mx-auto">
                      {demoState === 'idle' ? 'Click the microphone and ask about stock availability.' :
                       demoState === 'listening' ? '"Hello, my order number is 1402. Where is my package?"' : ''}
                    </p>
                  </div>
                </div>

                {/* Control button */}
                <div className="p-6 pt-0 flex justify-center">
                  <button
                    onClick={handleDemoToggle}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                      isDemoActive 
                        ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20' 
                        : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 shadow-sm'
                    }`}
                  >
                    {isDemoActive ? (
                      <>
                        <Square className="size-4 fill-current" />
                        <span>End Call</span>
                      </>
                    ) : (
                      <>
                        <Mic className="size-4" />
                        <span>Start Live Demo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dekoratif Badge */}
            <div className="absolute -right-4 top-12 bg-white dark:bg-[#141210] shadow-sm rounded-2xl p-4 flex items-center gap-3 animate-float pointer-events-none">
              <div className="size-10 rounded-xl bg-[#F2F2F2] dark:bg-white/5 flex items-center justify-center">
                <Sparkles className="size-5 text-zinc-950 dark:text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Latency</p>
                <p className="text-xs font-extrabold text-zinc-950 dark:text-white">~450ms</p>
              </div>
            </div>

          </div>
        </div>

        {/* ════ PART 2: AGENT FAQ (SSS) ════ */}
        <div className="max-w-3xl mx-auto space-y-10 pt-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
              <HelpCircle className="size-3.5" />
              <span>Agent SSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              What you need to know about <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">AI agents</span>
            </h2>
          </div>

          <div className="space-y-4">
            {AGENT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden shadow-sm transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none gap-6"
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

          <div className="pt-8 flex justify-center">
            <a
              href="/agents"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-[#141210] text-sm font-bold text-zinc-950 dark:text-white hover:scale-105 transition-transform shadow-sm"
            >
              <span>Explore the Agent Architecture</span>
              <ArrowRight className="size-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}