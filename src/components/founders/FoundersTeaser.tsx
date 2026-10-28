import { getTranslations } from "next-intl/server";
import { getFounders } from "@/data/founders";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { FounderPortrait } from "@/components/founders/FounderPortrait";
import { founderName, isPlaceholderFounder } from "@/components/founders/founderName";

/**
 * The founders on the About page: faces and names only, and a link on. The
 * biographies live on /founders, so the two pages can never disagree.
 * Stand-in entries are skipped; the section removes itself until a real
 * founder exists.
 */
export async function FoundersTeaser({ locale }: { locale: string }) {
  const founders = (await getFounders()).filter((founder) => !isPlaceholderFounder(founder));
  if (!founders.length) return null;
  const t = await getTranslations("FoundersPage");
  const section = await getTranslations("FoundersSection");

  return (
    <Section id="founders">
      <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <FadeIn className="lg:col-span-4">
          <h2 className="t-h1 text-balance text-ink">{section("title")}</h2>
          <p className="t-body mt-5 max-w-md text-muted">{t("teaserBody")}</p>
          <ArrowLink href="/founders" className="mt-6">
            {t("teaserLink")}
          </ArrowLink>
        </FadeIn>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5 lg:gap-5">
          {founders.map((founder, index) => {
            const name = founderName(founder, locale);
            return (
              <li key={founder.id}>
                <FadeIn delay={index * 0.06}>
                  <FounderPortrait
                    src={founder.photo}
                    alt={name}
                    name={name}
                    sizes="(min-width: 1024px) 13vw, (min-width: 640px) 30vw, 45vw"
                  />
                  <p className="t-label mt-3 text-balance text-ink">{name}</p>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
