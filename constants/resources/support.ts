import {

  BookOpen,
  ShieldCheck,
  CreditCard,
  FileText,
} from "lucide-react";


export const supportCategories = [
  {
    title: "Documentation & Guides",
    description: "Learn how to integrate Miralas APIs, TTS models, and voice cloning into your apps.",
    icon: BookOpen,
    href: "/resources/docs",
    count: "12 articles"
  },
  {
    title: "Security & Privacy",
    description: "Read about our compliance standards, data protection, and enterprise security policies.",
    icon: ShieldCheck,
    href: "https://privacy.miransas.com/miralas/security",
    count: "5 articles"
  },
  {
    title: "Billing & Subscriptions",
    description: "Manage your workspace plan, credit usage limits, invoices, and payment methods.",
    icon: CreditCard,
    href: "/pricing",
    count: "8 articles"
  },
  {
    title: "Voice Models & Terms",
    description: "Understand voice actor licensing, commercial usage rights, and terms of service.",
    icon: FileText,
    href: "https://privacy.miransas.com/miralas/terms",
    count: "6 articles"
  }
];

export const popularFaqs = [
  {
    question: "How do I start cloning a voice with Miralas Studio?",
    answer: "Navigate to the Voice Clone section in your workspace, upload clean audio samples following our guidelines, and initiate the training pipeline.",
    href: "/resources/guides"
  },
  {
    question: "What are the rate limits for the Miralas TTS API?",
    answer: "Rate limits vary depending on your tier. Standard developer plans include up to 60 requests per minute, while enterprise plans offer custom throughput limits.",
    href: "/resources/docs"
  },
  {
    question: "How are commercial voice rights handled?",
    answer: "All generated or cloned assets used commercially must adhere to our platform licensing agreements and voice actor consent frameworks.",
    href: "https://privacy.miransas.com/miralas/terms"
  }
];