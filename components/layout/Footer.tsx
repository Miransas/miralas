/* eslint-disable @typescript-eslint/no-explicit-any */
"react";
import Image from "next/image";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import Laser from "../shared/laser";


export const footer = {
  description:
    "Miransas builds modern developer infrastructure for authentication, databases, cloud networking, AI services and open-source tools focused on performance, reliability and developer experience.",

  columns: [
    {
      title: "Products",
      links: [
        { title: "Miransas Cloud", href: "/cloud" },
        { title: "Miransas ID", href: "/id" },
        { title: "Miransas DB", href: "/db" },
        { title: "Miransas VPN", href: "/vpn" },
        { title: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Developers",
      links: [
        { title: "Documentation", href: "/docs" },
        { title: "API Reference", href: "/docs/api" },
        { title: "Status", href: "https://status.miransas.com" },
        { title: "Open Source", href: "https://github.com/miransas" },
        { title: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "Guides", href: "/guides" },
        { title: "Support", href: "/support" },
        { title: "Community", href: "/community" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Privacy", href: "/privacy" },
        { title: "Terms", href: "/terms" },
        { title: "Security", href: "/security" },
      ],
    },
  ],

  socials: [
    { title: "GitHub", href: "https://github.com/miransas", icon: FaGithub },
    { title: "X", href: "https://x.com/miransaas", icon: FaTwitter },
    { title: "Discord", href: "https://discord.gg/miransas", icon: FaDiscord },
    { title: "LinkedIn", href: "https://linkedin.com/company/miransas", icon: FaLinkedin },
    { title: "YouTube", href: "https://youtube.com/@miransaas", icon: FaYoutube },
  ],
} satisfies {
  description: string;
  columns: { title: string; links: { title: string; href: string }[] }[];
  socials: { title: string; href: string; icon: IconType }[];
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-zinc-50 dark:bg-black text-zinc-600 dark:text-zinc-300 font-sans overflow-hidden border-t border-zinc-200/80 dark:border-white/10 pt-20 pb-10 transition-colors duration-500">
      
      {/* Arka Plan Dot Pattern (Hero ve Feature bölümleriyle tam uyumlu) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-90"
        style={{
          backgroundImage: 'radial-gradient(rgba(150, 150, 150, 0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
        }}
      />

      <Laser
        className="absolute inset-0 z-10 w-full"
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
      >
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* Sol Kolon: Marka ve Açıklama */}
          <div className="lg:col-span-4 flex flex-col space-y-6">

            {/* Logo & İsim */}
            <div className="flex items-center gap-3.5">
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-2 bg-black/5 dark:bg-white/20 blur-xl rounded-full pointer-events-none" />
                <div className="relative w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-md">
                  <Image src="/logo.png" alt="Miransas Logo" width={22} height={22} />
                </div>
              </div>
              <span className="text-zinc-900 dark:text-white font-semibold text-lg tracking-tight">
                Miransas
              </span>
            </div>

            {/* Açıklama */}
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Sosyal Medya İkonları */}
            <div className="flex items-center gap-2.5 pt-1">
              {footer.socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    className="group relative w-10 h-10 rounded-xl 
                               bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md 
                               border border-zinc-200/80 dark:border-white/10 
                               shadow-sm dark:shadow-none
                               flex items-center justify-center text-zinc-500 dark:text-zinc-400 
                               hover:text-zinc-900 dark:hover:text-white 
                               hover:bg-zinc-100 dark:hover:bg-zinc-800 
                               hover:border-zinc-300 dark:hover:border-white/25 
                               hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            {/* Start Building Free Butonu */}
            <div className="pt-2">
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/60 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 shadow-sm"
              >
                <span>Start building free</span>
                <span className="text-zinc-400 dark:text-zinc-500">↗</span>
              </a>
            </div>
          </div>

          {/* Sağ Kolonlar (Footer Navigasyon Grupları) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footer.columns.map((col) => (
              <div key={col.title} className="flex flex-col space-y-4">
                <h3 className="text-zinc-900 dark:text-white font-medium text-xs font-mono uppercase tracking-wider">
                  {col.title}
                </h3>
                <ul className="flex flex-col space-y-3">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Dev Marka Adı ve Aurora Efekti */}
        <div className="relative z-20 w-full pt-16 pb-4 overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent mb-4" />
          
          <div className="absolute top-8 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/5 dark:from-white/10 via-transparent to-transparent blur-3xl pointer-events-none" />

          <h1 className="text-center font-bold tracking-tighter text-[13vw] leading-none select-none pointer-events-none bg-gradient-to-b from-zinc-300 via-zinc-400/30 dark:from-zinc-200/40 dark:via-zinc-500/10 to-transparent bg-clip-text text-transparent opacity-70">
            miransas
          </h1>
        </div>

        {/* Alt Bilgi Çubuğu */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 border-t border-zinc-200/80 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} Miransas. All rights reserved.
          </div>
          <div className="flex items-center gap-2 bg-white/60 dark:bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-700 dark:text-zinc-300">All systems operational</span>
          </div>
        </div>

      </Laser>
    </footer>
  );
}