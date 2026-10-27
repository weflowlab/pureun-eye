import Placeholder from "@/components/common/Placeholder";
import styles from "./PhotoGrid.module.css";

type Props = {
  items: string[];
  className?: string;
};

/** 385px 정사각 사진 카드 3열 그리드 (하단 남색 알약 라벨) */
export default function PhotoGrid({ items, className }: Props) {
  return (
    <div className={`${styles.grid} ${className ?? ""}`}>
      {items.map((label) => (
        <div key={label} className={styles.item} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label={label} className={styles.bg} />
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}
