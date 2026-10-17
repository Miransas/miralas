"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const lang =
    language ?? className?.replace(/^language-/, "").trim() ?? "text";

  return (
    <div
      className={cn(
        "relative my-6 overflow-hidden rounded-xl",
        "border border-border bg-card text-card-foreground",
        "shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_30px_rgb(0_0_0/0.04)]",
        "dark:shadow-[0_1px_2px_rgb(0_0_0/0.2),0_12px_36px_rgb(0_0_0/0.18)]",
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {lang || "text"}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1",
            "text-xs font-medium text-muted-foreground",
            "transition-colors duration-200",
            "hover:bg-foreground/[0.06] hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5" strokeWidth={2} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" strokeWidth={1.75} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre
        ref={preRef}
        className="overflow-x-auto bg-transparent px-4 py-5 font-mono text-[13px] leading-[1.75] text-foreground sm:px-5"
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}