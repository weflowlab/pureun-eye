import type { ReactNode } from "react";
import Image from "next/image";
import { EQUIPMENTS } from "@/lib/equipment";
import styles from "./cataract.module.css";

type HeadProps = {
  en?: string;
  title: ReactNode;
  sub?: ReactNode;
  /** 페이지 첫 제목 (위 여백 없음) */
  first?: boolean;
  children?: ReactNode;
};

/** 섹션 제목(영문 라벨·제목·설명) + 본문 */
export function Section({ en, title, sub, first, children }: HeadProps) {
  return (
    <section className={`${styles.head} ${first ? styles.first : ""}`}>
      {en && (
        <p className={styles.headEn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {en}
        </p>
      )}
      <h3 className={styles.headTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {title}
      </h3>
      {sub && (
        <p className={styles.headSub} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
          {sub}
        </p>
      )}
      {children && <div className={styles.headBody}>{children}</div>}
    </section>
  );
}

/** 점 목록 */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

/** 주의·참고 안내 박스 */
export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.notice} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <p className={styles.noticeTitle}>{title}</p>
      {children}
    </div>
  );
}

type EquipProps = {
  /** lib/equipment.ts 의 model 값 */
  model: string;
  children: ReactNode;
};

/** 실제 장비 사진 카드 (lib/equipment.ts 사진 사용) */
export function EquipCard({ model, children }: EquipProps) {
  const eq = EQUIPMENTS.find((e) => e.model === model);
  if (!eq) return null;
  return (
    <div className={styles.equip} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
      <Image className={styles.equipImg} src={eq.image} alt={`${eq.model} ${eq.category}`} width={536} height={428} />
      <div className={styles.equipBody}>
        <p className={styles.equipMaker}>{eq.maker}</p>
        <p className={styles.equipName}>
          {eq.model}
          <span className={styles.equipCat}>{eq.category}</span>
        </p>
        <div className={styles.equipDesc}>{children}</div>
      </div>
    </div>
  );
}
