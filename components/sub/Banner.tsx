import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./Banner.module.css";

type Props = {
  title: string;
  /** 대메뉴명 (예: "망막클리닉 보임") */
  subtitle: string;
  description?: ReactNode;
  /** 긴 질환명일 때 폰트 축소 */
  compact?: boolean;
};

/** 서브페이지 상단 풀스크린 배너 (배경 이미지 + 테두리 박스 안 타이틀) */
export default function Banner({ title, subtitle, description, compact }: Props) {
  return (
    <div className={styles.banner}>
      {/* 배경 이미지 자리 */}
      <Placeholder label={`${title} 상단 배경`} dark className={styles.bg} />
      <div className={styles.innerWrap}>
        {/* 테두리 박스: 진입 시 zoom-out */}
        <div className={styles.inner} suppressHydrationWarning data-aos="zoom-out" data-aos-duration="1500">
          <p className={styles.label}>{SITE.nameEn}</p>
          <h1 className={`${styles.title} ${compact ? styles.titleCustom : ""}`}>{title}</h1>
          <div className={styles.line} />
          <p className={styles.subtitle}>
            {SITE.name} {subtitle}
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </div>
  );
}
