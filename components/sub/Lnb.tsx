"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { pageHref, type MenuGroup } from "@/lib/site";
import styles from "./Lnb.module.css";

type Props = { group: MenuGroup; current: string };

/** 서브메뉴: PC는 알약형 링크, 1210px 이하는 select */
export default function Lnb({ group, current }: Props) {
  const router = useRouter();

  // 모바일 select 이동 (외부 링크는 새 창)
  const onSelect = (slug: string) => {
    const page = group.pages.find((p) => p.slug === slug);
    if (!page) return;
    if (page.external) window.open(page.external);
    else router.push(pageHref(group, page));
  };

  return (
    <nav className={styles.lnb} aria-label={`${group.label} 메뉴`}>
      {/* PC 링크 */}
      <ul className={styles.pc}>
        {group.pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={pageHref(group, p)}
              className={`${styles.item} ${p.slug === current ? styles.on : ""}`}
              target={p.external ? "_blank" : undefined}
              aria-current={p.slug === current ? "page" : undefined}
            >
              {p.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* 모바일 select */}
      <div className={styles.mo}>
        <select className={styles.select} value={current} onChange={(e) => onSelect(e.target.value)} aria-label="하위 메뉴 이동">
          {group.pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
