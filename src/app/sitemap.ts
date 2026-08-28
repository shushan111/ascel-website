import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getNewsArticles } from "@/data/news";
import { getPrograms } from "@/data/programs";
import { localePrefixedPath, routing } from "@/i18n/routing";
import { alternateLanguageUrls } from "@/lib/seo";

const staticPaths = [
  "/",
  "/about",
  "/programs",
  "/courses",
  "/simulation-center",
  "/news",
  "/donate",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programPaths = getPrograms().map((program) => `/programs/${program.slug}`);
  const newsPaths = (await getNewsArticles()).map((article) => `/news/${article.slug}`);
  const paths = [...staticPaths, ...programPaths, ...newsPaths];

  return paths.flatMap((path) => {
    const languages = alternateLanguageUrls(path);
    return routing.locales.map((locale) => ({
      url: new URL(localePrefixedPath(path, locale), siteConfig.url).toString(),
      lastModified: new Date(),
      alternates: { languages },
    }));
  });
}
