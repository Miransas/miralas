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
    title: 'Getting Started',
    items: [
      { label: 'Started', href: '/resources/docs' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Voice Cloning', href: '/resources/docs/voice-cloning' },
      { label: 'Introduction', href: '/resources/docs/getting-started' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'Voice Agents', href: '/' },
      { label: 'Text-to-Speech', href: '/' },
      { label: 'Speech-to-Speech', href: '/' },
      { label: 'API Reference', href: '/' },
    ],
  },
];

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const REPO_URL =
  'https://github.com/miransas/miralas/';
