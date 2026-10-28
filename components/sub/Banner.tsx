import type { ReactNode } from "react";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import styles from "./Banner.module.css";

type Props = {
  title: string;
  /** 대메뉴명 (예: "망막클리닉 보임") — 경로 표시에 사용 */
  subtitle: string;
  description?: ReactNode;
  /** 긴 질환명일 때 폰트 축소 */
  compact?: boolean;
};

/** 서브페이지 상단 배너: 낮은 높이, 왼쪽 정렬 (경로 · 제목 · 설명), 글자 쪽만 어둡게 */
export default function Banner({ title, subtitle, description, compact }: Props) {
  return (
    <div className={styles.banner}>
      {/* 배경 이미지 자리 */}
      <Placeholder label={`${title} 상단 배경`} dark className={styles.bg} />
      <div className={styles.inner}>
        {/* 경로: 홈 › 대메뉴 */}
        <nav className={styles.crumb} aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span aria-hidden="true">›</span>
          <span>{subtitle}</span>
        </nav>
        <h1 className={`${styles.title} ${compact ? styles.titleCustom : ""}`}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
