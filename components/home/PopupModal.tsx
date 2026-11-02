"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./PopupModal.module.css";

type Popup = {
  /** 탭 제목 */
  title: string;
  /** 클릭 시 이동할 주소 (없으면 이미지만 표시) */
  url?: string;
};

// 팝업 목록 (관리자 데이터 연동 전 정적 목록) — 순서대로 탭이 됨
const POPUPS: Popup[] = [
  { title: "진료 시간 변경 안내" },
  { title: "비급여 진료비 안내", url: "/community/notice" },
  { title: "신규 장비 도입" },
  { title: "신분증 지참 안내" },
];

const COOKIE_KEY = "main_popup_hide";

// 쿠키 문자열 구독 (변경 이벤트가 없으므로 구독은 no-op, 서버에서는 null)
const noopSubscribe = () => () => {};

/** 메인 팝업: 화면 가운데 레이어, 아래 탭으로 여러 안내를 전환. "오늘은 그만보기"(자정까지 쿠키) / 닫기 */
export default function PopupModal() {
  const cookie = useSyncExternalStore(noopSubscribe, () => document.cookie, () => null);
  const [closed, setClosed] = useState(false);
  const [active, setActive] = useState(0);

  const open = cookie !== null && !closed && !cookie.includes(`${COOKIE_KEY}=1`);

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

  const current = POPUPS[active];

  return (
    <div className={styles.dim} onClick={() => setClosed(true)}>
      <div className={styles.popup} role="dialog" aria-modal="true" aria-label="안내 팝업" onClick={(e) => e.stopPropagation()}>
        {/* 이미지 영역: 탭마다 한 장 (지금은 플레이스홀더) */}
        <div className={styles.imageWrap}>
          {POPUPS.map((p, i) => {
            const slide = (
              <div
                key={p.title}
                className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
                role="img"
                aria-label={`${p.title} (이미지 자리)`}
                aria-hidden={i !== active}
              >
                <span className={styles.phLabel}>IMAGE · 팝업 {i + 1} · {p.title}</span>
              </div>
            );
            return p.url ? (
              <a
                key={p.title}
                href={p.url}
                className={`${styles.link} ${i === active ? styles.linkActive : ""}`}
                tabIndex={i === active ? 0 : -1}
              >
                {slide}
              </a>
            ) : (
              slide
            );
          })}
        </div>

        {/* 탭: 팝업 제목 */}
        {POPUPS.length > 1 && (
          <div className={styles.tabs} role="tablist">
            {POPUPS.map((p, i) => (
              <button
                key={p.title}
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
