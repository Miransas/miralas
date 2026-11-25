"use client";

import { buttonVariants } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
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
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

export function Header() {
  const reduced = useReducedMotion();
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
    const resizeObserver =
      hero && typeof ResizeObserver !== "undefined"
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
    setExpandedMobileAccordion((previous) => (previous === label ? null : label));
  };

  const headerClass = overDarkHero
    ? "dark bg-transparent text-text-heading backdrop-blur-none"
    : "bg-surface-page/85 text-text-heading surface-shadow backdrop-blur-xl";

  const navMuted = overDarkHero
    ? "text-text-primary hover:bg-white/[0.08] hover:text-white"
    : "text-text-muted hover:bg-surface-card hover:text-text-heading";

  const navActive = overDarkHero
    ? "bg-white/[0.10] text-white"
    : "bg-surface-card text-text-heading surface-shadow";

  const dropdownSurface = "bg-surface-elevated/95 text-text-heading surface-shadow-lg";

  const dropdownHeading = "text-text-muted";

  const dropdownItemHover = "hover:bg-surface-card-hover";

  const dropdownItemTitle = overDarkHero
    ? "text-text-primary group-hover:text-white"
    : "text-text-primary group-hover:text-text-heading";

  const dropdownItemDescription = "text-text-muted";

  const mobilePanel = overDarkHero
    ? "bg-[#050505]/95 text-white surface-shadow-lg"
    : "bg-surface-page/95 text-text-heading surface-shadow-lg";

  return (
    <header
      data-site-header
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          const target = event.target as HTMLElement;
          const trigger = target.closest("[data-nav-item]")?.querySelector<HTMLButtonElement>("button");
          trigger?.focus();
          if (mobileMenuOpen) {
            document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
          }
          setActiveDropdown(null);
          setMobileMenuOpen(false);
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,box-shadow] duration-(--motion-interaction-duration) ease-[cubic-bezier(0.22,1,0.36,1)] ${headerClass}`}
    >
      <div className="mx-auto flex h-(--site-header-height) max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand and desktop navigation */}
        <div className="flex items-center gap-8">
          <Link
            href={HEADER_LINKS.home}
            className={`flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 ${FOCUS_RING}`}
            aria-label="Miralas home"
          >
            <span className="flex size-9 items-center bg-accent justify-center rounded-xl  p-1.5">
               <img
                    src="/icons/logo-dark-miralas.png"
                    alt=""
                    className="block size-full object-contain dark:hidden"
                  />
                  <img
                    src="/icons/logo-white-miralas.png"
                    alt=""
                    className="hidden size-full object-contain dark:block"
                  />
            </span>
            <span
              className={`text-lg font-semibold tracking-[-0.025em] ${
                overDarkHero ? "text-white" : "text-text-heading"
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
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveDropdown(null);
                    }
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
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-colors duration-(--motion-interaction-duration) ${FOCUS_RING} ${
                        isOpen ? navActive : navMuted
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-(--motion-interaction-duration) ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`inline-flex rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-colors duration-(--motion-interaction-duration) ${FOCUS_RING} ${navMuted}`}
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
                        transition={{ duration: reduced ? 0 : DURATION_MICRO, ease: EASE_OUT_EXPO }}
                        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2.5 ${
                          isLargeMenu ? "w-[520px]" : "w-80"
                        }`}
                      >
                        <div
                          data-lenis-prevent
                          className={`overflow-hidden rounded-4xl p-3 backdrop-blur-2xl ${dropdownSurface}`}
                        >
                          {item.description && (
                            <div
                              className={`mb-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] ${dropdownHeading}`}
                            >
                              {item.description}
                            </div>
                          )}

                          <div
                            className={
                              isLargeMenu ? "grid grid-cols-2 gap-1" : "flex flex-col gap-1"
                            }
                          >
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                target={subItem.target}
                                rel={subItem.target === "_blank" ? "noopener noreferrer" : undefined}
                                className={`group flex flex-col gap-1 rounded-2xl p-3 transition-colors ${dropdownItemHover} ${FOCUS_RING}`}
                              >
                                <span
                                  className={`flex items-center justify-between gap-2 text-xs sm:text-[13px] font-medium ${dropdownItemTitle}`}
                                >
                                  <span className="flex items-center gap-1.5">
                                    {subItem.label}
                                    {subItem.target === "_blank" && (
                                      <ExternalLink
                                        className={`size-3 text-text-muted`}
                                      />
                                    )}
                                  </span>
                                  {subItem.badge ? (
                                    <span
                                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${
                                        overDarkHero
                                          ? "bg-surface-elevated text-text-primary"
                                          : "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-text-primary"
                                      }`}
                                    >
                                      {subItem.badge}
                                    </span>
                                  ) : (
                                    <ArrowRight
                                      className={`size-3.5 -translate-x-1 opacity-0 transition-[color,background-color,border-color,box-shadow,opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 ${
                                        overDarkHero ? "text-text-primary" : "text-text-muted"
                                      }`}
                                    />
                                  )}
                                </span>
                                {subItem.description && (
                                  <span
                                    className={`line-clamp-2 text-xs leading-[1.45] font-normal ${dropdownItemDescription}`}
                                  >
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
          <ModeToggle
            className={
              overDarkHero
                ? "bg-white/[0.08] text-text-primary hover:bg-white/[0.14] hover:text-white"
                : undefined
            }
          />
          <a
            href={HEADER_LINKS.consoleAuth}
            className={`rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-[color,background-color,transform] duration-(--motion-interaction-duration) active:scale-[0.98] ${FOCUS_RING} ${navMuted}`}
          >
            Console access
          </a>
          <Link
            href={HEADER_LINKS.studio}
            className={buttonVariants({ className: "group" })}
          >
            <Sparkles className="size-3.5 transition-transform duration-(--motion-interaction-duration) group-hover:scale-105" />
            <span>Explore products</span>
            <ArrowRight
              className="size-3 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle
            className={
              overDarkHero
                ? "bg-white/[0.08] text-text-primary hover:bg-white/[0.14] hover:text-white"
                : undefined
            }
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`flex size-10 items-center justify-center rounded-full transition-colors ${FOCUS_RING} ${
              overDarkHero
                ? "bg-white/[0.07] text-white hover:bg-white/[0.12]"
                : "bg-surface-card text-text-heading hover:bg-surface-card-hover"
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
            transition={{ duration: reduced ? 0 : DURATION_UI, ease: EASE_OUT_EXPO }}
            className={`backdrop-blur-2xl lg:hidden ${mobilePanel}`}
          >
            <div
              data-lenis-prevent
              className="mx-auto flex max-h-[80vh] max-w-7xl flex-col gap-2 overflow-y-auto overscroll-y-contain px-6 py-6"
            >
              {HEADER_NAV_ITEMS.map((item) => {
                const hasSubItems = Boolean(item.items && item.items.length > 0);
                const isExpanded = expandedMobileAccordion === item.label;

                return (
                  <div
                    key={item.label}
                    className={`rounded-2xl px-4 py-1 bg-surface-card`}
                  >
                    {hasSubItems ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.label)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between py-3 text-sm font-medium transition-colors ${FOCUS_RING} ${
                            overDarkHero
                              ? "text-white hover:text-text-primary"
                              : "text-text-heading hover:text-text-primary"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`size-4 transition-transform duration-(--motion-interaction-duration) ${
                              isExpanded ? "rotate-180" : ""
                            } text-text-muted`}
                          />
                        </button>

                        <div
                          aria-hidden={!isExpanded}
                          className={`grid transition-[grid-template-rows,opacity] duration-(--motion-interaction-duration) ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="mb-2 flex flex-col gap-1 py-1">
                              {item.items?.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  target={sub.target}
                                  rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
                                  tabIndex={isExpanded ? 0 : -1}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs transition-colors ${FOCUS_RING} ${
                                    overDarkHero
                                      ? "text-text-primary hover:bg-surface-card-hover hover:text-white"
                                      : "text-text-primary hover:bg-surface-card-hover hover:text-text-heading"
                                  }`}
                                >
                                  <span className="flex min-w-0 flex-col gap-0.5">
                                    <span
                                      className={
                                        overDarkHero
                                          ? "font-medium text-white"
                                          : "font-medium text-text-heading"
                                      }
                                    >
                                      {sub.label}
                                    </span>
                                    {sub.description && (
                                      <span
                                        className={`text-xs leading-[1.45] text-text-muted`}
                                      >
                                        {sub.description}
                                      </span>
                                    )}
                                  </span>
                                  {sub.badge && (
                                    <span
                                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                                        overDarkHero
                                          ? "bg-surface-elevated text-text-primary"
                                          : "bg-surface-elevated text-text-heading dark:bg-surface-elevated dark:text-text-primary"
                                      }`}
                                    >
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
                        className={`block py-3 text-sm font-medium transition-colors ${FOCUS_RING} ${
                          overDarkHero
                            ? "text-white hover:text-text-primary"
                            : "text-text-heading hover:text-text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-2.5 pt-4">
                <a
                  href={HEADER_LINKS.consoleAuth}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full rounded-full py-3 text-center text-xs font-medium transition-[color,background-color,transform] active:scale-[0.98] ${FOCUS_RING} ${
                    overDarkHero
                      ? "bg-surface-card text-text-primary hover:bg-surface-card-hover hover:text-white"
                      : "bg-surface-card text-text-primary hover:bg-surface-card-hover hover:text-text-heading"
                  }`}
                >
                  Console access
                </a>
                <Link
                  href={HEADER_LINKS.studio}
                  onClick={() => setMobileMenuOpen(false)}
                  className={buttonVariants({ className: "w-full" })}
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
