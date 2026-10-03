import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectLevels } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageReveal } from "@/components/motion/ImageReveal";

/** The three occupied levels, each with the room schedule from its plan. */
export async function ProjectLevels({ locale }: { locale: string }) {
  const t = await getTranslations("Levels");

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-16 lg:gap-20">
          {projectLevels.map((level, index) => (
            <div
              key={level.id}
              className="grid items-start gap-10 border-t border-line-strong pt-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-5">
                <p className="t-eyebrow text-accent tabular-nums">
                  {t("elevation", { value: level.elevation })}
                </p>
                <h3 className="t-h3 mt-3 text-balance text-ink">
                  {loc(level.title, locale)}
                </h3>
                <p className="t-body mt-5 text-muted">
                  {loc(level.summary, locale)}
                </p>
                <ImageReveal>
                  <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-md bg-mist">
                    <Image
                      src={level.image}
                      alt={loc(level.imageAlt, locale)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </ImageReveal>
              </div>

              <div className="lg:col-span-7">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    {loc(level.title, locale)}
                  </caption>
                  <thead>
                    <tr className="t-meta-sm text-muted">
                      <th scope="col" className="pb-3 font-normal">
                        {t("roomsHeading")}
                      </th>
                      <th
                        scope="col"
                        className="pb-3 text-right font-normal whitespace-nowrap"
                      >
                        {t("areaHeading")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {level.rooms.map((room) => (
                      <tr key={`${level.id}-${room.no}`}>
                        <th
                          scope="row"
                          className="border-t border-line py-3.5 text-sm leading-6 font-normal text-ink"
                        >
                          <span className="mr-3 text-muted tabular-nums">
                            {room.no}
                          </span>
                          {loc(room.name, locale)}
                        </th>
                        <td className="border-t border-line py-3.5 text-right text-sm leading-6 text-muted tabular-nums whitespace-nowrap">
                          {room.area}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <th
                        scope="row"
                        className="border-t border-line-strong py-3.5 text-sm leading-6 font-semibold text-ink"
                      >
                        {t("totalLabel")}
                      </th>
                      <td className="border-t border-line-strong py-3.5 text-right text-sm leading-6 font-semibold text-ink tabular-nums whitespace-nowrap">
                        {level.total} {t("unit")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
