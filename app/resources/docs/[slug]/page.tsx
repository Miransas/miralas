import { notFound } from "next/navigation";

import { DocPage } from "@/components/docs/docs-page";
import { loadDoc } from "@/lib/mdx-loader";

export const dynamic = "force-dynamic";

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
            mdxSource={doc.mdxSource}
            toc={doc.toc}
        />
    );
}
