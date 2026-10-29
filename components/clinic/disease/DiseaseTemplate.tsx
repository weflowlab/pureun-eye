import Link from "next/link";
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import SubLayout from "@/components/sub/SubLayout";
import { SITE } from "@/lib/site";
import type { Disease } from "./types";
import styles from "./disease.module.css";

// 클리닉별 신뢰 포인트 (기존 푸른안과 원고 기준 — 수치는 병원 확인 필요)
const TRUST = {
  retina: {
    title: "망막클리닉 보임이 함께합니다",
    items: [
      {
        num: SITE.since,
        unit: "년부터",
        title: "이어온 망막 진료",
        desc: "개원 때부터 전북 지역 망막 환자를 진료해 왔습니다.",
      },
      {
        num: "400",
        unit: "례 이상",
        title: "매년 시행하는 망막 수술",
        desc: "망막박리·당뇨망막병증 등 중증 질환을 가까이에서 수술합니다.",
      },
      {
        num: "4",
        unit: "인",
        title: "망막 전문 의료진",
        desc: "진단부터 수술, 경과 관찰까지 같은 의료진이 함께합니다.",
      },
      {
        num: "200",
        unit: "°",
        title: "초광각 망막 검사",
        desc: "Optos·OCT 혈관조영 등 망막 전용 장비로 정밀하게 살핍니다.",
      },
    ],
  },
  cataract: {
    title: "푸른 백내장 클리닉이 함께합니다",
    items: [
      {
        num: "30,000",
        unit: "례 이상",
        title: "백내장 수술 경험",
        desc: `${SITE.since}년 개원 이래 쌓아 온 수술 경험입니다.`,
      },
      {
        num: "1:1",
        unit: "",
        title: "맞춤 인공수정체 선택",
        desc: "정밀 검사와 생활 습관을 함께 고려해 렌즈를 고릅니다.",
      },
      {
        num: "ONE",
        unit: "",
        title: "망막까지 한 곳에서",
        desc: "망막클리닉 보임과 함께 망막·시신경 상태까지 확인합니다.",
      },
      {
        num: "AFTER",
        unit: "",
        title: "수술 후 정기 관리",
        desc: "회복 경과와 후발백내장 여부를 꾸준히 확인합니다.",
      },
    ],
  },
};

/** 섹션 머리: 영문 라벨 + 제목 + 보조 문구 */
function Head({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <div className={styles.head} suppressHydrationWarning data-aos="fade-up">
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h3 className={styles.title}>{title}</h3>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

/** 질환 페이지 공통 틀 — 원고(Disease)에 있는 섹션만 순서대로 그리고, 배경은 흰색·연파랑 번갈아 */
export default function DiseaseTemplate({ d }: { d: Disease }) {
  const sections: { key: string; node: ReactNode }[] = [];
  const add = (key: string, node: ReactNode) => sections.push({ key, node });

  if (d.definition) {
    const { title, body, figures } = d.definition;
    add(
      "definition",
      <>
        <Head eyebrow="WHAT IS" title={title} sub={body} />
        {figures && (
          <div className={`${styles.figures} ${figures.length === 2 ? styles.two : ""}`}>
            {figures.map((f, i) => (
              <figure key={f.title} className={styles.figure} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                <Placeholder label={f.label} aspectRatio="4 / 3" stock={false} />
                <figcaption>
                  <p className={styles.figTitle}>{f.title}</p>
                  {f.desc && <p className={styles.figDesc}>{f.desc}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </>,
    );
  }

  if (d.causes) {
    add(
      "causes",
      <>
        <Head eyebrow="CAUSE" title={d.causes.title} sub={d.causes.sub} />
        <ol className={styles.numList}>
          {d.causes.items.map((c, i) => (
            <li key={c.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 2) * 80}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className={styles.itemTitle}>{c.title}</p>
                {c.desc && <p className={styles.itemDesc}>{c.desc}</p>}
              </div>
            </li>
          ))}
        </ol>
      </>,
    );
  }

  if (d.symptoms) {
    add(
      "symptoms",
      <>
        <Head eyebrow="SYMPTOM" title={d.symptoms.title} sub={d.symptoms.sub} />
        <ul className={styles.symptoms}>
          {d.symptoms.items.map((s, i) => (
            <li key={s.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 4) * 80}>
              <Placeholder label={`${s.title} 일러스트`} aspectRatio="1 / 1" stock={false} />
              <p className={styles.itemTitle}>{s.title}</p>
              {s.desc && <p className={styles.itemDesc}>{s.desc}</p>}
            </li>
          ))}
        </ul>
        <div className={styles.cta}>
          <Link href="/contact/online" className={styles.ctaBtn}>
            내 증상 상담하기
          </Link>
        </div>
      </>,
    );
  }

  if (d.diagnosis) {
    add(
      "diagnosis",
      <>
        <Head eyebrow={d.diagnosis.eyebrow ?? "DIAGNOSIS"} title={d.diagnosis.title} sub={d.diagnosis.sub} />
        <ol className={styles.steps}>
          {d.diagnosis.steps.map((s, i) => (
            <li key={s.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
              <span className={styles.stepNo}>STEP {i + 1}</span>
              <p className={styles.itemTitle}>{s.title}</p>
              {s.desc && <p className={styles.itemDesc}>{s.desc}</p>}
            </li>
          ))}
        </ol>
      </>,
    );
  }

  if (d.treatment) {
    const { title, sub, items, note } = d.treatment;
    add(
      "treatment",
      <>
        <Head eyebrow="TREATMENT" title={title} sub={sub} />
        <div className={`${styles.cards} ${items.length === 2 ? styles.two : ""}`}>
          {items.map((t, i) => (
            <div key={t.title} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
              {t.image && <Placeholder label={t.image} aspectRatio="16 / 10" stock={false} />}
              <div className={styles.cardBody}>
                <p className={styles.itemTitle}>{t.title}</p>
                {t.desc && <p className={styles.itemDesc}>{t.desc}</p>}
              </div>
            </div>
          ))}
        </div>
        {note && <p className={styles.note}>{note}</p>}
      </>,
    );
  }

  if (d.compare) {
    const { title, sub, head, rows } = d.compare;
    add(
      "compare",
      <>
        <Head eyebrow="COMPARE" title={title} sub={sub} />
        <div className={styles.tableWrap} suppressHydrationWarning data-aos="fade-up">
          <table className={styles.table}>
            <thead>
              <tr>
                {head.map((h, i) => (
                  <th key={i} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row">{r[0]}</th>
                  {r.slice(1).map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>,
    );
  }

  d.extras?.forEach((x) =>
    add(
      x.title,
      <>
        <Head eyebrow={x.eyebrow} title={x.title} sub={x.sub} />
        {(x.body || x.image) && (
          <div className={styles.extra} suppressHydrationWarning data-aos="fade-up">
            {x.image && <Placeholder label={x.image} aspectRatio="1 / 1" stock={false} />}
            {x.body && <div className={styles.extraBody}>{x.body}</div>}
          </div>
        )}
        {x.items && (
          <ul className={styles.tiles}>
            {x.items.map((t, i) => (
              <li key={t.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <p className={styles.itemTitle}>{t.title}</p>
                {t.desc && <p className={styles.itemDesc}>{t.desc}</p>}
              </li>
            ))}
          </ul>
        )}
      </>,
    ),
  );

  if (d.cases) {
    add(
      "cases",
      <>
        <Head eyebrow="CASE" title={d.cases.title} sub={d.cases.sub} />
        <div className={styles.figures}>
          {d.cases.images.map((label, i) => (
            <div key={label} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
              <Placeholder label={label} aspectRatio="4 / 3" stock={false} />
            </div>
          ))}
        </div>
        <p className={styles.note}>※ 환자분의 동의를 받아 게재한 실제 사례이며, 치료 결과는 개인에 따라 다를 수 있습니다.</p>
      </>,
    );
  }

  const trust = TRUST[d.clinic];

  return (
    <SubLayout path={d.path} description={d.description}>
      {/* 소개: 왼쪽 글 · 오른쪽 사진 */}
      <section className={styles.intro}>
        <div suppressHydrationWarning data-aos="fade-up">
          <h2 className={styles.introTitle}>{d.intro.title}</h2>
          <p className={styles.introBody}>{d.intro.body}</p>
        </div>
        <div className={styles.introImg}>
          <Placeholder label={d.intro.image} aspectRatio="4 / 3" />
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={s.key} className={`${styles.block} ${i % 2 === 0 ? styles.alt : ""}`}>
          <div className={styles.inner}>{s.node}</div>
        </section>
      ))}

      {/* 신뢰 포인트: 남색 띠 */}
      <section className={styles.trust}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>WHY PUREUN</p>
          <h3 className={styles.trustTitle}>{trust.title}</h3>
          <ul className={styles.trustList}>
            {trust.items.map((t, i) => (
              <li key={t.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                <p className={styles.trustNum}>
                  {t.num}
                  {t.unit && <small>{t.unit}</small>}
                </p>
                <p className={styles.trustItemTitle}>{t.title}</p>
                <p className={styles.trustDesc}>{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 자주 묻는 질문: 펼침 목록 */}
      <section className={styles.block}>
        <div className={styles.inner}>
          <Head eyebrow="FAQ" title="자주 묻는 질문" />
          <div className={styles.faq}>
            {d.faq.map((f) => (
              <details key={f.q} className={styles.faqItem}>
                <summary>
                  <span className={styles.q}>Q</span>
                  {f.q}
                </summary>
                <p className={styles.faqA}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SubLayout>
  );
}
