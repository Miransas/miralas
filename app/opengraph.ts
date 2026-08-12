import type { Metadata } from "next";

export const openGraphMetadata: Metadata["openGraph"] = {
  title: "Miralas Voice — AI Voice Infrastructure",
  description:
    "Create natural, expressive and production-ready AI voices with an Uzbek-first voice platform built for developers and creators.",
  url: "https://miralas.io",
  siteName: "Miralas Voice",
  locale: "en_US",
  type: "website",
};

export const metadata: Metadata = {
  openGraph: openGraphMetadata,
};

export default metadata;
