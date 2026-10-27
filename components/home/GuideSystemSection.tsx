"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import styles from "./GuideSystemSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  <>검사부터 수술까지 이어지는 <b>통합 데이터</b></>,
  <><b>실시간 가이드</b>로 정교한 절개</>,
  <>수정체 절개 <b>정확도 향상</b></>,
  <>난시 교정 렌즈 <b>정밀 정렬</b></>,
  <>수술 기록 <b>자동 저장</b></>,
];

// 768px 이하 여부 구독
const MOBILE_MQ = "(max-width: 768px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** 영상 유도 수술 시스템 소개: PC는 스크롤 고정 가로 슬라이드(GSAP), 모바일은 자동재생 Swiper */
export default function GuideSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_MQ).matches,
    () => false,
  );

  // PC: 섹션을 pin 하고 스크롤(+5000px) 동안 트랙을 가로로 이동
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
        end: "bottom+=5000 bottom",
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: tl,
      });
    });
    return () => mm.revert();
  }, [isMobile]);

  const renderSlide = (desc: ReactNode, i: number) => (
    <>
      <div className={styles.cover}>
        <Placeholder label={`수술 가이드 슬라이드 ${i + 1}`} aspectRatio="580 / 400" />
      </div>
      <p className={styles.txt}>{desc}</p>
    </>
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* 좌측 장비 이미지 */}
        <div className={styles.imgWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="수술 가이드 장비" aspectRatio="630 / 800" />
        </div>

        <div className={styles.slideWrap}>
          <div className={styles.tit}>
            <p className={styles.titLabel} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              계획한 그대로의 수술을 돕는
            </p>
            <div className={styles.logo} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <b className={styles.logoText}>GUIDE</b>
              <span className={styles.logoSub}>Image-Guided System</span>
            </div>
          </div>

          <div className={styles.swiperContainer} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            {isMobile ? (
              // 모바일: 3초 자동재생
              <Swiper modules={[Autoplay]} slidesPerView={1} spaceBetween={10} speed={1000} autoplay={{ delay: 3000, disableOnInteraction: false }}>
                {SLIDES.map((desc, i) => (
                  <SwiperSlide key={i}>{renderSlide(desc, i)}</SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // PC: GSAP가 이동시키는 가로 트랙
              <div className={styles.desktopSlider}>
                <div ref={trackRef} className={styles.desktopSliderTrack}>
                  {SLIDES.map((desc, i) => (
                    <div key={i} className={styles.desktopSlide}>
                      {renderSlide(desc, i)}
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
