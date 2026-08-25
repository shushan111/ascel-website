import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("contactTitle"),
    description: t("contactDescription"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <>
      <section className="bg-navy py-20 md:py-28">
        <Container className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-7 text-white/70">{t("intro")}</p>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5">
            <dl className="space-y-6 border border-line p-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  {t("emailLabel")}
                </dt>
                <dd className="mt-2 text-sm text-navy">{siteConfig.contact.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  {t("phoneLabel")}
                </dt>
                <dd className="mt-2 text-sm text-navy">{siteConfig.contact.phone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  {t("locationLabel")}
                </dt>
                <dd className="mt-2 text-sm text-navy">
                  {siteConfig.contact.addressLine}
                  <br />
                  {siteConfig.contact.addressDetail}
                </dd>
              </div>
              {social.length > 0 ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">Social</dt>
                  <dd className="mt-2 space-y-1 text-sm">
                    {social.map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block capitalize text-navy underline-offset-4 hover:underline"
                      >
                        {name}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-6 flex min-h-56 items-center justify-center border border-dashed border-line bg-canvas p-6 text-center">
              <p className="text-sm leading-6 text-muted">{t("mapPending")}</p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
