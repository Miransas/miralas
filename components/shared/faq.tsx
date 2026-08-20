"use client"

import React, { useState } from 'react'

import VignetteBloom from './VignetteBloom';

const Faq = () => {
     const [hovering, setHovering] = useState(false);
  return (
    <div className='w-full h-full'>
    <VignetteBloom/>
    </div>
  )
}

export default Faq