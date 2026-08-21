# Miralas

**Voice AI infrastructure for text-to-speech, voice cloning, and live creator workflows.**

Miralas is a voice platform by [Miransas](https://miransas.com). This repository contains the public web application for Miralas: the marketing site, product pages, Studio previews, resource pages, and console entry points.

The production system behind Miralas uses a Rust backend for low-latency API, streaming, and donation workflows. Model inference is handled separately, with Miralas using Resemble AI's Chatterbox family as the base text-to-speech and voice cloning model.

## Product Areas

- **Studio** - text-to-speech, voice cloning, and model exploration pages.
- **Products** - API platform and Stream Donate experience for live creators.
- **Resources** - guides, changelog, media, support, and company information.
- **Console links** - entry points to the hosted Miralas console for generation, projects, and creator workflows.

## Model

Miralas uses **Resemble AI Chatterbox** as its base model layer:

- Model page: [resemble.ai/learn/models/chatterbox](https://www.resemble.ai/learn/models/chatterbox)
- Source: [github.com/resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)
- License: MIT

Chatterbox provides open-source TTS and zero-shot voice cloning capabilities. Miralas builds product workflows, backend services, streaming APIs, and language/domain tuning around that model layer.

## Tech Stack

- **Next.js 16** with the App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Three.js / React Three Fiber** for richer interactive surfaces
- **Rust backend** for API, gRPC streaming, donation events, and real-time infrastructure
- **Python inference service** for AI model execution around Chatterbox

## App Routes

```text
/
/pricing
/products
/products/api
/products/donate
/resources/about
/resources/changelog
/resources/guides
/resources/help-center
/resources/media
/resources/support
/solutions
/studio
/studio/models
/studio/tts
/studio/voice-clone
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The site runs at:

```text
http://localhost:3000
```

Useful scripts:

```bash
pnpm build
pnpm lint
pnpm start
```

## Project Structure

```text
miralas/
├── app/                 # Next.js app routes and pages
├── components/          # Shared layout and UI components
├── lib/                 # Shared utilities
├── public/              # Static assets
├── README.md
├── license
└── package.json
```

## Repository Scope

This repository is the public web surface for Miralas. It does not include the full production console, billing system, private Rust services, or deployment secrets.

## License

This repository is released under the MIT License. See [license](./license).

Miralas and Miransas names, logos, product names, and brand assets are not licensed for third-party use except with written permission. Resemble AI Chatterbox is a third-party MIT-licensed model and remains copyright Resemble AI.

---

Built by [Miransas](https://miransas.com) for [Miralas](https://miralas.io).
