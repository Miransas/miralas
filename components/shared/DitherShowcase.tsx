import Image from "next/image";

import { cn } from "@/lib/utils";

const ITEMS = [
  {
    src: "./img/ember.png",
    title: "Text-to-speech",
    text: "Turn text into spoken audio. English, Turkish and Russian work in our internal builds.",
    status: "Internal testing",
    className: "md:col-span-4 md:row-span-2",
  },
  {
    src: "./img/violet.png",
    title: "Voice cloning",
    text: "Voices recorded with the owner's consent. Cloning your own voice comes later.",
    status: "In development",
    className: "md:col-span-2",
  },
  {
    src: "./img/ocean.png",
    title: "Speech-to-speech",
    text: "Keep your timing and emphasis, change the voice.",
    status: "In development",
    className: "md:col-span-2",
  },
  {
    src: "./img/mono.png",
    title: "Voice agent",
    text: "Answer in your language and hand over when it cannot help.",
    status: "Early development",
    className: "md:col-span-3",
  },
  {
    src: "./img/aurora.png",
    title: "Uzbek first",
    text: "The language we are building for first. Model training has started.",
    status: "Training",
    className: "md:col-span-3",
  },
];

export function DitherShowcase() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What we are building
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything here is in development. The status is marked on every card.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:auto-rows-[240px] md:grid-cols-6">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className={cn(
                "group relative isolate min-h-[260px] overflow-hidden rounded-3xl bg-black ring-1 ring-black/5 dark:ring-white/10",
                item.className,
              )}
            >
              <Image
                src={item.src}
                alt=""
                aria-hidden
                fill
                unoptimized
                sizes="(min-width: 768px) 66vw, 100vw"
                className="-z-10 object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
              />

              <div className="flex h-full flex-col justify-end gap-2 p-6 text-white">
                <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  {item.status}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-white/75">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}