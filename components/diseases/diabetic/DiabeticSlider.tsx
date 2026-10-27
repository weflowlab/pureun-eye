"use client";

import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import styles from "./diabetic.module.css";

// 분류별 안저 사진 (비증식성 · 증식성 · 황반부종)
const SLIDES = ["비증식성 당뇨망막병증 안저", "증식성 당뇨망막병증 안저", "당뇨황반부종 OCT"];

/** 당뇨망막병증 분류별 이미지 자동 슬라이더 */
export default function DiabeticSlider() {
  return (
    <div className={styles.swiperDiabetic}>
      <Swiper modules={[Autoplay]} loop autoplay={{ delay: 2500, disableOnInteraction: false }} speed={800}>
        {SLIDES.map((label) => (
          <SwiperSlide key={label}>
            <Placeholder label={label} aspectRatio="1 / 1" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
