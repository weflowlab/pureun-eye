import type { ReactNode } from "react";
import MapEmbed from "@/components/common/MapEmbed";
import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import { HOURS, SITE } from "@/lib/site";
import styles from "./about.module.css";

/** 선 아이콘 공통 틀 */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

const CarIcon = () => (
  <Icon>
    <path d="M5 17h14v-5l-2-5H7l-2 5z" />
    <path d="M5 12h14" />
    <circle cx="8" cy="17" r="1.8" />
    <circle cx="16" cy="17" r="1.8" />
  </Icon>
);
const TrainIcon = () => (
  <Icon>
    <rect x="5" y="3" width="14" height="14" rx="3" />
    <path d="M5 11h14M9 21l-2-4M15 21l2-4" />
    <circle cx="9" cy="14" r="0.8" />
    <circle cx="15" cy="14" r="0.8" />
  </Icon>
);
const BusIcon = () => (
  <Icon>
    <rect x="4" y="3" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 18v3M16 18v3" />
    <circle cx="8" cy="14" r="0.8" />
    <circle cx="16" cy="14" r="0.8" />
  </Icon>
);
const StopIcon = () => (
  <Icon>
    <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </Icon>
);

type Route = { tag?: string; text: ReactNode };
type Direction = { icon: ReactNode; title: string; routes: Route[]; note?: string };

// 교통수단별 오시는 길 (기존 홈페이지 A6000 기준)
const DIRECTIONS: Direction[] = [
  {
    icon: <CarIcon />,
    title: "고속도로 이용 시",
    routes: [
      { tag: "호남고속도로", text: "전주 IC 진출" },
      { tag: "서해안고속도로", text: "동군산 IC 진출 → 남원 방면 (약 10km 직진)" },
    ],
    note: "건물 뒤편 대형 주차장 이용",
  },
  {
    icon: <TrainIcon />,
    title: "기차 이용 시 (전주역 하차)",
    routes: [
      { tag: "택시", text: "기본요금 거리 → 푸른안과(왼쪽) → 횡단보도를 건너오시면 됩니다." },
      { tag: "버스", text: "72, 79, 100, 119, 337, 1000번 이용 → 사대부고 사거리 하차" },
    ],
  },
  {
    icon: <BusIcon />,
    title: "시외버스터미널 이용 시",
    routes: [
      { tag: "택시", text: "기본요금 거리 → 터미널 건너편 → 푸른안과" },
      { tag: "버스", text: "터미널 건너편에서 72, 79번 이용 → 사대부고 사거리 하차 → 전주역 방향 117m 도보" },
    ],
  },
  {
    icon: <StopIcon />,
    title: "시내버스 이용 시",
    routes: [{ text: "508, 536, 542, 545, 546, 8-1, 8-2, 72, 79, 100, 119, 337, 1000번 이용" }],
    note: "사대부고 사거리에서 하차",
  },
];

/** 지도 바로가기 링크 (URL 미정("#")이면 새 창 열지 않음) */
function MapLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href !== "#";
  return (
    <a href={href} className={styles.mapBtn} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

/** 병원소개 — 오시는 길 */
export default function LocationPage({ path }: SubPageProps) {
  const tels = [
    { label: "대표전화", tel: SITE.tel },
    { label: "라식상담", tel: SITE.lasikTel },
  ];
  return (
    <SubLayout path={path}>
      {/* 지도 + 기본 정보 */}
      <ContentBlock>
        <SectionHead first title="오시는 길" sub="해마다 십만 명이 넘는 고객이 푸른안과를 다녀가셨습니다." />
        <div className={styles.locWrap}>
          <div className={styles.locMap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            <MapEmbed aspectRatio="4 / 3" />
            <div className={styles.mapBtns}>
              <MapLink href={SITE.naverMapUrl}>네이버 지도</MapLink>
              <MapLink href={SITE.kakaoMapUrl}>카카오맵</MapLink>
            </div>
          </div>

          <dl className={styles.locInfo} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
            <div className={styles.locRow}>
              <dt>주소</dt>
              <dd>
                <span className={styles.zip}>({SITE.zip})</span> {SITE.address}
              </dd>
            </div>
            <div className={styles.locRow}>
              <dt>전화</dt>
              <dd className={styles.telList}>
                {tels.map((t) => (
                  <a key={t.tel} href={`tel:${t.tel}`} className={styles.telLink}>
                    <span>{t.label}</span>
                    {t.tel}
                  </a>
                ))}
              </dd>
            </div>
            <div className={styles.locRow}>
              <dt>진료시간</dt>
              <dd>
                <ul className={styles.hourList}>
                  {[HOURS.weekday, HOURS.saturday].map((h) => (
                    <li key={h.label}>
                      <span>{h.label}</span>
                      {h.time}
                    </li>
                  ))}
                </ul>
                <ul className={styles.hourNotes}>
                  {HOURS.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </ContentBlock>

      {/* 교통수단별 안내 */}
      <ContentBlock tone="gray">
        <SectionHead first title="타지역에서 찾아오시는 길" sub="이용하시는 교통수단에 맞춰 안내해 드립니다." />
        <div className={styles.dirGrid}>
          {DIRECTIONS.map((d, i) => (
            <div key={d.title} className={styles.dirCard} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <div className={styles.dirHead}>
                <span className={styles.dirIcon}>{d.icon}</span>
                <p className={styles.dirTitle}>{d.title}</p>
              </div>
              <ul className={styles.routeList}>
                {d.routes.map((r, j) => (
                  <li key={j}>
                    {r.tag && <span className={styles.routeTag}>{r.tag}</span>}
                    <span>{r.text}</span>
                  </li>
                ))}
              </ul>
              {d.note && <p className={styles.dirNote}>※ {d.note}</p>}
            </div>
          ))}
        </div>

        {/* 주차 안내 */}
        <div className={styles.parking} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <span className={styles.parkingMark} aria-hidden>
            P
          </span>
          <div>
            <p className={styles.parkingTitle}>주차 안내</p>
            <p className={styles.parkingDesc}>푸른안과 건물 뒤편에 대형 주차장이 준비되어 있습니다.</p>
          </div>
        </div>
      </ContentBlock>
    </SubLayout>
  );
}
