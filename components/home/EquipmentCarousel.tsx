"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { EQUIPMENTS_WITH_PHOTO } from "@/lib/equipment";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./EquipmentCarousel.module.css";

// 장비 목록: 기존 홈페이지 장비 사진 사용
const ITEMS = EQUIPMENTS_WITH_PHOTO;

/** 보유 장비 소개: 공통 머리 + 자동 루프 카드 캐러셀 (오른쪽으로 넘쳐 흐름) */
export default function EquipmentCarousel() {
  return (
    <HomeSection tone="white" className={styles.section}>
      <Inner>
        <HomeHead
          eyebrow="EQUIPMENT"
          title={
            <>
              첨단 의료장비로
              <br />
              <b>정확하게 진단</b>합니다
            </>
          }
          sub={
            <>
              정확한 진단이 좋은 치료의 시작입니다.{" "}
              <br />
              <br className={home.moBr} />
              검사부터 수술까지 단계별로 필요한 장비를 갖추고 <br className={home.moBr} />
              꼼꼼하게 진료합니다.
            </>
          }
          action={
            <Link href="/about/equipment" className={`${home.btn} ${home.btnGhost}`}>
              장비 자세히 보기 <span aria-hidden="true">→</span>
            </Link>
          }
        />
      </Inner>

      {/* 캐러셀: 2.5초 자동재생, 루프, 컨테이너 왼쪽 선에서 시작해 오른쪽으로 넘침 */}
      <div className={styles.track} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={20}
          loop
          speed={1200}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{ 0: { spaceBetween: 12 }, 769: { spaceBetween: 20 } }}
          className={styles.swiper}
        >
          {ITEMS.map((item) => (
            <SwiperSlide key={item.model} className={styles.slide}>
              <Link href="/about/equipment" className={`${home.card} ${home.cardLift} ${styles.card}`}>
                {/* 제품 사진: 흰 바탕 가운데, 비율 유지 */}
                <div className={styles.img}>
                  <Image src={item.image} alt={`${item.model} ${item.category}`} width={536} height={428} />
                </div>
                <div className={styles.txt}>
                  <p className={styles.model}>{item.model}</p>
                  <p className={styles.cat}>{item.category}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </HomeSection>
  );
}
