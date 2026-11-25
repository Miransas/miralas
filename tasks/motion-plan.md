# Miralas marketing motion system

Scope: the public marketing site only. Preserve the existing uncommitted visual-system cleanup, colors, typography, spacing, routes, product copy, hero media and scroll-linked sticky scenes. No dependencies, commits or pushes.

## Audit
- Framer Motion 14.14.0 and MotionConfig already exist. Two reveal implementations currently overlap: variants-based primitives emit hidden SSR, while ScrollReveal progressively enhances visible HTML.
- WordReveal creates one animated element per word. Replace it with measured line masks while retaining natural text layout and one accessible text source.
- LandingSmoothScroll currently installs Lenis wheel and anchor interception; native scrolling is required by this task.
- App Router layouts persist the header/footer. Use an opacity-only entry on pathname changes inside those layouts; do not intercept links, add exit delays, remount content, or touch scroll restoration.
- Browser DevTools MCP is unavailable. Native Chrome Computer Use now works; use it for visual, interaction, console and responsive checks where available.

## Implementation order
1. Central motion presets and a pooled progressive viewport coordinator (visible SSR, one-shot reveals, tall-section and fast-scroll handling, focus and reduced-motion recovery).
2. Reuse existing primitive entry points for Reveal/ScrollReveal/SectionReveal/StaggerReveal/TextReveal and compatibility exports. Measure natural line boxes on resize/font changes; preserve source text and descenders.
3. Migrate current variants and grouped content into shared primitives, avoiding nested reveal transforms and long cumulative stagger delays. Preserve scroll-driven sticky/parallax components.
4. Add pathname-driven page entry inside marketing/docs layouts, keeping header/footer persistent. Restore native homepage scrolling.
5. Standardize interactive durations, press feedback, modal/dropdown presets and theme color transitions. Preserve focus styles and pause existing continuous media offscreen.
6. Verify lint, types, production build, server HTML, bundle comparison, browser flows, themes, responsive/reduced-motion behavior and console. Record any unverified performance metrics honestly.

## Verification contract
- Headings: 680ms; paragraphs: 500ms / 8px; metadata: 400ms opacity; sections/cards: 600ms / <=12px; stagger 60ms with total group delay capped at 180ms.
- Page entry: 300ms, opacity only. Interactions: 180ms. Theme colors: 220ms. Primary easing [0.22, 1, 0.36, 1].
- SSR content visible; no new dependencies, wheel interception, fullscreen overlays, permanent will-change or transition-all in marketing UI.
- Baseline production homepage scripts: 14 scripts / 314,920 gzip bytes (sum of individually gzipped script responses; not a measured runtime metric).

## Outcome
Implementation and automated verification complete. Final browser verification is pending the dedicated local-site window requested from the user. See `tasks/motion-verification.md` for exact results, browser limitations, the performance measurement and the motion-only changed-file inventory.
