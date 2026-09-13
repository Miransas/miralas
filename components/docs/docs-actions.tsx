"use client";

import { Check, Copy, ExternalLink, Pencil } from "lucide-react";
import { useState } from "react";

export function DocsActions({ source, editUrl }: { source: string; editUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPage() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyPage} className="docs-action-button" aria-label="Copy page markdown">
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy page"}
      </button>
      <a href={editUrl} target="_blank" rel="noreferrer" className="docs-action-button">
        <Pencil className="size-3.5" />
        Edit on GitHub
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}