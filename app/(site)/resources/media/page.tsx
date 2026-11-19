import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import MediaClient from "./media-client";

export const metadata: Metadata = createPageMetadata({
  title: "Creator Media & Community",
  description:
    "Explore Miralas creator media spotlighting artists, storytellers, and voice research shaping multilingual speech experiences across Uzbekistan and beyond.",
  path: "/resources/media",
});

export default function MediaPage() {
  return <MediaClient />;
}
