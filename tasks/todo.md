# Miralas visual system tasks

- [x] Theme foundation: exact page/surface/elevation/hover palette; text contrast >=4.5 on all token surfaces; shared monochrome buttons and borderless rounded-4xl cards. Verify palette math, lint and type-check. Dependencies: none. Files: globals.css, ui/button.tsx, ui/card.tsx, ui/glow-button.tsx.
- [x] Navigation and hero: neutral chrome/focus, readable helper text, shared CTA styles; preserve hero media and user edits. Verify source diff and browser if available. Dependencies: foundation. Files: Header.tsx, Footer.tsx, mode-toggle.tsx, laser-hero.tsx, voice-studio-demo.tsx.
- [x] Homepage sections: remove purple treatments, normalize major radii/spacing, simplify nested decoration while retaining content and animations. Verify color scan and interactive controls. Dependencies: foundation. Files: voice-technology.tsx, Stackedcards.tsx, WhyMiralas.tsx, language-coverage.tsx, faq.tsx.
- [x] Other marketing presentation: replace remaining decorative accent colors and low-contrast neutral text with semantic tokens; retain status colors and fixed-dark media. Verify lint/type-check and changed-file review. Dependencies: foundation. Files: related shared, pricing, solutions, product and resource presentation components; no auth/backend/config.
- [x] Hydration fix: use fixed-precision deterministic waveform heights; preserve signal shape. Verify server output and browser logs when available. Dependencies: homepage styling. File: voice-technology.tsx.
- [x] Final checkpoint: run lint, type-check and production build; inspect both themes, keyboard focus and responsive layout if browser access works; review git diff/status and record limitations. No commit/push.


## Verification evidence
- `pnpm lint`: passed, 0 errors; 3 pre-existing unused eslint-disable warnings in ShaderSurface.tsx, use-cycle.ts and use-prefers-reduced-motion.ts.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed, 33 static pages generated.
- Local HTTP smoke checks: homepage, TTS, pricing, Help Center and enterprise solution return 200.
- Contrast calculation from actual CSS token declarations: 24 heading/body/secondary combinations on page/card/elevated/hover pass 4.5:1. Minimum: light 4.53:1, dark 4.82:1. Eight functional input-border/surface combinations pass 3:1.
- Production SSR inspection: all 48 EngineeredAudio bars emit fixed three-decimal percentage heights.
- Reviewed for behavior, accessibility, architecture, dependencies, secrets and performance. No backend, auth, database, package/lockfile or deployment configuration changes.
- Pre-existing untracked miralas-logo.tsx is byte-identical to its initial snapshot; the user's #ad08ea laser edit is retained.
- Final `git diff --check`: passed. No commit or push.
- An intermediate verification caught empty JSX conditions after decorative overlay removal (lint/type-check/build failed; local route returned 500). These were corrected; all final commands and five route checks passed.

## Browser and accessibility limitations
Browser access host is unavailable; native Chrome AX access timed out twice. Visual checks in both themes, responsive breakpoint checks, live hydration confirmation, keyboard/zoom testing and screen-reader testing remain unverified. No axe/pa11y tool is installed, and no dependencies were added. Source and contrast checks do not establish full WCAG conformance.

## Existing development issue
The Next.js development log identifies a hydration style mismatch in EngineeredAudio. Node generated height 68.53385902011917%, while the client expected 68.53385902011918%; React's error shows a rounded DOM style value. Fixed-precision heights avoid cross-engine Math.sin/Math.cos precision differences. The signal shape and reveal behavior remain intact. Existing devIndicators configuration was left untouched. A fresh browser reload is still required to confirm runtime resolution.

## Changed presentation files
- `app/(site)/product/agent/agent-client.tsx`
- `app/(site)/product/api/api-client.tsx`
- `app/(site)/product/tts/tts-client.tsx`
- `app/(site)/product/voice-clone/voice-clone-client.tsx`
- `app/(site)/resources/help-center/page.tsx`
- `app/(site)/resources/media/media-client.tsx`
- `app/(site)/solutions/creators/page.tsx`
- `app/(site)/solutions/enterprise-voice/page.tsx`
- `app/(site)/solutions/others/page.tsx`
- `app/(site)/solutions/page.tsx`
- `app/(site)/solutions/streaming/page.tsx`
- `app/(site)/solutions/voice-agents/page.tsx`
- `app/globals.css`
- `app/not-found.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Header.tsx`
- `components/modals/comming-soon.tsx`
- `components/pricing/PricingClient.tsx`
- `components/pricing/agent-pricing.tsx`
- `components/pricing/api-pricing.tsx`
- `components/pricing/pricing-experience.tsx`
- `components/pricing/pricing-ui.tsx`
- `components/pricing/studio-pricing.tsx`
- `components/providers/cookie-consent.tsx`
- `components/providers/mode-toggle.tsx`
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
- `components/shared/robot-section.tsx`
- `components/shared/team-section.tsx`
- `components/shared/voice-contrast-section.tsx`
- `components/shared/voice-studio-demo.tsx`
- `components/shared/voice-technology.tsx`
- `components/solutions/dialogue-preview.tsx`
- `components/solutions/solution-flow.tsx`
- `components/solutions/solution-ui.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/glow-button.tsx`
- `tasks/plan.md`
- `tasks/todo.md`
