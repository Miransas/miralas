'use client';

import {  useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  DURATION_UI,
  EASE_OUT_EXPO,
  VIEWPORT_EARLY,
  VIEWPORT_ONCE,
  cardReveal,
  headingReveal,
  staggerContainer,
} from '@/lib/motion';

const sectionStagger = staggerContainer(0.06);

type Card = {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  modalTitle: string;
  body: string[];
  points: string[];
  ctaLabel: string;
  ctaHref: string;
};

const cards: Card[] = [
  {
    eyebrow: 'Uzbek Speech — In Development',
    title: 'A language worth the care.',
    summary: 'Research toward native Uzbek speech.',
    image: '/studio/blue.png',
    modalTitle: 'Uzbek Speech — In Development',
    body: [
      "We're working toward native Uzbek speech capabilities through dedicated research, curated data collection, and rigorous model evaluation.",
    ],
    points: [
      'Research and data collection',
      'Model evaluation before release',
      'Not available for production inference yet',
    ],
    ctaLabel: 'Follow development updates',
    ctaHref: '/changelog',
  },
  {
    eyebrow: 'Voice Cloning · In Development',
    title: 'Identity, with permission.',
    summary: 'A considered workflow for voice identity.',
    image: '/studio/green.png',
    modalTitle: 'A voice workflow built around consent.',
    body: [
      'Reference-based speech generation lets creators build reusable voice identities. Miralas is designing the product workflow around clear speaker authorization.',
    ],
    points: [
      'Use recordings you are authorized to use',
      'Voice Catalog infrastructure implemented',
      'Curated public voices coming soon',
    ],
    ctaLabel: 'Explore voice capabilities',
    ctaHref: '/product',
  },
  {
    eyebrow: 'Voice Agent · Research',
    title: 'Conversations, considered.',
    summary: 'A longer-term direction for interaction.',
    image: '/studio/red.png',
    modalTitle: 'Toward useful voice conversations.',
    body: [
      'Voice agents are an active development direction focused on natural turn-taking, workflow integration, and clean handoff to human teammates.',
    ],
    points: [
      'Workflow-aware dialogue exploration',
      'Human handoff as a core design goal',
      'Real-time latency validation in progress',
    ],
    ctaLabel: 'Explore product roadmap',
    ctaHref: '/product',
  },
  {
    eyebrow: 'Developers',
    title: 'Built with clear foundations.',
    summary: 'A Rust API and Python inference worker.',
    image: '/studio/silver.png',
    modalTitle: 'An API-oriented architecture.',
    body: [
      'The engineering baseline separates the high-throughput Rust API from dedicated Python model inference workers over gRPC.',
    ],
    points: [
      'Rust application and routing layer',
      'Python model inference over gRPC',
      'Public endpoints and SDKs in preparation',
    ],
    ctaLabel: 'Read documentation',
    ctaHref: '/docs',
  },
  {
    eyebrow: 'Responsible creation',
    title: 'Trust starts with clarity.',
    summary: 'Clear permissions and honest product status.',
    image: '/studio/gold.png',
    modalTitle: 'Know what you are using.',
    body: [
      'Use voice recordings with explicit permission and review generated speech before sharing. Our published policies outline data handling and usage terms transparently.',
    ],
    points: [
      'Explicit permission for reference audio',
      'Clear separation of research and production',
      'Published terms and privacy policies',
    ],
    ctaLabel: 'View privacy & security',
    ctaHref: '/privacy',
  },
];

function PlusIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Visual({ src, alt, pos = '50% 50%' }: { src: string; alt: string; pos?: string }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={`${alt} image could not be loaded`}
        className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#f3f3f4] to-[#e4e4e6] text-xs text-neutral-500 dark:from-white/[0.06] dark:to-white/[0.02] dark:text-neutral-400"
      >
        Image not found: {src}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 90vw, 440px"
      style={{ objectPosition: pos }}
      className="rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10"
      onError={() => setHasError(true)}
    />
  );
}

export default function WhyMiransas() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setActive(i);
  };

const close = () => {
    setActive(null);
    requestAnimationFrame(() => {
      lastTrigger.current?.focus();
    });
  };

  const stepModal = (dir: 1 | -1) => {
    setActive((prev) => {
      if (prev === null) return null;
      return (prev + dir + cards.length) % cards.length;
    });
  };

  // Reset modal scroll position when switching cards
  useEffect(() => {
    if (active !== null && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [active]);

  // Keyboard navigation + Lenis-safe background scroll lock
  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(null);
        requestAnimationFrame(() => {
          lastTrigger.current?.focus();
        });
      } else if (e.key === 'ArrowRight') {
        setActive((prev) => (prev === null ? null : (prev + 1) % cards.length));
      } else if (e.key === 'ArrowLeft') {
        setActive((prev) => (prev === null ? null : (prev - 1 + cards.length) % cards.length));
      }
    };

    document.addEventListener('keydown', onKey);

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const hadLenisStopped = html.classList.contains('lenis-stopped');

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.classList.add('lenis-stopped');

    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (!hadLenisStopped) {
        html.classList.remove('lenis-stopped');
      }
    };
  }, [active]);
  // Keyboard navigation + Lenis-safe background scroll lock
  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') stepModal(1);
      if (e.key === 'ArrowLeft') stepModal(-1);
    };

    document.addEventListener('keydown', onKey);

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const hadLenisStopped = html.classList.contains('lenis-stopped');

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.classList.add('lenis-stopped');

    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (!hadLenisStopped) {
        html.classList.remove('lenis-stopped');
      }
    };
  }, [active, close, stepModal]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: reduce ? 'auto' : 'smooth' });
  };

  const current = active !== null ? cards[active] : null;

  const modalNode = (
    <AnimatePresence>
      {current && active !== null && (
        <motion.div
          key="overlay"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          role="dialog"
          aria-modal="true"
          aria-label={current.modalTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-md md:items-center md:p-6"
        >
          <motion.div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: DURATION_UI, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] border border-black/[0.08] bg-white text-[#1d1d1f] shadow-2xl md:max-h-[86dvh] md:rounded-[32px] dark:border-white/[0.1] dark:bg-[#111112] dark:text-white"
          >
            {/* Sticky Modal Header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/[0.06] px-6 py-4 md:px-10 md:py-5 dark:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-black/[0.05] px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-white/[0.08] dark:text-neutral-300">
                  {current.eyebrow}
                </span>
                <span className="font-mono text-xs text-neutral-400 tabular-nums dark:text-neutral-500">
                  {String(active + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
                </span>
              </div>

              <button
                ref={closeRef}
                type="button"
                aria-label="Close modal"
                onClick={close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-[#1d1d1f] transition hover:bg-black/[0.12] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 dark:bg-white/[0.1] dark:text-white dark:hover:bg-white/[0.18] dark:focus-visible:outline-white"
              >
                <PlusIcon open />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div
              ref={modalBodyRef}
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              style={{ WebkitOverflowScrolling: 'touch' }}
              className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 py-6 md:px-10 md:py-9"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-10">
                {/* Left: Visual */}
                <div className="relative h-60 w-full md:col-span-5 md:h-[360px]">
                  <Visual src={current.image} alt={current.eyebrow} />
                </div>

                {/* Right: Copy & Key Points */}
                <div className="flex flex-col md:col-span-7">
                  <h3 className="text-2xl font-semibold leading-[1.12] tracking-tight md:text-4xl">
                    {current.modalTitle}
                  </h3>

                  <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-neutral-600 md:text-[17px] dark:text-neutral-300">
                    {current.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Key Highlights
                    </p>
                    <ul className="mt-3.5 space-y-3">
                      {current.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug text-neutral-800 dark:text-neutral-200">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-white"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Modal Footer with Navigation + CTA */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] bg-neutral-50/80 px-6 py-4 md:px-10 md:py-5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepModal(-1)}
                  aria-label="Previous item"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-black/10 px-4 text-sm font-medium text-neutral-700 transition hover:bg-black/[0.05] active:scale-[0.98] dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.08]"
                >
                  <span aria-hidden>←</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => stepModal(1)}
                  aria-label="Next item"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-black/10 px-4 text-sm font-medium text-neutral-700 transition hover:bg-black/[0.05] active:scale-[0.98] dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.08]"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span aria-hidden>→</span>
                </button>
              </div>

              <Link
                href={current.ctaHref}
                onClick={close}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#1d1d1f] px-5 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-[#050505] dark:hover:bg-neutral-200"
              >
                <span>{current.ctaLabel}</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="overflow-x-clip bg-[#EFEFEF] py-20 text-[#1d1d1f] dark:bg-[#050505] dark:text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex items-end justify-between gap-6"
        >
          <motion.h2
            variants={headingReveal}
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Why people choose
            <br />
            Miransas.
          </motion.h2>
          <motion.div variants={headingReveal} className="shrink-0 pb-2">
            <Link
              href="/product"
              className="group inline-flex items-center gap-1 text-base font-medium underline-offset-4 hover:underline"
            >
              <span>Explore products</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                ›
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal card strip */}
      <motion.div
        ref={scrollerRef}
        data-lenis-prevent-horizontal
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
        style={{ WebkitOverflowScrolling: 'touch' }}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-width:none] md:mt-16 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            variants={cardReveal}
            onClick={(e) => open(i, e.currentTarget)}
            className="group relative flex h-[560px] w-[82vw] max-w-[380px] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-8 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-black/15 dark:border-white/[0.08] dark:bg-[#161617] dark:hover:border-white/20"
          >
            <p className="text-[15px] font-semibold text-neutral-800 dark:text-neutral-200">
              {c.eyebrow}
            </p>
            <h3 className="mt-2 text-[28px] font-semibold leading-[1.1] tracking-tight">
              {c.title}
            </h3>
            <p className="mt-3 text-[17px] leading-snug text-neutral-600 dark:text-neutral-400">
              {c.summary}
            </p>

            {/* Visual area */}
            <div className="relative mt-auto h-[250px] w-full">
              <Visual src={c.image} alt={c.eyebrow} />
            </div>

            <button
              type="button"
              aria-label={`Learn more: ${c.eyebrow}`}
              onClick={(e) => {
                e.stopPropagation();
                open(i, e.currentTarget);
              }}
              className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8ed]/95 text-[#1d1d1f] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[#dcdce1] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 dark:focus-visible:outline-white"
            >
              <PlusIcon />
            </button>
          </motion.article>
        ))}
      </motion.div>

      {/* Previous / Next */}
      <div className="mx-auto mt-6 flex max-w-6xl justify-end gap-3 px-6">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? 'Previous' : 'Next'}
            onClick={() => scrollByCard(dir)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-[#1d1d1f] transition-[background-color,transform] duration-200 hover:bg-black/20 active:scale-95 dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d={dir === -1 ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>

      {mounted && createPortal(modalNode, document.body)}
    </section>
  );
}