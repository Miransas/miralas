import React from 'react'
import { Header } from '../../components/layout/Header'
import AgentHero from './detalis/agent-hero'
import { FeaturesSection } from './detalis/feature'

const page = () => {
  return (
    <div>
      <Header />
      <div className='mt-10'>
        <AgentHero/>
        <FeaturesSection/>
      </div>
    </div>
  )
}

export default page