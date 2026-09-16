
"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({
  children,
  className,
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const textInput = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!textInput.current) return;

    try {
      const text = textInput.current.textContent || "";
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const lang =
    language ||
    (className?.replace(/language-|hljs /g, "") ?? "text").trim();

  return (
    <div
      className={cn(
        "group relative my-6 overflow-hidden rounded-xl",
        "border border-border",
        "bg-card text-card-foreground",
        "shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_30px_rgb(0_0_0/0.04)]",
        "transition-colors duration-300",
        "dark:shadow-[0_1px_2px_rgb(0_0_0/0.2),0_12px_36px_rgb(0_0_0/0.18)]",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between",
          "border-b border-border",
          "bg-muted/60",
          "px-4 py-2.5",
          "transition-colors duration-300",
        )}
      >
        <span
          className={cn(
            "font-mono text-[11px] font-medium",
            "tracking-[0.08em] uppercase",
            "text-muted-foreground",
          )}
        >
          {lang}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5",
            "rounded-md px-2 py-1",
            "font-sans text-xs font-medium",
            "text-muted-foreground",
            "transition-colors duration-200",
            "hover:bg-foreground/[0.06]",
            "hover:text-foreground",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ring/50",
          )}
          aria-label={copied ? "Kopyalandı" : "Kodu kopyala"}
        >
          {copied ? (
            <>
              <Check
                className="size-3.5"
                strokeWidth={2}
              />
              <span>Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy
                className="size-3.5"
                strokeWidth={1.75}
              />
              <span>Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre
        ref={textInput}
        className={cn(
          "overflow-x-auto",
          "bg-transparent",
          "px-4 py-5",
          "font-mono text-[13px]",
          "leading-[1.75]",
          "text-foreground",
          "selection:bg-brand/20",
          "selection:text-foreground",
          "sm:px-5",
        )}
      >
        <code className={cn("hljs", className)}>
          {children}
        </code>
      </pre>
    </div>
  );
}

