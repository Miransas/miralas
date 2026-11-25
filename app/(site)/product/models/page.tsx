import { StaggerReveal, RevealParagraph, RevealHeading, SectionReveal } from "@/components/motion/primitives";
import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import { MODEL_LANGUAGES, VOICE_TECHNOLOGY } from "@/lib/voice-technology";

export const metadata: Metadata = createPageMetadata({
  title: "Voice Models & Active Engine",
  description:
    "Inspect the active Chatterbox Multilingual engine powering Miralas: 23 model-supported languages, 24 kHz mono PCM16 output, and ongoing Uzbek speech research.",
  path: "/product/models",
});

export default function ModelsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-12">
      <StaggerReveal trigger="load" className="max-w-4xl">
        <RevealParagraph className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">The active engine</RevealParagraph>
        <RevealHeading as="h1" className="mt-6 text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">{"A clear foundation for voice."}</RevealHeading>
        <RevealParagraph className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">Miralas uses {VOICE_TECHNOLOGY.engine} for text-to-speech and reference-based voice generation. Model capability and public product availability are different: public access and curated voice releases are not confirmed.</RevealParagraph>
      </StaggerReveal>
      <SectionReveal aria-labelledby="model-heading" className="mt-20 grid gap-12 rounded-4xl bg-card p-7 sm:p-12 lg:grid-cols-2 lg:gap-20">
        <div><RevealHeading id="model-heading" className="text-3xl font-medium tracking-tight">{VOICE_TECHNOLOGY.engine}</RevealHeading><RevealParagraph className="mt-5 text-base leading-8 text-muted-foreground">An open speech model by Resemble AI. Miralas’ approved checkpoint remains the multilingual V2 asset; upstream model releases do not automatically become Miralas integrations.</RevealParagraph><a href={VOICE_TECHNOLOGY.modelSource} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-8">View upstream implementation</a></div>
        <dl className="min-w-0 divide-y divide-border">
          {[["Model coverage", `${MODEL_LANGUAGES.length} languages`], ["Model sample rate", VOICE_TECHNOLOGY.sampleRate], ["Approved checkpoint", VOICE_TECHNOLOGY.checkpoint], ["Miralas output format", "Mono PCM16"], ["License", "MIT"]].map(([term, value]) => <div key={term} className="py-4 first:pt-0"><dt className="text-sm text-muted-foreground">{term}</dt><dd className="mt-2 break-words text-base font-medium">{value}</dd></div>)}
        </dl>
      </SectionReveal>
      <SectionReveal aria-labelledby="validation-heading" className="mt-20 grid gap-8 border-t border-border pt-12 lg:grid-cols-2 lg:gap-20">
        <RevealHeading id="validation-heading" className="text-3xl font-medium tracking-tight">What has been validated.</RevealHeading>
        <div className="space-y-5 text-base leading-8 text-muted-foreground"><p>The engineering baseline validates model assets and 24 kHz mono PCM16 output. A Rust API connects to Python inference over gRPC. Voice Catalog infrastructure is implemented; published curated voice seeds have not been verified.</p><p>Docker and CUDA benchmark preparation is complete. A real NVIDIA GPU benchmark remains pending, so no production latency, throughput or scalability figures are published here.</p><a href={VOICE_TECHNOLOGY.audioSource} className="inline-flex min-h-11 items-center font-semibold text-foreground underline underline-offset-8">View model sample-rate source</a></div>
      </SectionReveal>
      <SectionReveal aria-labelledby="model-research-heading" className="mt-16 grid gap-8 border-t border-border pt-12 lg:grid-cols-2 lg:gap-20">
        <RevealHeading id="model-research-heading" className="text-3xl font-medium tracking-tight">Research stays in view.</RevealHeading>
        <div className="space-y-5 text-base leading-8 text-muted-foreground"><p><strong className="font-medium text-foreground">{VOICE_TECHNOLOGY.uzbekStatus}.</strong> {VOICE_TECHNOLOGY.uzbekDescription} Uzbek is not one of the current model’s supported languages.</p><p>Qwen, CosyVoice and Miransas-native models are future exploration plans. They are not integrated into the current engine.</p><Link href="/#languages" className="inline-flex min-h-11 items-center font-semibold text-foreground underline underline-offset-8">Explore language coverage</Link></div>
      </SectionReveal>
    </main>
  );
}
