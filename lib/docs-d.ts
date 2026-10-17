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
      { label: 'Overview', href: '/docs' },
      { label: 'Getting started', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Overview', href: '/docs' },                 // satır 15
      { label: 'Voice agents', href: '#' },                 // satır 22
      { label: 'Voice cloning', href: '#' },                // satır 25
  
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
  'https://github.com/miransas/miralas/';
