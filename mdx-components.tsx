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
      const { className, children } = props as {
        className?: string;
        children?: React.ReactNode;
      };
      const codeChild = children as React.ReactElement<{ className?: string; children?: string }>;
      const codeProps = codeChild?.props;
      const codeString = codeProps?.children ?? '';
      const langClass = codeProps?.className ?? className ?? '';
      const language = langClass.replace('language-', '') || undefined;

      return (
        <CodeBlock language={language} className={langClass}>
          {typeof codeString === 'string' ? codeString : String(codeString)}
        </CodeBlock>
      );
    },
    code: (props) => <code {...props} />,
    ...components,
  };
}
