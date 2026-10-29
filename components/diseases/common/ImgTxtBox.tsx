import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./ImgTxtBox.module.css";

type Props = {
  /** 배경 이미지 라벨 */
  label: string;
  /** 문구 위 작은 라벨 (앞에 가는 선) */
  badge?: ReactNode;
  /** 굵은 강조 문구 */
  lead?: ReactNode;
  /** 일반 굵기 본문 */
  desc?: ReactNode;
};

/** 섹션 사이 배경 이미지 띠: 왼쪽 남색 그라데이션 위에 라벨 · 큰 문장 · 설명 (왼쪽 정렬) */
export default function ImgTxtBox({ label, badge, lead, desc }: Props) {
  return (
    <div className={styles.box}>
      {/* 배경 이미지 자리 (스크롤 시 천천히 움직임) */}
      <div className={styles.bgWrap}>
        <Placeholder label={label} dark className={styles.bg} />
      </div>
      <div className={styles.inner}>
        {badge && (
          <p className={styles.badge} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000">
            {badge}
          </p>
        )}
        {lead && (
          <p className={styles.lead} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            {lead}
          </p>
        )}
        {desc && (
          <p
            className={`${styles.desc} ${badge || lead ? styles.spaced : ""}`}
            suppressHydrationWarning
            data-aos="fade-up"
            data-aos-duration={badge ? "1000" : "1500"}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
