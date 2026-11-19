import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import TTSPageClient from "./tts-client";

export const metadata: Metadata = createPageMetadata({
  title: "Text to Speech",
  description:
    "Explore Miralas Text to Speech powered by Chatterbox Multilingual with 23 model-supported languages, 24 kHz PCM16 audio output, and Uzbek speech in development.",
  path: "/product/tts",
});

export default function TTSPage() {
  return <TTSPageClient />;
}
