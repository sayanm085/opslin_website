"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let hasRevealed = false;
    const reveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      element.classList.add("visible");
      if (
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        element.style.opacity = "1";
        element.style.transform = "none";
        observer.unobserve(element);
        return;
      }
      const delay = Number(element.dataset.revealDelay ?? 0) / 1000;
      element.style.transitionDelay = `${delay}s`;
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(reveal);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
