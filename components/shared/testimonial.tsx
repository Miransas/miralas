"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import {
  FEATURED_REVIEWS,
  MARQUEE_COLUMN_1,
  MARQUEE_COLUMN_2,
  type MarqueeReview,
} from "@/constants/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;
const ROTATE_INTERVAL = 5200;

type Review = (typeof FEATURED_REVIEWS)[number];

function Avatar({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md";
}) {
  return (
    // The testimonial data may contain remote avatar URLs; plain img avoids
    // requiring every avatar host to be added to next.config.js.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={
        size === "sm"
          ? "size-9 rounded-full border border-black/10 object-cover dark:border-white/10"
          : "size-11 rounded-full border border-black/10 object-cover dark:border-white/10"
      }
    />
  );
}

function ReviewCard({ text, author, handle, avatar }: MarqueeReview) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease }}
      className="flex w-full flex-col justify-between gap-5 rounded-[22px] border border-black/[0.07] bg-[#F7F7F7] p-5 shadow-[0_8px_28px_rgba(0,0,0,0.035)] dark:border-white/[0.08] dark:bg-[#0D0D0D] dark:shadow-none sm:p-6"
    >
      <div>
        <Quote
          aria-hidden="true"
          className="mb-3 size-5 text-black/25 dark:text-white/25"
          strokeWidth={1.7}
        />
        <p className="text-[13px] leading-[1.75] text-[#454545] dark:text-white/65 sm:text-sm">
          {text}
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-black/[0.07] pt-4 dark:border-white/[0.08]">
        <Avatar src={avatar} alt={author} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-[#171717] dark:text-white/90">
            {author}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-black/45 dark:text-white/40">
            {handle}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function MarqueeColumn({
  items,
  direction = "up",
  reducedMotion,
  className = "",
}: {
  items: MarqueeReview[];
  direction?: "up" | "down";
  reducedMotion: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;

  const copies = reducedMotion ? 1 : 2;

  return (
    <div
      className={`relative h-full min-h-0 overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <motion.div
        aria-hidden="true"
        className="flex flex-col"
        animate={
          reducedMotion
            ? { y: "0%" }
            : { y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: direction === "up" ? 34 : 39,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {Array.from({ length: copies }, (_, copyIndex) => (
          <div key={copyIndex} className="flex flex-col gap-4 pb-4">
            {items.map((item, index) => (
              <ReviewCard key={`${copyIndex}-${index}-${item.author}`} {...item} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FeaturedReview({ review }: { review: Review }) {
  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease }}
      className="w-full"
    >
      <Quote
        aria-hidden="true"
        className="mb-5 size-8 text-black/20 dark:text-white/20"
        strokeWidth={1.5}
      />
      <blockquote className="text-[17px] font-medium leading-[1.65] tracking-[-0.02em] text-[#202020] dark:text-white/90 sm:text-xl">
        “{review.quote}”
      </blockquote>
      <div className="mt-7 flex items-center gap-3 border-t border-black/[0.08] pt-5 dark:border-white/[0.09]">
        <Avatar src={review.avatar} alt={review.author} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#171717] dark:text-white">
            {review.author}
          </p>
          <p className="mt-0.5 truncate text-xs text-black/45 dark:text-white/45">
            {review.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  const reducedMotion = !!useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasFeaturedReviews = FEATURED_REVIEWS.length > 0;
  const activeReview = hasFeaturedReviews
    ? FEATURED_REVIEWS[currentIndex % FEATURED_REVIEWS.length]
    : null;

  useEffect(() => {
    if (reducedMotion || paused || FEATURED_REVIEWS.length < 2) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % FEATURED_REVIEWS.length);
    }, ROTATE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const goTo = (direction: -1 | 1) => {
    if (FEATURED_REVIEWS.length < 2) return;
    setCurrentIndex(
      (current) =>
        (current + direction + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length,
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#EFEFEF] py-20 text-[#151515] transition-colors duration-500 dark:bg-[#050505] dark:text-white sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Featured review */}
        <div className="relative z-10 lg:col-span-5">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/40">
              Community voices
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#111111] dark:text-white sm:text-4xl md:text-[46px]">
              Made for voices that matter.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-black/55 dark:text-white/50 sm:text-base">
              A closer look at the experiences and perspectives shared by the
              people exploring voice technology with Miransas.
            </p>
          </motion.div>

          {activeReview ? (
            <div
              className="mt-9 rounded-[28px] border border-black/[0.07] bg-[#F7F7F7] p-6 shadow-[0_14px_44px_rgba(0,0,0,0.045)] dark:border-white/[0.08] dark:bg-[#0D0D0D] dark:shadow-none sm:mt-11 sm:p-8"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setPaused(false);
                }
              }}
            >
              <div className="min-h-[205px]">
                <AnimatePresence mode="wait" initial={false}>
                  <FeaturedReview review={activeReview} />
                </AnimatePresence>
              </div>

              {FEATURED_REVIEWS.length > 1 && (
                <div className="mt-5 flex items-center justify-between border-t border-black/[0.07] pt-5 dark:border-white/[0.08]">
                  <div className="flex items-center gap-1.5" aria-label="Review position">
                    {FEATURED_REVIEWS.map((review, index) => (
                      <button
                        key={review.id}
                        type="button"
                        aria-label={`Show review ${index + 1}`}
                        aria-current={index === currentIndex ? "true" : undefined}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 ${
                          index === currentIndex
                            ? "w-7 bg-[#171717] dark:bg-white"
                            : "w-1.5 bg-black/20 hover:bg-black/40 dark:bg-white/20 dark:hover:bg-white/45"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous review"
                      onClick={() => goTo(-1)}
                      className="grid size-9 place-items-center rounded-full border border-black/10 text-[#222222] transition hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/10 dark:text-white dark:hover:bg-white/[0.07] dark:focus-visible:ring-white/50"
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next review"
                      onClick={() => goTo(1)}
                      className="grid size-9 place-items-center rounded-full border border-black/10 text-[#222222] transition hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/10 dark:text-white dark:hover:bg-white/[0.07] dark:focus-visible:ring-white/50"
                    >
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-9 rounded-[28px] border border-black/[0.07] bg-[#F7F7F7] p-8 text-sm text-black/55 dark:border-white/[0.08] dark:bg-[#0D0D0D] dark:text-white/50">
              Testimonials will appear here when they are available.
            </div>
          )}
        </div>

        {/* Quiet, continuous review streams — not a bento grid. */}
        <div className="relative grid h-[520px] grid-cols-1 gap-4 overflow-hidden sm:h-[590px] md:grid-cols-2 md:gap-5 lg:col-span-7">
          <MarqueeColumn
            items={MARQUEE_COLUMN_1}
            direction="up"
            reducedMotion={reducedMotion}
          />
          <MarqueeColumn
            items={MARQUEE_COLUMN_2}
            direction="down"
            reducedMotion={reducedMotion}
            className="hidden md:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#EFEFEF] to-transparent dark:from-[#050505]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#EFEFEF] to-transparent dark:from-[#050505]"
          />
        </div>
      </div>
    </section>
  );
}
