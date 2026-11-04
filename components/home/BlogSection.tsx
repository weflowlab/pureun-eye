import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { MediaImage } from "@/components/blog/ui/MediaImage";
import { getLatestPosts } from "@/lib/payload";
import { SITE } from "@/lib/site";
import { HomeHead, HomeSection, Inner } from "./HomeSection";
import home from "./home.module.css";
import styles from "./BlogSection.module.css";

// 글이 4편보다 적을 때 채우는 자리 (블로그에 글이 쌓이면 자연히 사라진다)
const SLOTS = 4;

/** 블로그 섹션: 좌측 머리·바로가기 + 우측 최근 글 4개 (2×2). 글은 Payload(블로그)에서 최신순으로 읽는다 */
export default async function BlogSection() {
  const posts = await getLatestPosts(SLOTS);
  const placeholders = Array.from({ length: Math.max(0, SLOTS - posts.length) }, (_, i) => i + 1);

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
                <b>웹블로그</b>에서 만나보세요
              </>
            }
            sub="진료 소식과 눈 건강 정보를 웹블로그에서 전해 드립니다."
          />
        </div>

        {/* 바로가기: PC는 글 아래 왼쪽, 폰은 카드 아래 가운데 */}
        <div className={styles.btnWrap}>
          <Link href={SITE.blogUrl} className={home.btn} suppressHydrationWarning data-aos="fade-up" data-aos-delay="150">
            {/* 글쓰기 아이콘 */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
            </svg>
            웹블로그 바로가기
          </Link>
        </div>

        <ul className={styles.posts}>
          {posts.map((p, i) => (
            <li key={p.slug} suppressHydrationWarning data-aos="fade-up" data-aos-delay={String(100 * i)}>
              <Link href={`/blog/${p.category}/${p.slug}`} className={`${home.card} ${home.cardLift} ${styles.post}`}>
                <div className={styles.thumb}>
                  {p.thumbnail ? (
                    <MediaImage image={p.thumbnail} sizes="(max-width: 1024px) 50vw, 360px" />
                  ) : (
                    <Placeholder label={`${p.categoryName ?? "블로그"} 글`} stock={false} className={styles.thumbPh} />
                  )}
                </div>
                <div className={styles.meta}>
                  {p.categoryName && <span className={home.chip}>{p.categoryName}</span>}
                  <strong className={styles.postTitle}>{p.title}</strong>
                </div>
              </Link>
            </li>
          ))}
          {placeholders.map((n, i) => (
            <li key={`ph-${n}`} suppressHydrationWarning data-aos="fade-up" data-aos-delay={String(100 * (posts.length + i))}>
              <Link href={SITE.blogUrl} className={`${home.card} ${home.cardLift} ${styles.post}`} aria-label="블로그 글">
                <Placeholder label={`블로그 글 ${posts.length + n}`} aspectRatio="16 / 10" />
              </Link>
            </li>
          ))}
        </ul>
      </Inner>
    </HomeSection>
  );
}
