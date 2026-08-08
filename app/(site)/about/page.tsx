import { MarketingPage } from "@/components/sections/MarketingPage";

export default function AboutPage() {
  return (
    <MarketingPage
      data={{
        eyebrow: "About Miralas",
        title: "A voice company for the next chapter of Uzbek digital products.",
        description: "Miralas is building premium AI voice infrastructure for creators, developers, education teams and businesses in Uzbekistan.",
        primary: "Start Creating",
        secondary: "Contact Team",
        stats: [
          { value: "UZ", label: "A product strategy centered on Uzbek language quality." },
          { value: "AI", label: "Voice generation, cloning and text-to-speech direction." },
          { value: "Local", label: "Designed for regional creators and businesses." },
        ],
        features: [
          { title: "Language First", body: "We believe Uzbek speech technology deserves first-class product design and engineering." },
          { title: "Creator Economy", body: "Future donation features help creators turn attention into sustainable support." },
          { title: "Developer Ready", body: "API-first thinking makes Miralas useful inside real products and workflows." },
          { title: "Elegant Tools", body: "Powerful AI should feel calm, premium and easy to understand." },
          { title: "Responsible Voice", body: "Voice cloning and identity features require consent, clarity and control." },
          { title: "Regional Ambition", body: "The platform starts with Uzbekistan and is built with global quality expectations." },
        ],
        highlight: {
          title: "We are building the voice layer for local expression at global quality.",
          body: "Miralas brings together voice generation, future cloning, text-to-speech, API access and creator monetization into one premium platform.",
          bullets: ["Uzbek language priority", "Premium product craft", "Developer infrastructure", "Creator monetization"],
        },
        faq: [
          { question: "Why focus on Uzbekistan?", answer: "Because local language quality and creator workflows are underserved by generic global AI products." },
          { question: "What is the long-term platform?", answer: "A complete AI voice and donation ecosystem for individuals, teams and developers." },
        ],
      }}
    />
  );
}
