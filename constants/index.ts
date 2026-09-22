import {
  Clock,
  Globe,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

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
