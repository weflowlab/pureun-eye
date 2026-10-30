import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./news.module.css";

type Props = {
  current: number;
  total: number;
  /** 게시판 경로 (분류 필터 ?cat= 포함 가능) */
  basePath: string;
};

/** 목록 페이지 이동 버튼 (이전/번호/다음) — page=n 링크 */
export default function Pagination({ current, total, basePath }: Props) {
  if (total <= 1) return null;

  const href = (page: number) => (page === 1 ? basePath : `${basePath}${basePath.includes("?") ? "&" : "?"}page=${page}`);
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  // 이동 불가 버튼은 비활성 스타일의 span으로 렌더
  const navBtn = (page: number, label: ReactNode, aria: string, disabled: boolean) =>
    disabled ? (
      <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`} aria-disabled="true" aria-label={aria}>
        {label}
      </span>
    ) : (
      <Link href={href(page)} className={styles.pageBtn} aria-label={aria}>
        {label}
      </Link>
    );

  return (
    <nav className={styles.pagination} aria-label="페이지 이동">
      {navBtn(current - 1, <ChevronLeft size={20} strokeWidth={2} />, "이전 페이지", current === 1)}
      {pages.map((page) => (
        <Link
          key={page}
          href={href(page)}
          className={`${styles.pageBtn} ${page === current ? styles.pageBtnActive : ""}`}
          aria-current={page === current ? "page" : undefined}
        >
          {page}
        </Link>
      ))}
      {navBtn(current + 1, <ChevronRight size={20} strokeWidth={2} />, "다음 페이지", current === total)}
    </nav>
  );
}
