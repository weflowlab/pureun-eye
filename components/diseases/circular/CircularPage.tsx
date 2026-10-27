import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./circular.module.css";

/** 황반원공 페이지 */
export default function CircularPage() {
  return (
    <DiseaseLayout
      title="황반원공"
      description={
        <>
          중심 시력을 담당하는 황반에 <br className="pc_block" />
          작은 구멍이 생기는 질환
        </>
      }
    >
      {/* 소개 · 치료 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="황반원공" images={["황반원공 수술 전", "황반원공 수술 후"]}>
          유리체가 노화로 떨어져 나가며 황반을 당겨 구멍이 생기는 질환으로,
          <br className="pc_block" />
          고도 근시나 외상이 원인이 되기도 합니다.
        </VerticalInfoBox>

        {/* 치료 박스: 설명 + 도식 + 수술 정보 */}
        <div className={styles.treatmentBox} suppressHydrationWarning data-aos="fade-in" data-aos-duration="1000">
          <div>
            <p className={styles.treatmentTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              황반원공 치료
            </p>
            <p className={styles.treatmentContent} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              빛간섭단층촬영(OCT) 등 정밀 검사로 원공의 크기와 단계를 확인합니다.
              <br className="pc_block" />
              초기에는 경과를 지켜보기도 하지만, 진행된 경우 유리체 절제술로 치료합니다.
            </p>
            <div className={styles.diagram} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <Placeholder label="유리체 절제술 도식" aspectRatio="16 / 7" />
            </div>
            <div className={styles.surgeryInfo}>
              <p className={styles.surgeryInfoTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                유리체 절제술
              </p>
              <p className={styles.surgeryInfoDesc} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                원인이 된 유리체를 제거하고 눈 안에 가스 등을 채워
                <br className="pc_block" />
                구멍이 아물도록 돕는 수술입니다.
              </p>
            </div>
          </div>
        </div>
      </ContentBlock>

      {/* 수술 후 관리 띠 */}
      <ImgTxtBox
        label="황반원공 안내 배경"
        badge={
          <>
            <span className="fwb">수술 후 관리</span> 엎드린 자세 유지
          </>
        }
        desc={
          <>
            수술 후에는 얼굴이 바닥을 향하도록 엎드린 자세를 유지해야 합니다.
            <br className="pc_block" />
            눈 안의 가스가 위로 떠오르는 성질을 이용해 수술 부위를 눌러주기 때문입니다.
          </>
        }
      />

      {/* 하단 참고 문구 */}
      <ContentBlock>
        <p className={styles.bottomNote} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1000">
          * 가스는 시간이 지나면 자연히 흡수되지만, 실리콘 오일은 별도의 제거 수술이 필요합니다.
        </p>
      </ContentBlock>
    </DiseaseLayout>
  );
}
