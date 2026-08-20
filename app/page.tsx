import React from 'react'
import { Header } from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/shared/hero'
import Faq from '../components/shared/faq'
import HowItWorks from '../components/shared/how-its-work'
import FeatureSection from '../components/shared/feature-sections'
import MediaShowcase from '../components/shared/media_showcase'


const page = () => {
  return (
    <div>
        <Header/>
         <Hero/>
         <FeatureSection/>
         {/* <MediaShowcase/> */}
         <HowItWorks/>
        <Footer/>
    </div>
  )
}

export default page