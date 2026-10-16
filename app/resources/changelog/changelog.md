# Changelog

Miralas Console — running log of what has actually shipped, per phase.
Newest first. Dates reflect when the work landed on `master`.

---

## Phase 2.1 — Track B model swap: Chatterbox → XTTS-v2 (2026-08-12, uncommitted)

Chatterbox Multilingual produced unintelligible audio for en/ru/tr. Swapped
to XTTS-v2 (Coqui, via the community `coqui-tts` fork) behind the same
`VoiceProvider` seam. Proto and Rust untouched.

- `tts-worker/pyproject.toml` — dropped `chatterbox-tts` + the `setuptools<81`
  pin; added `coqui-tts[codec]>=0.24`, `torch>=2.1`, `torchaudio>=2.1`,
  `transformers>=4.57,<5` (transformers 5.x removed `isin_mps_friendly`
  which `coqui-tts`'s tortoise layer still imports).
- `tts-worker/src/tts_worker/model.py` — rewritten around `TTS(...)`.
  Loads XTTS-v2 once, picks a stable built-in speaker (`"Ana Florence"` or
  first available) so nothing extra ships in the repo, warmup preserved.
- `tts-worker/src/tts_worker/service.py` — uses the new `LoadedModel`;
  chunk contract (32 KB PCM16 mono, `sample_rate` on chunk 0, `is_final`
  on last) unchanged.
- `.env.example` — documented `COQUI_TOS_AGREED=1`, required by
  `coqui-tts` to load XTTS-v2.

**Sanity run on CPU (Apple Silicon):** three `.wav`s produced end to end.

| Lang | Audio produced | Wall time |
|---|---|---|
| en | 5.24 s | ~8.7 s |
| ru | 2.92 s | ~4.3 s |
| tr | 3.15 s | ~5.1 s |

~1.5× realtime on CPU. Cold start also downloads ~1.8 GB of weights.

**Open flags (not addressed here — decisions):**
- Owner needs to *listen* to the three `.wav`s to judge intelligibility.
- **Licensing regression:** XTTS-v2 is CPML (non-commercial); Chatterbox
  was MIT. Track B on XTTS-v2 can't stay past prototype without a paid
  arrangement or a swap.

---

## Phase 2 — gRPC bridge + Chatterbox TTS (2026-08-12, uncommitted)

First working voice pipeline. Rust asks Python to synthesize, Python
returns streamed PCM16 audio. Provider-agnostic so the Uzbek Track A
model plugs in later without callers changing.

- `proto/tts.proto` — provider-agnostic server-streaming `Tts.Synthesize`.
- `tts-worker/` (new) — Python gRPC server, `uv`/`ruff`, loads the model
  once, warmup on boot, serial inference, binds `127.0.0.1:50051`,
  watermarking left on.
- `crates/inference-client/` (new) — `VoiceProvider` trait + a
  Chatterbox-backed impl over tonic gRPC. No `unwrap`; failures come
  back as `CoreError`.
- `crates/inference-client/examples/synth.rs` (new) — CLI demo:
  connects, verifies sequences + `is_final`, writes RIFF/PCM16 WAV.
- `crates/miralas-core::Config` — added optional `tts_worker_addr`;
  empty falls back to localhost default.
- `.env.example` — added `TTS_WORKER_ADDR`.

**Bugs fixed in this phase (during bring-up):**
1. `ChatterboxMultilingualTTS.from_pretrained(t3_model="v3")` — invalid
   kwarg; upstream only accepts `device`. Removed.
2. `perth.PerthImplicitWatermarker` silently `None` because its
   `pkg_resources` import fails on Py 3.12 (setuptools 81 split it out).
   Pinned `setuptools>=68,<81`.
3. `python -m tts_worker.generate` failed on a fresh checkout because
   `__init__.py` eagerly imported `server` → `pb` (which doesn't exist
   until generate runs). Made `main` a lazy function.
4. Empty `TTS_WORKER_ADDR=` in `.env` would break `Endpoint::from_shared`
   instead of falling back. `ChatterboxProvider::connect` now filters
   blank overrides / env values.

**Phase-2 finding:** plumbing works end to end, but Chatterbox audio
quality is unusable for en/ru/tr on CPU — motivated Phase 2.1.

---

## Phase 1 — Auth + backend/frontend wiring (before 2026-08-12)

Landed in commit `856e035` and earlier. Not walked here per-file — see
git history. Highlights:

- Rust backend (`crates/api`) up with Google OAuth flow and JWT
  session cookies (`crates/api/src/auth/*`).
- Postgres schema (migrations under `migrations/`) + `sqlx` wiring
  through `crates/miralas-core`.
- Next.js console UI (`console-ui/`) migrated to pnpm, shadcn/ui
  sidebar wired to a live session from the Rust backend.
- Login → session cookie → authenticated call end-to-end verified.

---

## Not yet built

- Track A (Uzbek licensed voice) — trait seam is in place; slots in as
  another `VoiceProvider` implementation.
- Donation event ingestion, stream/overlay page (Phase 3).
- `/generate` dashboard UI.
- Billing / tiers.
- GPU deployment (target: Runpod hourly, either XTTS-v2 for speed or
  Qwen3-TTS for quality; decision blocked on Owner listening to the
  Phase 2.1 samples).
