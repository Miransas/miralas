import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { codeLanguage, codeText } from "@/lib/docs-code";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  language?: string;
  filename?: string;
  rawCode?: string;
}

/** Highlighting is server rendered; only clipboard interaction runs on the client. */
export function CodeBlock({ children, className, language, filename, rawCode }: CodeBlockProps) {
  const lang = language ?? codeLanguage(className) ?? "text";
  const text = rawCode ?? codeText(children);
  return (
    <div className="my-6 min-w-0 max-w-full overflow-hidden rounded-2xl bg-surface-card text-text-heading">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-surface-elevated px-4 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-3 font-mono text-xs text-text-muted">
          {filename && <span className="min-w-0 truncate" title={filename}>{filename}</span>}
          <span className="shrink-0 uppercase tracking-wider">{lang}</span>
        </div>
        <CopyButton text={text} label="Copy code" />
      </div>
      <pre tabIndex={0} role="region" aria-label={filename ? `${filename}, ${lang} code` : `${lang} code`} className="max-w-full overflow-x-auto px-4 py-5 font-mono text-[13px] leading-7 whitespace-pre [tab-size:2] [overflow-wrap:normal] [word-break:normal] focus-visible:-outline-offset-3 sm:px-5">
        <code className={cn("docs-code font-mono", className)}>{children}</code>
      </pre>
    </div>
  );
}
