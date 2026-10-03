import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCourseBySlug, getCourses } from "@/data/courses";
import { loc } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Gallery } from "@/components/ui/Gallery";
import { FacultyStrip } from "@/components/courses/FacultyStrip";
import { courseCover, splitGallery } from "@/lib/media";
import { buttonClassName } from "@/components/ui/buttonStyles";

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

  // The body is Portable Text per locale; fall back the same way `loc` does so
  // an untranslated course still shows its Russian original.
  const body =
    course.body[locale as "ru" | "hy" | "en"] ?? course.body.ru ?? course.body.en;

  const facts = [
    [t("date"), loc(course.date, locale)],
    [t("location"), loc(course.location, locale)],
    [t("instructor"), loc(course.instructor, locale)],
  ].filter(([, value]) => Boolean(value));

  const upcoming = course.status === "upcoming";
  const { events, faculty } = splitGallery(course.gallery);
  const cover = courseCover(course);
  // The cover already shows one frame; the gallery need not repeat it.
  const galleryImages = events.filter((image) => image.url !== cover);
  const gallery = (
    <Gallery images={galleryImages} locale={locale} title={common("gallery")} />
  );

  return (
    <article>
      <header className="bg-canvas pb-12 pt-10 md:pb-16 md:pt-14">
        <Container width="wide">
          <Link
            href="/courses"
            className="inline-flex min-h-9 items-center gap-2 text-[0.92rem] text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            {common("backToCourses")}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              {/* Upcoming is the one state that earns the accent. */}
              <p className="flex items-center gap-3 text-[0.95rem] text-muted">
                {upcoming ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" /> : null}
                <span className={upcoming ? "text-ink" : undefined}>{upcoming ? t("upcoming") : t("past")}</span>
                {loc(course.type, locale) ? <span>· {loc(course.type, locale)}</span> : null}
              </p>
              <h1 className="t-display mt-5 text-balance text-ink">{loc(course.title, locale)}</h1>
              {loc(course.description, locale) ? (
                <p className="t-lead mt-7 max-w-[38rem] text-muted">{loc(course.description, locale)}</p>
              ) : null}
              {course.registrationUrl ? (
                <a
                  href={course.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName("primary", "mt-8")}
                >
                  {common("register")}
                </a>
              ) : null}
            </div>
            {facts.length > 0 ? (
              <dl className="self-end border-t border-ink/70 lg:col-span-4 lg:col-start-9">
                {facts.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3.5">
                    <dt className="text-[0.92rem] text-muted">{label}</dt>
                    <dd className="text-[0.98rem] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </Container>
      </header>

      {cover ? (
        <div className="mx-auto max-w-[100rem] md:px-8">
          <div className="relative aspect-[4/3] bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
            <Image
              src={cover}
              alt={loc(course.imageAlt, locale) || loc(course.title, locale)}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}

      {/* A completed course leads with its photographs — the record of what
          happened; an upcoming one leads with its programme. */}
      {!upcoming && galleryImages.length ? (
        <Container width="wide" className="pt-16 md:pt-24">{gallery}</Container>
      ) : null}

      <Container width="wide" className="pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8 lg:col-start-3">
            <RichText value={body} />
          </div>
        </div>
        {upcoming && galleryImages.length ? <div className="mt-16">{gallery}</div> : null}
        <FacultyStrip images={faculty} locale={locale} className="mt-16 md:mt-24" />

        <div className="mt-16 border-t border-line pt-8">
          <Link href="/courses" className={buttonClassName("secondary")}>
            {common("backToCourses")}
          </Link>
        </div>
      </Container>
    </article>
  );
}
