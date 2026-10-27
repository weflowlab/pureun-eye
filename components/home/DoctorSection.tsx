"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { CLINIC_LABEL, DOCTORS } from "@/lib/doctors";
import styles from "./DoctorSection.module.css";

// 원형 화살표 아이콘 (다음 버튼은 CSS로 180도 회전)
const ArrowIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="black" strokeWidth="0.5" />
    <path d="M23 27L16 20L23 13" stroke="black" />
  </svg>
);

/** 의료진 소개 슬라이더 (8인): 활성 슬라이드만 페이드업, 이름 영역 좌→우 등장 */
export default function DoctorSection() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        speed={1000}
        loop
        navigation={{ prevEl: null, nextEl: null }}
        onBeforeInit={(sw) => {
          // 커스텀 화살표 연결
          const nav = sw.params.navigation as NavigationOptions;
          nav.prevEl = prevRef.current;
          nav.nextEl = nextRef.current;
        }}
        className={styles.swiper}
      >
        {DOCTORS.map((d) => (
          <SwiperSlide key={d.slug}>
            <div className={styles.imgBox}>
              <Placeholder label={`${d.name} ${d.title} 사진`} aspectRatio="540 / 640" />
            </div>
            <div className={styles.infoBox}>
              <p className={styles.clinic}>{CLINIC_LABEL[d.clinic]}</p>
              <div className={styles.nameWrap}>
                <Placeholder label="심볼" width={48} height={48} className={styles.symbol} />
                <h2>
                  <strong className={styles.name}>{d.name}</strong> <span className={styles.position}>{d.title}</span>
                </h2>
                <div className={styles.decoTxt}>{d.nameEn}</div>
              </div>
              <div className={styles.sloganWrap}>
                <p className={styles.slogan}>{d.motto}</p>
              </div>
              <div className={styles.historyBox}>
                <h3>진료 분야</h3>
                <ul className={styles.fields}>
                  {d.specialties.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <Link href={`/about/doctors#${d.slug}`} className={styles.moreBtn}>
                View more +
              </Link>
            </div>
          </SwiperSlide>
        ))}

        {/* 좌우 화살표 (슬라이더 중앙 고정) */}
        <div className={styles.btnWrap}>
          <div className={styles.swiperPrev} ref={prevRef} role="button" aria-label="이전 의료진">
            <ArrowIcon />
          </div>
          <div className={styles.swiperNext} ref={nextRef} role="button" aria-label="다음 의료진">
            <ArrowIcon />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
