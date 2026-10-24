import {
  Lock,
  Mic,
  Rocket,
  UserRound,
  Volume2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Status = "Internal testing" | "In development" | "Planned";

export type Article = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
  /** true iken sayfada görünmez. İddia gerçek olunca false yap. */
  hidden?: boolean;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  status?: Status;
  articles: Article[];
};

export const TOPICS: Topic[] = [
  {
    id: "getting-started",
    title: "Getting started",
    summary: "What Miralas is and when you can use it.",
    icon: Rocket,
    status: "In development",
    articles: [
      {
        question: "What is Miralas?",
        answer:
          "Miralas is a voice platform for text-to-speech, voice cloning and speech-to-speech, built with Uzbek as a first-class language. It is built by Miransas and is currently in development.",
      },
      {
        question: "Can I use Miralas today?",
        answer:
          "Not yet. The console is being tested internally and is not open to the public. We will announce public access in the changelog.",
        link: { label: "Read the changelog", href: "/resources/changelog" },
      },
      {
        question: "How will I know when it opens?",
        answer:
          "Every release is published in the changelog, including what is working and what is still in progress.",
        link: { label: "Read the changelog", href: "/resources/changelog" },
      },
    ],
  },
  {
    id: "account",
    title: "Account & sign-in",
    summary: "Signing up and logging in.",
    icon: UserRound,
    status: "In development",
    articles: [
      {
        question: "Where do I sign in?",
        answer:
          "Sign-in is not open yet. The login and sign-up buttons on this site only show a notice. When the console opens, we will announce it in the changelog and link it from here.",
      },
      {
        question: "Which sign-in methods will be available?",
        answer:
          "We are planning sign-in with email and with Google. This may change before launch.",
      },
      {
        question: "Do I need an account to read the documentation?",
        answer: "No. The documentation and this Help Center are public.",
        link: { label: "Open the docs", href: "/docs" },
      },
    ],
  },
  {
    id: "text-to-speech",
    title: "Text-to-speech",
    summary: "Languages, limits and usage.",
    icon: Volume2,
    status: "Internal testing",
    articles: [
      {
        question: "Which languages are supported?",
        answer:
          "In our internal builds, text-to-speech works in English, Turkish and Russian. Uzbek is the language we are building for first, and model training has started.",
      },
      {
        question: "Is there a character or usage limit?",
        answer:
          "Limits and pricing are not final. We will publish them before public access opens.",
      },
      {
        question: "Can I use the generated audio commercially?",
        answer:
          "The terms are not published yet. They will be published before public access opens.",
      },
    ],
  },
  {
    id: "voice-cloning",
    title: "Voice cloning & consent",
    summary: "How voices are made and who they belong to.",
    icon: Mic,
    status: "In development",
    articles: [
      {
        question: "Can I clone my own voice?",
        answer:
          "Voice cloning is in development. We will publish how it works, including how we verify that a voice belongs to you, before it launches.",
      },
      {
        question: "Can I clone someone else's voice?",
        answer:
          "No. We only create voices with the written consent of the voice owner.",
      },
      {
        question: "How are the voices in the library made?",
        answer:
          "They are recorded with the consent of the voice owner, who is paid directly.",
      },
    ],
  },
  {
    id: "speech-to-speech",
    title: "Speech-to-speech & agents",
    summary: "Voice conversion, the voice agent and the API.",
    icon: Workflow,
    status: "In development",
    articles: [
      {
        question: "What is speech-to-speech?",
        answer:
          "You record a line and Miralas changes the voice while keeping your timing and emphasis. It is in development.",
      },
      {
        question: "What is the voice agent?",
        answer:
          "A voice agent that answers in your language and hands the conversation to a person when it cannot help. It is in early development.",
      },
      {
        question: "Is there an API?",
        answer:
          "A developer API is planned. We will not publish endpoints or SDKs until they exist.",
        link: { label: "Follow progress", href: "/resources/changelog" },
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & security",
    summary: "Policies, cookies and your data.",
    icon: Lock,
    articles: [
      {
        question: "Where is the privacy policy?",
        answer: "Our privacy policy and terms are at privacy.miransas.com.",
        link: { label: "Open privacy.miransas.com", href: "https://privacy.miransas.com" },
      },
      {
        // Yalnızca onay kapısı (proxy, /api/consent, track) canlıyken yayınla.
        hidden: true,
        question: "Does this site use cookies?",
        answer:
          "Only optional analytics cookies, and only after you accept them in the banner. If you reject, they are not stored. You can change your choice at any time from Cookie settings in the footer.",
      },
      {
        question: "Where can I find out how my data is handled?",
        answer:
          "The privacy policy explains what we collect, why, and what your rights are. We only describe practices that we have actually implemented.",
        link: { label: "Open privacy.miransas.com", href: "https://privacy.miransas.com" },
      },
    ],
  },
];