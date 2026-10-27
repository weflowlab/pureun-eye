"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { EQUIPMENTS, type Seg } from "./data";
import s from "./Section.module.css";
import styles from "./EquipSection.module.css";

/** 굵게 표시 조각을 포함한 한 줄 렌더링 */
function Line({ segs }: { segs: Seg[] }) {
  return segs.map((seg, i) =>
    typeof seg === "string" ? (
      <span key={i}>{seg}</span>
    ) : (
      <span key={i} className={s.fwb}>
        {seg.b}
      </span>
    ),
  );
}

/** 장비안내(#equip): 카드형 1장씩 슬라이더 (3.5초 자동재생, 루프) */
export default function EquipSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  // 다른 페이지에서 특정 장비를 지정해 들어온 경우 해당 슬라이드로 이동
  useEffect(() => {
    let idx: string | null = null;
    try {
      idx = sessionStorage.getItem("targetSlideIndex");
    } catch {
      return;
    }
    if (idx === null) return;
    const timer = setTimeout(() => {
      swiperRef.current?.slideToLoop(parseInt(idx, 10), 500);
      sessionStorage.removeItem("targetSlideIndex");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${s.contB} ${s.bwhite}`}>
      <div className={s.contInner} id="equip">
        <p className={s.contTitTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          장비안내
        </p>
        <p className={s.contSubTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
          {SITE.name}는 환자분들께 정확한 진단과 치료를 드리기 위해
          <br className={s.p} /> 항상 <span className={s.fwb}>최신 사양</span>의 장비를{" "}
          <span className={s.fwb}>꾸준히 도입</span>하고 있습니다.
        </p>

        {/* 슬라이더: 컨테이너보다 넓게(110%) 펼치고 양끝에 화살표 */}
        <div className={styles.equipBS}>
          <Swiper
            className={styles.equipS}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={500}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ nextEl: `.${styles.next}`, prevEl: `.${styles.prev}` }}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
          >
            {EQUIPMENTS.map((eq) => (
              <SwiperSlide key={eq.model} className={styles.equipSlide}>
                <div className={styles.equipSlideInner}>
                  <div className={styles.equipImg}>
                    <Image src={eq.image} alt={`${eq.model} ${eq.category}`} width={536} height={428} />
                  </div>
                  <div className={styles.equipS2}>
                    <ul>
                      <li>{eq.maker}</li>
                      <li>
                        {eq.model} <small>{eq.category}</small>
                      </li>
                      {eq.points.map((p, j) => (
                        <li key={j}>
                          <Line segs={p} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className={styles.next} aria-label="다음 장비" />
          <button type="button" className={styles.prev} aria-label="이전 장비" />
        </div>
      </div>
    </section>
  );
}
