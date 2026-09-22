"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- VERİLER ---
const featuredReviews = [
  {
    id: 1,
    quote: "Miralas helped us turn a rough voice prototype into a polished experience our customers actually wanted to use.",
    author: "Maya Chen",
    role: "Product Lead, Northstar",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_1.png"
  },
  {
    id: 2,
    quote: "The voices sound natural, the API is straightforward, and our team shipped the first production workflow in a single afternoon.",
    author: "Ethan Brooks",
    role: "Founder, Fieldnote",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_2.png"
  },
  {
    id: 3,
    quote: "We can create expressive narration at the speed of an idea. Miralas has become part of our everyday creative process.",
    author: "Olivia Martin",
    role: "Creative Director, Kinetic",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_3.png"
  }
];

const marqueeCardsColumn1 = [
  {
     text: "The voice quality is impressive straight out of the box. We went from script to finished narration without a studio session.",
    author: "Avery Stone",
    handle: "@averystone",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    text: "Miralas makes it easy to test different tones and pacing until the read feels right. It has completely changed our workflow.",
    author: "Jordan Ellis",
    handle: "@jordanellis",
    avatar: "https://i.pravatar.cc/150?img=12"
 },
 {
   text: "We added natural voice previews to our product in a few minutes. The developer experience is excellent.",
   author: "Noah Williams",
   handle: "@noahw",
   avatar: "https://i.pravatar.cc/150?img=13"
  }
];

const marqueeCardsColumn2 = [
  { text: "The ability to shape a voice around the mood of each piece gives our content a level of personality we could not get before.", author: "Theo Grant", handle: "@theogrant", avatar: "https://i.pravatar.cc/150?img=14" },
  { text: "We moved our audio production from a long manual process to a fast, repeatable workflow while keeping full creative control.", author: "Riley Solis", handle: "@rileysolis", avatar: "https://i.pravatar.cc/150?img=15" },
  { text: "The voices are clear, consistent, and expressive enough for real customer-facing experiences. It feels ready for production.", author: "Leo Robinson", handle: "@leorobinson", avatar: "https://i.pravatar.cc/150?img=16" }
];

// --- BİLEŞEN ---
export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2 Saniyede bir kart değiştirme
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = featuredReviews[currentIndex];

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a0]  py-20 px-6 md:px-16 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* SOL TARAF */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight dark:text-stone-200">
              Loved by creators and product teams
            </h2>
            <p className="mt-4 text-md dark:text-stone-300">
              Join the teams using Miralas to create more natural, expressive voice experiences.
            </p>
          </div>

          <div className="relative min-h-[250px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full absolute"
              >
                <div className="text-6xl dark:text-stone-400 font-serif leading-none select-none mb-2">“</div>
                <p className="text-stone-400 font-medium text-md md:text-md leading-relaxed">
                  {activeReview.quote}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <img src={activeReview.avatar} alt={activeReview.author} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-semibold text-stone-400 text-sm">{activeReview.author}</h4>
                    <p className="text-xs text-stone-400 dark:text-stone-300">{activeReview.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SAĞ TARAF */}
        <div className="lg:col-span-7 relative h-[600px] grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_50%,black_95%,transparent),linear-gradient(to_right,transparent,black_20%,black_95%,transparent)]
            [mask-composite:intersect]">

          {/* Kolon 1: Aşağıdan Yukarıya (CSS Class: marquee-up-container) */}
          <div className="marquee-up-container flex flex-col gap-6 w-full">
            {[...marqueeCardsColumn1, ...marqueeCardsColumn1].map((card, idx) => (
              <ReviewCard key={`col1-${idx}`} {...card} />
            ))}
          </div>

          {/* Kolon 2: Yukarıdan Aşağıya (CSS Class: marquee-down-container) */}
          <div className="hidden md:flex marquee-down-container flex-col gap-6 w-full">
            {[...marqueeCardsColumn2, ...marqueeCardsColumn2].map((card, idx) => (
              <ReviewCard key={`col2-${idx}`} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ReviewCard({ text, author, handle, avatar }: { text: string; author: string; handle: string; avatar: string }) {
  return (
    <div className="bg-white/90 dark:bg-[#0f0f0f] backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 w-full">
      <p className="dark:text-stone-200 text-sm leading-relaxed">{text}</p>
      <div className="flex items-center space-x-3 pt-2">
        <img src={avatar} alt={author} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <h5 className="font-semibold text-stone-400 dark:text-stone-200 text-xs">{author}</h5>
          <span className="text-xs text-stone-400 dark:text-stone-300">{handle}</span>
        </div>
      </div>
    </div>
  );
}
