import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { getNewsList } from "@/lib/news";
import styles from "./NewsSection.module.css";

// 공지사항 최신 6건
const NEWS = getNewsList().slice(0, 6);

/** 푸른안과 소식(공지사항) 섹션: 좌측 3열 썸네일 그리드(호버 오버레이) + 우측 타이틀 */
export default function NewsSection() {
  return (
    <section className={styles.section}>
      {/* 배경 대형 장식 텍스트 */}
      <p className={styles.rlMTxt} aria-hidden="true">
        Pureun NEWS
      </p>
      <div className={styles.inner}>
        <div className={styles.newsList} suppressHydrationWarning data-aos="fade-right" data-aos-duration="1500">
          {NEWS.map((n) => (
            <div key={n.id} className={styles.newsItem}>
              <Link href={`/community/notice/${n.id}`} aria-label={n.title}>
                <div className={styles.hoverBox}>
                  <p className={styles.hoverTxt}>View more +</p>
                </div>
                <Placeholder label={n.title} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.titBox} suppressHydrationWarning data-aos="fade-left" data-aos-duration="1500">
          <p>
            <span className={styles.cb}>
              {SITE.name}
              <br />
              새소식
            </span>
          </p>
          <p className={styles.blogTitle}>NEWS</p>
          <div className={styles.newsBtn}>
            <Link href="/community/notice" className={styles.newsBtnInner}>
              <span>공지사항</span>
              {/* 화살표 아이콘 */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 12h17M14 6l6 6-6 6" stroke="#191919" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
