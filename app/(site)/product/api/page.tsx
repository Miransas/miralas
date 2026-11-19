import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import ApiPageClient from "./api-client";

export const metadata: Metadata = createPageMetadata({
  title: "Developer Voice API",
  description:
    "Explore the Miralas API architecture combining a Rust application layer and Python inference worker over gRPC. Public API access and rates remain unconfirmed.",
  path: "/product/api",
});

export default function ApiPage() {
  return <ApiPageClient />;
}
