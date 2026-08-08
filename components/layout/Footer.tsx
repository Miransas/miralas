import Link from "next/link";
import { FaDiscord, FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";

const groups = [
  { title: "Product", links: ["Voice AI", "Voice Cloning", "Text To Speech", "API", "Donate"] },
  { title: "Solutions", links: ["Developers", "Businesses", "Creators", "Education"] },
  { title: "Resources", links: ["Documentation", "Blog", "Changelog", "Help Center", "FAQ"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Privacy", "Terms"] },
];

const socials = [
  { label: "Github", href: "https://github.com/miransas", icon: FaGithub },
  { label: "Discord", href: "https://discord.gg/miransas", icon: FaDiscord },
  { label: "X", href: "https://x.com/miransaas", icon: FaXTwitter },
  { label: "Telegram", href: "https://t.me/miransas", icon: FaTelegram },
];

function slug(label: string) {
  return `/${label.toLowerCase().replaceAll(" ", "-")}`;
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white text-zinc-600 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Miralas
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7">
              Uzbek-first AI voice generation and donation tools for creators, teams and products serving Central Asia.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-950 dark:text-white">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link href={slug(link)} className="text-sm transition hover:text-zinc-950 dark:hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200/80 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p>Copyright © {new Date().getFullYear()} Miralas. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Made with love</span>
            <button className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/20">
              O&apos;zbekcha
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
