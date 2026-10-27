import Placeholder from "@/components/common/Placeholder";
import styles from "./ComingSoon.module.css";

/** 콘텐츠 작성 전 페이지 자리 표시 */
export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>콘텐츠 준비 중입니다.</p>
      <Placeholder label={`${title} 콘텐츠`} aspectRatio="16 / 7" />
    </section>
  );
}
