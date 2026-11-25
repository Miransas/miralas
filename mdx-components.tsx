import React from "react";
import { RevealHeading } from "@/components/motion/primitives";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/docs/code-block";
import { codeLanguage, codeText } from "@/lib/docs-code";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents, { reading = false }: { reading?: boolean } = {}): MDXComponents {
  return {
    h1: (p) => <RevealHeading as="h1" className="mb-6 text-4xl font-semibold tracking-tight" {...p} />,
    h2: (p) => <RevealHeading className="mb-2 mt-12 text-2xl font-semibold" {...p} />,
    h3: (p) => (
      <RevealHeading as="h3"
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
    pre: ({ children }) => {
      const child = React.Children.toArray(children).find(React.isValidElement);
      if (!React.isValidElement<{ children?: React.ReactNode; className?: string; "data-raw-code"?: string; "data-filename"?: string }>(child)) return <pre>{children}</pre>;
      const props = child.props;
      return <CodeBlock language={codeLanguage(props.className)} className={props.className} rawCode={props["data-raw-code"] ?? codeText(props.children)} filename={props["data-filename"]}>{props.children}</CodeBlock>;
    },
    ...(reading ? readingComponents : {}),
    ...components,
  };
}

const readingComponents: MDXComponents = {
  h1: ({ className, ...props }) => <h1 tabIndex={-1} className={cn("mb-6 mt-10 text-3xl font-semibold tracking-tight text-text-heading", className)} {...props} />,
  h2: ({ className, ...props }) => <h2 tabIndex={-1} className={cn("mb-4 mt-12 text-2xl font-semibold leading-snug tracking-tight text-text-heading", className)} {...props} />,
  h3: ({ className, ...props }) => <h3 tabIndex={-1} className={cn("mb-3 mt-8 text-xl font-semibold leading-snug tracking-tight text-text-heading", className)} {...props} />,
  h4: ({ className, ...props }) => <h4 tabIndex={-1} className={cn("mb-3 mt-7 text-lg font-semibold text-text-heading", className)} {...props} />,
  h5: ({ className, ...props }) => <h5 tabIndex={-1} className={cn("mb-2 mt-6 text-base font-semibold text-text-heading", className)} {...props} />,
  h6: ({ className, ...props }) => <h6 tabIndex={-1} className={cn("mb-2 mt-6 text-sm font-semibold text-text-heading", className)} {...props} />,
  p: ({ className, ...props }) => <p className={cn("my-4 text-base leading-8 text-text-primary", className)} {...props} />,
  span: props => <span {...props} />,
  ul: ({ className, ...props }) => <ul className={cn("my-5 list-disc space-y-2 pl-6 text-text-primary marker:text-text-muted", className)} {...props} />,
  ol: ({ className, ...props }) => <ol className={cn("my-5 list-decimal space-y-2 pl-6 text-text-primary marker:text-text-muted", className)} {...props} />,
  li: ({ className, ...props }) => <li className={cn("pl-1 leading-8 [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2", className)} {...props} />,
  code: ({ className, ...props }) => <code className={cn("rounded-md bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.875em] text-text-heading [overflow-wrap:anywhere]", className)} {...props} />,
  a: ({ className, ...props }) => <a className={cn("rounded-sm font-medium text-text-heading underline decoration-text-muted/50 underline-offset-4 hover:decoration-text-heading focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", className)} {...props} />,
  blockquote: ({ className, ...props }) => <blockquote className={cn("my-6 border-l-2 border-text-muted/40 pl-5 text-text-primary [&>p]:text-inherit", className)} {...props} />,
  img: ({ className, alt, ...props }) => <img alt={alt ?? ""} loading="lazy" decoding="async" className={cn("my-6 h-auto max-w-full rounded-2xl", className)} {...props} />,
  hr: props => <hr className="my-10 border-border" {...props} />,
  table: props => <div tabIndex={0} role="region" aria-label="Scrollable table" className="my-6 max-w-full overflow-x-auto rounded-xl bg-surface-card focus-visible:-outline-offset-3"><table className="w-full min-w-[32rem] border-collapse text-left text-sm" {...props} /></div>,
  th: props => <th scope="col" className="border-b border-border px-4 py-3 font-semibold text-text-heading" {...props} />,
  td: props => <td className="border-b border-border px-4 py-3 align-top leading-7 text-text-primary" {...props} />,
  Callout: ({ title = "Note", children }: { title?: string; children?: React.ReactNode }) => <aside role="note" className="my-6 rounded-2xl bg-surface-card p-5 text-text-primary"><p className="mb-2 text-sm font-semibold text-text-heading">{title}</p><div className="text-sm leading-7 [&>p]:my-2">{children}</div></aside>,
};
