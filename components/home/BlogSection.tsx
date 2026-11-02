import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./BlogSection.module.css";

// 블로그 주소가 정해지기 전("#")에는 새 창을 열지 않음
const hasBlog = SITE.blogUrl !== "#";
const blogLink = hasBlog ? { target: "_blank", rel: "noopener noreferrer" } : {};

// 최근 글 자리 4개 (웹블로그가 만들어지면 실제 글로 교체)
const POSTS = [1, 2, 3, 4];

/** 블로그 섹션: 좌측 머리·바로가기 + 우측 최근 글 4개 (2×2) */
export default function BlogSection() {
  return (
    <HomeSection tone="white">
      <Inner className={styles.inner}>
        <div className={styles.text}>
          <HomeHead
            eyebrow="WEB BLOG"
            title={
              <>
                눈 건강 이야기,
                <br />
                <b>블로그</b>에서 만나보세요
              </>
            }
            sub="진료 소식과 눈 건강 정보를 블로그에서 전해 드립니다."
          />
        </div>

        {/* 바로가기: PC는 글 아래 왼쪽, 폰은 카드 아래 가운데 */}
        <div className={styles.btnWrap}>
          <a href={SITE.blogUrl} {...blogLink} className={home.btn} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
            {/* 글쓰기 아이콘 */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
            </svg>
            웹블로그 바로가기
          </a>
        </div>

        <ul className={styles.posts}>
          {POSTS.map((n, i) => (
            <li key={n} suppressHydrationWarning data-aos="fade-up" data-aos-delay={String(100 * i)}>
              <a href={SITE.blogUrl} {...blogLink} className={`${home.card} ${home.cardLift} ${styles.post}`} aria-label={`블로그 글 ${n}`}>
                <Placeholder label={`블로그 글 ${n}`} aspectRatio="16 / 10" />
              </a>
            </li>
          ))}
        </ul>
      </Inner>
    </HomeSection>
  );
}
