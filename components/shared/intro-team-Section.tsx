'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import OrbitShader from '../shaders/orbit-shader';
import {
  VIEWPORT_ONCE,
  cardReveal,
  eyebrowReveal,
  headingReveal,
  paragraphReveal,
  staggerContainer,
} from '@/lib/motion';

const containerVariants = staggerContainer(0.06, 0.04);
const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2';

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

function SignalMark({ active }: { active: boolean }) {
  return (
    <span className="relative flex size-2.5 shrink-0 items-center justify-center" aria-hidden="true">
      {active && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[#7c3aed]/40"
          animate={{ scale: [1, 1.9, 1.9], opacity: [0.65, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative size-1.5 rounded-full bg-[#7c3aed]" />
    </span>
  );
}

function CapabilityRow({
  item,
}: {
  item: (typeof capabilities)[number];
}) {
  return (
    <motion.div
      variants={cardReveal}
      className="group relative grid grid-cols-[38px_minmax(0,1fr)_auto] items-start gap-3 overflow-hidden rounded-[22px] bg-surface-card p-5 transition-colors duration-300 hover:bg-surface-card-hover md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-4"
    >
      <div
        aria-hidden="true"
        className="surface-hover-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative z-10 pt-0.5 font-mono text-xs tabular-nums tracking-[0.12em] text-text-muted">
        {item.number}
      </span>
      <div className="relative z-10 min-w-0">
        <h3 className="text-base font-semibold leading-[1.25] tracking-[-0.02em] text-text-heading sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 max-w-[440px] text-[15px] leading-[1.6] text-text-muted">
          {item.description}
        </p>
      </div>
      <span className="relative z-10 mt-0.5 hidden rounded-full bg-surface-page px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted dark:bg-white/[0.06] sm:inline-flex">
        {item.tag}
      </span>
    </motion.div>
  );
}

export default function IntroTeammateSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.08 });
  const animateAmbient = isInView && !shouldReduceMotion;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-x-clip bg-surface-page px-5 py-20 text-text-heading sm:px-8 sm:py-24 lg:min-h-[900px] lg:px-12 lg:py-28"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)] lg:gap-[clamp(56px,8vw,112px)]"
      >
        {/* Left: featured agent preview card — Strategic Violet Gradient */}
        <motion.div variants={cardReveal} className="mx-auto w-full max-w-[400px] lg:mx-0">
          <div className="surface-accent surface-shadow-lg relative overflow-hidden rounded-[28px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                  Miransas / Voice System
                </p>
                <p className="mt-1 text-xs font-semibold text-text-primary sm:text-[13px]">
                  Agent preview
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed]/12 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7c3aed] dark:bg-[#7c3aed]/20 dark:text-[#D1D1D1]">
                <SignalMark active={animateAmbient} />
                System preview
              </div>
            </div>

            {/* Shader stage */}
            <div className="relative my-5 h-[250px] overflow-hidden rounded-[22px] bg-surface-page/80 dark:bg-[#050505]/80 sm:h-[276px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_64%)]"
              />
              <div
                className="relative z-10 flex h-full w-full items-center justify-center [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:!max-w-full"
                aria-label="Abstract animated voice agent visualization"
              >
                <OrbitShader pauseOffscreen maxDpr={1.5} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-page to-transparent dark:from-[#050505]" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] tabular-nums tracking-[0.12em] text-text-muted">
                <span>VOICE INTERFACE</span>
                <span>01 / 04</span>
              </div>
            </div>

            <div className="rounded-[22px] bg-surface-page/75 p-4 dark:bg-white/[0.03] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em] text-text-heading">
                    Miransas Voice Agent
                  </p>
                  <p className="mt-1 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                    A voice-first teammate for your workflows
                  </p>
                </div>
                <span className="rounded-full bg-surface-card px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-text-muted dark:bg-white/[0.06]">
                  PREVIEW
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {[
                  ['INTERACTION', 'Voice-first'],
                  ['CONTROL', 'Your workflows'],
                  ['ROUTING', 'Configurable'],
                  ['HANDOFF', 'Human-ready'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-surface-card px-3 py-2.5 dark:bg-[#000103]/80"
                  >
                    <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted">
                      {label}
                    </p>
                    <p className="mt-1 text-xs font-medium text-text-primary sm:text-[13px]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-xs tracking-[0.12em] text-text-muted">
            AN EXAMPLE OF A MIRANSAS VOICE EXPERIENCE
          </p>
        </motion.div>

        {/* Right: story and capabilities */}
        <div className="min-w-0">
          <motion.div
            variants={eyebrowReveal}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
          >
            <span className="size-1.5 rounded-full bg-[#7c3aed]" />
            Meet your AI teammate
          </motion.div>

          <motion.h2
            variants={headingReveal}
            className="max-w-[720px] text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
          >
            A better conversation starts with a{' '}
            <span className="text-text-muted">better voice.</span>
          </motion.h2>

          <motion.p
            variants={paragraphReveal}
            className="mt-6 max-w-[590px] text-[15px] leading-[1.6] text-text-muted sm:text-base"
          >
            Bring natural voice, intelligent workflows and human handoff together.
            Build a voice agent around the way your business works — with the
            flexibility to shape each interaction.
          </motion.p>

          <motion.div variants={containerVariants} className="mt-9 flex flex-col gap-3">
            {capabilities.map((item) => (
              <CapabilityRow key={item.number} item={item} />
            ))}
          </motion.div>

          <motion.div variants={paragraphReveal} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/product"
              className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-text-heading px-6 py-3 text-sm font-semibold text-surface-page transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
            >
              Explore products
              <span
                className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <span className="text-xs leading-[1.45] text-text-muted sm:text-[13px]">
              Designed around the way your team works.
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
