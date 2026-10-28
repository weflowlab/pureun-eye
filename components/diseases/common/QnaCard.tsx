import type { ReactNode } from "react";
import styles from "./QnaCard.module.css";

type Props = {
  title: ReactNode;
  /** 테두리·제목 색: 진회색 | 남색 */
  tone?: "dark" | "navy";
  /** 데스크톱 고정 높이(290px) + 내용 세로 중앙 */
  fixed?: boolean;
  children: ReactNode;
};

/** 상단에 걸친 알약 제목 + 하단 둥근 카드 (Q&A·장비·관리법 소개) */
export default function QnaCard({ title, tone = "navy", fixed, children }: Props) {
  return (
    <div className={`${styles.card} ${styles[tone]} ${fixed ? styles.fixed : ""}`} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <p className={styles.title}>{title}</p>
      {fixed ? <div className={styles.content}>{children}</div> : children}
    </div>
  );
}

/** 카드 묶음 래퍼 */
export function QnaList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.list} ${className ?? ""}`}>{children}</div>;
}
