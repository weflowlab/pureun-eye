import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { HOURS, SITE } from "@/lib/site";
import styles from "./ClinicInfoSection.module.css";

// 진료시간표: lib/site HOURS 기준 (오전/오후는 " / " 기준으로 줄바꿈)
const TIME_ROWS = [HOURS.weekday, HOURS.saturday].map((h) => ({ label: h.label, lines: h.time.split(" / ") }));

/** 진료시간·연락처·오시는 길 안내 (좌: 전화/진료안내, 우: 지도) */
export default function ClinicInfoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {SITE.name} <span className={styles.titleAccent}>진료시간 및 기타 안내</span>
        </h2>

        <div className={styles.ttmFbx}>
          <div className={styles.infoBox}>
            {/* 전화번호 */}
            <div suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
              <div className={styles.phoneBlockTitle}>
                <Placeholder label="전화" width={50} height={50} />
                <div className={styles.phoneBlockTitleTxt}>
                  <p className={styles.phoneBlockTitleMain}>전화 번호</p>
                  <p className={styles.phoneBlockTitleSub}>대표전화 · 라식상담</p>
                </div>
              </div>
              <div className={styles.phoneNumbers}>
                <a href={`tel:${SITE.tel}`} className={styles.phone} title="전화 걸기">
                  {SITE.tel}
                </a>
                <a href={`tel:${SITE.lasikTel}`} className={styles.phone} title="전화 걸기">
                  {SITE.lasikTel}
                </a>
              </div>
            </div>

            {/* 진료 안내 + 시간표 */}
            <div className={styles.clinicGuideBlock} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500" data-aos-delay="200">
              <div className={styles.phoneBlockTitle}>
                <Placeholder label="안내" width={50} height={50} />
                <div className={styles.phoneBlockTitleTxt}>
                  <p className={styles.phoneBlockTitleMain}>진료 안내</p>
                </div>
              </div>
              <div className={styles.timeGrid}>
                {TIME_ROWS.map((h) => (
                  <div key={h.label} className={styles.timeItem}>
                    <div className={styles.timeContItemTit}>{h.label}</div>
                    <div>
                      {h.lines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.noticeTexts}>
                {HOURS.notes.map((note) => (
                  <p key={note} className={styles.noticeText}>
                    ※ {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* 지도 + 주소 + 지도 앱 버튼 */}
          <div className={styles.mapBox} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
            <div className={styles.mapWrap}>
              <Placeholder label="카카오 지도" height={400} className={styles.map} />
            </div>
            <p className={styles.mapTxt}>
              <span className={styles.mapTxtLabel}>찾아오시는 길</span>
              <span className={styles.mapTxtAddr}>
                {SITE.address}
              </span>
            </p>
            <div className={styles.mapBtns}>
              <a href={SITE.naverMapUrl} target="_blank" rel="noopener noreferrer" className={styles.naverBtn}>
                <span className={styles.mapIco} aria-hidden="true">N</span>
                네이버지도보기
              </a>
              <a href={SITE.kakaoMapUrl} target="_blank" rel="noopener noreferrer" className={styles.kakaoBtn}>
                <span className={styles.mapIco} aria-hidden="true">K</span>
                카카오지도보기
              </a>
            </div>
            <Link href="/about/location" className={styles.locationLink}>
              오시는 길 자세히 보기 +
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
