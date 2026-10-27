import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import SectionTitle from "../common/SectionTitle";
import TitSelectBar from "../common/TitSelectBar";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./detachment.module.css";

/** 망막박리 페이지 */
export default function DetachmentPage() {
  return (
    <DiseaseLayout
      title="망막박리"
      description={
        <>
          망막이 눈 안쪽 벽에서 <br className="pc_block" />
          들뜨거나 떨어지는 질환
        </>
      }
    >
      {/* 소개 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="망막박리" images={["망막박리 수술 전", "망막박리 수술 후"]}>
          망막에 구멍이나 찢어짐이 생기면 그 틈으로 액체가 스며들어 망막이 떨어집니다.
          <br className="pc_block" />
          시야 일부가 가려지다가 방치하면 실명으로 이어질 수 있습니다.
        </VerticalInfoBox>
      </ContentBlock>

      {/* 치료와 예방 띠 */}
      <ImgTxtBox
        label="망막박리 안내 배경"
        badge={
          <>
            <span className="fwb">망막박리</span> 치료와 예방
          </>
        }
        desc={
          <>
            박리 전 단계의 망막열공은 레이저로 더 진행되지 않도록 막고,
            <br className="pc_block" />
            이미 박리가 생겼다면 수술로 망막을 다시 붙여야 합니다.
          </>
        }
      />

      {/* 수술 방법 */}
      <ContentBlock>
        <p className={styles.bottomNote} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000">
          환자 상태에 따라 유리체 절제술 또는 공막돌륭술로 치료합니다.
        </p>
        <TitSelectBar items={["유리체 절제술", "망막박리 치료", "공막돌륭술"]} aos />
      </ContentBlock>
    </DiseaseLayout>
  );
}
