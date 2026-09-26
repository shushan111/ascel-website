import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
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

  const details = [
    [t("emailLabel"), siteConfig.contact.email],
    [t("phoneLabel"), siteConfig.contact.phone],
  ] as const;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5">
            <dl className="border-t border-line-strong">
              {details.map(([label, value]) => (
                <div key={label} className="border-b border-line py-5">
                  <dt className="t-meta-sm text-muted">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
                </div>
              ))}
              <div className="border-b border-line py-5">
                <dt className="t-meta-sm text-muted">{t("locationLabel")}</dt>
                <dd className="mt-2 text-sm leading-6 text-ink">
                  {siteConfig.contact.addressLine}
                  <br />
                  {siteConfig.contact.addressDetail}
                </dd>
              </div>
              {social.length > 0 ? (
                <div className="border-b border-line py-5">
                  <dt className="t-meta-sm text-muted">Social</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {social.map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize text-ink underline underline-offset-4 transition-colors hover:text-accent"
                      >
                        {name}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-8 flex min-h-56 items-center justify-center rounded-md border border-dashed border-line-strong bg-canvas p-6 text-center">
              <p className="t-small max-w-xs text-muted">{t("mapPending")}</p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
