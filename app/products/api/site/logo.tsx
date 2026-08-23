import { cn } from "@/lib/utils";

export function XaiMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7.4 6h3.8l4.8 7.2L20.8 6h3.8l-6.7 9.6L25.2 26h-3.9l-5.3-7.8L10.6 26H6.8l6.8-10.4L7.4 6z"
      />
    </svg>
  );
}

export function XaiWordmark({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn(
        "inline-flex items-center gap-1.5 text-fg no-underline",
        className,
      )}
      aria-label="xAI home"
    >
      <XaiMark className="size-6" />
      <span className="text-lg font-semibold tracking-tight">xAI</span>
    </a>
  );
}
