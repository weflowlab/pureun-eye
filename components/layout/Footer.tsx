import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

/** 공통 푸터: 나눔진료 안내 밴드 + 병원 정보 */
export default function Footer() {
  return (
    <>
      {/* 나눔진료 안내 밴드 */}
      <div className={styles.subFooter}>
        <Placeholder label="나눔진료 배경" dark className={styles.subFooterBg} />
        <p className={styles.sharingDesc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <span className={styles.sharingDescBold}>
            나눔 진료 시간에는
            <br className="mo_block" /> 의료진이 직접 진료합니다.
            <br className="pc_block" />
          </span>
          나눔 진료비는 전액
          <br className="mo_block" /> 지역 이웃을 위해 사용됩니다.
        </p>
        <p className={styles.sharingTime} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          나눔진료 시간은 병원에 문의해 주세요
        </p>
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
                <span>대표</span> {SITE.ceo}
              </div>
              <div className={styles.infoItem}>
                <span>주소</span> {SITE.address}
              </div>
              <a className={styles.infoItem} href={`tel:${SITE.tel}`}>
                <span>대표전화</span> {SITE.tel}
              </a>
              <div className={styles.infoItem}>
                <span>사업자정보</span> {SITE.bizNo}
              </div>
              <a className={styles.infoItemFull} href={`tel:${SITE.tel}`}>
                <span>개인정보처리관리자</span> {SITE.ceo} 원장 {SITE.tel}
              </a>
              <div className={styles.copyright}>© {SITE.nameEn}. All rights reserved.</div>
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
