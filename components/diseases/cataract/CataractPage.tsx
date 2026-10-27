import { SITE } from "@/lib/site";
import ContentBlock from "../common/ContentBlock";
import SubLayout from "@/components/sub/SubLayout";
import InfoBox from "../common/InfoBox";
import QnaCard, { QnaList } from "../common/QnaCard";
import SectionTitle from "../common/SectionTitle";
import styles from "./cataract.module.css";

// 자주 묻는 질문
const QNA: [string, string][] = [
  ["백내장 수술은 언제 하는 것이 좋을까요?", "정해진 시기는 없으며, 일상에서 불편을 느낄 때가 적기입니다. 다만 너무 늦어지면 합병증 위험과 회복 기간이 늘어날 수 있습니다."],
  ["백내장을 그냥 두면 어떻게 되나요?", "백내장은 저절로 좋아지지 않습니다. 오래 방치하면 안압 상승 등 다른 문제로 이어질 수 있어 증상이 있다면 검진을 권합니다."],
  ["시력교정술을 받았어도 수술할 수 있나요?", "가능합니다. 시력교정술은 각막을, 백내장 수술은 수정체를 다루는 수술이기 때문입니다."],
  ["수술할 때 많이 아픈가요?", "점안 마취로 진행되어 통증은 크지 않으며, 수술 후 잠시 시리거나 눈물이 날 수 있으나 대개 하루 이틀이면 가라앉습니다."],
  ["백내장은 왜 생기나요?", "대부분 나이에 따른 자연스러운 노화가 원인이며, 당뇨 등 전신 질환이나 외상, 약물 장기 사용으로 생기기도 합니다."],
  ["일상생활은 언제부터 가능한가요?", "가벼운 일상은 다음 날부터 가능하지만, 일정 기간 세안·사우나·격한 운동은 피하고 안내에 따라 관리해야 합니다."],
  ["안약으로도 치료가 되나요?", "안약은 진행을 늦추는 보조 수단일 뿐이며, 이미 생긴 백내장은 수술로 치료합니다."],
  ["수술 시간은 얼마나 걸리나요?", "혼탁해진 수정체를 제거하고 인공수정체를 넣는 수술로, 보통 10~20분 정도 소요됩니다."],
];

// 장비 소개 (항목별 A·B 설명)
const EQUIPMENT: [string, string[]][] = [
  ["정밀 진단 장비", ["눈의 구조를 정밀하게 측정하는 검사 장비", "정확한 인공수정체 도수 계산"]],
  ["고배율 수술 현미경", ["선명한 시야를 제공하는 수술용 현미경", "섬세하고 안정적인 수술 진행"]],
  ["망막·백내장 통합 수술 장비", ["망막 수술과 백내장 수술을 한 장비로", "필요 시 동시 수술 가능"]],
  ["다초점 인공수정체", ["원거리부터 근거리까지 시력 개선", "빛 번짐을 줄인 최신 렌즈 선택 가능"]],
];

/** 백내장 페이지 */
export default function CataractPage() {
  return (
    <SubLayout
      path="/cataract/about"
      description={
        <>
          환자와 눈을 맞추며 <br className="pc_block" />
          한 분 한 분 세심하게 진료합니다.
        </>
      }
    >
      <ContentBlock>
        {/* 소개 */}
        <SectionTitle />
        <InfoBox title="백내장" imageLabel="백내장">
          눈 속 렌즈 역할을 하는 수정체가 뿌옇게 흐려져
          <br className="pc_block" />
          시야가 흐리고 눈부심이 생기는 질환입니다.
          <br className="pc_block" />
          주로 노화로 생기지만 당뇨, 외상, 약물 등도 원인이 될 수 있습니다.
        </InfoBox>

        {/* Q&A 카드 */}
        <QnaList className={styles.qnaBbx}>
          <p className={styles.qnaBbxTxt}>백내장 Q&amp;A</p>
          {QNA.map(([q, a]) => (
            <QnaCard key={q} title={q} tone="dark" fixed>
              <p>{a}</p>
            </QnaCard>
          ))}
        </QnaList>

        {/* 장비 소개 타이틀 */}
        <p className={styles.eqTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {SITE.nameEn}
        </p>
        <p className={styles.eqSub} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
          정확한 검사와 안전한 수술을 위한 {SITE.name}의 장비
        </p>

        {/* 장비 카드 */}
        <QnaList className={styles.qnaBbxR}>
          {EQUIPMENT.map(([name, lines]) => (
            <QnaCard key={name} title={name} fixed>
              <ul className={styles.latinList}>
                {lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </QnaCard>
          ))}
        </QnaList>
      </ContentBlock>
    </SubLayout>
  );
}
