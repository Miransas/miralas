import { Edit } from "lucide-react";
import { getDocEditUrl } from "@/lib/docs";
import { CopyButton } from "./copy-button";

export function PageActions({ slug, rawContent }: { slug: string; rawContent: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      <a href={getDocEditUrl(slug)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-text-primary transition-colors duration-150 hover:bg-surface-card-hover hover:text-text-heading focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
        <Edit className="size-3.5" aria-hidden="true" />Edit on GitHub
      </a>
      <CopyButton text={rawContent} label="Copy Markdown" />
    </div>
  );
}
