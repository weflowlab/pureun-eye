import type { ReactNode } from "react";
import styles from "./ContentBlock.module.css";

type Props = {
  children: ReactNode;
  /** 고정 헤더 아래로 시작해야 하는 페이지(상세·개인정보처리방침) */
  headerOffset?: boolean;
};

/** 공지/약관 페이지 공통 흰 배경 컨테이너 */
export default function ContentBlock({ children, headerOffset }: Props) {
  return (
    <div className={`${styles.block} ${headerOffset ? styles.headerOffset : ""}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
