import Placeholder from "@/components/common/Placeholder";
import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import SectionHead from "@/components/clinic/retina/SectionHead";
import { SITE } from "@/lib/site";
import styles from "./tour.module.css";

// 공간 사진 목록 — 사진은 병원에서 새로 받아 교체 (라벨은 예상 공간)
const SPACES = [
  { name: "병원 외관", desc: "백제대로에 위치한 푸른안과" },
  { name: "접수 · 로비", desc: "" },
  { name: "대기실", desc: "" },
  { name: "진료실", desc: "" },
  { name: "검사실", desc: "수술 전 정밀 검사" },
  { name: "시력교정센터", desc: "" },
  { name: "수술실", desc: "" },
  { name: "망막클리닉 보임", desc: "4층" },
  { name: "회복실", desc: "" },
];

/** 병원둘러보기: 대표 사진 + 공간별 사진 그리드 */
export default function TourPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <ContentBlock>
        <SectionHead title={`${SITE.name}를 소개합니다`} sub="편안하고 안전한 진료 환경을 위해 공간 하나하나를 정성껏 준비했습니다." first />

        {/* 대표 사진 */}
        <div className={styles.hero} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <Placeholder label="병원 전경 대표 사진" />
        </div>

        {/* 공간별 사진 */}
        <ul className={styles.grid}>
          {SPACES.map((s, i) => (
            <li key={s.name} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 100} data-aos-duration="1500">
              <Placeholder label={s.name} aspectRatio="4 / 3" />
              <p className={styles.name}>{s.name}</p>
              {s.desc && <p className={styles.desc}>{s.desc}</p>}
            </li>
          ))}
        </ul>
      </ContentBlock>
    </SubLayout>
  );
}
