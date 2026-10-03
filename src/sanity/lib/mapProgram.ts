import type {
  LocalizedString,
  Program,
  ProgramDetailContent,
  ProgramFact,
  ProgramMilestone,
  ProgramNarrative,
  ProgramTopic,
} from "@/types";
import { urlFor } from "./image";

type SanityLocalizedValue = {
  en?: string;
  hy?: string;
  ru?: string;
};

type SanityImage = {
  asset?: { _id?: string; url?: string } | null;
  hotspot?: unknown;
  crop?: unknown;
};

const externalUrlKeys = new Set<NonNullable<Program["externalUrlKey"]>>([
  "gyumriOrthopedicSchool",
  "damageControlCourses",
  "eternalNation",
]);

const ctaLabels = new Set<Program["ctaLabel"]>([
  "visitWebsite",
  "exploreCourses",
  "learnMore",
]);

export type SanityProgramDocument = {
  _id: string;
  slug?: string | null;
  title: SanityLocalizedValue;
  shortTitle?: SanityLocalizedValue | null;
  category: SanityLocalizedValue;
  description: SanityLocalizedValue;
  overview?: SanityLocalizedValue | null;
  relationshipNote?: SanityLocalizedValue | null;
  ctaLabel?: string | null;
  externalUrlKey?: string | null;
  hasOnSiteProfile?: boolean | null;
  objectives?: SanityLocalizedValue[] | null;
  activities?: SanityLocalizedValue[] | null;
  impact?: SanityLocalizedValue[] | null;
  image?: SanityImage;
  profile?: {
    tagline?: SanityLocalizedValue | null;
    seoDescription?: SanityLocalizedValue | null;
    facts?: Array<{
      label?: SanityLocalizedValue | null;
      value?: SanityLocalizedValue | null;
    }> | null;
    about?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
    } | null;
    mission?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
      points?: SanityLocalizedValue[] | null;
    } | null;
    education?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
      formats?: Array<{
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }> | null;
    } | null;
    audience?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
      groups?: Array<{
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }> | null;
    } | null;
    focusAreas?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
      areas?: Array<{
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }> | null;
    } | null;
    highlights?: {
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue[] | null;
      milestones?: Array<{
        date?: SanityLocalizedValue | null;
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }> | null;
    } | null;
    cta?: {
      eyebrow?: SanityLocalizedValue | null;
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue | null;
      label?: SanityLocalizedValue | null;
      url?: string | null;
    } | null;
    sourceNote?: SanityLocalizedValue | null;
  } | null;
};

function toLocalizedString(
  value: SanityLocalizedValue | null | undefined,
): LocalizedString {
  return {
    en: value?.en ?? "",
    hy: value?.hy ?? "",
    ru: value?.ru ?? "",
  };
}

function toLocalizedList(
  values: SanityLocalizedValue[] | null | undefined,
): LocalizedString[] {
  return (values ?? []).map(toLocalizedString);
}

function buildImageUrl(
  image: SanityImage | null | undefined,
  fallback: string,
): string {
  if (!image?.asset?._id) return fallback;
  return urlFor(image).width(1600).height(1200).fit("crop").url();
}

function toExternalUrlKey(
  value: string | null | undefined,
): Program["externalUrlKey"] | undefined {
  if (value && externalUrlKeys.has(value as NonNullable<Program["externalUrlKey"]>)) {
    return value as NonNullable<Program["externalUrlKey"]>;
  }
  return undefined;
}

function toCtaLabel(value: string | null | undefined): Program["ctaLabel"] {
  if (value && ctaLabels.has(value as Program["ctaLabel"])) {
    return value as Program["ctaLabel"];
  }
  return "learnMore";
}

function mapNarrative(
  value:
    | {
        title?: SanityLocalizedValue | null;
        body?: SanityLocalizedValue[] | null;
      }
    | null
    | undefined,
): ProgramNarrative {
  return {
    title: toLocalizedString(value?.title),
    body: toLocalizedList(value?.body),
  };
}

function mapTopics(
  values:
    | Array<{
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }>
    | null
    | undefined,
): ProgramTopic[] {
  return (values ?? []).map((item) => ({
    title: toLocalizedString(item.title),
    description: toLocalizedString(item.description),
  }));
}

function mapFacts(
  values:
    | Array<{
        label?: SanityLocalizedValue | null;
        value?: SanityLocalizedValue | null;
      }>
    | null
    | undefined,
): ProgramFact[] {
  return (values ?? []).map((item) => ({
    label: toLocalizedString(item.label),
    value: toLocalizedString(item.value),
  }));
}

function mapMilestones(
  values:
    | Array<{
        date?: SanityLocalizedValue | null;
        title?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
      }>
    | null
    | undefined,
): ProgramMilestone[] {
  return (values ?? []).map((item) => ({
    date: toLocalizedString(item.date),
    title: toLocalizedString(item.title),
    description: toLocalizedString(item.description),
  }));
}

function mapProfile(
  profile: SanityProgramDocument["profile"],
): ProgramDetailContent | undefined {
  if (!profile?.tagline?.en) return undefined;

  return {
    tagline: toLocalizedString(profile.tagline),
    seoDescription: toLocalizedString(profile.seoDescription),
    facts: mapFacts(profile.facts),
    about: mapNarrative(profile.about),
    mission: {
      ...mapNarrative(profile.mission),
      points: toLocalizedList(profile.mission?.points),
    },
    education: {
      ...mapNarrative(profile.education),
      formats: mapTopics(profile.education?.formats),
    },
    audience: {
      ...mapNarrative(profile.audience),
      groups: mapTopics(profile.audience?.groups),
    },
    focusAreas: {
      ...mapNarrative(profile.focusAreas),
      areas: mapTopics(profile.focusAreas?.areas),
    },
    highlights: {
      ...mapNarrative(profile.highlights),
      milestones: mapMilestones(profile.highlights?.milestones),
    },
    cta: profile.cta?.url
      ? {
          eyebrow: toLocalizedString(profile.cta.eyebrow),
          title: toLocalizedString(profile.cta.title),
          body: toLocalizedString(profile.cta.body),
          label: toLocalizedString(profile.cta.label),
          url: profile.cta.url,
        }
      : undefined,
    sourceNote: toLocalizedString(profile.sourceNote),
  };
}

export function mapSanityProgram(doc: SanityProgramDocument): Program {
  const slug = doc.slug ?? doc._id;
  const title = toLocalizedString(doc.title);
  const image = buildImageUrl(doc.image, "");
  const shortTitle = doc.shortTitle?.en
    ? toLocalizedString(doc.shortTitle)
    : title;
  const relationshipNote = doc.relationshipNote?.en
    ? toLocalizedString(doc.relationshipNote)
    : undefined;
  const detail = mapProfile(doc.profile);
  const hasOnSiteProfile = Boolean(doc.hasOnSiteProfile) || Boolean(detail);

  return {
    id: doc._id,
    slug,
    title,
    shortTitle,
    description: toLocalizedString(doc.description),
    category: toLocalizedString(doc.category),
    image,
    ctaLabel: toCtaLabel(doc.ctaLabel),
    externalUrlKey: toExternalUrlKey(doc.externalUrlKey),
    hasOnSiteProfile,
    overview: toLocalizedString(doc.overview),
    objectives: toLocalizedList(doc.objectives),
    activities: toLocalizedList(doc.activities),
    impact: toLocalizedList(doc.impact),
    relationshipNote,
    detail,
  };
}
