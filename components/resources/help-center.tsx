"use client";

import { RevealHeading, RevealParagraph } from "@/components/motion/primitives";
import Link from "next/link";
import { useId, useState, useSyncExternalStore } from "react";
import { ChevronDown, Mail, Search, SearchX } from "lucide-react";

import { TOPICS, type Article, type Status } from "@/constants/resources/help-center";
import { cn } from "@/lib/utils";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

const surface =
  "bg-surface-card";

const statusTone: Record<Status, string> = {
  "Internal testing": "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "In development": "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Planned: "bg-zinc-500/10 text-text-primary",
};

// #konu-id ile doğrudan bağlantı (örn. /resources/help-center#voice-cloning)
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "mt-3 inline-block text-sm font-semibold text-zinc-950 underline underline-offset-4 hover:opacity-70 dark:text-white";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function AccordionItem({
  article,
  open,
  onToggle,
}: {
  article: Article;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-4xl transition-colors duration-(--motion-interaction-duration)",
        open
          ? "bg-surface-elevated"
          : "bg-surface-card hover:bg-surface-card-hover",
      )}
    >
      <RevealHeading as="h3">
        <button
          id={`${id}-button`}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex w-full items-center justify-between gap-6 rounded-4xl px-7 py-4 text-left text-sm font-bold tracking-tight text-zinc-900 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-3 dark:text-zinc-100 dark:focus-visible:ring-white/40 md:text-[16px]"
        >
          <span>{article.question}</span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-text-muted transition-transform duration-(--motion-interaction-duration) motion-reduce:transition-none",
              open && "rotate-180",
            )}
            strokeWidth={2.5}
          />
        </button>
      </RevealHeading>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-(--motion-interaction-duration) ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-7 pb-6 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>{article.answer}</p>
            {article.link && (
              <SmartLink href={article.link.href}>{article.link.label} →</SmartLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HelpCenter() {
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const [picked, setPicked] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const topic =
    picked ?? (TOPICS.some((t) => t.id === hash) ? hash : "all");
  const q = query.trim().toLocaleLowerCase("en");

  const groups = TOPICS.filter((t) => topic === "all" || t.id === topic)
    .map((t) => ({
      ...t,
      items: t.articles
        .map((a, i) => ({ article: a, key: `${t.id}:${i}` }))
        .filter(({ article }) => !article.hidden)
        .filter(
          ({ article }) =>
            !q ||
            `${article.question} ${article.answer} ${t.title}`
              .toLocaleLowerCase("en")
              .includes(q),
        ),
    }))
    .filter((g) => g.items.length > 0);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  function selectTopic(id: string) {
    setPicked(id);
    window.history.replaceState(
      null,
      "",
      id === "all"
        ? window.location.pathname + window.location.search
        : `#${id}`,
    );
  }

  function toggle(key: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(key)) next.add(key);
      return next;
    });
  }

  return (
    <div className="mt-12 space-y-12">
      {/* Arama */}
      <div className="mx-auto max-w-xl">
        <label htmlFor="help-search" className="sr-only">
          Search the Help Center
        </label>
        <div
          className={cn(
            "flex items-center gap-3 rounded-full px-5 shadow-sm",
            surface,
          )}
        >
          <Search className="size-5 shrink-0 text-text-muted" />
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an answer"
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-text-heading focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-3 placeholder:text-text-muted dark:text-white dark:placeholder:text-text-muted"
          />
        </div>
        <p role="status" className="sr-only">
          {q ? `${total} result${total === 1 ? "" : "s"}` : ""}
        </p>
      </div>

      {/* Konular */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <RevealHeading className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Topics
          </RevealHeading>
          {topic !== "all" && (
            <button
              type="button"
              onClick={() => selectTopic("all")}
              className="text-sm font-semibold text-zinc-700 underline underline-offset-4 hover:opacity-70 dark:text-zinc-300"
            >
              Show all topics
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map(({ id, title, summary, icon: Icon, status, articles }) => {
            const count = articles.filter((a) => !a.hidden).length;
            const active = topic === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => selectTopic(active ? "all" : id)}
                className={cn(
                  "flex flex-col items-start  cursor-pointer gap-3 rounded-3xl p-5 text-left transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-(--motion-interaction-duration) focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-3 dark:focus-visible:ring-white/40",
                  surface,
                  active
                    ? "ring-2 ring-zinc-950 dark:ring-white"
                    : "hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold tracking-tight text-text-heading">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm text-text-muted">
                    {summary}
                  </span>
                </span>
                <span className="mt-auto flex items-center gap-2 text-xs">
                  <span className="text-text-muted">
                    {count} {count === 1 ? "answer" : "answers"}
                  </span>
                  {status && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-medium",
                        statusTone[status],
                      )}
                    >
                      {status}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cevaplar */}
      <div className="space-y-10">
        {groups.length === 0 ? (
          <div
            className={cn(
              "flex flex-col items-center rounded-3xl px-6 py-14 text-center",
              surface,
            )}
          >
            <SearchX className="size-8 text-text-muted" />
            <RevealParagraph className="mt-4 text-[15px] font-bold text-text-heading">
              No answers match &ldquo;{query.trim()}&rdquo;
            </RevealParagraph>
            <p className="mt-1 max-w-sm text-sm text-text-muted">
              Try a shorter search, or browse the topics above.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                selectTopic("all");
              }}
              className="mt-5 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-zinc-950"
            >
              Clear search
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <section key={group.id} aria-labelledby={`h-${group.id}`}>
              <RevealHeading
                id={`h-${group.id}`}
                className="mb-4 flex items-center gap-2.5 text-lg font-bold tracking-tight text-text-heading"
              >
                <group.icon className="size-5 text-text-muted" />
                {group.title}
              </RevealHeading>
              <div className="flex flex-col gap-3">
                {group.items.map(({ article, key }) => (
                  <AccordionItem
                    key={key}
                    article={article}
                    open={open.has(key)}
                    onToggle={() => toggle(key)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* İletişim */}
      <div
        className={cn(
          "flex flex-col items-center justify-between gap-5 rounded-4xl p-7 sm:flex-row",
          surface,
        )}
      >
        <div className="text-center sm:text-left">
          <RevealParagraph className="text-base font-bold text-text-heading">
            Did not find your answer?
          </RevealParagraph>
          <p className="mt-1 text-sm text-text-muted">
            Check the changelog for the latest progress
            {SUPPORT_EMAIL ? ", or write to us." : "."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/resources/changelog"
            className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-5 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/[0.06]"
          >
            Changelog
          </Link>
          {SUPPORT_EMAIL && (
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-bold text-white transition-transform hover:scale-105 motion-reduce:hover:scale-100 dark:bg-white dark:text-zinc-950"
            >
              <Mail className="size-4" />
              Contact us
            </a>
          )}
        </div>
      </div>
    </div>
  );
}