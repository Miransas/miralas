export interface NavItem {
  label: string;
  href: string;
  status?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Overview', href: '/docs' },
      { label: 'Getting started', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Overview', href: '/docs' },
      { label: 'Text-to-speech', href: '/docs/tts' },
      { label: 'Speech-to-speech', href: '/docs/speech-to-speech', status: 'In development' },
      { label: 'Voice agents', href: '#' },
      { label: 'Voice cloning', href: '#' },
  
    ],
  },
  {
    title: 'Reference',
    items: [{ label: 'API reference', href: '#' }],
  },
];

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const REPO_URL =
  'https://github.com/Miransas/miralas';
