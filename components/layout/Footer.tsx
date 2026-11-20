'use client';

import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RevealWordmark } from '@/components/motion/primitives';
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
const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2';

export function Footer({
  wordmark = 'MIRANSAS',
  tagline = 'AI voice infrastructure, thoughtfully engineered for natural communication.',
  groups = FOOTER_SECTIONS,
  copyright = `© ${new Date().getFullYear()} Miransas. All rights reserved.`,
  radius = 300,
  className,
}: SpotlightFooterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightActiveRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [spotlightActive, setSpotlightActive] = useState(false);

  // Update CSS variables directly: pointer movement should not re-render the whole footer.
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'touch' || reduceMotion) return;
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
      stage.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
      if (!spotlightActiveRef.current) {
        spotlightActiveRef.current = true;
        setSpotlightActive(true);
      }
    },
    [reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    if (!spotlightActiveRef.current) return;
    spotlightActiveRef.current = false;
    setSpotlightActive(false);
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
        'relative w-full overflow-x-clip bg-surface-page text-text-heading antialiased',
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        {/* Brand and primary action — borderless floating card */}
        <div className="surface-accent surface-shadow flex flex-col justify-between gap-9 rounded-[28px] p-7 sm:p-10 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Link
              href="/"
              className={`group inline-flex items-center gap-3 rounded-xl ${FOCUS_RING}`}
            >
              <span className="flex size-16 items-center justify-center overflow-hidden p-1.5 ">
                <>
                  <img
                    src="/icons/logo-dark.png"
                    alt=""
                    className="block size-full object-contain dark:hidden"
                  />
                  <img
                    src="/icons/logo-white.png"
                    alt=""
                    className="hidden size-full object-contain dark:block"
                  />
                </>
                </span>
                <span className="text-xl font-semibold tracking-[-0.02em] text-text-heading">
                  Miransas
                </span>
            </Link>

            <h2 className="mt-7 text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
              Voice, engineered to connect.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-[1.6] text-text-muted sm:text-base">
              {tagline}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
            <div className="max-w-xs">
              <p className="text-sm font-semibold text-text-heading">
                Building with voice?
              </p>
              <p className="mt-1 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                Explore the technology or get in touch with the team.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Link
                href="https://console.miralas.io"
                className={`group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-text-heading px-5 text-sm font-semibold text-surface-page transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98] ${FOCUS_RING}`}
              >
                <span>Console access</span>
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              {SUPPORT_EMAIL ? (
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black/[0.06] px-5 text-sm font-medium text-text-primary transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-black/[0.1] hover:text-text-heading active:scale-[0.98] dark:bg-white/[0.07] dark:hover:bg-white/[0.12] ${FOCUS_RING}`}
                >
                  <Mail className="size-4" /> Contact
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Presence information — borderless card surface */}
        <div className="grid grid-cols-1 gap-6 rounded-[24px] bg-surface-card p-7 sm:p-8 md:grid-cols-[minmax(220px,0.9fr)_2fr] md:gap-10">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] text-text-primary dark:bg-white/[0.06]">
              <Globe className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold tracking-[-0.015em] text-text-heading">
                {CONTACT_DATA.presence.title}
              </h3>
              <p className="mt-1.5 max-w-sm text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                {CONTACT_DATA.presence.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CONTACT_DATA.presence.hubs.map((hub, index) => (
              <div
                key={`${hub.location}-${index}`}
                className="min-w-0 rounded-2xl bg-surface-page/70 p-4 dark:bg-white/[0.03]"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                  {hub.status}
                </span>
                <p className="mt-1.5 text-xs font-medium leading-[1.45] text-text-primary sm:text-[13px]">
                  {hub.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {groups.length > 0 ? (
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-10 px-1 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8"
          >
            {groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-text-heading">
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
                          className={`group inline-flex max-w-full items-center gap-1.5 rounded text-xs leading-[1.45] text-text-muted transition-colors duration-200 hover:text-text-heading sm:text-[13px] ${FOCUS_RING}`}
                        >
                          {Icon ? (
                            <Icon className="size-3.5 shrink-0 text-text-muted transition-colors group-hover:text-text-heading" />
                          ) : null}
                          <span className="font-medium">{link.label}</span>
                          {link.target === '_blank' && !Icon ? (
                            <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          ) : null}
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
        <div className="flex flex-col items-center justify-between gap-4 pt-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-[1.45] text-text-muted sm:text-[13px]">
            {copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_UTILITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={`rounded text-xs font-medium text-text-muted transition-colors hover:text-text-heading sm:text-[13px] ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark with single-trigger scroll reveal and pointer-following spotlight */}
      <div className="relative isolate overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-12">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.12em] text-text-muted sm:text-[13px]">
          AI voice infrastructure
        </p>

        <RevealWordmark>
          <div
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative mx-auto flex min-h-[clamp(72px,18vw,230px)] max-w-[1320px] items-center justify-center"
            style={{ containerType: 'inline-size' }}
          >
            <span
              aria-hidden="true"
              className="select-none whitespace-nowrap font-black leading-none tracking-[-0.085em] text-black/[0.09] dark:text-white/[0.065]"
              style={{ fontSize }}
            >
              {wordmark}
            </span>

            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-black leading-none tracking-[-0.085em] text-text-heading transition-opacity duration-300',
                spotlightActive ? 'opacity-100' : 'opacity-0',
              )}
              style={spotlightStyle}
            >
              {wordmark}
            </span>
          </div>
        </RevealWordmark>
        <span className="sr-only">{wordmark}</span>
      </div>
    </footer>
  );
}

export default Footer;
