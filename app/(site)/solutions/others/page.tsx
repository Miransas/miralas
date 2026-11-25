import { RevealHeading, SectionReveal, RevealParagraph } from "@/components/motion/primitives";
import type { Metadata } from "next";
import { BackLink,EndCTA,Hero,PageShell,eyebrow,wrap } from "@/components/solutions/solution-ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "More Voice AI Applications",
  description:
    "Discover potential Miralas voice AI applications in education, spoken accessibility, digital storytelling, and custom audio workflows across modern products.",
  path: "/solutions/others",
});
const ideas = [
  ["Education", "Bring an audio dimension to lessons and learning materials."],
  ["Accessibility", "Explore spoken interfaces that offer another way to engage with content."],
  ["Digital storytelling", "Give narratives, characters and written ideas another form of expression."],
  ["Language learning", "Consider voice as a companion to listening and language practice."],
  ["Product interfaces", "Explore how spoken content could fit into everyday software."],
  ["Interactive media", "Imagine responsive audio in creative digital experiences."],
];
export default function OthersPage() { return <PageShell><Hero label="MORE POSSIBILITIES" title="Voice belongs everywhere." description="Explore additional ways to bring natural voice interactions into software, products, and experiences." aside={<><BackLink /><p className="mt-5 text-sm leading-6 text-text-muted">A collection of ideas, open to interpretation.</p></>} /><SectionReveal className={`${wrap} pb-24 sm:pb-32`}><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><p className={eyebrow}>AN OPEN EXPLORATION</p><RevealHeading className="mt-4 max-w-sm text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Where could voice take you?</RevealHeading><RevealParagraph className="mt-5 max-w-sm text-sm leading-7 text-text-muted">These are potential applications, not confirmed product integrations. The most interesting ideas may still be yours to discover.</RevealParagraph></div><div className="border-t border-black/15 dark:border-white/15">{ideas.map(([title, description], i) => <article key={title} className="grid grid-cols-[36px_1fr] gap-x-4 gap-y-2 border-b border-black/10 py-7 dark:border-white/10 sm:grid-cols-[36px_1fr_1fr] sm:gap-6"><span className={eyebrow}>0{i + 1}</span><RevealHeading as="h3" className="text-xl font-medium tracking-tight">{title}</RevealHeading><p className="col-start-2 text-sm leading-6 text-text-muted sm:col-auto">{description}</p></article>)}</div></div></SectionReveal><EndCTA title="Build something new." description="Explore how the API is being designed to bring voice into your own applications." href="/product/api" link="Explore the API" /></PageShell>; }
