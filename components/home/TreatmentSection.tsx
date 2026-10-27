"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./TreatmentSection.module.css";

// 진료과목별 대표 치료 (각 페이지 원고 기준)
const SLIDES = [
  { title: "Smile 4 me", desc: "각막 절편 없이 작은 절개창으로 교정하는 시력교정수술입니다.", href: "/vision/smile" },
  { title: "LASIK / LASEK", desc: "정밀 검사로 각막 상태를 확인해 알맞은 수술 방법을 선택합니다.", href: "/vision/lasik" },
  { title: "프리미엄 백내장 수술", desc: "다초점 인공수정체로 굴절이상과 노안 개선까지 함께 고려합니다.", href: "/cataract/premium" },
  { title: "레이저 백내장 수술", desc: "3D OCT 안구 분석으로 수술의 주요 단계를 미리 계획합니다.", href: "/cataract/laser" },
  { title: "망막박리", desc: "망막이 떨어지는 질환으로, 빠른 진단과 수술이 중요합니다.", href: "/retina/detachment" },
  { title: "당뇨망막병증", desc: "당뇨로 인한 망막 혈관 손상을 단계별로 치료합니다.", href: "/retina/diabetic" },
  { title: "황반변성", desc: "정밀 검사와 꾸준한 치료로 중심 시력을 지켜갑니다.", href: "/retina/macular" },
];

// 원형 화살표 아이콘 (다음 버튼은 CSS로 180도 회전)
const ArrowIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="black" strokeWidth="0.5" />
    <path d="M23 27L16 20L23 13" stroke="black" />
  </svg>
);

/** 진료과목별 대표 치료: 좌측 텍스트·화살표 + 우측으로 넘쳐 보이는 자동 루프 슬라이더 */
export default function TreatmentSection() {
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
              검사 결과에 맞춘
              <br />
              진료과목별 치료
            </h3>
            <div className={styles.dt}>
              <p>
                {SITE.name}는 정해진 수술에 환자를 맞추지 않습니다.
                <br />
                정밀 검사로 눈 상태를 먼저 확인합니다.
              </p>
              <p>
                그 결과를 바탕으로
                <br />
                <b>내 눈에 필요한 치료를 함께 정합니다.</b>
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
            {SLIDES.map((s) => (
              <SwiperSlide key={s.title} className={styles.slide}>
                <Link href={s.href}>
                  <div className={styles.cover}>
                    <Placeholder label={s.title} aspectRatio="540 / 405" />
                  </div>
                  <dl>
                    <dt className={styles.slideTitle}>{s.title}</dt>
                    <dd className={styles.slideDesc}>{s.desc}</dd>
                  </dl>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
