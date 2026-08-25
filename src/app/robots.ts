import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy", "/terms"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
