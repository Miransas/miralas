import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import "./globals.css";
import { roboto } from "./roboto";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ComingSoonModal from "../components/modals/comming-soon";
import { openGraphMetadata, twitterMetadata } from "./opengraph";
import { cn } from "../lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#050505",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLocked = true
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "${geist.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased")}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {/*      {isLocked && <ComingSoonModal />}   */}
          <>
         {children}
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}