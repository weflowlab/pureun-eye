import { BadgeBox, BadgeItem } from "@/components/diseases/common/BadgeBox";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import InfoBox from "@/components/diseases/common/InfoBox";
import QnaCard, { QnaList } from "@/components/diseases/common/QnaCard";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SubLayout from "@/components/sub/SubLayout";
import { EquipImage, PhilosophyBand, PointList, SecHead, type Point } from "./VisionParts";
import styles from "./vision.module.css";

// 라식 수술 특징 5가지
const LASIK_POINTS: Point[] = [
  { title: "펨토초 레이저 VisuMax + 엑시머 레이저 EX500", desc: "각막 절편 생성과 시력 교정에 각각의 전용 레이저를 사용합니다." },
  { title: "2001년 개원 이후 이어온 시력교정수술 경험", desc: "오랜 기간 축적한 수술 경험을 바탕으로 수술 계획을 세웁니다." },
  { title: "각막확장증 예방을 우선하는 수술 기준", desc: "정밀 검사로 각막 상태를 확인하고, 안전 기준에 맞지 않으면 수술을 권하지 않습니다." },
  { title: "고도 근시·난시 등 다양한 시력교정 경험", desc: "일반적인 근시·난시뿐 아니라 까다로운 조건의 눈도 검사 결과에 따라 상담합니다." },
  { title: "수술 후에도 이어지는 장기적인 관리", desc: "수술로 끝나지 않고, 정기 검진으로 눈 건강을 계속 살핍니다." },
];

// 라섹 수술 특징 5가지
const LASEK_POINTS: Point[] = [
  { title: "엑시머 레이저 EX500 + LASEK Xtra", desc: "필요한 경우 각막 강화(Xtra)를 함께 시행해 각막 안정성을 높입니다." },
  { title: "상피 제거 범위를 최소화한 수술", desc: "상피를 필요한 만큼만 제거해 회복 부담을 줄이도록 합니다." },
  { title: "통증을 줄이기 위한 노하우", desc: "오랜 라섹 수술 경험을 바탕으로 수술 후 통증 관리에 신경 씁니다." },
  { title: "각막 혼탁 위험을 줄이는 수술·관리", desc: "라섹의 단점으로 꼽히는 각막 혼탁을 줄이기 위해 수술 후 관리까지 꼼꼼히 챙깁니다." },
  { title: "수술 후에도 이어지는 장기적인 관리", desc: "시력이 자리 잡는 과정을 집도의가 직접 함께 확인합니다." },
];

// 수술 후 증상 Q&A
const QNA: [string, string[]][] = [
  [
    "라식 후에는 어떤 증상이 있을 수 있나요?",
    [
      "다른 시력교정술과 마찬가지로 수술 초기에 안구건조증, 야간 빛번짐 등이 나타날 수 있습니다.",
      "각막 절편이 있으므로 수술 초기에는 격렬한 운동이나 눈을 세게 비비는 행동을 피해야 합니다. 이러한 증상은 대개 시간이 지나며 점차 나아집니다.",
    ],
  ],
  [
    "라섹 후에는 어떤 증상이 있을 수 있나요?",
    [
      "수술 초기에 안구건조증, 야간 빛번짐 등이 나타날 수 있으며, 초기 며칠간의 통증과 시력 회복 속도가 라식보다 더딜 수 있습니다.",
      "이러한 증상은 대개 시간이 지나며 점차 나아집니다.",
    ],
  ],
];

/** 시력교정 — LASIK / LASEK */
export default function LasikPage() {
  return (
    <SubLayout
      path="/vision/lasik"
      description={
        <>
          눈 상태에 맞춘 방법으로 <br className="pc_block" />
          정확하고 안전한 시력교정을 계획합니다.
        </>
      }
    >
      {/* 소개 · 라식 */}
      <ContentBlock>
        <SectionTitle />
        <SecHead
          first
          en="TECHNOLOGY FOR HUMAN LIFE"
          title="기술의 발전, 그 중심의 시력교정수술"
          sub={
            <>
              의료 기술의 발전으로 예전에는 상상하기 어려웠던 치료가 가능해졌습니다.
              <br className="pc_block" />
              {" "}라식·라섹으로 대표되는 시력교정수술도 그 변화의 중심에 있습니다.
            </>
          }
        />

        <InfoBox title="LASIK 라식" imageLabel="라식 수술 과정">
          레이저로 각막 앞쪽에 얇은 절편을 만들어 젖힌 뒤,
          <br className="pc_block" />
          {" "}각막 실질에 레이저를 조사해 근시·난시를 교정하고 절편을 다시 덮는 수술입니다.
          <br className="pc_block" />
          {" "}수술 후 3~4시간 정도 이물감·시림이 있을 수 있으며,
          <br className="pc_block" />
          {" "}대개 다음 날부터 일상생활이 가능합니다.
        </InfoBox>
        <SecHead title="푸른안과 라식 수술의 특징" />
        <PointList items={LASIK_POINTS} />
      </ContentBlock>

      {/* 라섹 */}
      <ContentBlock tone="gray">
        <InfoBox title="LASEK 라섹" imageLabel="라섹 수술 과정" reverse>
          각막 가장 바깥의 상피만 분리한 뒤 레이저를 조사해
          <br className="pc_block" />
          {" "}근시·난시를 교정하는 수술입니다.
          <br className="pc_block" />
          {" "}3~4일 정도 통증이 있고 회복이 더딘 편이지만, 각막을 깎는 범위가 적어
          <br className="pc_block" />
          {" "}각막이 얇거나 도수가 높은 분께 우선 고려되는 수술입니다.
        </InfoBox>
        <SecHead
          title="푸른안과 라섹 수술의 특징"
          sub={
            <>
              라섹은 수술만큼 수술 후 시력을 완성해 가는 과정이 중요합니다.
              <br className="pc_block" />
              {" "}수술 전 검사부터 회복까지 집도의가 함께합니다.
            </>
          }
        />
        <PointList items={LASEK_POINTS} />
      </ContentBlock>

      {/* 프리미엄 수술 옵션 */}
      <ContentBlock>
        <SecHead first en="PREMIUM OPTION" title="눈 상태에 따라 선택하는 수술 옵션" />
        <BadgeBox heading="프리미엄 시력교정" spacing="md">
          <BadgeItem badge="커스텀 Q Visu 라식 / 라섹">
            Alcon사 EX500 레이저로 각막 고유의 비구면(Q) 형태를 최대한 보존하는 수술입니다.
            <br className="pc_block" />
            {" "}각막은 중심부가 볼록하고 주변부가 평평한 비구면 렌즈로,
            <br className="pc_block" />
            {" "}절삭 경계 부위의 모양에 따라 빛번짐·근시 퇴행·각막 혼탁이 생길 수 있고 절삭량이 많은 고도근시에서 더 흔합니다.
            <br className="pc_block" />
            {" "}커스텀 Q는 이러한 후유증 위험을 줄이는 데 도움이 됩니다.
          </BadgeItem>
          <BadgeItem badge="라식 · 라섹 · 스마일 Xtra">
            각막을 깎는 수술은 각막이 얇아지면서 드물게 각막이 앞으로 돌출되는 각막확장증이 생길 수 있습니다.
            <br className="pc_block" />
            {" "}Xtra는 라이트 링크(Light Link) 시스템과 리보플라빈(비타민 B2) 용액으로
            <br className="pc_block" />
            {" "}각막 콜라겐의 결합력을 높여 각막을 단단하게 하는 보강 시술입니다.
          </BadgeItem>
          <BadgeItem badge="Visu 라식" media={<EquipImage model="VisuMax" />}>
            펨토초 레이저 VisuMax가 낮은 에너지로 안압 상승 부담을 줄이며 정밀한 각막 절편을 만들고,
            <br className="pc_block" />
            {" "}엑시머 레이저 Allegretto EX500으로 각막 손실을 줄여 고도근시도 정밀하게 교정합니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 수술 후 증상 Q&A */}
      <ContentBlock tone="gray">
        <SecHead first en="Q&A" title="수술 후 증상, 미리 알아두세요" />
        <QnaList>
          {QNA.map(([q, lines]) => (
            <QnaCard key={q} title={q} tone="dark">
              <div className={styles.cardBody}>
                {lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </QnaCard>
          ))}
        </QnaList>
      </ContentBlock>

      {/* 진료 철학 띠 */}
      <PhilosophyBand />
    </SubLayout>
  );
}
