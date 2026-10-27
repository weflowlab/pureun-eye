import ContentBlock from "@/components/diseases/common/ContentBlock";
import InfoBox from "@/components/diseases/common/InfoBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import { PhilosophyBand, PointList, SecHead, type Point } from "./VisionParts";
import styles from "./vision.module.css";

// 수술 후 주의사항 — [항목, 참고, 라식, 라섹, 스마일]
const CARE: [string, string | null, string, string, string][] = [
  ["세안", null, "1주 이후 (1주간 물티슈 사용)", "1주 이후 (1주간 물티슈 사용)", "3일 이후"],
  ["샤워", null, "2~3일 후", "2~3일 후", "다음 날부터"],
  ["머리 감기", "머리를 뒤로 젖혀 감기", "1주 정도", "1주 정도", "3일 정도"],
  ["대중목욕탕", null, "4주 후부터", "4주 후부터", "2주 후부터"],
  ["화장", "얼굴 / 눈 화장", "1주 이후 / 3~4주 이후", "1주 이후 / 3~4주 이후", "4일 이후 / 2주 이후"],
  ["파마 · 염색", null, "파마 1개월 · 염색 2개월 이후", "파마 1개월 · 염색 2개월 이후", "1개월 이후"],
  ["플라스틱 보호안대", "밤잠·낮잠 잘 때 착용", "4주", "4주", "2주"],
  ["가벼운 운동", "헬스·요가 등", "2주 이후", "1~2주 이후", "1주 이후"],
  ["과격한 운동", "충격을 줄 수 있는 운동", "1개월 이후", "1개월 이후", "2주 이후"],
  ["수영장", "안질환 감염 주의", "2개월 이후", "1개월 이후", "1개월 이후"],
  ["운전", "초기 야간 운전 눈부심 주의", "다음 날부터", "5일 후부터", "다음 날부터"],
  ["음주 · 흡연", null, "1개월 이후", "1개월 이후", "1개월 이후"],
  ["컴퓨터 · 독서", null, "다음 날부터", "3일 이후", "다음 날부터"],
  ["자외선 차단", null, "선택", "필수 (3개월)", "선택"],
];

// 더 좋은 시력을 위한 원칙
const PRINCIPLES: Point[] = [
  {
    title: "원내 망막클리닉 보임에서 추가 망막 검사",
    desc: "시력은 각막이 아닌 망막에서 완성됩니다. 굴절수술 검사와 별도로, 망막 전문의가 수술 전 다른 눈 질환이 없는지 꼼꼼히 확인합니다.",
  },
  {
    title: "당일 검사 · 당일 수술을 권하지 않습니다",
    desc: "편리함보다 정확성이 우선입니다. 굴절검사를 최소 2회 시행해 수술 전 오차를 줄입니다.",
  },
];

/** 시력교정 — 수술 후의 관리 시스템 */
export default function PostCarePage() {
  return (
    <SubLayout
      path="/vision/post-care"
      description={
        <>
          수술 후 관리가 <br className="pc_block" />
          평생의 눈 건강을 좌우합니다.
        </>
      }
    >
      {/* 소개 */}
      <ContentBlock>
        <SectionTitle />
        <InfoBox title="수술 후에도 평생 눈 동반자로" imageLabel="수술 후 정기 검진">
          수술 부위를 잘 관리할수록 건조증, 빛번짐,
          <br className="pc_block" />
          {" "}근시 퇴행 등 합병증의 가능성을 줄일 수 있습니다.
          <br className="pc_block" />
          {" "}스마일 수술은 절개가 작아 상대적으로 내원 부담이 적지만,
          <br className="pc_block" />
          {" "}어떤 수술이든 안내드린 정기 검진 일정에 맞춰 내원해 주세요.
        </InfoBox>
      </ContentBlock>

      {/* 수술 후 주의사항 표 */}
      <ContentBlock tone="gray">
        <SecHead first en="AFTER SURGERY" title="수술 후 주의사항" sub="수술 방법에 따라 일상 복귀 시기가 다릅니다. 개인차가 있으니 의료진 안내를 우선해 주세요." />
        <div className={styles.careTable} role="table" aria-label="수술 방법별 수술 후 주의사항" suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          <div className={`${styles.careRow} ${styles.careHead}`} role="row">
            <span role="columnheader">항목</span>
            <span role="columnheader">라식</span>
            <span role="columnheader">라섹</span>
            <span role="columnheader">스마일</span>
          </div>
          {CARE.map(([label, note, lasik, lasek, smile]) => (
            <div key={label} className={styles.careRow} role="row">
              <span className={styles.careLabel} role="rowheader">
                {label}
                {note && <small>{note}</small>}
              </span>
              <span className={styles.careCell} role="cell" data-label="라식">
                {lasik}
              </span>
              <span className={styles.careCell} role="cell" data-label="라섹">
                {lasek}
              </span>
              <span className={`${styles.careCell} ${styles.smile}`} role="cell" data-label="스마일">
                {smile}
              </span>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          * 수술 후 1~2주 동안은 눈이 쉽게 피로해집니다. 근거리 작업을 오래 할 때는 30분마다 눈을 쉬어 주세요.
        </p>
      </ContentBlock>

      {/* 더 좋은 시력을 위한 원칙 */}
      <ContentBlock>
        <SecHead
          first
          en="FOR BETTER VISION"
          title="더 좋은 시력을 위한 스마일 수술"
          sub={
            <>
              좋은 결과는 수술 과정만으로 완성되지 않습니다.
              <br className="pc_block" />
              {" "}수술 전부터 눈 전반에 대한 철저한 검사가 필요합니다.
            </>
          }
        />
        <PointList items={PRINCIPLES} />
      </ContentBlock>

      {/* 진료 철학 띠 */}
      <PhilosophyBand />
    </SubLayout>
  );
}
