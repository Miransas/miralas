"use client";

import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useCycle } from "../../../hooks/use-cycle";
import { cn } from "../../../lib/utils";

const PERIOD = 16000;

const CODE = [
  { n: 42, html: "export async function handler(req) {", neu: false },
  { n: 43, html: "  const token = extractBearer(req);", neu: true },
  { n: 44, html: "  if (!token) return unauthorized();", neu: false },
  { n: 45, html: "  const session = await getSession(req);", neu: false },
];

function colorize(line: string) {
  const safe = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return safe
    .replace(
      /\b(export|async|function|const|if|return|await)\b/g,
      '<span class="text-sky-400">$1</span>',
    )
    .replace(
      /\b(handler|extractBearer|unauthorized|getSession)\b/g,
      '<span class="text-emerald-400">$1</span>',
    );
}

export function BuildCard() {
  const reduced = usePrefersReducedMotion();
  const t = useCycle(PERIOD, reduced);
  const p = reduced ? 1 : ((t + 5200) % PERIOD) / PERIOD;

  const progress = Math.min(16.15, p * 22);
  const showGrep = p > 0.04;
  const showRead = p > 0.1;
  const task1 = p > 0.16;
  const task2 = p > 0.22;
  const task3 = p > 0.3;
  const task1done = p > 0.55;
  const task2done = p > 0.62;
  const task3done = p > 0.38;
  const thought = p > 0.42;
  const thoughtS = Math.min(4.1, Math.max(0, (p - 0.42) * 18));
  const showEdit = p > 0.52;
  const codeChars = Math.floor(Math.max(0, p - 0.58) * 900);
  const joined = CODE.map((l) => l.html).join("\n");
  const typedCode = joined.slice(0, codeChars);
  const typedLines = typedCode.split("\n");

  return (
    <CardShell label="Build" className="min-h-96 md:h-[28rem]">
      <div className="flex h-full flex-col">
        {/* Terminal başlık */}
        <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-muted-foreground">projects/main</span>
          <div className="ml-auto flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full bg-stone-400 transition-all"
                style={{ width: `${(progress / 16.15) * 100}%` }}
              />
            </div>
            <span>{progress.toFixed(2)}%</span>
          </div>
        </div>

        {/* Terminal içerik */}
        <div className="flex-1 space-y-1 overflow-hidden p-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
          {showGrep ? <div className="text-emerald-600">▸ grep session src/ + matches</div> : null}
          {showRead ? (
            <div className="text-amber-600">▸ read_file src/lib/jwt.ts 42 lines</div>
          ) : null}

          <div className="mt-2 space-y-0.5 text-muted-foreground">
            {task1 ? (
              <div className="flex justify-between gap-2">
                <span>| Audit auth middleware explore</span>
                <span className={task1done ? "text-emerald-600" : "text-amber-600"}>
                  {task1done ? "[done]" : "[running]"}
                </span>
              </div>
            ) : null}
            {task2 ? (
              <div className="flex justify-between gap-2">
                <span>| Design token rotation general</span>
                <span className={task2done ? "text-emerald-600" : "text-amber-600"}>
                  {task2done ? "[done]" : "[running]"}
                </span>
              </div>
            ) : null}
            {task3 ? (
              <div className="flex justify-between gap-2">
                <span>| Find session references explore</span>
                <span className={task3done ? "text-emerald-600" : "text-amber-600"}>
                  {task3done ? "[done]" : "[running]"}
                </span>
              </div>
            ) : null}
          </div>

          {thought ? (
            <div className="pt-3 text-muted-foreground">◆ Thought for {thoughtS.toFixed(1)}s</div>
          ) : null}
          {showEdit ? <div className="text-sky-600">◆ Edit src/middleware/auth.ts</div> : null}

          {typedLines[0] ? (
            <div className="mt-2 overflow-hidden rounded-lg bg-card p-2.5 text-[11px] text-muted-foreground">
              {CODE.map((line, i) => {
                if (i >= typedLines.length) return null;
                const shown = typedLines[i] ?? "";
                const isLast = i === typedLines.length - 1 && codeChars < joined.length;
                return (
                  <div
                    key={line.n}
                    className={cn("px-1", line.neu && shown.length > 4 && "bg-emerald-500/10")}
                  >
                    <span className="mr-3 inline-block w-4 text-muted-foreground">{line.n}</span>
                    <span dangerouslySetInnerHTML={{ __html: colorize(shown) }} />
                    {isLast ? <span className="caret" /> : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </CardShell>
  );
}