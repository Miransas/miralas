import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";
import type { ReactElement } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { TocItem } from "./docs-d";
import { getDoc } from "./docs";
import { rehypeDocMetadata } from "./docs-mdx";

export interface DocContent {
  title: string;
  description: string;
  slug: string;
  rawContent: string;
  content: ReactElement;
  toc: TocItem[];
}

export async function loadDoc(slug: string): Promise<DocContent | null> {
  const doc = getDoc(slug);
  if (!doc) return null;
  const toc: TocItem[] = [];
  const { content } = await compileMDX({
    source: doc.content,
    components: getMDXComponents({}, { reading: true }),
    options: { mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeDocMetadata, { toc }], [rehypeHighlight, { detect: false }]],
    } },
  });
  return { title: doc.title, description: doc.description, slug, rawContent: doc.source, content, toc };
}
