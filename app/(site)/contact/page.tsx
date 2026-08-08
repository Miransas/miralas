import { MarketingPage } from "@/components/sections/MarketingPage";

export default function ContactPage() {
  return (
    <MarketingPage
      data={{
        eyebrow: "Contact",
        title: "Talk to the team building Uzbekistan's AI voice layer.",
        description: "Reach us for partnerships, enterprise pilots, creator programs or product feedback.",
        primary: "Contact Sales",
        secondary: "Book Demo",
        stats: [
          { value: "24h", label: "Target response time for qualified requests." },
          { value: "UZ", label: "Local market context and product focus." },
          { value: "Pilot", label: "Structured onboarding for early partners." },
        ],
        features: [
          { title: "Sales", body: "Plan a voice generation rollout for your company or product." },
          { title: "Partnerships", body: "Explore creator, education and ecosystem collaboration." },
          { title: "Support", body: "Get help with accounts, generation flows and product questions." },
          { title: "Press", body: "Request background, company details and launch materials." },
          { title: "Developers", body: "Discuss API workflows and technical integration paths." },
          { title: "Creators", body: "Join early donation and voice monetization programs." },
        ],
        highlight: {
          title: "A premium contact experience for serious launches.",
          body: "The Miralas team is prioritizing product partners who can help define the future of Uzbek AI voice.",
          bullets: ["Enterprise pilots", "Creator programs", "Education partnerships", "API integration planning"],
        },
      }}
    />
  );
}
