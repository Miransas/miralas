import {
  AudioLines,
  Code2,
  FileStack,
  ImagePlay,
  MessageSquareText,
  Radio,
} from "lucide-react";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading } from "./section";

const ITEMS = [
  {
    icon: Code2,
    title: "Code",
    body: "Intelligent coding models for software engineering, building apps, and orchestrating agents.",
  },
  {
    icon: MessageSquareText,
    title: "Text generation",
    body: "Powerful text and reasoning models for chat, analysis, and problem-solving.",
  },
  {
    icon: Radio,
    title: "Live web & X search",
    body: "Tap into the now with real-time search, pulling fresh, relevant data from the web and X instantly.",
  },
  {
    icon: FileStack,
    title: "Files & collections",
    body: "Upload documents and let Grok search and reason over PDFs, spreadsheets, presentations, and more.",
  },
  {
    icon: ImagePlay,
    title: "Imagine API",
    body: "Generate and edit images, and create video with native audio, from a single API call.",
  },
  {
    icon: AudioLines,
    title: "Voice API",
    body: "Build realtime voice agents: speech-to-speech, text-to-speech, and speech-to-text.",
  },
];

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Reveal>
        <Eyebrow>Capabilities</Eyebrow>
        <SectionHeading>Everything you can build with the API</SectionHeading>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border shadow-[var(--shadow-border)] sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.04} className="h-full bg-elevated">
            <article className="flex h-full flex-col p-6 transition-[background-color] duration-150 ease-out hover:bg-surface cursor-pointer">
              <item.icon className="size-5 text-fg" strokeWidth={1.5} />
              <h3 className="mt-5 text-base font-semibold tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-stone-400 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
