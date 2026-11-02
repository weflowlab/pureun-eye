import type { ReactNode } from "react";
import Link from "next/link";
import MapButtons from "@/components/common/MapButtons";
import MapEmbed from "@/components/common/MapEmbed";
import { HOURS, SITE } from "@/lib/site";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./ClinicInfoSection.module.css";

// 블록 타이틀 아이콘: 연한 원 안의 선 아이콘
const BlockIcon = ({ children }: { children: ReactNode }) => (
  <span className={styles.blockIcon}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  </span>
);
const PhoneIcon = () => (
  <BlockIcon>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </BlockIcon>
);
const ClockIcon = () => (
  <BlockIcon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </BlockIcon>
);

// 진료시간표: lib/site HOURS 기준 (오전/오후는 " / " 기준으로 줄바꿈)
const TIME_ROWS = [HOURS.weekday, HOURS.saturday].map((h) => ({ label: h.label, lines: h.time.split(" / ") }));

/** 진료시간·연락처·오시는 길: 좌측 전화·진료안내 카드 + 우측 지도 카드 */
export default function ClinicInfoSection() {
  return (
    <HomeSection tone="white">
      <Inner>
        <HomeHead
          eyebrow="INFORMATION"
          title={
            <>
              {SITE.name} <b>진료시간 및 오시는 길</b>
            </>
          }
          sub="진료 시간과 연락처, 오시는 길을 안내해 드립니다."
        />

        <div className={styles.grid}>
          {/* 전화 + 진료 안내 */}
          <div className={`${home.cardSoft} ${styles.infoCard}`} suppressHydrationWarning data-aos="fade-up">
            <div className={styles.block}>
              <div className={styles.blockHead}>
                <PhoneIcon />
                <div>
                  <p className={styles.blockTitle}>전화 번호</p>
                  <p className={styles.blockSub}>대표전화 · 라식상담</p>
                </div>
              </div>
              <div className={styles.phones}>
                <a href={`tel:${SITE.tel}`} className={styles.phone} title="전화 걸기">
                  {SITE.tel}
                </a>
                <a href={`tel:${SITE.lasikTel}`} className={styles.phone} title="전화 걸기">
                  {SITE.lasikTel}
                </a>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockHead}>
                <ClockIcon />
                <div>
                  <p className={styles.blockTitle}>진료 안내</p>
                </div>
              </div>
              <dl className={styles.hours}>
                {TIME_ROWS.map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    <dd>
                      {h.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className={styles.notes}>
                {HOURS.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 지도 + 주소 + 지도 앱 버튼 */}
          <div className={`${home.cardSoft} ${styles.mapCard}`} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            <MapEmbed height={320} className={styles.map} />
            <div className={styles.mapBody}>
              <p className={styles.addrLabel}>찾아오시는 길</p>
              <p className={styles.addr}>{SITE.address}</p>
              <MapButtons className={styles.mapBtns} />
              <Link href="/about/location" className={styles.locationLink}>
                오시는 길 자세히 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Inner>
    </HomeSection>
  );
}
