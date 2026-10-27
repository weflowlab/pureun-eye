import Link from "next/link";
import styles from "@/components/news/status.module.css";

/** 404 페이지 */
export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.message}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.desc}>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className={styles.btn}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
