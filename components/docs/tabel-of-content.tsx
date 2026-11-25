"use client";

import { RailToc } from "./rail-toc";
import type { TocItem } from "@/lib/docs-d";

/** Compatibility export; RailToc owns all heading navigation and scroll tracking. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  return <RailToc items={items.map(item => ({ id: item.id, label: item.title, depth: item.level === 3 ? 1 : 0 }))} />;
}
