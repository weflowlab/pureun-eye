import type { ReactNode } from "react";
import styles from "./retina.module.css";

type Props = {
  title: ReactNode;
  sub?: ReactNode;
  /** 블록 첫 섹션(상단 여백 없음) */
  first?: boolean;
};

/** 섹션 머리: 남색 제목 + 회색 보조 문구 */
export default function SectionHead({ title, sub, first }: Props) {
  return (
    <div className={`${styles.secHead} ${first ? styles.first : ""}`}>
      <h3 className={styles.secTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {title}
      </h3>
      {sub && (
        <p className={styles.secSub} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
          {sub}
        </p>
      )}
    </div>
  );
}
