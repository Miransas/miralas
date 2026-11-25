import type { TocItem } from "./docs-d";

type HtmlNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  data?: { meta?: string };
  children?: HtmlNode[];
};

function textOf(node: HtmlNode): string {
  return node.type === "text" ? node.value ?? "" : (node.children ?? []).map(textOf).join("");
}

/** Run after rehype-slug, before highlighting: IDs and raw code come from the rendered tree. */
export function rehypeDocMetadata({ toc }: { toc: TocItem[] }) {
  return (tree: HtmlNode) => {
    function visit(node: HtmlNode) {
      if ((node.tagName === "h2" || node.tagName === "h3") && typeof node.properties?.id === "string") {
        toc.push({ id: node.properties.id, title: textOf(node), level: node.tagName === "h2" ? 2 : 3 });
      }
      if (node.tagName === "pre") {
        const code = node.children?.find(child => child.tagName === "code");
        if (code) {
          code.properties ??= {};
          code.properties["data-raw-code"] = textOf(code);
          const meta = code.data?.meta ?? "";
          const filename = meta.match(/(?:filename|title)=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
          if (filename) code.properties["data-filename"] = filename[1] ?? filename[2] ?? filename[3];
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
