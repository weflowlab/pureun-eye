import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import QnaCard, { QnaList } from "@/components/diseases/common/QnaCard";
import SubLayout from "@/components/sub/SubLayout";
import { CompareImages, PhilosophyBand, SecHead } from "./VisionParts";
import styles from "./vision.module.css";

// 수술 결정 전 체크리스트
const CHECKLIST = [
  "수술을 위한 최종 검사를 의사가 직접 하는가?",
  "조절마비 굴절검사를 시행하는가?",
  "시력교정수술 경험이 충분한가?",
  "부작용과 단점에 대한 설명도 충분히 들었는가?",
  "집도의가 수술 후 진료까지 직접 하는가?",
  "의료진이 부작용 치료에도 전문성을 갖추고 있는가?",
  "수술 전 핵심 검사인 각막지형도 장비를 충분히 갖추고 있는가?",
  "국제 권고치 이상의 각막을 남기는 수술 계획인가?",
];

type Fact = { q: string; verdict?: string; a: ReactNode };

// FACT CHECK 10문 10답
const FACTS: Fact[] = [
  {
    q: "기계가 하는 수술, 가격만 보고 정해도 될까요?",
    verdict: "아닙니다",
    a: (
      <>
        <p>
          시력교정수술은 다른 안과 수술보다 장비의 역할이 큰 것은 사실이지만, 고가의 레이저는 각막을 도수대로 깎는 과정에만 쓰입니다.
          좋은 결과를 위해서는 수술 전 검사부터 수술 후 관리까지 전 과정이 잘 이루어져야 합니다. 가격과 함께 아래 항목을 확인해 보세요.
        </p>
        <ul className={styles.checkList}>
          {CHECKLIST.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p>수술 후 시력이 좋다고 무조건 좋은 수술은 아닙니다. 환자가 직접 느끼지 못하는 부분까지 눈의 안전을 지키는 수술이 중요합니다.</p>
      </>
    ),
  },
  {
    q: "시력교정수술을 받으면 노안이 일찍 오나요?",
    verdict: "아닙니다",
    a: <p>수술로 근시·난시·원시가 교정되면 정시 상태가 됩니다. 따라서 원래 안경을 쓰지 않던 정시인 사람과 같은 시기, 같은 방식으로 노안이 찾아옵니다.</p>,
  },
  {
    q: "안경 쓴 안과의사들은 왜 수술을 안 하나요?",
    a: (
      <>
        <p>안과의사 중에도 시력교정수술을 받은 사람은 적지 않습니다. 다만 안과의사는 수술할 때 30~50cm 거리를 자주 보는데, 40대라면 약 -2.5D 정도의 근시가 있는 편이 오히려 이 거리를 보기 편합니다.</p>
        <p>근시를 교정하면 40대 이후 노안이 오면서 수술 중 돋보기를 써야 하는 경우가 생기기 때문에, 직업적인 이유로 일부러 수술을 받지 않는 의사도 많습니다.</p>
      </>
    ),
  },
  {
    q: "스마일라식이 가장 좋은 수술인가요?",
    verdict: "사람마다 다릅니다",
    a: <p>모든 사람에게 가장 좋은 단 하나의 수술은 없습니다. 라식·라섹·스마일 수술은 각각 장단점이 있으며, 각막이 너무 얇거나 건조증이 심한 경우에는 스마일보다 라섹이 더 적합할 수도 있습니다. 정밀 검사 결과를 바탕으로 내 눈에 맞는 수술을 선택하는 것이 중요합니다.</p>,
  },
  {
    q: "스마일 절개, 작을수록 좋은가요?",
    verdict: "아닙니다",
    a: (
      <>
        <p>
          해외에서는 3mm 이하의 절개는 결과에 큰 차이가 없다고 보고 있으며, 장비를 개발한 ZEISS사도 2mm보다 작은 절개는 결과에 영향을 주지 않는다고 보아 소프트웨어에서 2mm 미만 절개를 허용하지 않습니다.
          오히려 절개가 너무 작으면 좁은 창으로 조직을 꺼내는 과정에서 원치 않는 손상이 생길 수 있어, 허용 범위인 2mm 이상의 절개가 적절하다고 볼 수 있습니다.
        </p>
        <CompareImages items={["1mm 절개 (출구가 좁아 찢어질 수 있음)", "2~4mm 절개"]} />
      </>
    ),
  },
  {
    q: "스마일 수술의 ‘로우 에너지’란 무엇인가요?",
    a: <p>에너지가 높으면 수술은 쉽고 빨라지지만, 눈에 흡수되는 에너지가 많아져 회복이 늦어질 수 있습니다. 반대로 너무 낮으면 레이저가 제대로 작용하지 않은 부위가 생겨 수술면이 고르지 않고 시력의 질이 떨어질 수 있습니다. 조직이 잘 분리되는 범위 안에서 가장 낮은 에너지를 사용하는 것이 좋습니다.</p>,
  },
  {
    q: "라식·라섹이 안 된다면 스마일도 안 되나요?",
    verdict: "경우에 따라 다릅니다",
    a: <p>라섹이 불가능한 경우에는 스마일 수술도 어렵습니다. 다만 라식이 어려운 경우라도 스마일 수술은 가능할 수 있습니다. 스마일 수술은 각막 앞쪽의 튼튼한 층을 보존하는 방식이기 때문입니다. 가능 여부는 정밀 검사 후 판단합니다.</p>,
  },
  {
    q: "45세가 넘으면 시력교정수술을 못 받나요?",
    verdict: "받을 수 있습니다",
    a: <p>다만 45세 이상은 대부분 노안이 시작된 상태이므로, 수술 후 먼 곳은 안경 없이 볼 수 있어도 책·컴퓨터 등 가까운 곳을 볼 때는 돋보기가 필요할 수 있습니다.</p>,
  },
  {
    q: "난시가 많으면 스마일 수술이 어렵나요?",
    verdict: "아닙니다",
    a: <p>스마일 수술로도 난시 교정이 가능하며, 난시축과 난시 정도를 고려해 절개 위치와 방법을 조정합니다. 난시가 많은 분도 검사 결과에 따라 스마일 수술을 고려해 볼 수 있습니다.</p>,
  },
  {
    q: "ICL(렌즈삽입술)이 라식보다 더 안전한가요?",
    verdict: "수술마다 장단점이 있습니다",
    a: <p>부작용이 없는 수술은 없습니다. ICL은 각막을 깎지 않는다는 장점이 있지만, 눈 안에 렌즈가 계속 존재하므로 백내장, 각막내피 손상 등의 합병증 가능성이 있습니다. 각막 상태 등으로 레이저 시력교정이 어려운 경우에 대안으로 고려할 수 있습니다.</p>,
  },
];

/** 시력교정 — FACT CHECK (시력교정 10문 10답) */
export default function FactCheckPage() {
  return (
    <SubLayout
      path="/vision/fact-check"
      description={
        <>
          라식·라섹·스마일, <br className="pc_block" />
          궁금했던 이야기를 사실대로 알려드립니다.
        </>
      }
    >
      {/* 소개 · Q&A */}
      <ContentBlock>
        <SecHead
          first
          en="FACT CHECK"
          title="시력교정수술, 사실은 이렇습니다"
          sub="자주 듣는 이야기 10가지를 푸른안과 의료진이 설명해 드립니다."
        />
        <div suppressHydrationWarning data-aos="fade-in" data-aos-duration="1500">
          <Placeholder label="FACT CHECK 대표 이미지" aspectRatio="21 / 6" />
        </div>

        <QnaList className={styles.factList}>
          {FACTS.map((f, i) => (
            <QnaCard key={f.q} title={`Q${String(i + 1).padStart(2, "0")}. ${f.q}`} tone={i % 2 ? "dark" : "navy"}>
              <div className={styles.cardBody}>
                {f.verdict && <p className={styles.verdict}>{f.verdict}</p>}
                {f.a}
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
