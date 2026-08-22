import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import "./globals.css";
import { roboto } from "./roboto";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ComingSoonModal from "../components/modals/comming-soon";
import SmoothScroll from "../components/providers/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    type: "website",
    siteName: "Miralas Voice",
    title: "Miralas Voice — AI Voice Infrastructure",
    description:
      "Create natural, expressive and production-ready AI voices with an Uzbek-first voice platform built for developers and creators.",
    url: "https://miralas.io",
  },

  twitter: {
    card: "summary_large_image",
    title: "Miralas Voice — AI Voice Infrastructure",
    description:
      "AI voice infrastructure for natural, expressive and production-ready speech.",
  },

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
      className={`${jakarta.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

      {isLocked && <ComingSoonModal />}   
         <SmoothScroll>
          {children}
        </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}