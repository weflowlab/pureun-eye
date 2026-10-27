import { BadgeBox, BadgeItem } from "@/components/diseases/common/BadgeBox";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import InfoBox from "@/components/diseases/common/InfoBox";
import QnaCard, { QnaList } from "@/components/diseases/common/QnaCard";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SubLayout from "@/components/sub/SubLayout";
import { CompareImages, EquipImage, PhilosophyBand, SecHead } from "./VisionParts";
import styles from "./vision.module.css";

// 수술 과정 3단계
const STEPS: [string, string][] = [
  ["렌티큘 디자인", "정밀 검안 결과에 맞춰 교정할 각막 실질(렌티큘)의 두께와 모양을 설계합니다."],
  ["VisuMax 레이저 커팅", "펨토초 레이저로 각막 안쪽의 렌티큘을 정교하게 분리합니다."],
  ["작은 절개로 분리", "각막 절편 없이 작은 절개창을 통해 렌티큘을 꺼냅니다."],
];

// 정밀 교정 기술 카드
const TECH: [string, string][] = [
  ["정확한 센트레이션", "수술 중 주시점을 안정적으로 유지해 각막 중심의 오차를 줄이고, 편안한 상태로 수술을 진행합니다."],
  ["난시를 고려한 맞춤 절개", "환자마다 다른 난시축과 난시 정도에 맞춰 절개 위치와 각막 실질 분리 방법을 조정합니다."],
  ["500kHz 고속 레이저 빔", "빠르고 조밀한 레이저 조사로 매끄러운 절단면을 만드는 데 도움이 됩니다."],
];

/** 시력교정 — Smile 4 me (스마일라식) */
export default function SmilePage() {
  return (
    <SubLayout
      path="/vision/smile"
      description={
        <>
          각막 절편 없이 작은 절개로 <br className="pc_block" />
          진행하는 시력교정수술
        </>
      }
    >
      {/* 소개 · 수술 과정 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="Smile4me" images={["스마일 수술 과정", "VisuMax 렌티큘 분리"]}>
          2001년 개원 이후 쌓아 온 시력교정수술 경험에 스마일 수술을 더한
          <br className="pc_block" />
          {" "}푸른안과의 시력교정 프로그램입니다.
          <br className="pc_block" />
          {" "}엑시머 레이저 특유의 조사 소리나 타는 냄새가 없어,
          <br className="pc_block" />
          {" "}집도의와 대화하며 편안하게 수술받으실 수 있습니다.
        </VerticalInfoBox>

        <SecHead
          en="HOW IT WORKS"
          title="스마일 수술은 이렇게 진행됩니다"
          sub={
            <>
              각막 절편을 만들지 않아 절편과 관련된 주름 등의 합병증 걱정이 없고,
              <br className="pc_block" />
              {" "}건조증 부담을 줄이면서 빠른 회복을 돕는 수술입니다.
            </>
          }
        />
        <div className={styles.steps}>
          {STEPS.map(([t, d], i) => (
            <div key={t} className={styles.step} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.stepNum}>STEP {String(i + 1).padStart(2, "0")}</p>
              <p className={styles.stepTitle}>{t}</p>
              <p className={styles.stepDesc}>{d}</p>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* Smile4me 4가지 특징 */}
      <ContentBlock tone="gray">
        <SecHead first en="LOW ENERGY · SMALL INCISION · SAFE · MAINTENANCE" title="Smile4me의 4가지 특징" />
        <BadgeBox heading="Smile4me" spacing="md">
          <BadgeItem
            badge={
              <>
                <span className="fwb">Low Energy</span> 낮은 에너지로 각막 부담을 줄입니다
              </>
            }
          >
            VisuMax 레이저는 낮고 정확한 에너지로 각막 조직에 가해지는 충격을 줄이고,
            <br className="pc_block" />
            {" "}균일한 에너지 조사로 매끄러운 각막면을 만듭니다.
            <br className="pc_block" />
            {" "}빛번짐·혼탁·눈부심 같은 부작용 위험을 줄이는 데 도움이 되며, 대부분 수술 다음 날부터 일상생활이 가능합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                <span className="fwb">Small Incision</span> 눈에 맞춘 작은 절개
              </>
            }
            after={<CompareImages items={["라식 절개", "스마일 절개"]} />}
          >
            절개가 작을수록 수술 후 통증과 회복 부담이 적고, 외부 충격과 건조증에도 유리합니다.
            <br className="pc_block" />
            {" "}눈의 모양과 상태에 따라 장비가 허용하는 범위 안에서 적절한 크기로 절개합니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                <span className="fwb">Safe</span> 각막 절편 없이, 보우만막은 보존
              </>
            }
          >
            라식은 각막 절편이 있어 외상에 주의가 필요하고, 라섹은 보우만막을 제거해 각막 혼탁이나
            <br className="pc_block" />
            {" "}스테로이드 안약 사용에 따른 안압 상승에 주의가 필요합니다.
            <br className="pc_block" />
            {" "}스마일 수술은 절편을 만들지 않고 보우만막을 보존하는 방식입니다.
          </BadgeItem>
          <BadgeItem
            badge={
              <>
                <span className="fwb">Maintenance</span> 처음부터 끝까지, 장기적인 관리
              </>
            }
          >
            검사부터 수술, 회복까지 집도의가 처음부터 함께하며 스마일 전용 수술실에서 수술합니다.
            <br className="pc_block" />
            {" "}“안전하지 않으면 수술하지 않는다”는 원칙을 지키며, 수술 후에도 눈 건강을 계속 살핍니다.
          </BadgeItem>
        </BadgeBox>
      </ContentBlock>

      {/* 정밀 교정 기술 · 장비 */}
      <ContentBlock>
        <SecHead first en="PRECISION" title="선명한 시력을 위한 정밀 교정" />
        <InfoBox title="ZEISS VisuMax 펨토초 레이저" image={<EquipImage model="VisuMax" />}>
          스마일 수술에 사용하는 펨토초 레이저입니다.
          <br className="pc_block" />
          {" "}각막 실질(렌티큘)을 정교하게 분리해
          <br className="pc_block" />
          {" "}작은 절개만으로 시력을 교정합니다.
        </InfoBox>
        <QnaList>
          {TECH.map(([t, d]) => (
            <QnaCard key={t} title={t} fixed>
              <p>{d}</p>
            </QnaCard>
          ))}
        </QnaList>
      </ContentBlock>

      {/* 수술 후 증상 Q&A */}
      <ContentBlock tone="gray">
        <SecHead first en="Q&A" title="수술 후 증상, 미리 알아두세요" />
        <QnaList>
          <QnaCard title="스마일 수술 후에는 어떤 증상이 있을 수 있나요?" tone="dark">
            <div className={styles.cardBody}>
              <p>부작용이 전혀 없는 수술은 없습니다. 스마일 수술도 다른 시력교정술처럼 수술 초기에 안구건조증, 야간 빛번짐 등이 나타날 수 있습니다.</p>
              <p>이러한 증상은 대개 시간이 지나며 점차 나아지며, 수술 전 동공 크기나 건조증 정도에 따라 회복 속도에 차이가 있을 수 있습니다.</p>
            </div>
          </QnaCard>
        </QnaList>
      </ContentBlock>

      {/* 진료 철학 띠 */}
      <PhilosophyBand />
    </SubLayout>
  );
}
