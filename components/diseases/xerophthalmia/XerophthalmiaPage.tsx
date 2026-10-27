import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { BadgeBox, BadgeItem } from "../common/BadgeBox";
import ContentBlock from "../common/ContentBlock";
import DiagnosisBox from "../common/DiagnosisBox";
import DiseaseLayout from "../common/DiseaseLayout";
import ImgTxtBox from "../common/ImgTxtBox";
import PhotoGrid from "../common/PhotoGrid";
import QnaCard, { QnaList } from "../common/QnaCard";
import SectionTitle from "../common/SectionTitle";
import styles from "./xerophthalmia.module.css";

// 케어 프로그램 카드
const CARE: [string, string][] = [
  ["01. 온열 마사지", "따뜻한 열로 눈꺼풀 기름샘의 배출을 돕고, 목과 어깨 근육의 긴장을 풀어 눈의 피로를 덜어줍니다."],
  ["02. 눈꺼풀 세정", "눈꺼풀 가장자리에 쌓인 노폐물과 세균막을 깨끗이 제거해 염증을 줄이고 건강한 눈꺼풀로 회복을 돕습니다."],
  ["03. IPL 레이저", "빛 에너지로 굳은 기름샘을 녹이고 눈꺼풀 주변의 염증성 혈관을 줄여 건조 증상을 개선합니다."],
];

/** 안구건조증 페이지 */
export default function XerophthalmiaPage() {
  return (
    <DiseaseLayout
      title="안구건조증"
      description={
        <>
          원인을 정확히 찾고, 단계에 맞는 <br className="pc_block" />
          체계적인 관리로 불편을 덜어드립니다.
        </>
      }
    >
      {/* 소개 */}
      <ContentBlock>
        <SectionTitle />
        <BadgeBox heading="안구건조증" spacing="md">
          <BadgeItem
            badge="현대인에게 흔한 눈 질환, 안구건조증"
            after={
              <div className={styles.strategyImg} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
                <Placeholder label="안구건조증 단계별 치료" aspectRatio="16 / 7" />
              </div>
            }
          >
            <span className="cr">원인 개선과 단계별 맞춤 치료로 관리합니다.</span>
            <br />
            눈물이 부족하거나 빨리 마르고, 눈 표면에 염증이 생기면서
            <br className="pc_block" />
            이물감과 뻑뻑함이 나타나는 질환으로 근본 원인을 찾는 것이 중요합니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 원인 안내 띠 */}
      <ImgTxtBox
        label="안구건조증 안내 배경"
        lead="안구건조증 원인"
        desc={
          <>
            화면을 오래 보는 생활에서 흔히 생기며,
            <br className="pc_block" />
            생활 습관만 바꿔도 상당 부분 예방할 수 있습니다.
          </>
        }
      />

      {/* 원인 카드 · 자가진단 · 케어 */}
      <ContentBlock>
        <PhotoGrid
          className={styles.causeGrid}
          items={["스트레스", "눈의 피로", "냉난방기 사용", "노화", "약물 복용", "렌즈 장시간 착용"]}
        />

        <DiagnosisBox
          spacious
          title="안구건조증 자가 진단"
          badge="나도 안구건조증일까?"
          imageLabel="안구건조증 자가진단"
          items={[
            "눈이 뻑뻑하고 모래가 들어간 듯하다.",
            "아침에 눈이 건조하고 충혈되어 있다.",
            "빛에 예민하고 눈이 시리다.",
            "갑자기 눈물이 많이 흐른다.",
            "눈에 끈적한 분비물이 낀다.",
            "바람이나 연기에 쉽게 자극을 받는다.",
          ]}
        />

        <p className={styles.xeroTit}>
          {SITE.name}만의 <span className="fwb">안구건조증 케어 시스템</span>
        </p>
        <p className={styles.xeroSub}>건조증과 안검염 예방을 위해 꼼꼼하게 관리합니다.</p>

        <QnaList>
          {CARE.map(([t, d]) => (
            <QnaCard key={t} title={t} inset fixed>
              <p>{d}</p>
            </QnaCard>
          ))}
        </QnaList>
      </ContentBlock>
    </DiseaseLayout>
  );
}
