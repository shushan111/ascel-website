export type LocaleCode = "en" | "hy";

export interface LocalizedString {
  en: string;
  hy: string;
}

export interface Program {
  id: string;
  slug: string;
  title: LocalizedString;
  shortTitle: LocalizedString;
  description: LocalizedString;
  overview: LocalizedString;
  category: LocalizedString;
  image: string;
  gallery: string[];
  objectives: LocalizedString[];
  activities: LocalizedString[];
  impact: LocalizedString[];
  relationshipNote?: LocalizedString;
  externalUrlKey: "gyumriOrthopedicSchool" | "damageControlCourses" | "eternalNation";
  ctaLabel: "visitWebsite" | "exploreCourses" | "learnMore";
}

export interface Course {
  id: string;
  slug: string;
  title: LocalizedString;
  date: LocalizedString;
  location: LocalizedString;
  type: LocalizedString;
  instructor: LocalizedString;
  description: LocalizedString;
  image: string;
  registrationUrl: string;
  isPlaceholder: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: LocalizedString;
  month: LocalizedString;
  day: string;
  location: LocalizedString;
  description: LocalizedString;
  href: string;
  isPlaceholder: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  body: LocalizedString[];
  date: string;
  dateLabel: LocalizedString;
  category: LocalizedString;
  image: string;
  imageAlt: LocalizedString;
  isPlaceholder: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  isPlaceholder: boolean;
}

export interface DonationOption {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface Metric {
  id: string;
  label: LocalizedString;
  display: string;
  numericValue: number | null;
}
