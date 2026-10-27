import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./ClinicInfoSection.module.css";

const HOURS = [
  {
    label: "진료시간",
    rows: [
      ["평 일", "오전 09:00 ~ 오후 18:00"],
      ["토 요 일", "오전 09:00 ~ 오후 13:00"],
      ["점심시간", "오후 13:00 ~ 오후 14:00"],
    ],
  },
  { label: "야간진료", rows: [["오 후", "18:00 ~ 19:00"]] },
  { label: "휴 진", rows: [["일요일", "일요일 · 공휴일 휴진"]] },
];

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
                  <p className={styles.phoneBlockTitleSub}>상담시간 9AM ~ 6PM (주말, 공휴일 휴무)</p>
                </div>
              </div>
              <div className={styles.phoneNumbers}>
                <a href={`tel:${SITE.tel}`} className={styles.phone} title="전화 걸기">
                  {SITE.tel}
                </a>
                <a href={`tel:${SITE.mobile}`} className={styles.phone} title="전화 걸기">
                  {SITE.mobile}
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
              <div className={styles.noticeTexts}>
                <p className={styles.noticeText}>※ 수술 일정에 따라 외래 진료가 지연될 수 있으니 전화로 확인 부탁드립니다.</p>
                <p className={styles.noticeText}>※ 접수 마감 시간은 진료 상황에 따라 달라질 수 있습니다.</p>
              </div>
              <div className={styles.timeGrid}>
                {HOURS.map((h) => (
                  <div key={h.label} className={styles.timeItem}>
                    <div>{h.label}</div>
                    <div>
                      {h.rows.map(([tit, cont]) => (
                        <div key={tit} className={styles.timeContItem}>
                          <div className={styles.timeContItemTit}>{tit}</div>
                          <div>{cont}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                {SITE.address} {SITE.name}
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
          </div>
        </div>
      </div>
    </section>
  );
}
