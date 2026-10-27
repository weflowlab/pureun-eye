"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./SurgerySystem.module.css";

const SLIDES = [
  { title: "망막·백내장 수술 장비 구비", desc: "질환과 상태에 맞춰 선택할 수 있는 수술 장비를 갖추고 있습니다." },
  { title: "영상 기반 정밀 분석", desc: "다양한 영상 검사로 눈의 구조를 층별로 확인한 뒤 계획을 세웁니다." },
  { title: "눈 구조에 맞춘 수술 설계", desc: "여러 진단 지표를 종합해 환자에게 맞는 수술 방법을 선택합니다." },
  { title: "수술 결과 예측", desc: "수술 전 기대 시력과 회복 과정을 충분히 설명해 드립니다." },
  { title: "전문의 직접 검토", desc: "모든 검사 결과는 전문의가 직접 확인하고 방향을 제안합니다." },
];

// 원형 화살표 아이콘 (다음 버튼은 CSS로 180도 회전)
const ArrowIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="black" strokeWidth="0.5" />
    <path d="M23 27L16 20L23 13" stroke="black" />
  </svg>
);

/** 맞춤 수술 시스템: 좌측 텍스트·화살표 + 우측으로 넘쳐 보이는 자동 루프 슬라이더 */
export default function SurgerySystem() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.w1280}>
        <div className={styles.txtWrap}>
          <div>
            <span className={styles.subtitle}>
              눈은 모두 <b>다릅니다.</b>
            </span>
            <h3 className={styles.title}>
              눈의 모양과 구조를 고려한
              <br />
              1:1 맞춤 수술
            </h3>
            <div className={styles.dt}>
              <p>
                {SITE.name}는 환자마다 다른 눈 구조를 정밀하게 분석하고
                <br />
                그에 맞춰 검진·설계·수술을 진행합니다.
              </p>
              <p>
                정해진 수술에 환자를 맞추지 않고,
                <br />
                <b>환자의 눈에 필요한 수술을 선택</b>합니다.
              </p>
            </div>
            <div className={styles.navWrap}>
              <button type="button" className={styles.navPrev} onClick={() => swiperRef.current?.slidePrev()} aria-label="이전 슬라이드">
                <ArrowIcon />
              </button>
              <button type="button" className={styles.navNext} onClick={() => swiperRef.current?.slideNext()} aria-label="다음 슬라이드">
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>

        {/* 슬라이더: slidesPerView auto, 3초 자동재생, 루프 */}
        <div className={styles.slideWrap}>
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            slidesPerView="auto"
            spaceBetween={36}
            speed={1000}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            breakpoints={{ 0: { spaceBetween: 16 }, 768: { spaceBetween: 24 }, 1025: { spaceBetween: 36 } }}
            className={styles.swiper}
          >
            {SLIDES.map((s, i) => (
              <SwiperSlide key={s.title} className={styles.slide}>
                <div className={styles.cover}>
                  <Placeholder label={`맞춤 수술 ${i + 1}`} aspectRatio="540 / 405" />
                </div>
                <dl>
                  <dt className={styles.slideTitle}>{s.title}</dt>
                  <dd className={styles.slideDesc}>{s.desc}</dd>
                </dl>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
