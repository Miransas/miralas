"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ShowcaseItem = {
  src: string;
  alt: string;
  title: string;
  text: string;
  status: string;
};

const ITEMS: ShowcaseItem[] = [
  {
    src: "/img/ember.png",
    alt: "Abstract visual representing text-to-speech generation",
    title: "Text-to-speech",
    text: "Turn written content into spoken audio. English, Turkish and Russian are available in internal builds.",
    status: "Internal testing",
  },
  {
    src: "/img/violet.png",
    alt: "Abstract visual representing a voice identity",
    title: "Voice cloning",
    text: "Create reusable voice identities with the speaker’s knowledge and consent.",
    status: "In development",
  },
  {
    src: "/img/ocean.png",
    alt: "Abstract visual representing speech transformation",
    title: "Speech-to-speech",
    text: "Transform the character of a recording while preserving its timing and expression.",
    status: "In development",
  },
  {
    src: "/img/mono.png",
    alt: "Abstract visual representing a real-time voice agent",
    title: "Voice agents",
    text: "Build voice experiences that can respond, follow workflows and hand conversations over when needed.",
    status: "Early development",
  },
  {
    src: "/img/aurora.png",
    alt: "Abstract visual representing Uzbek speech technology",
    title: "Uzbek, first",
    text: "Uzbek is the first language focus for our voice work. Model training is underway.",
    status: "Training",
  },
];

export function DitherShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#EFEFEF] py-24 text-[#111111] transition-colors duration-500 dark:bg-[#050505] dark:text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-5 border-b border-black/10 pb-8 dark:border-white/10 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-10">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-white/45">
              The Miransas voice stack
            </p>
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              What we&apos;re building.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 dark:text-white/55 md:text-base">
            A connected set of voice technologies — from natural speech generation
            to expressive, real-time voice experiences.
          </p>
        </div>

        {/* Equal-sized cards — deliberately not a bento layout */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {ITEMS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.62, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "group flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-black/[0.06] bg-[#F7F7F7] shadow-[0_8px_30px_rgba(0,0,0,0.035)] transition-[background-color,border-color,box-shadow] duration-500 dark:border-white/[0.09] dark:bg-[#0D0D0D] dark:shadow-none",
                "lg:col-span-2",
                index === 3 ? "lg:col-start-2" : "",
                index === 4 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.625rem)] lg:col-span-2 lg:col-start-4 lg:w-full" : "",
              ].join(" ")}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E5E5E5] dark:bg-[#151515]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-white/[0.06] dark:from-black/20 dark:to-white/[0.025]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.19em] text-neutral-500 dark:text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex max-w-full items-center rounded-full border border-black/[0.07] bg-black/[0.025] px-3 py-1.5 text-[10px] font-medium tracking-wide text-neutral-600 dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-white/60">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#151515] dark:text-white sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.75] text-neutral-600 dark:text-white/55 sm:text-sm">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DitherShowcase;
