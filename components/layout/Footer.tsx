"use client"
import React from "react";
import { Laser } from "../shared/laser";
import { useTheme } from "next-themes";
import { StarsBackground } from "../animate-ui/components/backgrounds/stars";
import { cn } from "../../lib/utils";
import { 
  ArrowRight, 
  Mail, 
  Sparkles,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";

// ─── SUBSCRIBE BUTTON WITH HOVER EFFECT ──────────────────────
function SubscribeButton() {
  return (
    <button
      type="submit"
      className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] shrink-0"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        Subscribe
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

// ─── FOOTER LINK ITEM ────────────────────────────────────────
function FooterLink({ 
  href, 
  children, 
  isNew = false,
  external = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  isNew?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-1.5 text-[13px] font-medium text-white/35 transition-all duration-300 hover:text-white/80"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
      </span>
      {isNew && (
        <span className="ml-1 rounded-full bg-white/10 px-2 py-[1px] text-[9px] font-bold uppercase tracking-wider text-white/70 border border-white/10">
          New
        </span>
      )}
      {external && (
        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      )}
    </a>
  );
}

// ─── SOCIAL ICON ─────────────────────────────────────────────
function SocialIcon({ 
  href, 
  children, 
  label 
}: { 
  href: string; 
  children: React.ReactNode; 
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white/30 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/70 hover:scale-110"
    >
      {children}
    </a>
  );
}

// ─── MAIN FOOTER ─────────────────────────────────────────────
export default function Footer() {
  const { resolvedTheme } = useTheme();

  type FooterLinkData = {
    name: string;
    href: string;
    isNew?: boolean;
    external?: boolean;
  };

  const footerLinks: { category: string; links: FooterLinkData[] }[] = [
    {
      category: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Solutions", href: "/solutions" },
        { name: "Blog", href: "https://blog.miransas.com", external: true },
      ],
    },
    {
      category: "Platform",
      links: [
        { name: "Pricing", href: "/pricing" },
        { name: "Voice Clone", href: "/" },
        { name: "Live Interviews", href: "/", isNew: true },
        { name: "Session Replay", href: "/" },
        { name: "Surveys", href: "#" },
      ],
    },
    {
      category: "Resources",
      links: [
        { name: "Field Guides", href: "/" },
        { name: "Research Library", href: "/" },
        { name: "Events", href: "/" },
        { name: "Templates", href: "/" },
        { name: "Help Center", href: "/" },
      ],
    },
    {
      category: "Use Cases",
      links: [
        { name: "Validate Concepts", href: "/" },
        { name: "Test Navigation", href: "/" },
        { name: "Measure Sentiment", href: "/" },
        { name: "Benchmark Journeys", href: "/" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-background text-white font-sans">

      {/* ════════════════════════════════════════════
          BACKGROUND LAYERS
          ════════════════════════════════════════════ */}

      {/* Stars */}
      <StarsBackground
        starColor={resolvedTheme === 'dark' ? '#ffffff' : '#ffffff'}
        className={cn(
          'absolute inset-0 pointer-events-none z-0 opacity-40',
          'bg-[radial-gradient(ellipse_at_bottom,_#0f0f1a_0%,_#0a0a0f_60%)]',
        )}
      />

      {/* Laser effect */}
      <Laser
        className="absolute inset-0 z-0 w-full pointer-events-none opacity-30"
        color={[0.05, 0.35, 1]}
        speed={0.35}
        offset={40}
        width={0.7}
        reveal={420}
        glow={2.6}
        radius={22}
        wave={10}
        thickness={7}
        core={1.1}
      />

      {/* Subtle top gradient fade from main content */}
      {/* <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent z-[1] pointer-events-none" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-purple-900/[0.04] blur-[120px]" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-8 sm:px-10 lg:px-16">

        {/* ─── TOP SECTION: Links + Newsletter ─── */}
        <div className="flex flex-col xl:flex-row justify-between gap-16 lg:gap-24 mb-20">

          {/* Left: Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 xl:gap-14 w-full max-w-3xl">
            {footerLinks.map((column, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Category Label — subtle, not a harsh black box */}
                <span className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  {column.category}
                </span>

                {/* Links */}
                <ul className="flex flex-col space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <FooterLink 
                        href={link.href} 
                        isNew={link.isNew}
                        external={link.external}
                      >
                        {link.name}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Newsletter + Social */}
          <div className="flex flex-col gap-5 w-full xl:max-w-sm shrink-0">

            {/* Newsletter Card — Liquid Glass */}
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 group">
              {/* Inner shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Visual Icon Area */}
              <div className="relative mb-5 flex h-24 w-full items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
                  <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
                  <div className="absolute inset-0 border border-white rounded-full scale-150" />
                  <div className="absolute inset-0 border border-white rounded-full scale-[2.5]" />
                </div>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
              </div>

              <h3 className="text-base font-bold text-white/90 mb-1.5 tracking-tight">
                Field Guide
              </h3>
              <p className="text-[13px] text-white/30 mb-5 leading-relaxed">
                Research patterns and testing rituals from real product teams. 
                Two issues a month, no noise.
              </p>

              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/70 placeholder:text-white/15 outline-none transition-all duration-300 focus:border-white/20 focus:bg-white/[0.05]"
                />
                <SubscribeButton />
              </form>
            </div>

            {/* Social Row */}
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl px-5 py-4">
              <span className="text-[13px] font-medium text-white/30">Follow us</span>
              <div className="flex items-center gap-2">
                {/* <SocialIcon href="" label="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </SocialIcon> */}
                <SocialIcon href="https://instagram.com/mialasio" label="Instagram">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </SocialIcon>
                <SocialIcon href="https://youtube.com/@miransaas" label="YouTube">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://github.com/miransas" label="GitHub">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        {/* ─── GIANT WORDMARK ─── */}
        <div className="relative mb-16 overflow-hidden">
          <div className="flex justify-center items-center select-none">
            <span 
              className="text-[18vw] sm:text-[16vw] leading-[0.85] font-black tracking-[-0.04em] text-transparent"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              }}
            >
              miransas
            </span>
          </div>
          {/* Subtle glow behind wordmark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[600px] rounded-full bg-purple-500/[0.03] blur-[80px] pointer-events-none" />
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-white/15" />
            <span className="text-[11px] font-medium tracking-wider text-white/20">
              Miransas &copy; 2024–{new Date().getFullYear()}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
              <a 
                key={item}
                href={`https://privacy.miransas.com${item === 'Privacy' ? '' : `/${item.toLowerCase()}`}`}
                className="group relative text-[11px] font-medium tracking-wider text-white/20 transition-colors duration-300 hover:text-white/50"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/30 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <span className="font-mono text-[10px] text-white/10 tracking-wider">
            MIRALAS AI INFRASTRUCTURE
          </span>
        </div>
      </div>
    </footer>
  );
}