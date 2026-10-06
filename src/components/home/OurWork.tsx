import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { workPhotos, type WorkPhoto } from "@/data/work";
import { courseSortKey, getCoursesByDate, getPhotoCaption } from "@/lib/courseIndex";
import { cn, loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { UpcomingCourseCard } from "@/components/courses/UpcomingCourseCard";

/**
 * A photograph with its caption laid over the lower edge, so a grid of five
 * reads as one composed block rather than five images and five lines of text.
 */
async function Photo({
  photo,
  locale,
  className,
  sizes,
  position = "object-center",
}: {
  photo: WorkPhoto;
  locale: string;
  className?: string;
  sizes: string;
  /** Crop anchor, so faces and hands stay in frame. */
  position?: string;
}) {
  const caption = await getPhotoCaption(photo.course, locale);
  return (
    <figure className={cn("group relative min-h-0", className)}>
      <ImageReveal className="media h-full">
        <div className="relative h-full min-h-48">
          <Image src={photo.src} alt={caption ?? ""} fill sizes={sizes} className={cn("object-cover", position)} />
        </div>
      </ImageReveal>
      {caption ? (
        <figcaption className="t-caption pointer-events-none absolute inset-x-0 bottom-0 rounded-b-md bg-linear-to-t from-night/75 to-transparent px-4 pb-3 pt-10 text-on-dark/90">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The trust section: what has already been done, shown rather than told.
 * Photographs from courses already held, then the next course on the
 * calendar, then the real archive by year.
 */
export async function OurWork({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const coursesT = await getTranslations("CoursesHome");
  const courses = await getCoursesByDate();
  const held = courses.filter((course) => course.status === "past");
  const next = courses.filter((course) => course.status === "upcoming").at(-1);

  // Group by year, newest first. The latest years are listed in full until
  // about seven courses are shown; the rest collapse into year + count.
  const byYear = new Map<number, typeof held>();
  for (const course of held) {
    const year = Math.floor(courseSortKey(course) / 10000);
    if (year) byYear.set(year, [...(byYear.get(year) ?? []), course]);
  }
  const years = [...byYear.entries()];
  const recent: typeof years = [];
  let shown = 0;
  for (const entry of years) {
    if (recent.length && shown + entry[1].length > 7) break;
    recent.push(entry);
    shown += entry[1].length;
  }
  const earlier = years.slice(recent.length);

  return (
    <>
      <Section id="work" tone="paper">
        <Container width="wide">
          <SectionHeader
            layout="split"
            eyebrow={t("workEyebrow")}
            title={t("workTitle")}
            intro={t("workIntro")}
            size="h1"
          />

          {/* A bento of five: one lead frame, two beside it, then a mirrored
              row. Below lg every photo takes a fixed frame. */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,15rem))] lg:gap-4 xl:grid-rows-[repeat(2,minmax(0,17rem))]">
            <Photo
              photo={workPhotos.exfixTeam}
              locale={locale}
              position="object-[center_40%]"
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="aspect-[3/2] sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:aspect-auto"
            />
            <Photo
              photo={workPhotos.kneeHandsOn}
              locale={locale}
              position="object-[center_45%]"
              sizes="(min-width: 1024px) 32vw, 50vw"
              className="aspect-[3/2] lg:col-span-4 lg:aspect-auto"
            />
            <Photo
              photo={workPhotos.hipHandsOn}
              locale={locale}
              position="object-[center_40%]"
              sizes="(min-width: 1024px) 32vw, 50vw"
              className="aspect-[3/2] lg:col-span-4 lg:aspect-auto"
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:mt-4 lg:grid-cols-12 lg:gap-4">
            <Photo
              photo={workPhotos.exfixDetail}
              locale={locale}
              position="object-[center_55%]"
              sizes="(min-width: 1024px) 32vw, 50vw"
              className="hidden aspect-[3/2] sm:block lg:col-span-4 lg:aspect-auto"
            />
            <Photo
              photo={workPhotos.boneHall}
              locale={locale}
              position="object-[center_70%]"
              sizes="(min-width: 1024px) 64vw, 50vw"
              className="aspect-[3/2] lg:col-span-8 lg:aspect-[2.4/1]"
            />
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container width="wide">
          <SectionHeader
            title={t("workListTitle")}
            action={<ArrowLink href="/courses">{coursesT("viewAll")}</ArrowLink>}
          />

          {next ? (
            <div className="mt-10 md:mt-12">
              <p className="t-label mb-3 text-muted">{t("nextCourse")}</p>
              <UpcomingCourseCard course={next} locale={locale} />
            </div>
          ) : null}

          <div className="card mt-6 px-5 py-2 sm:px-8 md:mt-8">
            {recent.map(([year, items]) => (
              <div
                key={year}
                className="grid gap-2 border-b border-line py-5 last:border-b-0 md:grid-cols-[8rem_1fr] md:gap-8 md:py-6"
              >
                <p className="t-figure-sm text-ink">{year}</p>
                <ul>
                  {items.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="group -mx-3 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-0.5 rounded-sm px-3 py-2.5 transition-colors hover:bg-canvas md:grid-cols-[1fr_12rem_auto]"
                      >
                        <span className="text-[1.03125rem] leading-snug text-ink">{loc(course.title, locale)}</span>
                        <span className="t-meta col-start-1 row-start-2 text-muted md:col-start-2 md:row-start-1">
                          {loc(course.date, locale)}
                        </span>
                        <ArrowRightIcon className="col-start-2 row-start-1 h-3.5 w-3.5 self-center text-line-strong transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-ink md:col-start-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {earlier.length ? (
              <div className="grid gap-4 py-5 md:grid-cols-[8rem_1fr] md:gap-8 md:py-6">
                <p className="t-small text-muted md:pt-1">{t("earlierYears")}</p>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {earlier.map(([year, items]) => (
                    <li key={year}>
                      <Link
                        href="/courses"
                        className="group block rounded-sm border border-line px-4 py-3 transition-colors hover:border-ink"
                      >
                        <span className="block font-display text-[1.375rem] leading-none text-ink tabular-nums">{year}</span>
                        <span className="t-caption mt-1.5 block text-muted">{t("coursesCount", { count: items.length })}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
