'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { GlowButton } from '../ui/glow-button';
import {
  FOOTER_SECTIONS,
  FOOTER_UTILITY_LINKS,
  CONTACT_DATA,
  type FooterSection,
} from '@/constants/footer';
import { ArrowUpRight, Globe, Mail, Sparkles } from 'lucide-react';

export interface SpotlightFooterProps {
  wordmark?: string;
  tagline?: string;
  groups?: FooterSection[];
  copyright?: string;
  radius?: number;
  className?: string;
}

export function Footer({
  wordmark = 'MIRANSAS',
  tagline = 'Next-generation AI voice technology engineered for creators, developers, and enterprise scale.',
  groups = FOOTER_SECTIONS,
  copyright = `© ${new Date().getFullYear()} Miransas. All rights reserved.`,
  radius = 320,
  className,
}: SpotlightFooterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const fontSize = `clamp(48px, ${(160 / Math.max(1, wordmark.length)).toFixed(2)}cqi, 260px)`;

  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden border-t border-zinc-200/80 dark:border-white/10 bg-[#fafafa] dark:bg-[#232323] text-zinc-900 dark:text-zinc-100 antialiased transition-colors duration-500',
        className
      )}
    >
      {/* Ambient Dark Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-zinc-400/5 dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 pb-12 space-y-16">

        {/* ── 1. HEADER & NEWSLETTER SECTION ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-b border-zinc-200/80 dark:border-white/10 pb-12">
          
          {/* Brand Info */}
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className=" dark:bg-background bg-[#000000] rounded-2xl  flex items-center justify-center ">
                <img
                  src="https://raw.githubusercontent.com/Miransas/miransas/main/public/icons/logo.png"
                  className="w-12 object-contain"
                  alt="Miransas Logo "
                />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Miransas
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-200">
              Stay ahead in Voice AI
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
              Subscribe to our newsletter for technical breakdowns, model releases, and voice synthesis architecture updates.
            </p>
          </div>

          {/* Email Input Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] sm:min-w-[420px]"
          >
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-zinc-900 dark:focus:border-white focus:outline-none transition-colors shadow-sm"
              />
            </div>
            <GlowButton className="shrink-0 rounded-full px-6 py-3 font-semibold text-sm" size="md">
              <span className="flex items-center gap-2">
                Subscribe <Sparkles className="size-4" />
              </span>
            </GlowButton>
          </form>
        </div>

        {/* ── 2. GLOBAL HUBS & PRESENCE BANNER (ENTERPRISE TOUCH) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-white/10">
              <Globe className="size-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {CONTACT_DATA.presence.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {CONTACT_DATA.presence.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-zinc-200/80 dark:border-white/10 pt-4 md:pt-0 md:pl-6">
            {CONTACT_DATA.presence.hubs.map((hub, idx) => (
              <div key={idx} className="space-y-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                  {hub.status}
                </span>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200">
                  {hub.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. NAVIGATION GRID (OPTIMIZED FOR RESPONSIVENESS) ── */}
        {groups.length > 0 && (
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 gap-y-10 pt-4"
          >
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold tracking-wider text-zinc-900 dark:text-white uppercase">
                  {group.title}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.target}
                          rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                          className="group inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                        >
                          {Icon && (
                            <Icon className="size-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0" />
                          )}
                          <span className="font-medium leading-none">{link.label}</span>
                          {link.target === '_blank' && !Icon && (
                            <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        )}

        {/* ── 4. COPYRIGHT & UTILITY BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200/80 dark:border-white/10 pt-8 gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_UTILITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* ── 5. SPOTLIGHT BIG TYPOGRAPHY STAGE ── */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setPointer(null)}
        className="relative overflow-hidden px-6 pb-12 pt-6 cursor-default border-t border-zinc-200/40 dark:border-white/5"
        style={{ containerType: 'inline-size' }}
      >
        {tagline && (
          <p className="mx-auto mb-8 max-w-[1200px] text-center text-xs sm:text-sm leading-relaxed text-zinc-400 dark:text-zinc-500">
            {tagline}
          </p>
        )}

        <div className="relative mx-auto max-w-[1200px] flex justify-center items-center">
          {/* Static Background Text */}
          <span
            aria-hidden
            className="whitespace-nowrap font-black tracking-tighter leading-none text-zinc-200/80 dark:text-white/[0.03] select-none"
            style={{ fontSize }}
          >
            {wordmark}
          </span>

          {/* Interactive Spotlight Layer */}
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 flex justify-center items-center whitespace-nowrap font-black tracking-tighter leading-none text-zinc-950 dark:text-white transition-opacity duration-300 ease-out select-none',
              pointer ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              fontSize,
              WebkitMaskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`
                : undefined,
              maskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`
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