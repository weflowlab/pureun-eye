"use client";

import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import styles from "./diabetic.module.css";

/** 당뇨망막증 진행 단계 이미지 자동 슬라이더 */
export default function DiabeticSlider() {
  return (
    <div className={styles.swiperDiabetic}>
      <Swiper modules={[Autoplay]} loop autoplay={{ delay: 2500, disableOnInteraction: false }} speed={800}>
        {["비증식성 단계", "증식성 단계"].map((label) => (
          <SwiperSlide key={label}>
            <Placeholder label={`당뇨망막증 ${label}`} aspectRatio="1 / 1" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
