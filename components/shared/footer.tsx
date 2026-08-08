/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { GrainGradient } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Laser from "./laser";

type FooterLink = {
  title: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  title: string;
  href: string;
  icon: IconType;
};

/* =========================================================
   FOOTER DATA
   ========================================================= */

export const footer = {
  description:
    "Miransas builds modern developer infrastructure for authentication, databases, cloud networking, AI services and open-source tools focused on performance, reliability and developer experience.",

  columns: [
    {
      title: "Miralas",
      links: [
        { title: "Home", href: "https://miralas.com" },
        { title: "Products", href: "https://miralas.com/products" },
        { title: "Solutions", href: "https://miralas.com/solutions" },
        { title: "Pricing", href: "https://miralas.com/pricing" },
        { title: "Developers", href: "https://miralas.com/developer" },
        { title: "Contact", href: "https://miralas.com/contact" },
      ],
    },

    {
      title: "Miransas",
      links: [
        { title: "Miransas Cloud", href: "https://miransas.com/cloud" },
        { title: "Miransas ID", href: "https://miransas.com/id" },
        { title: "Miransas DB", href: "https://miransas.com/db" },
        { title: "Miransas VPN", href: "https://miransas.com/vpn" },
        { title: "Miransas Net", href: "https://miransas.com/net" },
        { title: "All Products", href: "https://miransas.com/products" },
      ],
    },

    {
      title: "Developers",
      links: [
        { title: "Documentation", href: "https://docs.miransas.com" },
        { title: "API Reference", href: "https://docs.miransas.com/api" },
        { title: "Status", href: "https://status.miransas.com" },
        { title: "GitHub", href: "https://github.com/miransas" },
        { title: "Changelog", href: "https://changelog.miransas.com" },
      ],
    },

    {
      title: "Resources",
      links: [
        { title: "Blog", href: "https://blog.miransas.com" },
        { title: "Guides", href: "https://guides.miransas.com" },
        { title: "Support", href: "https://support.miransas.com" },
        { title: "Community", href: "https://community.miransas.com" },
        { title: "Contact", href: "https://miransas.com/contact" },
      ],
    },

    {
      title: "Company",
      links: [
        { title: "About Miransas", href: "https://about.miransas.com" },
        { title: "Careers", href: "https://careers.miransas.com" },
        { title: "Privacy", href: "https://privacy.miransas.com" },
        { title: "Terms", href: "https://terms.miransas.com" },
        { title: "Security", href: "https://security.miransas.com" },
      ],
    },
  ] satisfies FooterColumn[],

  socials: [
    {
      title: "GitHub",
      href: "https://github.com/miransas",
      icon: FaGithub,
    },
    {
      title: "X",
      href: "https://x.com/miransas",
      icon: FaTwitter,
    },
    {
      title: "Discord",
      href: "https://discord.gg/miransas",
      icon: FaDiscord,
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com/company/miransas",
      icon: FaLinkedin,
    },
    {
      title: "YouTube",
      href: "https://youtube.com/@miransas",
      icon: FaYoutube,
    },
  ] satisfies SocialLink[],
};

/* =========================================================
   FOOTER
   ========================================================= */

export default function Footer() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background">
      {/* =====================================================
          BACKGROUND SYSTEM
          ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        {/* Grain shader */}

        <div className="absolute inset-0 opacity-[0.22] transition-opacity duration-700 dark:opacity-[0.18]">
          <GrainGradient
            style={{
              width: "100%",
              height: "100%",
            }}
            colorBack={
              isDark
                ? "hsl(0, 0%, 5%)"
                : "hsl(0, 0%, 98%)"
            }
            colors={
              isDark
                ? [
                    "hsl(193, 75%, 48%)",
                    "hsl(196, 80%, 62%)",
                    "hsl(195, 85%, 38%)",
                  ]
                : [
                    "hsl(193, 55%, 78%)",
                    "hsl(196, 65%, 84%)",
                    "hsl(195, 60%, 72%)",
                  ]
            }
            softness={0.9}
            intensity={isDark ? 0.18 : 0.12}
            noise={0}
            shape="corners"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={0}
            speed={0.32}
          />
        </div>

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_top,
              transparent_0%,
              rgba(0,0,0,0.025)_48%,
              rgba(0,0,0,0.12)_100%
            )]
            dark:bg-[radial-gradient(
              ellipse_at_top,
              rgba(255,255,255,0.015)_0%,
              transparent_42%,
              rgba(0,0,0,0.35)_100%
            )]
          "
        />

        {/* Top ambient glow */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-72
            w-[70%]
            -translate-x-1/2
            rounded-full
            bg-sky-400/[0.045]
            blur-[100px]
            dark:bg-sky-400/[0.055]
          "
        />
      </div>

      {/* =====================================================
          LASER
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-[0.16]
          dark:opacity-[0.20]
        "
      >
        <Laser
          className="absolute inset-0 h-full w-full"
          color={
            isDark
              ? [0.08, 0.48, 0.85]
              : [0.08, 0.35, 0.65]
          }
          speed={0.22}
          offset={40}
          width={0.45}
          reveal={320}
          glow={1.15}
          radius={18}
          wave={7}
          thickness={5}
          core={0.7}
        />
      </div>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          pb-14
          pt-20
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-16
            lg:grid-cols-12
            lg:gap-12
          "
        >
          {/* =================================================
              BRAND
              ================================================= */}

          <div className="lg:col-span-3">
            <Link
              href="https://miransas.com"
              aria-label="Miransas home"
              className="group flex w-fit items-center gap-3"
            >
              <div
                className="
                  relative
                  flex
                  size-10
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[12px]
                  border
                  border-border
                  bg-card/80
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:border-border-strong
                  group-hover:shadow-md
                "
              >
                <Image
                  src="/miransas_assets/icon.png"
                  alt="Miransas"
                  width={25}
                  height={25}
                  className="relative z-10"
                />
              </div>

              <span
                className="
                  text-xl
                  font-semibold
                  tracking-[-0.035em]
                "
              >
                Miransas
              </span>
            </Link>

            <p
              className="
                mt-6
                max-w-sm
                text-[14px]
                leading-7
                text-muted-foreground
              "
            >
              {footer.description}
            </p>

            {/* Socials */}

            <div className="mt-7 flex items-center gap-2">
              {footer.socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    className="
                      group
                      flex
                      size-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border
                      bg-card/75
                      text-muted-foreground
                      backdrop-blur-xl
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-border-strong
                      hover:bg-muted
                      hover:text-foreground
                    "
                  >
                    <Icon
                      className="
                        size-4
                        transition-transform
                        duration-200
                        group-hover:scale-105
                      "
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA */}

            <div className="mt-7">
              <a
                href="https://miralas.com/get-started"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  bg-foreground
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-background
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:opacity-90
                  hover:shadow-lg
                  active:scale-[0.98]
                "
              >
                <span>Start building free</span>

                <span
                  className="
                    text-background/50
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              gap-x-8
              gap-y-12
              sm:grid-cols-3
              lg:col-span-9
              lg:grid-cols-5
            "
          >
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-foreground
                  "
                >
                  {column.title}
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");

                    return (
                      <li key={link.title}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group
                              inline-flex
                              items-center
                              gap-1.5
                              text-[14px]
                              font-medium
                              text-muted-foreground
                              transition-all
                              duration-200
                              hover:translate-x-0.5
                              hover:text-foreground
                            "
                          >
                            {link.title}

                            <span
                              className="
                                text-[10px]
                                text-muted-foreground/40
                                opacity-0
                                transition-all
                                duration-200
                                group-hover:translate-x-0.5
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="
                              group
                              inline-flex
                              items-center
                              gap-1.5
                              text-[14px]
                              font-medium
                              text-muted-foreground
                              transition-all
                              duration-200
                              hover:translate-x-0.5
                              hover:text-foreground
                            "
                          >
                            {link.title}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            LARGE BRAND MARK
            =================================================== */}

        <div
          className="
            relative
            mt-20
            overflow-hidden
            border-t
            border-border
            pt-14
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-8
              h-32
              w-1/2
              -translate-x-1/2
              rounded-full
              bg-sky-500/[0.035]
              blur-3xl
              dark:bg-sky-400/[0.045]
            "
          />

          <div
            className="
              relative
              select-none
              text-center
              text-[18vw]
              font-semibold
              leading-[0.72]
              tracking-[-0.075em]
              text-foreground/[0.035]
              sm:text-[15vw]
              lg:text-[13vw]
            "
            aria-hidden="true"
          >
            miransas
          </div>
        </div>

        {/* ===================================================
            BOTTOM BAR
            =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-t
            border-border
            pt-6
            text-xs
            font-medium
            text-muted-foreground
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} Miransas.
              All rights reserved.
            </p>

            <span
              aria-hidden="true"
              className="hidden text-muted-foreground/30 sm:inline"
            >
              •
            </span>

            <a
              href="https://privacy.miransas.com"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </a>

            <a
              href="https://terms.miransas.com"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </a>
          </div>

          {/* Status */}

          <a
            href="https://status.miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-border
              bg-card/80
              px-3.5
              py-2
              backdrop-blur-sm
              transition-all
              duration-200
              hover:border-emerald-500/25
              hover:bg-card
            "
          >
            <span className="relative flex size-2">
              <span
                className="
                  absolute
                  inline-flex
                  size-full
                  animate-ping
                  rounded-full
                  bg-emerald-400/50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  size-2
                  rounded-full
                  bg-emerald-500
                "
              />
            </span>

            <span className="text-foreground/70 transition-colors group-hover:text-foreground">
              All systems operational
            </span>

            <span
              className="
                text-[10px]
                text-muted-foreground/40
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}