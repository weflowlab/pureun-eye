"use client";

import { usePathname } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import ConsultButton from "@/components/clinic/contact/ConsultButton";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

// 상담 유도 버튼 아이콘 (선 아이콘, 색은 currentColor)
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </svg>
);
const ConsultIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </svg>
);

/** 푸터 위 상담 유도 밴드: 전화하기 · 상담 신청하기. 블로그(/blog)에서는 글 하단 상담 블록이 따로 있어 보이지 않는다 */
export default function ConsultBand() {
  const pathname = usePathname();
  if (pathname?.startsWith("/blog")) return null;

  return (
    <div className={styles.subFooter}>
      <Placeholder label="상담 문의 띠 배경" dark className={styles.subFooterBg} />
      <p className={styles.ctaLabel} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        CONSULTATION
      </p>
      <p className={styles.ctaTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        <span className={styles.ctaTitleBold}>궁금한 점이 있으신가요?</span>
        <br />
        {SITE.name}가 친절히 안내해 드립니다.
      </p>
      <p className={styles.ctaDesc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
        진료 분야와 연락처를 남겨주시면 확인 후 연락드립니다.
      </p>
      <div className={styles.ctaBtns} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
        <a href={`tel:${SITE.tel}`} className={styles.ctaBtn}>
          <PhoneIcon />
          전화하기
        </a>
        <ConsultButton className={`${styles.ctaBtn} ${styles.ctaPrimary}`}>
          <ConsultIcon />
          상담 신청하기
        </ConsultButton>
      </div>
    </div>
  );
}
