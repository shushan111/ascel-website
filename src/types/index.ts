export type LocaleCode = "en" | "hy" | "ru";

export interface LocalizedString {
  en: string;
  hy: string;
  ru: string;
}

/** A short label/value pair shown in a program's summary strip. */
export interface ProgramFact {
  label: LocalizedString;
  value: LocalizedString;
}

/** A card-sized entry: heading plus one supporting sentence. */
export interface ProgramTopic {
  title: LocalizedString;
  description: LocalizedString;
}

export interface ProgramMilestone {
  date: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
}

/** Section heading with its paragraphs. Localized per section so a program can
 * carry its own wording (e.g. "About Gyumri Orthopedic School"). */
export interface ProgramNarrative {
  title: LocalizedString;
  body: LocalizedString[];
}

/**
 * Long-form profile for programs that warrant a full page instead of the
 * generic overview/objectives/activities layout. Optional on `Program`.
 */
export interface ProgramDetailContent {
  tagline: LocalizedString;
  seoDescription: LocalizedString;
  facts: ProgramFact[];
  about: ProgramNarrative;
  mission: ProgramNarrative & { points: LocalizedString[] };
  education: ProgramNarrative & { formats: ProgramTopic[] };
  audience: ProgramNarrative & { groups: ProgramTopic[] };
  focusAreas: ProgramNarrative & { areas: ProgramTopic[] };
  highlights: ProgramNarrative & { milestones: ProgramMilestone[] };
  cta: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedString;
    label: LocalizedString;
    url: string;
  };
  sourceNote: LocalizedString;
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
  detail?: ProgramDetailContent;
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
