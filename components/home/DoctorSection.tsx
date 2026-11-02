"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { CLINIC_LABEL, DOCTORS } from "@/lib/doctors";
import { Chevron, HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./DoctorSection.module.css";

/** 의료진 소개: 공통 머리(전체 보기 · 화살표) + 사진 카드 슬라이더 (PC 4장 · 폰 1.4장) */
export default function DoctorSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <HomeSection tone="tint">
      <Inner>
        <HomeHead
          eyebrow="DOCTORS"
          title={
            <>
              분야별 전문 의료진이
              <br />
              <b>함께 진료합니다</b>
            </>
          }
          sub="외래클리닉과 망막클리닉 보임의 원장님을 소개합니다."
          action={
            <>
              <Link href="/about/doctors" className={`${home.btn} ${home.btnGhost}`}>
                의료진 전체 보기 <span aria-hidden="true">→</span>
              </Link>
              <div className={home.arrows}>
                <button type="button" className={home.arrow} onClick={() => swiperRef.current?.slidePrev()} aria-label="이전 의료진">
                  <Chevron />
                </button>
                <button type="button" className={home.arrow} onClick={() => swiperRef.current?.slideNext()} aria-label="다음 의료진">
                  <Chevron dir="right" />
                </button>
              </div>
            </>
          }
        />

        <div className={styles.track} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
          <Swiper
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            slidesPerView={4}
            spaceBetween={20}
            speed={700}
            loop
            breakpoints={{
              0: { slidesPerView: 1.4, spaceBetween: 12 },
              600: { slidesPerView: 2.2, spaceBetween: 16 },
              1025: { slidesPerView: 3, spaceBetween: 20 },
              1211: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className={styles.swiper}
          >
            {DOCTORS.map((d) => (
              <SwiperSlide key={d.slug} className={styles.slide}>
                <Link href={`/about/doctors#${d.slug}`} className={`${home.card} ${home.cardLift} ${styles.card}`}>
                  <div className={styles.photo}>
                    <Placeholder label={`${d.name} ${d.title} 사진`} aspectRatio="3 / 4" />
                  </div>
                  <div className={styles.info}>
                    <span className={home.chip}>{CLINIC_LABEL[d.clinic]}</span>
                    <p className={styles.name}>
                      <strong>{d.name}</strong> {d.title}
                    </p>
                    <p className={styles.motto}>“{d.motto}”</p>
                    <p className={styles.fields}>{d.specialties.slice(0, 3).join(" · ")}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Inner>
    </HomeSection>
  );
}
