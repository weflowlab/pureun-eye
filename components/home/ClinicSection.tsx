"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./ClinicSection.module.css";

// 슬라이드 전환 간격 (하단 탭 진행바와 같은 시간)
const DELAY = 5000;

// 슬라이드 = 하단 탭: 진료과목 3개 + 의료진 (배경 사진 라벨은 lib/stock.ts 규칙과 연결)
const SLIDES = [
  { tab: "시력교정", short: "시력교정", label: "메인 비주얼 1", headline: "내 눈에 맞는 시력교정", desc: "33가지 수술 전 검사로 스마일 · 라식 · 라섹 중 알맞은 수술을 찾습니다.", href: "/vision/pre-care" },
  { tab: "백내장", short: "백내장", label: "메인 비주얼 2", headline: "흐려진 시야, 미루지 마세요", desc: "푸른 백내장 노안센터에서 정밀 검사부터 수술 후 관리까지 함께합니다.", href: "/cataract/center" },
  { tab: "망막클리닉 보임", short: "망막", label: "메인 비주얼 3", headline: "치료 시기가 중요한 망막 질환", desc: "망막클리닉 보임에서 망막 전문 의료진이 진료합니다.", href: "/retina/boim" },
  { tab: "의료진", short: "의료진", label: "메인 비주얼 4", headline: "분야별 의료진이 함께합니다", desc: "외래클리닉과 망막클리닉 보임의 원장님을 소개합니다.", href: "/about/doctors" },
];

/** 메인 비주얼: 페이드 배경 슬라이드 + 공통 카피 + 슬라이드별 문구·버튼 + 하단 탭(진행바) */
export default function ClinicSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);
  // 탭별 진행선 채움 요소 (자동재생 남은 시간에 맞춰 직접 갱신)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // 현재 슬라이드의 남은 시간(ms) — 정지 후 재생 시 이어가기용
  const timeLeftRef = useRef(DELAY);
  const slide = SLIDES[active];

  // 탭 클릭: 해당 슬라이드로 이동하고 타이머를 처음(5초)부터 다시 시작
  const goTo = (i: number) => {
    const sw = swiperRef.current;
    if (!sw) return;
    sw.autoplay.stop();
    sw.slideToLoop(i);
    if (playing) sw.autoplay.start();
  };

  // 정지/재생 토글: 정지 시 남은 시간을 기억하고, 재생 시 그 시간만큼만 돌려 멈춘 지점부터 이어감
  // (Swiper pause/resume은 마우스 오버용이라 waitForTransition:false와 함께 쓰면 바로 재개됨)
  const togglePlay = () => {
    const sw = swiperRef.current;
    if (!sw || !sw.params.autoplay || typeof sw.params.autoplay === "boolean") return;
    if (playing) {
      sw.autoplay.stop();
    } else {
      sw.params.autoplay.delay = timeLeftRef.current;
      sw.autoplay.start();
    }
    setPlaying(!playing);
  };

  return (
    <section className={styles.section}>
      {/* 배경 슬라이더: fade, 자동재생, 루프 */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        speed={1000}
        // waitForTransition: false → 전환과 동시에 다음 타이머 시작 (진행선이 멈추지 않음)
        autoplay={{ delay: DELAY, disableOnInteraction: false, waitForTransition: false }}
        loop
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => {
          setActive(sw.realIndex);
          // 새 슬라이드는 다시 5초 (재생 시 줄였던 delay 복구)
          timeLeftRef.current = DELAY;
          if (sw.params.autoplay && typeof sw.params.autoplay !== "boolean") sw.params.autoplay.delay = DELAY;
        }}
        // 현재 탭 진행선 = 1 - 남은 시간 / 5초 (프레임마다 갱신)
        onAutoplayTimeLeft={(sw, time) => {
          timeLeftRef.current = Math.max(0, time);
          const el = fillRefs.current[sw.realIndex];
          if (el) el.style.transform = `scaleX(${Math.min(1, 1 - time / DELAY)})`;
        }}
        className={styles.bgSwiper}
      >
        {SLIDES.map((s) => (
          <SwiperSlide key={s.label}>
            <Placeholder label={s.label} dark />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.content}>
        {/* 카피: 공통 문구 + 슬라이드별 문구 */}
        <div className={styles.copy}>
          <p className={styles.eyebrow} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1200">
            {SITE.nameEn}
          </p>
          <h2 className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            {SITE.since}년부터 전주에서,
            <br />
            {SITE.name}가 눈을 지킵니다
          </h2>
          {/* key로 슬라이드가 바뀔 때마다 등장 애니메이션 재생 */}
          <div key={active} className={styles.slideCopy}>
            <p className={styles.headline}>{slide.headline}</p>
            <p className={styles.desc}>{slide.desc}</p>
            <Link href={slide.href} className={styles.cta}>
              {slide.tab} 자세히 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 하단 탭: 누르면 해당 슬라이드로, 활성 탭 아래 진행바 */}
        <div className={styles.tabBar}>
          <ul className={styles.tabs} role="tablist">
            {SLIDES.map((s, i) => (
              <li key={s.tab}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`${styles.tab} ${active === i ? styles.on : ""}`}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                  {/* 모바일은 짧은 이름 */}
                  <span className={styles.tabFull}>{s.tab}</span>
                  <span className={styles.tabShort}>{s.short}</span>
                  {/* 진행선: 지난 탭은 가득, 다음 탭은 비움, 현재 탭은 타이머가 채움 → 4번 후 1번으로 가면 모두 초기화 */}
                  <span className={styles.progress}>
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className={styles.progressFill}
                      style={i === active ? undefined : { transform: `scaleX(${i < active ? 1 : 0})` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.playBtn} onClick={togglePlay} aria-label={playing ? "자동재생 정지" : "자동재생 시작"}>
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <rect x="2" y="1" width="3" height="12" fill="#fff" />
                <rect x="9" y="1" width="3" height="12" fill="#fff" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 1l10 6-10 6z" fill="#fff" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
