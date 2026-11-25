import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { REPO_URL } from "./docs-d";

export type Doc = { slug: string; title: string; description: string; category: string; order: number; content: string; source: string };
export type DocHeading = { id: string; title: string; level: 2 | 3 };

const docsDirectory = path.join(process.cwd(), "content", "docs");

function parseDocument(fileName: string): Doc {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(docsDirectory, fileName), "utf8");
  const { data: values, content } = matter(source);

  return {
    slug,
    title: values.title || slug,
    description: values.description || "Miralas documentation.",
    category: values.category || "Overview",
    order: Number(values.order) || 0,
    content,
    source,
  };
}

export function getDocs(): Doc[] {
  return fs
    .readdirSync(docsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parseDocument)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDoc(slug: string): Doc | undefined {
  return getDocs().find((doc) => doc.slug === slug);
}

export function getDocEditUrl(slug: string): string {
  return `${REPO_URL}/edit/main/content/docs/${encodeURIComponent(slug)}.mdx`;
}