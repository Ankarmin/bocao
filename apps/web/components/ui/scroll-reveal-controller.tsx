"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-scroll-reveal]";
const READY_CLASS = "scroll-reveal-ready";
const VISIBLE_CLASS = "scroll-reveal-visible";

type ScrollRevealControllerProps = {
  scopeId: string;
};

export default function ScrollRevealController({ scopeId }: ScrollRevealControllerProps) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const scope = document.getElementById(scopeId);

    if (!scope) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let observeFrameId: number | null = null;
    let restoreScrollFrameId: number | null = null;
    let previousHtmlScrollBehavior: string | null = null;
    let previousBodyScrollBehavior: string | null = null;

    const getRevealElements = () => Array.from(scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    const resetRevealElements = () => {
      getRevealElements().forEach((element) => {
        element.classList.remove(VISIBLE_CLASS);
      });
    };

    const restoreScrollBehavior = () => {
      if (previousHtmlScrollBehavior === null || previousBodyScrollBehavior === null) {
        return;
      }

      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
      document.body.style.scrollBehavior = previousBodyScrollBehavior;
      previousHtmlScrollBehavior = null;
      previousBodyScrollBehavior = null;
    };

    const scrollToTopInstantly = () => {
      const htmlStyle = document.documentElement.style;
      const bodyStyle = document.body.style;

      restoreScrollBehavior();
      previousHtmlScrollBehavior = htmlStyle.scrollBehavior;
      previousBodyScrollBehavior = bodyStyle.scrollBehavior;

      htmlStyle.scrollBehavior = "auto";
      bodyStyle.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      restoreScrollFrameId = window.requestAnimationFrame(() => {
        restoreScrollBehavior();
        restoreScrollFrameId = null;
      });
    };

    const stopObservers = () => {
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
      scope.classList.remove(READY_CLASS);

      if (observeFrameId !== null) {
        window.cancelAnimationFrame(observeFrameId);
        observeFrameId = null;
      }

      if (restoreScrollFrameId !== null) {
        window.cancelAnimationFrame(restoreScrollFrameId);
        restoreScrollFrameId = null;
      }

      restoreScrollBehavior();
    };

    const showElementsImmediately = () => {
      scope.classList.remove(READY_CLASS);

      getRevealElements().forEach((element) => {
        element.classList.add(VISIBLE_CLASS);
      });
    };

    const observeElements = () => {
      if (!intersectionObserver) {
        return;
      }

      getRevealElements().forEach((element) => {
        if (!element.classList.contains(VISIBLE_CLASS)) {
          intersectionObserver.observe(element);
        }
      });
    };

    const scheduleObserve = () => {
      if (observeFrameId !== null) {
        return;
      }

      observeFrameId = window.requestAnimationFrame(() => {
        observeFrameId = null;
        observeElements();
      });
    };

    const setupReveal = ({ resetScrollPosition = false }: { resetScrollPosition?: boolean } = {}) => {
      stopObservers();

      if (resetScrollPosition) {
        scrollToTopInstantly();
      }

      resetRevealElements();

      if (mediaQuery.matches || !("IntersectionObserver" in window)) {
        showElementsImmediately();
        return;
      }

      scope.classList.add(READY_CLASS);
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(VISIBLE_CLASS);
            intersectionObserver?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.12,
        },
      );

      observeElements();

      mutationObserver = new MutationObserver((mutations) => {
        const hasNewRevealElement = mutations.some((mutation) =>
          Array.from(mutation.addedNodes).some(
            (node) =>
              node instanceof HTMLElement &&
              (node.matches(REVEAL_SELECTOR) || Boolean(node.querySelector(REVEAL_SELECTOR))),
          ),
        );

        if (hasNewRevealElement) {
          scheduleObserve();
        }
      });

      mutationObserver.observe(scope, {
        childList: true,
        subtree: true,
      });
    };

    const handleMotionPreferenceChange = () => {
      setupReveal();
    };

    setupReveal({ resetScrollPosition: true });

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionPreferenceChange);
    } else {
      mediaQuery.addListener(handleMotionPreferenceChange);
    }

    return () => {
      stopObservers();

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      } else {
        mediaQuery.removeListener(handleMotionPreferenceChange);
      }
    };
  }, [pathname, scopeId]);

  return null;
}
