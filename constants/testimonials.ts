export interface FeaturedReview {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface MarqueeReview {
  text: string;
  author: string;
  handle: string;
  avatar: string;
}

export const FEATURED_REVIEWS: FeaturedReview[] = [
  {
    id: 1,
    quote: "Miralas helped us turn a rough voice prototype into a polished experience our customers actually wanted to use.",
    author: "Maya Chen",
    role: "Product Lead, Northstar",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_1.png"
  },
  {
    id: 2,
    quote: "The voices sound natural, the API is straightforward, and our team shipped the first production workflow in a single afternoon.",
    author: "Ethan Brooks",
    role: "Founder, Fieldnote",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_2.png"
  },
  {
    id: 3,
    quote: "We can create expressive narration at the speed of an idea. Miralas has become part of our everyday creative process.",
    author: "Olivia Martin",
    role: "Creative Director, Kinetic",
    avatar: "https://res.cloudinary.com/dyzxcpgio/image/upload/v1789417025/PhotoshopExtension_Image_3.png"
  }
];

export const MARQUEE_COLUMN_1: MarqueeReview[] = [
  {
    text: "The voice quality is impressive straight out of the box. We went from script to finished narration without a studio session.",
    author: "Avery Stone",
    handle: "@averystone",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    text: "Miralas makes it easy to test different tones and pacing until the read feels right. It has completely changed our workflow.",
    author: "Jordan Ellis",
    handle: "@jordanellis",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    text: "We added natural voice previews to our product in a few minutes. The developer experience is excellent.",
    author: "Noah Williams",
    handle: "@noahw",
    avatar: "https://i.pravatar.cc/150?img=13"
  }
];

export const MARQUEE_COLUMN_2: MarqueeReview[] = [
  {
    text: "The ability to shape a voice around the mood of each piece gives our content a level of personality we could not get before.",
    author: "Theo Grant",
    handle: "@theogrant",
    avatar: "https://i.pravatar.cc/150?img=14"
  },
  {
    text: "We moved our audio production from a long manual process to a fast, repeatable workflow while keeping full creative control.",
    author: "Riley Solis",
    handle: "@rileysolis",
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    text: "The voices are clear, consistent, and expressive enough for real customer-facing experiences. It feels ready for production.",
    author: "Leo Robinson",
    handle: "@leorobinson",
    avatar: "https://i.pravatar.cc/150?img=16"
  }
];
