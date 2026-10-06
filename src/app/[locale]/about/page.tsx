import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getPrograms } from "@/data/programs";
import { getIntroMetrics } from "@/data/metrics";
import { workPhotos } from "@/data/work";
import { getPhotoCaption } from "@/lib/courseIndex";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/ui/PageHeader";
import { WideFigure } from "@/components/ui/WideFigure";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { NextPageCard } from "@/components/ui/NextPageCard";
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
      <PageHeader breadcrumbs={[{ label: nav("about") }]} title={t("title")} intro={t("whoBody")} />

      <WideFigure src={workPhotos.boneHall.src} alt={hallCaption ?? ""} caption={hallCaption} priority />

      {/* Mission and vision: the two sentences the rest of the page supports. */}
      <Section space="default">
        <Container width="wide" className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {(
            [
              ["missionTitle", "missionBody"],
              ["visionTitle", "visionBody"],
            ] as const
          ).map(([title, body], index) => (
            <FadeIn key={title} delay={index * 0.08} className="card flex h-full flex-col p-7 sm:p-10">
              <h2 className="t-eyebrow text-accent-ink">{t(title)}</h2>
              <p className="t-h3 mt-6 text-balance text-ink">{t(body)}</p>
            </FadeIn>
          ))}
        </Container>
      </Section>

      {/* History: dated, from the programmes' own records. */}
      <Section tone="paper">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <SectionHeader title={t("historyTitle")} size="h1" />
            </div>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-3 left-[0.3125rem] top-3 w-px bg-line-strong" />
            {history.map((item, index) => (
              <li key={index} className="relative pb-10 pl-9 last:pb-0">
                <span
                  aria-hidden="true"
                  className={
                    index === history.length - 1
                      ? "absolute left-0 top-2 h-[0.6875rem] w-[0.6875rem] rounded-full bg-accent ring-4 ring-paper"
                      : "absolute left-0 top-2 h-[0.6875rem] w-[0.6875rem] rounded-full border border-ink/50 bg-paper ring-4 ring-paper"
                  }
                />
                <FadeIn>
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="t-figure-sm text-ink">{item.year || ""}</span>
                    {item.program ? <span className="t-label text-muted">{item.program}</span> : null}
                  </p>
                  <h3 className="t-h4 mt-3 text-balance text-ink">{item.title}</h3>
                  <p className="t-small mt-2 max-w-xl text-muted">{item.body}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* How the work is done. */}
      <Section>
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <FadeIn className="lg:col-span-5">
              <h2 className="t-h1 text-balance text-ink">{t("whatTitle")}</h2>
              <p className="t-lead mt-5 text-muted">{t("whatBody")}</p>
            </FadeIn>
            <figure className="lg:col-span-6 lg:col-start-7">
              <ImageReveal className="media">
                <div className="relative aspect-[3/2]">
                  <Image src={workPhotos.exfixPelvis.src} alt={handsOnCaption ?? ""} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              </ImageReveal>
              {handsOnCaption ? <figcaption className="t-caption mt-3 text-muted">{handsOnCaption}</figcaption> : null}
            </figure>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-6 lg:gap-6">
            {approach.map(([title, body], index) => (
              // Five cards as two over three, so the grid never ends on a gap.
              <li key={title} className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <FadeIn delay={(index % 3) * 0.06} className="card h-full p-6 sm:p-7">
                  <span className="font-display text-[0.9375rem] tabular-nums text-accent-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h4 mt-4 text-ink">{t(title)}</h3>
                  <p className="t-small mt-2.5 text-muted">{t(body)}</p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* The people: the faculty and participants, shown as they are. */}
      <Section tone="paper">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="t-h1 text-balance text-ink">{t("peopleTitle")}</h2>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1">
              {metrics
                .filter((metric) => metric.id !== "programs")
                .slice(0, 3)
                .map((metric) => (
                  <div key={metric.id} className="flex flex-col-reverse border-l border-line-strong pl-4">
                    <dt className="t-small mt-2 text-muted">{loc(metric.label, locale)}</dt>
                    <dd className="t-figure-sm text-ink">{metric.display}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8">
              <ArrowLink href="/programs">{nav("programs")}</ArrowLink>
              <ArrowLink href="/courses">{nav("courses")}</ArrowLink>
            </div>
          </div>
          <figure className="lg:col-span-8">
            <ImageReveal className="media">
              <div className="relative aspect-[3/2]">
                <Image src={workPhotos.kneeGroup.src} alt={groupCaption ?? ""} fill className="object-cover" sizes="(min-width: 1024px) 64vw, 100vw" />
              </div>
            </ImageReveal>
            {groupCaption ? <figcaption className="t-caption mt-3 text-muted">{groupCaption}</figcaption> : null}
          </figure>
        </Container>
      </Section>

      <FoundersSection locale={locale} />

      {/* Forward: what the work has led to. */}
      <Section space="compact">
        <Container width="wide">
          <NextPageCard href="/simulation-center" label={t("nextTitle")} title={home("nextLine")} />
        </Container>
      </Section>
    </>
  );
}
