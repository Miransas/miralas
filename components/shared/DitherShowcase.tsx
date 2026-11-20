"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  VIEWPORT_EARLY,
  VIEWPORT_ONCE,
  cardReveal,
  eyebrowReveal,
  headingReveal,
  paragraphReveal,
  staggerContainer,
} from "@/lib/motion";

type ShowcaseItem = {
  src: string;
  alt: string;
  title: string;
  text: string;
  status: string;
  featured?: boolean;
};

const ITEMS: ShowcaseItem[] = [
  {
    src: "/img/ember.png",
    alt: "Abstract visual representing text-to-speech generation",
    title: "Text-to-speech",
    text: "Turn written content into spoken audio. The active engine supports 23 languages; public access is not confirmed.",
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
    title: "Uzbek Speech — In Development",
    text: "Uzbek is the first language focus for our voice work. Research, data collection and model evaluation are ongoing.",
    status: "In development",
    featured: true,
  },
];

export function DitherShowcase() {
  return (
    <section className="relative overflow-x-clip bg-surface-page py-24 text-text-heading md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-12 flex flex-col gap-5 pb-4 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={eyebrowReveal}
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]"
            >
              The Miransas voice stack
            </motion.p>
            <motion.h2
              variants={headingReveal}
              className="text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]"
            >
              What we&apos;re building.
            </motion.h2>
          </div>
          <motion.p
            variants={paragraphReveal}
            className="max-w-md text-[15px] leading-[1.6] text-text-muted sm:text-base"
          >
            A connected set of voice technologies — from natural speech generation
            to voice identity and conversational research.
          </motion.p>
        </motion.div>

        {/* Equal-sized cards — deliberately not a bento layout */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6"
        >
          {ITEMS.map((item, index) => (
            <motion.article
              key={item.title}
              variants={cardReveal}
              className={[
                "group surface-shadow relative flex min-w-0 flex-col overflow-hidden rounded-[26px] transition-[transform,background-color] duration-200 hover:-translate-y-0.5",
                item.featured
                  ? "surface-accent"
                  : "bg-surface-card hover:bg-surface-card-hover",
                "lg:col-span-2",
                index === 3 ? "lg:col-start-2" : "",
                index === 4
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.625rem)] lg:col-span-2 lg:col-start-4 lg:w-full"
                  : "",
              ].join(" ")}
            >
              {!item.featured && (
                <div
                  aria-hidden="true"
                  className="surface-hover-sheen pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-page dark:bg-[#050505]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.15] via-transparent to-transparent dark:from-[#000103]/45"
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-text-muted sm:text-[13px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex max-w-full items-center rounded-full bg-surface-page px-3 py-1 text-xs font-medium text-text-primary dark:bg-white/[0.06]">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-text-muted sm:text-base">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default DitherShowcase;
