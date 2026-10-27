import { SITE } from "@/lib/site";
import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import { Notice, Section } from "./parts";
import styles from "./cataract.module.css";

// 수술이 까다로운 백내장 유형
const CASES: { title: string; desc: string }[] = [
  { title: "동공이 작은 경우", desc: "산동(동공 확장)이 잘 되지 않아 수술 시야가 좁습니다." },
  { title: "전방이 좁은 경우", desc: "각막과 수정체 사이 공간(전방)이 좁아 기구 조작이 어렵습니다." },
  { title: "수정체 지지 조직 손상", desc: "섬유소대가 약하거나 끊어져 수정체가 흔들리거나 빠져 있습니다." },
  { title: "말기 백내장", desc: "오래 방치되어 수정체가 매우 단단하고 혼탁한 상태입니다." },
];

/** 백내장 — 고난이도 백내장 수술 */
export default function AdvancedPage() {
  return (
    <SubLayout
      path="/cataract/advanced"
      description={
        <>
          까다로운 조건의 백내장도 <br className="pc_block" />
          충분한 경험을 바탕으로 신중하게 수술합니다.
        </>
      }
    >
      {/* 고난이도 수술 소개 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="고난이도 백내장 수술" imageLabel="고난이도 백내장 수술">
          초음파 유화 장비가 발전하면서 단단한 백내장도
          <br className="pc_block" />
          각막과 주변 조직의 손상을 줄이며 제거할 수 있게 되었습니다.
          <br />
          <br />
          하지만 동공이 잘 커지지 않거나 전방이 좁은 경우,
          <br className="pc_block" />
          수정체를 지지하는 조직이 손상된 경우에는 합병증 가능성이 높고
          <br className="pc_block" />
          2차 수술이 필요한 경우도 많아 숙련된 경험이 중요합니다.
        </InfoBox>

        {/* 까다로운 유형 */}
        <Section en="CASES" title="이런 백내장은 수술이 까다롭습니다">
          <div className={styles.caseGrid}>
            {CASES.map((c, i) => (
              <div key={c.title} className={styles.case} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <Placeholder label={c.title} aspectRatio="1 / 1" />
                <p className={styles.caseTitle}>{c.title}</p>
                <p className={styles.caseDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </ContentBlock>

      {/* 경험 안내 띠 */}
      <ImgTxtBox
        label="고난이도 백내장 수술 배경"
        lead={
          <>
            {SITE.name}는 고난이도 백내장 수술에 대한
            <br className="pc_block" />
            충분한 경험을 쌓아 왔습니다.
          </>
        }
      />

      {/* 공막고정술 */}
      <ContentBlock tone="gray">
        <Section
          first
          en="SCLERAL FIXATION"
          title="섬유소대 손상 백내장과 공막고정술"
          sub={
            <>
              수정체를 붙잡아 주는 섬유소대가 손상된 경우, 인공수정체를 흰자(공막)에 고정하는
              <br className="pc_block" />
              공막고정술을 눈 상태에 맞는 방법으로 시행합니다.
            </>
          }
        >
          <div className={styles.imgPair}>
            {["공막고정술 방법 1", "공막고정술 방법 2"].map((label, i) => (
              <div key={label} suppressHydrationWarning data-aos={i === 0 ? "fade-right" : "fade-left"} data-aos-duration="1500">
                <Placeholder label={label} aspectRatio="4 / 3" />
                <p className={styles.imgCaption}>{label}</p>
              </div>
            ))}
          </div>
          <Notice title="수술 전 정밀 검사가 중요합니다">
            고난이도 백내장은 눈 상태에 따라 수술 방법과 회복 과정이 달라집니다. 정밀 검사 후 의료진이 자세히 설명드립니다.
          </Notice>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}
