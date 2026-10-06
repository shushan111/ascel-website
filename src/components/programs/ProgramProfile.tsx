import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Course, LocalizedString, ProgramDetailContent } from "@/types";
import type { WorkPhoto } from "@/data/work";
import { Link } from "@/i18n/navigation";
import { cn, loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ArrowRightIcon, ExternalIcon, InfoIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getPhotoCaption } from "@/lib/courseIndex";

/**
 * Heading left (sticky on desktop, so it labels the column beside it while
 * the visitor reads), text right: the page's one recurring editorial unit.
 */
function Block({
  title,
  body,
  locale,
  children,
}: {
  title: string;
  body: LocalizedString[];
  locale: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <FadeIn className="lg:sticky lg:top-[calc(var(--header-h)+5rem)]">
          <h2 className="t-h2 text-balance text-ink">{title}</h2>
        </FadeIn>
      </div>
      <div className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-6">
        <FadeIn className="max-w-(--measure) space-y-4">
          {body.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "t-lead text-body" : "t-body text-muted"}>
              {loc(paragraph, locale)}
            </p>
          ))}
        </FadeIn>
        {children}
      </div>
    </div>
  );
}

/**
 * Long-form body for a programme with a full profile, read in the order a
 * donor asks: what it is, what it does, who it is for, what it has achieved.
 * A sticky bar under the header jumps between the chapters.
 */
export async function ProgramProfile({
  detail,
  locale,
  photos = [],
  coursesHeld = [],
}: {
  detail: ProgramDetailContent;
  locale: string;
  photos?: WorkPhoto[];
  coursesHeld?: Course[];
}) {
  const common = await getTranslations("Common");
  const t = await getTranslations("ProgramsPage");
  const home = await getTranslations("Home");
  const coursesT = await getTranslations("CoursesHome");
  const sourceNote = loc(detail.sourceNote, locale);
  const captions = await Promise.all(photos.map((photo) => getPhotoCaption(photo.course, locale)));
  const [lead, ...rest] = photos;

  const chapters = [
    { id: "about", label: loc(detail.about.title, locale) },
    { id: "education", label: loc(detail.education.title, locale) },
    { id: "audience", label: loc(detail.audience.title, locale) },
    { id: "highlights", label: loc(detail.highlights.title, locale) },
    ...(coursesHeld.length ? [{ id: "courses", label: home("workListTitle") }] : []),
  ];

  return (
    <>
      <div className="mt-12 md:mt-16">
        <SectionNav items={chapters} />
      </div>

      {/* What it is. */}
      <Section id="about">
        <Container width="wide" className="space-y-16 md:space-y-24">
          <Block title={loc(detail.about.title, locale)} body={detail.about.body} locale={locale} />
          <Block title={loc(detail.mission.title, locale)} body={detail.mission.body} locale={locale}>
            <ol className="card mt-8 divide-y divide-line px-5 sm:px-7">
              {detail.mission.points.map((point, index) => (
                <li key={index} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4">
                  <span className="font-display text-[0.9375rem] leading-7 tabular-nums text-accent-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="t-body text-ink">{loc(point, locale)}</p>
                </li>
              ))}
            </ol>
          </Block>
        </Container>
      </Section>

      {/* What it does. */}
      <Section id="education" tone="paper">
        <Container width="wide">
          <Block title={loc(detail.education.title, locale)} body={detail.education.body} locale={locale}>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {detail.education.formats.map((format, index) => (
                <li key={index} className="card bg-canvas p-5 sm:p-6">
                  <span className="font-display text-[0.9375rem] tabular-nums text-accent-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h4 mt-2.5 text-ink">{loc(format.title, locale)}</h3>
                  <p className="t-small mt-1.5 text-muted">{loc(format.description, locale)}</p>
                </li>
              ))}
            </ol>
          </Block>
        </Container>

        {lead ? (
          <div className="mx-auto mt-14 grid max-w-[100rem] gap-3 px-5 sm:px-6 md:mt-20 md:grid-cols-12 md:gap-4 md:px-8">
            <figure className="md:col-span-8">
              <ImageReveal className="media">
                <div className="relative aspect-[3/2]">
                  <Image src={lead.src} alt={captions[0] ?? ""} fill className="object-cover" sizes="(min-width: 768px) 64vw, 100vw" />
                </div>
              </ImageReveal>
              {captions[0] ? <figcaption className="t-caption mt-2.5 text-muted">{captions[0]}</figcaption> : null}
            </figure>
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-4 md:grid-cols-1 md:gap-4">
              {rest.slice(0, 2).map((photo, index) => (
                <figure key={photo.src}>
                  <ImageReveal className="media">
                    <div className="relative aspect-[3/2]">
                      <Image src={photo.src} alt={captions[index + 1] ?? ""} fill className="object-cover" sizes="(min-width: 768px) 30vw, 50vw" />
                    </div>
                  </ImageReveal>
                  {captions[index + 1] ? <figcaption className="t-caption mt-2.5 text-muted">{captions[index + 1]}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      {/* Who it is for, and in which fields. */}
      <Section id="audience">
        <Container width="wide" className="space-y-16 md:space-y-24">
          <Block title={loc(detail.audience.title, locale)} body={detail.audience.body} locale={locale}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {detail.audience.groups.map((group, index) => (
                <li key={index} className="card p-5 sm:p-6">
                  <h3 className="t-h4 text-ink">{loc(group.title, locale)}</h3>
                  <p className="t-small mt-1.5 text-muted">{loc(group.description, locale)}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={loc(detail.focusAreas.title, locale)} body={detail.focusAreas.body} locale={locale}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {detail.focusAreas.areas.map((area, index) => (
                <li
                  key={index}
                  title={loc(area.description, locale)}
                  className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-paper px-4 text-[0.9375rem] text-ink"
                >
                  {loc(area.title, locale)}
                </li>
              ))}
            </ul>
          </Block>
        </Container>
      </Section>

      {/* What it has achieved: the milestones, then the course archive. */}
      <Section id="highlights" tone="paper">
        <Container width="wide">
          <Block title={loc(detail.highlights.title, locale)} body={detail.highlights.body} locale={locale}>
            <ol className="relative mt-10">
              <span aria-hidden="true" className="absolute bottom-3 left-[0.3125rem] top-3 w-px bg-line-strong" />
              {detail.highlights.milestones.map((milestone, index) => (
                <li key={index} className="relative pb-8 pl-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-[0.6875rem] w-[0.6875rem] rounded-full border border-ink/50 bg-paper ring-4 ring-paper"
                  />
                  <FadeIn delay={Math.min(index, 4) * 0.04}>
                    <p className="t-meta text-accent-ink">{loc(milestone.date, locale)}</p>
                    <h3 className="t-h4 mt-1.5 text-balance text-ink">{loc(milestone.title, locale)}</h3>
                    <p className="t-small mt-1.5 text-muted">{loc(milestone.description, locale)}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </Block>
        </Container>
      </Section>

      {coursesHeld.length ? (
        <Section id="courses">
          <Container width="wide" className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="t-h2 text-ink">{home("workListTitle")}</h2>
              <p className="t-small mt-3 text-muted">
                {t("results")} · <span className="tabular-nums">{coursesHeld.length}</span>
              </p>
              <ArrowLink href="/courses" className="mt-4">{coursesT("viewAll")}</ArrowLink>
            </div>
            <ul className="card divide-y divide-line px-3 py-2 sm:px-4 lg:col-span-8 xl:col-span-7 xl:col-start-6">
              {coursesHeld.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 rounded-sm px-2 py-3.5 transition-colors hover:bg-canvas sm:grid-cols-[10rem_1fr_auto] sm:px-3"
                  >
                    <span className="t-meta col-span-2 text-muted sm:col-span-1">{loc(course.date, locale)}</span>
                    <span className="text-[1.03125rem] leading-snug text-ink">{loc(course.title, locale)}</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 text-line-strong transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {detail.cta || sourceNote ? (
        <Section tone={coursesHeld.length ? "paper" : "canvas"} space="compact">
          <Container width="wide" className="space-y-6">
            {detail.cta ? (
              <div className="card grid gap-6 p-6 sm:p-8 md:p-10 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-8">
                  <p className="t-label text-accent-ink">{loc(detail.cta.eyebrow, locale)}</p>
                  <h2 className="t-h2 mt-3 text-balance text-ink">{loc(detail.cta.title, locale)}</h2>
                  <p className="t-body mt-4 max-w-xl text-muted">{loc(detail.cta.body, locale)}</p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <a href={detail.cta.url} target="_blank" rel="noopener noreferrer" className={buttonClassName("primary")}>
                    {loc(detail.cta.label, locale)}
                    <ExternalIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">{common("externalLink")}</span>
                  </a>
                </div>
              </div>
            ) : null}
            {sourceNote ? (
              <p className={cn("t-caption flex max-w-3xl gap-2 text-muted")}>
                <InfoIcon className="mt-0.5 h-3.5 w-3.5" />
                {sourceNote}
              </p>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
