export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Overview', href: '/resources/docs' },
      { label: 'Getting started', href: '/resources/docs/getting-started' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Voice agents', href: '/resources/docs/voice-agents' },
      { label: 'Text-to-speech', href: '/resources/docs/tts' },
      { label: 'Speech-to-speech', href: '/resources/docs/speech-to-speech' },
      { label: 'Voice cloning', href: '/resources/docs/voice-cloning' },
    ],
  },
  {
    title: 'Reference',
    items: [{ label: 'API reference', href: '/resources/docs/api-reference' }],
  },
];

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const REPO_URL =
  'https://github.com/miransas/miralas/';
