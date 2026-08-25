import type { Metadata } from "next";
import { siteConfig } from "./config";
import { localePrefixedPath, routing } from "@/i18n/routing";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
};

const ogLocaleByCode: Record<string, string> = {
  en: "en_US",
  hy: "hy_AM",
  ru: "ru_RU",
};

export function absoluteUrl(path: string, locale: string): string {
  return new URL(localePrefixedPath(path, locale), siteConfig.url).toString();
}

export function alternateLanguageUrls(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(path, locale);
  }
  languages["x-default"] = absoluteUrl(path, routing.defaultLocale);
  return languages;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  image = "/images/hero-simulation.jpg",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path, locale);
  const ogImage = new URL(image, siteConfig.url).toString();
  const languages = alternateLanguageUrls(path);
  const alternateLocales = routing.locales
    .filter((code) => code !== locale)
    .map((code) => ogLocaleByCode[code] ?? code);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocaleByCode[locale] ?? "en_US",
      alternateLocale: alternateLocales,
      url,
      siteName: siteConfig.legalName,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
