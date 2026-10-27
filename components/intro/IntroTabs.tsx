"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { getLenis } from "@/components/layout/Providers";
import { INTRO_TABS } from "./data";
import styles from "./IntroTabs.module.css";

/** 섹션 바로가기 탭: PC는 버튼, 모바일은 select. 클릭 시 헤더 높이만큼 보정해 부드럽게 스크롤 */
export default function IntroTabs() {
  const [active, setActive] = useState(0);
  const didHashScroll = useRef(false);

  // 섹션으로 스크롤 (Lenis 사용 시 Lenis, 아니면 네이티브)
  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -offset, duration: 1.2, lock: true });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    },
    [],
  );

  const go = useCallback(
    (idx: number) => {
      setActive(idx);
      scrollToId(INTRO_TABS[idx].id);
    },
    [scrollToId],
  );

  // 모바일 select: 이동 후 "카테고리"로 되돌림
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const idx = INTRO_TABS.findIndex((t) => t.id === target.value);
    if (idx >= 0) go(idx);
    setTimeout(() => {
      target.value = "cate";
    }, 1);
  };

  // URL에 equip이 포함되면(/intro#equip 등) 장비안내로 1회 자동 스크롤
  useEffect(() => {
    if (didHashScroll.current || !window.location.href.includes("equip")) return;
    didHashScroll.current = true;
    const idx = INTRO_TABS.findIndex((t) => t.id === "equip");
    const timer = setTimeout(() => go(idx), 300);
    return () => clearTimeout(timer);
  }, [go]);

  return (
    <>
      {/* PC 탭 */}
      <div className={styles.subMPTPc}>
        {INTRO_TABS.map((t, i) => (
          <button
            type="button"
            key={t.id}
            className={`${styles.subMPTBx} ${active === i ? styles.on : ""}`}
            onClick={() => go(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* 모바일 select */}
      <div className={styles.subMPTMo}>
        <select className={styles.subMPTSelect} defaultValue="cate" onChange={onSelect} aria-label="섹션 바로가기">
          <option value="cate">카테고리</option>
          {INTRO_TABS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
