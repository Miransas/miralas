import SmoothScroll from "../../components/providers/SmoothScroll"
import FaqSection from "../../components/shared/faq"
import Hero from "../../components/shared/hero"
import TeamSection from "../../components/shared/team-section"
import TestimonialSection from "../../components/shared/testimonial"
import VoiceWorkflowSection from "../../components/shared/VoiceWorkflowSection"




const page = () => {
  return (
    <SmoothScroll>
      <div>
        <Hero />
           <VoiceWorkflowSection/>
        {/* <VoiceLibrary /> tez orada keladi  */}
        {/* <FeatureSection /> */}
        {/* <FeaturesBentoSection/> */}
        {/* <VoiceFeaturesSection/> tez orada keladi */}
    
       
        {/* <SpeechToTextSection/> tez orada keladi */}
      
         {/* <VideoSections/>  tez orada keladi*/}
         <TeamSection/>
        <FaqSection />
        <TestimonialSection/>
        {/* <IntegrationCardDemo/> */}
      </div>

    </SmoothScroll>
  )
}

export default page
