import Placeholder from "@/components/common/Placeholder";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import DiagnosisBox from "../common/DiagnosisBox";
import SubLayout from "@/components/sub/SubLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import PhotoGrid from "../common/PhotoGrid";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./macular.module.css";

// 증상 원형 5개
const SYMPTOMS = [
  ["사물의 윤곽이", "흐릿해진다"],
  ["직선이 휘거나", "일그러져 보인다"],
  ["시야 가운데가", "어둡게 가려진다"],
  ["글을 읽을 때", "글자가 빠져 보인다"],
  ["색과 밝기 구분이", "둔해진다"],
];

/** 황반변성 페이지 */
export default function MacularPage() {
  return (
    <SubLayout
      path="/retina/macular"
      description={
        <>
          시세포가 모여 있어 중심 시력을 <br className="pc_block" />
          책임지는 망막 한가운데 부위
        </>
      }
    >
      {/* 소개 · 자가진단 · 증상 · 치료 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="황반변성" images={["황반변성 주사 전", "황반변성 주사 후"]}>
          노화 등으로 황반 조직이 손상되어 중심 시력이 떨어지는 질환으로,
          <br className="pc_block" />
          방치하면 실명에 이를 수 있어 조기 발견이 중요합니다.
        </VerticalInfoBox>

        <DiagnosisBox
          title="황반변성 자가진단"
          badge="암슬러 격자 자가진단"
          imageLabel="암슬러 격자"
          items={[
            "평소 쓰는 안경을 착용한 채 격자를 봅니다.",
            "30cm 거리에서 한쪽 눈을 가리고 가운데 점을 봅니다.",
            "가운데를 응시한 채 선의 모양을 확인합니다.",
            "반대쪽 눈도 같은 방법으로 확인합니다.",
          ]}
        />

        {/* 증상: 원형 5개 + 가로 연결선 */}
        <div className={styles.symptomSection}>
          <p suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            다음 중 하나라도 해당된다면 안과 검진을 받아보세요.
          </p>
          <div className={styles.symptomCircles}>
            <div className={`${styles.symptomLine} pc_block`} suppressHydrationWarning data-aos="fade-in" data-aos-delay="1500" data-aos-duration="1000" />
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

        <BadgeBox heading="황반변성 치료">
          <BadgeItem
            badge={
              <>
                정밀 촬영으로 확인하는 <span className="fwb">건성 황반변성</span>
              </>
            }
            media={<MediaImage label="건성 황반변성 촬영" />}
          >
            망막 아래 노폐물이 쌓이며 서서히 진행되는 형태입니다.
            <br className="pc_block" />
            금연, 자외선 차단, 영양 관리 등으로 진행을 늦추는 것이 중요합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                정밀 촬영으로 확인하는 <span className="fwb">습성 황반변성</span>
              </>
            }
            media={<MediaImage label="습성 황반변성 촬영" />}
          >
            비정상 혈관이 자라 출혈과 부종을 일으키는 형태입니다.
            <br className="pc_block" />
            항체 주사, 레이저 등 적극적인 치료가 필요합니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 예방 안내 띠 */}
      <ImgTxtBox
        label="황반변성 안내 배경"
        lead={
          <>
            자외선을 막는 선글라스 착용과 꾸준한 운동은
            <br className="pc_block" />
            황반 건강을 지키는 좋은 습관입니다.
          </>
        }
      />

      {/* 예방 수칙 카드 */}
      <ContentBlock>
        <PhotoGrid items={["혈압 관리", "혈당 관리", "체중 관리", "균형 잡힌 식단", "콜레스테롤 관리", "금연"]} />
      </ContentBlock>
    </SubLayout>
  );
}

/** 치료 항목 안 촬영 이미지 */
function MediaImage({ label }: { label: string }) {
  return (
    <div className={styles.treatImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <Placeholder label={label} aspectRatio="16 / 7" />
    </div>
  );
}
