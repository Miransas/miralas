import React from 'react'
import { Header } from '../../components/layout/Header'
import AgentHero from './detalis/agent-hero'
import { FeaturesSection } from './detalis/feature'
import { VoiceHowItWorks } from './detalis/VoiceHowItWorks'

const page = () => {
  return (
    <div>
      <Header />
      <div className='mt-10'>
        <AgentHero/>
        <FeaturesSection/>
        <VoiceHowItWorks/>
      </div>
    </div>
  )
}

export default page