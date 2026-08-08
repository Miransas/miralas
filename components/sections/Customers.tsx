"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Miralas gave our Uzbek learning app natural narration without weeks of studio work.",
    name: "Dilnoza Karimova",
    role: "Product Lead, BilimLab",
    logo: "BL",
  },
  {
    quote: "The donation flow helped our creator network collect support in a way that felt trustworthy.",
    name: "Aziz Rahmonov",
    role: "Founder, Ovoza",
    logo: "OV",
  },
  {
    quote: "We moved from generic voices to localized audio that our customers immediately recognized.",
    name: "Madina Saidova",
    role: "CX Director, Payme Studio",
    logo: "PS",
  },
];

export function Customers() {
  return (
    <section className="bg-[#f7f7f6] px-6 py-24 dark:bg-black sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Customers</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Built for ambitious teams serving Uzbekistan.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[24px] border border-zinc-200/80 bg-white/82 p-6 shadow-[0_24px_90px_-58px_rgba(24,24,27,0.7)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-zinc-300/80 dark:border-white/10 dark:bg-zinc-950/78 dark:hover:border-white/18"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                  {item.logo}
                </div>
                <div className="flex text-amber-400" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-zinc-800 dark:text-zinc-200">{item.quote}</p>
              <div className="mt-8 border-t border-zinc-200 pt-5 dark:border-white/10">
                <p className="font-semibold text-zinc-950 dark:text-white">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
