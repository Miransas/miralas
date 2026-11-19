
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/motion/primitives";
import { openGraphMetadata, twitterMetadata } from "./opengraph";
import {
  BRAND_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { cn } from "../lib/utils";
import { PageViewTracker } from "../components/providers/page-view-tracker";
import { CookieConsent } from "../components/providers/cookie-consent";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;



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


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,

  authors: [
    {
      name: BRAND_NAME,
      url: "https://miransas.com",
    },
  ],

  creator: BRAND_NAME,
  publisher: BRAND_NAME,

  keywords: DEFAULT_KEYWORDS,

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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        jakarta.variable,
        plexMono.variable,
        "selection:background-green-500 selection:text-stone-700",
      )}
    >
      <body className="min-h-full overflow-x-clip bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <PageViewTracker />
            {/* {isLocked && <ComingSoonModal />}   */}
            {children}
            <CookieConsent />
          </MotionProvider>
        </ThemeProvider>
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
      </body>
    </html>
  );
}




