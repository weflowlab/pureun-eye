import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import styles from "./BlogSection.module.css";

// 블로그 주소가 정해지기 전("#")에는 새 창을 열지 않음
const hasBlog = SITE.blogUrl !== "#";

/** 블로그 섹션: 우측 대표 이미지 + 좌측 타이틀·블로그 바로가기 (row-reverse) */
export default function BlogSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 블로그 대표 이미지 자리 (16:9) */}
        <div className={styles.videoBox}>
          <div className={styles.videoWrap}>
            <Placeholder label="블로그 대표 이미지" />
          </div>
        </div>

        <div className={styles.textBox}>
          <div suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
            <div className={styles.titGroup}>
              <div className={styles.smTit}>
                <p>눈 건강 이야기, 블로그에서 만나보세요</p>
              </div>
              <div className={styles.bigTit}>
                <h3>{SITE.name} 블로그</h3>
              </div>
            </div>
            <div className={styles.desc}>
              <p>진료 소식과 눈 건강 정보를 블로그에서 전해 드립니다.</p>
            </div>
            <a
              href={SITE.blogUrl}
              target={hasBlog ? "_blank" : undefined}
              rel={hasBlog ? "noopener noreferrer" : undefined}
              className={styles.moreBtn}
            >
              {/* 글쓰기 아이콘 */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
              블로그 바로가기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
