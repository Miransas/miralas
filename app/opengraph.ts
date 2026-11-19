import type { Metadata } from "next";

export const siteUrl = "https://miralas.io";

export const openGraphMetadata: NonNullable<Metadata["openGraph"]> = {
  
  title: "Miralas Voice — AI Voice Infrastructure",
  description:
    "Explore Chatterbox-powered multilingual voice technology. 23 model-supported languages, with native Uzbek speech in development.",
  url: siteUrl,
  siteName: "Miralas Voice",

  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/logo.png",
      width: 2610,
      height: 1548,
      alt: "Miralas Voice AI infrastructure",
    },
  ],
};

export const twitterMetadata: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: openGraphMetadata.title,
  description: openGraphMetadata.description,
  images: ["/logo.png"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: openGraphMetadata,
  twitter: twitterMetadata,
};

export default metadata;
