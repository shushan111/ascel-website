"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type SectionNavItem = { id: string; label: string };

/**
 * A sticky bar of in-page links for long pages (a programme profile, the
 * center project). It sits under the header, marks the section in view and
 * scrolls itself so the active link is always visible on a phone.
 */
export function SectionNav({ items, className }: { items: SectionNavItem[]; className?: string }) {
  const t = useTranslations("Nav");
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band across the upper third of the viewport decides which section is "current".
      { rootMargin: "-20% 0px -65% 0px" },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label={t("onThisPage")}
      className={cn(
        "sticky top-(--header-h) z-30 border-b border-line bg-canvas/92 backdrop-blur-md",
        className,
      )}
    >
      <Container width="wide">
        <ul ref={listRef} className="scroll-x -mx-1 flex gap-1 py-2">
          {items.map((item) => {
            const current = item.id === active;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={current ? "location" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "inline-flex min-h-10 items-center whitespace-nowrap rounded-sm px-3 text-[0.9375rem] transition-colors duration-200",
                    current ? "bg-ink text-on-dark" : "text-muted hover:bg-mist hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
