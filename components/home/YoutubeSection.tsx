import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./YoutubeSection.module.css";

/** 영상도우미 섹션: 우측 영상(플레이스홀더) + 좌측 타이틀·채널/영상도우미 바로가기 (row-reverse) */
export default function YoutubeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 영상 임베드 자리 (16:9) */}
        <div className={styles.videoBox}>
          <div className={styles.videoWrap}>
            <Placeholder label="영상도우미 대표 영상 (YouTube 임베드)" />
          </div>
        </div>

        <div className={styles.textBox}>
          <div suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
            <div className={styles.titGroup}>
              <div className={styles.smTit}>
                <p>수술과 질환, 영상으로 알아보세요</p>
              </div>
              <div className={styles.bigTit}>
                <h3>{SITE.name} 영상도우미</h3>
              </div>
            </div>
            <div className={styles.desc}>
              <p>검사부터 수술 후 관리까지, 궁금한 내용을 영상으로 안내해 드립니다.</p>
            </div>
            <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.moreBtn}>
              <span className={styles.ytIcon} aria-hidden="true" />
              유튜브 바로가기
            </a>
            <Link href="/community/videos" className={styles.subBtn}>
              영상도우미 전체보기 +
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
