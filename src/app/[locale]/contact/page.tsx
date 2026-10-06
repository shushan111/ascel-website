import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
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

/**
 * The form on a panel, the direct ways to reach the center beside it. Rows
 * render only once config holds a real value; "[Content to be provided]"
 * never reaches the page.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const monument = await getTranslations("Monument");
  const nav = await getTranslations("Nav");
  const footer = await getTranslations("Footer");
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  const isSet = (value: string) => Boolean(value) && !value.startsWith("[");
  const details = [
    { icon: MailIcon, label: t("emailLabel"), value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: PhoneIcon, label: t("phoneLabel"), value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  ].filter((detail) => isSet(detail.value));
  const address = [siteConfig.contact.addressLine, siteConfig.contact.addressDetail].filter(isSet);

  return (
    <>
      <PageHeader breadcrumbs={[{ label: nav("contact") }]} title={t("title")} intro={t("intro")} />
      <section className="bg-canvas pb-16 md:pb-band">
        <Container width="wide" className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="card p-6 sm:p-8 md:p-10 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-4 lg:col-span-5">
            <ul className="card divide-y divide-line">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-start gap-4 p-5 transition-colors hover:bg-canvas sm:p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="t-small block text-muted">{label}</span>
                      <span className="mt-0.5 block break-words text-[1.03125rem] text-ink group-hover:underline group-hover:underline-offset-4">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
              {address.length ? (
                <li className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
                    <MapPinIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="t-small block text-muted">{t("locationLabel")}</span>
                    {address.map((line) => (
                      <span key={line} className="mt-0.5 block text-[1.03125rem] leading-relaxed text-ink">{line}</span>
                    ))}
                  </span>
                </li>
              ) : null}
              {social.length > 0 ? (
                <li className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
                    <GlobeIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="t-small block text-muted">{footer("social")}</span>
                    <span className="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                      {social.map(([name, url]) => (
                        <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-[1.03125rem] capitalize text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                          {name}
                        </a>
                      ))}
                    </span>
                  </span>
                </li>
              ) : null}
            </ul>

            {siteConfig.contact.mapEmbedUrl ? (
              <iframe
                src={siteConfig.contact.mapEmbedUrl}
                title={t("mapTitle")}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border-0 bg-mist"
              />
            ) : (
              // Until a map is configured: the building itself, as it is.
              <figure className="card overflow-hidden">
                <div className="relative aspect-[3/2] bg-mist">
                  <Image
                    src="/images/project/facade-before.webp"
                    alt={monument("altBefore")}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <figcaption className="t-small px-5 py-4 text-muted">{t("mapPending")}</figcaption>
              </figure>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
