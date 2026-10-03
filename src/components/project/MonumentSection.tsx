import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectConditions } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Chapter } from "@/components/ui/Chapter";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Chapter one: the building as it stands. Only photographs here — the street
 * facade and the interior — then the survey's damage list, each item paired
 * with the repair the design proposes.
 */
export async function MonumentSection({ locale }: { locale: string }) {
  const t = await getTranslations("Monument");
  const page = await getTranslations("CenterPage");

  return (
    <section className="bg-canvas py-20 md:py-band">
      <Container width="wide">
        <Chapter no="01" label={page("chapterNow")} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-6">
            <h2 className="t-h1 text-balance text-ink">{t("title")}</h2>
          </FadeIn>
          <FadeIn className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="t-body text-muted">{t("subtitle")}</p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-8">
            <ImageReveal>
              <div className="relative aspect-[3/2] bg-mist">
                <Image
                  src="/images/project/facade-before.webp"
                  alt={t("altBefore")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 64vw, 100vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="t-small mt-4 max-w-xl text-muted">{t("captionBefore")}</figcaption>
          </figure>
          <figure className="lg:col-span-4">
            <ImageReveal>
              <div className="relative aspect-[3/2] bg-mist lg:aspect-[4/5]">
                <Image
                  src="/images/project/interior-before.webp"
                  alt={page("interiorAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="t-small mt-4 text-muted">{page("interiorAlt")}</figcaption>
          </figure>
        </div>

        {/* Damage and repair as a two-column ledger: what is wrong on the left,
            what the design does about it on the right. */}
        <div className="mt-16 md:mt-24">
          <div className="hidden grid-cols-2 gap-10 pb-4 text-[0.95rem] text-muted md:grid">
            <span>{t("nowLabel")}</span>
            <span>{t("afterLabel")}</span>
          </div>
          <ul className="border-t border-line">
            {projectConditions.map((condition) => (
              <li
                key={condition.id}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-2 md:gap-10"
              >
                <p className="t-body text-muted">
                  <span className="mr-2 text-[0.9rem] text-ink md:hidden">{t("nowLabel")} —</span>
                  {loc(condition.now, locale)}
                </p>
                <p className="t-body text-ink">
                  <span className="mr-2 text-[0.9rem] text-muted md:hidden">{t("afterLabel")} —</span>
                  {loc(condition.after, locale)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
