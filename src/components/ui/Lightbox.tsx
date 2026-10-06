"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/icons";

export type LightboxImage = { src: string; alt: string };

/**
 * A photo grid whose tiles open a full-screen viewer. Built on the native
 * <dialog>, which gives focus containment, Escape to close and an inert page
 * behind it for free; arrow keys and swipes step through the set.
 *
 * Replaces opening each photograph in a new tab, which left the visitor with
 * a stack of tabs and no way back to the course.
 */
export function Lightbox({
  images,
  lead = false,
}: {
  images: LightboxImage[];
  /** Show the first photograph at double size. */
  lead?: boolean;
}) {
  const t = useTranslations("Common");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const total = images.length;

  const open = (next: number) => {
    setIndex(next);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setIndex((current) => (current === null ? current : (current + delta + total) % total)),
    [total],
  );

  // Return focus to the tile that opened the viewer, on whichever path closed it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onClose() {
      setIndex((current) => {
        if (current !== null) triggerRefs.current[current]?.focus();
        return null;
      });
    }
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [index]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {images.map((image, i) => {
          const big = lead && i === 0;
          return (
            <li
              key={image.src}
              className={cn(big ? "col-span-2 row-span-2" : "", "aspect-[4/3]", big && "md:aspect-auto")}
            >
              <button
                ref={(node) => {
                  triggerRefs.current[i] = node;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={t("openImage", { index: i + 1, total })}
                className="group media media-zoom block h-full w-full rounded-sm focus-visible:outline-offset-2"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                  loading={i < 5 ? undefined : "lazy"}
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-night/60 text-on-dark opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ExpandIcon className="h-3.5 w-3.5" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t("photoViewer")}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          // A click on the backdrop (the dialog itself, not its content) closes.
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-night/92 backdrop:backdrop-blur-sm open:animate-fade-in"
      >
        {current ? (
          <div
            className="flex h-full flex-col text-on-dark"
            onTouchStart={(event) => {
              touchX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchX.current;
              const end = event.changedTouches[0]?.clientX;
              touchX.current = null;
              if (start === null || end === undefined || Math.abs(end - start) < 40) return;
              step(end < start ? 1 : -1);
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="t-meta tabular-nums text-on-dark/70" aria-live="polite">
                {(index ?? 0) + 1} / {total}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 place-items-center rounded-full text-on-dark transition-colors hover:bg-on-dark/10 focus-visible:outline-on-dark"
                aria-label={t("close")}
                autoFocus
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1" onClick={(event) => event.target === event.currentTarget && close()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="animate-fade-in object-contain px-2 sm:px-20"
                priority
              />
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t("previous")}
                    className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-night/50 text-on-dark transition-colors hover:bg-night/80 focus-visible:outline-on-dark sm:grid sm:left-5"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t("next")}
                    className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-night/50 text-on-dark transition-colors hover:bg-night/80 focus-visible:outline-on-dark sm:grid sm:right-5"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="t-caption line-clamp-2 max-w-2xl text-on-dark/75">{current.alt}</p>
              {total > 1 ? (
                <div className="flex shrink-0 gap-2 sm:hidden">
                  <button type="button" onClick={() => step(-1)} aria-label={t("previous")} className="grid h-11 w-11 place-items-center rounded-full bg-on-dark/10">
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={t("next")} className="grid h-11 w-11 place-items-center rounded-full bg-on-dark/10">
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
