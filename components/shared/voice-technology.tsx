import Link from "next/link";
import { ScrollReveal, WordReveal } from "@/components/motion/reveal";
import { MODEL_LANGUAGES, VOICE_TECHNOLOGY } from "@/lib/voice-technology";

const wrap = "mx-auto max-w-7xl px-6 lg:px-12";
const eyebrow = "text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground";
const heading = "mt-5 text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl";

export function VoiceTechnology() {
  const capabilities = [
    ["Multilingual text-to-speech", "Turn written content into speech with Chatterbox Multilingual, the active engine behind Miralas."],
    [`${MODEL_LANGUAGES.length} model-supported languages`, "Explore the engine’s language coverage, with Uzbek speech on a separate research path."],
    ["Rust-backed voice infrastructure", "A Rust API connects to a Python inference worker over gRPC, keeping application and model work separate."],
    ["An intentional audio pipeline", "A validated 24 kHz mono PCM16 output format gives the engineering work a clear audio foundation."],
  ];
  return (
    <section id="technology" aria-labelledby="technology-heading" className="scroll-mt-24 bg-card py-24 sm:py-32">
      <div className={wrap}>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <ScrollReveal>
            <p className={eyebrow}>The voice foundation</p>
            <h2 id="technology-heading" className={heading}><WordReveal text="Voice technology, built with intention." /></h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">Good voice experiences begin with a clear foundation. We’re building on an open speech model and a focused infrastructure layer, while being open about what still needs validation.</p>
            <Link href="/product/models" className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-8">Meet the active engine</Link>
          </ScrollReveal>
          <div className="border-t border-border">
            {capabilities.map(([title, description], index) => <ScrollReveal key={title} delay={index * 0.04} className="border-b border-border py-7"><h3 className="text-xl font-medium tracking-tight">{title}</h3><p className="mt-3 text-base leading-8 text-muted-foreground">{description}</p></ScrollReveal>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EngineeredAudio() {
  return (
    <section aria-labelledby="audio-heading" className="bg-[#111111] py-24 text-white sm:py-32">
      <div className={`${wrap} grid gap-14 lg:grid-cols-2 lg:gap-24`}>
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">Engineered for real audio</p>
          <h2 id="audio-heading" className={heading}><WordReveal text="Care in every part of the signal." /></h2>
          <p className="mt-7 text-base leading-8 text-white/65">From an API request to a waveform, each stage has a purpose. The current engineering baseline validates the output format and model assets. NVIDIA GPU benchmarks are still pending.</p>
          <Link href="/product/api" className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-8">Explore the API architecture</Link>
        </ScrollReveal>
        <ScrollReveal className="min-w-0 rounded-4xl bg-white/[0.045] p-7 sm:p-10">
          <div aria-hidden="true" className="flex h-24 items-center gap-1 overflow-hidden">
            {Array.from({ length: 48 }, (_, index) => <span key={index} className="min-w-0 flex-1 rounded-full bg-white/65" style={{ height: `${12 + Math.abs(Math.sin(index * 0.47) * Math.cos(index * 0.17)) * 80}%` }} />)}
          </div>
          <p className="mt-4 text-sm text-white/50">Signal illustration</p>
          <dl className="mt-8 divide-y divide-white/10">
            {[["Audio output", "24 kHz · Mono · PCM16"], ["Application / inference", "Rust + Python"], ["Service connection", "gRPC"], ["Model assets", "Approved multilingual checkpoint"]].map(([term, value]) => <div key={term} className="flex flex-wrap justify-between gap-2 py-4 text-sm"><dt className="text-white/60">{term}</dt><dd className="font-medium">{value}</dd></div>)}
          </dl>
          <p className="mt-5 text-sm leading-7 text-white/60">Output format is an engineering capability, not a latency or scalability benchmark. <a href={VOICE_TECHNOLOGY.audioSource} className="text-white underline underline-offset-4">Model sample-rate source</a>.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function WhatsNext() {
  const research = [
    ["Uzbek speech research", "Research, data collection and model evaluation toward native Uzbek speech. Production inference is not available."],
    ["An expanded voice catalog", "Voice Catalog infrastructure is implemented. Curated public voice releases are still ahead."],
    ["GPU inference validation", "Docker and CUDA benchmark preparation is complete. Real NVIDIA GPU measurements remain pending."],
    ["Future model exploration", "Qwen, CosyVoice and Miransas-native models are long-term research plans. They are not integrated into the current engine."],
  ];
  return (
    <section id="research" aria-labelledby="research-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className={wrap}>
        <ScrollReveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><p className={eyebrow}>What’s next</p><h2 id="research-heading" className={heading}><WordReveal text="A thoughtful path forward." /></h2></div>
          <p className="max-w-lg text-base leading-8 text-muted-foreground lg:justify-self-end">A roadmap shaped by research and evaluation. These are development directions, with no promised release dates.</p>
        </ScrollReveal>
        <div className="mt-14 border-t border-border">
          {research.map(([title, description], index) => <ScrollReveal key={title} delay={index * 0.04} className="grid gap-4 border-b border-border py-8 md:grid-cols-2 md:gap-16"><h3 className="text-2xl font-medium tracking-tight">{title}</h3><p className="max-w-xl text-base leading-8 text-muted-foreground">{description}</p></ScrollReveal>)}
        </div>
        <Link href="/resources/changelog" className="mt-9 inline-flex min-h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background">Read development updates</Link>
      </div>
    </section>
  );
}
