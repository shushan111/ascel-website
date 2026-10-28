import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { FacultyMember } from "@/types";
import { loc } from "@/lib/utils";

/** Initials for a faculty member without a headshot: first letters of the first two words. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * The faculty as one list: each headshot beside its name, degree and post,
 * so a face is never shown without the person it belongs to. Members without
 * a photograph get their initials on the same circle, keeping the rows even.
 */
export async function FacultyGrid({
  faculty,
  locale,
  className,
}: {
  faculty: FacultyMember[];
  locale: string;
  className?: string;
}) {
  if (!faculty.length) return null;
  const t = await getTranslations("CoursesPage");

  return (
    <section className={className}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h2 className="t-h3 text-ink">{t("faculty")}</h2>
        <p className="t-meta tabular-nums text-muted">{faculty.length}</p>
      </div>
      <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map((member, index) => {
          const name = loc(member.name, locale);
          const credentials = loc(member.credentials, locale);
          const bio = loc(member.bio, locale);
          return (
            <li key={index} className="flex items-start gap-4">
              {/* A photograph and a monogram share one size, ring and tone, so
                  a row mixing the two still reads as one set. */}
              <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft ring-1 ring-line">
                {member.photo ? (
                  <Image src={member.photo} alt={name} fill className="object-cover object-top" sizes="64px" />
                ) : (
                  <span aria-hidden="true" className="font-display text-[1.0625rem] tracking-[0.04em] text-accent-ink">
                    {initials(name)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="t-h4 text-ink">{name}</h3>
                {credentials ? <p className="t-small mt-0.5 text-body">{credentials}</p> : null}
                {bio ? <p className="t-small mt-2 text-muted">{bio}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
