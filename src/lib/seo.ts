import type { Metadata } from "next";
import { siteConfig } from "./config";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  image = "/images/hero-simulation.jpg",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(image, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: new URL(path, siteConfig.url).toString(),
        hy: new URL(`/hy${path === "/" ? "" : path}`, siteConfig.url).toString(),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "hy" ? "hy_AM" : "en_US",
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
