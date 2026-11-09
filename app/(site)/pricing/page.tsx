import type { Metadata } from "next";
import PricingExperience from "@/components/pricing/pricing-experience";
import type { TabId } from "@/lib/pricing/types";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore the pricing direction for Miralas Studio, API and Voice Agents.",
};

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const tab = (await searchParams).tab;
  const initialTab: TabId = tab === "api" || tab === "agents" ? tab : "studio";
  return <PricingExperience initialTab={initialTab} />;
}
