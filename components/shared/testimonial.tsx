"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- VERİLER ---
const featuredReviews = [
  {
    id: 1,
    quote: "Clerk's integration gives Supabase developers another incredible option for handling authentication. And the Clerk team are a pleasure to work with.",
    author: "Paul Copplestone",
    role: "Supabase, CEO",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    quote: "Switching to this auth platform reduced our integration time from weeks to hours. Pure magic for developer experience!",
    author: "Guillermo Rauch",
    role: "Vercel, CEO",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    quote: "The pre-built components are gorgeous and saved us hundreds of design & engineering hours on user management.",
    author: "Sarah Drasner",
    role: "Google, Engineering Director",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

const marqueeCardsColumn1 = [
  { text: "This is why I like using an auth service like Clerk. I rolled my own auth and this is the amount of code I needed...", author: "WebDevCody", handle: "@webdevcody", avatar: "https://i.pravatar.cc/150?img=11" },
  { text: "The @clerk CLI is really good. Authentication used to be such a nightmare, but the CLI makes things very easy.", author: "Dan Abramov", handle: "@dan_abramov", avatar: "https://i.pravatar.cc/150?img=12" },
  { text: "Just set up full auth with session management in under 10 minutes. Unbelievable DX!", author: "Theo - t3.gg", handle: "@theo", avatar: "https://i.pravatar.cc/150?img=13" }
];

const marqueeCardsColumn2 = [
  { text: "Middleware-level auth validation (no more 'sign in' button flash!) - Organizations with built-in UI for adding users...", author: "Theo - t3.gg", handle: "@theo", avatar: "https://i.pravatar.cc/150?img=14" },
  { text: "I implemented authentication in my starter app using Clerk's custom flow setup, and it's been great having full flexibility.", author: "ronald solticzki", handle: "@RSolticzki", avatar: "https://i.pravatar.cc/150?img=15" },
  { text: "The multi-tenant logic and organization switching works seamlessly out of the box.", author: "Lee Robinson", handle: "@leerob", avatar: "https://i.pravatar.cc/150?img=16" }
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-stone-300">
              Trusted around the world
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Join the customers and champions who trust Clerk. Free for your first 50,000 monthly retained users.
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
                <div className="text-6xl text-stone-300 font-serif leading-none select-none mb-2">“</div>
                <p className="text-stone-400 font-medium text-lg md:text-xl leading-relaxed">
                  {activeReview.quote}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <img src={activeReview.avatar} alt={activeReview.author} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-semibold text-stone-400 text-sm">{activeReview.author}</h4>
                    <p className="text-xs text-stone-400">{activeReview.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SAĞ TARAF */}
        <div className="lg:col-span-7 relative h-[600px] grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          
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
    <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 w-full">
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
      <div className="flex items-center space-x-3 pt-2">
        <img src={avatar} alt={author} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <h5 className="font-semibold text-slate-900 text-xs">{author}</h5>
          <span className="text-xs text-slate-400">{handle}</span>
        </div>
      </div>
    </div>
  );
}