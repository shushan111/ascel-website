import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getNewsArticles } from "@/data/news";
import { getPrograms } from "@/data/programs";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const programPaths = getPrograms().map((program) => `/programs/${program.slug}`);
  const newsPaths = getNewsArticles().map((article) => `/news/${article.slug}`);
  const paths = [...staticPaths, ...programPaths, ...newsPaths];

  return paths.flatMap((path) => {
    const en = new URL(path, siteConfig.url).toString();
    const hy = new URL(path === "/" ? "/hy" : `/hy${path}`, siteConfig.url).toString();
    return [
      { url: en, lastModified: new Date(), alternates: { languages: { en, hy } } },
      { url: hy, lastModified: new Date(), alternates: { languages: { en, hy } } },
    ];
  });
}
