"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import styles from "./DoctorSection.module.css";

const DOCTORS = [
  {
    name: "유태영",
    title: "대표원장",
    decoTxt: "Representative Director",
    history: [
      ["OO대학교 의과대학 졸업", "OO대학교병원 안과 전공의", "OO대학교병원 망막 전임의", "전 OO안과 원장"],
      ["대한안과학회 정회원", "한국망막학회 정회원", "한국백내장굴절수술학회 정회원", "미국안과학회(AAO) 회원"],
    ],
  },
  {
    name: "원장 성명",
    title: "원장",
    decoTxt: "Ophthalmologist",
    history: [
      ["OO대학교 의과대학 졸업", "OO대학교병원 안과 전공의", "OO대학교병원 안과 임상강사"],
      ["대한안과학회 정회원", "한국망막학회 정회원", "한국포도막학회 정회원"],
    ],
  },
];

// 원형 화살표 아이콘 (다음 버튼은 CSS로 180도 회전)
const ArrowIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="black" strokeWidth="0.5" />
    <path d="M23 27L16 20L23 13" stroke="black" />
  </svg>
);

/** 의료진 소개 슬라이더: 활성 슬라이드만 페이드업, 이름 영역 좌→우 등장 */
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
          <SwiperSlide key={d.name}>
            <div className={styles.imgBox}>
              <Placeholder label={`${d.name} ${d.title} 사진`} aspectRatio="540 / 640" />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.nameWrap}>
                <Placeholder label="심볼" width={48} height={48} className={styles.symbol} />
                <h2>
                  <strong className={styles.name}>{d.name}</strong> <span className={styles.position}>{d.title}</span>
                </h2>
                <div className={styles.decoTxt}>{d.decoTxt}</div>
              </div>
              <div className={styles.sloganWrap}>
                <p className={styles.slogan}>
                  환자의 눈높이에서 <strong>정성으로 진료합니다.</strong>
                </p>
              </div>
              <div className={styles.historyBox}>
                <h3>학력 및 약력</h3>
                <div className={styles.history}>
                  {d.history.map((col, i) => (
                    <ul key={i}>
                      {col.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
              <Link href="/about/doctors" className={styles.moreBtn}>
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
