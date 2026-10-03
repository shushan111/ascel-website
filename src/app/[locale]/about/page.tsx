import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getPrograms } from "@/data/programs";
import { getIntroMetrics } from "@/data/metrics";
import { workPhotos } from "@/data/work";
import { getPhotoCaption } from "@/lib/courseIndex";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FoundersSection } from "@/components/sections/FoundersSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    path: "/about",
    locale,
    image: "/images/work/bone2022-hall.webp",
  });
}

const approach = [
  ["simulationTitle", "simulationBody"],
  ["experimentalTitle", "experimentalBody"],
  ["developmentTitle", "developmentBody"],
  ["collaborationTitle", "collaborationBody"],
  ["approachTitle", "approachBody"],
] as const;

/** Milestones picked from each programme's own record, by year. */
const historyPicks: Record<string, string[]> = {
  "gyumri-orthopedic-school": ["The first courses in Gyumri", "A five-course year under the aegis of Eternal Nation", "Polytrauma Seminar and Pelvic Fracture Course"],
  "damage-control-courses": ["The French-Armenian conference in Yerevan", "The first year of teaching", "Larger groups and seven new courses"],
};

/**
 * About is the trust page: who we are, what the work has been and since when,
 * how it is done and by whom. Every image is a photograph from a course; the
 * history is assembled from the programmes' own published milestones. The
 * founders appear only once their real names and portraits are in the Studio.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const home = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const programs = await getPrograms();
  const metrics = getIntroMetrics();

  const history = programs
    .flatMap((program) =>
      (program.detail?.highlights.milestones ?? [])
        .filter((milestone) => historyPicks[program.slug]?.includes(milestone.title.en ?? ""))
        .map((milestone) => ({
          year: Number(milestone.date.en?.match(/\d{4}/)?.[0] ?? 0),
          program: loc(program.shortTitle, locale),
          title: loc(milestone.title, locale),
          body: loc(milestone.description, locale),
        })),
    )
    .concat([
      {
        year: Number(t("timelineItem1Date")),
        program: "",
        title: t("timelineItem1Title"),
        body: t("timelineItem1Body"),
      },
    ])
    .sort((a, b) => a.year - b.year);

  const [hallCaption, groupCaption, handsOnCaption] = await Promise.all([
    getPhotoCaption(workPhotos.boneHall.course, locale),
    getPhotoCaption(workPhotos.kneeGroup.course, locale),
    getPhotoCaption(workPhotos.exfixPelvis.course, locale),
  ]);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("whoBody")} />

      <figure className="mx-auto max-w-[100rem] md:px-8">
        <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image src={workPhotos.boneHall.src} alt={hallCaption ?? ""} fill priority className="object-cover" sizes="100vw" />
        </div>
        {hallCaption ? (
          <figcaption className="mt-3 px-5 text-[0.82rem] text-muted sm:px-6 md:px-0">{hallCaption}</figcaption>
        ) : null}
      </figure>

      {/* Mission and vision, set large: the two sentences the rest supports. */}
      <section className="bg-canvas py-20 md:py-28">
        <Container width="wide" className="grid gap-14 md:grid-cols-2 md:gap-10">
          {(
            [
              ["missionTitle", "missionBody"],
              ["visionTitle", "visionBody"],
            ] as const
          ).map(([title, body]) => (
            <FadeIn key={title}>
              <h2 className="border-t border-ink/70 pt-4 text-[0.95rem] text-muted">{t(title)}</h2>
              <p className="t-h3 mt-6 max-w-xl text-balance text-ink">{t(body)}</p>
            </FadeIn>
          ))}
        </Container>
      </section>

      {/* History: dated, from the programmes' own records. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="t-h1 text-ink lg:sticky lg:top-28">{t("historyTitle")}</h2>
          </div>
          <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
            {history.map((item, index) => (
              <li key={index} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[6rem_1fr] sm:gap-8">
                <p className="font-display text-[1.6rem] font-normal leading-none text-ink tabular-nums">{item.year || ""}</p>
                <div>
                  {item.program ? <p className="text-[0.88rem] text-muted">{item.program}</p> : null}
                  <h3 className="t-h4 mt-1 text-balance text-ink">{item.title}</h3>
                  <p className="t-small mt-2 text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* How the work is done. */}
      <section className="bg-canvas py-20 md:py-28">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <h2 className="t-h1 text-balance text-ink">{t("whatTitle")}</h2>
              <p className="t-lead mt-6 text-muted">{t("whatBody")}</p>
            </FadeIn>
            <figure className="lg:col-span-6 lg:col-start-7">
              <ImageReveal>
                <div className="relative aspect-[3/2] bg-mist">
                  <Image src={workPhotos.exfixPelvis.src} alt={handsOnCaption ?? ""} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              </ImageReveal>
              {handsOnCaption ? <figcaption className="mt-3 text-[0.82rem] text-muted">{handsOnCaption}</figcaption> : null}
            </figure>
          </div>
          <ul className="mt-16 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {approach.map(([title, body]) => (
              <li key={title} className="border-b border-line py-8">
                <h3 className="t-h4 text-ink">{t(title)}</h3>
                <p className="t-small mt-3 text-muted">{t(body)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The people: the faculty and participants, shown as they are. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="t-h1 text-balance text-ink">{t("peopleTitle")}</h2>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-1">
              {metrics.slice(0, 3).filter((metric) => metric.id !== "programs").map((metric) => (
                <div key={metric.id} className="flex flex-col-reverse">
                  <dt className="t-small mt-2 text-muted">{loc(metric.label, locale)}</dt>
                  <dd className="font-display text-[2.6rem] font-normal leading-none text-ink">{metric.display}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8">
              <ArrowLink href="/programs">{nav("programs")}</ArrowLink>
              <ArrowLink href="/courses">{nav("courses")}</ArrowLink>
            </div>
          </div>
          <figure className="lg:col-span-8">
            <ImageReveal>
              <div className="relative aspect-[3/2] bg-mist">
                <Image src={workPhotos.kneeGroup.src} alt={groupCaption ?? ""} fill className="object-cover" sizes="(min-width: 1024px) 64vw, 100vw" />
              </div>
            </ImageReveal>
            {groupCaption ? <figcaption className="mt-3 text-[0.82rem] text-muted">{groupCaption}</figcaption> : null}
          </figure>
        </Container>
      </section>

      <FoundersSection locale={locale} />

      {/* Forward: what the work has led to. */}
      <section className="bg-canvas py-20 md:py-24">
        <Container width="wide" className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="text-[0.95rem] text-muted">{t("nextTitle")}</p>
            <p className="t-h2 mt-4 text-balance text-ink">{home("nextLine")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ArrowLink href="/simulation-center">{nav("simulation")}</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}
