import Link from "next/link";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import { EXAM_GROUPS } from "@/lib/vision";
import { PhilosophyBand, SecHead } from "./VisionParts";
import styles from "./vision.module.css";

// 검사 원칙 3가지
const PRINCIPLES: [string, string][] = [
  ["꼭 필요한 검사를 빠짐없이", "검사의 개수보다 내 눈에 필요한 검사를 놓치지 않는 것이 중요합니다."],
  ["검사의 질을 높게", "숙련된 검사 인력이 정밀 장비로 정확한 측정값을 얻습니다."],
  ["신중한 의료진 판단", "의심스러운 결과는 필요한 만큼 반복 검사해 안전성을 확인합니다."],
];

/** 시력교정 — 수술 전 진료 시스템 */
export default function PreCarePage() {
  return (
    <SubLayout
      path="/vision/pre-care"
      description={
        <>
          안전한 시력교정은 <br className="pc_block" />
          꼼꼼한 수술 전 검사에서 시작됩니다.
        </>
      }
    >
      {/* 소개 · 검사 원칙 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="수술 전 진료 시스템" imageLabel="수술 전 정밀 검사">
          시력교정수술에서 가장 중요한 단계는 수술 전 검사입니다.
          <br className="pc_block" />
          {" "}푸른안과는 굴절수술의 기준이 되는 특수검사를
          <br className="pc_block" />
          {" "}오랜 수술 경험을 바탕으로 정밀하게 진행하고,
          <br className="pc_block" />
          {" "}검사 결과를 종합해 눈에 맞는 수술 방법을 함께 정합니다.
        </InfoBox>

        <SecHead en="PRINCIPLE" title="푸른안과 검사 원칙" sub="검사의 수보다, 검사의 정확도와 해석이 더 중요합니다." />
        <div className={styles.cards}>
          {PRINCIPLES.map(([t, d], i) => (
            <div key={t} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.cardTitle}>{t}</p>
              <p className={styles.cardDesc}>{d}</p>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 33가지 수술 전 검사 */}
      <ContentBlock tone="gray">
        <SecHead
          first
          en="33 EXAMINATIONS"
          title={
            <>
              <span className={styles.examCount}>33</span>
              <br />
              가지 수술 전 검사
            </>
          }
          sub={
            <>
              시력·굴절부터 각막, 망막·시신경까지
              <br className="pc_block" />
              {" "}수술 적합 여부와 수술 방법을 결정하는 데 필요한 검사를 시행합니다.
            </>
          }
        />
        <div className={styles.examGroups}>
          {EXAM_GROUPS.map((g, i) => (
            <div key={g.title} className={styles.examGroup} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 2) * 100} data-aos-duration="1500">
              <p className={styles.examGroupTitle}>
                {g.title}
                <small>{g.items.length}</small>
              </p>
              <ul className={styles.chips}>
                {g.items.map(([name, en]) => (
                  <li key={name} className={styles.chip}>
                    {name}
                    {en && <small>{en}</small>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 망막 검사 안내 (망막클리닉 보임 연계) */}
      <ContentBlock>
        <SecHead first en="DID YOU KNOW?" title="시력교정수술 전, 망막검사는 필수입니다" />
        <InfoBox title="망막클리닉 보임과 함께하는 망막 검사" imageLabel="망막클리닉 보임" reverse>
          시력은 각막이 아니라 눈 가장 안쪽의 망막에서 완성됩니다.
          <br className="pc_block" />
          {" "}푸른안과는 원내 망막클리닉 보임에서
          <br className="pc_block" />
          {" "}수술 전 망막 상태를 전문적으로 확인합니다.
          <br />
          <Link href="/retina/boim" className={styles.linkBtn}>
            망막클리닉 보임 바로가기
          </Link>
        </InfoBox>
      </ContentBlock>

      {/* 진료 철학 띠 */}
      <PhilosophyBand />
    </SubLayout>
  );
}
