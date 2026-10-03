/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { HEADER_NAV_ITEMS, HEADER_LINKS, HeaderNavItem } from "@/constants/navbar";
import { ModeToggle } from "../providers/mode-toggle";

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileAccordion, setExpandedMobileAccordion] = useState<string | null>(null);

  const toggleMobileAccordion = (label: string) => {
    setExpandedMobileAccordion((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">

        {/* LOGO & DESKTOP NAV */}
        <div className="flex items-center gap-8">
          <Link href={HEADER_LINKS.home} className="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus:outline-none">
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
              const hasSubItems = Boolean(item.items && item.items.length > 0);
              const isLargeMenu = (item.items?.length || 0) > 4;

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
                        flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 focus:outline-none
                        ${
                          activeDropdown === item.label
                            ? "bg-card text-foreground  shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
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
                      className="inline-block rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-card/50 focus:outline-none"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* DESKTOP DROPDOWN / MEGA-MENU */}
                  <AnimatePresence>
                    {hasSubItems && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={`absolute left-0 top-full pt-2 z-50 ${
                          isLargeMenu ? "w-[520px]" : "w-80"
                        }`}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl p-3 shadow-2xl">
                          {item.description && (
                            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 border-b border-border/40 mb-2">
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
                                className="group flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-muted/50 focus:outline-none"
                              >
                                <span className="text-xs font-medium text-foreground group-hover:text-[#c9a87c] transition-colors flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    {subItem.label}
                                    {subItem.target === "_blank" && (
                                      <ExternalLink className="size-3 text-muted-foreground/60" />
                                    )}
                                  </span>
                                  {subItem.badge ? (
                                    <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-full bg-[#c9a87c]/15 text-[#c9a87c] border border-[#c9a87c]/30">
                                      {subItem.badge}
                                    </span>
                                  ) : (
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                                  )}
                                </span>
                                {subItem.description && (
                                  <span className="text-[11px] font-light text-muted-foreground/80 leading-relaxed line-clamp-2">
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
          <ModeToggle />
          <a
            href={HEADER_LINKS.consoleAuth}
            className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
          >
            Sign In
          </a>

          <Link
            href={HEADER_LINKS.studio}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-all duration-200 hover:opacity-90 shadow-md focus:outline-none"
          >
            <Sparkles className="size-3.5" />
            <span>Open Studio</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU ACCORDION PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6 max-h-[80vh] overflow-y-auto">
              {HEADER_NAV_ITEMS.map((item) => {
                const hasSubItems = Boolean(item.items && item.items.length > 0);
                const isExpanded = expandedMobileAccordion === item.label;

                return (
                  <div key={item.label} className="border-b border-border/30 last:border-none">
                    {hasSubItems ? (
                      <div>
                        {/* Accordion Başlığı */}
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.label)}
                          className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors focus:outline-none"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`size-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-foreground" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion İçeriği (Titremesiz Temiz Yapı) */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 pt-1 pb-3 flex flex-col gap-1 border-l border-border/40 my-1">
                                {item.items?.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    target={sub.target}
                                    rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-light text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors focus:outline-none"
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium text-foreground">{sub.label}</span>
                                      {sub.description && (
                                        <span className="text-[10px] text-muted-foreground/70">{sub.description}</span>
                                      )}
                                    </div>
                                    {sub.badge && (
                                      <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-[#c9a87c]/15 text-[#c9a87c]">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors focus:outline-none"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Mobil Aksiyon Butonları */}
              <div className="pt-6 flex flex-col gap-2">
                <a
                  href={HEADER_LINKS.consoleAuth}
                  className="w-full text-center rounded-full border border-border/60 py-3 text-xs font-medium text-foreground hover:bg-card transition-colors focus:outline-none"
                >
                  Sign In
                </a>
                <Link
                  href={HEADER_LINKS.studio}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-full bg-foreground py-3 text-xs font-medium text-background hover:opacity-90 transition-opacity shadow-md focus:outline-none"
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