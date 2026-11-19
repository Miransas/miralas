import FaqSection from "@/components/shared/faq";
import LaserHero from "@/components/shared/laser-hero";
import StackedCards from "@/components/shared/Stackedcards";
import WhyMiralas from "@/components/shared/WhyMiralas";
import LanguageCoverage from "@/components/shared/language-coverage";
import { EngineeredAudio, VoiceTechnology, WhatsNext } from "@/components/shared/voice-technology";

export default function HomePage() {
  return (
    <main id="main-content">
      <LaserHero />
      <VoiceTechnology />
      <StackedCards />
      <LanguageCoverage />
      <EngineeredAudio />
      <WhyMiralas />
      <WhatsNext />
      <FaqSection />
    </main>
  );
}
