export type HeaderNavSubItem = {
  label: string;
  href: string;
  description?: string;
};

export type HeaderNavItem = {
  label: string;
  href: string;
  description?: string;
  items?: HeaderNavSubItem[];
};

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  {
    label: "Resources",
    href: "/resources/about",
    description: "Learn, build and stay updated.",
    items: [
      { label: "Documentation", href: "/resources/docs", description: "Build with the Miralas platform." },
      { label: "Guides", href: "/resources/guides", description: "Practical guides and tutorials." },
      { label: "Media", href: "/resources/media", description: "Practical guides and tutorials." },
      { label: "Changelog", href: "/resources/changelog", description: "What's new across Miralas." },
      { label: "Support", href: "/resources/support", description: "Get help with your Miralas workspace." },
      { label: "Contact Sales", href: "/resources/help-center", description: "Talk to the Miralas team." },
    ],
  },
  {
    label: "Studio",
    href: "/studio",
    description: "Create, clone and generate.",
    items: [
      { label: "Text to Speech", href: "/studio/tts", description: "Turn text into natural expressive speech." },
      { label: "Voice Clone", href: "/studio/voice-clone", description: "Clone and customize a voice." },
      { label: "Models", href: "/studio/models", description: "Explore Miralas voice models." },
    ],
  },
  {
    label: "Products",
    href: "/products",
    description: "Explore the Miralas platform.",
    items: [
      { label: "Streamers", href: "/products/donate", description: "Generate natural and expressive AI speech." },
      { label: "API", href: "/products/api", description: "Integrate Miralas into your own products." },
    ],
  },
  {
    label: "Enterprise",
    href: "/resources/support",
    description: "Voice infrastructure for organizations.",
    items: [
      { label: "Security", href: "https://privacy.miransas.com/miralas/security", description: "Security and compliance information." },
      { label: "Miralas Terms", href: "https://privacy.miransas.com/miralas/terms", description: "Support for enterprise teams." },
      { label: "Cookie Policy", href: "https://privacy.miransas.com/miralas/cookie", description: "Support for enterprise teams." },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Voice AI for real-world workflows.",
  },
  { label: "Pricing", href: "/pricing" },
];

export const HEADER_LINKS = {
  home: "/",
  consoleAuth: "https://console.miralas.io/auth",
  studio: "/studio",
};
