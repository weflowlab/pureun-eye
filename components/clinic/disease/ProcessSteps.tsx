"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./disease.module.css";

type Props = {
  steps: { title: string; desc?: ReactNode }[];
  /** 단계별 사진 (서버에서 그린 Placeholder) */
  images: ReactNode[];
};

/** 수술 과정: 왼쪽 사진은 붙어 있고, 화면 가운데를 지나는 단계가 켜지며 사진도 바뀜 */
export default function ProcessSteps({ steps, images }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // 화면 세로 가운데 띠(40~60%)에 들어온 단계를 활성화
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.process}>
      <div className={styles.processImg}>
        {images.map((img, i) => (
          <div key={i} className={`${styles.processFrame} ${i === active ? styles.on : ""}`}>
            {img}
          </div>
        ))}
      </div>
      <ol className={styles.processList}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className={i === active ? styles.on : ""}
          >
            <p className={styles.processHead}>
              <span>Step {String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </p>
            {s.desc && <p className={styles.processDesc}>{s.desc}</p>}
            {/* 모바일: 단계마다 사진 */}
            <div className={styles.processImgMo}>{images[i]}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
