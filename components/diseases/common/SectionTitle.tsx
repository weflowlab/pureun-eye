import { SITE } from "@/lib/site";
import styles from "./SectionTitle.module.css";

/** 본문 첫머리 영문 병원명 + 소개 문구 */
export default function SectionTitle() {
  return (
    <div className={styles.wrap}>
      <p className={styles.title} suppressHydrationWarning data-aos="fade-up" data-aos-duration="1500">
        {SITE.nameEn}
      </p>
      <p className={styles.subtitle} suppressHydrationWarning data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
        환자 한 분 한 분의 눈을 정성껏 살피는 {SITE.name}입니다.
      </p>
    </div>
  );
}
