import type { ReactNode } from "react";
import styles from "./BadgeBox.module.css";

type BoxProps = {
  heading: ReactNode;
  /** 상단 여백: 180(치료 박스) | 90(전략 박스) */
  spacing?: "lg" | "md";
  children: ReactNode;
};

/** 둥근 테두리 박스 + 상단 굵은 제목 (치료법/전략 소개) */
export function BadgeBox({ heading, spacing = "lg", children }: BoxProps) {
  return (
    <div className={`${styles.box} ${styles[spacing]}`} suppressHydrationWarning data-aos={spacing === "md" ? "fade-in" : undefined} data-aos-duration="1500">
      <p className={styles.heading} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {heading}
      </p>
      {children}
    </div>
  );
}

type ItemProps = {
  badge: ReactNode;
  /** 배지와 본문 사이 미디어(이미지 등) */
  media?: ReactNode;
  children?: ReactNode;
  /** 본문 아래 추가 영역 */
  after?: ReactNode;
};

/** 박스 내부 항목: 남색 알약 배지 + 설명 */
export function BadgeItem({ badge, media, children, after }: ItemProps) {
  return (
    <div className={styles.item}>
      <p className={styles.badge} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {badge}
      </p>
      {media}
      {children && (
        <p className={`${styles.desc} ${media ? styles.descSpaced : ""}`} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {children}
        </p>
      )}
      {after}
    </div>
  );
}
