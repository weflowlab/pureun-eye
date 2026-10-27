import SubLayout from "@/components/sub/SubLayout";
import { BadgeBox, BadgeItem } from "@/components/diseases/common/BadgeBox";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import DiagnosisBox from "@/components/diseases/common/DiagnosisBox";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import InfoBox from "@/components/diseases/common/InfoBox";
import QnaCard, { QnaList } from "@/components/diseases/common/QnaCard";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SymptomGrid from "@/components/diseases/common/SymptomGrid";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SectionHead from "./SectionHead";
import styles from "./retina.module.css";

// 자주 묻는 질문 (기존 원고 내용을 문답으로 재구성)
const QNA = [
  {
    q: "비문증은 저절로 좋아지나요?",
    a: "망막열공·망막박리가 없는 비문증은 대부분 수개월이 지나면 적응되어 불편이 줄어듭니다. 비문증이 있다는 사실을 잊고 지내는 분도 많습니다.",
  },
  {
    q: "레이저 치료는 누구에게 효과가 있나요?",
    a: "바이스링(Weiss ring)이 있는 경우에 효과를 기대할 수 있으며, 유리체 액화만 진행된 단계에서는 효과가 크지 않습니다. 검사 후 적합 여부를 판단합니다.",
  },
  {
    q: "젊은 나이에도 비문증이 생기나요?",
    a: "젊은 연령에서는 유리체 액화만 일부 진행된 경우가 흔합니다. 다만 눈 속 염증 등으로 생긴 이차적인 비문증이 아닌지 반드시 확인해야 합니다.",
  },
];

/** 비문증 페이지 */
export default function FloatersPage() {
  return (
    <SubLayout
      path="/retina/floaters"
      description={
        <>
          눈앞에 날파리·실 같은 것이 <br className="pc_block" />
          떠다녀 보이는 증상
        </>
      }
    >
      {/* 정의 · 원인 · 증상 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="비문증 (날파리증 · 후유리체박리)" images={["정상 유리체", "유리체 액화 · 혼탁"]}>
          눈 속 대부분을 채우는 유리체는 투명한 젤리 같은 조직입니다.
          <br className="pc_block" />
          나이가 들면 젤 성분이 물처럼 변하는 <span className="fwb">유리체 액화</span>가 서서히 일어나고,
          <br className="pc_block" />
          이때 생긴 미세한 혼탁이 망막에 그림자를 드리워 무언가 떠다니는 것처럼 보입니다.
        </VerticalInfoBox>

        <InfoBox title="비문증의 원인" imageLabel="후유리체박리 · 바이스링">
          <span className="cr fw500">
            유리체 액화 → 유리체 수축 → 후유리체박리
            <br />
            <br />
          </span>
          액화된 유리체가 수축하면서 망막에서 떨어지는 후유리체박리가 생기고,
          <br className="pc_block" />
          이때 생기는 <span className="fwb">바이스링(Weiss ring)</span> 때문에 비문증을 더 뚜렷하게 느낍니다.
          <br />
          <br />
          50대 이후 비문증으로 내원하는 분들은 대부분 이 단계까지 진행된 경우입니다.
        </InfoBox>

        <SymptomGrid
          title="비문증 증상"
          subtitle={
            <>
              모양과 개수가 다양하고 수시로 변하며, <span className="fwb">맑은 하늘이나 흰 벽·종이를 볼 때</span> 더 뚜렷하게 보입니다.
            </>
          }
          items={[
            <>
              파리·모기 같은
              <br />
              곤충 모양
            </>,
            <>
              점이나
              <br />
              동그란 모양
            </>,
            <>
              실오라기 같은
              <br />
              줄 모양
            </>,
            <>
              아지랑이처럼
              <br />
              일렁이는 모양
            </>,
          ]}
        />
      </ContentBlock>

      {/* 안저검사 안내 띠 */}
      <ImgTxtBox
        label="비문증 안내 배경"
        badge="새로 생긴 비문증이라면"
        lead={
          <>
            일부에서는 망막이 찢어지는 망막열공이 함께 생길 수 있습니다.
            <br className="pc_block" />
            비문증을 처음 느끼셨다면 꼭 안저검사를 받아보세요.
          </>
        }
      />

      {/* 내원 체크 · 치료 */}
      <ContentBlock>
        <DiagnosisBox
          title="이럴 땐 바로 안과로"
          badge="비문증 내원 체크리스트"
          imageLabel="비문증 안저검사"
          items={[
            "비문증이 처음 생겼다.",
            "떠다니는 것이 갑자기 많아졌다.",
            "눈앞에 빛이 번쩍이는 느낌이 함께 있다.",
            "시야 일부가 커튼처럼 가려 보인다.",
          ]}
        />

        <BadgeBox heading="비문증 치료">
          <BadgeItem
            badge={
              <>
                대부분은 <span className="fwb">경과 관찰</span>
              </>
            }
          >
            정상적인 노화 과정에서 생기는 경우가 많아 특별한 치료 없이 지켜봅니다.
            <br className="pc_block" />
            망막열공이 발견되면 망막박리로 진행하지 않도록 <span className="fwb">방벽 레이저 치료</span>가 필요합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                적응이 어려울 때 <span className="fwb">Nd-YAG 레이저</span>
              </>
            }
          >
            수개월 이상 지나도 일상생활에 불편이 크다면 레이저로 혼탁을 잘게 부수는 치료를 고려합니다.
            <br className="pc_block" />
            바이스링이 있는 경우에 효과를 기대할 수 있으며, 결과에는 개인차가 있습니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                제한적으로 <span className="fwb">유리체절제술</span>
              </>
            }
          >
            유리체를 수술로 제거하는 방법으로,
            <br className="pc_block" />
            비문증으로 인한 스트레스가 매우 큰 경우에 한해 신중하게 결정합니다.
          </BadgeItem>
        </BadgeBox>

        {/* 자주 묻는 질문 */}
        <SectionHead title="자주 묻는 질문" />
        <QnaList className={`${styles.secBody} ${styles.qnaList}`}>
          {QNA.map((item) => (
            <QnaCard key={item.q} title={`Q. ${item.q}`} inset>
              <p className={styles.qnaAnswer}>{item.a}</p>
            </QnaCard>
          ))}
        </QnaList>
      </ContentBlock>
    </SubLayout>
  );
}
