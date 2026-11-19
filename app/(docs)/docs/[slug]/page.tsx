import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/docs/docs-page";
import { getDoc } from "@/lib/docs";
import { loadDoc } from "@/lib/mdx-loader";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    return createPageMetadata({
      title: "Documentation Not Found",
      description:
        "The requested Miralas documentation page could not be found. Browse the getting started guide and active Chatterbox Multilingual engineering overview.",
      path: `/docs/${slug}`,
      noIndex: true,
    });
  }

  const description =
    doc.description.length >= 120
      ? doc.description
      : `${doc.description} Read official Miralas documentation by Miransas covering current engineering baselines and development status.`;

  return createPageMetadata({
    title: `${doc.title} — Docs`,
    description: description.slice(0, 160),
    path: `/docs/${doc.slug}`,
    type: "article",
  });
}

export default async function DocSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await loadDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <DocPage
      title={doc.title}
      description={doc.description}
      slug={doc.slug}
      rawContent={doc.rawContent}
      toc={doc.toc}
    >
      {doc.content}
    </DocPage>
  );
}
