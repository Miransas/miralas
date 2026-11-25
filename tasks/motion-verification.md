# Miralas marketing motion verification

## Status
Code implementation and automated checks are complete. The final real-browser checklist remains blocked on a Chrome window containing only the local site. No commit or push was made.

## Implementation
- Existing Framer Motion entry points now share typed Reveal, ScrollReveal, SectionReveal, StaggerReveal and TextReveal primitives. Existing names remain compatible.
- Server HTML begins visible. A shared IntersectionObserver coordinates one-shot reveals, with tall-section, fast-scroll, keyboard-focus and changed reduced-motion recovery. Nested blocks do not add another transform or observer.
- One ResizeObserver/font scheduler measures naturally wrapped heading lines. There are no animated word/character nodes. The source text remains available to assistive technology; decorative measured lines are aria-hidden. Masks include descender space and remeasure on width/font changes.
- Timing is centralized in lib/motion.ts: headings 680ms, paragraphs 500ms/8px, metadata 400ms/opacity, cards/sections 600ms/12px, group stagger 60ms capped at 180ms total delay, interactions 180ms, page entry 300ms, semantic theme colors 220ms. Primary easing is [0.22, 1, 0.36, 1].
- PageTransition animates incoming opacity on pathname changes. It does not intercept navigation, delay exits, change keys, write scroll positions or transform the wrapper of sticky/fixed content. Persistent headers and footers remain outside it.
- Homepage no longer mounts Lenis. Native wheel, keyboard, touch, anchor and history scrolling remain under the browser/Next.js. Existing sticky-card and parallax progress logic is retained.
- Existing continuous hero/video offscreen behavior is retained. LaserFlow now responds to live reduced-motion changes and compares lens settling to its actual target, avoiding a reduced-motion RAF loop while the pointer is inside the hero. Pointer geometry is not read when reduced, offscreen or hidden.
- No new dependencies, colors, gradients, benchmark claims, routes, backend/auth changes or deployment configuration changes.

## Passed
- `node --import tsx --test tests/marketing-motion.test.tsx`: 4 tests pass, 0 skipped. Covers visible SSR, pooled observation/cleanup, 12% threshold, tall/fast-scroll recovery, focus and reduced-motion changes.
- Regression probe: temporarily lowering the viewport threshold made the intended test fail; original source was restored and all 4 tests passed again.
- `pnpm lint`: passed with the same 3 pre-existing unused-disable warnings in ShaderSurface.tsx, use-cycle.ts and use-prefers-reduced-motion.ts.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed; 33 static pages generated.
- HTTP smoke checks: /, /product/tts, /product/models, /pricing, /resources/about, /resources/contact, /solutions/enterprise-voice and /docs/tts all returned 200.
- Production server HTML contains the original hero copy and no measured overlay duplication.
- Both light/dark semantic color declarations match the starting workspace. Existing logo bytes and #ad08ea laser color are preserved. Package/lockfile, backend/auth paths, Next configuration and workflows are unchanged.
- `git diff --check`: passed. Intermediate JSX/import integration errors were caught and corrected before the final checks.

## Bundle measurement
Production homepage script responses: 15 scripts, 309,736 gzip bytes, versus 14 scripts / 314,920 gzip bytes before this task. Difference: -5,184 bytes (-1.65%). This sums individually gzipped scripts referenced by the production homepage HTML; it is not a runtime speed, FPS or Core Web Vitals measurement.

## Browser observations and blockers
Native Chrome opened localhost:3000 and a desktop homepage screenshot was reviewed during implementation. That establishes a limited visual observation, not a completed final browser pass.

Chrome DevTools MCP is not configured. The isolated browser host is unavailable. Automatic approval review rejected a full accessibility-state read of the shared Chrome window because it included unrelated account content. No attempt was made to bypass that rejection. A separate window containing only localhost:3000 has been requested from the user.

Unverified: final hero timing, normal/fast scroll reveal playback, section transitions, header/dropdowns, route transitions, back/forward scroll restoration, dark/light theme switching, mobile breakpoints, live reduced-motion behavior, browser console, layout stability and runtime performance. Screen-reader/zoom checks and axe/pa11y were not run. No full WCAG or performance-pass claim is made.

## Follow-up
Finish the requested browser checklist once the dedicated local-site window is ready. Existing unmounted LandingSmoothScroll and SmoothScroll exports were left intact; removing those legacy exports/dependencies can be a separately authorized cleanup.

## Files changed by this motion task
- `app/(docs)/layout.tsx`
- `app/(site)/layout.tsx`
- `app/(site)/page.tsx`
- `app/(site)/product/agent/agent-client.tsx`
- `app/(site)/product/api/api-client.tsx`
- `app/(site)/product/models/page.tsx`
- `app/(site)/product/page.tsx`
- `app/(site)/product/tts/tts-client.tsx`
- `app/(site)/product/voice-clone/voice-clone-client.tsx`
- `app/(site)/resources/contact/contact-client.tsx`
- `app/(site)/resources/help-center/page.tsx`
- `app/(site)/resources/media/media-client.tsx`
- `app/(site)/solutions/creators/page.tsx`
- `app/(site)/solutions/enterprise-voice/page.tsx`
- `app/(site)/solutions/others/page.tsx`
- `app/(site)/solutions/page.tsx`
- `app/(site)/solutions/streaming/page.tsx`
- `app/(site)/solutions/voice-agents/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `components/LaserFlow.tsx`
- `components/docs/code-block.tsx`
- `components/docs/docs-page.tsx`
- `components/docs/docs-sidebar.tsx`
- `components/docs/tabel-of-content.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Header.tsx`
- `components/motion/page-transition.tsx`
- `components/motion/primitives.tsx`
- `components/motion/reveal.tsx`
- `components/motion/text-layout.ts`
- `components/motion/text-reveal.tsx`
- `components/motion/use-reveal.tsx`
- `components/motion/viewport.ts`
- `components/pricing/PricingClient.tsx`
- `components/pricing/pricing-experience.tsx`
- `components/pricing/pricing-ui.tsx`
- `components/providers/cookie-consent.tsx`
- `components/providers/mode-toggle.tsx`
- `components/providers/theme-provider.tsx`
- `components/resources/help-center.tsx`
- `components/resources/support-section.tsx`
- `components/shared/DitherShowcase.tsx`
- `components/shared/ImmersiveSection.tsx`
- `components/shared/Stackedcards.tsx`
- `components/shared/WhyMiralas.tsx`
- `components/shared/comparison-section.tsx`
- `components/shared/demo-carousel.tsx`
- `components/shared/faq.tsx`
- `components/shared/hero.tsx`
- `components/shared/intro-team-Section.tsx`
- `components/shared/language-coverage.tsx`
- `components/shared/laser-hero.tsx`
- `components/shared/robot-eyes.tsx`
- `components/shared/robot-section.tsx`
- `components/shared/team-section.tsx`
- `components/shared/voice-technology.tsx`
- `components/solutions/solution-flow.tsx`
- `components/solutions/solution-ui.tsx`
- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `lib/motion.ts`
- `mdx-components.tsx`
- `tests/marketing-motion.test.tsx`
- `tasks/motion-plan.md`
- `tasks/motion-verification.md`
