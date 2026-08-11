# Miralas

**Give your ideas a voice.** Natural, expressive, production-ready speech — built for Uzbek, and beyond.

Miralas is a voice platform by [Miransas](https://miransas.com). It reads live donations and superchats aloud for streamers, and turns text into speech on demand. Uzbek is a first-class language, not an afterthought — a gap most voice tools leave open.

This repository (`miralas-web`) is the public marketing site for [miralas.io](https://miralas.io). The application itself — accounts, billing, the voice pipeline — lives in a separate, private repository. The **Log in** button here links straight to the console.

---

## What Miralas does

- **Donation reader** — when a donation or superchat arrives on Kick, YouTube, or Twitch, Miralas speaks it aloud on your stream.
- **Text to speech** — upload text, get natural audio back, in multiple languages.
- **Real voices** — a growing library of voice options, with Uzbek at the center.

## Status

Early development. The site and product are being built in the open, step by step.

---

## Tech

The public site is a [Next.js](https://nextjs.org) app, deployed on Vercel. Dark-mode first, minimal, fast.

The product behind it is built on a Rust core for a low-latency, long-lived backend, with an isolated Python service for model inference. The site you're looking at is intentionally simple — no auth, no application logic, just the front door.

## Local development

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`.

```bash
pnpm build      # production build
pnpm lint       # lint
```

## Structure

```
miralas-web/
├── app/          # Next.js app router — pages, layout
├── public/       # static assets, logo
└── ...
```

## License

MIT — see [LICENSE](./LICENSE).

---

Built by [Miransas](https://miransas.com) · [miralas.io](https://miralas.io)