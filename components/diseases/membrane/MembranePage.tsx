import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import SectionTitle from "../common/SectionTitle";
import TitSelectBar from "../common/TitSelectBar";
import VerticalInfoBox from "../common/VerticalInfoBox";

/** 망막전막 페이지 */
export default function MembranePage() {
  return (
    <DiseaseLayout
      title="망막전막"
      description={
        <>
          망막 표면에 얇은 막이 생겨 <br className="pc_block" />
          시력이 떨어지고 사물이 휘어 보이는 질환
        </>
      }
    >
      {/* 소개 · 증상 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="망막전막" images={["망막전막 수술 전", "망막전막 수술 후"]}>
          주로 노화로 생기며, 다른 눈 질환이나 수술 이후에 나타나기도 합니다.
          <br className="pc_block" />
          초기에는 불편이 크지 않아 모르고 지내는 경우가 많습니다.
        </VerticalInfoBox>
        <VerticalInfoBox
          title="망막전막 증상 및 자가 진단"
          small
          images={[
            <>
              시야가
              <br />
              흐릿하다
            </>,
            <>
              눈앞에 빛이
              <br />
              번쩍인다
            </>,
            <>
              직선이
              <br />
              휘어 보인다
            </>,
            <>
              눈이 뻑뻑하고
              <br />
              침침하다
            </>,
            <>
              눈앞에 이물이
              <br />
              떠다닌다
            </>,
          ]}
        >
          사물이 휘어 보이거나 크기가 다르게 보이는 변시증이 나타날 수 있습니다.
          <br className="pc_block" />
          아래 증상이 있다면 검사를 받아보세요.
        </VerticalInfoBox>
      </ContentBlock>

      {/* 치료 안내 띠 */}
      <ImgTxtBox
        label="망막전막 안내 배경"
        lead="망막전막 치료"
        desc={
          <>
            증상이 없다면 정기 검사로 경과를 지켜보고,
            <br className="pc_block" />
            시력 저하가 있으면 <span className="fwb">유리체 절제술</span>로 막을 제거합니다.
            <br className="pc_block" />
            필요한 경우 <span className="fwb">백내장 수술을 함께 진행</span>합니다.
          </>
        }
      />

      {/* 치료 흐름 바 */}
      <ContentBlock>
        <TitSelectBar items={["유리체 절제술", "망막전막 치료", "백내장 수술"]} />
      </ContentBlock>
    </DiseaseLayout>
  );
}
