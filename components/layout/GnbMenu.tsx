"use client";

import { useEffect, useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import Link from "next/link";
import { HOURS, MENU, SITE, pageHref } from "@/lib/site";
import { getLenis } from "./Providers";
import styles from "./GnbMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  /** 햄버거 버튼 — 닫기(X)를 같은 위치에 둠 */
  anchorRef: RefObject<HTMLElement | null>;
};

/** 전체 메뉴: PC는 위에서 내려오는 풀스크린, 1210px 이하는 우측 슬라이드 */
export default function GnbMenu({ open, onClose, anchorRef }: Props) {
  // 모바일 아코디언: 펼친 대메뉴
  const [expanded, setExpanded] = useState<string | null>(null);
  // 닫기 버튼 위치 (햄버거 중심, 패널 우측 기준)
  const [xPos, setXPos] = useState<CSSProperties>();

  // 열림 동안 페이지 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      html.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  // 스크롤 잠금 후(스크롤바 사라진 상태) 햄버거 위치 측정, 창 크기 바뀌면 다시 측정
  useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const r = anchorRef.current?.getBoundingClientRect();
      if (!r) return;
      setXPos({ top: r.top + r.height / 2, right: window.innerWidth - (r.left + r.width / 2) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, anchorRef]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const openCls = open ? styles.open : "";

  return (
    <>
      {/* 모바일 배경 딤 */}
      <div className={`${styles.backdrop} ${openCls}`} onClick={onClose} />

      <div className={`${styles.gnb} ${openCls}`} aria-hidden={!open}>
        <button type="button" className={styles.xBtn} style={xPos} onClick={onClose} aria-label="메뉴 닫기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className={styles.wrap}>
          <div className={styles.lay}>
            {/* 좌측 영문 타이틀 + 대표전화·진료시간 (PC 전용) */}
            <div className={styles.intro}>
              <p className={styles.eyebrow}>MENU</p>
              <h2 className={styles.tit}>
                {SITE.nameEn.split(" ").slice(0, -2).join(" ") || SITE.nameEn}
                <br />
                {SITE.nameEn.split(" ").slice(-2).join(" ")}
              </h2>
              <a href={`tel:${SITE.tel}`} className={styles.tel} tabIndex={open ? 0 : -1}>
                {SITE.tel}
              </a>
              <dl className={styles.hours}>
                {[HOURS.weekday, HOURS.saturday].map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* 메뉴 목록: 대메뉴 + 하위메뉴 (모바일은 대메뉴 눌러 펼침) */}
            <ul className={styles.dep}>
              {MENU.map((g) => (
                <li key={g.slug} className={expanded === g.slug ? styles.expanded : ""}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === g.slug ? null : g.slug)}
                      aria-expanded={expanded === g.slug}
                      tabIndex={open ? 0 : -1}
                    >
                      <em>{g.labelEn}</em>
                      <span>{g.label}</span>
                    </button>
                  </h3>
                  <ul className={styles.sub}>
                    {g.pages.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={pageHref(g, p)}
                          target={p.external ? "_blank" : undefined}
                          onClick={onClose}
                          tabIndex={open ? 0 : -1}
                        >
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
