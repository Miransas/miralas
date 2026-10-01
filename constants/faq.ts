export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is Miralas TTS and how does it work?",
    answer:
      "Miralas TTS is an AI-powered text-to-speech platform that converts written text into natural, human-like speech. Our neural network models are trained on thousands of hours of human speech, allowing them to capture subtle nuances like intonation, emotion, and pacing. Simply send text via our API or web interface, and receive high-quality audio in seconds.",
  },
  {
    question: "How do I get started with the API?",
    answer:
      "Getting started is easy. Sign up for a free account at console.miralas.com, and you will instantly receive $25 in API credit. Generate an API key from your dashboard, install one of our official SDKs (Node.js, Python, Go, or Rust), and make your first request. Our documentation includes quick-start guides and copy-paste code examples.",
  },
  {
    question: "What is the pricing model? Do I need a subscription?",
    answer:
      "Miralas uses a pay-as-you-go model with no monthly subscriptions or hidden fees. You start with a $25 credit, and usage is billed per character synthesized. Volume discounts apply automatically as your usage grows. You can top up your balance anytime. Enterprise customers can opt for custom packages with dedicated infrastructure.",
  },
  {
    question: "How many languages and voices are supported?",
    answer:
      "We currently support 29+ languages with native accent accuracy. Our voice library includes 100+ distinct voices ranging from narrators and news anchors to energetic presenters and soft ASMR-style whispers. You can also clone your own voice with just 30 seconds of sample audio using our Voice Cloning feature.",
  },
  {
    question: "What makes Miralas different from other TTS providers?",
    answer:
      "Three things set us apart: (1) Our Rust-powered backend with gRPC streaming delivers sub-50ms latency — the fastest in the industry. (2) Our voice quality is trained on proprietary datasets for unmatched naturalness and emotional range. (3) Our pay-as-you-go model with $25 starting credit means you can start building immediately without committing to a subscription.",
  },
  {
    question: "Can I use Miralas for live streaming and real-time applications?",
    answer:
      "Absolutely. Our gRPC bidirectional streaming API is specifically designed for real-time use cases like live donation reads, IVR systems, and interactive voice agents. With an average latency of under 50ms, audio is generated and delivered almost instantaneously, making it perfect for time-sensitive applications.",
  },
  {
    question: "Is my data secure? What about voice cloning privacy?",
    answer:
      "Security is our top priority. All API requests use TLS 1.3 encryption. API keys are scoped and revocable. For voice cloning, we require explicit consent verification and store voice embeddings using AES-256 encryption. We are SOC 2 Type II compliant and never use your cloned voices for training or any purpose other than your own API requests.",
  },
  {
    question: "Do you offer support for developers and enterprises?",
    answer:
      "Yes. All users have access to our comprehensive documentation, community Discord, and GitHub examples. Pro plan users receive email support with a 48-hour response guarantee. Enterprise customers get a dedicated Slack channel, quarterly architecture reviews, and a 99.99% uptime SLA with dedicated support engineers.",
  },
];
