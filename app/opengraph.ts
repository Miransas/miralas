import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const siteUrl = SITE_URL;

export const openGraphMetadata: NonNullable<Metadata["openGraph"]> = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
};

export const twitterMetadata: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: openGraphMetadata,
  twitter: twitterMetadata,
};

export default metadata;
