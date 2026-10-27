import SubLayout from "@/components/sub/SubLayout";
import ContentBlock from "@/components/diseases/common/ContentBlock";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import SectionTitle from "@/components/diseases/common/SectionTitle";
import SectionHead from "./SectionHead";
import styles from "./retina.module.css";

// 연간 방문·수술 수치 (기존 홈페이지 기준 — 기준 연도 확인 후 갱신)
const STATS = [
  { label: "연간 방문", num: "10만", unit: "명" },
  { label: "연간 수술", num: "7천", unit: "명" },
];

// 진료이념 3가지
const VALUES = [
  {
    title: "환자 안전과 인본(人本) 진료",
    desc: "환자의 안전을 가장 먼저 생각하며, 사람을 존중하는 인본 진료를 지향합니다.",
  },
  {
    title: "전문 의료진과 끊임없는 연구",
    desc: "분야별 전문 의료진과 정밀 진단·수술 장비를 갖추고, 꾸준한 투자와 연구로 질 높은 의료 서비스를 제공합니다.",
  },
  {
    title: "지역사회와 함께하는 나눔",
    desc: "의료 봉사로 지역사회에 기여하고, 국내외 소외된 이웃과 아픔을 함께 나누고자 합니다.",
  },
];

/** 푸른안과 진료이념 페이지 */
export default function PhilosophyPage() {
  return (
    <SubLayout
      path="/about/philosophy"
      description={
        <>
          잘 보이는 것은 <br className="pc_block" />
          더 좋은 삶의 질을 의미합니다.
        </>
      }
    >
      {/* 슬로건 · 연간 수치 */}
      <ContentBlock>
        <SectionTitle />
        <div className={styles.slogan}>
          <p className={styles.sloganEn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
            See more, Do more
          </p>
          <p className={styles.sloganKo} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
            더 잘 보이도록, 더 많이 살피겠습니다.
          </p>
        </div>
        <div className={styles.stats}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.stat} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statNum}>
                {s.num}
                <small>{s.unit}</small>
              </p>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* 안내 띠 */}
      <ImgTxtBox
        label="푸른안과 진료이념 배경"
        lead={
          <>
            한 분 한 분의 눈을 정성껏 살피는 것,
            <br className="pc_block" />
            푸른안과가 진료하는 이유입니다.
          </>
        }
      />

      {/* 진료이념 3가지 */}
      <ContentBlock tone="gray">
        <SectionHead first title="푸른안과 진료이념" sub="환자와 지역사회를 위해 세 가지 약속을 지켜갑니다." />
        <div className={`${styles.secBody} ${styles.values}`}>
          {VALUES.map((v, i) => (
            <div key={v.title} className={styles.value} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
              <p className={styles.valueNum}>{String(i + 1).padStart(2, "0")}</p>
              <p className={styles.valueTitle}>{v.title}</p>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
    </SubLayout>
  );
}
