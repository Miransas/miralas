import { notFound } from 'next/navigation';
import { loadDoc } from '@/lib/mdx-loader';
import { DocPage } from '@/components/docs/docs-page';

export default async function VoiceCloningPage() {
  const doc = await loadDoc('voice-cloning');

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
