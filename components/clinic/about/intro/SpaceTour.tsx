"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useStickyProgress } from "./useStickyProgress";
import styles from "./intro.module.css";

type Props = {
  head: ReactNode;
  spaces: { en: string; name: string; desc: string; image: ReactNode }[];
};

/** 공간 소개: 화면이 붙어 있는 동안 세로 스크롤만큼 공간 사진이 가로로 지나감 */
export default function SpaceTour({ head, spaces }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const dist = useRef(0);
  const ref = useStickyProgress<HTMLElement>((p) => {
    if (track.current) track.current.style.transform = `translate3d(${-p * dist.current}px, 0, 0)`;
  });

  // 가로로 이동할 거리만큼 섹션을 키움 (화면 한 장 + 이동 거리)
  useEffect(() => {
    const sec = ref.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const pc = window.matchMedia("(min-width: 1025px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      if (!pc.matches) {
        sec.style.height = "";
        tr.style.transform = "";
        return;
      }
      dist.current = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `${window.innerHeight + dist.current}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    pc.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      pc.removeEventListener("change", measure);
    };
  }, [ref]);

  return (
    <section ref={ref} className={styles.tour}>
      <div className={styles.tourStage}>
        <div ref={track} className={styles.tourTrack}>
          <div className={styles.tourHead}>{head}</div>
          {spaces.map((s) => (
            <figure key={s.en} className={styles.space}>
              <span className={styles.spaceEn} aria-hidden="true">
                {s.en}
              </span>
              <div className={styles.spaceImg}>{s.image}</div>
              <figcaption>
                <p className={styles.spaceName}>{s.name}</p>
                <p className={styles.spaceDesc}>{s.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
