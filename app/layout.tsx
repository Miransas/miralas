
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ComingSoonModal from "../components/modals/comming-soon";
import { openGraphMetadata, twitterMetadata } from "./opengraph";
import { cn } from "../lib/utils";

/* =========================================================
   FONTS
   ========================================================= */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-runtime",
  display: "swap",
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-runtime",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

/* =========================================================
   METADATA
   ========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://miralas.io"),

  title: {
    default: "Miralas Voice — AI Voice Infrastructure",
    template: "%s — Miralas Voice",
  },

  description:
    "Miralas is an AI voice platform built by Miransas for creating natural, expressive and production-ready voice experiences, with Uzbek-first speech and developer infrastructure.",

  applicationName: "Miralas Voice",

  authors: [
    {
      name: "Miransas",
      url: "https://miransas.com",
    },
  ],

  creator: "Miransas",
  publisher: "Miransas",

  keywords: [
    "Miralas",
    "Miralas Voice",
    "AI voice",
    "voice AI",
    "text to speech",
    "Uzbek TTS",
    "Uzbek voice",
    "voice generation",
    "voice cloning",
    "AI speech",
    "developer API",
    "Miransas",
  ],

  icons: {
    icon: [
      {
        url: "/assets/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],

    apple: {
      url: "/assets/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },

  openGraph: {
    ...openGraphMetadata,
  },

  twitter: twitterMetadata,

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
};

/* =========================================================
   VIEWPORT
   ========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#fdfdfc",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#090a09",
    },
  ],
};

/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLocked = true;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        jakarta.variable,
        plexMono.variable,
        "selection:bg-brand selection:text-background",
      )}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > {isLocked && <ComingSoonModal />} 
          {/**/}

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}




