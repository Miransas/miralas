import type { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import type { TabId } from "@/lib/pricing/types";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for Miralas Voice Studio, Developer API, and Voice Agents. Start free with 10,000 monthly characters and scale predictably.",
  path: "/pricing",
});

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const params = await searchParams;
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const initialTab: TabId = tab === "api" || tab === "agents" ? tab : "studio";
  return <PricingClient initialTab={initialTab} />;
}
