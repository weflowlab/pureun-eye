"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { PaginationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./ClinicSection.module.css";

const SLIDES = ["메인 비주얼 1", "메인 비주얼 2", "메인 비주얼 3", "메인 비주얼 4"];

const THUMBS = [
  { title: "망막", desc: "조기 발견이 시력을 지킵니다.\n정기 검진을 권해드립니다.", href: "/diseases/diabetic" },
  { title: "백내장", desc: "흐려진 시야, 미루지 마세요.\n정밀 검사로 시작합니다.", href: "/diseases/cataract" },
  { title: "소아근시억제", desc: "성장기 아이의 눈,\n지금 관리가 중요합니다.", href: "/diseases/child" },
  { title: "안구건조증", desc: "뻑뻑하고 시린 눈,\n원인부터 살펴봅니다.", href: "/diseases/xerophthalmia" },
];

/** 메인 비주얼 슬라이더: 페이드 배경 + 썸네일 탭 + 이전/정지/다음 컨트롤 */
export default function ClinicSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);
  const bulletRef = useRef<HTMLDivElement>(null);

  // 썸네일 클릭: 해당 슬라이드로 이동 후 5초간 자동재생 정지
  const goTo = (i: number) => {
    const sw = swiperRef.current;
    if (!sw) return;
    sw.slideToLoop(i);
    sw.autoplay.stop();
    setTimeout(() => {
      if (swiperRef.current && playing) swiperRef.current.autoplay.start();
    }, 5000);
  };

  // 정지/재생 토글
  const togglePlay = () => {
    const sw = swiperRef.current;
    if (!sw) return;
    if (playing) sw.autoplay.stop();
    else sw.autoplay.start();
    setPlaying(!playing);
  };

  return (
    <section className={styles.section}>
      {/* 배경 슬라이더: fade, 5초 자동재생, 루프 */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ el: null, clickable: true }}
        onBeforeInit={(sw) => {
          // 슬라이더 바깥의 불릿 컨테이너 연결
          (sw.params.pagination as PaginationOptions).el = bulletRef.current;
        }}
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => setActive(sw.realIndex)}
        className={styles.bgSwiper}
      >
        {SLIDES.map((label) => (
          <SwiperSlide key={label}>
            <Placeholder label={label} dark />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.textBox}>
            <h2 className={styles.title} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
              {SITE.nameEn}
            </h2>
            <p className={styles.subtitle} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
              <strong>망막과 백내장에 집중하는 {SITE.name}</strong>은
              <br />
              정확한 진단과 책임 있는 치료로 환자의 눈을 지킵니다.
            </p>

            {/* 썸네일 탭: 활성 항목만 펼쳐져 제목/설명 노출 */}
            <div className={styles.pagination} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1500">
              {THUMBS.map((t, i) => (
                <div
                  key={t.title}
                  className={`${styles.pagItem} ${active === i ? styles.active : ""}`}
                  onClick={() => goTo(i)}
                >
                  <div className={styles.pagImgBox}>
                    <Placeholder label={t.title} width={80} height={80} />
                  </div>
                  <div className={styles.pagTxtBox}>
                    <div className={styles.pagTitWrap}>
                      <h3 className={styles.pagThumbTit}>{t.title}</h3>
                      <Link href={t.href} className={styles.pagMore}>
                        View more +
                      </Link>
                    </div>
                    <div className={styles.pagThumbTxt}>
                      <p>
                        {t.desc.split("\n").map((line, j) => (
                          <span key={j}>
                            {j > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 컨트롤: 이전 / 불릿 / 정지·재생 / 다음 */}
            <div className={styles.btnGroup}>
              <button type="button" className={styles.prevBtn} onClick={() => swiperRef.current?.slidePrev()} aria-label="이전 슬라이드">
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
                  <path d="M12 2L2 12l10 10" stroke="#fff" strokeWidth="2" />
                </svg>
              </button>
              <div className={styles.bulletPagination} ref={bulletRef} />
              <button type="button" className={styles.stopBtn} onClick={togglePlay} aria-label={playing ? "자동재생 정지" : "자동재생 시작"}>
                {playing ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <rect x="3" y="2" width="4" height="14" fill="#fff" />
                    <rect x="11" y="2" width="4" height="14" fill="#fff" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M4 2l12 7-12 7z" fill="#fff" />
                  </svg>
                )}
              </button>
              <button type="button" className={styles.nextBtn} onClick={() => swiperRef.current?.slideNext()} aria-label="다음 슬라이드">
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10L2 22" stroke="#fff" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
