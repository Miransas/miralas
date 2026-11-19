import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import VoiceClonePageClient from "./voice-clone-client";

export const metadata: Metadata = createPageMetadata({
  title: "Voice Cloning",
  description:
    "Learn about the Miralas consent-led voice cloning workflow in development, built around speaker permission, reference audio review, and clear usage boundaries.",
  path: "/product/voice-clone",
});

export default function VoiceClonePage() {
  return <VoiceClonePageClient />;
}
