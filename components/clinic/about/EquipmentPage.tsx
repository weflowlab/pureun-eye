import type { SubPageProps } from "@/components/sub/pages";
import SubLayout from "@/components/sub/SubLayout";
import { playfairItalic } from "@/lib/fonts";
import EquipGrid from "./EquipGrid";
import styles from "./equipment.module.css";

/** 병원소개 — 첨단의료장비: 소개 → 분류 필터 + 장비 카드 격자 */
export default function EquipmentPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <section className={`${styles.wrap} ${playfairItalic.variable}`}>
        <div className={styles.head} suppressHydrationWarning data-aos="fade-up">
          <p className={styles.brand}>Pureun Eye Clinic</p>
          <h2 className={styles.title}>
            <span>정확한 진단의 시작,</span>
            <strong>첨단 의료장비</strong>
          </h2>
        </div>
        <EquipGrid />
      </section>
    </SubLayout>
  );
}
