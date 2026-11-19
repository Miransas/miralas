"use client"

import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/motion/reveal';

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
      <ScrollReveal className="min-w-0 max-w-[780px] flex-1"><article>
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-foreground ">{description}</p>
          )}
        </header>

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
      </article></ScrollReveal>

      {/* Right sidebar ToC */}
      <div className="hidden w-64 shrink-0 xl:block">
        <div className="sticky top-20">
          <TableOfContents items={toc} />
        </div>
      </div>
    </div>
  );
}
