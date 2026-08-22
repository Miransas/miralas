"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
  type TablerIcon,
} from "@tabler/icons-react";

// ─── TIP TANIMLAMALARI ────────────────────────────────────────────────────────
type FooterLink = {
  label: string;
  href: string;
  icon?: TablerIcon;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

// ─── FOOTER VERILERI ──────────────────────────────────────────────────────────
const footerSections: FooterSection[] = [

  {
    title: "Resources",
    links: [
      {
        label: "Documentation",
        href: "/resources/guides",
      },
      {
        label: "Guides",
        href: "/resources/guides",
      },
      {
        label: "Changelog",
        href: "/resources/changelog",
      },
      {
        label: "Support",
        href: "/resources/support",
      },
      {
        label: "Contact Sales",
        href: "/resources/help-center",
      },
      {
        label: "Media",
        href: "/resources/media",
      },
    ],
  },
  {
    title: "Prducts",
    links: [
      { label: "Home", href: "/" },
      { label: "API", href: "/products/api" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/resources/help-center" },
       { label: "Streamers", href: "/resources/donate" },
    ],
  },

  {
    title: "Studio",
    links: [
      {
        label: "Text to Speech",
        href: "/studio/tts",

      },
      {
        label: "Voice Clone",
        href: "/studio/voice-clone",

      },
      {
        label: "Models",
        href: "/studio/models",

      },
    ],
  },
  {
    title: "Enterprise",
    links: [
      {
        label: "Security",
        href: "https://privacy.miransas.com/miralas/security",
      },
      {
        label: "Miralas Terms",
        href: "https://privacy.miransas.com/miralas/terms",
      },
      {
        label: "Cookie Policy",
        href: "https://privacy.miransas.com/miralas/cookie",
      },

    ],
  },
  {
    title: "Dashboards",
    links: [
      {
        label: "Voice Clone",
        href: "https://console.miralas.io/voice-clone",
      },
      {
        label: "Generate",
        href: "https://console.miralas.io/generate",
      },
      {
        label: "Strear Donate",
        href: "https://console.miralas.io/donate",
      },
       {
        label: "Your Projects",
        href: "https://console.miralas.io/projects",
      },

    ],
  },

  {
    title: "Social Media",
    links: [
      { label: "Instagram", href: "https://instagram.com/miralasio", icon: IconBrandInstagram },
      { label: "Twitter", href: "https://twitter.com/miransaas", icon: IconBrandX },
      { label: "GitHub", href: "https://github.com/miransas", icon: IconBrandGithub },
      { label: "GitHub", href: "https://t.me/typesn", icon: IconBrandTelegram },

    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer className="relative w-full bg-[#0a0a0c] font-sans overflow-hidden">

      <div
        className="relative w-full min-h-[420px] flex flex-col justify-end pb-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #4a0e2e 0%, #1a0b1a 35%, #0a0a0c 70%)",
        }}
      >
        {/* Ekstra glow layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(236,72,153,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Yatay cizgi */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

        {/* Dev yazı */}
        <div className="w-full flex justify-center items-end relative z-10 translate-y-10 sm:translate-y-14">
          <h1
            className="text-[16vw] sm:text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text select-none pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, rgba(10,10,12,0) 100%)",
            }}
          >
            Miransas
          </h1>
        </div>
      </div>

      {/* ================================================
          ALT KISIM: Newsletter + Linkler
          ================================================ */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10 bg-[#0a0a0c]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">
          {/* Sol: Newsletter */}
          <div className="flex-1 lg:max-w-md">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0a0a0c]">
               <img src="/logo.png" alt="" />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                Miransas
              </span>
            </Link>

            <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
              Subscribe to our newsletter for the latest updates on voice AI,
              new features, and developer tips.
            </p>

            <form
              className="relative flex items-center max-w-sm mt-5"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#1a1a1e] border border-neutral-800 focus:border-pink-500/50 text-neutral-200 text-sm rounded-full py-3.5 pl-5 pr-28 outline-none transition-all placeholder:text-neutral-600"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-neutral-200 text-black text-sm font-medium rounded-full px-5 py-2 hover:bg-white transition-colors"
              >
                {submitted ? "Sent!" : "Submit"}
              </button>
            </form>
          </div>

          {/* Sag: Linkler */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 pt-2">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium text-white mb-5 text-sm">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3.5 text-sm text-neutral-500">
                  {section.links.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        target={link.icon ? "_blank" : "_self"}
                        rel={link.icon ? "noopener noreferrer" : ""}
                        className="flex items-center gap-2 hover:text-neutral-200 transition-colors group"
                      >
                        {link.icon && (
                          <link.icon className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                        )}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Alt cizgi + copyright */}
        <div className="pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; 2024-{new Date().getFullYear()} Miransas. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  );
}
