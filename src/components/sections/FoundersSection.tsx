import { getTranslations } from "next-intl/server";
import { getFounders } from "@/data/founders";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FounderCard } from "@/components/founders/FounderCard";
import { isPlaceholderFounder } from "@/components/founders/founderName";

/**
 * The people behind the center, managed from the Studio. Stand-in entries are
 * skipped, and the section removes itself until a real founder exists.
 */
export async function FoundersSection({
  locale,
  tone = "canvas",
}: {
  locale: string;
  tone?: "canvas" | "paper";
}) {
  const founders = (await getFounders()).filter((founder) => !isPlaceholderFounder(founder));
  if (!founders.length) return null;

  const t = await getTranslations("FoundersSection");

  return (
    <Section tone={tone} id="founders">
      <Container width="wide">
        <SectionHeader title={t("title")} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {founders.map((founder, index) => (
            <li key={founder.id}>
              <FounderCard founder={founder} locale={locale} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
