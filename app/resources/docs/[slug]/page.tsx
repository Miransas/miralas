import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsNavigation } from "@/components/docs/docs-navigation";
import { DocsActions } from "@/components/docs/docs-actions";
import { MarkdownContent } from "@/components/docs/markdown-content";
import { DocsTableOfContents } from "@/components/docs/docs-toc";
import { getDoc, getDocEditUrl, getDocHeadings, getDocs } from "@/lib/docs";

type DocsArticleProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocsArticleProps): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function DocsArticle({ params }: DocsArticleProps) {
  const doc = getDoc((await params).slug);
  if (!doc) notFound();

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-24 pt-32 lg:grid-cols-[15rem_minmax(0,1fr)_12rem] lg:px-10">
      <DocsNavigation docs={getDocs()} />
      <article className="min-w-0 max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">{doc.category}</p>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{doc.title}</h1>
        <p className="mt-5 border-b border-border pb-10 text-lg leading-8 text-muted-foreground">{doc.description}</p>
        <div className="my-6">
          <DocsActions source={doc.content} editUrl={getDocEditUrl(doc.slug)} />
        </div>
        <MarkdownContent source={doc.content} />
      </article>
      <DocsTableOfContents headings={getDocHeadings(doc.content)} />
    </main>
  );
}