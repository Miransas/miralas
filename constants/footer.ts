import {
  Headphones,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandGithub,
  IconBrandTelegram,
  type TablerIcon,
} from "@tabler/icons-react";

export type FooterLink = {
  label: string;
  href: string;
  icon?: TablerIcon | ComponentType<{ className?: string }>;
  badge?: string;
  target?: "_blank" | "_self";
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { label: "About", href: "/resources/about" },
      { label: "Documentation", href: "/resources/docs" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Changelog", href: "/resources/changelog" },
      { label: "Support", href: "/resources/support" },
      { label: "Contact Sales", href: "/resources/help-center" },
      { label: "Media", href: "/resources/media" },
    ],
  },
  // {
  //   title: "Products",
  //   links: [
  //     { label: "Home", href: "/" },
  //     { label: "API", href: "/products/api" },
  //     { label: "Pricing", href: "/pricing" },
  //     { label: "Contact Us", href: "/resources/help-center" },
  //     { label: "Streamers", href: "/products/donate" },
  //   ],
  // },
  {
    title: "Product",
    links: [
      { label: "Text to Speech", href: "/product/tts" },
      { label: "Voice Clone", href: "/product/voice-clone" },
      { label: "Models", href: "/product/models" },
      { label: "API", href: "/products/api" },
      { label: "Agent", href: "/products/agent" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Enterprise",
    links: [
      { label: "Status Miransas", href: "https://status.miransas.com", target: "_blank" },
      { label: "Status Miralas", href: "https://stats.uptimerobot.com/jkUgMNgsLw", target: "_blank" },
      { label: "Security", href: "https://privacy.miransas.com/miralas/security", target: "_blank" },
      { label: "Miralas Terms", href: "https://privacy.miransas.com/miralas/terms", target: "_blank" },
      { label: "Cookie Policy", href: "https://privacy.miransas.com/miralas/cookie", target: "_blank" },
    ],
  },
  {
    title: "Dashboards",
    links: [
      { label: "Voice Clone", href: "https://console.miralas.io/voice-clone", target: "_blank" },
      { label: "Generate", href: "https://console.miralas.io/generate", target: "_blank" },
      { label: "Stream Donate", href: "https://console.miralas.io/donate", target: "_blank" },
      { label: "Your Projects", href: "https://console.miralas.io/projects", target: "_blank" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { label: "Instagram", href: "https://instagram.com/miralasio", icon: IconBrandInstagram, target: "_blank" },
      { label: "Twitter", href: "https://twitter.com/miransaas", icon: IconBrandX, target: "_blank" },
      { label: "GitHub", href: "https://github.com/miransas", icon: IconBrandGithub, target: "_blank" },
      { label: "Telegram", href: "https://t.me/typesn", icon: IconBrandTelegram, target: "_blank" },
    ],
  },
];

export const FOOTER_UTILITY_LINKS: FooterLink[] = [
  { label: "Status Miransas", href: "https://status.miransas.com", target: "_blank" },
  { label: "Status Miralas", href: "https://stats.uptimerobot.com/jkUgMNgsLw", target: "_blank" },
  { label: "Terms of Service", href: "https://privacy.miransas.com", target: "_blank" },
  { label: "Privacy Policy", href: "https://privacy.miransas.com", target: "_blank" },
  { label: "Cookie Policy", href: "https://privacy.miransas.com", target: "_blank" },
];

export const CONTACT_DATA = {
  header: {
    badge: "Studio & Contact",
    title: "Let's build something thoughtful together.",
    description:
      "Reach out for product design, systems architecture, or editorial inquiries. We typically respond within 24 hours.",
  },

  departments: [
    {
      title: "General & Projects",
      email: "hello@miransas.com",
      description: "New project inquiries, partnerships, and general studio work.",
      icon: Sparkles,
    },
    {
      title: "Support & Systems",
      email: "support@miransas.com",
      description: "Technical support, infrastructure, and active client inquiries.",
      icon: Headphones,
    },
    {
      title: "Careers & Talent",
      email: "careers@miransas.com",
      description: "Join our studio, advisory roles, or internship inquiries.",
      icon: Users,
    },
  ],

  budgetOptions: [
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
    "Advisory / Retainer",
  ],

  presence: {
    title: "Global Reach & Hubs",
    description: "Operating remote-first with planned physical presence across key regional hubs.",
    hubs: [
      {
        location: "Global & Remote-First",
        status: "Active Studio",
        details: "Seamlessly collaborating with partners across major time zones.",
      },
      {
        location: "Dubai • Tashkent • Izmir",
        status: "Upcoming Hubs",
        details: "Regional presence and client advisory hubs currently expanding.",
      },
    ],
  },

  faqs: [
    {
      question: "What does the initial onboarding process look like?",
      answer:
        "After reviewing your submission, we schedule a 30-minute discovery call within 24 hours to align on scope, deliverables, and timeline.",
    },
    {
      question: "How do you handle remote collaboration?",
      answer:
        "We operate remote-first using async workflows, clear documentation, and dedicated communication channels for seamless delivery.",
    },
    {
      question: "Do you offer short-term consulting or design sprints?",
      answer:
        "Yes, we offer targeted design audits, architecture reviews, and high-impact advisory sprints tailored to scaling products.",
    },
  ],
};