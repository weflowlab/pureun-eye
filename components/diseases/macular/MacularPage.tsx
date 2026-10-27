import SubLayout from "@/components/sub/SubLayout";
import EquipPhoto from "../common/EquipPhoto";
import SectionHead from "@/components/clinic/retina/SectionHead";
import rs from "@/components/clinic/retina/retina.module.css";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import DiagnosisBox from "../common/DiagnosisBox";
import ImgTxtBox from "../common/ImgTxtBox";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./macular.module.css";

// 황반변성 종류 (기존 원고)
const TYPES = [
  {
    title: "건성 황반변성",
    sub: "비삼출성",
    desc: "망막 바깥층 조직의 변성·위축과 함께 드루젠(노폐물)이 쌓입니다. 시력 손상은 대개 경미하지만, 위축이 심해지면 심한 시력 손실로 이어질 수 있습니다.",
  },
  {
    title: "습성 황반변성",
    sub: "삼출성",
    desc: "건성이 진행해 맥락막에 신생혈관이 생기고, 여기서 나온 혈액과 삼출액이 중심부 망막을 침범해 시력이 떨어집니다. 초기에 치료하지 않으면 중심 시력이 영구적으로 손상될 수 있습니다.",
  },
];

// 증상 원형 4개
const SYMPTOMS = [
  ["초기에는 뚜렷한", "증상이 없기도 합니다"],
  ["직선이 물결치듯", "굽어 보입니다 (변형시)"],
  ["가운데가 흐려지는", "중심 시력 저하"],
  ["한쪽 눈에만 생기면", "알아채기 어렵습니다"],
];

/** 황반변성 페이지 */
export default function MacularPage() {
  return (
    <SubLayout
      path="/retina/macular"
      description={
        <>
          중심 시력을 담당하는 황반에 <br className="pc_block" />
          변성이 생기는 질환
        </>
      }
    >
      {/* 질환 소개 · 종류 · 증상 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="나이관련 황반변성" images={["정상 황반", "황반변성"]}>
          망막의 중심에 있는 <span className="fwb">황반</span>에 변성이 생기는 질환입니다.
          <br className="pc_block" />
          노년층 실명의 주요 원인 중 하나로, 적절한 시기에 치료받지 않으면
          <br className="pc_block" />
          되돌릴 수 없는 시력 손실로 이어질 수 있습니다.
        </VerticalInfoBox>

        <SectionHead title="황반변성의 종류" sub="황반변성으로 인한 심한 시력 손실은 대부분 습성 황반변성에서 생깁니다." />
        <div className={`${rs.secBody} ${styles.types}`}>
          {TYPES.map((t, i) => (
            <div key={t.title} className={rs.value} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={rs.valueNum}>{String(i + 1).padStart(2, "0")}</p>
              <p className={rs.valueTitle}>
                {t.title} <span className={styles.typeSub}>({t.sub})</span>
              </p>
              <p className={rs.valueDesc}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* 증상: 원형 4개 + 가로 연결선 */}
        <div className={styles.symptomSection}>
          <p suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            황반변성 증상
          </p>
          <div className={styles.symptomCircles}>
            <div className={`${styles.symptomLine} pc_block`} suppressHydrationWarning data-aos="fade-in" data-aos-delay="1000" data-aos-duration="1000" />
            {SYMPTOMS.map(([a, b], i) => (
              <div key={a} className={styles.symptomCircle} suppressHydrationWarning data-aos="fade-right" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.symptomNum}>{String(i + 1).padStart(2, "0")}</p>
                <p className={styles.symptomText}>
                  {a}
                  <br />
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DiagnosisBox
          title="한쪽 눈씩 확인하세요"
          badge="황반변성 자가 확인법"
          imageLabel="암슬러 격자"
          items={[
            "한쪽 눈을 가리고 다른 눈으로 격자나 직선을 봅니다.",
            "선이 물결치듯 휘어 보이는지 확인합니다.",
            "가운데가 흐리거나 어둡게 보이는지 확인합니다.",
            "반대쪽 눈도 같은 방법으로 번갈아 확인합니다.",
          ]}
        />
      </ContentBlock>

      {/* 조기 진료 안내 띠 */}
      <ImgTxtBox
        label="황반변성 안내 배경"
        lead={
          <>
            한쪽 눈에 먼저 생기면 반대쪽 눈 때문에 이상을 느끼지 못할 때가 많습니다.
            <br className="pc_block" />
            변형시나 시력 저하가 느껴지면 바로 진료를 받으세요.
          </>
        }
      />

      {/* 정밀 검사 · 치료 */}
      <ContentBlock>
        <InfoBox title="망막 정밀 검사" image={<EquipPhoto model="Zeiss OCT HD5000 Angioflex" />}>
          빛간섭단층촬영(OCT)으로 황반의 단면을 촬영해
          <br className="pc_block" />
          드루젠, 망막 아래 고인 액체, 신생혈관 여부를 확인하고
          <br className="pc_block" />
          치료 방법과 주사 간격을 결정합니다.
        </InfoBox>

        <BadgeBox heading="황반변성 치료">
          <BadgeItem
            badge={
              <>
                01 <span className="fwb">항체 주사 치료</span>
              </>
            }
          >
            2000년대 초반 항체 주사 치료가 도입되면서 습성 황반변성도
            <br className="pc_block" />
            시력 유지·개선을 기대할 수 있게 되었습니다. 효과에는 개인차가 있습니다.
            <br className="pc_block" />
            주사 효과가 1~2개월 정도 지속되므로 1~2개월 간격으로 반복 치료가 필요합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                02 <span className="fwb">광역학 레이저 치료 (PDT)</span>
              </>
            }
          >
            광감각물질을 혈관에 주사한 뒤 일정한 파장의 빛을 비추면
            <br className="pc_block" />
            활성화된 약물이 신생혈관을 막습니다.
            <br className="pc_block" />
            주사 치료에 반응이 부족한 경우에 시도해볼 수 있습니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>
    </SubLayout>
  );
}

