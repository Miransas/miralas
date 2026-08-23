import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeItem, Stagger } from "./reveal";
import { CodePanel } from "./code-panel";

const PILLS = [
  "Works with your existing SDK",
  "Usage-based pricing from $2/M tokens",
  "Playground included with every account",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-8 pt-14 sm:px-8 sm:pt-20 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[28rem] bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,#16161a_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Stagger>
          <FadeItem>
            <a
              href="#pricing"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs text-stone-300 no-underline shadow-[var(--shadow-border)] transition-[color,box-shadow] duration-150 ease-out hover:text-stone-100 hover:shadow-[var(--shadow-border-hover)]"
            >
              <span className="rounded-full bg-fg/10 px-1.5 py-0.5 font-medium text-stone-300">
                New
              </span>
              Grok 4.6 is live — 500K context, from $2/M
              <ArrowRight className="size-3.5" />
            </a>
          </FadeItem>

          <FadeItem>
            <p className="text-xs font-medium tracking-caps text-stone-300 uppercase">
              Build with Grok
            </p>
          </FadeItem>

          <FadeItem>
            <h1 className="mt-4 max-w-4xl text-balance text-display font-semibold text-fg">
              Generate text and code, create images and video, build voice agents, and search
              the web in real time — all through one API.
            </h1>
          </FadeItem>

          <FadeItem>
            <ul className="mt-8 flex max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {PILLS.map((pill) => (
                <li key={pill} className="flex items-center gap-2 text-sm text-stone-400">
                  <span className="size-1 shrink-0 rounded-full bg-muted" />
                  {pill}
                </li>
              ))}
            </ul>
          </FadeItem>

          <FadeItem>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#start" className="no-underline">
                <Button size="lg" className="w-full sm:w-auto">
                  Start building
                  <ArrowRight className="size-4" />
                </Button>
              </a>
              <a href="#pricing" className="no-underline">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  View pricing
                </Button>
              </a>
            </div>
          </FadeItem>

          <FadeItem>
            <CodePanel className="mt-12 md:mt-16" />
          </FadeItem>
        </Stagger>
      </div>
    </section>
  );
}
