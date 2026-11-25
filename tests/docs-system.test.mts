import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useMDXComponents as getMDXComponents } from "../mdx-components";
import { rehypeDocMetadata } from "../lib/docs-mdx";
import { codeLanguage, codeText } from "../lib/docs-code";
import { copyText } from "../lib/clipboard";
import { tocTree, headingIndex, decodeHeadingHash } from "../lib/docs-navigation";
import { getDoc, getDocEditUrl, getDocs } from "../lib/docs";
import type { TocItem } from "../lib/docs-d";

const code = 'const message: string = "<script>inert</script>";\nconsole.log(message);\n';
const fixture = '## Same **title**\n\n### A `value`\n\n## Same **title**\n\n## Ürün & API\n\n```text\n## Not a heading\n```\n\nSetext title\n------------\n\n```typescript filename="example.ts"\n'+code+'```\n\n| Key | Value |\n| --- | --- |\n| Example | A long value |\n\n<Callout title="Note">Generic rendering fixture.</Callout>\n';

test("TOC uses rendered IDs for duplicates, inline formatting, Unicode and setext; ignores fenced headings", async () => {
  const toc: TocItem[] = [];
  const { content } = await compileMDX({ source: fixture, components: getMDXComponents({}, { reading: true }), options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeDocMetadata, { toc }], [rehypeHighlight, { detect: false }]] } } });
  const html = renderToStaticMarkup(content);
  assert.deepEqual(toc.map(item => item.title), ["Same title", "A value", "Same title", "Ürün & API", "Setext title"]);
  assert.deepEqual(toc.map(item => item.id), [...html.matchAll(/<h[23][^>]*id="([^"]+)"/g)].map(match => match[1]));
  assert.equal(toc[2].id, "same-title-1");
  assert.ok(toc[3].id.startsWith("ürün"));
  assert.equal(new Set(toc.map(item => item.id)).size, toc.length);
  assert.match(html, /hljs-keyword/);
  assert.match(html, /example\.ts/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>|\[object Object\]|data-reveal|data-motion-text/);
  assert.match(html, /Scrollable table/);
  assert.match(html, /role="note"/);
});

test("code text preserves nested syntax tokens, whitespace and trailing newline without labels", () => {
  const tokens = createElement(Fragment, null, createElement("span", { className: "hljs-keyword" }, "const"), " x = ", createElement("span", { className: "hljs-string" }, '"value"'), ";\n\t// note\n");
  assert.equal(codeText(tokens), 'const x = "value";\n\t// note\n');
  assert.equal(codeLanguage("hljs language-typescript extra"), "typescript");
  assert.equal(codeLanguage(undefined), undefined);
});

test("all published docs retain actual source and matching rendered headings; invalid slugs cannot read files", async () => {
  for (const doc of getDocs()) {
    assert.equal(doc.source, fs.readFileSync(`content/docs/${doc.slug}.mdx`, "utf8"));
    const toc: TocItem[] = [];
    const { content } = await compileMDX({ source: doc.content, components: getMDXComponents({}, { reading: true }), options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeDocMetadata, { toc }], [rehypeHighlight, { detect: false }]] } } });
    const html = renderToStaticMarkup(content);
    assert.deepEqual(toc.map(item => item.id), [...html.matchAll(/<h[23][^>]*id="([^"]+)"/g)].map(match => match[1]));
    assert.doesNotMatch(html, /data-reveal|opacity:0/);
    assert.equal(getDocEditUrl(doc.slug), `https://github.com/Miransas/miralas/edit/main/content/docs/${doc.slug}.mdx`);
  }
  assert.equal(getDoc("../../.env"), undefined);
});

test("TOC nesting and hash navigation preserve source order and Unicode", () => {
  const items = [{ id: "parent", depth: 0 }, { id: "child", depth: 1 }, { id: "child-2", depth: 1 }, { id: "next", depth: 0 }];
  const tree = tocTree(items);
  assert.deepEqual(tree.map(node => node.item.id), ["parent", "next"]);
  assert.deepEqual(tree[0].children.map(node => node.index), [1, 2]);
  assert.equal(headingIndex([200, 600, 900], 88), 0);
  assert.equal(headingIndex([-400, -1, 300], 88), 1);
  assert.equal(headingIndex([-900, -500, 20], 88), 2);
  assert.equal(decodeHeadingHash("#%C3%BCr%C3%BCn--api"), "ürün--api");
  assert.equal(decodeHeadingHash("#%zz"), "");
});

test("clipboard success waits for the write, and denial/unavailability remain failures", async () => {
  let resolve!: () => void;
  let finished = false;
  let received = "";
  const writing = copyText(code, { writeText: text => { received = text; return new Promise<void>(done => { resolve = done; }); } }).then(() => { finished = true; });
  await Promise.resolve();
  assert.equal(finished, false);
  assert.equal(received, code);
  resolve(); await writing;
  assert.equal(finished, true);
  await assert.rejects(copyText(code, { writeText: async () => { throw new Error("denied"); } }));
  await assert.rejects(copyText(code, undefined));
});
