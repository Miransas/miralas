import React from 'react'
import { Header } from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/shared/hero'

import FeatureSection from '../components/shared/feature-sections'

import FaqSection from '../components/shared/faq'
import VoiceLibrary from '../components/shared/voice-library'
import SmoothScroll from '../components/providers/SmoothScroll'
import { VideoOffIcon } from 'lucide-react'
import { VideoSections } from '../components/shared/video-sections'
import TestimonialSection from '../components/shared/testimonial'
import { IntegrationCardDemo } from '../components/shared/integration'
import VoiceFeaturesSection from '../components/shared/VoiceFeaturesSection'
import TeamSection from '../components/shared/team-section'
import LiveSection from '../components/shared/live-section'
import SpeechToTextSection from '../components/shared/SpeechToTextSection'
import VoiceLibrarySection from '../components/shared/VoiceLibrarySection'
import VoiceWorkflowSection from '../components/shared/VoiceWorkflowSection'
import FeaturesBentoSection from '../components/shared/feature-bento'
import { IsometricVoiceIntegration } from '../components/shared/voice-integration'





const page = () => {
  return (
    <SmoothScroll>
      <div>
        <Hero />
       
        {/* <VoiceLibrary /> */}
        <FeatureSection />
        <FeaturesBentoSection/>
        <VoiceFeaturesSection/>
        <VoiceWorkflowSection/>
        {/* <VoiceLibrarySection/> */}
        <SpeechToTextSection/>
      
        {/* <LiveSection/> */}
         {/* <VideoSections/> */}
         <TeamSection/>
        <FaqSection />
        <TestimonialSection/>
        {/* <IntegrationCardDemo/> */}
       
      </div>

    </SmoothScroll>
  )
}

export default page
