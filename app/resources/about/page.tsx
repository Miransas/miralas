"use client";

import React from "react";
import { ArrowRight, Leaf, History, Sparkles, CheckCircle2 } from "lucide-react";
import LatestUpdatesSection from "../../../components/about/last-update";

const UPDATES = [
  {
    version: "v2.1.0",
    date: "Today",
    title: "Premium Design & Dark Mode",
    desc: "The interface has been redesigned with a refined Zinc palette and a seamless dark mode.",
    current: true,
  },
  {
    version: "v1.5.4",
    date: "October 2023",
    title: "Infrastructure Optimization",
    desc: "System performance improved by 40%, and new data models were integrated.",
    current: false,
  },
  {
    version: "v1.0.0",
    date: "August 2023",
    title: "First Release & Launch",
    desc: "Where it all began: the first lines of code brought a solo vision to life.",
    current: false,
  },
];

export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#fafafa] dark:bg-black py-24 px-6 md:px-12 font-sans text-zinc-900 dark:text-zinc-50 overflow-hidden transition-colors duration-500">
      
      {/* Background glow (dark mode) */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.02] dark:bg-white/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        
        {/* ================= STORY & IMAGES (TOP SECTION) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: story copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm backdrop-blur-md">
              <Leaf className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
                My Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              A journey that began with a single idea, <span className="text-zinc-400 dark:text-zinc-500">inspired by nature.</span>
            </h2>

            <div className="space-y-5 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <p>
                It all began when I set out on my own with a big vision. My goal was to solve complex problems with an experience that felt elegant, simple, and as seamless as nature itself.
              </p>
              <p>
                By stepping away from the noise and focusing on what matters, I set out to build not just a product, but quiet, powerful, timeless technology. Like a tree with deep roots, I continue to grow with steady steps.
              </p>
            </div>

            <div className="pt-4">
              <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer">
                Read the full story
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: nature-inspired images (bento grid) */}
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            {/* Large image */}
            <div className="col-span-1 h-full rounded-[2rem] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format&fit=crop" 
                alt="Nature inspiration 1"
                className="w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
            
            {/* Two smaller images on the right */}
            <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
              <div className="row-span-1 w-full h-full rounded-[2rem] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop" 
                  alt="Nature inspiration 2"
                  className="w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="row-span-1 w-full h-full rounded-[2rem] overflow-hidden group bg-zinc-100 dark:bg-white/5 flex items-center justify-center relative">
                 <img 
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop" 
                  alt="Nature inspiration 3"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
            </div>
          </div>

        </div>
      <LatestUpdatesSection/>
      </div>
    </section>
  );
}