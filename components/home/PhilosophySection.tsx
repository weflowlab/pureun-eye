import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./PhilosophySection.module.css";

// 진료이념 아이콘 (선 아이콘, 색은 currentColor)
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
// 방패 + 하트: 환자 안전·인본 진료
const SafetyIcon = () => (
  <Icon>
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
    <path d="M12 15.5s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.2-3 4-3 4z" />
  </Icon>
);
// 돋보기 속 눈: 검사·진단
const ExamIcon = () => (
  <Icon>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
    {/* 돋보기 안 눈은 작아서 선을 얇게 */}
    <path d="M6.5 10.5s1.6-2.5 4-2.5 4 2.5 4 2.5-1.6 2.5-4 2.5-4-2.5-4-2.5z" strokeWidth="1.2" />
    <circle cx="10.5" cy="10.5" r="0.9" fill="currentColor" />
  </Icon>
);
// 체크 달력: 수술 후 정기 관리
const CareIcon = () => (
  <Icon>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M9 14.5l2 2 4-4" />
  </Icon>
);
// 청진기: 전문 의료진
const DoctorIcon = () => (
  <Icon>
    <path d="M6 3H5a1 1 0 0 0-1 1v5a5 5 0 0 0 10 0V4a1 1 0 0 0-1-1h-1" />
    <path d="M9 14v1.5a5 5 0 0 0 10 0V13" />
    <circle cx="19" cy="11" r="2" />
  </Icon>
);

// 진료이념 4가지 (진료이념 페이지 원고 기준, 메인용 요약)
const VALUES = [
  { icon: <SafetyIcon />, title: "환자 안전과 인본 진료", desc: "환자의 안전을 가장 먼저 생각하며\n사람을 존중하는 진료를 지향합니다." },
  { icon: <ExamIcon />, title: "꼼꼼한 검사와 정확한 진단", desc: "꼭 필요한 검사를 빠뜨리지 않고\n결과를 신중하게 판단합니다." },
  { icon: <CareIcon />, title: "수술 후 관리까지 생각하는 진료", desc: "많은 수술보다, 수술 후 관리까지\n고려한 안전한 수술을 합니다." },
  { icon: <DoctorIcon />, title: "전문 의료진과 끊임없는 연구", desc: "분야별 전문 의료진과 정밀 장비,\n꾸준한 연구로 진료의 질을 높입니다." },
];

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
        <Link href="/about/philosophy" className={styles.moreBtn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
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
      </div>
    </section>
  );
}
