"use client";

import { Check, Users, Eye, Sparkles } from "lucide-react";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

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
    <section className="w-full bg-surface-page px-6 py-24 font-sans text-text-heading transition-colors duration-(--motion-interaction-duration) md:px-12">
      <div className="mx-auto max-w-[1200px] space-y-12">
        {/* Heading section */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              <Sparkles className="size-3.5 text-text-heading" />
              <span>Miransas Creators</span>
            </div>
            <h2 className="text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]">
              Featured Voice Artists
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.6] text-text-muted sm:text-base">
            Meet the engineers and voice actors behind our next-generation
            neural speech models.
          </p>
        </div>

        {/* Four-card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="dark group surface-shadow relative h-[460px] w-full overflow-hidden rounded-4xl bg-surface-card transition-transform duration-(--motion-interaction-duration) hover:-translate-y-0.5"
            >
              {/* Background portrait */}
              <img
                src={artist.image}
                alt={artist.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Neutral contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-card/95 via-surface-card/45 to-transparent opacity-95" />

              {/* Card content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end space-y-3.5 p-6 backdrop-blur-[2px]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-2xl">
                    {artist.name}.
                  </h3>
                  {artist.verified && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-text-heading text-white">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="line-clamp-2 text-xs leading-[1.5] text-text-primary sm:text-[13px]">
                  {artist.bio}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs font-medium text-text-primary">
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3.5 text-text-muted" />
                      <span>{artist.stats.followers}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="size-3.5 text-text-muted" />
                      <span>{artist.stats.views}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`cursor-pointer rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#050505] transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-(--motion-interaction-duration) hover:bg-[#D1D1D1] active:scale-[0.98] ${FOCUS_RING}`}
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
