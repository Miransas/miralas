import { SectionReveal } from "@/components/motion/primitives";
import type { Metadata } from "next";
import { BackLink,EndCTA,FeatureRows,Heading,Hero,PageShell,eyebrow,wrap } from "@/components/solutions/solution-ui";
import { SolutionFlow } from "@/components/solutions/solution-flow";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Conversational AI Solutions",
  description:
    "Explore Miralas conversational voice research for product assistants, workflow-driven customer interactions, and interactive spoken interfaces in development.",
  path: "/solutions/voice-agents",
});
const architecture = ["Audio input", "Speech recognition", "Intelligence layer", "Speech synthesis", "Audio output"];
const uses = [
  { number: "01", title: "Product assistants", description: "Explore a more conversational way for people to navigate a product and find the information they need." },
  { number: "02", title: "Customer interactions", description: "Consider how voice might help teams create accessible, natural entry points for common questions and workflows." },
  { number: "03", title: "Interactive applications", description: "Imagine experiences that respond to spoken input across learning, entertainment and digital interfaces." },
];
export default function VoiceAgentsPage() { return <PageShell><Hero label="CONVERSATIONAL AI" title="From listening to understanding." description="Explore the foundations of real-time voice interactions between people and intelligent systems." aside={<><BackLink /><p className="mt-5 text-sm leading-6 text-text-muted">A conversation is more than a single response.</p></>} /><SectionReveal className={`${wrap} pb-24 sm:pb-32`}><div className="mb-9"><Heading label="THE CONVERSATION" title="A flow, not a feature." description="Each interaction moves from a person's words to a response they can hear." /></div><SolutionFlow caption="CONCEPT / CONVERSATION FLOW" steps={["Listen", "Understand", "Respond"]} /></SectionReveal><SectionReveal className="bg-surface-card py-24 dark:bg-surface-card sm:py-32"><div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-20`}><Heading label="SYSTEMS / AT A GLANCE" title="Many parts. One conversation." description="A conversational system can bring these stages together. The components and their availability depend on the product release." /><ol className="border-t border-black/15 dark:border-white/15">{architecture.map((step, i) => <li key={step} className="flex items-center gap-6 border-b border-black/10 py-5 dark:border-white/10"><span className={eyebrow}>0{i + 1}</span><span className="text-lg font-medium tracking-tight">{step}</span></li>)}</ol></div></SectionReveal><SectionReveal className={`${wrap} py-24 sm:py-32`}><Heading label="APPLICATIONS" title="Built around people." /><div className="mt-10"><FeatureRows items={uses} /></div></SectionReveal><EndCTA title="Explore the agent direction." description="Learn more about the voice agent product and its development." href="/product/agent" link="Explore Voice Agents" /></PageShell>; }
