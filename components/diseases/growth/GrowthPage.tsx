import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./growth.module.css";

/** 중심성장액망막병증 페이지 */
export default function GrowthPage() {
  return (
    <DiseaseLayout
      title="중심성장액망막병증"
      compactTitle
      description={
        <>
          맥락막 혈류 이상으로 황반 아래에 <br className="pc_block" />
          물이 고여 붓는 질환
        </>
      }
    >
      {/* 소개 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="중심성장액망막병증" images={["마이크로펄스 레이저 시술 전", "마이크로펄스 레이저 시술 후"]}>
          망막 아래 장벽 역할을 하는 색소상피층이 약해지면서
          <br className="pc_block" />
          맥락막의 액체가 망막 쪽으로 스며들어 시야가 흐려지고 왜곡됩니다.
        </VerticalInfoBox>
      </ContentBlock>

      {/* 치료와 예방 띠 */}
      <ImgTxtBox
        label="중심성장액망막병증 안내 배경"
        badge={
          <>
            <span className="fwb">중심성장액망막병증</span> 치료와 예방
          </>
        }
        desc={
          <>
            급성인 경우 저절로 좋아지는 경우가 많아 수개월간 경과를 지켜봅니다.
            <br className="pc_block" />
            스트레스가 주요 악화 요인이므로 충분한 휴식과 수면이 중요합니다.
          </>
        }
      />

      {/* 레이저 치료 박스 */}
      <ContentBlock>
        <div className={styles.laserBox} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1000">
          <div>
            <p className={styles.laserTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              마이크로 펄스 레이저
            </p>
            <p className={styles.laserContent} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              재발이 잦거나 회복이 더딘 경우, 빠른 회복을 원하는 경우에 적용합니다.
              <br className="pc_block" />
              {"황반 조직 손상을 최소화하는 레이저로 안전하게 치료합니다."}
            </p>
          </div>
        </div>
      </ContentBlock>
    </DiseaseLayout>
  );
}
