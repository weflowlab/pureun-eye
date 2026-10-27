import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SubLayout from "@/components/sub/SubLayout";
import { Section } from "./parts";
import styles from "./cataract.module.css";

// 레이저 백내장 수술의 특징
const FEATURES: { key: string; title: string; desc: string }[] = [
  {
    key: "더 정확하게",
    title: "정확한 위치·크기의 전낭 절개",
    desc: "레이저로 수정체 앞쪽 막(전낭)을 계획한 위치와 크기대로 둥글게 절개해, 인공수정체가 안정적으로 자리 잡도록 돕습니다. 수술 후 굴절 오차로 목표 시력에서 벗어나는 경우를 줄이는 데 도움이 됩니다.",
  },
  {
    key: "더 편안하게",
    title: "초음파 사용량과 수술 시간 감소",
    desc: "기존 수술은 초음파 에너지로 인한 열이 각막 내피세포나 절개 부위에 부담을 줄 수 있었습니다. 레이저로 수정체를 미리 분할하면 초음파 사용량과 수술 시간을 줄여 눈의 부담을 덜 수 있습니다.",
  },
  {
    key: "더 정교하게",
    title: "백내장과 굴절이상을 함께 고려한 맞춤 수술",
    desc: "혼탁한 수정체 제거와 함께 난시 등 굴절이상 교정, 다초점 렌즈를 이용한 노안 교정까지 개인 눈 상태에 맞춰 계획할 수 있습니다.",
  },
];

/** 백내장 — 레이저 백내장 수술 */
export default function LaserPage() {
  return (
    <SubLayout
      path="/cataract/laser"
      description={
        <>
          3차원 안구 분석으로 계획하는 <br className="pc_block" />
          환자 맞춤형 레이저 백내장 수술
        </>
      }
    >
      {/* 레이저 백내장 소개 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="카탈리스 레이저 백내장 수술" bottom={<LaserImage label="카탈리스 레이저 장비" />}>
          레이저로 수술의 주요 단계를 미리 계획하고 시행하는
          <br className="pc_block" />
          보다 정밀한 방식의 백내장 수술입니다.
        </VerticalInfoBox>

        {/* 3D OCT */}
        <InfoBox title="3D OCT 안구 분석" imageLabel="3D OCT 이미지">
          3D OCT로 안구를 스캔한 뒤 3차원 시뮬레이션으로
          <br className="pc_block" />
          안구 앞뒤 구조를 정밀하게 분석합니다.
          <br />
          <br />
          수술 부위를 정확히 확인한 뒤 레이저를 조사하도록 돕는
          <br className="pc_block" />
          진단·가이드 시스템입니다.
        </InfoBox>

        {/* 일반 vs 레이저 비교 */}
        <Section en="COMPARE" title="일반 백내장 수술과 레이저 백내장 수술" sub="두 가지 수술 방식의 차이를 비교해 보세요.">
          <div className={styles.imgPair}>
            {["일반 백내장 · 레이저 백내장 비교", "일반 백내장 · 레이저 백내장 비교표"].map((label, i) => (
              <div key={label} suppressHydrationWarning data-aos={i === 0 ? "fade-right" : "fade-left"} data-aos-duration="1500">
                <Placeholder label={label} aspectRatio="4 / 3" />
              </div>
            ))}
          </div>
        </Section>
      </ContentBlock>

      {/* 선택 안내 띠 */}
      <ImgTxtBox label="레이저 백내장 경험 이미지" lead="두 가지 다른 수술 방식," desc="내 눈에 맞는 방법을 의료진과 함께 선택하세요." />

      {/* 특징 3가지 */}
      <ContentBlock tone="gray">
        <Section first en="FEATURES" title="레이저 백내장 수술의 특징">
          <div className={styles.featureList}>
            {FEATURES.map((f) => (
              <div key={f.key} className={styles.feature} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                <p className={styles.featureKey}>{f.key}</p>
                <div>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.footnote}>* 레이저 백내장 수술 적용 여부와 결과는 눈 상태에 따라 다를 수 있습니다.</p>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}

/** 장비 이미지 (실사진 확보 전 플레이스홀더) */
function LaserImage({ label }: { label: string }) {
  return (
    <div className={styles.laserImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <Placeholder label={label} aspectRatio="16 / 9" />
    </div>
  );
}
