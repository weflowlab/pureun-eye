"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SITE } from "@/lib/site";
import styles from "./PhilosophyStatement.module.css";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// 진행 구간 — 단위는 '화면 높이의 몇 배' (섹션이 화면에 붙은 뒤 스크롤한 거리 기준)
const DARK_FROM = 0.1; // 바탕이 어두워지기 시작
const DARK_LEN = 0.4;
const DEPTH_FROM = 0.5; // 윗줄이 뒤로 물러나고 아랫줄이 앞으로 나오기 시작
const DEPTH_LEN = 0.45;
const LIT_AT = 0.8; // '진료하는 이유'에 빛이 들어옴
// 붙어 있는 동안 스크롤되는 거리 (섹션 높이 = 화면 한 장 + 이 값)
const PIN_LEN = 1.35;

// 바탕: 흰색 → 브랜드 남색, 글씨: 진회색 → 흰색
const BG_FROM = [255, 255, 255];
const BG_TO = [15, 28, 63];
const INK_FROM = [39, 39, 39];
const INK_TO = [255, 255, 255];
const mix = (a: number[], b: number[], t: number) => `rgb(${lerp(a[0], b[0], t)}, ${lerp(a[1], b[1], t)}, ${lerp(a[2], b[2], t)})`;

/**
 * 진료이념 마무리 문장 — 화면 한 장이 붙어 있는 동안 스크롤에 맞춰 진행 (weflow 회사소개 FlowStatement 방식):
 *  1) 두 줄이 양옆에서 가운데로 미끄러져 들어옴 (윗줄 왼쪽, 아랫줄 오른쪽)
 *  2) 바탕이 흰색에서 남색으로, 글씨는 진회색에서 흰색으로
 *  3) 윗줄(살피는 것)은 작고 흐리게 뒤로, 아랫줄(진료하는 이유)은 커지며 앞으로
 *  4) '진료하는 이유'에 빛이 들어옴
 * 값은 스크롤 위치로 직접 계산 — 올리면 그대로 되감김.
 */
export default function PhilosophyStatement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 동작 줄이기 설정에서는 CSS가 남색 띠에 문장을 그대로 보여줌
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const s = vh - top; // 섹션 윗변이 화면 바닥을 지난 뒤 스크롤한 거리
      const p = -top / vh; // 화면에 붙은 뒤 스크롤한 거리 (화면 높이의 배수)

      // 1) 등장
      el.style.setProperty("--fs-x", easeOut(clamp01(s / (vh * 1.1))).toFixed(4));

      // 2) 어두워짐 — 글씨는 바탕보다 먼저 밝아짐 (같은 속도면 중간에 둘 다 회색이 되어 글씨가 사라짐)
      const dark = clamp01((p - DARK_FROM) / DARK_LEN);
      el.style.setProperty("--fs-bg", mix(BG_FROM, BG_TO, dark));
      el.style.setProperty("--fs-ink", mix(INK_FROM, INK_TO, clamp01(dark * 1.6)));

      // 3) 앞뒤로 갈라짐
      el.style.setProperty("--fs-z", easeOut(clamp01((p - DEPTH_FROM) / DEPTH_LEN)).toFixed(4));

      // 4) 빛
      el.classList.toggle(styles.lit, p >= LIT_AT);
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

  return (
    <section ref={ref} className={styles.section} style={{ "--fs-len": PIN_LEN } as CSSProperties}>
      <div className={styles.pin}>
        <h2 className={styles.title}>
          <span className={`${styles.line} ${styles.lineA}`}>한 분 한 분의 눈을 정성껏 살피는 것,</span>{" "}
          <span className={`${styles.line} ${styles.lineB}`}>
            {SITE.name}가 <span className={styles.hl}>진료하는 이유</span>입니다.
          </span>
        </h2>
      </div>
    </section>
  );
}
