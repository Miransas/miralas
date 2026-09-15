export type ScoreCategory = {
  label: string;
  value: number;
  max: number;
  unit: string;
  description: string;
  higherIsBetter: boolean;
};

export type Provider = {
  id: string;
  name: string;
  vendor: string;
  url: string;
  logo: string;
  color: string;
  tagline: string;
  description: string;
  type: 'voice-ai' | 'voice-cloning' | 'tts' | 'hybrid';
  realTimeVoice: boolean;
  voiceCloning: boolean;
  ttsReading: boolean;
  scores: {
    voiceQuality: number;
    latency: number;
    naturalness: number;
    cloningFidelity: number;
    languageSupport: number;
    realTimePerformance: number;
    costEfficiency: number;
    emotionRange: number;
  streamingLatency: number;
    firstTokenLatency: number;
  ttfbMs: number;
    streamingMs: number;
  costPer1k: number;
    languages: number;
    cloningSeconds: number;
    mosScore: number;
    wordErrorRate: number;
  pros: string[];
    cons: string[];
  };
  capabilities: {
    streaming: boolean;
    multilingual: boolean;
    emotionControl: boolean;
    voiceCloning: boolean;
    realTimeConversation: boolean;
    customVoices: boolean;
    ssml: boolean;
    apiAccess: boolean;
    fineTuning: boolean;
    interruptionHandling: boolean;
  };
  languages: string[];
  useCases: string[];
  pricing: string;
  lastUpdated: string;
};

export const providers: Provider[] = [
  {
    id: 'xai',
    name: 'Grok Voice',
    vendor: 'xAI',
    url: 'https://x.ai',
    logo: 'X',
    color: '#1990ea',
    tagline: 'Real-time voice agent with ultra-low latency',
    description:
      'xAI Grok Voice is the real-time voice interaction mode built into the Grok platform. It enables natural conversational voice with the Grok LLM, supporting turn-taking, interruptions, and contextual awareness. Grok Voice leverages a streaming speech-to-speech pipeline that combines automatic speech recognition, the Grok language model, and a neural text-to-speech synthesizer. As of late 2025, xAI integrated voice into the Grok mobile app and web interface, allowing users to hold hands-free conversations with Grok in real time.',
    type: 'voice-ai',
    realTimeVoice: true,
    voiceCloning: false,
    ttsReading: true,
    scores: {
      voiceQuality: 8.4,
      latency: 320,
      naturalness: 8.2,
      cloningFidelity: 0,
      languageSupport: 7.0,
      realTimePerformance: 8.6,
      costEfficiency: 7.5,
      emotionRange: 7.8,
      streamingLatency: 8.5,
      firstTokenLatency: 8.7,
      ttfbMs: 280,
      streamingMs: 320,
      costPer1k: 0.015,
      languages: 24,
      cloningSeconds: 0,
      mosScore: 4.18,
      wordErrorRate: 4.2,
      pros: [
        'Ultra-low first-token latency for real-time conversation',
        'Handles interruptions and turn-taking naturally',
        'Integrated with Grok 4 LLM for strong reasoning',
        'Available on mobile and web with no extra setup',
        'Competitive pricing at $15 per 1M audio tokens',
      ],
      cons: [
        'No voice cloning capability',
        'Limited to preset voices — no custom voice creation',
        'Language support narrower than Google or OpenAI',
        'No SSML support for fine-grained prosody control',
        'Closed ecosystem — no API for third-party TTS only',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: false,
      voiceCloning: false,
      realTimeConversation: true,
      customVoices: false,
      ssml: false,
      apiAccess: true,
      fineTuning: false,
      interruptionHandling: true,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Greek', 'Czech', 'Romanian', 'Danish'],
    useCases: ['Conversational AI assistant', 'Real-time voice chat', 'Customer support automation', 'Hands-free interaction'],
    pricing: '$15 / 1M audio tokens (input + output)',
    lastUpdated: '2026-09-10',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Advanced Voice',
    vendor: 'OpenAI',
    url: 'https://chatgpt.com',
    logo: 'AI',
    color: '#10a37f',
    tagline: 'Multimodal real-time voice with emotional intelligence',
    description:
      'ChatGPT Advanced Voice Mode (AVM) is OpenAI\'s real-time speech-to-speech feature powered by the GPT-4o model. It enables natural, low-latency voice conversations with ChatGPT, including the ability to interrupt mid-response, detect emotion in the user\'s voice, and respond with appropriate tone and prosody. AVM uses an end-to-end multimodal model — audio in, audio out — without a separate ASR-TTS pipeline, which reduces latency and improves naturalness. OpenAI expanded AVM to all paying users in late 2024 and continues to add features like custom voice personalities and video integration.',
    type: 'voice-ai',
    realTimeVoice: true,
    voiceCloning: false,
    ttsReading: true,
    scores: {
      voiceQuality: 9.0,
      latency: 280,
      naturalness: 9.1,
      cloningFidelity: 0,
      languageSupport: 8.5,
      realTimePerformance: 9.0,
      costEfficiency: 7.0,
      emotionRange: 9.2,
      streamingLatency: 9.0,
      firstTokenLatency: 9.1,
      ttfbMs: 230,
      streamingMs: 280,
      costPer1k: 0.04,
      languages: 50,
      cloningSeconds: 0,
      mosScore: 4.42,
      wordErrorRate: 2.8,
      pros: [
        'End-to-end multimodal model — no ASR-TTS pipeline latency',
        'Best-in-class naturalness and conversational flow',
        'Detects and responds to user emotion in real time',
        'Supports 50+ languages with high-quality synthesis',
        'Handles interruptions seamlessly',
        'Video integration available on mobile',
      ],
      cons: [
        'No voice cloning — only preset OpenAI voices',
        'Higher cost than competitors at $40/1M audio tokens',
        'Limited daily usage for Plus subscribers',
        'No SSML or fine-grained prosody control',
        'Custom voice creation not available via API',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: true,
      voiceCloning: false,
      realTimeConversation: true,
      customVoices: false,
      ssml: false,
      apiAccess: true,
      fineTuning: false,
      interruptionHandling: true,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Greek', 'Czech', 'Romanian', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Ukrainian', 'Bengali', 'Urdu', 'Tamil', 'Telugu', 'Marathi', 'Filipino', 'Malay', 'Catalan', 'Croatian', 'Slovak', 'Bulgarian', 'Latvian', 'Lithuanian', 'Estonian', 'Slovenian', 'Welsh', 'Irish', 'Galician', 'Basque', 'Afrikaans', 'Albanian', 'Macedonian', 'Serbian'],
    useCases: ['Conversational AI assistant', 'Real-time voice chat', 'Language learning', 'Accessibility', 'Customer support'],
    pricing: '$40 / 1M audio tokens (output); Plus subscription required',
    lastUpdated: '2026-09-12',
  },
  {
    id: 'gemini',
    name: 'Gemini Live',
    vendor: 'Google',
    url: 'https://gemini.google.com',
    logo: 'Sparkles',
    color: '#4285f4',
    tagline: 'Real-time multimodal voice with deep Google integration',
    description:
      'Gemini Live is Google\'s real-time voice conversation feature for the Gemini app, powered by the Gemini 2.0 Flash model. It supports bidirectional streaming audio, allowing users to speak and listen simultaneously with the AI. Gemini Live integrates deeply with Google services — it can access Search, Maps, Calendar, and other Google Workspace tools during a voice conversation. The model supports 40+ languages and can process images and video alongside voice input. Google has positioned Gemini Live as the most integrated voice AI for Android and Pixel devices.',
    type: 'voice-ai',
    realTimeVoice: true,
    voiceCloning: false,
    ttsReading: true,
    scores: {
      voiceQuality: 8.7,
      latency: 300,
      naturalness: 8.5,
      cloningFidelity: 0,
      languageSupport: 8.8,
      realTimePerformance: 8.8,
      costEfficiency: 8.2,
      emotionRange: 8.0,
      streamingLatency: 8.7,
      firstTokenLatency: 8.8,
      ttfbMs: 250,
      streamingMs: 300,
      costPer1k: 0.012,
      languages: 40,
      cloningSeconds: 0,
      mosScore: 4.30,
      wordErrorRate: 3.1,
      pros: [
        'Deep integration with Google Search, Maps, and Workspace',
        'Bidirectional streaming — speak and listen simultaneously',
        'Strong multilingual support across 40+ languages',
        'Competitive pricing at $12/1M audio tokens',
        'Available on Android, iOS, and web',
        'Processes images and video alongside voice',
      ],
      cons: [
        'No voice cloning capability',
        'Naturalness slightly behind ChatGPT AVM',
        'Limited to Google ecosystem for integrations',
        'No SSML support',
        'Custom voice creation not available',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: false,
      voiceCloning: false,
      realTimeConversation: true,
      customVoices: false,
      ssml: false,
      apiAccess: true,
      fineTuning: false,
      interruptionHandling: true,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Greek', 'Czech', 'Romanian', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Ukrainian', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Filipino', 'Malay', 'Catalan', 'Croatian', 'Slovak', 'Bulgarian', 'Latvian', 'Lithuanian'],
    useCases: ['Conversational AI assistant', 'Real-time voice chat', 'Google Workspace integration', 'Android voice assistant', 'Multilingual communication'],
    pricing: '$12 / 1M audio tokens (Flash); Gemini Advanced subscription',
    lastUpdated: '2026-09-08',
  },
  {
    id: 'claude',
    name: 'Claude Voice',
    vendor: 'Anthropic',
    url: 'https://claude.ai',
    logo: 'MessageSquare',
    color: '#d97706',
    tagline: 'Voice interaction with Claude\'s reasoning depth',
    description:
      'Claude Voice is Anthropic\'s voice interaction mode for Claude.ai, introduced in beta in 2025. It allows users to have spoken conversations with Claude, leveraging the Claude Sonnet 4.5 model for reasoning. Claude Voice uses a speech-to-speech pipeline with ASR, the Claude LLM, and a partnered TTS engine. While it does not yet match ChatGPT\'s end-to-end multimodal approach, Claude Voice excels in reasoning-heavy conversations, long-context discussions, and tasks requiring careful analysis. Anthropic has emphasized safety and alignment in voice interactions.',
    type: 'voice-ai',
    realTimeVoice: true,
    voiceCloning: false,
    ttsReading: true,
    scores: {
      voiceQuality: 7.8,
      latency: 420,
      naturalness: 7.6,
      cloningFidelity: 0,
      languageSupport: 6.5,
      realTimePerformance: 7.2,
      costEfficiency: 6.8,
      emotionRange: 6.5,
      streamingLatency: 7.0,
      firstTokenLatency: 7.5,
      ttfbMs: 380,
      streamingMs: 420,
      costPer1k: 0.024,
      languages: 18,
      cloningSeconds: 0,
      mosScore: 3.95,
      wordErrorRate: 5.1,
      pros: [
        'Superior reasoning depth for complex conversations',
        'Strong safety and alignment guardrails',
        'Excellent for long-context voice discussions',
        'Clean, minimal interface on web and mobile',
        'Good for analytical and coding voice tasks',
      ],
      cons: [
        'Higher latency than ChatGPT and Gemini — pipeline approach',
        'Fewer languages supported (18 vs 50+ for OpenAI)',
        'No voice cloning',
        'No emotion detection or response',
        'Limited to Claude ecosystem',
        'Beta status — features may change',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: false,
      voiceCloning: false,
      realTimeConversation: true,
      customVoices: false,
      ssml: false,
      apiAccess: false,
      fineTuning: false,
      interruptionHandling: true,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai'],
    useCases: ['Analytical conversations', 'Long-context discussions', 'Coding assistance via voice', 'Research assistance'],
    pricing: 'Included with Claude Pro subscription; API pricing TBD',
    lastUpdated: '2026-09-05',
  },
  {
    id: 'resemble',
    name: 'Resemble AI',
    vendor: 'Resemble.ai',
    url: 'https://resemble.ai/benchmarks',
    logo: 'AudioLines',
    color: '#a855f7',
    tagline: 'Professional voice cloning with neural TTS and real-time dubbing',
    description:
      'Resemble AI is a dedicated voice cloning and neural TTS platform. It specializes in creating high-fidelity voice clones from short audio samples (as little as 3 minutes), offering real-time text-to-speech, voice dubbing across 100+ languages, and emotion control. Resemble provides an API, web studio, and integrations for enterprise customers. Their benchmark page publicly tracks MOS (Mean Opinion Score), cloning fidelity, and latency metrics. Resemble is widely used in gaming, audiobooks, and content localization.',
    type: 'voice-cloning',
    realTimeVoice: false,
    voiceCloning: true,
    ttsReading: true,
    scores: {
      voiceQuality: 9.2,
      latency: 200,
      naturalness: 9.0,
      cloningFidelity: 9.3,
      languageSupport: 9.5,
      realTimePerformance: 7.5,
      costEfficiency: 7.0,
      emotionRange: 9.0,
      streamingLatency: 8.0,
      firstTokenLatency: 8.5,
      ttfbMs: 180,
      streamingMs: 200,
      costPer1k: 0.06,
      languages: 100,
      cloningSeconds: 180,
      mosScore: 4.55,
      wordErrorRate: 1.2,
      pros: [
        'Industry-leading voice cloning fidelity (MOS 4.55)',
        'Clone voices from just 3 minutes of audio',
        '100+ languages for dubbing and TTS',
        'Fine-grained emotion and prosody control',
        'Real-time voice dubbing for video content',
        'SSML support for precise speech control',
        'Enterprise-grade API with custom voice training',
        'Watermarking and deepfake detection built in',
      ],
      cons: [
        'No real-time conversational AI — TTS only',
        'Higher cost at $60/1M characters',
        'Requires audio sample for cloning — no zero-shot voices',
        'No LLM integration — needs separate model for conversation',
        'Setup complexity for custom voice training',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: true,
      voiceCloning: true,
      realTimeConversation: false,
      customVoices: true,
      ssml: true,
      apiAccess: true,
      fineTuning: true,
      interruptionHandling: false,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish '],
    useCases: ['Voice cloning', 'Content localization & dubbing', 'Audiobook narration', 'Game character voices', 'IVR and phone systems', 'Accessibility TTS'],
    pricing: '$60 / 1M characters (TTS); custom pricing for enterprise cloning',
    lastUpdated: '2026-09-14',
  },
  {
    id: 'llama3',
    name: 'Llama 3 8B Voice',
    vendor: 'Meta',
    url: 'https://llama.meta.com',
    logo: 'Volume2',
    color: '#0866ff',
    tagline: 'Open-source voice pipeline with Llama 3 8B + TTS',
    description:
      'The Llama 3 8B Voice pipeline is an open-source approach to voice AI that combines Meta\'s Llama 3 8B language model with open-source ASR (Whisper) and TTS engines (Coqui TTS, Bark, or VITS). This pipeline is popular among developers who want full control over their voice AI stack without vendor lock-in. While it requires more engineering to set up, it offers complete customization, local deployment, and zero per-token API costs. The 8B parameter model is small enough to run on consumer GPUs, making it ideal for edge deployment.',
    type: 'hybrid',
    realTimeVoice: true,
    voiceCloning: true,
    ttsReading: true,
    scores: {
      voiceQuality: 7.0,
      latency: 500,
      naturalness: 6.8,
      cloningFidelity: 7.5,
      languageSupport: 7.0,
      realTimePerformance: 6.5,
      costEfficiency: 9.8,
      emotionRange: 6.0,
      streamingLatency: 6.5,
      firstTokenLatency: 7.0,
      ttfbMs: 450,
      streamingMs: 500,
      costPer1k: 0.0,
      languages: 30,
      cloningSeconds: 600,
      mosScore: 3.72,
      wordErrorRate: 6.8,
      pros: [
        'Completely free and open-source — no API costs',
        'Full control over every component (ASR, LLM, TTS)',
        'Can run locally on consumer GPU (8GB VRAM)',
        'No vendor lock-in or data privacy concerns',
        'Customizable with fine-tuning and LoRA adapters',
        'Supports voice cloning via Coqui/Bark TTS engines',
        'Active community and ecosystem',
      ],
      cons: [
        'Requires significant engineering to set up',
        'Higher latency — pipeline adds overhead',
        'Voice quality below commercial offerings',
        'Cloning requires 10+ minutes of audio',
        'No built-in interruption handling',
        'Limited emotion control without custom training',
        'Scalability requires self-managed infrastructure',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: false,
      voiceCloning: true,
      realTimeConversation: true,
      customVoices: true,
      ssml: true,
      apiAccess: true,
      fineTuning: true,
      interruptionHandling: false,
    },
    languages: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Portuguese', 'Italian', 'Korean', 'Chinese', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Greek', 'Czech', 'Romanian', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Ukrainian', 'Bengali', 'Tamil'],
    useCases: ['Edge deployment', 'Privacy-sensitive applications', 'Custom voice AI pipelines', 'Research and experimentation', 'On-premise enterprise solutions'],
    pricing: 'Free (open-source); infrastructure costs only',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'qwen',
    name: 'Qwen Voice',
    vendor: 'Alibaba',
    url: 'https://qwen.ai',
    logo: 'Globe',
    color: '#6366f1',
    tagline: 'Multilingual voice AI with strong Asian language support',
    description:
      'Qwen Voice is Alibaba\'s voice interaction feature for the Qwen AI platform. It combines the Qwen 2.5 language model with Alibaba\'s proprietary TTS and ASR systems, offering strong performance in Chinese, Japanese, Korean, and Southeast Asian languages. Qwen Voice is available through the Qwen Chat interface and the DashScope API. It supports real-time conversation, text-to-speech reading, and limited voice cloning through Alibaba\'s CosyVoice model. Qwen is particularly strong in code-switching scenarios (mixing languages mid-sentence).',
    type: 'hybrid',
    realTimeVoice: true,
    voiceCloning: true,
    ttsReading: true,
    scores: {
      voiceQuality: 8.0,
      latency: 350,
      naturalness: 7.9,
      cloningFidelity: 8.0,
      languageSupport: 8.0,
      realTimePerformance: 7.8,
      costEfficiency: 8.8,
      emotionRange: 7.2,
      streamingLatency: 7.8,
      firstTokenLatency: 8.0,
      ttfbMs: 300,
      streamingMs: 350,
      costPer1k: 0.008,
      languages: 35,
      cloningSeconds: 300,
      mosScore: 4.05,
      wordErrorRate: 3.8,
      pros: [
        'Best-in-class Chinese and Asian language support',
        'Excellent code-switching between languages',
        'Very cost-effective at $8/1M tokens',
        'Voice cloning via CosyVoice model',
        'Strong open-weight model availability',
        'Available via DashScope API with generous free tier',
      ],
      cons: [
        'Lower voice quality than ChatGPT or Resemble',
        'Cloning requires 5+ minutes of audio',
        'Limited emotion control',
        'English quality behind Western competitors',
        'Some features China-only or require Alibaba Cloud account',
        'Documentation primarily in Chinese',
      ],
    },
    capabilities: {
      streaming: true,
      multilingual: true,
      emotionControl: false,
      voiceCloning: true,
      realTimeConversation: true,
      customVoices: true,
      ssml: true,
      apiAccess: true,
      fineTuning: true,
      interruptionHandling: true,
    },
    languages: ['Chinese', 'English', 'Japanese', 'Korean', 'Spanish', 'French', 'German', 'Hindi', 'Portuguese', 'Italian', 'Arabic', 'Russian', 'Turkish', 'Dutch', 'Polish', 'Swedish', 'Indonesian', 'Thai', 'Vietnamese', 'Hebrew', 'Greek', 'Czech', 'Romanian', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Ukrainian', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Filipino', 'Malay', 'Cantonese'],
    useCases: ['Chinese-language voice AI', 'Multilingual applications', 'Cost-effective voice pipelines', 'Asian market localization', 'Code-switching scenarios'],
    pricing: '$8 / 1M tokens (DashScope API); free tier available',
    lastUpdated: '2026-09-03',
  },
];

export type BenchmarkSection = {
  id: string;
  title: string;
  subtitle: string;
};

export const tocSections: BenchmarkSection[] = [
  { id: 'our-model', title: 'Our Model', subtitle: 'Our own voice model built on Llama 3 8B + Chatterbox' },
  { id: 'overview', title: 'Overview', subtitle: 'The state of voice AI in 2026' },
  { id: 'realtime-benchmarks', title: 'Real-Time Voice Benchmarks', subtitle: 'Latency, TTFB, and streaming performance' },
  { id: 'quality-scores', title: 'Voice Quality Scores', subtitle: 'MOS, naturalness, and fidelity ratings' },
  { id: 'language-support', title: 'Language Support', subtitle: 'Multilingual coverage comparison' },
  { id: 'voice-cloning', title: 'Voice Cloning', subtitle: 'Fidelity, speed, and sample requirements' },
  { id: 'cost-comparison', title: 'Cost Comparison', subtitle: 'Pricing per 1K tokens / characters' },
  { id: 'capability-matrix', title: 'Capability Matrix', subtitle: 'Feature-by-feature comparison' },
  { id: 'provider-deep-dives', title: 'Provider Deep Dives', subtitle: 'Detailed analysis of each platform' },
  { id: 'methodology', title: 'Methodology', subtitle: 'How these benchmarks were measured' },
];

export const heroStats = [
  { label: 'Voice AI Platforms', value: '7', suffix: '' },
  { label: 'Languages Covered', value: '100', suffix: '+' },
  { label: 'Metrics Tracked', value: '12', suffix: '' },
  { label: 'Last Updated', value: 'Sep', suffix: ' 2026' },
];

export const ourModelStats = [
  { label: 'Base Model', value: 'Llama 3 8B', suffix: '' },
  { label: 'TTS Engine', value: 'Chatterbox', suffix: '' },
  { label: 'Languages', value: '2', suffix: ' (UZ + TR)' },
  { label: 'Status', value: 'Fine-tuning', suffix: '' },
];

export const ourModelDetails = {
  title: 'Our Voice Model',
  subtitle: 'Built on open-source Llama 3 8B + Chatterbox',
  description:
    'We are building our own voice model on top of open-source Llama 3 8B and Chatterbox. Our focus is on Uzbek and Turkish languages — two Turkic languages that are underserved by mainstream voice AI platforms. We have found professional voice actors and actresses and are currently fine-tuning the model to achieve natural, high-quality speech synthesis in these languages.',
  baseModel: 'Llama 3 8B',
  ttsEngine: 'Chatterbox',
  languages: ['Uzbek', 'Turkish'],
  status: 'Fine-tuning in progress',
  voiceActors: 'Professional actors and actresses selected',
  pipeline: [
    { step: '1', title: 'Base Model', detail: 'Llama 3 8B as the language model backbone — lightweight, open-source, runs on consumer GPUs.' },
    { step: '2', title: 'TTS Engine', detail: 'Chatterbox for neural text-to-speech synthesis with voice cloning support.' },
    { step: '3', title: 'Voice Actors', detail: 'Professional Uzbek and Turkish voice actors and actresses selected for training data.' },
    { step: '4', title: 'Fine-Tuning', detail: 'Currently fine-tuning the model on recorded speech samples to achieve natural prosody and accurate pronunciation.' },
  ],
  challenges: [
    'Uzbek and Turkish are low-resource languages for voice AI — limited training data available',
    'Turkic language agglutination requires special handling for natural prosody',
    'Balancing voice quality between the two languages in a single model',
    'Limited benchmark baselines for Uzbek TTS to compare against',
  ],
  progress: {
    dataCollection: 100,
    voiceActorRecording: 85,
    modelFineTuning: 60,
    qualityEvaluation: 35,
  },
};

export const radarMetrics = [
  { key: 'voiceQuality', label: 'Voice Quality', fullLabel: 'Voice Quality (MOS / 5)' },
  { key: 'naturalness', label: 'Naturalness', fullLabel: 'Naturalness (/ 10)' },
  { key: 'realTimePerformance', label: 'Real-Time', fullLabel: 'Real-Time Performance (/ 10)' },
  { key: 'languageSupport', label: 'Languages', fullLabel: 'Language Support (/ 10)' },
  { key: 'emotionRange', label: 'Emotion', fullLabel: 'Emotion Range (/ 10)' },
  { key: 'costEfficiency', label: 'Cost', fullLabel: 'Cost Efficiency (/ 10)' },
];

export const latencyData = providers.map((p) => ({
  name: p.vendor,
  ttfb: p.scores.ttfbMs,
  streaming: p.scores.streamingMs,
  color: p.color,
}));

export const mosData = providers.map((p) => ({
  name: p.vendor,
  mos: p.scores.mosScore,
  color: p.color,
}));

export const languageData = providers
  .map((p) => ({
    name: p.vendor,
    languages: p.scores.languages,
    color: p.color,
  }))
  .sort((a, b) => b.languages - a.languages);

export const costData = providers
  .map((p) => ({
    name: p.vendor,
    cost: p.scores.costPer1k,
    color: p.color,
  }))
  .sort((a, b) => a.cost - b.cost);

export const werData = providers.map((p) => ({
  name: p.vendor,
  wer: p.scores.wordErrorRate,
  color: p.color,
}));

export function getRadarData(providerId?: string): Record<string, string | number>[] {
  if (!providerId) {
    return radarMetrics.map((metric) => {
      const entry: Record<string, string | number> = { metric: metric.label };
      providers.forEach((p) => {
        const value = p.scores[metric.key as keyof typeof p.scores] as number;
        entry[p.vendor] = value;
      });
      return entry;
    });
  }
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) return [];
  return radarMetrics.map((metric) => {
    const entry: Record<string, string | number> = { metric: metric.label };
    entry['value'] = provider.scores[metric.key as keyof typeof provider.scores] as number;
    return entry;
  });
}
