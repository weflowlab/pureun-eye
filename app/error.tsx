"use client";

import { useEffect } from "react";
import styles from "@/components/news/status.module.css";

/** 공통 오류 화면 — 다시 시도 시 세그먼트를 재요청·재렌더 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <p className={`${styles.code} ${styles.codeSmall}`}>ERROR</p>
      <h1 className={styles.message}>일시적인 오류가 발생했습니다</h1>
      <p className={styles.desc}>잠시 후 다시 시도해 주세요.</p>
      <button type="button" className={styles.btn} onClick={() => retry()}>
        다시 시도
      </button>
    </div>
  );
}
