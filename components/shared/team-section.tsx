/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Check, Users, Eye, Sparkles } from "lucide-react";

const ARTISTS = [
  {
    id: 1,
    name: "tayo",
    verified: true,
    bio: "product engineer & designer building useful products and designing better experiences.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    stats: { followers: "24", views: "1.8K" },
    buttonText: "Listen",
  },
  {
    id: 2,
    name: "shahzoda",
    verified: true,
    bio: "lead neural voice actor specializing in Uzbek & multilingual acoustic cloning.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    stats: { followers: "142", views: "12.4K" },
    buttonText: "Listen",
  },
  {
    id: 3,
    name: "miralas",
    verified: true,
    bio: "ai audio architect developing low-latency streaming pipelines & voice agents.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    stats: { followers: "89", views: "8.2K" },
    buttonText: "Listen",
  },
  {
    id: 4,
    name: "elena",
    verified: true,
    bio: "sound engineer & speech synthesis research director at miransas projects.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
    stats: { followers: "310", views: "24.1K" },
    buttonText: "Listen",
  },
];

export default function TeamSection() {
  return (
    <section className="w-full bg-background dark:bg-black py-24 px-6 md:px-12 font-sans transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Başlık Bölümü */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 dark:border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3" />
              <span>Miransas Creators</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              Featured Voice Artists
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md">
            Meet the engineers and voice actors behind our next-generation
            neural speech models.
          </p>
        </div>

        {/* 4'lü Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="group relative h-[460px] w-full rounded-[2rem] overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-100 dark:bg-[#0a0a0a] shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20"
            >
              {/* Arka Plan Resmi */}
              <img
                src={artist.image}
                alt={artist.name}
                className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Alt Gradyan & Blur Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

              {/* Kart İçerik Alanı */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end space-y-3.5 backdrop-blur-[2px]">
                {/* İsim + Yeşil Doğrulama Rozeti */}
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {artist.name}.
                  </h3>
                  {artist.verified && (
                    <span className="flex items-center justify-center size-5 rounded-full bg-emerald-500 text-black">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Açıklama / Bio */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 font-normal">
                  {artist.bio}
                </p>

                {/* İstatistikler & Buton Alt Çubuğu */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {/* Sol İstatistikler */}
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3.5 text-zinc-400" />
                      <span>{artist.stats.followers}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="size-3.5 text-zinc-400" />
                      <span>{artist.stats.views}</span>
                    </div>
                  </div>

                  {/* Sağ Buton */}
                  <button
                    type="button"
                    className="px-4 py-1.5 cursor-pointer rounded-full bg-white/90 hover:bg-white text-zinc-900 text-xs font-medium transition-all duration-200 active:scale-95 backdrop-blur-md shadow-sm"
                  >
                    {artist.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}