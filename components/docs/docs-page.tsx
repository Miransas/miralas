"use client"

import type { ReactNode } from 'react';
import { StaggerReveal, RevealHeading, RevealParagraph } from '@/components/motion/primitives';

import { PageActions } from '@/components/docs/page-actions';
import type { TocItem } from '@/lib/docs-d';
import { TableOfContents } from './tabel-of-content';

interface DocPageProps {
  title: string;
  description: string;
  slug: string;
  rawContent: string;
  children: ReactNode;
  toc: TocItem[];
}

export function DocPage({
  title,
  description,
  slug,
  rawContent,
  children,
  toc,
}: DocPageProps) {

  return (
    <div className="flex gap-8">
      <div className="min-w-0 max-w-[780px] flex-1"><article>
        <StaggerReveal trigger="load" as="header" className="mb-8">
          <RevealHeading as="h1" className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </RevealHeading>
          {description && (
            <RevealParagraph className="text-lg text-foreground ">{description}</RevealParagraph>
          )}
        </StaggerReveal>

        <PageActions slug={slug} rawContent={rawContent} />

        <div className="docs-prose mt-8">
          {children}
        </div>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            Was this page helpful?{' '}
            <a
              href={`https://github.com/miransas/miralas/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Let us know on GitHub
            </a>
          </p>
        </footer>
      </article></div>

      {/* Right sidebar ToC */}
      <div className="hidden w-64 shrink-0 xl:block">
        <div className="sticky top-20">
          <TableOfContents items={toc} />
        </div>
      </div>
    </div>
  );
}
