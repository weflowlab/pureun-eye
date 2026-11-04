import type { CSSProperties } from "react";
import { stockFor } from "@/lib/stock";
import styles from "./Placeholder.module.css";

type Props = {
  /** 어떤 이미지가 들어갈 자리인지 (예: "메인 비주얼 1") */
  label: string;
  /** 고정 크기 또는 비율 지정. 미지정 시 부모 크기를 100% 채움 */
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  /** 어두운 배경 위에 놓일 때 (스톡 사진이면 어둡게 덮음) */
  dark?: boolean;
  /** false면 스톡 사진 없이 플레이스홀더 유지 (원장 사진·병원 시설 등) */
  stock?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** 이미지 자리. lib/stock.ts 규칙에 맞는 라벨이면 임시 스톡 사진, 아니면 사선 패턴 플레이스홀더 */
export default function Placeholder({ label, width, height, aspectRatio, dark, stock = true, className, style }: Props) {
  const src = stock ? stockFor(label) : null;
  // 일반 사진은 스크롤 시 커튼 리빌 (배경용 dark는 제외)
  const reveal = dark ? {} : { "data-aos": "reveal", suppressHydrationWarning: true };

  // 임시 스톡 사진
  if (src) {
    return (
      <div
        className={`${styles.stock} ${dark ? styles.stockDark : ""} ${className ?? ""}`}
        style={{ width, height, aspectRatio, ...style }}
        data-stock={label}
        {...reveal}
      >
        {/* 800px 변형(name-800.webp)과 원본(1600px)을 srcset 으로 주면 브라우저가 칸 폭에 맞는 쪽을 받는다.
            next/image 는 최적화를 꺼 둔 상태라 srcset 을 만들지 않으므로 img 를 직접 쓴다. 첫 화면(메인 비주얼·인트로)만 즉시, 나머지는 지연 로드 */}
        {/* eslint-disable-next-line @next/next/no-img-element -- srcset 을 직접 주려고 next/image 대신 img 사용 (이미지 최적화 꺼짐) */}
        <img
          src={src}
          srcSet={`${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1600w`}
          sizes="(max-width: 768px) 100vw, 60vw"
          alt=""
          loading={/^메인 (비주얼|인트로)/.test(label) ? "eager" : "lazy"}
          decoding="async"
          className={styles.stockImg}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label} (이미지 자리)`}
      className={`${styles.ph} ${dark ? styles.dark : ""} ${className ?? ""}`}
      style={{ width, height, aspectRatio, ...style }}
      {...reveal}
    >
      <span className={styles.label}>IMAGE · {label}</span>
    </div>
  );
}
