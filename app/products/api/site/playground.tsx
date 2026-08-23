"use client"
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { Eyebrow, Section, SectionHeading, SectionLead } from "./section";

const DEMO =
  "Quantum computing uses qubits that can exist in superposition, so they represent 0 and 1 at once. Entanglement lets qubits share state, which is why certain problems — factoring, simulation, search — scale differently than on classical machines. We are still in the noisy intermediate-era, but the architecture is already useful for research, cryptography, and agentic tool loops that need to reason over uncertainty.";

const PROMPTS = [
  "Explain quantum computing",
  "Sketch a realtime voice agent",
  "Write a grok-4.6 system prompt",
];

export function Playground() {
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [running, setRunning] = useState(false);
  const [out, setOut] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  function stop() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
  }

  function run() {
    stop();
    setOut("");
    setRunning(true);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 2;
      setOut(DEMO.slice(0, i));
      if (i >= DEMO.length) stop();
    }, 16);
  }

  return (
    <Section id="playground">
      <Reveal>
        <Eyebrow>Included with Console</Eyebrow>
        <SectionHeading>Try Grok in the Playground</SectionHeading>
        <SectionLead>
          Chat with Grok, generate images and video, and test the latest models before you
          write any integration code. When you are ready to ship, API usage is billed per
          token.
        </SectionLead>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 overflow-hidden rounded-2xl bg-elevated shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-fg/70" />
              <span className="font-mono text-xs text-stone-300">grok-4.6</span>
            </div>
            <span className="text-xs text-subtle">Playground · demo</span>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="flex min-h-72 flex-col border-b border-border p-4 md:border-b-0 md:border-r">
              <label htmlFor="prompt" className="text-xs font-medium text-subtle">
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="mt-2 min-h-32 w-full resize-none bg-transparent text-sm leading-relaxed text-fg outline-none placeholder:text-subtle"
                placeholder="Ask Grok anything…"
              />
              <div className="mt-auto flex flex-wrap gap-2 pt-3">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrompt(p)}
                    className="h-8 rounded-full px-3 text-xs  shadow-[var(--shadow-border)] transition-[color,box-shadow] duration-150 ease-out text-fg hover:text-stone-400 hover:shadow-[var(--shadow-border-hover)]"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                {running ? (
                  <Button variant="secondary" size="sm" onClick={stop}>
                    <Square className="size-3 fill-current" />
                    Stop
                  </Button>
                ) : (
                  <Button size="sm" onClick={run} disabled={!prompt.trim()}>
                    Run
                    <ArrowUp className="size-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex min-h-72 flex-col p-4">
              <p className="text-xs font-medium text-subtle">Response</p>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-fg">
                {out || (
                  <span className="text-subtle">
                    Run a prompt to stream a sample Grok reply in this browser.
                  </span>
                )}
                {running ? (
                  <span className="ml-0.5 inline-block h-3 w-px translate-y-px bg-fg align-middle" />
                ) : null}
              </p>
              {out ? (
                <p className="mt-3 font-mono text-xs text-subtle tabular-nums">
                  {out.split(/\s+/).filter(Boolean).length} words · demo output
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
