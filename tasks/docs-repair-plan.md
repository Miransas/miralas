# Miralas documentation repair

Scope: shared docs layout, the existing Rail TOC, navigation, MDX rendering, code/copy actions and documentation motion. Preserve the existing uncommitted marketing/motion work and all documentation content. No dependencies, backend/auth/deployment changes, commits or pushes.

## Root causes
- Header is fixed with h-16 (64px at the default root font). Docs layout has no header-height padding; its article starts at py-8 (32px), causing overlap.
- Rail TOC exists but is unused. The old TOC, a regex in mdx-loader and another regex in lib/docs.ts compete with rehype-slug's actual IDs. Fences, formatting, duplicate titles and Unicode can disagree.
- Old TOC prevents native hash navigation. Rail's existing button clicks also do not update history/hash. Both currently own independent scroll tracking logic.
- pre mapping converts highlighted React children to String, losing nested token text; no syntax styles exist. Code block and whole article are unnecessarily client components.
- Edit repository constant has a trailing slash and the action appends /edit. Clipboard feedback does not await success or expose failure.
- Docs currently use marketing heading reveals and a 300ms route entry, contrary to a stable reading interface.

## Work order
1. Central header offset and responsive reading layout; desktop/mobile navigation.
2. Reuse Rail TOC's geometry and visual rail. Repair native anchors, active heading state, nested hierarchy, history and sticky overflow; retire the competing TOC from the route.
3. Collect H2/H3 entries after rehype-slug assigns IDs; compile each local doc at build. Preserve source Markdown for copy actions and validate slugs against existing files.
4. Add a reading-only MDX map, safe server-rendered highlighted code and small shared client clipboard control. Preserve the marketing MDX map's heading behavior.
5. Focused regression tests for headings, fences, duplicate/Unicode IDs, highlighting/raw copy, source URLs and route boundaries; lint, type-check, production build and route smoke tests.
6. Verify real browser layout, navigation, hashes, copy actions, themes, mobile and reduced motion if isolated browser access becomes available. Do not claim checks that could not run.
