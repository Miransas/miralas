import type { ReactNode } from "react";
import { PageActions } from "./page-actions";
import { RailToc } from "./rail-toc";
import { REPO_URL, type TocItem } from "@/lib/docs-d";

interface DocPageProps {
  title: string;
  description: string;
  slug: string;
  rawContent: string;
  children: ReactNode;
  toc: TocItem[];
}

export function DocPage({ title, description, slug, rawContent, children, toc }: DocPageProps) {
  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_14rem]">
      <article id="docs-content" tabIndex={-1} aria-labelledby="docs-page-title" className="min-w-0 max-w-3xl pb-16 [overflow-wrap:anywhere]">
        <header className="mb-6">
          <h1 id="docs-page-title" className="text-3xl font-semibold leading-tight tracking-tight text-text-heading md:text-4xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base leading-8 text-text-primary">{description}</p>}
        </header>
        <PageActions slug={slug} rawContent={rawContent} />
        <div className="docs-prose mt-8 min-w-0">{children}</div>
        <footer className="mt-16 text-sm leading-7 text-text-muted">
          <p>Was this page helpful?{" "}<a href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer" className="rounded-sm font-medium text-text-heading underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">Let us know on GitHub</a></p>
        </footer>
      </article>
      {toc.length > 0 && (
        <aside className="sticky top-(--docs-anchor-offset) hidden min-w-0 self-start xl:block">
          <RailToc items={toc.map(item => ({ id: item.id, label: item.title, depth: item.level === 3 ? 1 : 0 }))} className="max-h-[calc(100dvh-var(--docs-anchor-offset)-1.5rem)] overflow-y-auto overscroll-contain pb-2 pr-2 [scrollbar-width:thin]" />
        </aside>
      )}
    </div>
  );
}
