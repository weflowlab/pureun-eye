"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import styles from "./community.module.css";

export type Faq = { q: string; a: ReactNode; link?: { href: string; label: string } };
type Group = { title: string; items: Faq[] };

/**
 * 자주묻는질문: 분야 칩(개수) + 가는 선 펼침 목록 (질환 페이지 FAQ와 같은 결).
 * 한 번에 하나만 열림. 접혀 있어도 답은 HTML에 그대로 둠 (높이만 0 — 검색엔진이 읽을 수 있게).
 */
export default function FaqBoard({ groups }: { groups: Group[] }) {
  const [group, setGroup] = useState<string | null>(null); // null = 전체
  const [open, setOpen] = useState<string | null>(null); // 열린 질문

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const shown = groups.filter((g) => !group || g.title === group).flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
  const pick = (g: string | null) => {
    setGroup(g);
    setOpen(null);
  };

  return (
    <>
      {/* 분야 칩 */}
      <div className={styles.chips} role="tablist" aria-label="질문 분야">
        {[{ title: null, count: total }, ...groups.map((g) => ({ title: g.title, count: g.items.length }))].map((c) => (
          <button
            key={c.title ?? "all"}
            type="button"
            role="tab"
            aria-selected={group === c.title}
            className={`${styles.chip} ${group === c.title ? styles.on : ""}`}
            onClick={() => pick(c.title)}
          >
            {c.title ?? "전체"}
            <span>{c.count}</span>
          </button>
        ))}
      </div>

      {/* 질문 목록 */}
      <ul className={styles.list}>
        {shown.map((f, i) => {
          const on = open === f.q;
          return (
            // 열림은 data-open으로 표시 (className을 바꾸지 않음)
            <li key={f.q} className={styles.item} data-open={on}>
              <h3 className={styles.q}>
                <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : f.q)}>
                  <span className={styles.mark} aria-hidden="true">
                    Q
                  </span>
                  <span className={styles.text}>
                    {!group && <span className={styles.tag}>{f.group}</span>}
                    {f.q}
                  </span>
                  <span className={styles.icon} aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-${i}`} className={styles.a} role="region" aria-hidden={!on}>
                <div className={styles.aIn}>
                  <span className={`${styles.mark} ${styles.aMark}`} aria-hidden="true">
                    A
                  </span>
                  <div>
                    <p>{f.a}</p>
                    {f.link && (
                      <Link href={f.link.href} className={styles.link}>
                        {f.link.label} 자세히 보기 →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
