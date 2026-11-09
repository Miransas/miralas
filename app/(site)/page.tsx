import SmoothScroll from "../../components/providers/SmoothScroll"
import { ComparisonSection } from "../../components/shared/comparison-section"
import DemoCarousel from "../../components/shared/demo-carousel"
import { DitherShowcase } from "../../components/shared/DitherShowcase"
import FaqSection from "../../components/shared/faq"
import IntroTeammateSection from "../../components/shared/intro-team-Section"
import LaserHero from "../../components/shared/laser-hero"
import { RobotSection } from "../../components/shared/robot-section"
import StackedCards from "../../components/shared/Stackedcards"
import TestimonialSection from "../../components/shared/testimonial"
import WhyMiralas from "../../components/shared/WhyMiralas"





const page = () => {
  return (
    <SmoothScroll>
      <div>
        {/* <Hero /> */}           
        {/* <ImmersiveSection/> */}
        <LaserHero/>
        <StackedCards/>
        <WhyMiralas/>
        <IntroTeammateSection/>
          {/* <VoiceContrastSection/> */}
          <DemoCarousel/>
          <DitherShowcase/>
           <ComparisonSection />
           <RobotSection/>
         {/* <TeamSection/> */}
        <FaqSection />
        <TestimonialSection/>
      </div>
    </SmoothScroll>
  )
}

export default page
