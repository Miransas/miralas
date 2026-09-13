import type { DocHeading } from "@/lib/docs";

export function DocsTableOfContents({ headings }: { headings: DocHeading[] }) {
  if (!headings.length) return null;

  return (
    <aside className="hidden lg:block lg:sticky lg:top-28 lg:h-fit" aria-label="On this page">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
      <nav className="border-l border-border pl-4">
        <div className="space-y-2">
          {headings.map((heading) => (
            <a key={heading.id} href={`#${heading.id}`} className={`block text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground ${heading.level === 3 ? "pl-3 text-xs" : ""}`}>
              {heading.title}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}