Build the top of a product page for a sleek home heat pump (an indoor wall unit plus an outdoor unit), recreating the look and feel of airform.space. Include only three sections: a **giant-wordmark hero where the 3D product rotates and splits into its two units**, a **scroll-reveal statement on a soft blurred background**, and a **"One system, two parts." lifestyle photo carousel** with numbered features. Use React or vanilla JS with Three.js (or a scroll-scrubbed image sequence) for the product. Make it responsive (mobile → 1440px) and respect `prefers-reduced-motion`. Use a placeholder product name and your own renders and photos.

## Visual language

- **Feel:** Apple-grade industrial design. A white page, a soft light-grey grotesk, photoreal product renders in brushed white aluminium and slate-blue fins, and slow, smooth scroll-scrubbed 3D motion.
- **Colours:**
  - page `#FFFFFF`
  - soft panel `#F3F3F6`
  - text `#454545`
  - muted text `#636363` / `#6E6E73`
  - numerals `#BEBEBE`
  - hairline `#DEDEDE`
  - dark pill `#454545` / `#1D1D1F` with white text
  - glass pill `rgba(232,232,237,.72)`
  - product: white aluminium shell with slate blue-grey `#5B6B7E` vertical fins
- **Font:** "Oakes Grotesk" (fallback "Inter", "Söhne" or "SF Pro Display").
  - Hero wordmark about 230px/1.0, weight 500.
  - "[Product] One" 32px/700.
  - H2 51px/1.1, weight 400, tracking -0.01em.
  - Numbers 40px/300 in `#BEBEBE`.
  - H3 22px/300.
  - Statement 24px/1.5 in `#454545`.
  - UI 12–15px.
- **Radii:** pills 100px; photo cards 32px; small panels 18–22px.
- **Easing:** `cubic-bezier(.22,1,.36,1)` for reveals, spring `cubic-bezier(.34,1.3,.64,1)` for small UI.

## Section 1 — Hero: wordmark + product

- **Nav** (transparent, 90px):
  - Left: a small black origami-bird logo mark and a language selector "EN ⌄".
  - Centre: a glass pill holding "Residential" and "Multihome" (13px).
  - Right: an Instagram icon, "Sign in" and a dark pill "Order" (`#454545`, 32px).
- **Wordmark:** an enormous **"[Brand]" wordmark** spans the width behind everything, about 230px, filled with a **vertical gradient** (slate-grey at the top fading to white at the bottom, via `background-clip: text`), so it melts into the page.
- **Product:** in front of the wordmark, centered, a **photoreal 3D render of the indoor unit standing vertically**: a tall, rounded white aluminium capsule with a narrow vertical blue-grey vent strip. Soft studio shadow.
- **Scroll sequence** (pinned, about 2 viewports):
  1. The unit **rotates and tilts** to show its side, then **splits into two products**: the slim indoor wall unit (white rounded bar, upper left) and the **outdoor unit** (a rounded square box with vertical slate-blue fins and two large fan circles visible through the grille, on the right), each floating at an angle.
  2. The wordmark fades away and the product name appears on the left: "[Product] **One**" (32px, with "One" in light grey), the subline "The world's most advanced / liquid cooling heat pump" (16px grey), and a dark pill "Order" (45px, 14px/500).

## Section 2 — Statement

- **Background:** a soft, **blurred, out-of-focus abstract** of the product's white and grey forms, like a macro photo with extreme depth of field, filling the section.
- **Statement:** left-aligned, max about 760px, 24px/1.5: "Comfort shouldn't mean compromise. No refrigerants between devices, no ductwork and no special labor needed. [Product] runs on water, the easiest and safest way to directly move heat in your environment."
- **Scroll reveal:** words start very light grey (about 30% opacity) and **darken to `#454545` word by word** as you scroll. At first only "Comfort shouldn't" is dark.

## Section 3 — "One system, two parts."

- **Header:** centered H2 "One system, two parts." (51px/400), then 15px grey: "An indoor unit that disappears into the room. An outdoor unit that quietly makes it work. Both built to blend seamlessly into the environment."
- **Carousel:** a **horizontal draggable carousel** of large lifestyle photos (32px radius, about 620 × 420px, 16px gap), with the next card peeking in from the right:
  - a modern minimalist house at dusk, with the indoor unit glowing above a window and the outdoor unit on the deck
  - a light-filled café or kitchen interior with a person at the counter and the indoor unit high on the wall
  - more homes and interiors
- **Hint:** under the carousel, a thin hairline with a centered 12px grey hint "Scroll or drag to view more".
- **Numbered columns:** three columns, each starting with a light numeral (40px/300 `#BEBEBE`) and a hairline above:
  - **01 — Architectural / by design.** "Crafted to architectural standards. With a refined form and considered finishes that complement the spaces they inhabit, rather than compete with them."
  - **02 — Effortless install. / Every time.** "No tools, no contractors, no scheduling. [Product] snaps into place in minutes…"
  - **03 — No refrigerants / between devices.** "Heat moves between the indoor and outdoor units through water alone…"

## Do / Don't

- **Do:** use a white page, a soft light grotesk, a giant gradient wordmark behind photoreal product renders, scroll-scrubbed 3D that splits the product into its parts, a word-by-word reveal statement, rounded lifestyle photo cards, and light numerals.
- **Don't:** use bold colour, dark sections, heavy weights, icons, or busy spec tables in these sections, and don't make the motion fast.