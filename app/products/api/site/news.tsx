import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading } from "./section";

const POSTS = [
  { date: "Aug 7, 2026", title: "Imagine Image 2.0" },
  { date: "Jul 29, 2026", title: "Introducing Grok Voice Think Fast 2.0" },
  { date: "Jul 6, 2026", title: "21 New Flagship Grok Voices" },
  { date: "Jul 1, 2026", title: "Introducing the Voice Agent Builder" },
];

export function News() {
  return (
    <Section id="news">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Latest</Eyebrow>
            <SectionHeading>News</SectionHeading>
          </div>
        </div>
      </Reveal>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {POSTS.map((post, i) => (
          <li key={post.title}>
            <Reveal delay={i * 0.04}>
              <a
                href="#news"
                className="group flex min-h-16 items-baseline justify-between gap-6 py-5 no-underline"
              >
                <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {post.date}
                </span>
                <span className="flex-1 text-base font-medium tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-muted-foreground">
                  {post.title}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-[color,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
