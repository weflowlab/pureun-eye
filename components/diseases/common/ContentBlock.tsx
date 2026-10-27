import type { ReactNode } from "react";
import styles from "./ContentBlock.module.css";

type Props = {
  tone?: "white" | "gray";
  children: ReactNode;
};

/** 1210px 컨테이너 섹션 (상하 150px 여백) */
export default function ContentBlock({ tone = "white", children }: Props) {
  return (
    <section className={`${styles.block} ${styles[tone]}`}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
