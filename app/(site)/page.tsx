import type { Metadata } from "next";
import FaqSection from "@/components/shared/faq";
import LaserHero from "@/components/shared/laser-hero";
import StackedCards from "@/components/shared/Stackedcards";
import WhyMiralas from "@/components/shared/WhyMiralas";
import LanguageCoverage from "@/components/shared/language-coverage";
import { EngineeredAudio, VoiceTechnology, WhatsNext } from "@/components/shared/voice-technology";
import { LandingSmoothScroll } from "@/components/motion/LandingSmoothScroll";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQS } from "@/constants/faq";
import { FOOTER_SECTIONS } from "@/constants/footer";
import {
  BRAND_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const socialLinks =
  FOOTER_SECTIONS.find((section) => section.title === "Social Media")?.links.map(
    (link) => link.href,
  ) ?? [];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: socialLinks,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <LandingSmoothScroll>
      <main id="main-content">
        <JsonLd id="ld-organization" data={organizationSchema} />
        <JsonLd id="ld-website" data={websiteSchema} />
        <JsonLd id="ld-software-application" data={softwareApplicationSchema} />
        <JsonLd id="ld-faq" data={faqSchema} />
        <LaserHero />
        <VoiceTechnology />
        <StackedCards />
        <LanguageCoverage />
        <EngineeredAudio />
        <WhyMiralas />
        <WhatsNext />
        <FaqSection />
      </main>
    </LandingSmoothScroll>
  );
}
