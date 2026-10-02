'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { GlowButton } from '../ui/glow-button';
import {
  FOOTER_SECTIONS,
  FOOTER_UTILITY_LINKS,
  type FooterLink,
  type FooterSection,
} from '@/constants/footer';
import FooterLocation from './footerLocations';

/* ── Types ──────────────────────────────────────────────────────── */

export interface SpotlightFooterProps {
  wordmark?: string;
  tagline?: string;
  groups?: FooterSection[];
  copyright?: string;
  radius?: number;
  className?: string;
}

/* ── Main Component ─────────────────────────────────────────────── */

export function Footer({
  wordmark = 'MIRANSAS',
  tagline = '',
  groups = FOOTER_SECTIONS,
  copyright = `© ${new Date().getFullYear()} Miransas. All rights reserved.`,
  radius = 300,
  className,
}: SpotlightFooterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const fontSize = `clamp(48px, ${(150 / Math.max(1, wordmark.length)).toFixed(2)}cqi, 260px)`;

  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden  border-white/[0.08] dark:bg-black antialiased px-20',
        className
      )}
    >
      <div className="mx-auto max-w-full px-6 pt-16 pb-12">

        {/* ── Brand, Heading & Newsletter Input Section ── */}
        <div className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/[0.06] pb-12">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className='dark:bg-background bg-black w-14 rounded-full'>
                <img src={"https://raw.githubusercontent.com/Miransas/miransas/main/public/icons/logo.png"}
                  className='w-full object-contain'
                  alt='Logo' />
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-stone-300">Miransas</span>
            </div>
            {/* Heading Content */}
            <h2 className="text-xl font-semibold dark:text-stone-400 mb-2">
              Stay ahead in Voice AI
            </h2>
            <p className="text-[14px] text-stone-500 dark:text-stone-400">
              Subscribe to our newsletter for the latest updates, new features, and developer tips.
            </p>
          </div>

          {/* Email Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full sm:w-80 rounded-md border dark:border-white/[0.1] border-zinc-200 dark:bg-white/[0.03] px-4 py-2.5 text-[14px] text-stone-200 placeholder:text-stone-500 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 transition-colors"
            />
            <GlowButton className='' size='md'>

            </GlowButton>
          </form>
        </div>
        {/* ─────────────────────────────────────────────── */}

        {/* Navigation Grid */}
        {groups.length > 0 && (
          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 pb-12">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3.5">
                <h3 className="text-[12px] font-semibold tracking-wider dark:text-stone-200 uppercase opacity-90">
                  {group.title}
                </h3>
                <ul className="space-y-2.5 text-[13.5px]">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-stone-400 hover:text-neutral-600 transition-colors duration-200"
                        >
                          {Icon && (
                            <Icon className="h-4 w-4 dark:text-stone-400 transition-colors group-hover:text-neutral-200 shrink-0" />
                          )}
                          <span className="font-normal leading-none">{link.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        )}

        {/* Separator / Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.06] pt-8 gap-4 text-[12px] dark:text-stone-400">
      {/* <FooterLocation /> */}
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            {FOOTER_UTILITY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-neutral-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight Big Typography Stage */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setPointer(null)}
        className="relative overflow-hidden px-6 pb-8 pt-4 cursor-default"
        style={{ containerType: 'inline-size' }}
      >
        {tagline && (
          <p className="mx-auto mb-6 max-w-[1200px] text-pretty text-[13px] leading-relaxed text-stone-600 dark:text-stone-400 text-left">
            {tagline}
          </p>
        )}

        <div className="relative mx-auto max-w-[1200px] flex justify-center items-center">
          {/* Static Background Text (Faint) */}
          <span
            aria-hidden
            className="whitespace-nowrap font-black tracking-tighter leading-none text-black/[0.07] dark:text-white/[0.03] select-none"
            style={{ fontSize }}
          >
            {wordmark}
          </span>

          {/* Interactive Spotlight Text Layer */}
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 flex justify-center items-center whitespace-nowrap font-black tracking-tighter leading-none text-black dark:text-white transition-opacity duration-300 ease-out select-none',
              pointer ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              fontSize,
              WebkitMaskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 50%, transparent 80%)`
                : undefined,
              maskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 50%, transparent 80%)`
                : undefined,
            }}
          >
            {wordmark}
          </span>

          <span className="sr-only">{wordmark}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
