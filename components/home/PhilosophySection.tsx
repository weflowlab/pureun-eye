import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./PhilosophySection.module.css";

// 진료이념 3가지 (진료이념 페이지 원고 기준, 메인용 요약)
const VALUES = [
  { title: "환자 안전과 인본 진료", desc: "환자의 안전을 가장 먼저 생각하며\n사람을 존중하는 진료를 지향합니다." },
  { title: "전문 의료진과 끊임없는 연구", desc: "분야별 전문 의료진과 정밀 장비,\n꾸준한 연구로 진료의 질을 높입니다." },
  { title: "지역사회와 함께하는 나눔", desc: "의료 봉사로 지역사회에 기여하고\n이웃과 아픔을 함께 나눕니다." },
];

/** 진료이념 소개: 로고·슬로건·대표 이미지 + 하단 어두운 띠의 3가지 진료이념 */
export default function PhilosophySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.logoWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label={`${SITE.name} 로고`} aspectRatio="270 / 80" />
        </div>
        <p className={styles.quote} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          “See more, Do more”
        </p>
        <p className={styles.lead} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {SITE.name}는 {SITE.since}년 개원 이래 <b>‘안전함’</b>을 추구해 왔습니다.
          <br />
          많은 수술보다, 수술 후의 관리까지 고려한 안전한 수술을 합니다.
        </p>
        <Link href="/about/philosophy" className={styles.moreBtn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          진료이념 보기 +
        </Link>
        <div className={styles.clinicImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="병원 전경 이미지" aspectRatio="1210 / 600" />
        </div>
      </div>

      {/* 하단 진료이념 띠 (0.1초 간격 순차 등장) */}
      <div className={styles.valueStrip}>
        {VALUES.map((v, i) => (
          <div key={v.title} className={styles.valueCard} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay={String(100 * i)}>
            <p className={styles.valueNum}>{String(i + 1).padStart(2, "0")}</p>
            <p className={styles.valueTitle}>{v.title}</p>
            <p className={styles.valueDesc}>
              {v.desc.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
