import Placeholder from "@/components/common/Placeholder";
import styles from "./DiagnosisBox.module.css";

type Props = {
  title: string;
  badge: string;
  items: string[];
  imageLabel: string;
  /** 하단 여백 크게(190px) */
  spacious?: boolean;
};

/** 자가진단 박스: 좌 이미지 / 우 제목·배지·번호 목록 */
export default function DiagnosisBox({ title, badge, items, imageLabel, spacious }: Props) {
  return (
    <div className={`${styles.box} ${spacious ? styles.spacious : ""}`} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1000">
      <div className={styles.img} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1500">
        <Placeholder label={imageLabel} aspectRatio="1 / 1" />
      </div>
      <div suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
        <p className={styles.title}>{title}</p>
        <p className={styles.badge}>{badge}</p>
        <ul className={styles.list}>
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
