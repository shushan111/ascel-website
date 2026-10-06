import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectConditions } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Chapter } from "@/components/ui/Chapter";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Chapter one: the building as it stands. Only photographs here — the street
 * facade and the interior — then the survey's damage list as a ledger, each
 * problem paired with the repair the design proposes.
 */
export async function MonumentSection({ locale }: { locale: string }) {
  const t = await getTranslations("Monument");
  const page = await getTranslations("CenterPage");

  return (
    <Section id="now">
      <Container width="wide">
        <Chapter no="01" label={page("chapterNow")} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-6">
            <h2 className="t-h1 text-balance text-ink">{t("title")}</h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="t-body text-muted">{t("subtitle")}</p>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-12 lg:gap-4">
          <figure className="lg:col-span-8">
            <ImageReveal className="media">
              <div className="relative aspect-[3/2]">
                <Image src="/images/project/facade-before.webp" alt={t("altBefore")} fill className="object-cover" sizes="(min-width: 1024px) 64vw, 100vw" />
              </div>
            </ImageReveal>
            <figcaption className="t-caption mt-2.5 max-w-xl text-muted">{t("captionBefore")}</figcaption>
          </figure>
          <figure className="lg:col-span-4">
            <ImageReveal className="media">
              <div className="relative aspect-[3/2] lg:aspect-[4/5]">
                <Image src="/images/project/interior-before.webp" alt={page("interiorAlt")} fill className="object-cover" sizes="(min-width: 1024px) 32vw, 100vw" />
              </div>
            </ImageReveal>
            <figcaption className="t-caption mt-2.5 text-muted">{page("interiorAlt")}</figcaption>
          </figure>
        </div>

        {/* Damage and repair as a two-column ledger. */}
        <div className="card mt-12 overflow-hidden md:mt-16">
          <div className="hidden grid-cols-[1fr_2.5rem_1fr] items-center gap-4 border-b border-line bg-sand px-6 py-3 md:grid lg:px-8">
            <Badge tone="dark" className="justify-self-start">{t("nowLabel")}</Badge>
            <span />
            <Badge tone="accent" className="justify-self-start">{t("afterLabel")}</Badge>
          </div>
          <ul className="divide-y divide-line">
            {projectConditions.map((condition) => (
              <li
                key={condition.id}
                className="grid gap-2 px-5 py-5 sm:px-6 md:grid-cols-[1fr_2.5rem_1fr] md:items-start md:gap-4 lg:px-8"
              >
                <p className="t-body text-muted">
                  <span className="t-label mb-1 block text-ink md:hidden">{t("nowLabel")}</span>
                  {loc(condition.now, locale)}
                </p>
                <ArrowRightIcon className="mt-1.5 hidden h-4 w-4 justify-self-center text-accent-ink md:block" />
                <p className="t-body text-ink">
                  <span className="t-label mb-1 mt-2 block text-accent-ink md:hidden">{t("afterLabel")}</span>
                  {loc(condition.after, locale)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
