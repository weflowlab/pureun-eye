"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { Chevron, HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./TreatmentSection.module.css";

// 진료과목별 대표 치료 (각 페이지 원고 기준) — 설명은 모두 두 줄 (줄바꿈은 \n)
const SLIDES = [
  { title: "Smile 4 me", desc: "각막 절편 없이 작은 절개창으로\n교정하는 시력교정수술입니다.", href: "/vision/smile" },
  { title: "LASIK / LASEK", desc: "정밀 검사로 각막 상태를 확인해\n알맞은 수술 방법을 선택합니다.", href: "/vision/lasik" },
  { title: "백내장 수술", desc: "정밀 검사와 생활 방식에 맞춰\n알맞은 인공수정체를 고릅니다.", href: "/cataract/about" },
  { title: "인공수정체 탈구", desc: "수술 후 다시 흐려졌다면\n렌즈 위치와 망막까지 함께 확인합니다.", href: "/cataract/iol" },
  { title: "망막박리", desc: "망막이 떨어지는 질환으로,\n빠른 진단과 수술이 중요합니다.", href: "/retina/detachment" },
  { title: "당뇨망막병증", desc: "당뇨로 인한 망막 혈관 손상을\n단계별로 치료합니다.", href: "/retina/diabetic" },
  { title: "황반변성", desc: "정밀 검사와 꾸준한 치료로\n중심 시력을 지켜갑니다.", href: "/retina/macular" },
];

/** 진료과목별 대표 치료: 공통 머리(우측 화살표) + 오른쪽으로 넘쳐 흐르는 자동 루프 슬라이더 */
export default function TreatmentSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  // 화살표: PC는 머리 우측, 폰은 카드 아래 가운데
  const arrows = (
    <div className={home.arrows}>
      <button type="button" className={home.arrow} onClick={() => swiperRef.current?.slidePrev()} aria-label="이전 치료">
        <Chevron />
      </button>
      <button type="button" className={home.arrow} onClick={() => swiperRef.current?.slideNext()} aria-label="다음 치료">
        <Chevron dir="right" />
      </button>
    </div>
  );

  return (
    <HomeSection tone="white" className={styles.section}>
      <Inner>
        <HomeHead
          eyebrow="TREATMENT"
          title={
            <>
              눈은 모두 다릅니다.
              <br />
              검사 결과에 맞춘 <b>진료과목별 치료</b>
            </>
          }
          sub={
            <>
              {SITE.name}는 정해진 수술에 환자를 맞추지 않습니다.{" "}
              <br />
              <br className={home.moBr} />
              정밀 검사로 눈 상태를 먼저 확인하고, <br className={home.moBr} />
              내 눈에 필요한 치료를 함께 정합니다.
            </>
          }
          action={arrows}
          actionClassName={home.pcOnly}
        />
      </Inner>

      {/* 슬라이더: slidesPerView auto, 3초 자동재생, 루프 */}
      <div className={styles.track} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(sw) => {
            swiperRef.current = sw;
          }}
          slidesPerView="auto"
          spaceBetween={24}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{ 0: { spaceBetween: 14 }, 769: { spaceBetween: 24 } }}
          className={styles.swiper}
        >
          {SLIDES.map((s) => (
            <SwiperSlide key={s.title} className={styles.slide}>
              <Link href={s.href} className={styles.item}>
                <div className={styles.cover}>
                  <Placeholder label={s.title} aspectRatio="4 / 3" />
                </div>
                <p className={styles.title}>{s.title}</p>
                <p className={styles.desc}>
                  {s.desc.split("\n").map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <span className={styles.more}>
                  자세히 보기 <span aria-hidden="true">→</span>
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={home.moOnly}>{arrows}</div>
    </HomeSection>
  );
}
