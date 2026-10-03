"use client";

import { useEffect, useRef } from "react";

/**
 * Marks an element `data-shown` the first time it enters the viewport. The
 * hidden state lives in CSS (`.reveal`, `.reveal-image` in globals.css), so the
 * server and client render the same markup and reduced-motion visitors never
 * see a hidden section.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.dataset.shown = "";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Anything already above the viewport when the observer starts —
          // the visitor scrolled past it before hydration — is shown at once,
          // or it would stay hidden until they scrolled back up.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            (entry.target as HTMLElement).dataset.shown = "";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
