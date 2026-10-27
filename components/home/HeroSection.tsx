import Placeholder from "@/components/common/Placeholder";
import styles from "./HeroSection.module.css";

/** 메인 인트로 영상 섹션 (PC/모바일 영상 분리 — 현재는 플레이스홀더) */
export default function HeroSection() {
  return (
    <section className={styles.section}>
      {/* PC 영상 자리: 100vw × 100vh */}
      <div className={styles.videoPc}>
        <Placeholder label="메인 인트로 영상 (PC, autoplay·muted·loop)" dark />
      </div>
      {/* 모바일 영상 자리: 60vh */}
      <div className={styles.videoMobile}>
        <Placeholder label="메인 인트로 영상 (모바일)" dark />
      </div>
    </section>
  );
}
