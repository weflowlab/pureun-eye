"use client";

import { useEffect, useRef } from "react";

/**
 * 키 큰 섹션 안에 화면 크기 무대가 붙어 있는(sticky) 연출용.
 * 섹션이 화면에 붙은 뒤 스크롤한 비율(0~1)을 --p 로 넣고, onProgress 로도 알려 줌.
 * 동작 줄이기 설정이면 아무것도 하지 않음 (CSS가 일반 목록으로 보여줌).
 */
export function useStickyProgress<T extends HTMLElement>(onProgress?: (p: number, el: T) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      cb.current?.(p, el);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
