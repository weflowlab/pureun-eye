"use client";

import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./ReportSection.module.css";

// 샘플 논문 목록 (실제 논문 정보로 교체)
const PAPERS = Array.from({ length: 8 }, (_, i) => ({
  title: `연구 논문 ${i + 1}`,
  description: `Research paper title placeholder ${i + 1}\nAuthor names – Journal name, Year`,
}));

/** 연구 논문 슬라이더: 활성 표지를 중심으로 양옆이 계단식으로 작아지는 3D 스택 + 하단 설명 전환 */
export default function ReportSection() {
  const [active, setActive] = useState(2);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  // 활성 기준 ±2, +3 위치 슬라이드에 단계 클래스 부여
  const updateStack = useCallback((sw: SwiperType) => {
    const idx = sw.activeIndex;
    setActive(idx);
    sw.slides.forEach((el) => el.classList.remove("prevPrev", "nextNext", "beyondNext"));
    sw.slides[idx - 2]?.classList.add("prevPrev");
    sw.slides[idx + 2]?.classList.add("nextNext");
    sw.slides[idx + 3]?.classList.add("beyondNext");
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titWrap}>
          <div className={styles.title}>{SITE.name} 의료진의 연구 논문</div>
          <div className={styles.subtitle}>
            <span className={styles.subtitleBold}>
              꾸준한 연구로 <br className={styles.mBr} />
              진료의 깊이를 더합니다
            </span>
            <br />
            학회 활동과 연구를 바탕으로 신뢰할 수 있는 진료를 이어가겠습니다.
          </div>
        </div>

        <div className={styles.swiperCon}>
          <div className={styles.swiperWrap}>
            {/* 2.5초 자동재생, 루프 없음, 3번째 슬라이드부터 시작 */}
            <Swiper
              modules={[Autoplay, Navigation]}
              initialSlide={2}
              speed={600}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              navigation={{ prevEl: null, nextEl: null }}
              loop={false}
              onBeforeInit={(sw) => {
                const nav = sw.params.navigation as NavigationOptions;
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }}
              onSwiper={updateStack}
              onSlideChange={updateStack}
              className={styles.swiper}
            >
              {PAPERS.map((p) => (
                <SwiperSlide key={p.title} className={styles.slide}>
                  <Placeholder label={p.title} width={187} height={265} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* 바닥 그림자 */}
            <div className={styles.shadowWrap} aria-hidden="true" />
          </div>
          <div className={styles.navNext} ref={nextRef} role="button" aria-label="다음">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="17.5" stroke="#152c6b" />
              <path d="M15 11l7 7-7 7" stroke="#152c6b" />
            </svg>
          </div>
          <div className={styles.navPrev} ref={prevRef} role="button" aria-label="이전">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="17.5" stroke="#152c6b" />
              <path d="M21 11l-7 7 7 7" stroke="#152c6b" />
            </svg>
          </div>
        </div>

        {/* 활성 논문 설명 (겹쳐 놓고 페이드 전환) */}
        <div className={styles.txtWrap}>
          {PAPERS.map((p, i) => (
            <div key={p.title} className={`${styles.txtItem} ${active === i ? styles.txtItemOn : ""}`}>
              {p.description.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
