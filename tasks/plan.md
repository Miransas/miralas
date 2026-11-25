# Miralas marketing visual system cleanup

Scope: miralas.io marketing pages and shared presentation components. Preserve routes, verified copy, typography, media, audio controls and reveal animations. No backend, auth, dependencies, deployment changes, commits or pushes.

## Audit and design contract
- Tailwind v4 uses `app/globals.css` as its theme configuration; next-themes toggles `.dark`.
- Global purple accent gradients and colored shadows leak into homepage cards, FAQ, footer and pricing. Dark cards (#000103) sit below the #050505 page instead of above it.
- Hardcoded purple focus rings, badges and range controls bypass semantic tokens. Header/hero helper text #6E6E74 fails normal-text contrast on dark surfaces.
- Shared Button base classes override variants in dark mode. Link CTAs and the legacy GlowButton have separate visual systems.
- Preserve the user's laser color #ad08ea as hero media. Remove surrounding decorative colored treatments.
- Keep page #050505 / #EFEFEF; use surface, elevated and hover levels from the requested palette. Use heading/body/secondary semantic text. Neutral focus rings and functional control borders remain visible.
- Normalize large card radii to rounded-4xl and standard section rhythm to py-24 / sm:py-32 where appropriate, preserving hero and content-specific spacing.

## Ordered implementation
1. Theme tokens, contrast and shared Button/Card primitives.
2. Header, hero and homepage sections: semantic colors, neutral controls, consistent spacing/radii.
3. Marketing product/resource/pricing components: remove remaining decorative accent styles and weak neutral text.
4. Fix the existing waveform hydration precision mismatch independently of styling.
5. Run lint, type-check, production build; browser inspection of both themes if available; review diff and preserve pre-existing edits.

## Risks and verification
- Hero/video and fixed-dark media need local dark scopes when surrounding theme is light.
- Existing dev log records EngineeredAudio hydration mismatch: cross-runtime floating-point percentage heights differ (server 68.53385902011917% versus client 68.53385902011918%; the error displays the rounded CSS value). Use fixed decimal precision.
- Browser access host currently unavailable; native Chrome fallback is being attempted. Report coverage honestly.
- pnpm launcher fails inside sandbox with SecItemCopyMatching (-50); invoke installed package binaries as fallback.
- No component test runner is configured. Do not add dependencies for this cleanup.

Task status and final evidence: `tasks/todo.md`.
