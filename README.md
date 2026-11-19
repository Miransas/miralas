# Miralas public website

The public Miralas marketing website and documentation, built by [Miransas](https://miransas.com). This is separate from Miralas Console and does not contain authenticated workspaces, private Rust services, model inference, billing or deployment secrets.

## Product status and content sources

The current engineering baseline supplied for the website refinement identifies:

- Chatterbox Multilingual as the active engine; approved checkpoint `t3_mtl23ls_v2.safetensors`.
- 23 model-supported languages. This describes model coverage, not a public voice inventory.
- A Rust API and Python inference worker connected through gRPC.
- Validated 24 kHz mono PCM16 output.
- Implemented Voice Catalog infrastructure; published curated voice seeds remain unverified.
- Completed Docker/CUDA benchmark preparation; real NVIDIA GPU benchmarks remain pending.

The private service implementation is outside this checkout, so its engineering baseline is supplied context, not a new independent backend audit. Public Console/API access is not confirmed. Links to the existing `https://console.miralas.io` origin identify the access destination without promising public sign-up or specific workspace routes.

**Uzbek Speech — In Development.** We're working toward native Uzbek speech capabilities through research, data collection and model evaluation. Uzbek is not one of the current engine's supported languages and is not available for production inference.

Qwen, CosyVoice and Miransas-native models are future research plans, not shipped integrations. Do not publish latency, throughput, customer counts or model superiority claims without supporting evidence.

Upstream facts checked on November 18, 2026:

- [Chatterbox multilingual implementation](https://github.com/resemble-ai/chatterbox/blob/master/src/chatterbox/mtl_tts.py): language list and V2 checkpoint asset name.
- [Chatterbox sample-rate constant](https://github.com/resemble-ai/chatterbox/blob/master/src/chatterbox/models/s3gen/const.py): 24,000 Hz. This does not independently establish Miralas' PCM encoding or service performance.
- [Chatterbox source and MIT license](https://github.com/resemble-ai/chatterbox): upstream project. Upstream releases do not imply automatic Miralas integration.

Shared website facts live in `lib/voice-technology.ts`. Keep the FAQ, documentation and metadata consistent when product availability changes.

## Development

Stack: Next.js 16 App Router, React, TypeScript, Tailwind CSS v4 and Framer Motion. Read `AGENTS.md` and the relevant installed Next.js documentation before modifying the application.

```sh
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

The local server runs at `http://localhost:3000`. The build needs Google Fonts access and local worker ports for MDX compilation. There is no component-test runner configured. If pnpm's package-manager version bootstrap is unavailable, the installed binaries can be run directly with Node.

## Public routes

- `/`, `/product`, `/product/tts`, `/product/voice-clone`, `/product/models`, `/product/api`, `/product/agent`
- `/pricing`, `/solutions` and its use-case pages
- `/resources/about`, `/resources/changelog`, `/resources/guides`, `/resources/help-center`, `/resources/media`, `/resources/support`, `/resources/contact`
- `/docs/getting-started`, `/docs/tts`, `/docs/speech-to-speech`

## Motion and accessibility

`components/motion/reveal.tsx` supplies viewport-triggered `ScrollReveal` and `WordReveal` primitives. Server HTML starts visible, word effects retain a single accessible text label, transforms reserve layout space and reduced-motion preferences show content immediately. Native page scrolling preserves keyboard, touch and reduced-motion behavior. Decorative audio diagrams are static; the existing laser hero and video identity are retained.

## License

The repository uses the MIT License; see `license`. Miralas and Miransas names, logos, product names and brand assets are not licensed for third-party use without permission. Chatterbox remains a third-party model under its own MIT license.
