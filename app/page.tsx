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



const page = () => {
  return (
    <SmoothScroll>
      <div>
        <Header />
        <Hero />
        <VoiceLibrary />
        <FeatureSection />
         <VideoSections/> 
        {/* <HowItWorks /> */}
        <FaqSection />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default page