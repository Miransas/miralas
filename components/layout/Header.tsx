/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  Mic2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  href: string;
  description?: string;
};

type NavItem = {
  label: string;
  href: string;
  description?: string;
  items?: SubItem[];
};

const navItems: NavItem[] = [
  {
    label: "Resources",
    href: "/resources/about",
    description: "Learn, build and stay updated.",
    items: [
      {
        label: "Documentation",
        href: "/resources/docs",
        description: "Build with the Miralas platform.",
      },
      {
        label: "Guides",
        href: "/resources/guides",
        description: "Practical guides and tutorials.",
      },
      {
        label: "Media",
        href: "/resources/media",
        description: "Practical guides and tutorials.",
      },
      {
        label: "Changelog",
        href: "/resources/changelog",
        description: "What's new across Miralas.",
      },
      {
        label: "Support",
        href: "/resources/support",
        description: "Get help with your Miralas workspace.",
      },
      {
        label: "Contact Sales",
        href: "/resources/help-center",
        description: "Talk to the Miralas team.",
      },
    ],
  },
  {
    label: "Studio",
    href: "/studio",
    description: "Create, clone and generate.",
    items: [

      {
        label: "Text to Speech",
        href: "/studio/tts",
        description: "Turn text into natural expressive speech.",
      },
      {
        label: "Voice Clone",
        href: "/studio/voice-clone",
        description: "Clone and customize a voice.",
      },
      {
        label: "Models",
        href: "/studio/models",
        description: "Explore Miralas voice models.",
      },
    ],
  },

  {
    label: "Products",
    href: "/products",
    description: "Explore the Miralas platform.",
    items: [
      {
        label: "Streamers",
        href: "/products/donate",
        description: "Generate natural and expressive AI speech.",
      },
      {
        label: "API",
        href: "/products/api",
        description: "Integrate Miralas into your own products.",
      },
    ],
  },
  {
    label: "Enterprise",
    href: "/resources/support",
    description: "Voice infrastructure for organizations.",
    items: [
      {
        label: "Security",
        href: "https://privacy.miransas.com/miralas/security",
        description: "Security and compliance information.",
      },
      {
        label: "Miralas Terms",
        href: "https://privacy.miransas.com/miralas/terms",
        description: "Support for enterprise teams.",
      },
       {
        label: "Cookie Policy",
        href: "https://privacy.miransas.com/miralas/cookie",
        description: "Support for enterprise teams.",
      },
      
    ],
  },

  {
    label: "Solutions",
    href: "/solutions",
    description: "Voice AI for real-world workflows.",
    // comming sonn items 
  },

  // {
  //   label: "Customers",
  //   href: "/customers",
  //   comming sonn items 
  // },



  {
    label: "Pricing",
    href: "/pricing",
  },
];


const LIGHT_PAGES = ["/studio", "/blog", "/docs", "/guides"];

function isLightPage(path: string): boolean {
  return LIGHT_PAGES.some((p) => path === p || path.startsWith(`${p}/`));
}

/* ---------------------------------------------------------------
   Header
   --------------------------------------------------------------- */
type HeaderVariant = "dark" | "light";

interface HeaderProps {
  variant?: HeaderVariant;
}

export function Header({ variant }: HeaderProps) {
  const pathname = usePathname();

  const resolvedVariant: HeaderVariant =
    variant ?? (isLightPage(pathname) ? "light" : "dark");

  const isDark = resolvedVariant === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  /*
   * Scroll state
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close desktop menu after route change
   */
  useEffect(() => {
    setDesktopOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  /*
   * Escape closes everything
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setDesktopOpen(null);
      setMobileOpen(false);
      setMobileSection(null);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
   * Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /*
   * Helpers
   */
  const isPathActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const hasActiveChild = (item: NavItem) => {
    return item.items?.some((subItem) => isPathActive(subItem.href)) ?? false;
  };

  const toggleMobileSection = (label: string) => {
    setMobileSection((current) => (current === label ? null : label));
  };

  const handleMobileLink = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  /* ---------- Renk tokenlari ---------- */
  const t = {
    /* header shell */
    shellBorder:
      scrolled || desktopOpen || mobileOpen
        ? isDark
          ? "border-white/10"
          : "border-zinc-200/70"
        : "border-transparent",
    shellBg:
      scrolled || desktopOpen || mobileOpen
        ? isDark
          ? "bg-zinc-950/75"
          : "bg-white/80"
        : "bg-transparent",
    shellShadow:
      scrolled || desktopOpen || mobileOpen
        ? "shadow-[0_18px_60px_-36px_rgba(24,24,27,0.7)]"
        : "",

    /* text */
    textPrimary: isDark ? "text-white" : "text-zinc-950",
    textSecondary: isDark ? "text-zinc-400" : "text-zinc-600",
    textMuted: isDark ? "text-zinc-500" : "text-zinc-500",

    /* hover text */
    hoverText: isDark ? "hover:text-white" : "hover:text-zinc-950",

    /* bg */
    bgPrimary: isDark ? "bg-zinc-950" : "bg-white",
    bgSecondary: isDark ? "bg-white/5" : "bg-zinc-50",
    bgHover: isDark ? "hover:bg-white/10" : "hover:bg-zinc-100",
    bgHoverLight: isDark ? "hover:bg-white/5" : "hover:bg-zinc-100",
    bgActive: isDark ? "bg-white/10" : "bg-zinc-100",
    bgActiveBox: isDark ? "bg-white/10" : "bg-white",

    /* border */
    borderPrimary: isDark ? "border-white/10" : "border-zinc-200",
    borderSecondary: isDark ? "border-white/15" : "border-zinc-300",

    /* button */
    btnGhost: isDark
      ? "text-zinc-300 hover:bg-white/10 hover:text-white"
      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
    btnPrimary: isDark
      ? "bg-white text-zinc-950 hover:bg-zinc-100"
      : "bg-zinc-950 text-white hover:bg-zinc-800",
    btnOutline: isDark
      ? "border-white/10 text-zinc-300 hover:bg-white/5"
      : "border-zinc-200 text-zinc-700 hover:bg-zinc-100",

    /* dropdown */
    dropdownBg: isDark ? "bg-zinc-950/95" : "bg-white/95",
    dropdownBorder: isDark ? "border-white/10" : "border-zinc-200/80",
    dropdownShadow: "shadow-[0_24px_80px_-30px_rgba(0,0,0,0.35)]",

    /* mobile menu bg */
    mobileBg: isDark ? "bg-zinc-950/95" : "bg-white/95",
    mobileBorder: isDark ? "border-white/10" : "border-zinc-200/80",

    /* icon box */
    iconBoxBorder: isDark ? "border-white/10" : "border-zinc-200",
    iconBoxBg: isDark ? "bg-white/5" : "bg-zinc-50",
    iconBoxText: isDark ? "text-zinc-400" : "text-zinc-500",
    iconBoxActiveBorder: isDark ? "border-white/15" : "border-zinc-300",
    iconBoxActiveBg: isDark ? "bg-white/10" : "bg-white",
    iconBoxActiveText: isDark ? "text-white" : "text-zinc-950",

    /* featured card */
    featuredBg: isDark ? "bg-white" : "bg-zinc-950",
    featuredText: isDark ? "text-zinc-950" : "text-white",
    featuredMuted: isDark ? "text-zinc-600" : "text-zinc-400",
    featuredLabel: isDark ? "text-zinc-500" : "text-zinc-400",
    featuredIconBg: isDark ? "bg-zinc-950/10" : "bg-white/10",
    featuredIconText: isDark ? "text-zinc-950" : "text-white",

    /* logo */
    logoBg: isDark ? "bg-white" : "bg-zinc-950",
    logoText: isDark ? "text-zinc-950" : "text-white",
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 backdrop-blur-xl",
            t.shellBorder,
            t.shellBg,
            t.shellShadow,
          )}
        >
          {/* =========================================================
              LOGO
          ========================================================= */}
          <Link
            href="/"
            aria-label="Miralas home"
            className="group flex shrink-0 items-center gap-3"
            onClick={() => {
              setDesktopOpen(null);
              setMobileOpen(false);
              setMobileSection(null);
            }}
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-zinc-950/15 transition-transform duration-300 group-hover:scale-105",
                t.logoBg,
                t.logoText,
              )}
            >
              <Image
                src="/logo.png"
                alt="Miralas Logo"
                width={36}
                height={36}
                priority
                className="size-full object-contain"
              />
            </span>

            <span
              className={cn(
                "text-base font-semibold tracking-tight",
                t.textPrimary,
              )}
            >
              Miralas
            </span>
          </Link>

          {/* =========================================================
              DESKTOP NAVIGATION
          ========================================================= */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const hasChildren = Boolean(item.items?.length);
              const isOpen = desktopOpen === item.label;
              const active = isPathActive(item.href) || hasActiveChild(item);

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasChildren) {
                      setDesktopOpen(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    setDesktopOpen(null);
                  }}
                >
                  {/* Main nav button/link */}
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      if (hasChildren) {
                        event.preventDefault();

                        setDesktopOpen((current) =>
                          current === item.label ? null : item.label,
                        );
                      } else {
                        setDesktopOpen(null);
                      }
                    }}
                    className={cn(
                      "relative inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors",
                      active || isOpen
                        ? t.textPrimary
                        : cn(t.textSecondary, t.hoverText),
                    )}
                  >
                    {item.label}

                    {hasChildren && (
                      <motion.span
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="flex"
                      >
                        <ChevronDown className="size-3.5 opacity-45" />
                      </motion.span>
                    )}

                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 transition-transform duration-300",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>

                  {/* ===================================================
                      DESKTOP DROPDOWN
                  =================================================== */}
                  <AnimatePresence>
                    {hasChildren && isOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 6,
                          scale: 0.98,
                        }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-1/2 top-full z-50 w-[350px] -translate-x-1/2 pt-3"
                      >
                        <div
                          className={cn(
                            "overflow-hidden rounded-[22px] p-2 backdrop-blur-2xl",
                            t.dropdownBg,
                            t.dropdownBorder,
                            t.dropdownShadow,
                          )}
                        >
                          {/* Dropdown header */}
                          <div className="px-3 pb-2 pt-2">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p
                                  className={cn(
                                    "text-sm font-semibold",
                                    t.textPrimary,
                                  )}
                                >
                                  {item.label}
                                </p>

                                {item.description && (
                                  <p
                                    className={cn(
                                      "mt-0.5 text-xs",
                                      t.textMuted,
                                    )}
                                  >
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <Link
                                href={item.href}
                                onClick={() => setDesktopOpen(null)}
                                className={cn(
                                  "group flex size-8 shrink-0 items-center justify-center rounded-full border transition",
                                  t.iconBoxBorder,
                                  t.iconBoxBg,
                                  t.iconBoxText,
                                  t.bgHoverLight,
                                  isDark
                                    ? "hover:text-white"
                                    : "hover:text-zinc-950",
                                )}
                                aria-label={`Open ${item.label}`}
                              >
                                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </Link>
                            </div>
                          </div>

                          <div className="space-y-1">
                            {item.items?.map((subItem, index) => {
                              const activeSub = isPathActive(subItem.href);

                              return (
                                <motion.div
                                  key={subItem.href}
                                  initial={{
                                    opacity: 0,
                                    y: 4,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  transition={{
                                    delay: index * 0.025,
                                    duration: 0.18,
                                  }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={() => setDesktopOpen(null)}
                                    className={cn(
                                      "group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                                      activeSub ? t.bgActive : t.bgHoverLight,
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                        activeSub
                                          ? cn(
                                            t.iconBoxActiveBorder,
                                            t.iconBoxActiveBg,
                                            t.iconBoxActiveText,
                                          )
                                          : cn(
                                            t.iconBoxBorder,
                                            t.iconBoxBg,
                                            t.iconBoxText,
                                          ),
                                      )}
                                    >
                                      <ChevronRight
                                        className={cn(
                                          "size-3.5 transition-transform",
                                          activeSub
                                            ? "translate-x-0.5"
                                            : "group-hover:translate-x-0.5",
                                        )}
                                      />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                      <span
                                        className={cn(
                                          "block text-sm font-medium",
                                          t.textPrimary,
                                        )}
                                      >
                                        {subItem.label}
                                      </span>

                                      {subItem.description && (
                                        <span
                                          className={cn(
                                            "mt-0.5 block truncate text-xs leading-5",
                                            t.textMuted,
                                          )}
                                        >
                                          {subItem.description}
                                        </span>
                                      )}
                                    </span>

                                    <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-50" />
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* =========================================================
              DESKTOP ACTIONS
          ========================================================= */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="https://console.miralas/auth"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition",
                t.btnGhost,
              )}
            >
              Sign In
            </Link>

            <Link
              href="https://console.miralas/auth"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-semibold shadow-lg shadow-zinc-950/15 transition hover:-translate-y-0.5",
                t.btnPrimary,
              )}
            >
              Get Started
            </Link>
          </div>

          {/* =========================================================
              MOBILE MENU BUTTON
          ========================================================= */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((current) => !current);
              setDesktopOpen(null);
            }}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border shadow-sm backdrop-blur lg:hidden",
              t.borderPrimary,
              isDark ? "bg-white/5 text-white" : "bg-white/80 text-zinc-900",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.8,
                  }}
                  className="flex"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.8,
                  }}
                  className="flex"
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ===========================================================
            MOBILE MENU
        =========================================================== */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.98,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "mt-2 overflow-hidden rounded-[24px] p-2 backdrop-blur-2xl lg:hidden",
                t.mobileBg,
                t.mobileBorder,
                "shadow-[0_24px_90px_-35px_rgba(0,0,0,0.35)]",
              )}
            >
              <div className="max-h-[calc(100dvh-110px)] overflow-y-auto">
                {/* Mobile main navigation */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const hasChildren = Boolean(item.items?.length);
                    const expanded = mobileSection === item.label;
                    const active =
                      isPathActive(item.href) || hasActiveChild(item);

                    return (
                      <div key={item.href}>
                        <div
                          className={cn(
                            "flex items-center rounded-xl transition-colors",
                            active ? t.bgActive : t.bgHoverLight,
                          )}
                        >
                          {/* Main link */}
                          <Link
                            href={item.href}
                            onClick={() => {
                              if (!hasChildren) {
                                handleMobileLink();
                              }
                            }}
                            className="min-w-0 flex-1 px-3 py-3.5"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  t.textPrimary,
                                )}
                              >
                                {item.label}
                              </span>

                              {active && (
                                <span
                                  className={cn(
                                    "size-1.5 rounded-full",
                                    isDark ? "bg-white" : "bg-zinc-950",
                                  )}
                                />
                              )}
                            </span>
                          </Link>

                          {/* Expand button */}
                          {hasChildren && (
                            <button
                              type="button"
                              aria-label={`Toggle ${item.label}`}
                              aria-expanded={expanded}
                              onClick={() =>
                                toggleMobileSection(item.label)
                              }
                              className={cn(
                                "mr-1 flex size-10 items-center justify-center rounded-lg transition",
                                t.iconBoxText,
                                isDark
                                  ? "hover:bg-white/10 hover:text-white"
                                  : "hover:bg-zinc-200/70 hover:text-zinc-950",
                              )}
                            >
                              <motion.span
                                animate={{
                                  rotate: expanded ? 180 : 0,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                                className="flex"
                              >
                                <ChevronDown className="size-4" />
                              </motion.span>
                            </button>
                          )}
                        </div>

                        {/* Mobile children */}
                        <AnimatePresence initial={false}>
                          {hasChildren && expanded && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div
                                className={cn(
                                  "ml-3 mr-1 border-l py-1 pl-3",
                                  t.borderPrimary,
                                )}
                              >
                                {item.items?.map((subItem) => {
                                  const activeSub = isPathActive(
                                    subItem.href,
                                  );

                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={handleMobileLink}
                                      className={cn(
                                        "group flex items-center gap-3 rounded-xl px-3 py-3 transition",
                                        activeSub
                                          ? t.bgActive
                                          : t.bgHoverLight,
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "flex size-7 shrink-0 items-center justify-center rounded-lg border",
                                          activeSub
                                            ? cn(
                                              t.iconBoxActiveBorder,
                                              t.iconBoxActiveBg,
                                              t.iconBoxActiveText,
                                            )
                                            : cn(
                                              t.iconBoxBorder,
                                              t.iconBoxBg,
                                              t.iconBoxText,
                                            ),
                                        )}
                                      >
                                        <ChevronRight className="size-3" />
                                      </span>

                                      <span className="min-w-0 flex-1">
                                        <span
                                          className={cn(
                                            "block text-sm font-medium",
                                            t.textPrimary,
                                          )}
                                        >
                                          {subItem.label}
                                        </span>

                                        {subItem.description && (
                                          <span
                                            className={cn(
                                              "mt-0.5 block text-xs leading-5",
                                              t.textMuted,
                                            )}
                                          >
                                            {subItem.description}
                                          </span>
                                        )}
                                      </span>

                                      <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-40" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile footer actions */}
                <div
                  className={cn(
                    "mt-2 border-t px-2 pt-3",
                    t.borderPrimary,
                  )}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="https://console.miralas/auth"
                      onClick={handleMobileLink}
                      className={cn(
                        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition",
                        t.btnOutline,
                      )}
                    >
                      Sign In
                    </Link>

                    <Link
                      href="https://console.miralas/auth"
                      onClick={handleMobileLink}
                      className={cn(
                        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition hover:bg-zinc-800",
                        t.btnPrimary,
                      )}
                    >
                      Get Started
                    </Link>
                  </div>

                  {/* Featured Studio */}
                  <Link
                    href="/studio"
                    onClick={handleMobileLink}
                    className={cn(
                      "group relative mt-3 block overflow-hidden rounded-2xl p-4",
                      t.featuredBg,
                    )}
                  >
                    <div className="absolute -right-10 -top-10 size-24 rounded-full bg-indigo-500/20 blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-lg",
                            t.featuredIconBg,
                            t.featuredIconText,
                          )}
                        >
                          <Mic2 className="size-3.5" />
                        </span>

                        <span
                          className={cn(
                            "text-[10px] font-semibold uppercase tracking-[0.16em]",
                            t.featuredLabel,
                          )}
                        >
                          Miralas Studio
                        </span>
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                          <p
                            className={cn(
                              "text-sm font-semibold",
                              t.featuredText,
                            )}
                          >
                            Create with your voice.
                          </p>

                          <p
                            className={cn(
                              "mt-1 text-xs leading-5",
                              t.featuredMuted,
                            )}
                          >
                            Voice Clone, TTS and more in one workspace.
                          </p>
                        </div>

                        <ArrowUpRight
                          className={cn(
                            "size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                            t.featuredText,
                          )}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
