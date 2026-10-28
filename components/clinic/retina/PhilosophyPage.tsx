import Placeholder from "@/components/common/Placeholder";
import { VALUES } from "@/components/common/philosophy";
import SubLayout from "@/components/sub/SubLayout";
import PhilosophyStatement from "./PhilosophyStatement";
import { SITE } from "@/lib/site";
import styles from "./philosophy.module.css";

// 연간 방문·수술 수치 (기존 홈페이지 기준 — 기준 연도 확인 후 갱신)
const STATS = [
  { label: "연간 방문", num: "10만", unit: "명" },
  { label: "연간 수술", num: "7천", unit: "명" },
];

/** 푸른안과 진료이념 페이지: 소개(좌우 분할) → 네 가지 약속(목록) → 마무리 문장(스크롤 연출) */
export default function PhilosophyPage() {
  return (
    <SubLayout path="/about/philosophy" description="잘 보이는 것은 더 좋은 삶의 질을 의미합니다.">
      {/* 소개: 슬로건 · 원고 · 수치 + 사진 */}
      <section className={styles.intro}>
        <div className={styles.introText}>
          <p className={styles.eyebrow} suppressHydrationWarning data-aos="fade-up">
            OUR PHILOSOPHY
          </p>
          <h2 className={styles.slogan} suppressHydrationWarning data-aos="fade-up">
            See more, Do more
          </h2>
          <p className={styles.lead} suppressHydrationWarning data-aos="fade-up">
            {SITE.name}는 환자의 시력 향상을 넘어,
            <br />
            환자의 삶을 생각합니다.
          </p>
          <p className={styles.body} suppressHydrationWarning data-aos="fade-up">
            궁극적으로 환자와 의료진 모두 사람이며, 기술은 사람의 삶을 위한 것이기 때문입니다. {SITE.since}년 개원 이래
            안전함을 가장 먼저 생각하며 진료해 왔습니다.
          </p>
          <dl className={styles.stats} suppressHydrationWarning data-aos="fade-up">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  {s.num}
                  <small>{s.unit}</small>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.introImg}>
          <Placeholder label="진료이념 대표 이미지" aspectRatio="4 / 5" />
        </div>
      </section>

      {/* 네 가지 약속: 왼쪽 제목 고정 + 오른쪽 목록 */}
      <section className={styles.promise}>
        <div className={styles.promiseInner}>
          <div className={styles.promiseHead}>
            <p className={styles.eyebrow}>OUR PROMISE</p>
            <h2 className={styles.promiseTitle}>
              {SITE.name}가 지키는
              <br />
              네 가지 약속
            </h2>
          </div>
          <ol className={styles.promiseList}>
            {VALUES.map((v, i) => (
              <li key={v.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                <span className={styles.promiseIcon}>{v.icon}</span>
                <div>
                  <p className={styles.promiseItemTitle}>{v.title}</p>
                  <p className={styles.promiseItemDesc}>{v.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 마무리 문장: 스크롤 고정 연출 (상담 안내는 바로 아래 공통 상담 띠가 담당) */}
      <PhilosophyStatement />
    </SubLayout>
  );
}
