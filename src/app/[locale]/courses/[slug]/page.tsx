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

  return (
    <article>
      <header className="bg-canvas pt-10 pb-14 md:pt-14 md:pb-16">
        <Container>
          <Link
            href="/courses"
            className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                fill="currentColor"
                d="m7.3 3.3.8.8L4.8 7.4h8.7v1.2H4.8l3.3 3.3-.8.8L2.6 8 7.3 3.3Z"
              />
            </svg>
            {common("backToCourses")}
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="t-eyebrow text-accent">
              {course.status === "upcoming" ? t("upcoming") : t("past")}
              {loc(course.type, locale) ? ` / ${loc(course.type, locale)}` : ""}
            </p>
            <h1 className="t-display mt-4 text-balance text-ink">
              {loc(course.title, locale)}
            </h1>
            <p className="t-lead mt-6 text-muted">
              {loc(course.description, locale)}
            </p>
          </div>

          {course.registrationUrl ? (
            <div className="mt-8">
              <a
                href={course.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName("primary")}
              >
                {common("register")}
              </a>
            </div>
          ) : null}
        </Container>
      </header>

      <Container className="mt-10 md:mt-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src={course.image}
            alt={loc(course.imageAlt, locale) || loc(course.title, locale)}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </div>
      </Container>

      {facts.length > 0 ? (
        <Container className="mt-10">
          <dl className="grid gap-x-8 gap-y-6 border-y border-line py-6 sm:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="t-meta-sm text-muted">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}

      <Container className="pt-12 pb-20 md:pt-14 md:pb-28">
        <RichText value={body} />
        <Gallery images={course.gallery} locale={locale} title={common("gallery")} />

        <div className="mt-14 border-t border-line pt-8">
          <Link href="/courses" className={buttonClassName("secondary")}>
            {common("backToCourses")}
          </Link>
        </div>
      </Container>
    </article>
  );
}
