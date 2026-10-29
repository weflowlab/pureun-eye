"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import styles from "./disease.module.css";

type Props = {
  /** 정상 시야 / 질환 시야 이미지 (서버에서 그린 Pic) */
  base: ReactNode;
  overlay: ReactNode;
  baseLabel: string;
  overlayLabel: string;
};

/** 시야 비교: 슬라이더를 끌수록 정상 시야 위에 질환 시야가 겹쳐짐 */
export default function VisionSlider({ base, overlay, baseLabel, overlayLabel }: Props) {
  const [v, setV] = useState(50);
  return (
    <div className={styles.vision} style={{ "--v": v / 100 } as CSSProperties}>
      <div className={styles.visionImg}>
        {base}
        <div className={styles.visionOverlay}>{overlay}</div>
      </div>
      <label className={styles.visionCtrl}>
        <span>{baseLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label={`${baseLabel}에서 ${overlayLabel}까지 비교`}
          style={{ "--fill": `${v}%` } as CSSProperties}
        />
        <span>{overlayLabel}</span>
      </label>
    </div>
  );
}
