import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { playfairItalic } from "@/lib/fonts";
import BannerNav from "./BannerNav";
import styles from "./Banner.module.css";

type Props = {
  title: string;
  /** 대메뉴 영문명 (예: "RETINA CLINIC BOIM") — 제목 위 이탤릭 라벨 */
  groupEn: string;
  /** 경로 드롭다운용 메뉴 위치 */
  groupSlug: string;
  pageSlug: string;
  description?: ReactNode;
  /** 긴 질환명일 때 폰트 축소 */
  compact?: boolean;
};

// "RETINA CLINIC BOIM" → "Retina Clinic BOIM" (BOIM 같은 고유명은 대문자 유지)
const titleCase = (s: string) =>
  s
    .split(" ")
    .map((w) => (w === "BOIM" ? w : w[0] + w.slice(1).toLowerCase()))
    .join(" ");

/** 서브페이지 상단 배너: 가운데 정렬 (영문 이탤릭 라벨 · 제목 · 설명) + 아래 경로 알약(드롭다운으로 메뉴 이동), 배경은 스크롤 시 천천히 움직임 */
export default function Banner({ title, groupEn, groupSlug, pageSlug, description, compact }: Props) {
  return (
    <div className={`${styles.banner} ${playfairItalic.variable}`}>
      {/* 배경 이미지 자리 (배경만 잘라냄 — 드롭다운은 배너 밖으로 펼쳐짐) */}
      <div className={styles.bgWrap}>
        <Placeholder label={`${title} 상단 배경`} dark className={styles.bg} />
      </div>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{titleCase(groupEn)}</p>
        <h1 className={`${styles.title} ${compact ? styles.titleCustom : ""}`}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <BannerNav groupSlug={groupSlug} pageSlug={pageSlug} />
    </div>
  );
}
