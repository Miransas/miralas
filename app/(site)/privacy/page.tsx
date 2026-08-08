import { MarketingPage } from "@/components/sections/MarketingPage";

export default function PrivacyPage() {
  return (
    <MarketingPage
      data={{
        eyebrow: "Privacy",
        title: "Privacy principles for voice data, creators and teams.",
        description: "A production-ready privacy experience that explains how Miralas approaches trust, consent and responsible AI voice workflows.",
        primary: "Review Policy",
        secondary: "Contact Us",
        stats: [
          { value: "Consent", label: "Voice identity should be permission-led." },
          { value: "Control", label: "Teams need visibility into generated assets." },
          { value: "Care", label: "Language technology must respect people." },
        ],
        features: [
          { title: "Voice Consent", body: "Voice cloning workflows should rely on clear permission and user control." },
          { title: "Data Minimization", body: "Collect only what is needed to provide reliable platform features." },
          { title: "Access Controls", body: "Protect team workspaces with sensible product and account boundaries." },
          { title: "Retention", body: "Define clear lifecycle expectations for generated assets and uploaded inputs." },
          { title: "Transparency", body: "Explain AI voice behavior in language real customers can understand." },
          { title: "Support", body: "Make privacy questions easy to raise and route to the right team." },
        ],
        highlight: {
          title: "Trust is a product feature.",
          body: "Miralas should make responsible voice generation feel clear, understandable and operationally practical.",
          bullets: ["Consent-first cloning", "Transparent workflows", "Workspace controls", "Clear support paths"],
        },
      }}
    />
  );
}
