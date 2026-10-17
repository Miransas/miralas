export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is Miralas?",
    answer:
      "Miralas is a voice platform for text-to-speech, voice cloning and speech-to-speech, built with Uzbek as a first-class language. It is built by Miransas and is currently in development.",
  },
  {
    question: "Can I use it today?",
    answer:
      "Not yet. The console is being tested internally and is not open to the public. We will announce public access in the changelog.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "In our internal builds, text-to-speech works in English, Turkish and Russian. Uzbek is the language we are building for first. Model training has started, and we will say so in the changelog when a voice is ready.",
  },
  {
    question: "How will voice cloning work?",
    answer:
      "Voice cloning is in development. Voices in the Miralas library are recorded with the written consent of the voice owner, who is paid directly. We will publish the details for cloning your own voice before it launches.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing is not final and is not published yet. We will publish it before public access opens.",
  },
  {
    question: "Is there an API?",
    answer:
      "A developer API is planned. We will not publish endpoints or SDKs until they exist. Follow the changelog for progress.",
  },
  {
    question: "Can I use it for live streaming or real-time apps?",
    answer:
      "Not today. Speech-to-speech is in development, and we will publish latency numbers only after we have measured them.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Our privacy policy is at privacy.miransas.com. We only describe security practices that we have actually implemented.",
  },
];