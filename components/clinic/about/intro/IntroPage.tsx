import Placeholder from "@/components/common/Placeholder";
import { VALUES } from "@/components/common/philosophy";
import SubLayout from "@/components/sub/SubLayout";
import { playfairItalic } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import FieldStack from "./FieldStack";
import IntroHero from "./IntroHero";
import SpaceTour from "./SpaceTour";
import styles from "./intro.module.css";

// 연간 방문·수술 수치 (기존 홈페이지 기준 — 기준 연도 확인 후 갱신)
const STATS = [
  { label: "연간 방문", num: "10만", unit: "명" },
  { label: "연간 수술", num: "7천", unit: "명" },
];

// 공간 — 실제 시설 사진만 사용 (스톡 금지), 병원에서 받아 교체
const SPACES = [
  { en: "Reception", name: "접수 · 로비", desc: "들어서는 순간부터 편안하게 안내해 드립니다" },
  { en: "Lounge", name: "대기실", desc: "검사와 진료 사이, 편히 쉬어 가실 수 있도록" },
  { en: "Testing", name: "검사실", desc: "정밀 검사 장비로 눈 상태를 꼼꼼하게 살핍니다" },
  { en: "Clinic", name: "진료실", desc: "검사 결과를 충분히 설명드리는 곳" },
  { en: "Surgery", name: "수술실", desc: "안전을 가장 먼저 생각하는 수술 환경" },
  { en: "BOIM", name: "망막클리닉 보임", desc: "4층, 망막 질환을 전문으로 진료하는 공간" },
];

// 주요 진료 분야 (사진은 병원 촬영본으로 교체, 설명의 \n은 줄바꿈)
const FIELDS = [
  { en: "Vision Correction", title: "시력교정 클리닉", desc: "Smile 4 me, LASIK·LASEK 등\n각막 상태에 맞는 시력교정수술을 안내합니다.", href: "/vision/pre-care", label: "시력교정" },
  { en: "Cataract Clinic", title: "백내장 클리닉", desc: "정밀 검사와 생활 방식에 맞춰\n알맞은 인공수정체를 고르는\n백내장 수술을 합니다.", href: "/cataract/about", label: "백내장" },
  { en: "Retina Clinic BOIM", title: "망막클리닉 보임", desc: "망막박리·당뇨망막병증·황반변성 등 중증 망막 질환을 진료하고 수술합니다.", href: "/retina/boim", label: "망막클리닉 보임" },
  { en: "Precise Examination", title: "정밀 검사", desc: "수술 전 33가지 정밀 검사로\n눈 상태를 빠짐없이 확인합니다.", href: "/vision/pre-care", label: "수술 전 정밀 검사" },
];

/** 병원소개: 소개(사진 넓어짐) → 철학 → 공간(가로 이동) → 진료 분야(카드 넘김) → 네 가지 약속(남색 띠) */
export default function IntroPage() {
  return (
    <SubLayout path="/about/intro" description="잘 보이는 것은 더 좋은 삶의 질을 의미합니다.">
      <IntroHero
        line1={`${SITE.name}는 시력을 넘어,`}
        line2="환자의 삶을 생각합니다"
        highlight="잘 보인다는 것은, 더 잘 산다는 것입니다"
        body={
          <>
            {SITE.since}년 개원 이래 전주에서 시력교정·백내장·망막 진료를
            <br className="pc_block" />
            이어 오며, 안전함을 가장 먼저 생각해 왔습니다.
          </>
        }
        image={<Placeholder label="병원 전경 대표 사진" stock={false} />}
      />

      {/* 철학: 소제목·글 + 큰 사진 / 글 · 작은 사진 카드 */}
      <section className={styles.philo}>
        <div className={styles.inner}>
          <div className={styles.philoHead} suppressHydrationWarning data-aos="fade-up">
            <h2 className={styles.highlight}>See more, Do more — {SITE.name}가 삶을 먼저 생각하는 이유</h2>
            <p className={styles.body}>
              잘 보인다는 것은 책을 읽고, 가족의 얼굴을 알아보고, 하고 싶은 일을 계속할 수 있다는 뜻입니다.
              <br className="pc_block" />
              그래서 {SITE.name}는 시력 수치만이 아니라 환자의 일상을 함께 생각합니다.
            </p>
          </div>
          <div className={styles.philoRow}>
            <div className={styles.philoMain} suppressHydrationWarning data-aos="fade-up">
              <Placeholder label="진료이념 대표 이미지" aspectRatio="774 / 462" />
            </div>
            <div className={styles.philoText} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
              <p className={styles.body}>
                궁극적으로 환자와 의료진 모두 사람이며, 기술은 사람의 삶을 위한 것이기 때문입니다. 꼭 필요한 검사를 빠뜨리지 않고, 수술 후
                관리까지 생각하며 진료합니다.
              </p>
              <dl className={styles.stats}>
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
              <div className={styles.photoCard}>
                <Placeholder label="상담 안내 배경" aspectRatio="323 / 419" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpaceTour
        head={
          <>
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={styles.secTitle}>
              <span>편안함이 머무는 공간</span>
              <strong className={styles.gradient}>{SITE.name}</strong>
            </h2>
            <p className={styles.body}>
              환자분의 동선마다 편안함과 안전을 생각했습니다.
              <br />
              {SITE.name}의 진료 공간을 둘러보세요.
            </p>
          </>
        }
        spaces={SPACES.map((s) => ({ ...s, image: <Placeholder label={s.name} aspectRatio="869 / 477" stock={false} /> }))}
      />

      <FieldStack
        className={playfairItalic.variable}
        head={
          <>
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={`${styles.secTitle} ${styles.oneLine}`}>
              <span>{SITE.name}의</span> <strong className={styles.gradient}>주요 진료 분야</strong>
            </h2>
            <p className={styles.highlight}>시력교정부터 백내장, 망막까지 한 곳에서 살핍니다</p>
          </>
        }
        fields={FIELDS.map(({ label, ...f }) => ({ ...f, image: <Placeholder label={`${label} 진료 사진`} aspectRatio="4 / 3" stock={false} /> }))}
      />

      {/* 네 가지 약속: 남색 띠 */}
      <section className={styles.promise}>
        <Placeholder label="진료 철학 배경" dark className={styles.promiseBg} />
        <div className={`${styles.inner} ${styles.promiseInner}`}>
          <div className={styles.promiseHead} suppressHydrationWarning data-aos="fade-up">
            <h2 className={styles.secTitle}>
              <span>진료의 깊이는</span>
              <strong>안전함에서 시작됩니다</strong>
            </h2>
            <p className={styles.promiseLead}>{SITE.name}가 지키는 네 가지 약속</p>
          </div>
          <ul className={styles.promiseList}>
            {VALUES.map((v, i) => (
              <li key={v.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                <span className={styles.promiseIcon}>{v.icon}</span>
                <div>
                  <p className={styles.promiseTitle}>{v.title}</p>
                  <p className={styles.promiseDesc}>{v.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
