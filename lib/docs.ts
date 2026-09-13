import fs from "node:fs";
import path from "node:path";

export type Doc = { slug: string; title: string; description: string; category: string; order: number; content: string };
export type DocHeading = { id: string; title: string; level: 2 | 3 };

const docsDirectory = path.join(process.cwd(), "content", "docs");

function parseDocument(fileName: string): Doc {
  const slug = fileName.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(docsDirectory, fileName), "utf8");
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const values = Object.fromEntries((frontmatterMatch?.[1] ?? "").split("\n").flatMap((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return [];
    return [[line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "")]];
  }));

  return {
    slug,
    title: values.title || slug,
    description: values.description || "Miralas documentation.",
    category: values.category || "Overview",
    order: Number(values.order) || 0,
    content: source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim(),
  };
}

export function getDocs(): Doc[] {
  return fs.readdirSync(docsDirectory).filter((fileName) => fileName.endsWith(".md")).map(parseDocument).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDoc(slug: string): Doc | undefined {
  return getDocs().find((doc) => doc.slug === slug);
}

export function getDocHeadings(content: string): DocHeading[] {
  return content.split("\n").flatMap((line) => {
    const match = line.match(/^(#{2,3}) (.*)$/);
    if (!match) return [];
    const title = match[2].trim();
    return [{ id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), title, level: match[1].length as 2 | 3 }];
  });
}

export function getDocEditUrl(slug: string): string {
  return `https://github.com/Miransas/miralas/edit/main/content/docs/${slug}.md`;
}