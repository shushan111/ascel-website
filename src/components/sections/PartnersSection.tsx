import { getTranslations } from "next-intl/server";
import { getPartners } from "@/data/partners";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function PartnersSection() {
  const t = await getTranslations("PartnersHome");
  const partners = getPartners();

  return (
    <Section>
      <Container>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="flex min-h-28 items-center justify-center bg-white px-4 text-center"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-muted">
                {t("slotLabel")}
              </span>
              <span className="sr-only">{partner.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
