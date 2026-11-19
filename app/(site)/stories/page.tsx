import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Component Stories",
  description: "Internal UI component playground for Miralas marketing site development.",
  path: "/stories",
  noIndex: true,
});

export default function StoriesPage() {
  return <main className="font-plex" />;
}
