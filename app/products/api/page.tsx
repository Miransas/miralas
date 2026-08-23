import React from 'react'
import { Header } from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { Hero } from './site/hero'
import { GettingStarted } from './site/getting-started'
import { Pricing } from './site/pricing'
import { Playground } from './site/playground'
import { Capabilities } from './site/capabilities'
import { ConsoleSection } from './site/console-section'
import { News } from './site/news'
import { Faq } from './site/faq'
import { Cloud } from './site/cloud'

const page = () => {
  return (
    <div>
      <Header variant='dark' />
      <div>
        <Hero />
        <GettingStarted />
        <Pricing />
        <Playground />
        <Capabilities />
        <ConsoleSection />
        <Cloud />
        <News />
        <Faq />
      </div>
      <Footer />
    </div>
  )
}

export default page