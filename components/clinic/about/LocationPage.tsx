import type { ReactNode } from "react";
import MapButtons from "@/components/common/MapButtons";
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
const ParkingIcon = () => (
  <Icon>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3" />
  </Icon>
);

/** 안내 한 줄: 설명 + 배지 (택시 · 고속도로 · 버스 번호) */
type Line = { text: ReactNode; taxi?: boolean; road?: string; buses?: string[] };
type Transit = { label: string; icon: ReactNode; lines: Line[] };

// 시내버스 번호 (기존 홈페이지 기준) — 전주 시내버스는 2024년부터 노선 개편 중이라 병원 확인 후 갱신
const BUS_STATION = ["72", "79", "100", "119", "337", "1000"];
const BUS_TERMINAL = ["72", "79"];
const BUS_ALL = [...BUS_STATION, "508", "536", "542", "545", "546", "8-1", "8-2"];

// 교통수단별 오시는 길 (기존 홈페이지 A6000 기준)
const TRANSIT: Transit[] = [
  { label: "시내버스", icon: <BusIcon />, lines: [{ text: "사대부고 사거리 정류장 하차", buses: BUS_ALL }] },
  {
    label: "기차",
    icon: <TrainIcon />,
    lines: [
      { text: "전주역에서 기본요금 거리 — 푸른안과(왼쪽) 앞 횡단보도를 건너오시면 됩니다.", taxi: true },
      { text: "전주역 앞 정류장 승차 → 사대부고 사거리 하차", buses: BUS_STATION },
    ],
  },
  {
    label: "고속·시외버스",
    icon: <BusIcon />,
    lines: [
      { text: "시외버스터미널에서 기본요금 거리 — 터미널 건너편에 있습니다.", taxi: true },
      { text: "터미널 건너편 정류장 승차 → 사대부고 사거리 하차 → 전주역 방향 117m 도보", buses: BUS_TERMINAL },
    ],
  },
  {
    label: "자가용",
    icon: <CarIcon />,
    lines: [
      { text: "전주 IC 진출", road: "호남고속도로" },
      { text: "동군산 IC 진출 → 남원 방면 약 10km 직진", road: "서해안고속도로" },
    ],
  },
  { label: "주차", icon: <ParkingIcon />, lines: [{ text: "푸른안과 건물 뒤편 대형 주차장을 이용하실 수 있습니다." }] },
];

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
            <MapButtons className={styles.mapBtns} />
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

      {/* 교통수단별 안내: 왼쪽 수단 · 오른쪽 설명 + 배지 */}
      <ContentBlock tone="gray">
        <SectionHead first title="교통편 안내" sub="이용하시는 교통수단에 맞춰 안내해 드립니다." />
        <ul className={styles.transit}>
          {TRANSIT.map((t, i) => (
            <li key={t.label} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 60}>
              <p className={styles.transitLabel}>
                <span className={styles.transitIcon}>{t.icon}</span>
                {t.label}
              </p>
              <div className={styles.transitLines}>
                {t.lines.map((l, j) => (
                  <div key={j} className={styles.transitLine}>
                    <p>
                      {l.taxi && <span className={styles.taxi}>택시</span>}
                      {l.road && <span className={styles.road}>{l.road}</span>}
                      {l.text}
                    </p>
                    {l.buses && (
                      <ul className={styles.buses} aria-label="버스 번호">
                        {l.buses.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </ContentBlock>
    </SubLayout>
  );
}
