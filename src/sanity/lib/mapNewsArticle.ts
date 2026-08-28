import type { LocalizedString, NewsArticle } from "@/types";
import { formatNewsDate } from "@/lib/utils";
import { urlFor } from "./image";

type SanityLocalizedValue = {
  en?: string;
  hy?: string;
  ru?: string;
};

type PortableTextBlock = {
  _type: "block";
  children?: Array<{ text?: string }>;
};

type SanityNewsDocument = {
  _id: string;
  slug: string;
  title: SanityLocalizedValue;
  excerpt: SanityLocalizedValue;
  body: {
    en?: PortableTextBlock[];
    hy?: PortableTextBlock[];
    ru?: PortableTextBlock[];
  };
  date: string;
  category: SanityLocalizedValue;
  image?: {
    asset?: { _id?: string; url?: string } | null;
    alt?: SanityLocalizedValue;
    hotspot?: unknown;
    crop?: unknown;
  };
};

const fallbackNewsImage = "/images/hero-simulation.webp";

function toLocalizedString(value: SanityLocalizedValue | null | undefined): LocalizedString {
  return {
    en: value?.en ?? "",
    hy: value?.hy ?? "",
    ru: value?.ru ?? "",
  };
}

function blocksToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
  if (!blocks?.length) return [];

  return blocks
    .filter((block) => block._type === "block")
    .map((block) => block.children?.map((child) => child.text ?? "").join("") ?? "")
    .filter(Boolean);
}

function zipLocalizedParagraphs(body: SanityNewsDocument["body"]): LocalizedString[] {
  const en = blocksToParagraphs(body.en);
  const hy = blocksToParagraphs(body.hy);
  const ru = blocksToParagraphs(body.ru);
  const length = Math.max(en.length, hy.length, ru.length);

  return Array.from({ length: length }, (_, index) => ({
    en: en[index] ?? "",
    hy: hy[index] ?? "",
    ru: ru[index] ?? "",
  }));
}

function buildDateLabel(date: string): LocalizedString {
  return {
    en: formatNewsDate(date, "en"),
    hy: formatNewsDate(date, "hy"),
    ru: formatNewsDate(date, "ru"),
  };
}

function buildImageUrl(image: SanityNewsDocument["image"]): string {
  if (!image?.asset?._id) return fallbackNewsImage;

  return urlFor(image).width(1600).height(1000).fit("crop").url();
}

export function mapSanityNewsArticle(doc: SanityNewsDocument): NewsArticle {
  return {
    id: doc._id,
    slug: doc.slug,
    title: toLocalizedString(doc.title),
    excerpt: toLocalizedString(doc.excerpt),
    body: zipLocalizedParagraphs(doc.body),
    date: doc.date,
    dateLabel: buildDateLabel(doc.date),
    category: toLocalizedString(doc.category),
    image: buildImageUrl(doc.image),
    imageAlt: toLocalizedString(doc.image?.alt),
    isPlaceholder: false,
  };
}
