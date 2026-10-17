import { cn } from "@/lib/utils";

type Row = {
  label: string;
  miralas: string;
  actor: string;
  generic: string;
};

const rows: Row[] = [
  {
    label: "Language focus",
    miralas: "Uzbek is the first language we build for",
    actor: "Native speakers, one voice per hire",
    generic: "Quality varies by language",
  },
  {
    label: "Voice ownership",
    miralas: "Recorded with consent, voice owners paid directly",
    actor: "Rights negotiated per project",
    generic: "Varies by provider",
  },
  {
    label: "Revisions",
    miralas: "Regenerate any line on demand",
    actor: "Another recording session",
    generic: "Regenerate, with limited control",
  },
  {
    label: "Scale",
    miralas: "Hours of audio without studio time",
    actor: "Limited by studio schedule",
    generic: "Generated on demand",
  },
  {
    label: "Cost",
    miralas: "Simple monthly plans",
    actor: "Per-project fees",
    generic: "Subscription or per-character pricing",
  },
];

const cell = "border-t border-border px-6 py-7 text-sm text-muted-foreground";

export function ComparisonSection() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            A voice that speaks your language
          </h2>
          <p className="mt-3 text-muted-foreground">
            How Miralas compares with the two ways people usually get a voice
            today.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-center">
            <caption className="sr-only">
              Miralas compared with hiring a voice actor and with generic
              text-to-speech tools
            </caption>

            <thead>
              <tr>
                <th scope="col" className="w-[22%]">
                  <span className="sr-only">Feature</span>
                </th>
                <th
                  scope="col"
                  className="rounded-t-3xl border border-b-0 border-border bg-card px-6 py-8 text-xl font-semibold"
                >
                  Miralas
                </th>
                <th scope="col" className="px-6 py-8 text-lg font-semibold">
                  Hiring a voice actor
                </th>
                <th scope="col" className="px-6 py-8 text-lg font-semibold">
                  Generic TTS tools
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => {
                const last = i === rows.length - 1;
                return (
                  <tr key={r.label}>
                    <th
                      scope="row"
                      className={cn(
                        "border-t border-border px-6 py-7 text-left text-base font-semibold",
                        last && "border-b",
                      )}
                    >
                      {r.label}
                    </th>
                    <td
                      className={cn(
                        cell,
                        "border-x bg-card text-foreground",
                        last && "rounded-b-3xl border-b",
                      )}
                    >
                      {r.miralas}
                    </td>
                    <td className={cn(cell, last && "border-b")}>{r.actor}</td>
                    <td className={cn(cell, last && "border-b")}>{r.generic}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}