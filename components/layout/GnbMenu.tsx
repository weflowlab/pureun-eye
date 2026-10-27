"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MENU, SITE, pageHref } from "@/lib/site";
import { getLenis } from "./Providers";
import styles from "./GnbMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** 전체 메뉴: PC는 위에서 내려오는 풀스크린, 1210px 이하는 우측 슬라이드 */
export default function GnbMenu({ open, onClose }: Props) {
  // 모바일 아코디언: 펼친 대메뉴
  const [expanded, setExpanded] = useState<string | null>(null);

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
        <button type="button" className={styles.xBtn} onClick={onClose} aria-label="메뉴 닫기">
          <i>✕</i>
        </button>
        <div className={styles.wrap}>
          <div className={styles.lay}>
            {/* 좌측 영문 타이틀 (PC 전용) */}
            <h2 className={styles.tit}>
              {SITE.nameEn.split(" ").slice(0, -2).join(" ") || SITE.nameEn}
              <br />
              {SITE.nameEn.split(" ").slice(-2).join(" ")}
            </h2>
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
