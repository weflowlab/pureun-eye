import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import PhotoGrid from "../common/PhotoGrid";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./vitreous.module.css";

/** 유리체출혈 페이지 */
export default function VitreousPage() {
  return (
    <DiseaseLayout
      title="유리체출혈"
      description={
        <>
          망막이나 맥락막 혈관의 출혈이 <br className="pc_block" />
          유리체 안으로 번지는 질환
        </>
      }
    >
      {/* 소개 · 원인 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="유리체출혈" images={["유리체출혈 수술 전", "유리체출혈 수술 후"]}>
          투명해야 할 유리체에 피가 고여 시야를 가리는 상태로,
          <br className="pc_block" />
          원인 질환에 따라 심한 시력 손상으로 이어질 수 있어 정기 검사가 필요합니다.
        </VerticalInfoBox>

        <p className={styles.causeTit} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          유리체출혈 원인
        </p>
        <p className={styles.causeStit} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          여러 망막 질환과 외상이 출혈의 원인이 됩니다.
        </p>
        <PhotoGrid items={["당뇨망막병증", "망막박리", "망막열공", "망막혈관폐쇄", "후유리체박리", "외상"]} />
      </ContentBlock>

      {/* 증상 안내 띠 */}
      <ImgTxtBox
        label="유리체출혈 안내 배경"
        desc={
          <>
            출혈이 적으면 <span className="fwb">눈앞에 점이나 실 같은 것이 떠다니는 비문증</span>이,
            <br className="pc_block" />
            출혈이 많으면 <span className="fwb">앞이 거의 보이지 않는 시력 저하</span>가 나타납니다.
            <br className="pc_block" />
            비문증이 생겼다면 <span className="fwb">안저 검사를 꼭 받아보시길 권합니다.</span>
          </>
        }
      />

      {/* 치료: 출혈 범위별 2단 */}
      <ContentBlock>
        <div className={styles.treatmentWrap}>
          <VerticalInfoBox
            title="유리체출혈 치료"
            bottom={
              <div className={styles.treatFbx}>
                {[
                  ["출혈 범위가 작을 경우", "레이저 치료"],
                  ["출혈 범위가 클 경우", "수술적 치료"],
                ].map(([sub, title], i) => (
                  <div key={title} className={i === 0 ? styles.treatBx1 : styles.treatBx2} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                    <div className={styles.titBx}>
                      <p className={styles.titBxTitle}>{sub}</p>
                      <p className={styles.titBxSub}>{title}</p>
                    </div>
                    <div className={styles.treatCont}>
                      <Placeholder label={title} aspectRatio="4 / 3" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            안저 검사로 출혈을 확인하고, 출혈이 많아 안을 볼 수 없으면 초음파로 망막 상태를 살핍니다.
            <br className="pc_block" />
            범위가 작으면 레이저로, 넓으면 유리체 절제술 등 수술로 치료합니다.
          </VerticalInfoBox>
        </div>
      </ContentBlock>
    </DiseaseLayout>
  );
}
