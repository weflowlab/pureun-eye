import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import VerticalInfoBox from "@/components/diseases/common/VerticalInfoBox";
import SubLayout from "@/components/sub/SubLayout";
import { CheckList, Notice, Section } from "./parts";
import styles from "./cataract.module.css";

// 렌즈 비교표 열 (기존 홈페이지 표 기준, 토릭 = 난시교정 모델)
const LENSES: { name: string; models?: string; focus: string; toric: string; far: string; mid: string; near: string; glare: string }[] = [
  { name: "일반 렌즈", models: "단초점", focus: "단초점", toric: "X", far: "좋음", mid: "보통", near: "흐림", glare: "거의 없음" },
  { name: "토릭 렌즈", models: "단초점 난시교정", focus: "단초점", toric: "O", far: "좋음", mid: "보통", near: "비교적 선명", glare: "간혹 있음" },
  { name: "삼중초점 렌즈", models: "파인비젼 · 팬옵틱스 · 팬옵틱스 클라레온*", focus: "삼중초점", toric: "토릭 모델 있음", far: "좋음", mid: "좋음", near: "비교적 선명", glare: "간혹 있음" },
  { name: "초점심도 확장 렌즈", models: "비비티", focus: "초점심도 향상", toric: "토릭 모델 있음", far: "좋음", mid: "좋음", near: "비교적 선명", glare: "거의 없음" },
];

// 비교표 행
const ROWS: { label: string; key: "focus" | "toric" | "far" | "mid" | "near" | "glare" }[] = [
  { label: "다초점 여부", key: "focus" },
  { label: "난시 교정", key: "toric" },
  { label: "먼 거리 시력", key: "far" },
  { label: "중간 거리 시력", key: "mid" },
  { label: "가까운 거리 시력", key: "near" },
  { label: "야간 빛 번짐·달무리", key: "glare" },
];

// 강조 표시할 값
const GOOD = new Set(["좋음", "O", "토릭 모델 있음", "거의 없음"]);

/** 백내장 — 프리미엄 백내장 수술 */
export default function PremiumPage() {
  return (
    <SubLayout
      path="/cataract/premium"
      description={
        <>
          백내장과 함께 굴절이상·노안까지 <br className="pc_block" />
          고려하는 다초점 백내장 수술
        </>
      }
    >
      {/* 프리미엄 백내장 수술이란 */}
      <ContentBlock>
        <SectionTitle />
        <VerticalInfoBox title="프리미엄 백내장 수술이란?" images={["단초점 인공수정체", "다초점 인공수정체"]}>
          백내장으로 떨어진 시력을 회복하는 데 그치지 않고,
          <br className="pc_block" />
          수술 전 굴절이상(근시·원시·난시)과 노안까지 함께 개선하는 수술입니다.
          <br />
          <br />
          수술 방법은 일반 백내장 수술과 같으며, 초음파로 백내장을 제거한 뒤
          <br className="pc_block" />
          <span className="fwb">다초점 프리미엄 인공수정체</span>를 넣는다는 점이 다릅니다.
          <br className="pc_block" />
          다초점 백내장 수술, 굴절 백내장 수술이라고도 부릅니다.
        </VerticalInfoBox>

        {/* 기대 효과 */}
        <Section
          en="EXPECTATION"
          title="수술 후 기대할 수 있는 변화"
          sub={
            <>
              양안 프리미엄 백내장 수술을 받은 분들 중 많은 경우,
              <br className="pc_block" />
              안경 없이 먼 곳을 보고 돋보기 없이 독서·컴퓨터 작업을 할 수 있게 됩니다.
            </>
          }
        >
          <div className={styles.stats}>
            <div className={styles.stat} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
              <p className={styles.statValue}>먼 거리</p>
              <p className={styles.statLabel}>운전·TV 시청 등 원거리 시력 개선</p>
            </div>
            <div className={styles.stat} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
              <p className={styles.statValue}>가까운 거리</p>
              <p className={styles.statLabel}>독서·스마트폰·컴퓨터 작업 시 돋보기 의존 감소</p>
            </div>
          </div>
          <p className={styles.footnote}>* 수술 결과는 눈 상태와 개인에 따라 차이가 있을 수 있습니다.</p>
        </Section>
      </ContentBlock>

      {/* 한계 안내 띠 */}
      <ImgTxtBox
        label="프리미엄 백내장 수술 배경"
        lead="다초점 렌즈에도 한계는 있습니다."
        desc={
          <>
            빛의 회절 원리로 여러 거리에 초점을 만들기 때문에
            <br className="pc_block" />
            일반 렌즈보다 빛 번짐이 있을 수 있고, 대비감도가 다소 떨어질 수 있습니다.
          </>
        }
      />

      {/* 적합성 */}
      <ContentBlock>
        <Section first en="CHECK" title="이런 분께는 권하지 않습니다">
          <div className={styles.compare}>
            <div className={styles.compareCard} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
              <p className={styles.compareTitle}>생활·직업</p>
              <p className={styles.compareDesc}>빛 번짐과 대비감도 저하가 불편할 수 있는 경우</p>
              <CheckList items={["야간 운전이 직업인 분", "정밀하고 미세한 작업을 하는 분", "시각 변화에 예민한 분"]} />
            </div>
            <div className={styles.compareCard} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
              <p className={styles.compareTitle}>동반 눈 질환</p>
              <p className={styles.compareDesc}>수술이 잘 되어도 만족도가 낮을 수 있는 경우</p>
              <CheckList items={["불규칙 각막 난시", "진행된 녹내장", "황반 질환 등 망막 질환"]} />
            </div>
          </div>
          <Notice title="충분한 검사와 상담이 먼저입니다">
            수술 전 정밀 검사로 프리미엄 백내장 수술에 적합한지 확인하고, 의료진과 충분히 상의한 뒤 결정하세요.
          </Notice>
        </Section>
      </ContentBlock>

      {/* 인공수정체 비교표 */}
      <ContentBlock tone="gray">
        <Section first en="LENS" title="인공수정체 종류별 특징" sub="눈 상태와 생활 방식에 따라 알맞은 렌즈를 함께 고릅니다.">
          <div className={styles.tableWrap} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  {LENSES.map((l) => (
                    <th key={l.name} scope="col">
                      {l.name}
                      {l.models && <small>{l.models}</small>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.key}>
                    <th scope="row">{r.label}</th>
                    {LENSES.map((l) => (
                      <td key={l.name} className={GOOD.has(l[r.key]) ? styles.good : undefined}>
                        {l[r.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.footnote}>
            * 클라레온은 알콘(Alcon)의 인공수정체 플랫폼으로, 수술 후 렌즈 내부 반짝임(Glistening)을 줄이도록 설계되었습니다.
            <br />
            * 렌즈별 시력·빛 번짐 정도는 일반적인 경향이며 개인에 따라 다를 수 있습니다.
          </p>
        </Section>
      </ContentBlock>
    </SubLayout>
  );
}
