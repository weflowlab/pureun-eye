import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

/** 공통 푸터: 사회환원·봉사활동 밴드 + 병원 정보 */
export default function Footer() {
  return (
    <>
      {/* 사회환원·봉사활동 밴드 (기존 홈페이지 문구) */}
      <div className={styles.subFooter}>
        <Placeholder label="봉사활동 배경" dark className={styles.subFooterBg} />
        <p className={styles.sharingDesc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <span className={styles.sharingDescBold}>
            꾸준한 봉사활동,
            <br className="mo_block" /> 이것이 {SITE.name}가 지향하는 바입니다.
            <br className="pc_block" />
          </span>
          의료를 통한 봉사로 지역사회와
          <br className="mo_block" /> 아픔을 함께 나누겠습니다.
        </p>
        <Link
          href="/about/philosophy"
          className={styles.sharingTime}
          suppressHydrationWarning
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="200"
        >
          진료이념 보기 →
        </Link>
      </div>

      {/* 하단 정보 */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerBox}>
            <Link href="/" className={styles.logoWrap} aria-label={SITE.name}>
              <Placeholder label="푸터 로고" width={180} height={50} />
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
