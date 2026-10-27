import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import ConsultButton from "@/components/clinic/contact/ConsultButton";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

/** 공통 푸터: 상담 유도 밴드 + 병원 정보 */
export default function Footer() {
  return (
    <>
      {/* 상담 유도 밴드: 상담 신청 · 전화 · 카카오톡 */}
      <div className={styles.subFooter}>
        <Placeholder label="상담 안내 배경" dark className={styles.subFooterBg} />
        <p className={styles.ctaLabel} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          CONSULTATION
        </p>
        <p className={styles.ctaTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <span className={styles.ctaTitleBold}>궁금한 점이 있으신가요?</span>
          <br className="mo_block" /> {SITE.name}가 친절히 안내해 드립니다.
        </p>
        <p className={styles.ctaDesc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
          진료 분야와 연락처를 남겨주시면 확인 후 연락드립니다.
        </p>
        <div className={styles.ctaBtns} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <ConsultButton className={`${styles.ctaBtn} ${styles.ctaPrimary}`}>상담 신청하기</ConsultButton>
          <a href={`tel:${SITE.tel}`} className={styles.ctaBtn}>
            전화 {SITE.tel}
          </a>
          <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            카카오톡 상담
          </a>
        </div>
      </div>

      {/* 하단 정보 */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerBox}>
            <Link href="/" className={styles.logoWrap} aria-label={SITE.name}>
              <Image src="/images/logo/logo-footer.webp" alt={SITE.name} width={134} height={42} />
            </Link>

            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <span>상호</span> {SITE.legalName}
              </div>
              <div className={styles.infoItem}>
                <span>대표</span> {SITE.ceo}
              </div>
              <div className={styles.infoItem}>
                <span>주소</span> ({SITE.zip}) {SITE.address}
              </div>
              <a className={styles.infoItem} href={`tel:${SITE.tel}`}>
                <span>대표전화</span> {SITE.tel}
              </a>
              <div className={styles.infoItem}>
                <span>팩스</span> {SITE.fax}
              </div>
              <div className={styles.infoItem}>
                <span>사업자정보</span> {SITE.bizNo}
              </div>
              <a className={styles.infoItemFull} href={`tel:${SITE.tel}`}>
                <span>개인정보처리관리자</span> {SITE.privacyOfficer} 원장 {SITE.tel}
              </a>
              <div className={styles.copyright}>Copyright © {SITE.legalName}. All rights reserved.</div>
            </div>

            {/* 개인정보처리방침 페이지 이동 */}
            <Link href="/privacy" className={styles.privacyBtn}>
              개인정보처리방침
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
