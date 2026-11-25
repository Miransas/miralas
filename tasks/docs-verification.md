# Miralas documentation repair verification

Implementation and automated verification are complete. The browser checklist is incomplete and blocked by unavailable scoped browser access. No commit, push, dependency, backend, authentication, database or deployment change was made.

## Root causes and repair

- The fixed header is 64px at the default root font size, but the shared docs layout provided only 32px of article padding. The header and docs now share `--site-header-height`; root padding, sticky rails, scroll padding and heading margins account for it.
- Existing RailToc was unused. Competing regex heading extraction disagreed with rendered `rehype-slug` IDs, including duplicate/formatted/Unicode headings and fenced code. Metadata now comes from the rendered heading tree after slug assignment. The existing RailToc is canonical, with nested native anchors, hash/history handling and one scroll-tracking lifecycle.
- Native anchors were previously prevented without updating the URL. Window anchors now retain browser navigation; the rail tracks active headings and handles direct hashes without route-entry fades. The article has no per-element reveals.
- Highlighted React token children were coerced to strings, losing syntax and raw code. Existing rehype-highlight now renders on the server. Raw code is captured before highlighting; filenames, language labels, horizontal scrolling and keyboard focus are supported. Only clipboard interaction needs a client component.
- Clipboard success was shown before awaiting the write. Shared copy controls now wait and announce success or failure. Copy Markdown receives the exact file source, including frontmatter. GitHub edit actions use the verified repository and actual content path; the existing GitHub feedback link is retained.
- The reading layout now has desktop navigation/article/TOC columns, bounded navigation scrolling, a native mobile navigation disclosure, and consistent semantic typography/surfaces. Syntax colors are functional and scoped to code; there are no new decorative colors, gradients or colored shadows.

## Passed checks

- `node --import tsx --test tests/docs-system.test.mts tests/marketing-motion.test.tsx`: 9 passed, 0 failed, 0 skipped. Five docs tests cover rendered IDs, duplicates, Unicode, fenced headings, nested TOC/hash helpers, highlighted/escaped code, exact text, source files, URLs and awaited clipboard failures; four existing marketing motion tests also pass.
- `pnpm lint`: 0 errors. Three existing unused eslint-disable warnings remain in ShaderSurface.tsx, use-cycle.ts and use-prefers-reduced-motion.ts.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed, 36 static pages generated, including all three docs content routes.
- Production loopback HTTP/HTML checks: getting-started, tts and speech-to-speech each return 200; each has one H1, unique IDs, matching article/TOC anchors and correct edit/feedback URLs. Heading counts are 4, 5 and 2 respectively. `/docs` redirects to getting-started; an unknown doc returns 404.
- `git diff --check`: passed. Reviewed correctness, accessibility, architecture, security and performance. No new dependencies or client-side syntax highlighter. Docs content is pre-rendered; marketing MDX heading defaults remain available.
- Source comparison with `/tmp/miralas-docs-baseline`: all three article files are byte-identical. Unrelated files are unchanged by this task. Separate local edits to laser-hero.tsx appeared during the task and were preserved without modification.
- Theme token declarations and exact page backgrounds remain unchanged. Syntax foreground/background contrast calculations are at least 5.38:1 in light and 6.01:1 in dark, including comments. This is a source calculation, not a full accessibility conformance audit.

## Actual browser observations and limits

Observed the Getting Started page in the dedicated native Chrome window: its H1 is visible below the header and the dark desktop layout displays navigation, article and RailToc. Clicking Engineering foundation updated the URL hash and focused the matching H2 in the accessibility tree. These are limited observations, not a full browser pass.

Chrome DevTools MCP is not configured, and the scoped browser access host is unavailable. Native Chrome targeting repeatedly selected unrelated windows. Automatic approval review rejected broad accessibility reads because they could expose unrelated page content. The user explicitly chose to keep access limited to docs and report browser checks blocked. No further broad reads were attempted after that decision.

Still unverified in a real browser: all-route client navigation; initial/direct hash visual clearance; scrollspy playback; back/forward restoration; mobile/tablet layouts and overflow; light-theme rendering; real clipboard writes/feedback; live reduced-motion behavior; console/hydration errors. The published docs currently contain no fenced code blocks, so the long-code, highlighting and copy edge cases were exercised with generic automated fixtures, not fabricated product examples. No axe, screen-reader or zoom audit was run.

The separately investigated earlier Next.js issue was an EngineeredAudio hydration style mismatch: server/client floating-point waveform heights differed in the final decimal place. Fixed-precision heights were applied in the earlier visual cleanup. This docs task does not change that component or hide the issue indicator; runtime resolution still needs a scoped browser console check.

## Files changed by this docs task

- app/(docs)/layout.tsx
- app/(docs)/docs/[slug]/page.tsx
- app/globals.css
- components/layout/Header.tsx
- components/motion/page-transition.tsx
- components/docs/docs-page.tsx
- components/docs/docs-sidebar.tsx
- components/docs/rail-toc.tsx
- components/docs/tabel-of-content.tsx
- components/docs/code-block.tsx
- components/docs/copy-button.tsx
- components/docs/page-actions.tsx
- lib/docs-d.ts
- lib/docs.ts
- lib/mdx-loader.ts
- lib/docs-mdx.ts
- lib/docs-code.ts
- lib/docs-navigation.ts
- lib/clipboard.ts
- mdx-components.tsx
- tests/docs-system.test.mts
- tasks/docs-repair-plan.md
- tasks/docs-verification.md

Suggested next task: finish the listed browser checks when reliable docs-scoped browser access is available. Do not treat the incomplete browser checklist as passed.
