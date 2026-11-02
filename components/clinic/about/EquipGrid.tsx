"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { EQUIPMENTS, EQUIP_GROUPS, type EquipGroup } from "@/lib/equipment";
import styles from "./equipment.module.css";

type Filter = "all" | EquipGroup;

// 배경을 투명하게 딴 사진 (public/images/equipment/cutout/, 원본과 같은 파일명)
const cutout = (src: string) => src.replace("/images/equipment/", "/images/equipment/cutout/");

const FILTERS: { key: Filter; label: string; count: number }[] = [
  { key: "all", label: "전체", count: EQUIPMENTS.length },
  ...EQUIP_GROUPS.map((g) => ({ ...g, count: EQUIPMENTS.filter((e) => e.group === g.key).length })),
];

/** 분류 필터 + 장비 카드 격자 (사진 · 분류 · 모델명 · 제조사 · 특징) */
export default function EquipGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? EQUIPMENTS : EQUIPMENTS.filter((e) => e.group === filter);
  const gridRef = useRef<HTMLUListElement>(null);

  // 모델명·제조사가 칸보다 길면 옆으로 천천히 움직이게 (넘친 길이를 재서 CSS 변수로 전달)
  useEffect(() => {
    const measure = () => {
      gridRef.current?.querySelectorAll<HTMLElement>("[data-slide]").forEach((p) => {
        const span = p.firstElementChild as HTMLElement | null;
        const over = span ? span.scrollWidth - p.clientWidth : 0;
        if (over > 0) {
          p.dataset.slide = "on";
          p.style.setProperty("--over", `${over}px`);
        } else {
          p.dataset.slide = "";
          p.style.removeProperty("--over");
        }
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);

  return (
    <>
      <div className={styles.filters} role="tablist" aria-label="장비 분류">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={`${styles.filter} ${filter === f.key ? styles.on : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span>{f.count}</span>
          </button>
        ))}
      </div>

      {/* 필터를 바꾸면 카드가 다시 떠오르도록 key 교체 */}
      <ul key={filter} ref={gridRef} className={styles.grid}>
        {list.map((e, i) => (
          <li key={e.model} className={styles.card} style={{ animationDelay: `${i * 50}ms` }}>
            <div className={styles.photo}>
              {e.image ? (
                <Image src={cutout(e.image)} alt={`${e.model} ${e.category}`} fill sizes="(max-width: 768px) 50vw, 300px" />
              ) : (
                <Placeholder label={e.model} stock={false} />
              )}
            </div>
            <div className={styles.body}>
              <p className={styles.category}>{e.category}</p>
              <p className={styles.model} data-slide="">
                <span>{e.model}</span>
              </p>
              <p className={styles.maker} data-slide="">
                <span>{e.maker}</span>
              </p>
              <ul className={styles.points}>
                {e.points.map((p, j) => (
                  <li key={j}>{p.map((seg) => (typeof seg === "string" ? seg : seg.b)).join("")}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
