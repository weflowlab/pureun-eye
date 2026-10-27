import SubLayout from "@/components/sub/SubLayout";
import EquipPhoto from "../common/EquipPhoto";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import ImgTxtBox from "../common/ImgTxtBox";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import SymptomGrid from "../common/SymptomGrid";
import VerticalInfoBox from "../common/VerticalInfoBox";

/** 중심성 망막증(중심성 장액맥락망막병증) 페이지 */
export default function GrowthPage() {
  return (
    <SubLayout
      path="/retina/csc"
      description={
        <>
          황반에 물이 고여 <br className="pc_block" />
          시력이 떨어지는 질환
        </>
      }
    >
      {/* 정의 · 증상 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="중심성 장액맥락망막병증" images={["정상 황반", "황반 아래 고인 액체"]}>
          망막의 중심부인 <span className="fwb">황반</span>에 물이 고여 시력이 떨어지는 질환입니다.
          <br className="pc_block" />
          주로 중년 남성에게서 과로, 과음, 수면 부족, 스트레스가 겹칠 때 잘 생깁니다.
        </VerticalInfoBox>

        <SymptomGrid
          title="중심성 망막증 증상"
          subtitle={
            <>
              <span className="fwb">중심부에 동그란 원이 보인다</span>고 말씀하시는 경우가 많으며, 아래 증상이 함께 나타날 수 있습니다.
            </>
          }
          items={[
            <>
              대개 가벼운
              <br />
              시력 저하
            </>,
            <>
              시야 가운데에
              <br />
              동그란 원이 보임
            </>,
            <>
              물체가 실제보다
              <br />
              작게 보임
            </>,
            <>
              물체가 찌그러져 보이는
              <br />
              변시증
            </>,
          ]}
        />
      </ContentBlock>

      {/* 치료 방향 안내 띠 */}
      <ImgTxtBox
        label="중심성 망막증 안내 배경"
        badge="먼저 충분한 휴식부터"
        lead={
          <>
            충분히 자고 스트레스 요인을 줄이면
            <br className="pc_block" />
            많은 경우 특별한 치료 없이 3개월 이내에 좋아집니다.
          </>
        }
        desc={
          <>
            간혹 회복에 오랜 시간이 걸리기도 하며,
            <br className="pc_block" />
            2~3개월을 지켜봐도 나아지지 않으면 치료를 시작합니다.
          </>
        }
      />

      {/* 정밀 검사 · 치료 */}
      <ContentBlock>
        <InfoBox title="망막 정밀 검사" image={<EquipPhoto model="Zeiss OCT HD5000 Angioflex" />}>
          빛간섭단층촬영(OCT)으로 황반 아래 고인 액체의 양을 확인하고,
          <br className="pc_block" />
          필요한 경우 혈관조영 검사로 액체가 새어 나오는
          <br className="pc_block" />
          누출점의 위치를 찾아 치료 방법을 정합니다.
        </InfoBox>

        <BadgeBox heading="중심성 망막증 치료">
          <BadgeItem
            badge={
              <>
                01 <span className="fwb">국소 레이저 치료</span>
              </>
            }
          >
            누출점이 황반 중심에서 충분히 떨어져 있을 때 시도할 수 있으며,
            <br className="pc_block" />
            누출 부위에 레이저를 비춰 망막 아래 고인 액체를 줄입니다.
            <br className="pc_block" />
            치료 부위에 작은 암점이 영구적으로 남을 수 있어, 누출점이 황반 중심에 가까우면 시행하지 않습니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                02 <span className="fwb">광역학 치료 (PDT)</span>
              </>
            }
          >
            특수 약물을 혈관에 주입한 뒤 망막 중심부에 특정 파장의 빛을 비추면
            <br className="pc_block" />
            광화학 반응으로 맥락막의 비정상 혈관에서 액체가 새는 것을 줄여 줍니다.
            <br className="pc_block" />
            재발 가능성을 어느 정도 낮출 수 있으며, 푸른안과에서 시행하고 있습니다.
            <br className="pc_block" />
            다만 치료 후 최소 48시간 동안 햇빛 등 가시광선을 피해야 해 일정 조율이 필요합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                03 <span className="fwb">안구 내 항체 주사</span>
              </>
            }
          >
            1개월 간격으로 반복 치료할 수 있습니다.
            <br className="pc_block" />
            다만 재발 가능성을 낮추지는 못합니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>
    </SubLayout>
  );
}

