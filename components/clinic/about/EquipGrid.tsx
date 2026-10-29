"use client";

import Image from "next/image";
import { useState } from "react";
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
      <ul key={filter} className={styles.grid}>
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
              <p className={styles.model}>{e.model}</p>
              <p className={styles.maker}>{e.maker}</p>
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
