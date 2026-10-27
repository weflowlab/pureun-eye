import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./IntroBanner.module.css";

/** 상단 비주얼: 전체 화면 배경 + 테두리 박스 안 타이틀 (AOS zoom-out) */
export default function IntroBanner() {
  return (
    <section className={styles.banner}>
      {/* 배경 이미지 자리 */}
      <div className={styles.bg}>
        <Placeholder label="병원소개 상단 배경" dark />
      </div>
      <div className={styles.innerWrap}>
        <div className={styles.inner} suppressHydrationWarning data-aos="zoom-out" data-aos-duration="1500">
          <p className={styles.label}>{SITE.nameEn}</p>
          <h1 className={styles.title}>{SITE.name}</h1>
          <div className={styles.line} />
          <p className={styles.subtitle}>차별화된 의료서비스</p>
          <p className={styles.description}>
            환자 한 분 한 분에게 최선의 결과를 드리는 {SITE.name}는
            <br />
            치료 이후까지 체계적으로 관리합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
