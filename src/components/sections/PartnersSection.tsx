import { getTranslations } from "next-intl/server";
import { getPartners } from "@/data/partners";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Confirmed partners only. Six empty boxes reading "Logo to be provided" told
 * a donor there is nothing here yet, which is the opposite of what a trust
 * signal is for, so the section removes itself until a real partner exists.
 */
export async function PartnersSection() {
  const partners = getPartners().filter((partner) => !partner.isPlaceholder);
  if (!partners.length) return null;

  const t = await getTranslations("PartnersHome");

  return (
    <Section space="compact">
      <Container width="wide">
        <SectionHeader title={t("title")} intro={t("subtitle")} size="h3" />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => {
            const tile = (
              <span className="t-label text-ink">{partner.name}</span>
            );
            return (
              <li key={partner.id}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-link flex min-h-24 items-center justify-center px-4 text-center"
                  >
                    {tile}
                  </a>
                ) : (
                  <div className="card flex min-h-24 items-center justify-center px-4 text-center">{tile}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
