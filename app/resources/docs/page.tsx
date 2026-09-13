import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2, Mic2, ShieldCheck } from "lucide-react";

import { DocsNavigation } from "@/components/docs/docs-navigation";
import { getDocs } from "@/lib/docs";

export default function DocsPage() {
  const docs = getDocs();

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 pt-32 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10">
      <DocsNavigation docs={docs} />
      <div className="min-w-0">
        <div className="max-w-3xl border-b border-border pb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">Developer documentation</p>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl">Build with Miralas.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">The practical path from your first API request to production-ready voice experiences.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/resources/docs/${doc.slug}`} className="group flex min-h-48 flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30">
              <div>
                <div className="mb-6 flex size-10 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                  {doc.category === "API" ? <Code2 className="size-5" /> : null}
                  {doc.category === "Voice" ? <Mic2 className="size-5" /> : null}
                  {doc.category === "Security" ? <ShieldCheck className="size-5" /> : null}
                  {doc.category === "Overview" ? <BookOpen className="size-5" /> : null}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{doc.category}</p>
                <h2 className="mt-2 text-xl font-bold text-foreground">{doc.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{doc.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">Read article <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}