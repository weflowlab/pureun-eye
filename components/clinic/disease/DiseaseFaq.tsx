"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./disease.module.css";

type Props = { items: { q: string; a: ReactNode }[] };

/**
 * 자주 묻는 질문 (weflow 메인 FAQ 방식) — 왼쪽 제목 + 상담 버튼, 오른쪽 가는 선 목록.
 * 질문을 누르면 답이 부드럽게 펼쳐지고 한 번에 하나만 열림.
 * 접혀 있어도 답은 HTML에 그대로 둠 (높이만 0으로 접음 — 검색엔진이 읽을 수 있게).
 * 목록은 "다 닫힌 높이 + 가장 긴 답 높이"를 미리 차지해, 답을 펼쳐도 섹션 높이가 변하지 않음.
 */
export default function DiseaseFaq({ items }: Props) {
  // 열린 질문 번호 (-1 = 모두 접힘). 첫 질문을 열어 둬서 미리 잡아 둔 높이가 비어 보이지 않게
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // 목록 최소 높이 = 질문 줄들(+구분선) + 가장 긴 답 — 목록 폭 변화·글꼴 로딩 뒤 다시 계산
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const measure = () => {
      const lis = [...ul.children] as HTMLElement[];
      const rows = lis.reduce((sum, li) => sum + (li.firstElementChild as HTMLElement).offsetHeight + 1, 1);
      const maxAnswer = Math.max(0, ...lis.map((li) => (li.querySelector("[role=region] > div") as HTMLElement).scrollHeight));
      ul.style.minHeight = `${rows + maxAnswer}px`;
    };
    measure();
    document.fonts?.ready.then(measure);
    // 목록 폭이 바뀌면(화면 크기·늦게 붙는 CSS) 답 줄 수가 달라지므로 다시 계산
    let lastW = ul.offsetWidth;
    const ro = new ResizeObserver(() => {
      if (ul.offsetWidth === lastW) return;
      lastW = ul.offsetWidth;
      measure();
    });
    ro.observe(ul);
    return () => ro.disconnect();
  }, [items]);

  return (
    <div className={styles.faq}>
      <div className={styles.faqSide}>
        <div className={styles.faqHead} suppressHydrationWarning data-aos="fade-up">
          {/* 페이지 다른 섹션과 같은 두 톤 제목 */}
          <h3 className={styles.title}>
            <strong>자주 묻는</strong> 질문
          </h3>
        </div>
        <div className={styles.faqAsk} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
          <p>찾으시는 질문이 없나요?</p>
          <Link href="/contact/online" className={styles.faqCta}>
            상담 신청하기
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <ul ref={listRef} className={styles.faqList}>
        {items.map((f, i) => {
          const on = open === i;
          // 원고의 *강조* 표기는 이 목록에서는 쓰지 않음
          const q = f.q.replace(/\*/g, "");
          return (
            // 열림은 data-open으로 표시 (className을 바꾸면 AOS가 붙인 등장 클래스가 지워져 줄이 사라짐)
            <li
              key={f.q}
              className={styles.faqItem}
              data-open={on}
              style={{ "--i": i } as CSSProperties}
              suppressHydrationWarning
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <h4 className={styles.faqQ}>
                <button type="button" aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                  <span className={styles.faqMark} aria-hidden="true">
                    Q
                  </span>
                  <span className={styles.faqText}>{q}</span>
                  <span className={styles.faqIcon} aria-hidden="true" />
                </button>
              </h4>
              <div id={`faq-a-${i}`} className={styles.faqA} role="region" aria-hidden={!on}>
                <div className={styles.faqAIn}>
                  <p>{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
