import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import ConsultButton from "@/components/clinic/contact/ConsultButton";
import { HOURS, SITE } from "@/lib/site";
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

/** 공통 푸터: 상담 유도 밴드 + 병원 정보 */
export default function Footer() {
  return (
    <>
      {/* 상담 유도 밴드: 전화하기 · 상담 신청하기 */}
      <div className={styles.subFooter}>
        <Placeholder label="상담 안내 배경" dark className={styles.subFooterBg} />
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

      {/* 하단 정보: 브랜드 · 진료시간 · 병원 정보 + 하단 바 */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.top}>
            {/* 브랜드: 로고 · 소개 · 바로가기 */}
            <div>
              <Link href="/" className={styles.logoWrap} aria-label={SITE.name}>
                <Image src="/images/logo/logo.webp" alt={SITE.name} width={188} height={60} className={styles.logo} />
              </Link>
              <p className={styles.tagline}>
                {SITE.since}년부터 전주에서,
                <br />
                정확한 진단과 책임 있는 치료로 함께합니다.
              </p>
              <div className={styles.quickLinks}>
                <Link href="/contact/online">상담 신청</Link>
                <Link href="/about/location">오시는 길</Link>
              </div>
            </div>

            {/* 진료시간 */}
            <div>
              <p className={styles.colTitle}>진료시간</p>
              <dl className={styles.hours}>
                {[HOURS.weekday, HOURS.saturday].map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    {/* 오전 / 오후는 줄을 나눠 표시 (슬래시 제거) */}
                    <dd>
                      {h.time.split(" / ").map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={styles.note}>{HOURS.notes[0]}</p>
            </div>

            {/* 병원 정보: 한 줄에 하나씩 (대표전화 · 팩스는 한 줄) */}
            <div>
              <p className={styles.colTitle}>병원 정보</p>
              <ul className={styles.info}>
                <li>
                  <span>상호</span>
                  {SITE.legalName}
                </li>
                <li>
                  <span>대표</span>
                  {SITE.ceo}
                </li>
                <li>
                  <span>주소</span>({SITE.zip}) {SITE.address}
                </li>
                <li>
                  <span>대표전화</span>
                  <a href={`tel:${SITE.tel}`}>{SITE.tel}</a>
                  <span className={styles.subLabel}>팩스</span>
                  {SITE.fax}
                </li>
                <li>
                  <span>사업자정보</span>
                  {SITE.bizNo}
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 바: 저작권 · 개인정보처리방침 */}
          <div className={styles.bottom}>
            <p className={styles.copyright}>Copyright © {SITE.legalName}. All rights reserved.</p>
            <nav className={styles.bottomLinks} aria-label="정책">
              <Link href="/privacy" className={styles.privacy}>
                개인정보처리방침
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
