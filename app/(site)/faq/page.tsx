import { MarketingPage } from "@/components/sections/MarketingPage";

export default function FAQPage() {
  return (
    <MarketingPage
      data={{
        eyebrow: "FAQ",
        title: "Answers for teams evaluating Uzbek AI voice.",
        description: "A complete overview of Miralas language support, product workflows, future features and launch readiness.",
        primary: "Start Creating",
        secondary: "Contact Team",
        stats: [
          { value: "8", label: "Core questions answered for buyers and builders." },
          { value: "UZ", label: "Language support is the central priority." },
          { value: "API", label: "Developer workflows are part of the roadmap." },
        ],
        features: [
          { title: "Language", body: "Uzbek support is prioritized across pronunciation, workflow and product messaging." },
          { title: "Voice AI", body: "Generate realistic speech for products, content and education." },
          { title: "Voice Cloning", body: "Future cloning features should be consent-led and carefully controlled." },
          { title: "Donations", body: "Creator monetization can connect supporter messages with voice experiences." },
          { title: "API", body: "Developers can plan integrations for generation and automation workflows." },
          { title: "Enterprise", body: "Teams can request security, onboarding and support conversations." },
        ],
        highlight: {
          title: "The quick version: Miralas is built for serious local voice products.",
          body: "The FAQ helps customers understand how the platform will support modern teams serving Uzbekistan.",
          bullets: ["Uzbek-first generation", "Creator and business workflows", "API-ready direction", "Enterprise conversations"],
        },
        faq: [
          { question: "Is Uzbek the main language?", answer: "Yes. Uzbek is positioned as a primary product priority." },
          { question: "Can I use it for commercial content?", answer: "The product is designed for commercial creators, teams and platforms." },
          { question: "Will donations be built in?", answer: "Donation workflows are part of the future feature direction." },
        ],
      }}
    />
  );
}
