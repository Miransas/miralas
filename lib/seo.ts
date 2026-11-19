import type { Metadata } from "next";

export const SITE_URL = "https://miralas.io";
export const SITE_NAME = "Miralas";
export const BRAND_NAME = "Miransas";

export const DEFAULT_TITLE = "Miralas — AI Voice Infrastructure by Miransas";
export const DEFAULT_DESCRIPTION =
  "Explore Miralas multilingual AI voice infrastructure powered by Chatterbox with 23 model-supported languages and native Uzbek speech in development.";

export const DEFAULT_KEYWORDS = [
  "Miralas",
  "Miransas",
  "AI voice infrastructure",
  "text to speech",
  "multilingual TTS",
  "Chatterbox multilingual",
  "Uzbek TTS",
  "Uzbek voice AI",
  "voice cloning",
  "voice agents",
  "developer voice API",
  "AI speech synthesis",
];

export interface PageMetadataOptions {
  /** Concise page title (< 60 chars with or without template). */
  title: string;
  /** Accurate 140–160 char meta description matching current product status. */
  description: string;
  /** Canonical path starting with "/", e.g. "/product/tts". */
  path: string;
  /** Exclude page from search engine indexing when true. */
  noIndex?: boolean;
  /** OpenGraph type (defaults to "website"). */
  type?: "website" | "article";
  /** Use absolute title bypassing the root "%s | Miralas" template. */
  absoluteTitle?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: normalizedPath,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
