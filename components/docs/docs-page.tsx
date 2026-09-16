"use client"

import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { PageActions } from '@/components/docs/page-actions';
import type { TocItem } from '@/lib/docs-d';
import { useMDXComponents } from '@/mdx-components';
import { TableOfContents } from './tabel-of-content';

interface DocPageProps {
  title: string;
  description: string;
  slug: string;
  rawContent: string;
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
}

export function DocPage({
  title,
  description,
  slug,
  rawContent,
  mdxSource,
  toc,
}: DocPageProps) {
  const components = useMDXComponents({});

  return (
    <div className="flex gap-8">
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="min-w-0 flex-1"
        style={{ maxWidth: 780 }}
      >
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
          <MDXRemote {...mdxSource} components={components} />
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
      </motion.article>

      {/* Right sidebar ToC */}
      <div className="hidden w-64 shrink-0 xl:block">
        <div className="sticky top-20">
          <TableOfContents items={toc} />
        </div>
      </div>
    </div>
  );
}
