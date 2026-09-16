'use client';

import { useState } from 'react';
import { Check, Copy, Edit, FileText } from 'lucide-react';
import { REPO_URL } from '@/lib/docs-d';

interface PageActionsProps {
  slug: string;
  rawContent: string;
}

export function PageActions({ slug, rawContent }: PageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const editUrl = `${REPO_URL}/edit/main/content/docs/${slug}.mdx`;

  return (
    <div className="flex items-center gap-2 border-b border-border pb-6">
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Edit className="h-3.5 w-3.5" />
        Edit on GitHub
      </a>
      <button
        onClick={handleCopyMarkdown}
        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span className="text-green-500">Copied</span>
          </>
        ) : (
          <>
            <FileText className="h-3.5 w-3.5" />
            Copy Markdown
          </>
        )}
      </button>
    </div>
  );
}
