"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigation } from "@/lib/docs-d";
import { cn } from "@/lib/utils";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="flex min-w-0 flex-col gap-6 py-3">
      {navigation.map(section => (
        <div key={section.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">{section.title}</p>
          <ul className="space-y-1">
            {section.items.map(item => {
              const active = pathname === item.href;
              const disabled = item.href === "#";
              return (
                <li key={`${section.title}-${item.label}`}>
                  {disabled ? (
                    <span aria-disabled="true" className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-sm leading-6 text-text-muted">
                      {item.label}<span className="rounded-md bg-surface-card px-1.5 text-[10px] font-medium">Coming soon</span>
                    </span>
                  ) : (
                    <Link href={item.href} aria-current={active ? "page" : undefined} onNavigate={() => onNavigate?.()} className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-sm leading-6 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2", active ? "bg-surface-elevated font-semibold text-text-heading" : "text-text-primary hover:bg-surface-card hover:text-text-heading")}>
                      {item.label}{item.status && <span className="text-[10px] font-medium text-text-muted">{item.status}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function MobileDocsNavigation() {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { if (details.current) details.current.open = false; }, [pathname]);
  return (
    <details ref={details} className="group mb-8 rounded-2xl bg-surface-card md:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-text-heading marker:content-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-3">
        Documentation navigation<ChevronDown aria-hidden="true" className="size-4 group-open:rotate-180" />
      </summary>
      <div className="max-h-[60dvh] overflow-y-auto overscroll-contain px-2 pb-3">
        <DocsSidebar onNavigate={() => { if (details.current) details.current.open = false; }} />
      </div>
    </details>
  );
}
