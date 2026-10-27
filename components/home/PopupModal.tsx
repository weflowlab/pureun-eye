"use client";

import { useState, useSyncExternalStore } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./PopupModal.module.css";

type Popup = {
  seq: number;
  title: string;
  url?: string;
  width: number;
  height: number;
  top: number;
  left: number;
};

// 샘플 팝업 (관리자 데이터 연동 전 정적 목록)
const POPUPS: Popup[] = [{ seq: 1, title: "진료 안내 팝업", width: 500, height: 600, top: 100, left: 120 }];

const cookieKey = (seq: number) => `popup_closed_${seq}`;

// 쿠키 문자열 구독 (변경 이벤트가 없으므로 구독은 no-op, 서버에서는 null)
const noopSubscribe = () => () => {};

/** 첫 방문 팝업: 위치 지정 레이어, "하루동안 열지 않음"(쿠키 1일) / 창닫기 */
export default function PopupModal() {
  const cookie = useSyncExternalStore(noopSubscribe, () => document.cookie, () => null);
  const [closed, setClosed] = useState<number[]>([]);

  // 서버 렌더 단계에서는 표시하지 않음
  if (cookie === null) return null;

  const visible = POPUPS.filter((p) => !closed.includes(p.seq) && !cookie.includes(`${cookieKey(p.seq)}=true`));
  if (visible.length === 0) return null;

  const close = (seq: number) => setClosed((prev) => [...prev, seq]);

  // 24시간 동안 숨김 쿠키 저장 후 닫기
  const closeForDay = (seq: number) => {
    const expires = new Date(Date.now() + 864e5).toUTCString();
    document.cookie = `${cookieKey(seq)}=true; expires=${expires}; path=/`;
    close(seq);
  };

  return (
    <>
      {visible.map((p) => (
        <div key={p.seq} className={styles.popup} style={{ top: p.top, left: p.left, width: p.width }}>
          <div
            className={styles.imageWrap}
            onClick={() => p.url && window.open(p.url, "_blank", "noopener,noreferrer")}
            style={{ cursor: p.url ? "pointer" : "default" }}
          >
            <Placeholder label={p.title} aspectRatio={`${p.width} / ${p.height}`} />
          </div>
          <div className={styles.actions}>
            <label className={styles.oneday}>
              <input type="checkbox" onChange={() => closeForDay(p.seq)} />
              <span>하루동안 이 창을 열지 않음</span>
            </label>
            <button type="button" className={styles.closeBtn} onClick={() => close(p.seq)}>
              창닫기
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
