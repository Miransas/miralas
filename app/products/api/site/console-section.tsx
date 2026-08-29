import { Activity, CreditCard, KeyRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading, SectionLead } from "./section";

const FEATURES = [
  {
    icon: KeyRound,
    title: "API keys",
    body: "Create, rotate, and revoke keys. Scope them to a project and keep secrets off the client.",
  },
  {
    icon: Activity,
    title: "Live usage",
    body: "Watch tokens, latency, and spend on a real-time dashboard as requests land.",
  },
  {
    icon: CreditCard,
    title: "Billing",
    body: "Top up prepaid credits or set up invoicing. Usage-based, no surprise seat licenses.",
  },
  {
    icon: Users,
    title: "Team access",
    body: "Invite teammates, share the Playground, and keep one billing account for the org.",
  },
];

export function ConsoleSection() {
  return (
    <Section id="console">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <Eyebrow>Console</Eyebrow>
          <SectionHeading>Manage everything in the xAI Console</SectionHeading>
          <SectionLead>
            Create and manage API keys, monitor usage on a real-time dashboard, top up prepaid
            credits, set up billing, invite your team, and test models in the Playground.
          </SectionLead>
          <div className="mt-8">
            <a href="#start" className="no-underline">
              <Button size="lg">
                Sign in to the Console
              </Button>
            </a>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
                <item.icon className="size-4 text-foreground" strokeWidth={1.5} />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
