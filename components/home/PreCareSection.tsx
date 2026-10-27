"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/common/Placeholder";
import { EXAM_GROUPS, EXAM_TOTAL } from "@/lib/vision";
import styles from "./PreCareSection.module.css";

gsap.registerPlugin(ScrollTrigger);

// 카드: 검사 분류 4개 (분류명·검사 수·대표 검사 3개)
const CARDS = EXAM_GROUPS.map((g) => ({
  title: g.title,
  count: g.items.length,
  sample: g.items.slice(0, 3).map(([name]) => name),
}));

/** 시력교정 수술 전 33가지 검사: 좌측 제목 패널 고정 + 우측 카드 가로 흐름 (PC는 스크롤 고정, 모바일은 손가락 스크롤) */
export default function PreCareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  // PC: 섹션을 고정한 채 세로 스크롤만큼 카드 트랙을 가로로 이동
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport || !sectionRef.current) return;
      // 마지막 카드 오른쪽 끝이 화면 안에 들어올 때까지 이동
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        {/* 좌측 고정 패널 */}
        <div className={styles.panel}>
          <p className={styles.label} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            VISION CORRECTION
          </p>
          <h2 className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            안전한 시력교정은
            <br />
            수술 전 검사에서 시작됩니다
          </h2>
          <p className={styles.total} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
            <b>{EXAM_TOTAL}</b>가지 수술 전 검사
          </p>
          <p className={styles.desc} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
            꼭 필요한 검사를 빠뜨리지 않고,
            <br />
            의료진이 결과를 꼼꼼히 확인합니다.
          </p>
          <Link href="/vision/pre-care" className={styles.more} suppressHydrationWarning data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
            수술 전 진료 시스템 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 우측 카드 트랙 */}
        <div ref={viewportRef} className={styles.viewport}>
          <ul ref={trackRef} className={styles.track}>
            {CARDS.map((c, i) => (
              <li key={c.title} className={styles.card}>
                <div className={styles.cover}>
                  <Placeholder label={`${c.title} 검사`} />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</p>
                  <p className={styles.cardTitle}>
                    {c.title} <span>{c.count}가지</span>
                  </p>
                  <ul className={styles.sample}>
                    {c.sample.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                    <li>외 {c.count - c.sample.length}가지</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
