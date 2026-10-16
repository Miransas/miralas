import React from 'react'
import { GlowButton } from '../../components/ui/glow-button'

export const Folderstories = () => {
  return (
    <div className='font-sans flex flex-col mt-10 max-w-6xl h-screen mx-auto'>
      <h1 className='font-black '>Love me like do ooo </h1>
      <h1 className='font-black'>Geliyorsa sendan gelsin </h1>
      <h1 className='font-black'>I still can't get over you. I'm sorry; I miss you, but I can't say it. I remember every detail and will never forget. I drank too much and can't see what's ahead.</h1>
      <div className='flex  p-2  max-w-6xl  '>
        <div className='max-w-3.5xl w-full items-center h-[28rem] mx-auto '>
          <div className='relative w-full rounded-4xl '>
            <video
              autoPlay
              loop
              muted
              disablePictureInPicture
              disableRemotePlayback
              aria-label="Miralas platform preview video"

              className='rounded-4xl'
              src="/videos/hero-studio.mp4">

            </video>
            <div className='absolute top-0 flex mx-auto w-full items-center justify-center'>a</div>
          </div>
        </div>
      </div>
    </div>
  )
}
