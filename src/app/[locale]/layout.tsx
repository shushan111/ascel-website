import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.legalName,
    template: "%s",
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const navT = await getTranslations("Nav");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gyumri",
      addressCountry: "AM",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-navy"
        >
          {navT("skip")}
        </Link>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </NextIntlClientProvider>
    </>
  );
}
