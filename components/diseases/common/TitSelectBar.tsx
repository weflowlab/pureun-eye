import styles from "./TitSelectBar.module.css";

type Props = {
  items: [string, string, string];
  /** 강조할 항목 인덱스 (기본: 가운데) */
  active?: number;
  aos?: boolean;
};

/** 치료 흐름 표시 바: 남색 알약 안 가운데 항목 강조 */
export default function TitSelectBar({ items, active = 1, aos }: Props) {
  return (
    <div className={styles.bar} suppressHydrationWarning data-aos={aos ? "fade-up" : undefined} data-aos-duration={aos ? "1500" : undefined}>
      {items.map((t, i) => (
        <div key={t} className={`${styles.item} ${i === active ? styles.on : ""}`}>
          {t}
        </div>
      ))}
    </div>
  );
}
