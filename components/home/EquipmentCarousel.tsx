"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "@/components/common/Swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./EquipmentCarousel.module.css";

const ITEMS = [
  { subtitle: "Slit Lamp", name: "세극등 현미경" },
  { subtitle: "OCT Angiography", name: "망막 혈관 검사" },
  { subtitle: "OCT", name: "황반 단층 촬영" },
  { subtitle: "Biometry", name: "백내장 계측 장비" },
  { subtitle: "Surgical Microscope", name: "안과용 수술 현미경" },
  { subtitle: "Vitrectomy System", name: "망막·백내장 수술장비" },
  { subtitle: "YAG Laser", name: "YAG 레이저" },
  { subtitle: "Retina Laser", name: "망막 레이저" },
  { subtitle: "ERG", name: "망막전위 검사" },
  { subtitle: "Microperimetry", name: "황반 기능 검사" },
  { subtitle: "Sterilizer", name: "고압증기멸균기" },
];

/** 보유 장비 소개: 좌측 텍스트 + 우측 자동 루프 캐러셀 */
export default function EquipmentCarousel() {
  return (
    <section className={styles.section}>
      {/* 좌측 회색 텍스트 박스 */}
      <div className={styles.textBx}>
        <div className={styles.textBx2}>
          <div className={styles.tit2} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <span className={styles.bold}>첨단 의료장비</span> 보유
          </div>
          <div className={styles.tit3} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            {SITE.name}
            <br className="pc_block" /> 장비 소개
          </div>
          <div className={styles.tit4} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            정확한 진단이 좋은 치료의 시작입니다.
            <br />
            검사부터 수술까지 단계별로
            <br />
            필요한 장비를 갖추고
            <br />
            꼼꼼하게 진료합니다.
          </div>
          <div className={styles.viewBtnWrapPc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000" data-aos-delay="700">
            <Link href="/intro#equip" className={styles.viewBtn}>
              View more
              <span className={styles.viewImg} />
            </Link>
          </div>
        </div>
      </div>

      {/* 우측 장비 캐러셀: 2.5초 자동재생, 루프 */}
      <div className={styles.swiAb}>
        <div suppressHydrationWarning data-aos="fade-left" data-aos-duration="1600" data-aos-delay="100">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={50}
            loop
            speed={1500}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 20 },
              700: { slidesPerView: "auto", spaceBetween: 40 },
              1401: { slidesPerView: 3, spaceBetween: 50 },
            }}
            className={styles.sec4Swi}
          >
            {ITEMS.map((item) => (
              <SwiperSlide key={item.subtitle}>
                <Link href="/intro#equip" className={styles.slideLink}>
                  <div className={styles.swiImg}>
                    <Placeholder label={item.subtitle} />
                  </div>
                  <div className={styles.swiTxt}>
                    <div className={styles.txtSubtit}>{item.subtitle}</div>
                    <div className={styles.txtTit}>{item.name}</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 태블릿 이하용 버튼 */}
      <div className={styles.viewBtnWrapMobile} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000">
        <Link href="/intro#equip" className={styles.viewBtn}>
          View more
          <span className={styles.viewImg} />
        </Link>
      </div>
    </section>
  );
}
