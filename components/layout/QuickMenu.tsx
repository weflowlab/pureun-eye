"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { SITE } from "@/lib/site";
import { getLenis } from "./Providers";
import ReservationModal from "./ReservationModal";
import styles from "./QuickMenu.module.css";

// 펼침 상태를 localStorage에 저장 (새로고침 후에도 유지)
const STORAGE_KEY = "quickMenuOpen";
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const readOpen = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};
const writeOpen = (v: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(v));
  } catch {}
  listeners.forEach((l) => l());
};

// 퀵메뉴 아이콘 (단순 라인 아이콘)
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const ICONS = {
  kakao: <Icon><path d="M12 4C7 4 3 7.1 3 11c0 2.5 1.7 4.7 4.2 5.9L6.5 20l3.6-2.2c.6.1 1.2.2 1.9.2 5 0 9-3.1 9-7s-4-7-9-7z" /></Icon>,
  consult: <Icon><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></Icon>,
  call: <Icon><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" /></Icon>,
  map: <Icon><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" /></Icon>,
  blog: <Icon><path d="M4 5h16v11H8l-4 4z" /><path d="M8 9h8M8 12h5" /></Icon>,
};

/** 우측 고정 퀵메뉴 + 맨 위로 버튼 */
export default function QuickMenu() {
  const open = useSyncExternalStore(subscribe, readOpen, () => false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => writeOpen(!open);

  // 메뉴 항목 정의
  const items = [
    { key: "kakao", label: "카톡상담", onClick: () => window.open(SITE.kakaoUrl) },
    { key: "consult", label: "상담신청", onClick: () => setModalOpen(true) },
    { key: "call", label: "상담전화", onClick: () => (location.href = `tel:${SITE.tel}`) },
    { key: "map", label: "오시는 길", onClick: () => window.open(SITE.naverMapUrl) },
    { key: "blog", label: "웹블로그", onClick: () => window.open(SITE.blogUrl) },
  ] as const;

  // 맨 위로 (Lenis 사용 시 부드럽게)
  const scrollTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.side}>
        <div className={`${styles.menu} ${open ? styles.on : ""}`}>
          {/* 펼친 상태의 메뉴 */}
          <div className={styles.gnbCont}>
            {items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.item} ${i === 0 ? styles.firstItem : ""}`}
                onClick={item.onClick}
              >
                <span className={styles.icon}>{ICONS[item.key]}</span>
                <span className={styles.label}>{item.label}</span>
              </button>
            ))}
            <button type="button" className={`${styles.item} ${styles.closeBtn}`} onClick={toggle} aria-label="퀵메뉴 접기">
              <span className={styles.icon}>⨉</span>
            </button>
          </div>

          {/* 접힌 상태의 펼치기 탭 */}
          <button type="button" className={styles.toggleBtn} onClick={toggle} aria-label="퀵메뉴 펼치기">
            <span className={styles.toggleIcon}>▶</span>
          </button>
        </div>
      </div>

      {/* 맨 위로 버튼 */}
      <button type="button" className={styles.topBtnWrap} onClick={scrollTop} aria-label="맨 위로">
        <span className={styles.topBtn}>
          <span>▲</span>
        </span>
      </button>

      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
