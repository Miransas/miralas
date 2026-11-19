import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import SupportSections from "../../../../components/resources/support-section";

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description:
    "Get support for Miralas voice infrastructure, browse documentation and technical guides, or contact the Miransas team about product access and development.",
  path: "/resources/support",
});

export default function SupportPage() {
  return (
    <main>
      <SupportSections />
    </main>
  );
}
