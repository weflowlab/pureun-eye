import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import SubLayout from "@/components/sub/SubLayout";
import { SITE } from "@/lib/site";
import DiseaseFaq from "./DiseaseFaq";
import Pic from "./Pic";
import ProcessSteps from "./ProcessSteps";
import VisionSlider from "./VisionSlider";
import type { Disease } from "./types";
import styles from "./disease.module.css";

// 클리닉별 신뢰 포인트 (기존 푸른안과 원고 기준 — 수치는 병원 확인 필요)
const TRUST = {
  retina: {
    title: "*망막클리닉 보임*이 함께합니다",
    items: [
      { num: String(SITE.since), unit: "년부터", title: "이어온 망막 진료", desc: "개원 때부터 전북 지역 망막 환자를 진료해 왔습니다." },
      { num: "400", unit: "례 이상", title: "매년 시행하는 망막 수술", desc: "망막박리·당뇨망막병증 등 중증 질환을 가까이에서 수술합니다." },
      { num: "4", unit: "인", title: "망막 전문 의료진", desc: "진단부터 수술, 경과 관찰까지 같은 의료진이 함께합니다." },
      { num: "200", unit: "°", title: "초광각 망막 검사", desc: "Optos·OCT 혈관조영 등 망막 전용 장비로 정밀하게 살핍니다." },
    ],
  },
  cataract: {
    title: "*푸른안과 백내장 클리닉*이 함께합니다",
    items: [
      { num: "30,000", unit: "례 이상", title: "백내장 수술 경험", desc: `${SITE.since}년 개원 이래 쌓아 온 수술 경험입니다.` },
      { num: "1:1", unit: "", title: "맞춤 인공수정체 선택", desc: "정밀 검사와 생활 습관을 함께 고려해 렌즈를 고릅니다." },
      { num: "ONE", unit: "", title: "망막까지 한 곳에서", desc: "망막클리닉 보임과 함께 망막·시신경 상태까지 확인합니다." },
      { num: "AFTER", unit: "", title: "수술 후 정기 관리", desc: "회복 경과와 후발백내장 여부를 꾸준히 확인합니다." },
    ],
  },
};

/** "*강조*" 표기를 태그로 (제목은 strong) */
function rich(text: string, Tag: "strong" | "span" = "strong", className?: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 ? (
      <Tag key={i} className={className}>
        {part}
      </Tag>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** 섹션 머리: 두 톤 제목 + 보조 문구 (가운데) */
function Head({ title, sub, light }: { title: string; sub?: ReactNode; light?: boolean }) {
  return (
    <div className={`${styles.head} ${light ? styles.light : ""}`} suppressHydrationWarning data-aos="fade-up">
      <h3 className={styles.title}>{rich(title)}</h3>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

/** 질환 페이지 공통 틀 (섹션마다 배경과 연출이 다름) */
export default function DiseaseTemplate({ d }: { d: Disease }) {
  const trust = TRUST[d.clinic];

  return (
    <SubLayout path={d.path} description={d.description}>
      {/* 소개: 왼쪽 두 줄 제목 · 오른쪽 문단 → 아래 시야 비교(슬라이더로 조절) */}
      <section className={styles.intro}>
        <div className={styles.introTop}>
          <div suppressHydrationWarning data-aos="fade-up">
            <p className={styles.brand}>Pureun Eye Clinic</p>
            <h2 className={styles.introTitle}>
              <span>{d.intro.line1}</span>
              <strong>{d.intro.line2}</strong>
            </h2>
          </div>
          <div className={styles.introBody} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            {d.intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <VisionSlider
          base={<Pic label={d.intro.images[0]} aspectRatio="16 / 7" />}
          overlay={<Pic label={d.intro.images[1]} aspectRatio="16 / 7" />}
          baseLabel={d.intro.images[0]}
          overlayLabel={d.intro.images[1]}
        />
      </section>

      {/* 정의: 큰 그림 + 그림 위 알약 라벨 */}
      {d.definition && (
        <section className={styles.block}>
          <div className={styles.inner}>
            <Head title={d.definition.title} sub={d.definition.body} />
            {d.definition.figures && (
              <div className={`${styles.figures} ${styles[`n${d.definition.figures.length}`]}`}>
                {d.definition.figures.map((f, i) => (
                  <figure key={f.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                    <div className={styles.figImg}>
                      <Placeholder label={f.label} aspectRatio="16 / 10" stock={false} />
                      <span className={styles.pill}>{f.title}</span>
                    </div>
                    {f.desc && <figcaption>{f.desc}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 증상: 하늘색 배경 + 사진 카드가 가로로 흘러감 (마우스를 올리면 멈춤) */}
      {d.symptoms && (
        <section className={`${styles.block} ${styles.sky}`}>
          <div className={styles.inner}>
            <Head title={d.symptoms.title} sub={d.symptoms.sub} />
          </div>
          <div className={styles.marquee}>
            {/* 끊김 없이 이어지도록 같은 목록을 두 번 */}
            <ul className={styles.marqueeTrack} style={{ animationDuration: `${d.symptoms.items.length * 6}s` }}>
              {[0, 1].map((dup) =>
                d.symptoms!.items.map((s) => (
                  <li key={`${dup}-${s.title}`} aria-hidden={dup === 1 || undefined}>
                    <Pic label={`${s.title} 이미지`} aspectRatio="345 / 225" />
                    <p className={styles.symTitle}>{s.title}</p>
                    {s.desc && <p className={styles.symDesc}>{s.desc}</p>}
                  </li>
                )),
              )}
            </ul>
          </div>
          <div className={styles.cta}>
            <Link href="/contact/online" className={styles.ctaBtn}>
              내 증상 상담하기
            </Link>
          </div>
        </section>
      )}

      {/* 원인: 가로 카드 한 줄 (원인 수만큼) */}
      {d.causes && (
        <section className={`${styles.block} ${styles.causeBg}`}>
          <div className={styles.inner}>
            <Head title={d.causes.title} sub={d.causes.sub} />
            <ol className={styles.causes} style={{ "--n": d.causes.items.length } as CSSProperties}>
              {d.causes.items.map((c, i) => (
                <li key={c.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 60}>
                  <span className={styles.causeNo}>{String(i + 1).padStart(2, "0")}</span>
                  <p className={styles.itemTitle}>{c.title}</p>
                  {c.desc && <p className={styles.itemDesc}>{c.desc}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 진단: 파란 그라데이션 위 카드가 차례로 겹쳐 쌓임 */}
      {d.diagnosis && (
        <section className={`${styles.block} ${styles.blue}`}>
          <div className={styles.inner}>
            <Head title={d.diagnosis.title} sub={d.diagnosis.sub} />
            <ol className={styles.stack}>
              {d.diagnosis.steps.map((s, i) => (
                <li key={s.title} style={{ "--i": i } as CSSProperties}>
                  <div className={styles.stackImg}>
                    <Pic label={s.title} aspectRatio="16 / 10" />
                  </div>
                  <div>
                    <span className={styles.stepNo}>Step {String(i + 1).padStart(2, "0")}</span>
                    <p className={styles.stackTitle}>{s.title}</p>
                    {s.desc && <p className={styles.itemDesc}>{s.desc}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 수술 과정: 왼쪽 사진 고정 + 오른쪽 단계 */}
      {d.process && (
        <section className={styles.block}>
          <div className={styles.inner}>
            <Head title={d.process.title} sub={d.process.sub} />
            <ProcessSteps
              steps={d.process.steps}
              images={d.process.steps.map((s) => (
                <Pic key={s.title} label={s.title} aspectRatio="525 / 332" />
              ))}
            />
          </div>
        </section>
      )}

      {/* 치료: 사진 카드 */}
      {d.treatment && (
        <section className={`${styles.block} ${styles.sky}`}>
          <div className={styles.inner}>
            <Head title={d.treatment.title} sub={d.treatment.sub} />
            <div className={`${styles.cards} ${d.treatment.items.length === 2 ? styles.two : ""}`}>
              {d.treatment.items.map((t, i) => (
                <div key={t.title} className={styles.card} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                  {t.image && <Pic label={t.image} aspectRatio="16 / 10" />}
                  <div className={styles.cardBody}>
                    <p className={styles.itemTitle}>{t.title}</p>
                    {t.desc && <p className={styles.itemDesc}>{t.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
            {d.treatment.note && <p className={styles.note}>{d.treatment.note}</p>}
          </div>
        </section>
      )}

      {/* 비교표: 칸마다 둥근 블록, 강조 열은 하늘색 */}
      {d.compare && <Compare {...d.compare} />}

      {d.extras?.map((x) => (
        <section key={x.title} className={styles.block}>
          <div className={styles.inner}>
            <Head title={x.title} sub={x.sub} />
            {(x.body || x.image) && (
              <div className={styles.extra} suppressHydrationWarning data-aos="fade-up">
                {x.image && <Pic label={x.image} aspectRatio="1 / 1" />}
                {x.body && <div className={styles.extraBody}>{x.body}</div>}
              </div>
            )}
            {x.items && (
              <ul className={styles.tiles}>
                {x.items.map((t, i) => (
                  <li key={t.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                    {t.icon && <span className={styles.tileIcon}>{t.icon}</span>}
                    <p className={styles.itemTitle}>{t.title}</p>
                    {t.desc && <p className={styles.itemDesc}>{t.desc}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      {d.cases && (
        <section className={`${styles.block} ${styles.sky}`}>
          <div className={styles.inner}>
            <Head title={d.cases.title} sub={d.cases.sub} />
            <div className={`${styles.figures} ${styles.n2}`}>
              {d.cases.images.map((label, i) => (
                <div key={label} className={styles.figImg} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                  <Placeholder label={label} aspectRatio="4 / 3" stock={false} />
                </div>
              ))}
            </div>
            <p className={styles.note}>※ 환자분의 동의를 받아 게재한 실제 사례이며, 치료 결과는 개인에 따라 다를 수 있습니다.</p>
          </div>
        </section>
      )}

      {/* 신뢰 포인트: 남색 띠 */}
      <section className={styles.trust}>
        <div className={styles.inner}>
          <Head title={trust.title} light />
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

      {/* 자주 묻는 질문: 왼쪽 제목·상담 버튼 + 오른쪽 펼침 목록 */}
      <section className={styles.block}>
        <div className={styles.inner}>
          <DiseaseFaq items={d.faq} />
        </div>
      </section>
    </SubLayout>
  );
}

/** 비교표: 첫 열(항목명)은 짙은 블록, 나머지는 연회색 블록 */
function Compare({ title, sub, head, rows, highlight }: NonNullable<Disease["compare"]>) {
  const hl = (c: number) => (highlight === c ? styles.hlCol : "");
  return (
    <section className={styles.block}>
      <div className={styles.inner}>
        <Head title={title} sub={sub} />
        <div className={styles.tableWrap} suppressHydrationWarning data-aos="fade-up">
          <div className={styles.grid} style={{ "--cols": head.length - 1 } as CSSProperties} role="table">
            <div role="row" className={styles.row}>
              <span role="columnheader" className={styles.corner}>
                {head[0]}
              </span>
              {head.slice(1).map((h, c) => (
                <span key={h} role="columnheader" className={`${styles.colHead} ${hl(c + 1)}`}>
                  {h}
                </span>
              ))}
            </div>
            {rows.map((r) => (
              <div key={r[0]} role="row" className={styles.row}>
                <span role="rowheader" className={styles.rowHead}>
                  {r[0]}
                </span>
                {r.slice(1).map((cell, c) => (
                  <span key={c} role="cell" className={`${styles.cell} ${hl(c + 1)}`}>
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
