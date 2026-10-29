"use client";

import type { ReactNode } from "react";
import { useStickyProgress } from "./useStickyProgress";
import styles from "./intro.module.css";

type Props = { line1: string; line2: string; highlight: string; body: ReactNode; image: ReactNode };

/** 소개: 위에 제목·글, 아래 사진이 스크롤하면 양옆으로 넓어져 화면을 채움 */
export default function IntroHero({ line1, line2, highlight, body, image }: Props) {
  const ref = useStickyProgress<HTMLElement>();
  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.heroStage}>
        <div className={styles.heroText}>
          <div>
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={styles.heroTitle}>
              <span>{line1}</span>
              <strong className={styles.gradient}>{line2}</strong>
            </h2>
          </div>
          <div>
            <p className={styles.highlight}>{highlight}</p>
            <p className={styles.body}>{body}</p>
          </div>
        </div>
        <div className={styles.heroImg}>{image}</div>
      </div>
    </section>
  );
}
