import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import { CheckList, Notice, Section } from "./parts";
import styles from "./cataract.module.css";

// 기본 수술 4단계
const STEPS: { text: string; note?: string }[] = [
  { text: "검은자 가장자리에 약 2.2mm의 작은 절개창을 만듭니다." },
  { text: "수정체를 감싼 앞쪽 막(전낭)을 둥글게 절개합니다.", note: "수정체낭 원형절개술 (CCC)" },
  { text: "절개창으로 기구를 넣어 초음파로 혼탁한 수정체를 잘게 부숴 제거합니다.", note: "초음파 유화술" },
  { text: "수정체가 빠진 자리에 인공수정체를 넣어 마무리합니다." },
];

/** 백내장 — 백내장 수술 선택 방법 */
export default function ChoicePage() {
  return (
    <SubLayout
      path="/cataract/choice"
      description={
        <>
          생활 습관과 눈 상태에 맞춰 <br className="pc_block" />
          나에게 맞는 수술을 함께 고릅니다.
        </>
      }
    >
      {/* 수술 개념 변화 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="백내장 수술, 이제는 ‘굴절 백내장 수술’로" imageLabel="백내장 수술 개념">
          예전 백내장 수술은 흐려진 수정체를 제거해 시력을 되찾는 데 집중했습니다.
          <br className="pc_block" />
          수술 후에도 난시가 있으면 원거리·근거리 모두 안경이 필요했고,
          <br className="pc_block" />
          보통은 먼 곳에 초점을 맞춰 가까운 곳은 돋보기로 보았습니다.
          <br />
          <br />
          최근에는 백내장과 함께 각막 난시, 노안까지 고려하는
          <br className="pc_block" />
          굴절 백내장 수술(refractive cataract surgery)로 발전하고 있습니다.
        </InfoBox>

        {/* 기본 수술 과정 */}
        <Section en="PROCESS" title="기본적인 백내장 수술 과정" sub="백내장 수술은 다음 네 단계로 진행됩니다.">
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.text} className={styles.step} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <Placeholder label={`백내장 수술 과정 ${i + 1}`} aspectRatio="1 / 1" className={styles.stepImg} />
                <p className={styles.stepNum}>STEP {String(i + 1).padStart(2, "0")}</p>
                <p className={styles.stepText}>
                  {s.text}
                  {s.note && <span className={styles.stepNote}>{s.note}</span>}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </ContentBlock>

      {/* 선택 가이드 */}
      <ContentBlock tone="gray">
        <Section
          first
          en="GUIDE"
          title="백내장 수술 선택 가이드"
          sub={
            <>
              일반 백내장 수술과 굴절(다초점) 백내장 수술 중 무엇이 맞을지는
              <br className="pc_block" />
              생활 습관, 비용 부담, 다른 눈 질환 여부를 함께 살펴 결정합니다.
            </>
          }
        >
          <div className={styles.compare}>
            <div className={styles.compareCard} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
              <p className={styles.compareTag}>MONOFOCAL</p>
              <p className={styles.compareTitle}>일반 백내장 수술</p>
              <p className={styles.compareDesc}>단초점 인공수정체로 한 거리(주로 원거리)에 초점을 맞춥니다.</p>
              <CheckList
                items={["비용 부담을 줄이고 싶은 분", "돋보기 사용이 불편하지 않은 분", "독서·스마트폰 등 근거리 활동이 많지 않은 분"]}
              />
            </div>
            <div className={`${styles.compareCard} ${styles.on}`} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
              <p className={styles.compareTag}>MULTIFOCAL</p>
              <p className={styles.compareTitle}>굴절(다초점) 백내장 수술</p>
              <p className={styles.compareDesc}>다초점 인공수정체로 원거리와 근거리를 함께 보도록 돕습니다.</p>
              <CheckList
                items={["안경·돋보기 의존을 줄이고 싶은 분", "원거리와 근거리 활동이 모두 많은 분", "수술 전 검사에서 다초점 렌즈가 적합하다고 판단된 분"]}
              />
            </div>
          </div>

          <Notice title="다초점 인공수정체, 이런 경우는 신중하게">
            망막 질환, 녹내장, 불규칙한 각막 난시가 있다면 다초점 렌즈의 장점을 충분히 누리기 어려울 수 있어
            <br className="pc_block" />
            수술 전 정밀 검사 후 의료진과 충분히 상의해 결정합니다.
          </Notice>
          <Notice title="고도근시가 있는 백내장이라면">
            수술 전 근시가 심했던 분은 근시를 약간 남겨 두는 것이 오히려 생활 만족도를 높이는 경우가 있습니다.
          </Notice>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}
