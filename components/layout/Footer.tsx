'use client';

import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  FOOTER_SECTIONS,
  FOOTER_UTILITY_LINKS,
  CONTACT_DATA,
  type FooterSection,
} from '@/constants/footer';
import { ArrowUpRight, Globe, Mail } from 'lucide-react';

export interface SpotlightFooterProps {
  wordmark?: string;
  tagline?: string;
  groups?: FooterSection[];
  copyright?: string;
  radius?: number;
  className?: string;
}

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export function Footer({
  wordmark = 'MIRANSAS',
  tagline = 'AI voice infrastructure, thoughtfully engineered for natural communication.',
  groups = FOOTER_SECTIONS,
  copyright = `© ${new Date().getFullYear()} Miransas. All rights reserved.`,
  radius = 300,
  className,
}: SpotlightFooterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  // Update CSS variables directly: pointer movement should not re-render the whole footer.
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    stage.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    setSpotlightActive(true);
  }, []);

  const fontSize = `clamp(48px, ${(176 / Math.max(1, wordmark.length)).toFixed(2)}cqi, 250px)`;
  const spotlightStyle: React.CSSProperties = {
    fontSize,
    WebkitMaskImage: `radial-gradient(${radius}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.32) 58%, transparent 100%)`,
    maskImage: `radial-gradient(${radius}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.32) 58%, transparent 100%)`,
  };

  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden bg-[#EFEFEF] text-[#111111] antialiased transition-colors duration-500 dark:bg-[#050505] dark:text-[#F5F5F5]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-6 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        {/* Brand and primary action */}
        <div className="flex flex-col justify-between gap-9 border-b border-black/10 pb-12 dark:border-white/10 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Link href="/" className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50">
              <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#050505] p-1.5 dark:bg-[#F1F1F1]">
                <img
                  src="/logo.png"
                  alt=""
                  className="size-full object-contain"
                />
              </span>
              <span className="text-xl font-semibold tracking-[-0.04em] text-[#111111] dark:text-white">
                Miransas
              </span>
            </Link>

            <h2 className="mt-7 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
              Voice, engineered to connect.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#66666B] dark:text-[#929297] sm:text-base">
              {tagline}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
            <div className="max-w-xs">
              <p className="text-sm font-semibold text-[#171719] dark:text-white">
                Building with voice?
              </p>
              <p className="mt-1 text-xs leading-5 text-[#77777C] dark:text-[#88888E]">
                Explore the studio or get in touch with the team.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link
                href="/studio"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111111] px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFEFEF] dark:bg-white dark:text-[#090909] dark:hover:bg-[#E7E7E7] dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-[#050505]"
              >
                Open Studio <ArrowUpRight className="size-4" />
              </Link>
              {SUPPORT_EMAIL ? (
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/15 px-5 text-sm font-medium text-[#333338] transition duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:bg-black/[0.03] dark:border-white/15 dark:text-[#E4E4E7] dark:hover:border-white/30 dark:hover:bg-white/[0.04]"
                >
                  <Mail className="size-4" /> Contact
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Presence information — kept factual from the existing footer constants */}
        <div className="grid grid-cols-1 gap-6 border-b border-black/10 pb-10 dark:border-white/10 md:grid-cols-[minmax(220px,0.9fr)_2fr] md:gap-10">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#F7F7F7] text-[#55555A] dark:border-white/10 dark:bg-[#0D0D0D] dark:text-[#B8B8BD]">
              <Globe className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-[#1B1B1D] dark:text-white">
                {CONTACT_DATA.presence.title}
              </h3>
              <p className="mt-1 max-w-sm text-xs leading-6 text-[#77777C] dark:text-[#88888E]">
                {CONTACT_DATA.presence.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/10 pt-5 dark:border-white/10 sm:grid-cols-3 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            {CONTACT_DATA.presence.hubs.map((hub, index) => (
              <div key={`${hub.location}-${index}`} className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#909096] dark:text-[#707076]">
                  {hub.status}
                </span>
                <p className="mt-1.5 text-xs font-medium leading-5 text-[#343438] dark:text-[#D4D4D8]">
                  {hub.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {groups.length > 0 ? (
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
            {groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#242428] dark:text-[#E5E5E8]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.target}
                          rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                          className="group inline-flex max-w-full items-center gap-1.5 text-xs leading-5 text-[#77777C] transition-colors duration-200 hover:text-[#111111] dark:text-[#85858B] dark:hover:text-white sm:text-[13px]"
                        >
                          {Icon ? <Icon className="size-3.5 shrink-0 text-[#A0A0A5] transition-colors group-hover:text-current" /> : null}
                          <span className="font-medium">{link.label}</span>
                          {link.target === '_blank' && !Icon ? <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" /> : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        ) : null}

        {/* Legal and utility links */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-7 text-center dark:border-white/10 sm:flex-row sm:text-left">
          <p className="text-[11px] text-[#77777C] dark:text-[#85858B]">{copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_UTILITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="text-[11px] font-medium text-[#77777C] transition-colors hover:text-[#111111] dark:text-[#85858B] dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark with a pointer-following light reveal */}
      <div
        className="relative isolate overflow-hidden border-t border-black/[0.06] px-4 pb-9 pt-7 dark:border-white/[0.06] sm:px-6 sm:pb-12"
      >
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#929297] dark:text-[#707076] sm:text-xs">
          AI voice infrastructure
        </p>

        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setSpotlightActive(false)}
          className="relative mx-auto flex min-h-[clamp(72px,18vw,230px)] max-w-[1320px] items-center justify-center"
          style={{ containerType: 'inline-size' }}
        >
          <span
            aria-hidden="true"
            className="select-none whitespace-nowrap font-black leading-none tracking-[-0.085em] text-[#D8D8D8] dark:text-white/[0.065]"
            style={{ fontSize }}
          >
            {wordmark}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-black leading-none tracking-[-0.085em] text-[#111111] transition-opacity duration-300 dark:text-white',
              spotlightActive ? 'opacity-100' : 'opacity-0',
            )}
            style={spotlightStyle}
          >
            {wordmark}
          </span>
        </div>
        <span className="sr-only">{wordmark}</span>
      </div>
    </footer>
  );
}

export default Footer;
