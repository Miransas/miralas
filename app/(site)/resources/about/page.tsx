import React from 'react'
import About from  "./about.mdx"
const page = () => {
  return (
    <div>
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 md:px-8">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <About />
      </article>
    </main>
    </div>
  )
}

export default page