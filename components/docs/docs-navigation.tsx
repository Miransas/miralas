"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Doc } from "@/lib/docs";

export function DocsNavigation({ docs }: { docs: Doc[] }) {
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const filteredDocs = docs.filter((doc) => `${doc.title} ${doc.description} ${doc.category}`.toLowerCase().includes(query.toLowerCase()));
    const categories = Array.from(new Set(filteredDocs.map((doc) => doc.category)));

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full bg-foreground text-background shadow-xl lg:hidden" aria-label="Open documentation navigation">
                <Menu className="size-5" />
            </button>
            <aside className={`${open ? "fixed inset-0 z-50 flex" : "hidden"} lg:sticky lg:top-28 lg:block lg:h-fit`}>
                <button type="button" aria-label="Close documentation navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-background/70 backdrop-blur-sm lg:hidden" />
                <div className="relative w-72 border-r border-border bg-background p-6 lg:w-auto lg:border-0 lg:bg-transparent lg:p-0">
                    <div className="mb-6 flex items-center justify-between lg:hidden">
                        <span className="font-bold">Documentation</span>
                        <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X className="size-5" /></button>
                    </div>
                    <label className="relative block">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search docs" className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40" />
                    </label>
                    <nav className="mt-8 space-y-6" aria-label="Documentation">
                        {categories.map((category) => (
                            <div key={category}>
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{category}</p>
                                <div className="space-y-1">
                                    {filteredDocs.filter((doc) => doc.category === category).map((doc) => {
                                        const active = pathname === `/resources/docs/${doc.slug}`;
                                        return <Link key={doc.slug} href={`/resources/docs/${doc.slug}`} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{doc.title}</Link>;
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}