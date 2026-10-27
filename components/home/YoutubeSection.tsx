import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./YoutubeSection.module.css";

/** 유튜브 섹션: 우측 영상(플레이스홀더) + 좌측 타이틀·채널 바로가기 (row-reverse) */
export default function YoutubeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 영상 임베드 자리 (16:9) */}
        <div className={styles.videoBox}>
          <div className={styles.videoWrap}>
            <Placeholder label="YouTube 영상 임베드" />
          </div>
        </div>

        <div className={styles.textBox}>
          <div suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
            <div className={styles.titGroup}>
              <div className={styles.smTit}>
                <p>눈 건강, 쉽게 알아보세요</p>
              </div>
              <div className={styles.bigTit}>
                <h3>{SITE.name} 유튜브</h3>
              </div>
            </div>
            <div className={styles.desc}>
              <p>어려운 안과 이야기를 쉽고 재미있게!</p>
            </div>
            <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.moreBtn}>
              <span className={styles.ytIcon} aria-hidden="true" />
              유튜브 바로가기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
