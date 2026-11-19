export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is Miralas?",
    answer: "Miralas is a voice platform by Miransas, built on Chatterbox Multilingual text-to-speech with Rust-backed infrastructure. Voice cloning workflows, conversational experiences and native Uzbek speech are still being developed.",
  },
  {
    question: "Can I use it today?",
    answer: "This website introduces the technology and product direction. Public Console and API access are not confirmed. Check the development updates for release announcements; model support alone does not mean a public product is available.",
  },
  {
    question: "Which languages does the engine support?",
    answer: "The current Chatterbox multilingual engine supports 23 languages. The language discovery section lists them from the upstream implementation. This is model coverage, not a promise of a published ready-made voice for every language.",
  },
  {
    question: "Is Uzbek speech available?",
    answer: "Uzbek Speech — In Development. We're working toward native Uzbek speech capabilities through research, data collection and model evaluation. Uzbek is not part of the current 23-language engine coverage and is not available for production inference.",
  },
  {
    question: "What is the status of voice cloning and the voice catalog?",
    answer: "Chatterbox supports reference-based voice generation. Miralas is developing the product workflow around it. Voice Catalog infrastructure is implemented, but published curated voice seeds have not been verified. Only use reference recordings you have permission to use.",
  },
  {
    question: "Is there a developer API?",
    answer: "The engineering foundation uses a Rust API and Python inference worker connected through gRPC. Public endpoints, SDKs, access terms and pricing will be documented as they are released. Public API access is not confirmed.",
  },
  {
    question: "Can I use Miralas for real-time apps?",
    answer: "Real-time synthesis and production latency are not validated public capabilities. The engineering baseline validates 24 kHz mono PCM16 output. Docker and CUDA benchmark preparation is complete, while real NVIDIA GPU benchmarks remain pending.",
  },
  {
    question: "How much will it cost?",
    answer: "Pricing and billing are being developed. Public rates and allowances have not been announced. The pricing page describes the proposed direction without offering a purchasable plan.",
  },
];
