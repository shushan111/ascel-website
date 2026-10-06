import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectLevels } from "@/data/project";
import { loc } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ImageReveal } from "@/components/motion/ImageReveal";

/** The three occupied levels, each with the room schedule from its plan. */
export async function ProjectLevels({ locale }: { locale: string }) {
  const t = await getTranslations("Levels");

  return (
    <div>
      <SectionHeader title={t("title")} intro={t("subtitle")} layout="split" as="h3" />

      <div className="mt-8 space-y-4 lg:space-y-6">
        {projectLevels.map((level, index) => (
          <article key={level.id} className="card grid overflow-hidden bg-canvas lg:grid-cols-12">
            <ImageReveal className="lg:col-span-7">
              <div className="relative aspect-[3/2] h-full bg-mist">
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

            <div className="p-6 sm:p-8 lg:col-span-5">
              <Badge>{t("elevation", { value: level.elevation })}</Badge>
              <h4 className="t-h3 mt-4 text-balance text-ink">{loc(level.title, locale)}</h4>
              <p className="t-small mt-3 text-muted">{loc(level.summary, locale)}</p>
              <table className="mt-6 w-full text-left">
                <caption className="sr-only">{loc(level.title, locale)}</caption>
                <thead>
                  <tr className="text-[0.84375rem] text-muted">
                    <th scope="col" className="pb-2 font-normal">{t("roomsHeading")}</th>
                    <th scope="col" className="whitespace-nowrap pb-2 text-right font-normal">{t("areaHeading")}</th>
                  </tr>
                </thead>
                <tbody>
                  {level.rooms.map((room) => (
                    <tr key={`${level.id}-${room.no}`}>
                      <th scope="row" className="border-t border-line py-2.5 text-[0.9375rem] font-normal leading-6 text-ink">
                        <span className="mr-3 tabular-nums text-muted">{room.no}</span>
                        {loc(room.name, locale)}
                      </th>
                      <td className="whitespace-nowrap border-t border-line py-2.5 text-right text-[0.9375rem] leading-6 tabular-nums text-muted">
                        {room.area}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="border-t border-ink/60 py-2.5 text-[0.9375rem] font-medium leading-6 text-ink">
                      {t("totalLabel")}
                    </th>
                    <td className="whitespace-nowrap border-t border-ink/60 py-2.5 text-right text-[0.9375rem] font-medium leading-6 tabular-nums text-ink">
                      {level.total} {t("unit")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
