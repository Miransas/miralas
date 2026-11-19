import type { Metadata } from "next";
import PricingExperience from "@/components/pricing/pricing-experience";
import type { TabId } from "@/lib/pricing/types";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing Direction",
  description:
    "Explore the proposed pricing direction for Miralas Studio, Developer API, and Voice Agents. Public billing terms, usage rates, and access remain unconfirmed.",
  path: "/pricing",
});

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const tab = (await searchParams).tab;
  const initialTab: TabId = tab === "api" || tab === "agents" ? tab : "studio";
  return <PricingExperience initialTab={initialTab} />;
}
