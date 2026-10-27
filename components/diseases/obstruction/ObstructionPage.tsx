import Placeholder from "@/components/common/Placeholder";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import SectionTitle from "../common/SectionTitle";
import VerticalInfoBox from "../common/VerticalInfoBox";
import styles from "./obstruction.module.css";

// 시야 비교 이미지 3장
const VIEWS = ["정상 시야", "망막혈관폐쇄증(변시증)", "망막혈관폐쇄증(중심시력저하)"];
// 위험 요인 원형 4개
const RISKS = ["고혈압", "동맥경화", "고지혈증", "당뇨"];

/** 망막혈관폐쇄증 페이지 */
export default function ObstructionPage() {
  return (
    <DiseaseLayout
      title="망막혈관폐쇄증"
      description={
        <>
          망막 혈관이 막혀 혈류와 산소 공급이 끊기고 <br className="pc_block" />
          출혈과 부종이 생기는 질환
        </>
      }
    >
      {/* 소개 · 치료 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="망막혈관폐쇄증" images={["망막혈관폐쇄증 수술 전", "망막혈관폐쇄증 수술 후"]}>
          흔히 &lsquo;눈 중풍&rsquo;이라 불리며, 막힌 혈관의 위치와 범위에 따라
          <br className="pc_block" />
          통증 없이 갑자기 시력이 떨어지거나 시야가 가려질 수 있습니다.
        </VerticalInfoBox>

        <BadgeBox heading="망막혈관폐쇄증 치료">
          <BadgeItem
            badge="빠른 진단과 치료가 시력을 좌우합니다"
            after={
              <>
                {/* 시야 비교 3장 */}
                <div className={styles.img3Fbx}>
                  {VIEWS.map((v, i) => (
                    <div key={v} className={styles.img3Bx} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i ? i * 100 : undefined} data-aos-duration="1500">
                      <div className={styles.img3}>
                        <Placeholder label={v} aspectRatio="4 / 3" />
                      </div>
                      <p>{v}</p>
                    </div>
                  ))}
                </div>
              </>
            }
          >
            동맥이 막힌 경우는 응급 상황으로 즉시 혈류 회복을 위한 처치가 필요합니다.
            <br className="pc_block" />
            정맥이 막힌 경우에도 황반 부종이나 녹내장으로 이어질 수 있어 신속한 치료가 중요합니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 치료 안내 띠 */}
      <ImgTxtBox
        label="망막혈관폐쇄증 안내 배경"
        lead={
          <>
            황반 부종이 확인되면 주사 치료를 우선 고려하고,
            <br className="pc_block" />
            필요에 따라 레이저로 비정상 혈관 생성을 억제합니다.
          </>
        }
      />

      {/* 고위험군 */}
      <ContentBlock>
        <div className={styles.riskSection}>
          <p className={styles.riskTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            아래 질환이 있다면 발병 위험이 높아
            <br className="pc_block" />
            1년에 한 번 정기 검사를 권장합니다.
          </p>
          <p className={styles.riskSubtext} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            혈관이 수축하기 쉬운 추운 환경과 기름진 음식은 피하고,
            <br className="pc_block" />
            채소와 생선 위주의 식단을 권장합니다.
          </p>
          <div className={styles.riskCircles}>
            {RISKS.map((r, i) => (
              <div key={r} className={styles.riskCircle} suppressHydrationWarning data-aos="fade-right" data-aos-delay={i * 100} data-aos-duration="1500">
                <p className={styles.riskNum}>{String(i + 1).padStart(2, "0")}</p>
                <p className={styles.riskText}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>
    </DiseaseLayout>
  );
}
