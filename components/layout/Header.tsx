"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  HEADER_NAV_ITEMS,
  HEADER_LINKS,
  type HeaderNavItem,
} from "@/constants/navbar";
import { DURATION_MICRO, DURATION_UI, EASE_OUT_EXPO } from "@/lib/motion";
import { ModeToggle } from "../providers/mode-toggle";

const HERO_HEIGHT = 72;
const FALLBACK_SCROLL_THRESHOLD = 24;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileAccordion, setExpandedMobileAccordion] = useState<string | null>(null);
  const [heroBehindHeader, setHeroBehindHeader] = useState(isHome);
  const heroThresholdRef = useRef<number>(FALLBACK_SCROLL_THRESHOLD);

  // Measure the homepage hero height once on mount and on resize — never inside scroll events.
  useEffect(() => {
    if (!isHome) {
      setHeroBehindHeader(false);
      return;
    }

    const measureHeroThreshold = () => {
      const hero = document.querySelector<HTMLElement>("[data-home-hero]");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        heroThresholdRef.current = Math.max(FALLBACK_SCROLL_THRESHOLD, heroBottom - HERO_HEIGHT);
      } else {
        heroThresholdRef.current = FALLBACK_SCROLL_THRESHOLD;
      }
      const next = window.scrollY < heroThresholdRef.current;
      setHeroBehindHeader((prev) => (prev === next ? prev : next));
    };

    measureHeroThreshold();

    const hero = document.querySelector<HTMLElement>("[data-home-hero]");
    const resizeObserver = hero && typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(measureHeroThreshold)
      : null;
    if (hero && resizeObserver) resizeObserver.observe(hero);

    window.addEventListener("resize", measureHeroThreshold, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureHeroThreshold);
    };
  }, [isHome]);

  // Only update React state when crossing the threshold — zero per-frame re-renders.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHome) return;
    const next = latest < heroThresholdRef.current;
    setHeroBehindHeader((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobileAccordion(null);
  }, [pathname]);

  const overDarkHero = isHome && heroBehindHeader;

  const toggleMobileAccordion = (label: string) => {
    setExpandedMobileAccordion((previous) =>
      previous === label ? null : label,
    );
  };

  const headerClass = overDarkHero
    ? "border-b border-transparent bg-transparent text-white backdrop-blur-none"
    : "border-b border-border/60 bg-background/85 text-foreground shadow-[0_4px_24px_rgba(0,0,0,0.035)] backdrop-blur-xl";

  const navMuted = overDarkHero
    ? "text-white/70 hover:bg-white/[0.08] hover:text-white"
    : "text-muted-foreground hover:bg-card/70 hover:text-foreground";

  const navActive = overDarkHero
    ? "bg-white/[0.11] text-white"
    : "bg-card text-foreground shadow-sm";

  const dropdownSurface = overDarkHero
    ? "border-white/10 bg-[#0D0D0D]/95 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
    : "border-border/60 bg-card/95 text-card-foreground shadow-2xl";

  const dropdownHeading = overDarkHero
    ? "border-white/10 text-white/45"
    : "border-border/40 text-muted-foreground/70";

  const dropdownItemTitle = overDarkHero
    ? "text-white/90 group-hover:text-white"
    : "text-foreground group-hover:text-foreground";

  const dropdownItemDescription = overDarkHero
    ? "text-white/45"
    : "text-muted-foreground/80";

  const mobilePanel = overDarkHero
    ? "border-white/10 bg-[#050505]/95 text-white"
    : "border-border/60 bg-background/95 text-foreground";

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          const target = event.target as HTMLElement;
          const trigger = target.closest("[data-nav-item]")?.querySelector<HTMLButtonElement>("button");
          trigger?.focus();
          if (mobileMenuOpen) document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
          setActiveDropdown(null);
          setMobileMenuOpen(false);
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${headerClass}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand and desktop navigation */}
        <div className="flex items-center gap-8">
          <Link
            href={HEADER_LINKS.home}
            className="flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/50"
            aria-label="Miransas home"
          >
            <span
              className={`flex size-9 items-center justify-center rounded-xl p-1.5 shadow-sm ${
                "bg-[#050505]"
              }`}
            >
              <img
                src="/logo.png"
                alt=""
                className="size-full object-contain"
              />
            </span>
            <span
              className={`text-lg font-semibold tracking-[-0.035em] ${
                overDarkHero ? "text-white" : "text-foreground"
              }`}
            >
              Miralas
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {HEADER_NAV_ITEMS.map((item: HeaderNavItem) => {
              const hasSubItems = Boolean(item.items && item.items.length > 0);
              const isLargeMenu = (item.items?.length || 0) > 4;
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  data-nav-item
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setActiveDropdown(null);
                  }}
                  className="relative"
                  onMouseEnter={() => hasSubItems && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {hasSubItems ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
                        isOpen ? navActive : navMuted
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${navMuted}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {hasSubItems && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: DURATION_MICRO, ease: EASE_OUT_EXPO }}
                        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 ${
                          isLargeMenu ? "w-[520px]" : "w-80"
                        }`}
                      >
                        <div className={`overflow-hidden rounded-2xl border p-3 backdrop-blur-2xl ${dropdownSurface}`}>
                          {item.description && (
                            <div className={`mb-2 border-b px-3 py-2 text-[10px] font-mono uppercase tracking-widest ${dropdownHeading}`}>
                              {item.description}
                            </div>
                          )}

                          <div className={isLargeMenu ? "grid grid-cols-2 gap-1" : "flex flex-col gap-1"}>
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                target={subItem.target}
                                rel={subItem.target === "_blank" ? "noopener noreferrer" : undefined}
                                className="group flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
                              >
                                <span className={`flex items-center justify-between gap-2 text-xs font-medium ${dropdownItemTitle}`}>
                                  <span className="flex items-center gap-1.5">
                                    {subItem.label}
                                    {subItem.target === "_blank" && (
                                      <ExternalLink className={`size-3 ${overDarkHero ? "text-white/40" : "text-muted-foreground/60"}`} />
                                    )}
                                  </span>
                                  {subItem.badge ? (
                                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                                      overDarkHero
                                        ? "border-white/15 bg-white/[0.07] text-white/65"
                                        : "border-border bg-muted text-muted-foreground"
                                    }`}>
                                      {subItem.badge}
                                    </span>
                                  ) : (
                                    <ArrowRight className={`size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 ${overDarkHero ? "text-white/60" : "text-muted-foreground"}`} />
                                  )}
                                </span>
                                {subItem.description && (
                                  <span className={`line-clamp-2 text-[11px] font-normal leading-relaxed ${dropdownItemDescription}`}>
                                    {subItem.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ModeToggle />
          <a
            href={HEADER_LINKS.consoleAuth}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-[color,background-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${navMuted}`}
          >
            Console access
          </a>
          <Link
            href={HEADER_LINKS.studio}
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold shadow-sm transition-[transform,opacity,background-color] duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
              overDarkHero
                ? "bg-white text-[#050505] hover:bg-white/90"
                : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            <Sparkles className="size-3.5 transition-transform duration-200 group-hover:scale-105" />
            <span>Explore products</span>
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
              overDarkHero
                ? "border-white/15 bg-white/[0.07] text-white hover:bg-white/[0.12]"
                : "border-border/60 bg-card text-foreground hover:bg-muted"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — compositor-only entrance (no height layout thrash) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: DURATION_UI, ease: EASE_OUT_EXPO }}
            className={`border-b backdrop-blur-2xl lg:hidden ${mobilePanel}`}
          >
            <div className="mx-auto flex max-h-[80vh] max-w-7xl flex-col gap-1 overflow-y-auto overscroll-y-contain px-6 py-6">
              {HEADER_NAV_ITEMS.map((item) => {
                const hasSubItems = Boolean(item.items && item.items.length > 0);
                const isExpanded = expandedMobileAccordion === item.label;

                return (
                  <div key={item.label} className={`border-b last:border-none ${overDarkHero ? "border-white/10" : "border-border/30"}`}>
                    {hasSubItems ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.label)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${overDarkHero ? "text-white hover:text-white/70" : "text-foreground hover:text-muted-foreground"}`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${overDarkHero ? "text-white/55" : "text-muted-foreground"}`} />
                        </button>

                        <div
                          aria-hidden={!isExpanded}
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className={`my-1 flex flex-col gap-1 border-l py-1 pl-3 ${overDarkHero ? "border-white/15" : "border-border/40"}`}>
                              {item.items?.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  target={sub.target}
                                  rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
                                  tabIndex={isExpanded ? 0 : -1}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${overDarkHero ? "text-white/75 hover:bg-white/[0.07] hover:text-white" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
                                >
                                  <span className="flex min-w-0 flex-col gap-0.5">
                                    <span className={overDarkHero ? "font-medium text-white" : "font-medium text-foreground"}>{sub.label}</span>
                                    {sub.description && (
                                      <span className={`text-[10px] ${overDarkHero ? "text-white/45" : "text-muted-foreground/70"}`}>{sub.description}</span>
                                    )}
                                  </span>
                                  {sub.badge && (
                                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${overDarkHero ? "border-white/15 bg-white/[0.07] text-white/60" : "border-border bg-muted text-muted-foreground"}`}>
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${overDarkHero ? "text-white hover:text-white/65" : "text-foreground hover:text-muted-foreground"}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-2 pt-6">
                <a
                  href={HEADER_LINKS.consoleAuth}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full rounded-full border py-3 text-center text-xs font-medium transition-[color,background-color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${overDarkHero ? "border-white/15 text-white hover:bg-white/[0.07]" : "border-border/60 text-foreground hover:bg-card"}`}
                >
                  Console access
                </a>
                <Link
                  href={HEADER_LINKS.studio}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full rounded-full py-3 text-center text-xs font-semibold transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] ${overDarkHero ? "bg-white text-[#050505]" : "bg-foreground text-background"}`}
                >
                  Explore products
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
