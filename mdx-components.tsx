import React from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/docs/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (p) => <h1 className="mb-6 text-4xl font-semibold tracking-tight" {...p} />,
    h2: (p) => <h2 className="mb-2 mt-12 text-2xl font-semibold" {...p} />,
    h3: (p) => (
      <h3
        className="mb-2 mt-6 text-sm font-medium uppercase tracking-wide text-muted-foreground"
        {...p}
      />
    ),
    p: (p) => <p className="my-3 leading-7 text-muted-foreground" {...p} />,
    a: (p) => (
      <a className="underline underline-offset-4 hover:text-foreground" {...p} />
    ),
    ul: (p) => <ul className="my-3 list-disc space-y-1.5 pl-6" {...p} />,
    ol: (p) => <ol className="my-3 list-decimal space-y-1.5 pl-6" {...p} />,
    li: (p) => <li className="leading-7" {...p} />,
    strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
    blockquote: (p) => (
      <blockquote
        className="my-4 border-l-2 border-border pl-4 italic text-muted-foreground"
        {...p}
      />
    ),
    table: (p) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm" {...p} />
      </div>
    ),
    th: (p) => <th className="border-b border-border px-3 py-2 text-left font-medium" {...p} />,
    td: (p) => <td className="border-b border-border px-3 py-2" {...p} />,
    hr: () => <hr className="my-10 border-border" />,
    code: (p) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...p} />
    ),
    pre: (props) => {
      const { children, className } = props as {
        children?: React.ReactNode;
        className?: string;
      };

      const child = React.Children.toArray(children).find(
        (item) => typeof item === "object",
      );
      const childProps =
        (
          child as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>
        )?.props ?? {};

      const rawCode = childProps.children ?? "";
      const codeString = (
        typeof rawCode === "string" ? rawCode : String(rawCode ?? "")
      ).replace(/\n$/, "");
      const classValue = childProps.className ?? className ?? "";
      const language =
        String(classValue).replace(/^language-/, "").trim() || undefined;

      return (
        <CodeBlock language={language} className={classValue}>
          {codeString}
        </CodeBlock>
      );
    },
    ...components,
  };
}