"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Miralas gave our Uzbek learning app natural narration without weeks of studio work.",
    name: "Dilnoza Karimova",
    role: "Product Lead, BilimLab",
    logo: "BL",
  },
  {
    quote:
      "The donation flow helped our creator network collect support in a way that felt trustworthy.",
    name: "Aziz Rahmonov",
    role: "Founder, Ovoza",
    logo: "OV",
  },
  {
    quote:
      "We moved from generic voices to localized audio that our customers immediately recognized.",
    name: "Madina Saidova",
    role: "CX Director, Payme Studio",
    logo: "PS",
  },
];

export function Customers() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-28 sm:py-36 lg:px-8">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-12%] top-[10%] h-[460px] w-[460px] rounded-full bg-sky-500/[0.035] blur-[130px] dark:bg-sky-400/[0.045]" />

        <div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.025] blur-[130px] dark:bg-emerald-400/[0.035]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/15 bg-sky-500/[0.055] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-400/15 dark:bg-sky-400/[0.06] dark:text-sky-400">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-current" />
            </span>

            Customers
          </div>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.7rem]">
            Built for ambitious teams
            <br />
            <span className="text-muted-foreground/50">
              serving Uzbekistan.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
            From education platforms to creator ecosystems, Miralas helps
            teams turn local voices into better digital experiences.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-[26px] border border-border/70 bg-card/65 p-6 backdrop-blur-xl transition-all duration-500 hover:border-border hover:bg-card hover:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_30px_90px_-55px_rgba(255,255,255,0.12)] sm:p-7">
                {/* Hover light */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-sky-500/[0.06] blur-3xl dark:bg-sky-400/[0.055]" />
                </div>

                {/* Top row */}
                <div className="relative flex items-start justify-between">
                  <motion.div
                    whileHover={{
                      scale: 1.06,
                      rotate: -2,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="flex size-12 items-center justify-center rounded-[15px] border border-border bg-foreground text-sm font-bold tracking-tight text-background shadow-sm"
                  >
                    {item.logo}
                  </motion.div>

                  <div className="flex items-center gap-1 rounded-full border border-border/70 bg-muted/50 px-2.5 py-1.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="size-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote icon */}
                <div className="relative mt-9">
                  <Quote className="size-7 text-sky-500/20 transition-colors duration-500 group-hover:text-sky-500/35 dark:text-sky-400/20 dark:group-hover:text-sky-400/35" />
                </div>

                {/* Quote */}
                <p className="relative mt-3 text-[17px] leading-8 tracking-[-0.015em] text-foreground/90">
                  “{item.quote}”
                </p>

                {/* Divider */}
                <div className="relative my-7 h-px w-full bg-border/70" />

                {/* Person */}
                <div className="relative flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.role}
                    </p>
                  </div>

                  <div className="flex size-8 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:border-sky-500/20 group-hover:bg-sky-500/[0.06] group-hover:text-sky-600 dark:group-hover:border-sky-400/20 dark:group-hover:text-sky-400">
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-sky-500/40 via-sky-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-sky-400/40"
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          className="mt-8 flex items-center gap-4 px-1"
        >
          <div className="h-px flex-1 bg-border/60" />

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
            <span>Trusted experiences</span>
            <span className="size-1 rounded-full bg-muted-foreground/30" />
            <span>Miralas</span>
          </div>

          <div className="h-px flex-1 bg-border/60" />
        </motion.div>
      </div>
    </section>
  );
}

export default Customers;