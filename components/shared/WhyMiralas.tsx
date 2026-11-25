'use client';

import { StaggerReveal, RevealHeading, RevealCard } from "@/components/motion/primitives";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { modalMotion } from '@/lib/motion';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DURATION_UI, EASE_OUT_EXPO, staggerContainer } from '@/lib/motion';

const sectionStagger = staggerContainer(0.06);
const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2';

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
  featured?: boolean;
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
    featured: true,
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
      className={`transition-transform duration-(--motion-interaction-duration) ${open ? 'rotate-45' : ''}`}
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
        className="flex h-full w-full items-center justify-center rounded-2xl bg-surface-page text-xs text-text-muted dark:bg-white/[0.04]"
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
      className="rounded-2xl object-cover"
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
          transition={{ duration: reduce ? 0 : DURATION_UI, ease: EASE_OUT_EXPO }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-0 backdrop-blur-md md:items-center md:p-6"
        >
          <motion.div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            {...modalMotion}
            transition={{ duration: reduce ? 0 : DURATION_UI, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
            className="surface-shadow-lg flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] bg-surface-card text-text-heading md:max-h-[86dvh] md:rounded-4xl"
          >
            {/* Sticky Modal Header — borderless */}
            <div className="flex shrink-0 items-center justify-between gap-4 px-6 py-4 md:px-10 md:py-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-surface-page px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary dark:bg-white/[0.06] sm:text-[13px]">
                  {current.eyebrow}
                </span>
                <span className="font-mono text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]">
                  {String(active + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
                </span>
              </div>

              <button
                ref={closeRef}
                type="button"
                aria-label="Close modal"
                onClick={close}
                className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-text-heading transition hover:bg-black/[0.12] active:scale-[0.98] dark:bg-white/[0.08] dark:hover:bg-white/[0.15] ${FOCUS_RING}`}
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
              className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 py-6 md:px-10 md:py-8"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-10">
                {/* Left: Visual */}
                <div className="relative h-60 w-full md:col-span-5 md:h-[360px]">
                  <Visual src={current.image} alt={current.eyebrow} />
                </div>

                {/* Right: Copy & Key Points */}
                <div className="flex flex-col md:col-span-7">
                  <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                    {current.modalTitle}
                  </h3>

                  <div className="mt-5 space-y-4 text-[15px] leading-[1.6] text-text-primary sm:text-base">
                    {current.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <div className="bg-surface-elevated mt-7 rounded-4xl p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
                      Key highlights
                    </p>
                    <ul className="mt-3.5 space-y-3">
                      {current.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 text-[15px] leading-[1.6] text-text-primary sm:text-base"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-heading"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Modal Footer with Navigation + CTA — borderless tonal lift */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 bg-surface-page/60 px-6 py-4 dark:bg-white/[0.025] md:px-10 md:py-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepModal(-1)}
                  aria-label="Previous item"
                  className={`inline-flex h-10 items-center gap-1.5 rounded-full bg-surface-card px-4 text-sm font-medium text-text-primary transition hover:bg-surface-card-hover hover:text-text-heading active:scale-[0.98] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] ${FOCUS_RING}`}
                >
                  <span aria-hidden>←</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => stepModal(1)}
                  aria-label="Next item"
                  className={`inline-flex h-10 items-center gap-1.5 rounded-full bg-surface-card px-4 text-sm font-medium text-text-primary transition hover:bg-surface-card-hover hover:text-text-heading active:scale-[0.98] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] ${FOCUS_RING}`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span aria-hidden>→</span>
                </button>
              </div>

              <Link
                href={current.ctaHref}
                onClick={close}
                className={`group inline-flex h-10 items-center gap-2 rounded-full bg-text-heading px-5 text-sm font-semibold text-surface-page transition hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
              >
                <span>{current.ctaLabel}</span>
                <span
                  aria-hidden
                  className="transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
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
    <section className="overflow-x-clip bg-surface-page section-spacing text-text-heading">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <StaggerReveal
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <RevealHeading
            className="text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
          >
            Why people choose
            <br />
            Miransas.
          </RevealHeading>
          <RevealCard as="div"  className="shrink-0 pb-1">
            <Link
              href="/product"
              className={`group inline-flex items-center gap-1.5 rounded-full bg-surface-card px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-card-hover hover:text-text-heading ${FOCUS_RING}`}
            >
              <span>Explore products</span>
              <span
                className="transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                ›
              </span>
            </Link>
          </RevealCard>
        </StaggerReveal>
      </div>

      {/* Horizontal card strip */}
      <StaggerReveal
        ref={scrollerRef}
        data-lenis-prevent-horizontal
        style={{ WebkitOverflowScrolling: 'touch' }}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-width:none] md:mt-16 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <RevealCard as="article"
            key={c.title}
            onClick={(e) => open(i, e.currentTarget)}
            className={`group surface-shadow relative flex h-[560px] w-[82vw] max-w-[380px] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-4xl p-8 transition-[transform,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 ${
              c.featured
                ? 'bg-surface-card'
                : 'bg-surface-card hover:bg-surface-card-hover'
            }`}
          >

            <div className="relative z-10 flex h-full flex-col">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
                {c.eyebrow}
              </span>
              <h3 className="mt-3 text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-text-muted sm:text-base">
                {c.summary}
              </p>

              {/* Visual area */}
              <div className="relative mt-auto h-[250px] w-full">
                <Visual src={c.image} alt={c.eyebrow} />
              </div>
            </div>

            <button
              type="button"
              aria-label={`Learn more: ${c.eyebrow}`}
              onClick={(e) => {
                e.stopPropagation();
                open(i, e.currentTarget);
              }}
              className={`absolute bottom-5 right-5 z-20 flex size-10 items-center justify-center rounded-full bg-surface-page/90 text-text-heading backdrop-blur-sm transition-[transform,background-color] duration-(--motion-interaction-duration) hover:scale-105 hover:bg-surface-card active:scale-[0.98] dark:bg-white/[0.12] dark:hover:bg-surface-elevated ${FOCUS_RING}`}
            >
              <PlusIcon />
            </button>
          </RevealCard>
        ))}
      </StaggerReveal>

      {/* Previous / Next */}
      <div className="mx-auto mt-6 flex max-w-6xl justify-end gap-3 px-6">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? 'Previous' : 'Next'}
            onClick={() => scrollByCard(dir)}
            className={`flex size-10 items-center justify-center rounded-full bg-surface-card text-text-primary transition-[background-color,color,transform] duration-(--motion-interaction-duration) hover:bg-surface-card-hover hover:text-text-heading active:scale-[0.98] ${FOCUS_RING}`}
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
