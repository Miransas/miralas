
import { notFound } from 'next/navigation';
import { loadDoc } from '@/lib/mdx-loader';
import { DocPage } from '../../../../components/docs/docs-page';

export const dynamic = 'force-dynamic';

export default async function GettingStartedPage() {
  const doc = await loadDoc('getting-started');

  if (!doc) {
    notFound();
  }

  return (
    <DocPage
      title={doc.title}
      description={doc.description}
      slug={doc.slug}
      rawContent={doc.rawContent}
      mdxSource={doc.mdxSource}
      toc={doc.toc}
    />
  );
}
