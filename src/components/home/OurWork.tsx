import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { workPhotos, type WorkPhoto } from "@/data/work";
import {
  courseSortKey,
  getCoursesByDate,
  getPhotoCaption,
} from "@/lib/courseIndex";
import { cn, loc } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * A captioned photograph. `fill` lets the image grow to its column's height
 * on desktop (so stacked photos end flush with a larger neighbour) while
 * keeping a fixed 3:2 frame below lg.
 */
async function Photo({
  photo,
  locale,
  className,
  aspect = "aspect-[3/2]",
  fill = false,
  sizes,
  captionClassName,
  position = "object-center",
}: {
  photo: WorkPhoto;
  locale: string;
  className?: string;
  aspect?: string;
  fill?: boolean;
  sizes: string;
  captionClassName?: string;
  /** Crop anchor, so faces and hands stay in frame when the frame is wider than the photo. */
  position?: string;
}) {
  const caption = await getPhotoCaption(photo.course, locale);
  return (
    <figure className={cn(fill && "lg:flex lg:flex-col", className)}>
      <ImageReveal className={cn(fill && "lg:flex lg:flex-1 lg:flex-col")}>
        <div
          className={cn(
            "relative bg-mist",
            aspect,
            fill && "lg:aspect-auto lg:min-h-40 lg:flex-1",
          )}
        >
          <Image
            src={photo.src}
            alt={caption ?? ""}
            fill
            sizes={sizes}
            className={cn("object-cover", position)}
          />
        </div>
      </ImageReveal>
      {caption ? (
        <figcaption
          className={cn(
            "mt-2 text-[0.8rem] leading-5 text-muted",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The trust section: what has already been done, shown rather than told.
 * Every photograph is from a course already held, captioned from that
 * course's own record, and the list beside it is the real course archive.
 */
export async function OurWork({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  const coursesT = await getTranslations("CoursesHome");
  const held = (await getCoursesByDate()).filter(
    (course) => course.status === "past",
  );

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
      <section
        id="work"
        className="scroll-mt-20 bg-canvas pb-20 pt-24 md:pb-24 md:pt-band"
      >
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <FadeIn className="lg:col-span-7">
              <p className="t-eyebrow text-muted">{t("workEyebrow")}</p>
              <h2 className="t-display mt-5 text-balance text-ink">
                {t("workTitle")}
              </h2>
            </FadeIn>
            <FadeIn className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="t-body max-w-sm text-muted lg:pb-2">
                {t("workIntro")}
              </p>
            </FadeIn>
          </div>

          {/* One main image and two supporting ones, about a quarter lower than
            a 3:2 spread: the main frame is 2:1 on desktop and the right
            column stretches to its height, so both columns end on one line. */}
          <div className="mt-12 grid gap-4 md:mt-14 lg:grid-cols-12">
            <Photo
              photo={workPhotos.exfixTeam}
              locale={locale}
              aspect="aspect-[3/2] md:aspect-[16/9] lg:aspect-[2/1]"
              position="object-[center_40%]"
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="lg:col-span-8"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:flex lg:flex-col">
              <Photo
                photo={workPhotos.kneeHandsOn}
                locale={locale}
                fill
                position="object-[center_45%]"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="lg:flex-1"
              />
              <Photo
                photo={workPhotos.hipHandsOn}
                locale={locale}
                fill
                position="object-[center_40%]"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="lg:flex-1"
              />
            </div>
          </div>

          {/* Second row, mirrored: the close-up on the left stretches to the
            hall photograph's height, so the two rows form one block. */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <Photo
              photo={workPhotos.exfixDetail}
              locale={locale}
              fill
              position="object-[center_55%]"
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="hidden sm:block lg:col-span-4"
            />
            <Photo
              photo={workPhotos.boneHall}
              locale={locale}
              aspect="aspect-[3/2] lg:aspect-[2/1]"
              position="object-[center_70%]"
              sizes="(min-width: 1024px) 64vw, (min-width: 640px) 50vw, 100vw"
              className="lg:col-span-8"
            />
          </div>
        </Container>
      </section>

      {/* The course archive, by year: the heading across the top, then the
        latest years in full width and the earlier years as a compact strip. */}
      <section className="bg-paper py-20 md:py-28">
        <Container width="wide">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
            <h3 className="t-h2 text-ink">{t("workListTitle")}</h3>
            <ArrowLink href="/courses" className="shrink-0">
              {coursesT("viewAll")}
            </ArrowLink>
          </div>

          <div className="mt-10 md:mt-12">
            {recent.map(([year, courses]) => (
              <div
                key={year}
                className="grid gap-3 border-t border-ink/70 pb-8 pt-5 md:grid-cols-[9rem_1fr] md:gap-10"
              >
                <p className="font-display text-[1.75rem] leading-none text-ink tabular-nums">
                  {year}
                </p>
                <ul>
                  {courses.map((course, index) => (
                    <li
                      key={course.id}
                      className={index > 0 ? "border-t border-line" : undefined}
                    >
                      {/* Title and date share one line on desktop; the date
                          drops under the title on a phone. */}
                      <Link
                        href={`/courses/${course.slug}`}
                        className={cn(
                          "group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 md:grid-cols-[1fr_13rem_auto]",
                          index === 0 && "pt-0",
                        )}
                      >
                        <span className="text-[1.05rem] leading-snug text-ink transition-colors duration-300 group-hover:text-accent-ink">
                          {loc(course.title, locale)}
                        </span>
                        <span className="t-meta col-start-1 row-start-2 text-muted md:col-start-2 md:row-start-1">
                          {loc(course.date, locale)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="col-start-2 row-start-1 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-ink md:col-start-3"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {earlier.length ? (
              <div className="grid gap-5 border-t border-ink/70 pt-5 md:grid-cols-[9rem_1fr] md:gap-10">
                <p className="text-[0.95rem] text-muted md:pt-1">
                  {t("earlierYears")}
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
                  {earlier.map(([year, courses]) => (
                    <li key={year}>
                      <Link href="/courses" className="group block">
                        <span className="block font-display text-[1.75rem] leading-none text-ink tabular-nums transition-colors duration-300 group-hover:text-accent-ink">
                          {year}
                        </span>
                        <span className="t-meta mt-2 block text-muted">
                          {t("coursesCount", { count: courses.length })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}
