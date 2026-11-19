// Coverage of Miralas' approved Chatterbox multilingual checkpoint, not public voice inventory.
// Source: https://github.com/resemble-ai/chatterbox/blob/master/src/chatterbox/mtl_tts.py
export const MODEL_LANGUAGES = [
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ms", name: "Malay" },
  { code: "no", name: "Norwegian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tr", name: "Turkish" },
  { code: "es", name: "Spanish" },
].sort((a, b) => a.name.localeCompare(b.name, "en"));

export const VOICE_TECHNOLOGY = {
  engine: "Chatterbox Multilingual",
  checkpoint: "t3_mtl23ls_v2.safetensors",
  sampleRate: "24 kHz",
  consoleUrl: "https://console.miralas.io",
  modelSource: "https://github.com/resemble-ai/chatterbox/blob/master/src/chatterbox/mtl_tts.py",
  audioSource: "https://github.com/resemble-ai/chatterbox/blob/master/src/chatterbox/models/s3gen/const.py",
  uzbekStatus: "Uzbek Speech — In Development",
  uzbekDescription: "We're working toward native Uzbek speech capabilities through research, data collection and model evaluation.",
} as const;
