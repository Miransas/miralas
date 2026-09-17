import React from 'react';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/docs/code-block';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p {...props} />,
    a: (props) => <a {...props} />,
    ul: (props) => <ul {...props} />,
    ol: (props) => <ol {...props} />,
    li: (props) => <li {...props} />,
    strong: (props) => <strong {...props} />,
    blockquote: (props) => <blockquote {...props} />,
    table: (props) => <table {...props} />,
    th: (props) => <th {...props} />,
    td: (props) => <td {...props} />,
    hr: (props) => <hr {...props} />,
    pre: (props) => {
      const { children, className } = props as {
        children?: React.ReactNode;
        className?: string;
      };

      const child = React.Children.toArray(children).find((item) => typeof item === 'object');
      const childProps = (child as React.ReactElement<{ className?: string; children?: React.ReactNode }>)?.props ?? {};
      const rawCode = childProps.children ?? '';
      const codeString = typeof rawCode === 'string' ? rawCode : String(rawCode ?? '');
      const classValue = childProps.className ?? className ?? '';
      const language = String(classValue).replace(/^language-/, '').trim() || undefined;

      return (
        <CodeBlock language={language} className={classValue}>
          {codeString}
        </CodeBlock>
      );
    },
    code: (props) => <code {...props} />,
    ...components,
  };
}
