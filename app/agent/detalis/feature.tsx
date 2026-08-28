import {
  Bot,
  Image as ImageIcon,
  MessageSquare,
  Mic,
  Sparkles,
  Terminal,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Chat",
    body: "Reasoning you can follow. Research, writing, and recaps in one thread — with images, video, and code when you need them.",
  },
  {
    icon: Terminal,
    title: "Build",
    body: "An agent that reads the repo, greps, edits, and ships. Watch the work happen instead of pasting diffs by hand.",
  },
  {
    icon: Bot,
    title: "Bot",
    body: "Always-on teammates with their own computer. Hand off receipts, inboxes, and busywork — they keep going overnight.",
  },
  {
    icon: ImageIcon,
    title: "Imagine",
    body: "Photoreal stills and video from a sentence or a reference. Campaign-grade lighting, not clip-art.",
  },
  {
    icon: Mic,
    title: "Voice",
    body: "Low-latency talk. Interrupt, change topic, stay in flow. Agents that sound like people, not menus.",
  },
  {
    icon: Sparkles,
    title: "One API",
    body: "Text, code, voice, images, and video through a single key. Same models you use in the product.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <p className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
        Capabilities
      </p>
      <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Every modality. One surface.
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-400">
        Chat, code, agents, media, and voice — designed to feel like one product, not a pile of tools.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="group rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm transition-colors hover:border-stone-700 hover:bg-stone-800/60"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-stone-800/80 text-stone-300 transition-colors group-hover:bg-stone-700 group-hover:text-white">
              <f.icon className="size-5" strokeWidth={1.6} />
            </div>
            <h3 className="mt-4 text-base font-medium text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">
              {f.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}