import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 is reserved for the home hero, which fills the full screen width.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Local preview files (src/app/preview-media) must never be packaged, even
  // though the dev-only route that serves them reads from that folder.
  outputFileTracingExcludes: { "*": [".preview/**"] },
};

export default withNextIntl(nextConfig);
