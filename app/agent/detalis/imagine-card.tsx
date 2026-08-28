import { CardShell } from "./card-shell";

export function ImagineCard() {
  return (
    <CardShell label="Imagine" overlayLabel className="min-h-72 md:h-80">
      <img
        src="/lumiere.jpg"
        alt="Lumiere hydrating cream held against green tile"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
    </CardShell>
  );
}

export function MediaStackCard() {
  return (
    <CardShell label="" overlayLabel className="min-h-72 md:h-80">
      <div className="absolute inset-0 flex flex-col">
        <img
          src="/obsidian.jpg"
          alt="Obsidian perfume bottle on a rock at night"
          className="h-1/2 w-full object-cover"
        />
        <img
          src="/night-call.jpg"
          alt="Night scene, phone call beside a car"
          className="h-1/2 w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
      <span className="pointer-events-none absolute right-5 bottom-3 text-sm text-fg/70">
        Explore →
      </span>
    </CardShell>
  );
}
