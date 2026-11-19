import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import AgentPageClient from "./agent-client";

export const metadata: Metadata = createPageMetadata({
  title: "Voice Agents",
  description:
    "Explore Miralas voice agents in early development — workflow-aware voice interactions and human handoff research, with real-time latency validation still ahead.",
  path: "/product/agent",
});

export default function AgentPage() {
  return <AgentPageClient />;
}
