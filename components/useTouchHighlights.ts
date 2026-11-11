"use client";

import { useEffect, useRef } from "react";

export default function useTouchHighlights() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const touch = window.matchMedia("(hover: none), (pointer: coarse)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const groups = Array.from(
      root.querySelectorAll<HTMLElement>("[data-touch-highlight]"),
    );
    const playing = new Map<HTMLElement, () => void>();
    let loaded = document.readyState === "complete";
    let interacted = false;
    let disposed = false;
    let observer: IntersectionObserver | undefined;

    function stop(group: HTMLElement) {
      playing.get(group)?.();
      playing.delete(group);
    }

    function stopAll() {
      groups.forEach(stop);
    }

    function canPlay(group: HTMLElement) {
      return !interacted || group.dataset.touchHighlight === "egg";
    }

    function start(group: HTMLElement) {
      if (playing.has(group) || !canPlay(group)) return;
      const targets = group.matches(".quest-sticker, .nest-egg")
        ? [group]
        : Array.from(
            group.querySelectorAll<HTMLElement>(
              ".featured-character, .beast-card",
            ),
          );
      if (!targets.length) return;

      let timer: ReturnType<typeof setTimeout>;
      let cancelled = false;
      let index = 0;
      const clear = () => {
        targets.forEach((target) => target.removeAttribute("data-auto-active"));
      };
      const next = () => {
        if (cancelled) return;
        clear();
        targets[index].dataset.autoActive = "true";
        index = (index + 1) % targets.length;
        timer = setTimeout(() => {
          clear();
          timer = setTimeout(next, index === 0 ? 4500 : 320);
        }, 1400);
      };

      playing.set(group, () => {
        cancelled = true;
        clearTimeout(timer);
        clear();
      });

      // Wait for visible artwork without making below-the-fold images block it.
      void Promise.all(
        Array.from(group.querySelectorAll("img")).map((image) =>
          image.decode ? image.decode().catch(() => {}) : Promise.resolve(),
        ),
      ).then(() => {
        if (!cancelled) timer = setTimeout(next, 650);
      });
    }

    function sync() {
      observer?.disconnect();
      stopAll();
      if (
        disposed ||
        !loaded ||
        document.hidden ||
        !touch.matches ||
        !motion.matches
      ) {
        return;
      }
      if (!("IntersectionObserver" in window)) {
        groups.forEach(start);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (
            disposed ||
            document.hidden ||
            !touch.matches ||
            !motion.matches
          ) {
            return;
          }
          for (const entry of entries) {
            const group = entry.target as HTMLElement;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              start(group);
            } else {
              stop(group);
            }
          }
        },
        { threshold: 0.35 },
      );
      groups.filter(canPlay).forEach((group) => observer?.observe(group));
    }

    function onLoad() {
      loaded = true;
      sync();
    }

    function onInteract(event: Event) {
      if (
        event.target instanceof Element &&
        event.target.closest("button, input, a")
      ) {
        interacted = true;
        for (const group of groups) {
          if (!canPlay(group)) {
            observer?.unobserve(group);
            stop(group);
          }
        }
      }
    }

    function watch(query: MediaQueryList) {
      if (query.addEventListener) {
        query.addEventListener("change", sync);
        return () => query.removeEventListener("change", sync);
      }
      query.addListener(sync);
      return () => query.removeListener(sync);
    }

    const unwatchTouch = watch(touch);
    const unwatchMotion = watch(motion);
    window.addEventListener("load", onLoad, { once: true });
    document.addEventListener("visibilitychange", sync);
    root.addEventListener("click", onInteract);
    root.addEventListener("focusin", onInteract);
    sync();

    return () => {
      disposed = true;
      observer?.disconnect();
      stopAll();
      unwatchTouch();
      unwatchMotion();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", sync);
      root.removeEventListener("click", onInteract);
      root.removeEventListener("focusin", onInteract);
    };
  }, []);

  return rootRef;
}
