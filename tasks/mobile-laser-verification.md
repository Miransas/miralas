# Mobile and tablet LaserFlow verification

Implementation and automated checks are complete. Required real-browser checks remain blocked; no real-device GPU performance claim is made.

## Root cause

The original hero is `min-h-screen` with an automatic height below `md`, and becomes an explicit 1200px high at `md`. LaserFlow's empty, relatively positioned wrapper uses `h-full`; its only child is an absolutely positioned canvas. Below `md`, that percentage height has no definite containing-block height and can resolve to an empty auto height. The canvas contributes no normal-flow height. The renderer clamps dimensions to one pixel and waits for intersection, so the collapsed layer cannot produce the intended visible effect.

This is a source diagnosis supported by [CSS percentage-height rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height). A live computed-height measurement was not possible. No responsive `hidden`/display condition, user-agent detection, mobile exclusion or device-specific WebGL gate exists. Recent optimization changes retained the `relative h-full` wrapper and made intersection gating stricter; the safeguards themselves are necessary and remain enabled. WebGL2 can independently be unavailable on a device, which previously left no fallback.

## Implementation

- Added one absolute `inset-0` hero layer. It fills the hero's actual content height on phones and retains the existing 1200px desktop geometry. The heading, paragraph, CTAs, media card and original `/hero.mp4` / `/portraits/hero.png` markup are unchanged.
- Added the exact supplied mobile preset below Tailwind `lg` (64rem, normally 1024px). This includes 768px tablets. Mobile uses beamPosition 0.82, the existing #0F60E4 tint, DPR 1 and mouseInteraction false. The desktop preset preserves every current value, including beamPosition 0.59 and automatic existing DPR/2048px caps. No user-agent checks or extra shader instances were added.
- Responsive settings use a stable matchMedia subscription with useSyncExternalStore. A consistent server snapshot is used for SSR and initial hydration; subsequent breakpoint changes update the same LaserFlow instance. See [React's server-snapshot requirements](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering) and [Tailwind breakpoint definitions](https://tailwindcss.com/docs/responsive-design).
- Both presets retain the actual card's surfaceRef. Cached surface geometry, scroll/resize/layout-animation invalidation, shader diagnostics, context restoration and GPU resource ownership remain in place. No shader source, tint math or procedural detail was changed by this task.
- Added a small static CSS beam fallback, with no extra WebGL context, image download, animation, filter or RAF loop. It is visible in server HTML, hides after the first submitted draw, and reappears on context loss. Null/throwing WebGL2 initialization leaves it visible. Compile/allocation failure before a first draw also leaves it visible. Its position is 82% below lg and 59% at lg and above; the actual media card naturally occludes the beam behind it.
- The decorative layer ignores pointer input. The mobile preset avoids pointer geometry work and adds no touch listeners or scroll interception. Offscreen/hidden suspension and live reduced-motion handling are preserved.
- Dark #050505 and light #EFEFEF theme tokens are unchanged. The existing hero remains its fixed dark scope in either site theme. There are no changes to unrelated sections or dependencies.

## Verification actually performed

- `node --import tsx --test tests/mobile-laser.test.tsx tests/laser-flow.test.ts tests/marketing-motion.test.tsx tests/docs-system.test.mts`: **32 passed, 0 failed, 0 skipped**. The mobile suite has 11 tests, including six controlled width fixtures.
- Controlled fixtures at **320, 375, 390, 430, 768 and 1440px** verified shader resolution, backing-canvas dimensions, supplied preset uniforms and beam/card alignment using known rectangles and 32px radii. These are mocks, not browser layout measurements. Mobile/tablet fixtures use DPR 1. The 1440px desktop fixture keeps the existing cap and produces a 2048×1707 backing canvas for a 1440×1200 CSS layer.
- Width/height changes across mobile, tablet and desktop presets keep one GPU program; allocation/deletion counts balance on teardown in the mock. This checks ownership, not real memory usage.
- Fallback tests cover null and throwing getContext, first-draw readiness and context loss/restoration. SSR checks confirm one canvas, the absolute fill wrapper, a fallback and identical server markup regardless of a simulated media-query value. This does not replace a real hydration-console check.
- Mobile pointer events do not read geometry or enable the lens in the mock. Offscreen frames stop; reduced motion settles without continuous RAF work. Existing shader cleanup/animation tests also pass.
- Mutation probe: temporarily changing mobile DPR from 1 to 2 failed the preset/viewport tests. The original was restored; all mobile tests passed again.
- Desktop regression comparison: all 20 uniforms match the saved original renderer at five deterministic intro/settled/pointer snapshots. Desktop preset values also have an exact regression assertion. This is not a driver screenshot comparison.
- `pnpm lint`: passed, zero errors; the same three existing unused eslint-disable warnings remain in ShaderSurface.tsx, use-cycle.ts and use-prefers-reduced-motion.ts.
- `pnpm exec tsc --noEmit`: passed. A final direct TypeScript check and lint of the completed mobile test also passed.
- `pnpm build`: passed, 36 static pages.
- Production loopback smoke check: homepage returns 200 with one canvas, one absolute shader layer, one fallback, and the original video/poster. Served CSS contains absolute fill/full-height rules and 82% / 59% fallback positions. Served JS contains mobile DPR 1 / mouseInteraction false.
- `git diff --check`: passed. Baseline hashes confirm that only LaserFlow.tsx, its renderer and its hero caller changed among pre-existing files. New files are the responsive hero wrapper, presets, mobile tests and this report. Existing shader helpers, shader source, media, docs, package/lockfile, theme CSS and workflow configuration are unchanged by this task.

## Required browser checks still blocked

The browser tool returned **“The browser access host is unavailable.”** Chrome DevTools MCP is not configured. Prior automatic approval review rejected broad native Chrome reads because they could expose unrelated page content. The user chose to keep access limited to docs; this task did not authorize broader unrelated-window reads, so no such read was attempted.

No real viewport screenshots or device emulation runs were completed at any requested width. Text readability over the live beam, actual computed canvas size, card alignment during orientation/scroll, live hydration/console errors, touch-scroll smoothness, CPU/GPU timing and memory usage remain unverified. The source diagnosis and mock fixtures are not presented as browser evidence. Mobile emulation, when available, still will not prove real-device GPU performance.

Suggested next task: complete a scoped browser pass at 320, 375, 390, 430, 768 and desktop widths, then check representative real phones/tablets for touch scrolling, thermal/GPU behavior and memory. Keep the existing quality and suspension safeguards during those measurements.

## Changed files and git scope

- components/shared/laser-hero.tsx
- components/LaserFlow.tsx
- components/laser-flow/renderer.ts
- components/laser-flow/hero-laser.tsx (new)
- components/laser-flow/hero-presets.ts (new)
- tests/mobile-laser.test.tsx (new)
- tasks/mobile-laser-verification.md (new)

During this task, an external commit **f067c80** (`shader optimizatsionu`) captured the in-progress implementation together with earlier work and was already present on origin/main. It is left intact. The follow-up commit for this task contains only the new mobile regression suite and this verification report; it does not rewrite or recommit the earlier changes.
