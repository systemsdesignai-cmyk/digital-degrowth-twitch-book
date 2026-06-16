export type BlogArticle = {
  _id: string;
  slug: { current: string };
  date: string;
  title: string;
  outlet: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    caption?: string;
    alt: string;
  };
  excerpt: string;
  content: any[]; // Portable Text blocks
  tag: string;
  readTime: string;
};

export type Citation = {
  _id: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  order?: number;
};

export type HomeSettings = {
  heroTitle: string;
  heroTitleOutline: string;
  heroCopy: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutCopy: string;
};

export type Author = {
  name: string;
  bio: string;
  image: any;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  bluesky?: string;
  website?: string;
  email?: string;
  contactInfo?: string;
};

export type SiteSettings = {
  siteTitle: string;
  footerText: string;
};

export type Retailer = {
  label: string;
  url: string;
  type: 'amazon' | 'takealot' | 'apple' | 'other';
};
