Build a single standalone index.html (inline <style> and <script>, no frameworks, no build step, no local assets) containing ONE full-viewport section: a 3D carousel of four gradient "metric" cards with looping video backgrounds. Follow every value below exactly.


=== FONTS ===
Load from Google Fonts (with preconnect to fonts.googleapis.com and fonts.gstatic.com crossorigin):
https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Inter+Tight:wght@300;400&display=swap
- Body/labels: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif
- Big numbers: 'Inter Tight', 'Inter', sans-serif, weight 400
- body: -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-x: hidden
- Global reset: *, ::before, ::after { box-sizing: border-box; margin: 0; padding: 0 }
- html, body: height 100%, background #efefef
- <title>: Gradient Metric Cards Carousel


=== ASSETS (use these exact URLs directly, do not download) ===
Base: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
Card 1 (green)  poster: hf_20261008_140431_c77a9976-42a7-4959-90d2-2a9676b3ccf1.png   video: hf_20261008_140656_3a462bc1-83f9-44fd-a8c3-a4522c29b9bc.mp4
Card 2 (red)    poster: hf_20261008_140436_7dd9cac5-2e1a-4dfb-8b1b-48d84c425ecd.png   video: hf_20261008_140701_8240477a-2071-4619-90cc-008e95e644ee.mp4
Card 3 (blue)   poster: hf_20261008_140443_125f93bf-08dc-4e3d-b3da-be0f68f6bffb.png   video: hf_20261008_140632_900f2862-5461-4592-ba6f-e40660186607.mp4
Card 4 (purple) poster: hf_20261008_140447_85124f3d-35bd-4097-9359-6e39a824f6ac.png   video: hf_20261008_140639_ade27fd2-965b-4278-81cb-9bc195dced1e.mp4
Each card's background is: <video class="card__bg" autoplay muted loop playsinline preload="auto" poster="{base+poster}" src="{base+video}">


=== SECTION ===
<section class="carousel" id="carousel" aria-roledescription="carousel" aria-label="Product metrics">
- position relative; width 100%; height 100vh then height 100svh; min-height 420px; background #efefef; overflow hidden; user-select none; touch-action pan-y; cursor grab (cursor grabbing while it has class .is-dragging)
- CSS variables on the section:
  --w: min(44.2vh, 54vw)   (card width; inside @supports (height: 100svh) use min(44.2svh, 54vw))
  --u: calc(var(--w) / 320)   (one "design pixel"; EVERY size inside a card is calc(var(--u) * N), written below as "Nu")
  --glow: 237, 190, 241   (RGB triplet, updated by JS)
- Children in this order: .glow.glow--top, .glow.glow--bottom, .stage#stage (holds the 4 cards), .lens.lens--l, .lens.lens--r


=== STAGE AND CARD SHELL ===
.stage: position absolute; inset 0; perspective: calc(var(--w) * 1.4); perspective-origin 50% 50%
.card (an <article>): position absolute; top 50%; left 50%; width var(--w); aspect-ratio 320 / 405; margin-left calc(var(--w) / -2); margin-top calc(var(--w) * 405 / 320 / -2); border-radius 13u; overflow hidden; color #fff; background #111; backface-visibility visible; will-change transform, opacity; isolation isolate
.card__bg: position absolute; inset 0; width/height 100%; object-fit cover; z-index -1; pointer-events none


Shared text:
.card__title and .card__foot: position absolute; left 21u; font-size 14u; line-height 1.24; weight 400; letter-spacing -0.012em; color rgba(255,255,255,.86); white-space nowrap. Title top 33u. Foot bottom 29u.
.card__center: position absolute; left 0; right 0; top 203u; transform translateY(-50%); display flex; align-items center; justify-content center
.num: Inter Tight 400; font-size 79u; line-height 1; letter-spacing -0.035em; display inline-flex; align-items flex-start
.num sup: font-size 27u; line-height 1; letter-spacing -0.01em; margin-top 6u; margin-left 3u


=== CARD 1 (class c1, data-glow="237,190,241") ===
Fallback background #4d7d1c. Title/foot color rgba(255,250,225,.86).
Title: "Access to advanced<br>intelligence". Foot: "GPT 5.2, Claude, Google".
Centre: <span class="num">95<sup>fh</sup></span>, color rgba(232,240,200,.92).
Dial: an SVG (viewBox 0 0 200 200, aria-hidden) absolutely positioned left 50%, top 203u, 198u x 198u, transform translate(-50%,-50%). All circles fill none, centre 100,100:
- base ring: r 93, stroke rgba(240,245,190,.22), stroke-width 9, stroke-dasharray "1.1 2.7" (radial tick marks)
- hot ring: r 93, stroke rgba(246,248,190,.78), stroke-width 9, same dasharray, masked by mask#dialMask
- inner ring: r 84, stroke rgba(240,245,190,.16), stroke-width 1
- mask#dialMask (maskUnits userSpaceOnUse, 0 0 200 200) contains path "M100 100 L-80 170 L-80 -100 L280 -100 L280 120 Z" filled with linearGradient#dialFade (x1 0 y1 0 x2 1 y2 1; stops: 0.15 white opacity .15, 0.5 white opacity 1, 0.85 white opacity .1)


=== CARD 2 (class c2, data-glow="70,190,240") ===
Fallback background #3a0519. Title/foot color rgba(255,226,236,.86).
Title: "Weekly Credit hours /<br>Image generation". Foot: "Image engine v2.0".
.card__center here: justify-content flex-start; padding 0 27u. Contents in order:
- .btn "+": 46u circle, background rgba(255,150,190,.3), grid centred, font-size 15u, color rgba(255,255,255,.85), margin-right 14u, flex none
- .num "720": font-size 77u; gradient text (background-clip text, color transparent): linear-gradient(90deg, #ffe9ee 0%, #ffb3a6 34%, #f0604e 62%, #9c1a36 100%); padding-right 4u
- .plus "+": margin-left auto; margin-right 14u; font-size 15u; color rgba(255,255,255,.8)
Ruler: <svg class="ruler" id="ruler" preserveAspectRatio="none">: position absolute; left 50u; width 224u; top 253u; height 20u; mask-image linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent) (also -webkit-). Fill it with JS: viewBox "0 0 256 20", 64 rects of width 1 at x = i*4, vertically centred; height for tick i = 5 + frac(sin(i*12.9898)*43758.5453) * 10 (frac made positive), fill rgba(255,205,215,.5); the middle tick (i = 32) is height 20 and fill #ff4b3a.


=== CARD 3 (class c3, data-glow="38,196,238") ===
Fallback background #06143c. Title/foot color rgba(226,240,255,.86).
Title: "Artificial intelligence<br>vs Human Tone". Foot: "Results Customization".
.card__center: top 205u; padding-right 8u. Contents: <span class="num">25<sup>%</sup></span>
- .num gradient text: linear-gradient(180deg, #2f9dff 0%, #36d6f5 55%, #46f0ee 100%)
- sup: color and -webkit-text-fill-color #3fd3f7
.slider: position absolute; left 22u; right 22u; top 256u; height 1.5u; background linear-gradient(90deg, rgba(70,200,255,0) 0%, rgba(90,215,255,.95) 22%, rgba(70,190,255,.75) 70%, rgba(70,190,255,0) 100%); box-shadow 0 0 8u rgba(60,200,255,.7)
.slider::after (knob): left 26%; top 50%; 12u circle; background #fff; transform translate(-50%,-50%); box-shadow 0 0 10u 2u rgba(190,235,255,.85)
.scale: position absolute; left 22u; right 22u; top 263u; display flex; justify-content space-between; font-size 9u; color rgba(215,235,255,.62); two spans "AI" and "Human"


=== CARD 4 (class c4, data-glow="150,170,250") ===
Fallback background #3d0f7c. Title/foot color rgba(244,232,255,.88).
Title: "Expand limits with Sora<br>video creation". Foot: "Support Sora, Kling &amp; Runwayml".
DOM order after title: badge, ghost up, ghost down, cross-h, cross-v, chip a, chip b, centre, foot.
- .badge "Beta version": absolute; right 21u; top 34u; padding 4.5u 8u; border-radius 999px; background rgba(255,255,255,.13); font-size 8.5u; line-height 1; color rgba(238,214,255,.72); nowrap
- .ghost (two, aria-hidden): absolute; left 0; right 0; text-align center; Inter Tight; font-size 66u; line-height 1; letter-spacing -0.035em; color rgba(255,255,255,.07); filter blur(1.2u). ".ghost--up" text "1.0" at top 101u. ".ghost--down" text "3.0" at top 236u with color rgba(20,0,50,.16)
- .cross-h: absolute; top 204u; left 48u; right 48u; height 1u; background rgba(255,220,255,.2)
- .cross-v: absolute; left 50%; top 92u; height 222u; width 1u; background linear-gradient(180deg, rgba(255,220,255,.5), rgba(255,200,255,.28))
- .chip: absolute; 27u circle; background rgba(26,6,52,.55); grid centred; font-size 8u; color rgba(255,255,255,.82). ".chip--a" text "fh" at left 49u, top 167u. ".chip--b" text "vh" at right 46u, top 208u
- .card__center: padding-left 4u. Contents: <span class="num"><span class="v">v</span>2.0</span>
  .num gradient text: linear-gradient(180deg, #fbe4ff 0%, #e79cff 45%, #c45cf5 100%)
  .v: font-size 26u; margin-top 14u; margin-right 1u; color and -webkit-text-fill-color rgba(214,160,255,.9)


=== AMBIENT GLOWS (top and bottom centre of the section) ===
.glow: absolute; left 50%; width max(27.5vw, 150px); height max(5vh, 30px); border-radius 50%; pointer-events none; background radial-gradient(ellipse at center, rgba(var(--glow), .95) 0%, rgba(var(--glow), .55) 38%, rgba(var(--glow), 0) 70%); filter blur(7px) saturate(1.15)
.glow::after: absolute; inset -40% -22%; border-radius 50%; background radial-gradient(ellipse at center, rgba(160,240,250,.4) 0%, rgba(160,240,250,0) 68%)
.glow--top: top 0; transform translate(-50%, -42%).  .glow--bottom: bottom 0; transform translate(-50%, 42%)


=== EDGE LENS (soft bloom over the side cards) ===
.lens: absolute; top 0; bottom 0; width 15%; pointer-events none; z-index 20; backdrop-filter blur(16px) saturate(1.35) (plus -webkit-)
.lens--l: left 0; mask-image linear-gradient(90deg, #000 0%, rgba(0,0,0,.55) 45%, transparent 100%)
.lens--r: right 0; same mask with 270deg (both with -webkit- prefix too)


=== RESPONSIVE ===
@media (max-width: 720px): --w: min(46vh, 58vw) (svh version inside @supports); .lens width 12% and blur(10px) saturate(1.3); .glow width 56vw, height 34px
@media (max-height: 480px): --w: min(52vh, 40vw)
No horizontal scroll at any width. Side cards may sit partly off-screen on phones.


=== CAROUSEL ANIMATION (vanilla JS, requestAnimationFrame) ===
Constants: HOLD = 2300 ms, TURN = 950 ms, SIDE_ROT = 125 deg, N = 4. Honour prefers-reduced-motion (no autoplay, instant steps).
State: pos = continuous float index of the front card (starts 0).
measure(): W = stage.clientWidth; w = first card offsetWidth; xSide = max(w*1.05, min(W/2, w*2.2)); then render(). Run on load, on resize, and after document.fonts.ready.
render(): for each card i compute p = (((i - pos + 2) % 4) + 4) % 4 - 2  (range -2..2), a = |p|, s = sign of p (−1 if p < 0 else 1):
- if a <= 1:  x = s*xSide*a;  z = -0.325*w*a;  r = s*125*(1 - (1 - a)^1.6);  opacity 1
- else t = a - 1:  x = s*xSide*(1 + t*1.6);  z = -0.325*w;  r = s*(125 + 55*t);  opacity = max(0, 1 - t*1.6)
- style.transform = translate3d(x px, 0, z px) rotateY(r deg); set opacity; z-index = 10 - round(a*4); visibility hidden when opacity is 0; aria-hidden true when a > 0.5
Result: front card faces the viewer; previous card rests at the left edge and next card at the right edge, both rotated 125deg so their content is mirrored and the outer edge flares toward the viewer; the fourth card is hidden behind.
Glow colour: f = pos mod 4, blend the data-glow RGB of card floor(f) and the next card linearly by the fraction, write to --glow on the section.
go(target, dur = TURN): animate pos from current to target with easeInOutCubic (t<.5 ? 4t^3 : 1 - (-2t+2)^3/2), render every frame, then schedule().
schedule(): setTimeout(() => go(round(pos) + 1), HOLD). Autoplay always advances +1 (next card comes in from the right).
step(d): clear the timer and go(round(current target or pos) + d).


Input:
- pointerdown on the section (left button only for mouse): stop timer and animation, record start x, start pos, time.
- pointermove: once moved more than 6px, add .is-dragging, setPointerCapture, and set pos = startPos - dx / (xSide*0.9); render.
- pointerup / pointercancel: if no drag, treat as click: x in left 30% of width -> step(-1); right 30% -> step(1); otherwise schedule(). If dragged: velocity v = (pos - startPos) / elapsed ms; target = round(pos + v*220); if target equals the starting slot and |pos - startPos| > 0.18, move one slot in the drag direction; go(target, 650).
- keydown ArrowRight -> step(1), ArrowLeft -> step(-1).
- visibilitychange: clear the timer when hidden, schedule() when visible again.
- For every video: set muted = true and call play() (catching errors) immediately and on canplay.


Deliver only the complete index.html.