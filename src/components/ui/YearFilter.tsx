"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type YearGroup = { year: number; count: number; content: React.ReactNode };

/**
 * Filter chips over a list grouped by year. The groups are rendered on the
 * server and passed in; this only decides which are shown. "All" is the
 * default, so the full archive is what a visitor without JS sees.
 */
export function YearFilter({ groups }: { groups: YearGroup[] }) {
  const t = useTranslations("Common");
  const [selected, setSelected] = useState<number | null>(null);
  const total = groups.reduce((sum, group) => sum + group.count, 0);

  const chips: Array<{ value: number | null; label: string; count: number }> = [
    { value: null, label: t("all"), count: total },
    ...groups.map((group) => ({ value: group.year, label: String(group.year || "—"), count: group.count })),
  ];

  return (
    <div>
      <div role="group" aria-label={t("filterByYear")} className="scroll-x -mx-5 flex gap-2 px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((chip) => {
          const active = selected === chip.value;
          return (
            <button
              key={chip.label}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(chip.value)}
              className={cn(
                "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.9375rem] tabular-nums transition-colors duration-200",
                active
                  ? "border-ink bg-ink text-on-dark"
                  : "border-line-strong bg-paper text-ink hover:border-ink",
              )}
            >
              {chip.label}
              <span className={cn("text-[0.8125rem]", active ? "text-on-dark/65" : "text-muted")}>{chip.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-14 md:mt-12 md:space-y-16">
        {groups
          .filter((group) => selected === null || group.year === selected)
          .map((group) => (
            <div key={group.year} className="animate-fade-in">
              {group.content}
            </div>
          ))}
      </div>
    </div>
  );
}
