import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading, SectionLead } from "./section";

const CLOUDS = [
  {
    name: "Microsoft Azure",
    product: "Azure AI Foundry",
    body: "First-party Grok models in Azure, billed through the cloud you already run.",
  },
  {
    name: "Oracle",
    product: "OCI Generative AI",
    body: "Serve Grok on Oracle Cloud Infrastructure with enterprise controls.",
  },
  {
    name: "Google Cloud",
    product: "Vertex Model Garden",
    body: "Call Grok from Vertex AI alongside the rest of your Model Garden stack.",
  },
];

export function Cloud() {
  return (
    <Section id="cloud">
      <Reveal>
        <Eyebrow>Cloud</Eyebrow>
        <SectionHeading>Available on your preferred cloud</SectionHeading>
        <SectionLead>
          Deploy Grok through the cloud you already trust, with first-party support across
          the major platforms — alongside the native xAI API.
        </SectionLead>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {CLOUDS.map((cloud, i) => (
          <Reveal key={cloud.name} delay={i * 0.06}>
            <article className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-[var(--shadow-border)]">
              <p className="text-xs font-medium tracking-caps text-muted-foreground uppercase">
                {cloud.name}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                {cloud.product}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{cloud.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
