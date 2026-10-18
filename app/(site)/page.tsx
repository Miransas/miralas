import SmoothScroll from "../../components/providers/SmoothScroll"
import { ComparisonSection } from "../../components/shared/comparison-section"
import DemoCarousel from "../../components/shared/demo-carousel"
import { DitherShowcase } from "../../components/shared/DitherShowcase"
import FaqSection from "../../components/shared/faq"
import Hero from "../../components/shared/hero"
import { RobotSection } from "../../components/shared/robot-section"
import TeamSection from "../../components/shared/team-section"
import TestimonialSection from "../../components/shared/testimonial"
import { VoiceContrastSection } from "../../components/shared/voice-contrast-section"





const page = () => {
  return (
    <SmoothScroll>
      <div>
        <Hero />
          <VoiceContrastSection/>
          <DemoCarousel/>
          <DitherShowcase/>
           <ComparisonSection />
           <RobotSection/>
         <TeamSection/>
        <FaqSection />
        <TestimonialSection/>
      </div>
    </SmoothScroll>
  )
}

export default page
