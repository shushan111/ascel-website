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
      <Container>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="flex min-h-24 items-center justify-center rounded-md border border-line bg-canvas px-4 text-center"
            >
              <span className="t-meta-sm text-ink">{partner.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
