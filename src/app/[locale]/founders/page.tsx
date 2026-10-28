import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getFounders } from "@/data/founders";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextPageCard } from "@/components/ui/NextPageCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FounderProfile } from "@/components/founders/FounderProfile";
import { founderName, isPlaceholderFounder } from "@/components/founders/founderName";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("foundersTitle"),
    description: t("foundersDescription"),
    path: "/founders",
    locale,
  });
}

/**
 * The people who founded the center, in the Studio's order. The header carries
 * a numbered index of the founders — the page's one decorative element, and a
 * way straight to each profile. Stand-in entries are never shown.
 */
export default async function FoundersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FoundersPage");
  const nav = await getTranslations("Nav");
  const founders = (await getFounders()).filter((founder) => !isPlaceholderFounder(founder));
  const anchor = (index: number) => `founder-${index + 1}`;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: nav("about"), href: "/about" }, { label: t("title") }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        aside={
          founders.length ? (
            <nav aria-label={t("indexLabel")} className="border-l border-line-strong pl-6">
              <ol className="space-y-2.5">
                {founders.map((founder, index) => (
                  <li key={founder.id}>
                    <a
                      href={`#${anchor(index)}`}
                      className="group/index flex items-baseline gap-4 text-ink transition-colors hover:text-accent-ink"
                    >
                      <span className="font-display text-[0.875rem] tabular-nums text-accent-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="t-h4 underline decoration-transparent underline-offset-4 transition-colors group-hover/index:decoration-current">
                        {founderName(founder, locale)}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : undefined
        }
      />

      <Section space="none" className="pb-16 md:pb-band">
        <Container width="wide">
          {founders.length ? (
            <div className="space-y-12 md:space-y-16">
              {founders.map((founder, index) => (
                <FounderProfile key={founder.id} founder={founder} locale={locale} index={index} id={anchor(index)} />
              ))}
            </div>
          ) : (
            <EmptyState title={t("empty")} />
          )}
        </Container>
      </Section>

      <Section space="compact" tone="paper">
        <Container width="wide">
          <NextPageCard href="/about" label={t("nextLabel")} title={t("nextTitle")} />
        </Container>
      </Section>
    </>
  );
}
