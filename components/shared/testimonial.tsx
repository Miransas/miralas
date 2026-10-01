/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURED_REVIEWS, MARQUEE_COLUMN_1, MARQUEE_COLUMN_2, MarqueeReview } from "@/constants/testimonials";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3 saniyede bir ince geçiş süresi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeReview = FEATURED_REVIEWS[currentIndex];

  return (
    <section className="relative w-full min-h-screen bg-background py-24 px-6 md:px-16 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* SOL TARAF */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
              Loved by creators and product teams
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Join the teams using Miralas to create more natural, expressive voice experiences.
            </p>
          </div>

          <div className="relative min-h-[220px] flex items-center rounded-3xl border border-border bg-card p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="text-5xl text-muted-foreground/40 font-serif leading-none select-none mb-1">“</div>
                <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">
                  {activeReview.quote}
                </p>
                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-border/50">
                  <img src={activeReview.avatar} alt={activeReview.author} className="w-10 h-10 rounded-full object-cover border border-border" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{activeReview.author}</h4>
                    <p className="text-xs text-muted-foreground">{activeReview.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SAĞ TARAF (Marquee Kolonları) */}
        <div className="lg:col-span-7 relative h-[550px] grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">

          {/* Kolon 1 */}
          <div className="marquee-up-container flex flex-col gap-6 w-full">
            {[...MARQUEE_COLUMN_1, ...MARQUEE_COLUMN_1].map((card, idx) => (
              <ReviewCard key={`col1-${idx}`} {...card} />
            ))}
          </div>

          {/* Kolon 2 */}
          <div className="hidden md:flex marquee-down-container flex-col gap-6 w-full">
            {[...MARQUEE_COLUMN_2, ...MARQUEE_COLUMN_2].map((card, idx) => (
              <ReviewCard key={`col2-${idx}`} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ReviewCard({ text, author, handle, avatar }: MarqueeReview) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm transition-all duration-300 hover:border-border/80 flex flex-col justify-between space-y-4 w-full">
      <p className="text-foreground text-sm leading-relaxed">{text}</p>
      <div className="flex items-center space-x-3 pt-3 border-t border-border/40">
        <img src={avatar} alt={author} className="w-8 h-8 rounded-full object-cover border border-border" />
        <div>
          <h5 className="font-semibold text-foreground text-xs">{author}</h5>
          <span className="text-xs text-muted-foreground">{handle}</span>
        </div>
      </div>
    </div>
  );
}
