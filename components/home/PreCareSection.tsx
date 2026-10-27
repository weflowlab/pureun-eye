"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { EXAM_GROUPS, EXAM_TOTAL } from "@/lib/vision";
import styles from "./PreCareSection.module.css";

gsap.registerPlugin(ScrollTrigger);

// 슬라이드: 검사 분류 4개 (분류명·검사 수·대표 검사 3개)
const SLIDES = EXAM_GROUPS.map((g) => ({
  title: g.title,
  count: g.items.length,
  sample: g.items.slice(0, 3).map(([name]) => name),
}));

// 768px 이하 여부 구독
const MOBILE_MQ = "(max-width: 768px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** 시력교정 수술 전 33가지 검사 소개: PC는 스크롤 고정 가로 슬라이드(GSAP), 모바일은 자동재생 Swiper */
export default function PreCareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_MQ).matches,
    () => false,
  );

  // PC: 섹션을 pin 하고 스크롤(+4000px) 동안 트랙을 가로로 이동
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      const track = trackRef.current;
      if (!track || !sectionRef.current) return;
      const distance = track.scrollWidth - (track.parentElement?.offsetWidth ?? 0);
      const tl = gsap.timeline();
      tl.to(track, { x: -distance, ease: "none" });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom+=4000 bottom",
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: tl,
      });
    });
    return () => mm.revert();
  }, [isMobile]);

  const renderSlide = (slide: (typeof SLIDES)[number]) => (
    <>
      <div className={styles.cover}>
        <Placeholder label={`${slide.title} 검사`} aspectRatio="580 / 400" />
      </div>
      <p className={styles.txt}>
        <b>{slide.title}</b> 검사 {slide.count}가지
      </p>
      <p className={styles.sample}>{slide.sample.join(" · ")} 등</p>
    </>
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* 좌측 검사실 이미지 */}
        <div className={styles.imgWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="수술 전 정밀 검사실" aspectRatio="630 / 800" />
        </div>

        <div className={styles.slideWrap}>
          <div className={styles.tit}>
            <p className={styles.titLabel} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              안전한 시력교정은 수술 전 검사에서 시작됩니다
            </p>
            <div className={styles.logo} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <b className={styles.logoText}>{EXAM_TOTAL}</b>
              <span className={styles.logoSub}>가지 수술 전 검사</span>
            </div>
            <Link href="/vision/pre-care" className={styles.moreBtn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              수술 전 진료 시스템 보기 +
            </Link>
          </div>

          <div className={styles.swiperContainer} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            {isMobile ? (
              // 모바일: 3초 자동재생
              <Swiper modules={[Autoplay]} slidesPerView={1} spaceBetween={10} speed={1000} autoplay={{ delay: 3000, disableOnInteraction: false }}>
                {SLIDES.map((slide) => (
                  <SwiperSlide key={slide.title}>{renderSlide(slide)}</SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // PC: GSAP가 이동시키는 가로 트랙
              <div className={styles.desktopSlider}>
                <div ref={trackRef} className={styles.desktopSliderTrack}>
                  {SLIDES.map((slide) => (
                    <div key={slide.title} className={styles.desktopSlide}>
                      {renderSlide(slide)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
