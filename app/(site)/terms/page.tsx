import { MarketingPage } from "@/components/sections/MarketingPage";

export default function TermsPage() {
  return (
    <MarketingPage
      data={{
        eyebrow: "Terms",
        title: "Clear usage principles for building with Miralas.",
        description: "A polished terms experience for teams evaluating voice generation, API access, donations and future cloning features.",
        primary: "Start Creating",
        secondary: "Ask A Question",
        stats: [
          { value: "Fair", label: "Terms should be understandable." },
          { value: "Safe", label: "Voice features need responsible boundaries." },
          { value: "Ready", label: "Built for product and business teams." },
        ],
        features: [
          { title: "Acceptable Use", body: "Define safe, respectful and lawful use of generated voice content." },
          { title: "Account Ownership", body: "Clarify workspace access, team responsibility and product permissions." },
          { title: "Generated Content", body: "Explain how generated assets can be used in commercial workflows." },
          { title: "API Usage", body: "Prepare expectations around limits, reliability and integration behavior." },
          { title: "Donations", body: "Set clear expectations for creator monetization and supporter experiences." },
          { title: "Updates", body: "Keep customers informed as platform capabilities evolve." },
        ],
        highlight: {
          title: "Good terms reduce friction before launch.",
          body: "The page is designed to support confident evaluation by founders, creators, schools and enterprise teams.",
          bullets: ["Commercial usage clarity", "Safety boundaries", "API expectations", "Creator economy guidance"],
        },
      }}
    />
  );
}
