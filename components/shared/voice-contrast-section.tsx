const COUNT = 48;

// Rastgele değil, deterministik: sunucu ve tarayıcı aynı çizimi üretir.
const flat = Array.from({ length: COUNT }, () => 36);
const natural = Array.from({ length: COUNT }, (_, i) =>
  Math.round(18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82),
);

function Bars({ heights, className }: { heights: number[]; className: string }) {
  return (
    <div aria-hidden className="flex h-24 items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-full ${className}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function VoiceContrastSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Speech should have rhythm
          </h2>
          <p className="mt-3 text-muted-foreground">
            Flat delivery is the first thing listeners notice. This is the
            quality bar we are building toward.
          </p>
        </div>

        <div className="mt-12 grid divide-y divide-border overflow-hidden rounded-3xl border border-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="space-y-6 bg-muted/40 p-8 md:p-12">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Flat speech</h3>
              <p className="text-sm text-muted-foreground">
                Even pacing and no emphasis. Easy to tell it is a machine.
              </p>
            </div>
            <Bars heights={flat} className="bg-muted-foreground/40" />
          </div>

          <div className="space-y-6 bg-card p-8 md:p-12">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Expressive speech</h3>
              <p className="text-sm text-muted-foreground">
                Pauses, emphasis and rhythm that follow the meaning of the
                sentence.
              </p>
            </div>
            <Bars heights={natural} className="bg-foreground" />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Illustration, not a real recording.
        </p>
      </div>
    </section>
  );
}