"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MENU, groupHref, pageHref } from "@/lib/site";
import styles from "./Banner.module.css";

type Props = { groupSlug: string; pageSlug: string };

/** 배너 아래 경로 알약: 홈 › 대메뉴 ▾ › 현재 페이지 ▾ (각각 눌러서 다른 메뉴로 이동) */
export default function BannerNav({ groupSlug, pageSlug }: Props) {
  const [open, setOpen] = useState<"group" | "page" | null>(null);
  const ref = useRef<HTMLElement>(null);
  const group = MENU.find((g) => g.slug === groupSlug)!;
  const page = group.pages.find((p) => p.slug === pageSlug)!;

  // 바깥을 누르거나 Esc면 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (k: "group" | "page") => setOpen((o) => (o === k ? null : k));

  return (
    <nav ref={ref} className={styles.crumb} aria-label="현재 위치">
      <Link href="/">홈</Link>
      <span className={styles.sep} aria-hidden="true" />

      {/* 대메뉴 */}
      <div className={styles.drop}>
        <button type="button" className={styles.dropBtn} aria-expanded={open === "group"} onClick={() => toggle("group")}>
          {group.label}
        </button>
        {open === "group" && (
          <ul className={styles.dropList}>
            {MENU.map((g) => (
              <li key={g.slug}>
                <Link href={groupHref(g)} className={g.slug === groupSlug ? styles.on : ""} onClick={() => setOpen(null)}>
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={styles.sep} aria-hidden="true" />

      {/* 하위 메뉴 */}
      <div className={styles.drop}>
        <button type="button" className={`${styles.dropBtn} ${styles.current}`} aria-expanded={open === "page"} onClick={() => toggle("page")}>
          {page.label}
        </button>
        {open === "page" && (
          <ul className={styles.dropList}>
            {group.pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={pageHref(group, p)}
                  target={p.external ? "_blank" : undefined}
                  className={p.slug === pageSlug ? styles.on : ""}
                  aria-current={p.slug === pageSlug ? "page" : undefined}
                  onClick={() => setOpen(null)}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
