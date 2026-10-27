"use client";

import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { DOCTORS } from "./data";
import s from "./Section.module.css";
import styles from "./DoctorSection.module.css";

/** 원형 테두리 화살표 아이콘 (다음 버튼은 CSS로 180도 회전) */
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" stroke="black" strokeWidth="0.5" />
      <path d="M23 27L16 20L23 13" stroke="black" />
    </svg>
  );
}

/** 의료진 소개: 원장별 1장씩 넘기는 슬라이더 (좌 텍스트 / 우 사진) */
export default function DoctorSection() {
  return (
    <section className={`${s.contB} ${s.bwhite}`}>
      {/* 좌측 워터마크 로고 */}
      <div className={styles.contInnerLogo}>
        <Placeholder label="워터마크 로고" width={140} height={140} />
      </div>
      <div className={`${s.contInner} ${s.contInnerFull}`} id="intro1">
        <p className={s.contTitTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          의료진 소개
        </p>
        <p className={s.contSubTxt} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
          최고의 의료진이 최선을 다하는 {SITE.name}입니다.
        </p>

        {/* 의료진 슬라이더: loop, 800ms 전환 */}
        <div className={styles.swiperWrap}>
          <Swiper
            className={styles.doctorSwiper}
            modules={[Navigation]}
            speed={800}
            loop
            slidesPerView={1}
            spaceBetween={0}
            navigation={{ prevEl: `.${styles.prev}`, nextEl: `.${styles.next}` }}
          >
            {DOCTORS.map((d, i) => (
              <SwiperSlide key={i}>
                <div className={styles.ltriFbx}>
                  <div className={styles.ltriBxText} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
                    <p className={styles.ltriBxName}>
                      <span>{d.name}</span> <span>{d.position}</span>
                    </p>
                    <p className={styles.ltriBxCareer}>
                      {d.careers.map((c) => (
                        <span key={c}>
                          {c}
                          <br />
                        </span>
                      ))}
                      <br />
                      {d.affiliations.map((a) => (
                        <span key={a}>
                          {a}
                          <br />
                        </span>
                      ))}
                    </p>
                    <p className={styles.ltriBxMotto1}>환자의 눈높이에 맞춰</p>
                    <p className={styles.ltriBxMotto2}>좋은 결과를 선물합니다.</p>
                  </div>
                  <div className={styles.ltriBxImg} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
                    <Placeholder label={`${d.position} 프로필 사진`} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 좌우 네비게이션 */}
          <div className={styles.buttonWrap}>
            <button type="button" className={styles.prev} aria-label="이전 의료진">
              <ArrowIcon />
            </button>
            <button type="button" className={styles.next} aria-label="다음 의료진">
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
