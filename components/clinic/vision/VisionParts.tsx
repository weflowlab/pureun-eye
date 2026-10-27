import type { ReactNode } from "react";
import Image from "next/image";
import Placeholder from "@/components/common/Placeholder";
import ImgTxtBox from "@/components/diseases/common/ImgTxtBox";
import { EQUIPMENTS } from "@/lib/equipment";
import styles from "./vision.module.css";

type SecHeadProps = {
  /** 영문 소제목 */
  en?: string;
  title: ReactNode;
  sub?: ReactNode;
  /** 블록 첫 제목이면 상단 여백 제거 */
  first?: boolean;
};

/** 시력교정 섹션 제목: 영문 소제목 + 제목 + 설명 (가운데 정렬) */
export function SecHead({ en, title, sub, first }: SecHeadProps) {
  return (
    <div className={`${styles.secHead} ${first ? styles.first : ""}`}>
      {en && (
        <p className={styles.secEn} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {en}
        </p>
      )}
      <h3 className={styles.secTitle} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {title}
      </h3>
      {sub && (
        <p className={styles.secSub} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
          {sub}
        </p>
      )}
    </div>
  );
}

export type Point = { title: ReactNode; desc?: ReactNode };

/** 번호(01~) 붙은 특징 목록 */
export function PointList({ items }: { items: Point[] }) {
  return (
    <ol className={styles.points}>
      {items.map((p, i) => (
        <li key={i} className={styles.point} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100} data-aos-duration="1500">
          <span className={styles.pointNum}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className={styles.pointTitle}>{p.title}</p>
            {p.desc && <p className={styles.pointDesc}>{p.desc}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 이미지 2장 나란히 + 캡션 (절개 크기 비교 등) */
export function CompareImages({ items }: { items: string[] }) {
  return (
    <div className={styles.compare}>
      {items.map((label) => (
        <figure key={label} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
          {/* 비교 이미지 자리 */}
          <div className={styles.compareImg}>
            <Placeholder label={label} aspectRatio="4 / 3" />
          </div>
          <figcaption>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** 장비 실사진 (lib/equipment.ts 기준) */
export function EquipImage({ model }: { model: string }) {
  const eq = EQUIPMENTS.find((e) => e.model === model);
  if (!eq) return null;
  return (
    <figure className={styles.equip}>
      <Image src={eq.image} alt={`${eq.model} ${eq.category}`} width={536} height={428} />
      <figcaption>
        {eq.model} <small>{eq.maker}</small>
      </figcaption>
    </figure>
  );
}

/** 페이지 하단 진료 철학 띠 (기존 홈페이지 공통 문구) */
export function PhilosophyBand() {
  return (
    <ImgTxtBox
      label="푸른안과 진료 철학 배경"
      badge="Technology for human life"
      lead={
        <>
          푸른안과는 시력 향상을 넘어
          <br className="pc_block" />
          환자의 삶을 생각합니다.
        </>
      }
      desc={
        <>
          환자와 의료진 모두 사람이며,
          <br className="pc_block" />
          기술은 결국 사람의 삶을 위한 것이기 때문입니다.
        </>
      }
    />
  );
}
