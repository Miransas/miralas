

type TabType = "creative" | "agents" | "api";
type BillingCycle = "monthly" | "yearly";
type CardTheme = "default" | "indigo" | "rose" | "emerald" | "purple";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  theme?: CardTheme; 
  description: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  priceUnit?: string;
  subtext?: string;
  featuresTitle?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const PRICING_DATA: Record<TabType, PricingPlan[]> = {
  creative: [
    {
      id: "creative-free",
      name: "Free",
      theme: "default", // Keep it simple
      description: "Explore voice synthesis and studio tools for free.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceUnit: "/ month",
      featuresTitle: "Included in the Free plan:",
      features: ["10,000 characters / month", "Standard voice synthesis", "3 standard voice models"],
      ctaText: "Try for Free",
      ctaHref: "/studio",
    },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "emerald", // Blue-to-purple gradient
      subtext: "Ideal for content creators",
      description: "High-quality content creation and basic voice cloning.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ month",
      featuresTitle: "Everything in Free, plus:",
      features: ["100,000 characters / month", "Commercial use license", "Instant voice cloning"],
      ctaText: "Upgrade to Pro",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "Most Popular",
      theme: "rose", // Luxury red/rose
      description: "For professional broadcasters, studios, and podcast creators.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ month",
      featuresTitle: "Everything in Pro, plus:",
      features: ["500,000 characters / month", "Professional voice cloning", "192 kbps quality"],
      ctaText: "Upgrade to Max",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "purple", // Derin Mor Kurumsal Kart
      description: "For custom high-volume and enterprise studio needs.",
      monthlyPrice: "Contact us",
      yearlyPrice: "Contact us",
      featuresTitle: "Everything in Max, plus:",
      features: ["Unlimited characters", "SLA guarantee", "Dedicated server"],
      ctaText: "Talk to Our Team",
      ctaHref: "/resources/support",
    },
  ],
  agents: [
    //  {
    //   id: "creative-free",
    //   name: "Free",
    //   theme: "default",
    //   description: "Explore voice synthesis and studio tools for free.",
    //   monthlyPrice: 0,
    //   yearlyPrice: 0,
    //   priceUnit: "/ month",
    //   featuresTitle: "Included in the Free plan:",
    //   features: ["10,000 characters / month", "Standard voice synthesis", "3 standard voice models"],
    //   ctaText: "Try for Free",
    //   ctaHref: "/studio",
    // },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "rose", // Blue-to-purple gradient
      subtext: "Ideal for content creators",
      description: "High-quality content creation and basic voice cloning.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ month",
      featuresTitle: "Everything in Free, plus:",
      features: ["100,000 characters / month", "Commercial use license", "Instant voice cloning"],
      ctaText: "Upgrade to Pro",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "Most Popular",
      theme: "indigo", // Luxury red/rose
      description: "For professional broadcasters, studios, and podcast creators.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ month",
      featuresTitle: "Everything in Pro, plus:",
      features: ["500,000 characters / month", "Professional voice cloning", "192 kbps quality"],
      ctaText: "Upgrade to Max",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "purple", // Derin Mor Kurumsal Kart
      description: "For custom high-volume and enterprise studio needs.",
      monthlyPrice: "Contact us",
      yearlyPrice: "Contact us",
      featuresTitle: "Everything in Max, plus:",
      features: ["Unlimited characters", "SLA guarantee", "Dedicated server"],
      ctaText: "Talk to Our Team",
      ctaHref: "/resources/support",
    },
  ],
  api: [
    //  {
    //   id: "creative-free",
    //   name: "Free",
    //   theme: "default",
    //   description: "Explore voice synthesis and studio tools for free.",
    //   monthlyPrice: 0,
    //   yearlyPrice: 0,
    //   priceUnit: "/ month",
    //   featuresTitle: "Included in the Free plan:",
    //   features: ["10,000 characters / month", "Standard voice synthesis", "3 standard voice models"],
    //   ctaText: "Try for Free",
    //   ctaHref: "/studio",
    // },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "purple", // Blue-to-purple gradient
      subtext: "Ideal for content creators",
      description: "High-quality content creation and basic voice cloning.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ month",
      featuresTitle: "Everything in Free, plus:",
      features: ["100,000 characters / month", "Commercial use license", "Instant voice cloning"],
      ctaText: "Upgrade to Pro",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "Most Popular",
      theme: "rose", // Luxury red/rose
      description: "For professional broadcasters, studios, and podcast creators.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ month",
      featuresTitle: "Everything in Pro, plus:",
      features: ["500,000 characters / month", "Professional voice cloning", "192 kbps quality"],
      ctaText: "Upgrade to Max",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "indigo", // Derin Mor Kurumsal Kart
      description: "For custom high-volume and enterprise studio needs.",
      monthlyPrice: "Contact us",
      yearlyPrice: "Contact us",
      featuresTitle: "Everything in Max, plus:",
      features: ["Unlimited characters", "SLA guarantee", "Dedicated server"],
      ctaText: "Talk to Our Team",
      ctaHref: "/resources/support",
    },
  ]
};