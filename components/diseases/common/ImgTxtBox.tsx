import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./ImgTxtBox.module.css";

type Props = {
  /** 배경 이미지 라벨 */
  label: string;
  /** 흰 알약 배지 (치료와 예방 등) */
  badge?: ReactNode;
  /** 굵은 강조 문구 */
  lead?: ReactNode;
  /** 일반 굵기 본문 */
  desc?: ReactNode;
};

/** 섹션 사이 600px 배경 이미지 + 중앙 문구 띠 */
export default function ImgTxtBox({ label, badge, lead, desc }: Props) {
  return (
    <div className={styles.box}>
      {/* 배경 이미지 자리 */}
      <Placeholder label={label} dark className={styles.bg} />
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
          suppressHydrationWarning data-aos="fade-up"
          data-aos-duration={badge ? "1000" : "1500"}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
