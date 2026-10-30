"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./HeroSection.module.css";

/**
 * 메인 첫 화면 (weflow 메인 히어로 방식) — 배경 영상만 꽉 채움 (글·버튼 없음).
 * 처음에는 둥근 카드로 떠 있다가 스크롤하면 화면 폭을 꽉 채운다 (진행도 --hero-p 0→1).
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty("--hero-p", Math.min(1, window.scrollY / (window.innerHeight * 0.3)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={styles.wrap} style={{ "--hero-p": 0 } as CSSProperties}>
      <div className={styles.card}>
        {/* 배경 영상 자리 (autoplay · muted · loop) */}
        <Placeholder label="메인 인트로 영상" dark className={styles.media} />
        <div className={styles.veil} aria-hidden="true" />

      </div>
    </section>
  );
}
