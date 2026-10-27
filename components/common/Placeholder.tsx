import type { CSSProperties } from "react";
import styles from "./Placeholder.module.css";

type Props = {
  /** 어떤 이미지가 들어갈 자리인지 (예: "메인 비주얼 1") */
  label: string;
  /** 고정 크기 또는 비율 지정. 미지정 시 부모 크기를 100% 채움 */
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  /** 어두운 배경 위에 놓일 때 */
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** 이미지 자리 표시용 플레이스홀더. 실제 이미지로 교체 시 next/image로 바꾸면 된다. */
export default function Placeholder({ label, width, height, aspectRatio, dark, className, style }: Props) {
  return (
    <div
      role="img"
      aria-label={`${label} (이미지 자리)`}
      className={`${styles.ph} ${dark ? styles.dark : ""} ${className ?? ""}`}
      style={{ width, height, aspectRatio, ...style }}
    >
      <span className={styles.label}>IMAGE · {label}</span>
    </div>
  );
}
