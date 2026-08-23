"use client"
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { LangId, LANGS, SNIPPETS } from "../../data/snşppets";


const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "await",
  "return",
  "print",
  "def",
  "class",
  "as",
  "new",
  "let",
  "var",
  "export",
  "default",
  "async",
  "true",
  "false",
  "null",
  "undefined",
]);

function tokenize(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re =
    /(\/\/.*$|#.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][\w.]*\b|[^\s\w]+|\s+)/g;
  const parts = line.match(re) ?? [line];

  parts.forEach((part, i) => {
    let cls = "text-fg/80";
    if (/^\s+$/.test(part)) {
      nodes.push(<span key={i}>{part}</span>);
      return;
    }
    if (part.startsWith("//") || part.startsWith("#")) cls = "text-subtle";
    else if (/^['"`]/.test(part)) cls = "text-code";
    else if (/^\d/.test(part)) cls = "text-muted";
    else if (KEYWORDS.has(part)) cls = "text-fg font-medium";
    else if (part === "grok-4.6" || part.includes("grok-4.6")) cls = "text-fg";
    else if (/^[A-Z]/.test(part)) cls = "text-fg";
    else if (/^[^A-Za-z0-9\s]+$/.test(part)) cls = "text-subtle";
    nodes.push(
      <span key={i} className={cls}>
        {part}
      </span>,
    );
  });
  return nodes;
}

export function CodePanel({ className }: { className?: string }) {
  const [lang, setLang] = useState<LangId>("python");
  const [copied, setCopied] = useState(false);
  const code = SNIPPETS[lang];
  const lines = code.split("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-elevated shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 py-1.5 sm:px-3">
        {LANGS.map((item) => {
          const active = item.id === lang;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLang(item.id)}
              className={cn(
                "relative h-9 shrink-0 rounded-md px-3 text-sm transition-[color,background-color] duration-150 ease-out",
                active ? "text-fg" : "text-subtle hover:text-muted",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="code-tab"
                  className="absolute inset-0 rounded-md bg-fg/10"
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={copy}
          className="ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm text-muted transition-[color,background-color] duration-150 ease-out hover:bg-fg/5 hover:text-fg"
          aria-label="Copy code"
        >
          <span className="relative size-3.5">
            <Copy
              className={cn(
                "absolute inset-0 size-3.5 transition-[opacity,transform,filter] duration-300 ease-out",
                copied
                  ? "scale-[0.25] opacity-0 blur-sm"
                  : "scale-100 opacity-100 blur-none",
              )}
            />
            <Check
              className={cn(
                "absolute inset-0 size-3.5 transition-[opacity,transform,filter] duration-300 ease-out",
                copied
                  ? "scale-100 opacity-100 blur-none"
                  : "scale-[0.25] opacity-0 blur-sm",
              )}
            />
          </span>
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="overflow-x-auto p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={lang}
            initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 min-w-max font-mono text-xs leading-relaxed sm:text-sm"
          >
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 shrink-0 select-none pr-4 text-right text-subtle tabular-nums">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre">{tokenize(line.length ? line : " ")}</span>
                </div>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}
