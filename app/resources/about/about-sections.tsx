"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Headphones, Music, Mic2, Award, Play } from "lucide-react"

const achievements = [
  { icon: Headphones, label: "Years of Experience", value: "10+" },
  { icon: Music, label: "Tracks Produced", value: "500+" },
  { icon: Mic2, label: "Artists Collaborated", value: "100+" },
  { icon: Award, label: "Awards Won", value: "15+" },
]

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.96, 1])

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Ambient background glow — ana sayfadaki parçacıklarla uyum */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 size-96 rounded-full bg-card/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 size-80 rounded-full bg-zinc-700/10 blur-[100px]" />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md">
              <Play className="size-3" />
              The Story
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            About <span className="text-muted-foreground">drannel</span>
          </motion.h2>

          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            {/* LEFT: Video with cinematic frame */}
            <motion.div style={{ y }} className="relative">
              {/* Glow behind video */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
              
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                {/* Top reflection bar */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  src="/videos/studio_hero.mp4"
                  className="aspect-[4/3] w-full object-cover opacity-90"
                />
                
                {/* Bottom gradient overlay for depth */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/80 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur-xl sm:-bottom-6 sm:-right-6 sm:p-5"
              >
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-xs text-muted-foreground">Years in the game</div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Story + Achievements */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg leading-8 text-muted-foreground sm:text-xl">
                  drannel is not just a beat maker; he&apos;s a sonic architect crafting the soundscapes of tomorrow. 
                  With a decade of experience and an ear for innovation, he pushes the boundaries of what&apos;s possible in music production.
                </p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  From chart-topping hits to underground anthems, drannel&apos;s versatile style and meticulous attention to detail ensure that each beat is not just a track, but a journey waiting to be explored by the right artist.
                </p>
              </motion.div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-border hover:bg-card/[0.06] sm:p-5"
                    >
                      {/* Hover glow */}
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      
                      <div className="relative">
                        <div className="mb-3 inline-flex rounded-xl bg-card/5 p-2.5 text-muted-foreground transition-colors group-hover:text-foreground group-hover:bg-card/10">
                          <Icon className="size-5" />
                        </div>
                        <div className="text-2xl font-bold text-foreground sm:text-3xl">{achievement.value}</div>
                        <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{achievement.label}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}