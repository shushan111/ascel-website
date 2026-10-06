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
import { courseCover, splitGallery } from "@/lib/media";

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
    image: course.image,
  });
}

/**
 * A course page: the facts and the registration action stay beside the
 * programme as it scrolls, so "when, where, how do I sign up" is never more
 * than a glance away. A completed course leads with its photographs — the
 * record of what happened; an upcoming one leads with its programme.
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
  const body =
    course.body[locale as "ru" | "hy" | "en"] ?? course.body.ru ?? course.body.en;

  const facts = [
    [t("date"), loc(course.date, locale)],
    [t("location"), loc(course.location, locale)],
    [t("instructor"), loc(course.instructor, locale)],
  ]
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => ({ label, value }));

  const upcoming = course.status === "upcoming";
  const title = loc(course.title, locale);
  const { events, faculty } = splitGallery(course.gallery);
  const cover = courseCover(course);
  // The cover already shows one frame; the gallery need not repeat it.
  const galleryImages = events.filter((image) => image.url !== cover);
  const gallery = <Gallery images={galleryImages} locale={locale} title={common("gallery")} />;

  const register = course.registrationUrl ? (
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
        <WideFigure src={cover} alt={loc(course.imageAlt, locale) || title} priority />
      ) : null}

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

        {upcoming && galleryImages.length ? <div className="mt-14 md:mt-20">{gallery}</div> : null}
        <FacultyStrip images={faculty} locale={locale} className="mt-14 md:mt-20" />
      </Container>
    </article>
  );
}
