"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PopupItem } from "@/lib/popups";
import styles from "./PopupModal.module.css";

const COOKIE_KEY = "main_popup_hide";

// 쿠키 문자열 구독 (변경 이벤트가 없으므로 구독은 no-op, 서버에서는 null)
const noopSubscribe = () => () => {};

/** 메인 팝업: 화면 가운데 레이어, 아래 탭으로 여러 안내를 전환. "오늘은 그만보기"(자정까지 쿠키) / 닫기
 *  팝업 목록은 관리자 '홈페이지 → 팝업' 에서 관리 (서버에서 읽어 props 로 받는다: components/home/PopupModalServer) */
export default function PopupModal({ popups }: { popups: PopupItem[] }) {
  const cookie = useSyncExternalStore(noopSubscribe, () => document.cookie, () => null);
  const [closed, setClosed] = useState(false);
  const [active, setActive] = useState(0);

  const open = popups.length > 0 && cookie !== null && !closed && !cookie.includes(`${COOKIE_KEY}=1`);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setClosed(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  // 오늘 자정까지 숨김 쿠키 저장 후 닫기
  const hideToday = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    document.cookie = `${COOKIE_KEY}=1; expires=${midnight.toUTCString()}; path=/`;
    setClosed(true);
  };

  const current = popups[Math.min(active, popups.length - 1)];

  return (
    <div className={styles.dim} onClick={() => setClosed(true)}>
      <div className={styles.popup} role="dialog" aria-modal="true" aria-label="안내 팝업" onClick={(e) => e.stopPropagation()}>
        {/* 이미지 영역: 탭마다 한 장 */}
        <div className={styles.imageWrap}>
          {popups.map((p, i) => {
            const isActive = i === active;
            const slide = (
              <div key={p.id} className={`${styles.slide} ${isActive ? styles.slideActive : ""}`} aria-hidden={!isActive}>
                <Image src={p.image.url} alt={p.image.alt || p.title} fill sizes="(max-width: 768px) 100vw, 1100px" priority={i === 0} className={styles.img} />
              </div>
            );
            return p.link ? (
              <Link key={p.id} href={p.link} className={`${styles.link} ${isActive ? styles.linkActive : ""}`} tabIndex={isActive ? 0 : -1} aria-label={p.title}>
                {slide}
              </Link>
            ) : (
              slide
            );
          })}
        </div>

        {/* 탭: 팝업 제목 */}
        {popups.length > 1 && (
          <div className={styles.tabs} role="tablist">
            {popups.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* 하단 바 */}
        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn} onClick={hideToday}>
            오늘은 그만보기
          </button>
          <button type="button" className={styles.actionBtn} onClick={() => setClosed(true)} aria-label={`${current.title} 팝업 닫기`}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
