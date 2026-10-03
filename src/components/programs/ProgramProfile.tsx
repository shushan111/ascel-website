import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Course, ProgramDetailContent } from "@/types";
import type { WorkPhoto } from "@/data/work";
import { Link } from "@/i18n/navigation";
import { loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ExternalIcon } from "@/components/ui/ExternalIcon";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getPhotoCaption } from "@/lib/courseIndex";

/** Heading left, text right: the page's one recurring editorial unit. */
function Block({
  title,
  body,
  locale,
  children,
}: {
  title: string;
  body: { en?: string; ru: string; hy?: string }[];
  locale: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <FadeIn className="lg:col-span-4">
        <h2 className="t-h2 text-balance text-ink">{title}</h2>
      </FadeIn>
      <div className="lg:col-span-7 lg:col-start-6">
        <FadeIn className="space-y-5">
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
 * Real course photographs break the text where the programme has them.
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

  return (
    <>
      {/* What it is. */}
      <section className="bg-canvas py-20 md:py-28">
        <Container width="wide">
          <Block title={loc(detail.about.title, locale)} body={detail.about.body} locale={locale} />
          <div className="mt-20 md:mt-28">
            <Block title={loc(detail.mission.title, locale)} body={detail.mission.body} locale={locale}>
              <ol className="mt-10 border-t border-line">
                {detail.mission.points.map((point, index) => (
                  <li key={index} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5">
                    <span className="t-meta text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <p className="t-body text-ink">{loc(point, locale)}</p>
                  </li>
                ))}
              </ol>
            </Block>
          </div>
        </Container>
      </section>

      {/* What it does. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide">
          <Block title={loc(detail.education.title, locale)} body={detail.education.body} locale={locale}>
            <ol className="mt-10 border-t border-line">
              {detail.education.formats.map((format, index) => (
                <li key={index} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_1fr] sm:gap-4">
                  <span className="t-meta text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="t-h4 text-ink">{loc(format.title, locale)}</h3>
                    <p className="t-small mt-1.5 text-muted">{loc(format.description, locale)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>
        </Container>

        {lead ? (
          <div className="mx-auto mt-20 grid max-w-[100rem] gap-6 md:mt-28 md:grid-cols-12 md:px-8">
            <figure className="md:col-span-8">
              <ImageReveal>
                <div className="relative aspect-[3/2] bg-mist">
                  <Image src={lead.src} alt={captions[0] ?? ""} fill className="object-cover" sizes="(min-width: 768px) 64vw, 100vw" />
                </div>
              </ImageReveal>
              {captions[0] ? <figcaption className="mt-3 px-5 text-[0.82rem] text-muted sm:px-6 md:px-0">{captions[0]}</figcaption> : null}
            </figure>
            <div className="grid gap-6 px-5 sm:grid-cols-2 sm:px-6 md:col-span-4 md:grid-cols-1 md:px-0">
              {rest.slice(0, 2).map((photo, index) => (
                <figure key={photo.src}>
                  <ImageReveal>
                    <div className="relative aspect-[3/2] bg-mist">
                      <Image src={photo.src} alt={captions[index + 1] ?? ""} fill className="object-cover" sizes="(min-width: 768px) 30vw, 50vw" />
                    </div>
                  </ImageReveal>
                  {captions[index + 1] ? <figcaption className="mt-3 text-[0.82rem] text-muted">{captions[index + 1]}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Who it is for, and in which fields. */}
      <section className="bg-canvas py-20 md:py-28">
        <Container width="wide">
          <Block title={loc(detail.audience.title, locale)} body={detail.audience.body} locale={locale}>
            <ul className="mt-10 grid gap-x-8 border-t border-line sm:grid-cols-2">
              {detail.audience.groups.map((group, index) => (
                <li key={index} className="border-b border-line py-5">
                  <h3 className="t-h4 text-ink">{loc(group.title, locale)}</h3>
                  <p className="t-small mt-1.5 text-muted">{loc(group.description, locale)}</p>
                </li>
              ))}
            </ul>
          </Block>

          <div className="mt-20 md:mt-28">
            <Block title={loc(detail.focusAreas.title, locale)} body={detail.focusAreas.body} locale={locale}>
              <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-2">
                {detail.focusAreas.areas.map((area, index) => (
                  <li key={index} className="border border-line px-3.5 py-2 text-[0.95rem] text-ink" title={loc(area.description, locale)}>
                    {loc(area.title, locale)}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </Container>
      </section>

      {/* What it has achieved: the milestones, then the course archive. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide">
          <Block title={loc(detail.highlights.title, locale)} body={detail.highlights.body} locale={locale}>
            <ol className="mt-10 border-t border-line">
              {detail.highlights.milestones.map((milestone, index) => (
                <li key={index}>
                  <FadeIn delay={Math.min(index, 4) * 0.05}>
                    <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                      <p className="t-meta text-muted tabular-nums">{loc(milestone.date, locale)}</p>
                      <div>
                        <h3 className="t-h4 text-balance text-ink">{loc(milestone.title, locale)}</h3>
                        <p className="t-small mt-2 text-muted">{loc(milestone.description, locale)}</p>
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </Block>

          {coursesHeld.length ? (
            <div className="mt-20 grid gap-6 md:mt-28 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h2 className="t-h2 text-ink">{home("workListTitle")}</h2>
                <p className="t-small mt-3 text-muted">{t("results")} · {coursesHeld.length}</p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <ul className="border-t border-line">
                  {coursesHeld.map((course) => (
                    <li key={course.id} className="border-b border-line">
                      <Link href={`/courses/${course.slug}`} className="group grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                        <span className="t-meta text-muted">{loc(course.date, locale)}</span>
                        <span className="text-[1.02rem] leading-snug text-ink transition-colors duration-300 group-hover:text-accent-ink">
                          {loc(course.title, locale)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ArrowLink href="/courses" className="mt-6">{coursesT("viewAll")}</ArrowLink>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      {detail.cta || sourceNote ? (
        <section className="bg-canvas py-20 md:py-24">
          <Container width="wide" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {detail.cta ? (
              <div className="lg:col-span-7">
                <p className="t-small text-muted">{loc(detail.cta.eyebrow, locale)}</p>
                <h2 className="t-h2 mt-3 text-balance text-ink">{loc(detail.cta.title, locale)}</h2>
                <p className="t-body mt-5 max-w-xl text-muted">{loc(detail.cta.body, locale)}</p>
                <a
                  href={detail.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName("secondary", "mt-8")}
                >
                  {loc(detail.cta.label, locale)}
                  <ExternalIcon />
                  <span className="sr-only">{common("externalLink")}</span>
                </a>
              </div>
            ) : null}
            {sourceNote ? (
              <p className="text-[0.85rem] leading-6 text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
                {sourceNote}
              </p>
            ) : null}
          </Container>
        </section>
      ) : null}
    </>
  );
}
