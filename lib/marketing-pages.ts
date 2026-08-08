import type { MarketingPageData } from "@/components/sections/MarketingPage";

const commonFaq = [
  {
    question: "Does Miralas work well for Uzbek?",
    answer: "Yes. Uzbek language support is treated as a primary product surface, not a secondary localization.",
  },
  {
    question: "Can developers integrate it with an API?",
    answer: "Yes. API access is designed for product teams that need voice generation inside their own workflows.",
  },
  {
    question: "Is this ready for businesses?",
    answer: "The platform direction includes enterprise controls, usage governance, security review and priority support.",
  },
];

export const pages: Record<string, MarketingPageData> = {
  products: {
    eyebrow: "Products",
    title: "One platform for voice generation, cloning and creator monetization.",
    description: "Explore Miralas voice products built for Uzbek creators, startups, education platforms and enterprise teams.",
    primary: "Explore Products",
    secondary: "Watch Demo",
    stats: [
      { value: "4", label: "Core product lines designed to grow together." },
      { value: "UZ", label: "Language-first product architecture." },
      { value: "API", label: "Developer workflows prepared for scale." },
    ],
    features: [
      { title: "Voice AI", body: "Create expressive Uzbek voiceovers with controllable tone, pacing and style." },
      { title: "Voice Cloning", body: "Build consent-first voice identity tools for creators, educators and media teams." },
      { title: "Text To Speech", body: "Turn scripts, lessons and product moments into polished speech instantly." },
      { title: "API", body: "Integrate speech generation into apps, automations and customer experiences." },
      { title: "Donate", body: "Connect creator support with voice alerts, messages and campaign pages." },
      { title: "Studio", body: "A refined workspace for composing, testing and managing voice assets." },
    ],
    highlight: {
      title: "A product suite designed around local voice, not generic audio.",
      body: "Miralas combines AI voice creation and future monetization features so teams can build audio products that feel native to Uzbekistan.",
      bullets: ["Unified project workspace", "Localized voice controls", "Creator donation primitives", "Production-ready API surface"],
    },
    faq: commonFaq,
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Voice workflows for teams building the Uzbek internet.",
    description: "From developer tools to education and creator platforms, Miralas helps teams ship natural audio experiences faster.",
    primary: "Find Your Workflow",
    secondary: "See Use Cases",
    stats: [
      { value: "6+", label: "Use cases across creators, business and education." },
      { value: "24/7", label: "Voice generation workflows for always-on products." },
      { value: "Low", label: "Operational lift for content and product teams." },
    ],
    features: [
      { title: "Developers", body: "Add Uzbek voice features to apps without building speech infrastructure from scratch." },
      { title: "Businesses", body: "Create customer education, onboarding and support audio with a consistent brand voice." },
      { title: "Creators", body: "Produce high-quality voice content and prepare donation-powered audience moments." },
      { title: "Education", body: "Generate lessons, listening exercises and accessible learning content quickly." },
      { title: "Media", body: "Draft narrations and multi-format voice assets for digital publishing." },
      { title: "Support", body: "Turn help content into clear spoken guidance for more accessible support." },
    ],
    highlight: {
      title: "Every workflow keeps language quality at the center.",
      body: "The product experience is shaped around real teams working in Uzbek, Russian and English contexts across Central Asia.",
      bullets: ["Creator-first monetization paths", "Education-ready narration", "Product API integration", "Team review workflows"],
    },
    faq: commonFaq,
  },
  customers: {
    eyebrow: "Customers",
    title: "Built for ambitious teams who care about local voice quality.",
    description: "Miralas is designed for startups, creator networks, schools and enterprises serving audiences across Uzbekistan.",
    primary: "Read Stories",
    secondary: "Talk To Sales",
    stats: [
      { value: "3x", label: "Faster narration production for content teams." },
      { value: "98%", label: "Target clarity benchmark for Uzbek speech." },
      { value: "1", label: "Unified flow for voice and donations." },
    ],
    features: [
      { title: "BilimLab", body: "Education teams can turn written lessons into clear, repeatable narration." },
      { title: "Ovoza", body: "Creator teams can prototype donation-triggered voice experiences." },
      { title: "Payme Studio", body: "Product teams can localize customer moments with recognizably Uzbek speech." },
      { title: "Media Teams", body: "Editors can produce voice drafts before entering studio workflows." },
      { title: "Support Teams", body: "Companies can transform help articles into guided audio." },
      { title: "Developers", body: "Engineering teams can test voice experiences before full production rollout." },
    ],
    highlight: {
      title: "Trust comes from sounding native, fast and controlled.",
      body: "The customer experience is built around premium generation quality, production controls and confident deployment paths.",
      bullets: ["Localized tone testing", "Team approval patterns", "High-quality preview tooling", "Scalable customer workflows"],
    },
    faq: commonFaq,
  },
  resources: {
    eyebrow: "Resources",
    title: "Everything teams need to build with Uzbek AI voice.",
    description: "Guides, documentation, product updates and practical examples for teams bringing Miralas into production.",
    primary: "Open Docs",
    secondary: "View Changelog",
    stats: [
      { value: "Docs", label: "Implementation guidance for developers." },
      { value: "Guides", label: "Practical content workflows for teams." },
      { value: "FAQ", label: "Answers for safety, API and language support." },
    ],
    features: [
      { title: "Documentation", body: "API concepts, authentication, generation flows and implementation patterns." },
      { title: "Blog", body: "Product thinking, language quality notes and creator economy ideas." },
      { title: "Changelog", body: "Track model improvements, platform updates and developer releases." },
      { title: "Help Center", body: "Practical answers for account, billing, generation and workspace questions." },
      { title: "FAQ", body: "Quick explanations for buyers, developers and creators evaluating Miralas." },
      { title: "Templates", body: "Starting points for voiceovers, lessons, alerts and product audio." },
    ],
    highlight: {
      title: "Resources should feel as polished as the product.",
      body: "Miralas resource pages are designed to help non-technical teams and developers move with confidence.",
      bullets: ["Clear implementation paths", "Product education", "Release visibility", "Localized examples"],
    },
    faq: commonFaq,
  },
  enterprise: {
    eyebrow: "Enterprise",
    title: "Secure Uzbek voice infrastructure for serious teams.",
    description: "Bring AI voice generation into regulated, high-volume and brand-sensitive environments with confidence.",
    primary: "Contact Sales",
    secondary: "View Security",
    stats: [
      { value: "SLA", label: "Enterprise-ready service commitments." },
      { value: "SSO", label: "Future-ready team access controls." },
      { value: "Scale", label: "Usage architecture for larger deployments." },
    ],
    features: [
      { title: "Security Review", body: "Support procurement, legal and technical evaluations with clear platform practices." },
      { title: "Team Controls", body: "Prepare role-based workflows for production voice generation teams." },
      { title: "Custom Limits", body: "Align usage capacity with campaigns, apps and seasonal demand." },
      { title: "Dedicated Support", body: "Get closer onboarding for launches that matter." },
      { title: "Brand Voice", body: "Control tone, style and usage patterns for consistent customer experiences." },
      { title: "Deployment Planning", body: "Move from prototype to production with fewer surprises." },
    ],
    highlight: {
      title: "Enterprise quality means control, clarity and reliability.",
      body: "Miralas is shaped for teams that need voice generation to fit into real operational systems.",
      bullets: ["Procurement-friendly materials", "Usage governance", "Launch planning", "Priority support path"],
    },
    faq: commonFaq,
  },
};

export function pageData(key: keyof typeof pages) {
  return pages[key];
}
