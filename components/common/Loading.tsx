import styles from "./Loading.module.css";

/** Suspense fallback용 원형 스피너 */
export default function Loading() {
  return (
    <div className={styles.loading} role="status" aria-label="불러오는 중">
      <div className={styles.spinner} />
    </div>
  );
}
