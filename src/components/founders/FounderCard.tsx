import Image from "next/image";
import type { Founder } from "@/types";
import { loc } from "@/lib/utils";
import { founderName } from "@/components/founders/founderName";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * The portrait fills the card; name and role sit on a gradient drawn in the
 * site's own ink. The short description unfolds on hover, and stays open on
 * touch devices, where there is no hover to reveal it.
 */
export function FounderCard({
  founder,
  locale,
  index = 0,
}: {
  founder: Founder;
  locale: string;
  index?: number;
}) {
  const name = founderName(founder, locale);

  return (
    <FadeIn delay={Math.min(index, 4) * 0.07}>
      <article className="group relative aspect-[3/4] overflow-hidden rounded-md bg-mist">
        <Image
          src={founder.photo}
          alt={name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent transition-[height] duration-500 ease-out group-hover:h-4/5"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          {founder.role ? (
            <p className="t-meta-sm text-on-dark/60">
              {loc(founder.role, locale)}
            </p>
          ) : null}
          <h3 className="t-h4 mt-2 text-balance text-on-dark">{name}</h3>
          {founder.bio ? (
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="t-small mt-3 text-on-dark/85">
                  {loc(founder.bio, locale)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}
