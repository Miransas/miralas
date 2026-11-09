import type { AgentProfile, ApiService, BillingCycle, ComparisonGroup, Money, PlanId, ProfileId, Publication, StudioPlan, UsageRate } from "./types";

// Update status to "published" only after the corresponding business terms are approved.
const draft = <T,>(): Publication<T> => ({ status: "draft", value: null });
const prices = (): Record<BillingCycle, Publication<Money>> => ({ monthly: draft(), yearly: draft() });
const studioRow = (label: string, explanation?: string) => ({ label, explanation, values: { starter: draft<string>(), creator: draft<string>(), pro: draft<string>() } });
const agentRow = (label: string) => ({ label, values: { prototype: draft<string>(), production: draft<string>(), scale: draft<string>() } });

export const studioPlans: StudioPlan[] = [
  { id: "starter", name: "Starter", description: "For exploring voice AI.", prices: prices() },
  { id: "creator", name: "Creator", description: "For individuals creating content regularly.", prices: prices() },
  { id: "pro", name: "Studio Pro", description: "For professionals and teams with bigger ambitions.", prices: prices() },
];
export const studioComparison: ComparisonGroup<PlanId>[] = [
  { title: "Text to speech", rows: [studioRow("Monthly characters", "The amount of text included in a billing period."), studioRow("Generation limits"), studioRow("Available models"), studioRow("Supported languages"), studioRow("Characters per request")] },
  { title: "Speech to text", rows: [studioRow("Monthly transcription minutes"), studioRow("Maximum upload size"), studioRow("Supported audio formats"), studioRow("Maximum audio duration"), studioRow("Language support")] },
  { title: "Voice cloning", rows: [studioRow("Saved custom voices"), studioRow("Voice cloning availability"), studioRow("Reference audio duration"), studioRow("Supported upload formats"), studioRow("Voice storage limits")] },
  { title: "Audio export", rows: [studioRow("MP3"), studioRow("WAV"), studioRow("Audio quality options"), studioRow("Sample rate"), studioRow("Download limits"), studioRow("Commercial usage rights")] },
  { title: "Platform", rows: [studioRow("Concurrent generations"), studioRow("History retention"), studioRow("Storage allowance"), studioRow("Priority processing"), studioRow("Support options")] },
];
export const apiServices: ApiService[] = [
  { id: "tts", name: "Text to speech", description: "Generate spoken audio from text.", availability: "internal testing", metric: draft(), rate: draft() },
  { id: "stt", name: "Speech to text", description: "Turn audio into text.", availability: "planned", metric: draft(), rate: draft() },
  { id: "clone", name: "Voice cloning", description: "Create a voice identity from reference audio.", availability: "planned", metric: draft(), rate: draft() },
  { id: "speech", name: "Speech to speech", description: "Explore voice transformation workflows.", availability: "planned", metric: draft(), rate: draft() },
  { id: "realtime", name: "Real-time voice", description: "Build responsive voice experiences.", availability: "planned", metric: draft(), rate: draft() },
];
export const topUpAmounts: Publication<Money[]> = draft();
export const agentProfiles: AgentProfile[] = [
  { id: "prototype", name: "Prototype", description: "For building and testing conversational experiences.", focus: "Explore an idea" },
  { id: "production", name: "Production", description: "For deploying voice agents into real workflows.", focus: "Build for your workflow" },
  { id: "scale", name: "Scale", description: "For higher-volume deployments and customized infrastructure.", focus: "Plan for growth" },
];
export const agentComparison: ComparisonGroup<ProfileId>[] = [{ title: "Capabilities", rows: [agentRow("Concurrent sessions"), agentRow("Session duration limits"), agentRow("Model availability"), agentRow("Voice selection"), agentRow("Tool calling"), agentRow("Webhook support"), agentRow("Conversation logs"), agentRow("Analytics"), agentRow("Deployment environments"), agentRow("Support level")] }];
// Publish an all-inclusive rate only when the complete cost and its billing unit are confirmed.
export const agentRate: Publication<UsageRate> = draft();
// Reserved integration boundaries; never presented as established charges.
export const agentAdditionalRates = { model: draft<UsageRate>(), telephony: draft<UsageRate>(), tools: draft<UsageRate>() };

export const pricingFaq = [
  { question: "How does API prepaid billing work?", answer: "A prepaid balance is being considered: funds would be added before usage is deducted. The final billing flow has not been announced." },
  { question: "What happens when my balance reaches zero?", answer: "Low-balance notifications and request handling are still being defined. We will share the policy when billing is available." },
  { question: "Are Studio and API usage billed separately?", answer: "Studio subscriptions and API usage are being designed as distinct experiences. Their final billing relationship has not been announced." },
  { question: "Can I use one balance across multiple APIs?", answer: "A shared prepaid balance is a proposed direction. Eligible services and balance behavior have not yet been confirmed." },
  { question: "How is voice generation usage calculated?", answer: "The billing unit and rates for voice generation are not yet published." },
  { question: "How is transcription usage calculated?", answer: "Transcription availability, billing units and rates have not yet been announced." },
  { question: "How is voice agent usage measured?", answer: "Conversation minutes are being considered as a possible unit. The final measurement and any additional charges are not yet confirmed." },
  { question: "Can I change my Studio plan?", answer: "Plan changes and subscription terms will be shared when Studio pricing is available." },
  { question: "Are unused credits carried forward?", answer: "Credit expiry, carry-forward and refund policies have not yet been announced." },
  { question: "Is there a free tier?", answer: "Plans and their allowances are still being finalized. A free tier has not been announced." },
  { question: "What audio formats and download qualities are supported?", answer: "Supported formats, quality options and limits will be published when confirmed." },
];
