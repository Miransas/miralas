import { StaggerReveal, RevealParagraph, RevealHeading } from "@/components/motion/primitives";
import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Voice Technology & Products",
  description:
    "Explore Miralas multilingual speech technology powered by Chatterbox, plus the development status of voice cloning, developer API access, and voice agents.",
  path: "/product",
});

const products = [
  { title: "Text to speech", status: "Active engine · Public access unconfirmed", description: "Chatterbox Multilingual powers the current speech engine, with 23 model-supported languages.", href: "/product/tts" },
  { title: "Voice cloning", status: "In development", description: "A product workflow for reference-based voice identity, built around permission and review.", href: "/product/voice-clone" },
  { title: "Developer API", status: "Engineering foundation", description: "Rust and Python services connected through gRPC. Public integration access is not confirmed.", href: "/product/api" },
  { title: "Voice agents", status: "Early development", description: "Research toward useful conversations and connected workflows. Real-time availability is not validated.", href: "/product/agent" },
];

export default function ProductsPage() {
  return <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-12">
    <StaggerReveal trigger="load" className="max-w-4xl"><RevealParagraph className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Miralas products</RevealParagraph><RevealHeading as="h1" className="mt-6 text-5xl font-medium leading-[1.03] tracking-tight sm:text-7xl">{"Voice, with a clear direction."}</RevealHeading><RevealParagraph className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">Explore what powers Miralas today and what we’re working toward. Native Uzbek speech remains in development.</RevealParagraph></StaggerReveal>
    <div className="mt-16 border-t border-border">{products.map(product => <article key={product.href} className="grid gap-5 border-b border-border py-9 md:grid-cols-2 md:gap-16"><div><p className="text-sm text-muted-foreground">{product.status}</p><RevealHeading className="mt-3 text-3xl font-medium tracking-tight"><Link href={product.href} className="underline-offset-8 hover:underline">{product.title}</Link></RevealHeading></div><RevealParagraph className="max-w-xl text-base leading-8 text-muted-foreground">{product.description}</RevealParagraph></article>)}</div>
    <Link href="/product/models" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background">Explore the active engine</Link>
  </main>;
}
