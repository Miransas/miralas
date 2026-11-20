const COUNT = 48;

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
    <section className="bg-surface-page py-24 text-text-heading">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]">
            Speech should have rhythm
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-text-muted sm:text-base">
            Flat delivery is the first thing listeners notice. This is the
            quality bar we are building toward.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="space-y-6 rounded-[26px] bg-surface-card p-8 md:p-10">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                Flat speech
              </h3>
              <p className="text-[15px] leading-[1.6] text-text-muted sm:text-base">
                Even pacing and no emphasis. Easy to tell it is a machine.
              </p>
            </div>
            <Bars heights={flat} className="bg-text-muted/45" />
          </div>

          <div className="surface-accent surface-shadow space-y-6 rounded-[26px] p-8 md:p-10">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                Expressive speech
              </h3>
              <p className="text-[15px] leading-[1.6] text-text-primary sm:text-base">
                Pauses, emphasis and rhythm that follow the meaning of the
                sentence.
              </p>
            </div>
            <Bars heights={natural} className="bg-[#7c3aed] dark:bg-white" />
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-[1.45] text-text-muted sm:text-[13px]">
          Illustration, not a real recording.
        </p>
      </div>
    </section>
  );
}
