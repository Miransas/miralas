/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2, Menu, Mic2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/providers/mode-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Products", href: "/products", preview: "Voice AI, cloning, API and donations." },
  { label: "Solutions", href: "/solutions", preview: "Workflows for teams, creators and education." },
  { label: "Customers", href: "/customers", preview: "Stories from teams building in Uzbekistan." },
  { label: "Resources", href: "/resources", preview: "Docs, guides, changelog and support." },
  { label: "Enterprise", href: "/enterprise", preview: "Security, deployment and dedicated support." },
  { label: "Pricing", href: "/pricing", preview: "Simple plans for every stage." },
];

function LanguageSwitcher() {
  return (
    <button
      type="button"
      aria-label="Change language"
      className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
    >
      <Globe2 className="size-4" />
      <span>UZ</span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300",
          scrolled
            ? "border border-zinc-200/70 bg-white/78 shadow-[0_18px_60px_-36px_rgba(24,24,27,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Miralas home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 transition group-hover:scale-105 dark:bg-white dark:text-zinc-950">
            <img src="/logo.png" alt="Miralas Logo" className=" object-contain rounded-lg" />
          </span>
          <span className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
            Miralas
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                  )}
                >
                  {item.label}
                  {/* <ChevronDown className="size-3 opacity-45 transition group-hover:rotate-180 group-hover:opacity-80" /> */}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full hidden w-64 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:block group-hover:opacity-100">
                  <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 text-sm text-zinc-600 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90 dark:text-zinc-300">
                    <p className="font-medium text-zinc-950 dark:text-white">{item.label}</p>
                    <p className="mt-1 leading-6">{item.preview}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* <LanguageSwitcher /> */}
          {/* <ModeToggle /> */}
          <Link href="https://console.miralas/auth" className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white">
            Sign In
          </Link>
          <Link href="https://console.miralas/auth" className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100">
            Get Started
          </Link>
        </div>

         <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white/75 text-zinc-900 shadow-sm backdrop-blur lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button> 
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-zinc-200/80 bg-white/92 p-3 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-zinc-950/92"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-3 dark:border-white/10">
              <LanguageSwitcher />
              <ModeToggle />
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200 px-4 text-sm font-medium text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                Sign In
              </Link>
              <Link href="/get-started" onClick={() => setMobileOpen(false)} className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
