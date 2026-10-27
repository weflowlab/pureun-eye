import { SITE } from "@/lib/site";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SubLayout from "@/components/sub/SubLayout";
import { CheckList, EquipCard, Section } from "./parts";
import styles from "./cataract.module.css";

// 센터의 세 가지 강점
const POINTS: { title: string; desc: string }[] = [
  {
    title: "풍부한 수술 경험",
    desc: `${SITE.since}년 개원 이래 30,000례 이상의 백내장 수술을 시행했습니다. 전북은 물론 충남·전남 지역에서도 많은 분들이 찾아주고 계십니다.`,
  },
  {
    title: "고난이도 수술 경험을 갖춘 의료진",
    desc: "수정체 탈구, 작은 동공, 말기 백내장처럼 대학병원에서 주로 시행하는 까다로운 수술도 꾸준히 경험해 왔습니다.",
  },
  {
    title: "정밀한 수술 장비",
    desc: "백내장 수술의 핵심인 수술 현미경과 초음파 유화 장비로 Zeiss LUMERA 700, Alcon Centurion을 사용합니다.",
  },
];

/** 백내장 — 푸른 백내장 노안센터 */
export default function CenterPage() {
  return (
    <SubLayout
      path="/cataract/center"
      description={
        <>
          풍부한 경험, 숙련된 의료진, 정밀한 장비로 <br className="pc_block" />
          백내장과 노안을 함께 살핍니다.
        </>
      }
    >
      {/* 센터 소개 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="푸른 백내장 노안센터" images={["백내장 수술실", "백내장 상담"]}>
          흐려진 수정체를 맑은 인공수정체로 바꾸는 백내장 수술은
          <br className="pc_block" />
          이제 노안과 난시까지 함께 고려하는 맞춤 수술로 발전하고 있습니다.
        </VerticalInfoBox>

        {/* 강점 3가지 */}
        <Section en="WHY PUREUN" title="푸른 백내장 노안센터의 세 가지 강점">
          <div className={styles.pointList}>
            {POINTS.map((p, i) => (
              <div key={p.title} className={styles.point} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.pointNum}>{String(i + 1).padStart(2, "0")}</p>
                <p className={styles.pointTitle}>{p.title}</p>
                <p className={styles.pointDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* 수술 경험 수치 */}
          <div className={styles.stats}>
            <div className={styles.stat} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <p className={styles.statValue}>{SITE.since}</p>
              <p className={styles.statLabel}>개원 이래 한자리에서 진료</p>
            </div>
            <div className={styles.stat} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
              <p className={styles.statValue}>30,000+</p>
              <p className={styles.statLabel}>누적 백내장 수술 건수</p>
            </div>
          </div>
          <p className={styles.footnote}>* 수술 건수는 병원 내부 집계 기준입니다.</p>
        </Section>
      </ContentBlock>

      {/* 학술 활동 안내 띠 */}
      <ImgTxtBox
        label="백내장 노안센터 배경"
        lead={
          <>
            정기적인 학술 컨퍼런스로
            <br className="pc_block" />
            새로운 지견을 꾸준히 익히고 있습니다.
          </>
        }
      />

      {/* 수술 장비 */}
      <ContentBlock tone="gray">
        <Section
          first
          en="EQUIPMENT"
          title="백내장 수술의 핵심 장비"
          sub={
            <>
              안전한 백내장 수술에 가장 중요한 두 가지,
              <br className="pc_block" />
              수술 현미경과 초음파 유화 장비를 소개합니다.
            </>
          }
        >
          <div className={styles.equipList}>
            <EquipCard model="LUMERA700">
              <CheckList
                items={[
                  "독일 Zeiss사의 안과 수술 현미경",
                  "눈 속 조직을 선명하게 보여주는 고배율 시야",
                  "초점 깊이 자동 조절(Depth of Focus), 세극등(Slit lamp) 기능 탑재",
                ]}
              />
            </EquipCard>
            <EquipCard model="Centurion">
              <CheckList
                items={[
                  "수술 중 눈 속 압력을 실시간으로 감지·조절 (Active Fluidics)",
                  "전방을 안정적으로 유지해 수술 중 안정성 향상",
                  "수술 전 과정을 모니터링하며 에너지 사용을 최적화",
                ]}
              />
            </EquipCard>
          </div>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}
