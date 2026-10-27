import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import InfoBox from "../common/InfoBox";
import SectionTitle from "../common/SectionTitle";
import SymptomGrid from "../common/SymptomGrid";
import DiabeticSlider from "./DiabeticSlider";

/** 당뇨망막증 페이지 */
export default function DiabeticPage() {
  return (
    <DiseaseLayout
      title="망막센터"
      description={
        <>
          시력의 중심이 되는 망막을 <br className="pc_block" />
          세심한 진단과 치료로 지켜드립니다.
        </>
      }
    >
      {/* 망막·질환 소개 + 증상 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="망막" imageLabel="망막 구조">
          눈 안쪽 벽을 덮고 있는 얇은 신경막으로,
          <br className="pc_block" />
          카메라의 필름처럼 상이 맺히는 곳입니다.
          <br />
          <br />
          들어온 빛을 신호로 바꿔 뇌로 전달하기 때문에
          <br className="pc_block" />
          시력에 있어 가장 중요한 조직 중 하나입니다.
        </InfoBox>
        <InfoBox title="당뇨망막증" image={<DiabeticSlider />}>
          <span className="cr fw500">
            당뇨로 인해 망막의 미세혈관이 손상되는 합병증
            <br />
            <br />
          </span>
          혈관에서 피나 진물이 새면 망막이 붓고 시력이 떨어질 수 있으며,
          <br className="pc_block" />
          신생혈관 유무에 따라 비증식성과 증식성으로 나뉩니다.
        </InfoBox>
        <SymptomGrid
          title="당뇨망막증 증상"
          subtitle={
            <>
              초기에는 자각 증상이 거의 없어 놓치기 쉽지만, <span className="fwb">진행되면 출혈로 시력을 크게 잃을 수 있어</span>{" "}
              정기 검진이 중요합니다.
            </>
          }
          items={[
            <>
              눈앞에 점이나 그림자가
              <br />
              떠다니는 느낌
            </>,
            <>
              전체적으로 시야가
              <br />
              뿌옇고 흐림
            </>,
            <>
              어두운 곳에서
              <br />
              보기가 힘듦
            </>,
            <>
              눈을 깜빡일 때
              <br />
              빛이 번쩍임
            </>,
          ]}
        />
      </ContentBlock>

      {/* 관리 안내 띠 */}
      <ImgTxtBox
        label="당뇨망막증 안내 배경"
        lead={
          <>
            당뇨를 오래 앓을수록 망막 합병증 위험이 커집니다.
            <br className="pc_block" />
            혈당을 꾸준히 조절하고 정기적으로 안저 검사를 받으세요.
          </>
        }
      />

      {/* 치료 */}
      <ContentBlock>
        <InfoBox title="당뇨망막증 치료" imageLabel="당뇨망막증 치료">
          초기에는 경과 관찰과 혈당 관리로 진행을 늦출 수 있으며,
          <br className="pc_block" />
          진행된 경우 레이저 치료, 항체 주사, 유리체 절제술 등을
          <br className="pc_block" />
          상태에 맞춰 시행합니다.
        </InfoBox>
      </ContentBlock>
    </DiseaseLayout>
  );
}
