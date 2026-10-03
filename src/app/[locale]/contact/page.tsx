import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
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
  const monument = await getTranslations("Monument");
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  // Rows render only once config holds a real value; "[Content to be
  // provided]" never reaches the page.
  const isSet = (value: string) => Boolean(value) && !value.startsWith("[");
  const details = [
    [t("emailLabel"), siteConfig.contact.email, `mailto:${siteConfig.contact.email}`],
    [t("phoneLabel"), siteConfig.contact.phone, `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`],
  ].filter(([, value]) => isSet(value));
  const address = [siteConfig.contact.addressLine, siteConfig.contact.addressDetail].filter(isSet);

  return (
    <>
      {/* DRAFT — պատվիրատուի հաստատման կարիք ունի (intro) */}
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="bg-canvas pb-20 md:pb-28">
        <Container width="wide" className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5 lg:col-start-8">
            <dl className="border-t border-ink/70">
              {details.map(([label, value, href]) => (
                <div key={label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.92rem] text-muted">{label}</dt>
                  <dd className="text-[1rem] text-ink">
                    <a href={href} className="underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                      {value}
                    </a>
                  </dd>
                </div>
              ))}
              {address.length ? (
                <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.92rem] text-muted">{t("locationLabel")}</dt>
                  <dd className="text-[1rem] leading-relaxed text-ink">
                    {address.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </dd>
                </div>
              ) : null}
              {social.length > 0 ? (
                <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.92rem] text-muted">Social</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1 text-[1rem]">
                    {social.map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                      >
                        {name}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
            {siteConfig.contact.mapEmbedUrl ? (
              <iframe
                src={siteConfig.contact.mapEmbedUrl}
                title={t("mapTitle")}
                loading="lazy"
                className="mt-8 aspect-[4/3] w-full border-0 bg-mist"
              />
            ) : (
              // Until a map is configured: the building itself, as it is.
              <figure className="mt-8">
                <div className="relative aspect-[3/2] bg-mist">
                  <Image
                    src="/images/project/facade-before.webp"
                    alt={monument("altBefore")}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <figcaption className="mt-3 text-[0.82rem] text-muted">{siteConfig.contact.addressLine}</figcaption>
              </figure>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
