"use client";

import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { PAPER_SLIDE_COUNT } from "./data";
import s from "./Section.module.css";
import styles from "./PaperSection.module.css";

/** 연구 논문 및 경력: 화면 전체 폭 이미지 슬라이더 (2.5초 자동재생, PC/모바일 이미지 분리) */
export default function PaperSection() {
  return (
    <section className={`${s.contB} ${s.bgray}`}>
      <div className={s.contInner} id="intro2">
        <p className={s.contTitTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          연구 논문 및 경력
        </p>
        <p className={s.contSubTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
          최고의 의료진이 최선을 다하는 {SITE.name}입니다.
        </p>

        {/* 100vw 슬라이더 */}
        <div className={styles.swiperDocWrap}>
          <Swiper
            className={styles.swiperDoc}
            modules={[Navigation, Autoplay]}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{ nextEl: `.${styles.next}`, prevEl: `.${styles.prev}` }}
          >
            {Array.from({ length: PAPER_SLIDE_COUNT }, (_, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <div className={styles.pcImg}>
                  <Placeholder label={`논문·경력 자료 ${i + 1} (PC)`} />
                </div>
                <div className={styles.moImg}>
                  <Placeholder label={`논문·경력 자료 ${i + 1} (모바일)`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className={styles.next} aria-label="다음 슬라이드" />
          <button type="button" className={styles.prev} aria-label="이전 슬라이드" />
        </div>
      </div>
    </section>
  );
}
