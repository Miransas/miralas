export type HeaderNavSubItem = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  target?: "_blank" | "_self";
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
    href: "/resources",
    description: "Learn, build and stay updated.",
    items: [
      { label: "About", href: "/resources/about", description: "This About Miransas & Miralas" },
      { label: "Documentation", href: "/resources/docs", description: "Build with the Miralas platform." },
      { label: "Guides", href: "/resources/guides", description: "Practical guides and tutorials." },
      { label: "Media", href: "/resources/media", description: "Podcasts, videos and brand assets." },
      { label: "Changelog", href: "/resources/changelog", description: "What's new across Miralas.", badge: "New" },
      { label: "Support", href: "/resources/support", description: "Get help with your Miralas workspace." },
      { label: "Help Center", href: "/resources/help-center", description: "Talk to the Miralas team and FAQs." },
    ],
  },
  {
    label: "Product",
    href: "/studio",
    description: "Create, clone and generate.",
    items: [
      { label: "Text to Speech", href: "/product/tts", description: "Turn text into natural expressive speech." },
      { label: "Voice Clone", href: "/product/voice-clone", description: "Clone and customize a voice." },
      { label: "Models", href: "/product/models", description: "Explore Miralas voice models." },
      { label: "API", href: "/product/api", description: "Integrate Miralas into your own products." },
      { label: "Agent", href: "/product/agent", description: "Integrate Miralas into your own products." },
    ],
  },
  // {
  //   label: "Products",
  //   href: "/products",
  //   description: "Explore the Miralas platform.",
  //   items: [
  //     { label: "Streamers", href: "/products/donate", description: "Generate natural and expressive AI speech." },
  //     { label: "API", href: "/products/api", description: "Integrate Miralas into your own products." },
  //   ],
  // },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Voice AI for real-world workflows.",
    items: [
      {
        label: "For Content Creators",
        href: "/solutions/creators",
        description: "Automate dubbing, audiobooks, and podcasting.",
      },
      {
        label: "For Streamers & Gaming",
        href: "/solutions/streaming",
        description: "Interactive donation TTS and dynamic NPC audio.",
      },
      {
        label: "Conversational AI",
        href: "/solutions/voice-agents",
        description: "Low-latency voice infrastructure for AI agents.",
      },
      {
        label: "Enterprise Brand Voices",
        href: "/solutions/enterprise-voice",
        description: "Clone and secure exclusive custom voices.",
      },
       {
        label: "Others",
        href: "/solutions/others",
        description: "Clone and secure exclusive custom voices.",
      },
    ],
  },
  {
    label: "Enterprise",
    href: "/enterprise",
    description: "Voice infrastructure for organizations.",
    items: [
      { 
        label: "Security", 
        href: "https://privacy.miransas.com/miralas/security", 
        description: "Security, compliance and trust info.",
        target: "_blank" 
      },
      { 
        label: "Miralas Terms", 
        href: "https://privacy.miransas.com/miralas/terms", 
        description: "Legal terms and conditions.",
        target: "_blank" 
      },
      { 
        label: "Cookie Policy", 
        href: "https://privacy.miransas.com/miralas/cookie", 
        description: "Privacy and cookie preferences.",
        target: "_blank" 
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

export const HEADER_LINKS = {
  home: "/",
  consoleAuth: "https://console.miralas.io/auth",
  studio: "/studio",
};