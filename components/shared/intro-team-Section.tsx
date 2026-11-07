'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import OrbitShader from '../shaders/orbit-shader';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const staticContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

const staticItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

const capabilities = [
  {
    number: '01',
    title: 'Natural voice conversations',
    description: 'Clear, expressive speech designed to make every interaction feel more human.',
    tag: 'VOICE',
  },
  {
    number: '02',
    title: 'Workflow-aware responses',
    description: 'Shape how the agent greets callers, gathers context and responds to requests.',
    tag: 'WORKFLOWS',
  },
  {
    number: '03',
    title: 'Human handoff',
    description: 'Keep a path open for a teammate to step in when a conversation needs them.',
    tag: 'CONTROL',
  },
  {
    number: '04',
    title: 'Always-on availability',
    description: 'Create voice experiences that are available beyond regular business hours.',
    tag: 'AVAILABILITY',
  },
];

function SignalMark({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center" aria-hidden="true">
      {!reducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-500/35"
          animate={{ scale: [1, 1.9, 1.9], opacity: [0.65, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

function CapabilityRow({
  item,
  reducedMotion,
}: {
  item: (typeof capabilities)[number];
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      variants={reducedMotion ? staticItemVariants : itemVariants}
      className="group grid grid-cols-[38px_minmax(0,1fr)_auto] items-start gap-3 border-b border-black/[0.07] py-4 last:border-b-0 dark:border-white/[0.09] md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-4 md:py-[18px]"
    >
      <span className="pt-0.5 font-mono text-[11px] tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
        {item.number}
      </span>
      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-[#171719] dark:text-white md:text-[15px]">
          {item.title}
        </h3>
        <p className="mt-1.5 max-w-[440px] text-[12px] leading-[1.65] text-neutral-600 dark:text-neutral-400 md:text-[13px]">
          {item.description}
        </p>
      </div>
      <span className="mt-0.5 hidden rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-neutral-500 dark:border-white/[0.1] dark:text-neutral-500 sm:inline-flex">
        {item.tag}
      </span>
    </motion.div>
  );
}

export default function IntroTeammateSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative isolate overflow-hidden bg-[#EFEFEF] px-5 py-20 text-[#171719] transition-colors duration-500 selection:bg-[#171719] selection:text-white dark:bg-[#050505] dark:text-white dark:selection:bg-white dark:selection:text-black sm:px-8 sm:py-24 lg:min-h-[900px] lg:px-12 lg:py-28">
      {/* Very soft ambient light; intentionally restrained in both themes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[440px] w-[440px] rounded-full bg-white/70 blur-[120px] dark:bg-white/[0.035]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-[-180px] h-[520px] w-[520px] rounded-full bg-black/[0.035] blur-[140px] dark:bg-white/[0.025]"
      />

      <motion.div
        variants={shouldReduceMotion ? staticContainerVariants : containerVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)] lg:gap-[clamp(56px,8vw,112px)]"
      >
        {/* Left: agent preview card */}
        <motion.div variants={shouldReduceMotion ? staticItemVariants : itemVariants} className="mx-auto w-full max-w-[390px] lg:mx-0">
          <div className="relative overflow-hidden rounded-[30px] border border-black/[0.08] bg-white/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-[#0D0D0F] dark:shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:rounded-[34px] sm:p-5">
            {/* Fine top highlight */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/20" />

            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <p className="font-mono text-[9px] font-medium tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
                  MIRANSAS / VOICE SYSTEM
                </p>
                <p className="mt-1 text-[11px] font-semibold tracking-[0.03em] text-neutral-800 dark:text-neutral-200">
                  Agent preview
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[10px] font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.07] dark:text-emerald-400">
                <SignalMark reducedMotion={shouldReduceMotion} />
                SYSTEM PREVIEW
              </div>
            </div>

            {/* Shader stage: fixed dimensions prevent a canvas with no measurable box. */}
            <div className="relative my-4 h-[250px] overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#F5F5F4] dark:border-white/[0.07] dark:bg-[#080809] sm:my-5 sm:h-[276px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.035),transparent_64%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.055),transparent_64%)]"
              />
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.07] dark:border-white/[0.08]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neutral-500/60 dark:bg-white/60" />
                </motion.div>
              )}
              <div
                className="relative z-10 flex h-full w-full items-center justify-center [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:!max-w-full"
                aria-label="Abstract animated voice agent visualization"
              >
                <OrbitShader />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5F5F4] to-transparent dark:from-[#080809]" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] tracking-[0.16em] text-neutral-500 dark:text-neutral-500">
                <span>VOICE INTERFACE</span>
                <span>01 / 04</span>
              </div>
            </div>

            <div className="rounded-[22px] border border-black/[0.07] bg-[#F7F7F6] p-4 dark:border-white/[0.08] dark:bg-white/[0.025] sm:p-[18px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[16px] font-semibold tracking-[-0.035em] text-[#171719] dark:text-white">
                    Miransas Voice Agent
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                    A voice-first teammate for your workflows
                  </p>
                </div>
                <span className="rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-neutral-500 dark:border-white/[0.1] dark:text-neutral-500">
                  PREVIEW
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ['INTERACTION', 'Voice-first'],
                  ['CONTROL', 'Your workflows'],
                  ['ROUTING', 'Configurable'],
                  ['HANDOFF', 'Human-ready'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-black/[0.055] bg-white/70 px-3 py-2.5 dark:border-white/[0.055] dark:bg-black/15"
                  >
                    <p className="font-mono text-[8px] tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
                      {label}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[9px] tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
            AN EXAMPLE OF A MIRANSAS VOICE EXPERIENCE
          </p>
        </motion.div>

        {/* Right: story and capabilities */}
        <div className="min-w-0">
          <motion.div variants={shouldReduceMotion ? staticItemVariants : itemVariants} className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.09] bg-white/55 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-neutral-600 backdrop-blur dark:border-white/[0.1] dark:bg-white/[0.035] dark:text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 dark:bg-white" />
            MEET YOUR AI TEAMMATE
          </motion.div>

          <motion.h2
            variants={shouldReduceMotion ? staticItemVariants : itemVariants}
            className="max-w-[720px] text-[clamp(38px,5.2vw,68px)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#171719] dark:text-white"
          >
            A better conversation starts with a{' '}
            <span className="text-neutral-400 dark:text-neutral-500">better voice.</span>
          </motion.h2>

          <motion.p
            variants={shouldReduceMotion ? staticItemVariants : itemVariants}
            className="mt-6 max-w-[590px] text-[14px] leading-[1.85] text-neutral-600 dark:text-[#929297] md:text-[15px]"
          >
            Bring natural voice, intelligent workflows and human handoff together.
            Build a voice agent around the way your business works — with the
            flexibility to shape each interaction.
          </motion.p>

          <motion.div variants={shouldReduceMotion ? staticContainerVariants : containerVariants} className="mt-9 border-t border-black/[0.08] dark:border-white/[0.1]">
            {capabilities.map((item) => (
              <CapabilityRow key={item.number} item={item} reducedMotion={shouldReduceMotion} />
            ))}
          </motion.div>

          <motion.div variants={shouldReduceMotion ? staticItemVariants : itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/studio"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#171719] px-6 py-3 text-[12px] font-semibold tracking-[0.02em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-[#111113] dark:hover:bg-neutral-200"
            >
              Explore the studio
              <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-500">
              Designed around the way your team works.
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
