"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { useStickyProgress } from "./useStickyProgress";
import styles from "./intro.module.css";

type Field = { en: string; title: string; desc: string; href: string; image: ReactNode };
type Props = { head: ReactNode; fields: Field[]; className?: string };

/** 주요 진료 분야: 화면이 붙어 있는 동안 사진이 한 장씩 왼쪽으로 넘어가고 설명·쪽수가 바뀜 */
export default function FieldStack({ head, fields, className }: Props) {
  const [active, setActive] = useState(0);
  const n = fields.length;
  const ref = useStickyProgress<HTMLElement>((p) => setActive(Math.min(n - 1, Math.floor(p * n))));
  const f = fields[active];

  return (
    <section ref={ref} className={`${styles.fields} ${className ?? ""}`} style={{ "--n": n } as CSSProperties}>
      <div className={styles.fieldStage}>
        <div className={styles.fieldHead}>{head}</div>

        {/* PC: 큰 영문명 배경(뒷부분은 사진에 가려짐) · 가운데 사진 더미(다음 사진은 오른쪽 뒤에 비침) · 오른쪽 설명 */}
        <div className={styles.fieldBody}>
          <p key={`en-${active}`} className={styles.fieldBg} aria-hidden="true">
            {f.en}
          </p>
          <div className={styles.cards}>
            {fields.map((c, i) => (
              <div key={c.en} className={styles.fieldCard} data-state={i < active ? "gone" : i === active ? "on" : "wait"} style={{ "--d": i - active } as CSSProperties}>
                {c.image}
              </div>
            ))}
          </div>
          <div className={styles.fieldSide}>
            <div key={`cap-${active}`} className={styles.rise}>
              <p className={styles.fieldTitle}>{f.title}</p>
              <p className={styles.fieldDesc}>{f.desc}</p>
              <Link href={f.href} className={styles.fieldLink}>
                자세히 보기 →
              </Link>
            </div>
            <p className={styles.pager} aria-hidden="true">
              <b>{active + 1}</b>
              <span />
              {n}
            </p>
          </div>
        </div>

        {/* 모바일: 차례로 나열 */}
        <ul className={styles.fieldList}>
          {fields.map((c, i) => (
            <li key={c.en}>
              <div className={styles.fieldListImg}>{c.image}</div>
              <p className={styles.fieldEn}>
                ({i + 1}) {c.en}
              </p>
              <p className={styles.fieldTitle}>{c.title}</p>
              <p className={styles.fieldDesc}>{c.desc}</p>
              <Link href={c.href} className={styles.fieldLink}>
                자세히 보기 →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
