import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import styles from "./SymptomGrid.module.css";

type Props = {
  title: string;
  subtitle: ReactNode;
  items: ReactNode[];
};

/** 증상 4열 그리드 (이미지 + 설명, 순차 fade-up) */
export default function SymptomGrid({ title, subtitle, items }: Props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {title}
      </p>
      <p className={styles.subtitle} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
        {subtitle}
      </p>
      <div className={styles.grid}>
        {items.map((text, i) => (
          <div key={i} className={styles.item} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
            <div className={styles.img}>
              <Placeholder label={`${title} ${i + 1}`} aspectRatio="1 / 1" />
            </div>
            <p className={styles.text}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
