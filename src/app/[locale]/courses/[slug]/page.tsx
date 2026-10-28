import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCourseBySlug, getCourses } from "@/data/courses";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WideFigure } from "@/components/ui/WideFigure";
import { FactList } from "@/components/ui/FactList";
import { Badge } from "@/components/ui/Badge";
import { RichText } from "@/components/ui/RichText";
import { Gallery } from "@/components/ui/Gallery";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { buttonClassName } from "@/components/ui/buttonStyles";
import { ExternalIcon } from "@/components/ui/icons";
import { FacultyStrip } from "@/components/courses/FacultyStrip";
import { FacultyGrid } from "@/components/courses/FacultyGrid";
import { courseCover, splitGallery } from "@/lib/media";
import { withoutRegistration } from "@/lib/courseBody";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return buildMetadata({
    title: `${loc(course.title, locale)} | ASCEL`,
    description: loc(course.description, locale),
    path: `/courses/${course.slug}`,
    locale,
    image: courseCover(course) || course.image,
  });
}

/**
 * A course page: the facts and the registration action stay beside the
 * programme as it scrolls, so "when, where, how do I sign up" is never more
 * than a glance away. A completed course leads with its photographs — the
 * record of what happened; an upcoming one leads with its programme.
 *
 * A completed course with a write-up in the CMS (`recap`) reads as a record:
 * featured photograph, how it went beside the facts, the photographs, the key
 * topics, the programme, the faculty. Registration — the button and the
 * payment terms in the body — is shown only while a course is upcoming.
 */
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const t = await getTranslations("CoursesPage");
  const common = await getTranslations("Common");
  const nav = await getTranslations("Nav");

  // The body is Portable Text per locale; fall back the same way `loc` does so
  // an untranslated course still shows its Russian original.
  const pick = (value: typeof course.body) =>
    value[locale as "ru" | "hy" | "en"] ?? value.ru ?? value.en;
  const upcoming = course.status === "upcoming";
  const body = upcoming ? pick(course.body) : withoutRegistration(pick(course.body));
  const recap = pick(course.recap);

  const facts = [
    [t("date"), loc(course.date, locale)],
    [t("location"), loc(course.location, locale)],
    [t("instructor"), loc(course.instructor, locale)],
  ]
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => ({ label, value }));

  const title = loc(course.title, locale);
  const { events, faculty } = splitGallery(course.gallery);
  const cover = courseCover(course);
  const featured = course.eventPhotos.find((photo) => photo.url === cover);
  // The cover already shows one frame; the gallery need not repeat it.
  const galleryImages = course.eventPhotos.length
    ? course.eventPhotos.filter((photo) => photo !== featured)
    : events.filter((image) => image.url !== cover);
  const credits = [...new Set(course.eventPhotos.map((photo) => photo.credit).filter(Boolean))];
  const gallery = (
    <Gallery
      images={galleryImages}
      // A double-size first tile leaves gaps in the grid unless the count fits it.
      lead={course.eventPhotos.length ? galleryImages.length > 4 && galleryImages.length % 4 === 1 : undefined}
      locale={locale}
      title={common("gallery")}
      credit={credits.length ? t("photosBy", { credit: credits.join(", ") }) : undefined}
    />
  );
  const coverCaption = featured
    ? [loc(featured.caption, locale), featured.credit ? t("photoBy", { credit: featured.credit }) : ""]
        .filter(Boolean)
        .join(" · ")
    : null;
  const highlights = course.highlights.map((item) => loc(item, locale)).filter(Boolean);
  const sectionHeading = (text: string) => (
    <div className="border-b border-line pb-4">
      <h2 className="t-h3 text-ink">{text}</h2>
    </div>
  );

  const highlightsSection = highlights.length ? (
    <section className="mt-14 md:mt-20">
      {sectionHeading(t("highlights"))}
      <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
        {highlights.map((item) => (
          <li key={item} className="t-body flex gap-3 text-body">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  ) : null;

  const register = upcoming && course.registrationUrl ? (
    <a
      href={course.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClassName("primary", "w-full")}
    >
      {common("register")}
      <ExternalIcon className="h-3.5 w-3.5" />
      <span className="sr-only">{common("externalLink")}</span>
    </a>
  ) : null;

  return (
    <article>
      <PageHeader
        breadcrumbs={[{ label: nav("courses"), href: "/courses" }, { label: title }]}
        meta={
          <>
            {upcoming ? (
              <Badge tone="accent" dot>
                {t("upcoming")}
              </Badge>
            ) : (
              <Badge>{t("past")}</Badge>
            )}
            {loc(course.type, locale) ? <Badge>{loc(course.type, locale)}</Badge> : null}
          </>
        }
        title={title}
        intro={loc(course.description, locale) || undefined}
      />

      {cover ? (
        <WideFigure
          src={cover}
          alt={(featured ? loc(featured.alt, locale) : loc(course.imageAlt, locale)) || title}
          caption={coverCaption}
          priority
          // An event photograph is a 4:3 phone frame, not a wide banner: shown
          // less wide and less cropped than an archival cover.
          aspect={featured ? "aspect-[4/3] sm:aspect-[16/9]" : undefined}
          className={featured ? "max-w-[80rem]" : undefined}
        />
      ) : null}

      {recap?.length ? (
        <Container width="wide" className="pb-16 pt-12 md:pb-band md:pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
              <FactList facts={facts} footer={register} />
              <ArrowLink href="/courses" className="mt-4">
                {common("backToCourses")}
              </ArrowLink>
            </aside>
            <section className="min-w-0 lg:col-span-8 xl:col-span-7">
              {sectionHeading(t("recap"))}
              <RichText value={recap} className="mt-6" />
            </section>
          </div>

          {galleryImages.length ? <div className="mt-14 md:mt-20">{gallery}</div> : null}

          {highlightsSection}

          {body?.length ? (
            <section className="mt-14 md:mt-20">
              {sectionHeading(t("programme"))}
              {/* The schedule tables need more room than a reading column. */}
              <RichText value={body} className="max-w-[60rem]" />
            </section>
          ) : null}

          {course.faculty.length ? (
            <FacultyGrid faculty={course.faculty} locale={locale} className="mt-14 md:mt-20" />
          ) : (
            <FacultyStrip images={faculty} locale={locale} className="mt-14 md:mt-20" />
          )}
        </Container>
      ) : (
        <Container width="wide" className="pb-16 pt-12 md:pb-band md:pt-16">
          {!upcoming && galleryImages.length ? <div className="mb-14 md:mb-20">{gallery}</div> : null}

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Facts first on a phone, beside the text from lg. */}
            {facts.length || register ? (
              <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                  <FactList facts={facts} footer={register} />
                  <ArrowLink href="/courses" className="mt-4">
                    {common("backToCourses")}
                  </ArrowLink>
                </div>
              </aside>
            ) : null}
            <div className="min-w-0 lg:col-span-8 xl:col-span-7">
              <RichText value={body} />
            </div>
          </div>

          {highlightsSection}
          {upcoming && galleryImages.length ? <div className="mt-14 md:mt-20">{gallery}</div> : null}
          {course.faculty.length ? (
            <FacultyGrid faculty={course.faculty} locale={locale} className="mt-14 md:mt-20" />
          ) : (
            <FacultyStrip images={faculty} locale={locale} className="mt-14 md:mt-20" />
          )}
        </Container>
      )}
    </article>
  );
}
