import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'; // 1. Eklentiyi import ettik
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { TocItem } from './docs-d';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

export interface DocContent {
  title: string;
  description: string;
  slug: string;
  rawContent: string;
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
}

export async function loadDoc(slug: string): Promise<DocContent | null> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const rawFile = fs.readFileSync(fullPath, 'utf-8');
  const { data, content: rawContent } = matter(rawFile);

  const title = (data.title as string) ?? slug;
  const description = (data.description as string) ?? '';

  const toc = extractToc(rawContent);

  const mdxSource = await serialize(rawContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // 2. rehypeSlug eklentisini buraya ekledik. Artık HTML başlıkları otomatik id alacak.
      rehypePlugins: [rehypeSlug, rehypeHighlight], 
    },
  });

  return { title, description, slug, rawContent, mdxSource, toc };
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    // 3. GitHub/rehype-slug standartlarına yakın bir id üretimi (Türkçe karakter güvenli)
    const id = title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}