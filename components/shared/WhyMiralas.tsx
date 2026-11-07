'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Resimleri public/why/ altına koyunca true yap.
const SHOW_IMAGES = false;

type Card = {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  modalTitle: string;
  body: string[];
  points: string[];
};

// Metinler taslak. Rakam/iddia yazmadan önce ürünün gerçeğiyle doğrula.
const cards: Card[] = [
  {
    eyebrow: 'Native Uzbek',
    title: 'Voices that sound like home.',
    summary: 'Natural Uzbek speech, built for creators.',
    image: '/studio/blue.png',
    modalTitle: 'Text-to-speech, in real Uzbek.',
    body: [
      'Most tools treat Uzbek as an afterthought. Miralas is trained for it from the start, so names, numbers and everyday phrasing sound the way people actually speak.',
    ],
    points: [
      'Natural pronunciation and pacing',
      'Built for streamers, editors and students',
      'Paste text, get audio',
    ],
  },
  {
    eyebrow: 'Voice Cloning',
    title: 'Your voice, on demand.',
    summary: 'Create a voice profile and reuse it anywhere.',
    image: '/studio/green.png',
    modalTitle: 'Clone once. Use everywhere.',
    body: [
      'Create voice profiles and generate as much speech as your plan allows. Voices are created with the owner’s consent.',
    ],
    points: [
      'Voice profiles included on every plan',
      'Consent-based, traceable usage',
      'Licensed voices, paid directly to the voice owners',
    ],
  },
  {
    eyebrow: 'Voice Agent',
    title: 'Answers every call.',
    summary: 'A self-hosted voice agent for your business.',
    image: '/studio/red.png',
    modalTitle: 'A teammate that never clocks out.',
    body: [
      'The Miralas voice agent greets callers, follows your workflow and hands off cleanly. It runs on your own infrastructure, so your call data stays yours.',
    ],
    points: [
      'Self-hosted backend',
      'Your workflows, your rules',
      'Built to work alongside your team',
    ],
  },
  {
    eyebrow: 'Developers',
    title: 'Built for builders.',
    summary: 'One API for speech, voices and bots.',
    image: '/studio/silver.png',
    modalTitle: 'A clean API, clear limits.',
    body: [
      'Use the same engine from the console, from Telegram bots or from your own app. Every client gets its own token, its own scope and its own limits.',
    ],
    points: [
      'Per-token limits and scopes',
      'Usage-based developer pricing',
      'Documentation at /docs',
    ],
  },
  {
    eyebrow: 'Security',
    title: 'Private by design.',
    summary: 'Premium means trustworthy first.',
    image: '/studio/gold.png',
    modalTitle: 'Security is part of the product.',
    body: [
      'We store only what we need, we log text length rather than your text, and we keep misuse traceable so legitimate users are protected.',
    ],
    points: [
      'No text content stored from your generations',
      'Rate limits and abuse protection',
      'Terms and privacy reviewed by a lawyer',
    ],
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
     if (!SHOW_IMAGES) {
       return (
         <div aria-hidden className="h-full w-full rounded-2xl bg-gradient-to-br from-[#f3f3f4] to-[#e4e4e6] dark:from-white/[0.06] dark:to-white/[0.02]" />
       );
     }
     return (
       <Image
         src={src}
         alt={alt}
         fill
         sizes="(max-width: 768px) 82vw, 380px"
         style={{ objectPosition: pos }}
         className="rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10"
       />
     );
   }

export default function WhyMiralas() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setActive(i);
  };

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  // ESC, scroll kilidi, odak
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: reduce ? 'auto' : 'smooth' });
  };

  const current = active !== null ? cards[active] : null;

  return (
    <section className="bg-[#ededed] py-20 text-[#1d1d1f] transition-colors dark:bg-[#0a0a0a] dark:text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Başlık */}
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Why people choose
            <br />
            Miralas.
          </h2>
          <Link
            href="/product"
            className="shrink-0 pb-2 text-base font-medium underline-offset-4 hover:underline"
          >
            Explore products ›
          </Link>
        </div>
      </div>

      {/* Kartlar */}
      <div
        ref={scrollerRef}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] md:mt-16 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
            onClick={(e) => open(i, e.currentTarget)}
            className="group relative flex h-[560px] w-[82vw] max-w-[380px] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-[28px] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:bg-[#161617] dark:hover:shadow-none"
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

            {/* Görsel alanı */}
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
              className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8ed]/90 text-[#1d1d1f] backdrop-blur transition hover:scale-105 hover:bg-[#dcdce1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 dark:focus-visible:outline-white"
            >
              <PlusIcon />
            </button>
          </motion.article>
        ))}
      </div>

      {/* Önceki / sonraki */}
      <div className="mx-auto mt-6 flex max-w-6xl justify-end gap-3 px-6">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? 'Previous' : 'Next'}
            onClick={() => scrollByCard(dir)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-[#1d1d1f] transition hover:bg-black/20 dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
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

      {/* Modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={current.modalTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm md:items-center md:p-6"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-white p-8 text-[#1d1d1f] md:rounded-[28px] md:p-12 dark:bg-[#161617] dark:text-white"
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8ed] transition hover:bg-[#dcdce1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 dark:bg-white/15 dark:hover:bg-white/25 dark:focus-visible:outline-white"
              >
                <PlusIcon open />
              </button>

              <p className="text-[15px] font-semibold text-neutral-500 dark:text-neutral-400">
                {current.eyebrow}
              </p>
              <h3 className="mt-2 pr-10 text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
                {current.modalTitle}
              </h3>

              {SHOW_IMAGES && (
                <div className="relative mt-8 h-56 w-full md:h-72">
                  <Visual src={current.image} alt={current.eyebrow} />
                </div>
              )}

              <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {current.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <ul className="mt-8 space-y-3 border-t border-neutral-200 pt-6 dark:border-white/10">
                {current.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[16px]">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-white" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}