import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectLevels } from "@/data/project";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";

/** The three occupied levels, each with the room schedule from its plan. */
export async function ProjectLevels({ locale }: { locale: string }) {
  const t = await getTranslations("Levels");

  return (
    <Container width="wide">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
          <h3 className="t-h2 text-ink">{t("title")}</h3>
          <p className="t-small max-w-md text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-16 lg:gap-24">
          {projectLevels.map((level, index) => (
            <div
              key={level.id}
              className="grid items-start gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-7">
                <ImageReveal>
                  <div className="relative aspect-[3/2] bg-mist">
                    <Image
                      src={level.image}
                      alt={loc(level.imageAlt, locale)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </ImageReveal>
              </div>

              <div className="lg:col-span-5">
                <p className="t-meta text-muted tabular-nums">
                  {t("elevation", { value: level.elevation })}
                </p>
                <h4 className="t-h3 mt-2 text-balance text-ink">
                  {loc(level.title, locale)}
                </h4>
                <p className="t-body mt-5 text-muted">
                  {loc(level.summary, locale)}
                </p>
                <table className="mt-8 w-full text-left">
                  <caption className="sr-only">
                    {loc(level.title, locale)}
                  </caption>
                  <thead>
                    <tr className="text-[0.85rem] text-muted">
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
                        className="border-t border-ink/60 py-3.5 text-sm leading-6 font-medium text-ink"
                      >
                        {t("totalLabel")}
                      </th>
                      <td className="border-t border-ink/60 py-3.5 text-right text-sm leading-6 font-medium text-ink tabular-nums whitespace-nowrap">
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
  );
}
