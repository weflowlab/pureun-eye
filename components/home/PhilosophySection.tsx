import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { VALUES } from "@/components/common/philosophy";
import styles from "./PhilosophySection.module.css";

/** 진료이념 소개: 로고·슬로건·대표 이미지 + 하단 어두운 띠의 4가지 진료이념 */
export default function PhilosophySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.logoWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Image src="/images/logo/logo.webp" alt={SITE.name} width={188} height={60} className={styles.logoImg} />
        </div>
        <p className={styles.quote} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          “See more, Do more”
        </p>
        <p className={styles.lead} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {SITE.name}는 {SITE.since}년 개원 이래 <b>‘안전함’</b>을 추구해 왔습니다.
          <br />
          많은 수술보다, 수술 후의 관리까지 고려한 안전한 수술을 합니다.
        </p>
        <Link href="/about/intro" className={styles.moreBtn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          진료이념 보기 +
        </Link>
        <div className={styles.clinicImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="병원 전경 이미지" aspectRatio="1210 / 600" />
        </div>
      </div>

      {/* 하단 진료이념 띠 (0.1초 간격 순차 등장) — 박스 4개 전체 폭 = 병원 전경 이미지 폭 */}
      <div className={styles.valueStrip}>
        <div className={styles.valueGrid}>
          {VALUES.map((v, i) => (
            <div key={v.title} className={styles.valueCard} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay={String(100 * i)}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <p className={styles.valueTitle}>{v.title}</p>
              <p className={styles.valueDesc}>
                {v.short.split("\n").map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
