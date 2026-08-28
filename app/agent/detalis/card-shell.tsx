import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export function CardShell({
  label,
  children,
  className,
  overlayLabel = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  overlayLabel?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white",
        className,
      )}
    >
      <div className="relative min-h-0 flex-1">{children}</div>
      {overlayLabel ? (
        <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-5 py-3 text-sm text-stone-500/70">
          <span>{label}</span>
          {label ? <span className="text-stone-700">Explore →</span> : null}
        </footer>
      ) : (
        <footer className="relative z-10 flex items-center justify-between px-5 py-3 text-sm text-stone-400">
          <span>{label}</span>
          <span className="text-stone-700">Explore →</span>
        </footer>
      )}
    </article>
  );
}