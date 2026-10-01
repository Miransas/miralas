/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { HEADER_NAV_ITEMS, HEADER_LINKS, HeaderNavItem } from "@/constants/navbar";
import { ModeToggle } from "../providers/mode-toggle";

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">

        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href={HEADER_LINKS.home} className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex size-8 items-center justify-center rounded-xl bg-foreground p-1.5 text-background shadow-sm">
              <img
                src="/logo.png"
                alt="Miralas Logo"
                className="size-full object-contain filter invert dark:invert-0"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Miralas
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1">
            {HEADER_NAV_ITEMS.map((item: HeaderNavItem) => {
              const hasSubItems = item.items && item.items.length > 0;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasSubItems && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {hasSubItems ? (
                    <button
                      type="button"
                      className={`
                        flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors
                        ${
                          activeDropdown === item.label
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180 text-foreground" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-block rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* DROPDOWN MENU */}
                  <AnimatePresence>
                    {hasSubItems && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-2 w-80 z-50"
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                          {item.description && (
                            <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground/80 border-b border-border/40 mb-1">
                              {item.description}
                            </div>
                          )}
                          <div className="flex flex-col gap-0.5">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="group flex flex-col gap-0.5 rounded-xl p-2.5 transition-colors hover:bg-accent"
                              >
                                <span className="text-sm font-medium text-foreground group-hover:text-primary flex items-center justify-between">
                                  {subItem.label}
                                  <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                                </span>
                                {subItem.description && (
                                  <span className="text-xs text-muted-foreground leading-snug line-clamp-1">
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

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle/>
          <a
            href={HEADER_LINKS.consoleAuth}
            className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </a>

          <Link
            href={HEADER_LINKS.studio}
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 shadow-sm"
          >
            <Sparkles className="size-3.5" />
            <span>Open Studio</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6 max-h-[80vh] overflow-y-auto">
              {HEADER_NAV_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
                    {item.label}
                  </div>
                  {item.items ? (
                    <div className="flex flex-col gap-1 pl-2 border-l border-border/60">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-1.5 text-sm font-medium text-foreground hover:text-muted-foreground"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-foreground hover:text-muted-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                <a
                  href={HEADER_LINKS.consoleAuth}
                  className="w-full text-center rounded-xl border border-border py-2.5 text-sm font-medium text-foreground"
                >
                  Sign In
                </a>
                <Link
                  href={HEADER_LINKS.studio}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-foreground py-2.5 text-sm font-medium text-background"
                >
                  Open Studio
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
