import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import type { NewsPost } from "@/lib/news";
import styles from "./detail.module.css";

type Props = {
  post: NewsPost;
  basePath: string;
  /** 목록 순서 기준 이전 글(더 오래된 글) · 다음 글(더 최근 글) */
  prev?: NewsPost;
  next?: NewsPost;
};

/** 게시글 상세 (분류·제목·날짜/조회수 · 대표이미지 · 본문 · 이전/다음 글 · 목록) — 공지사항·고객후기 공용 */
export default function NewsDetail({ post, basePath, prev, next }: Props) {
  return (
    <article className={styles.wrap}>
      {/* 제목·메타 */}
      <header className={styles.header}>
        {post.category && <span className={styles.cat}>{post.category}</span>}
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.meta}>
          <span>{post.date.replaceAll("-", ".")}</span>
          <span>조회 {post.views}</span>
        </p>
      </header>

      {/* 대표 이미지 */}
      {post.thumbnail && <Placeholder label={post.thumbnail} aspectRatio="16 / 9" className={styles.thumbnail} />}

      {/* 본문 */}
      <div className={styles.body}>
        {post.body.map((line, i) =>
          line ? (
            <p key={i}>{line}</p>
          ) : (
            <p key={i}>
              <br />
            </p>
          ),
        )}
        {post.link && (
          <a href={post.link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {post.link.label} →
          </a>
        )}
      </div>

      {/* 이전 글 · 다음 글 */}
      <nav className={styles.adjacent} aria-label="다른 글">
        {[
          { label: "다음 글", post: next },
          { label: "이전 글", post: prev },
        ].map(({ label, post: p }) => (
          <div key={label} className={styles.adjRow}>
            <span className={styles.adjLabel}>{label}</span>
            {p ? (
              <Link href={`${basePath}/${p.id}`} className={styles.adjTitle}>
                {p.title}
              </Link>
            ) : (
              <span className={styles.adjNone}>{label}이 없습니다.</span>
            )}
          </div>
        ))}
      </nav>

      {/* 목록으로 */}
      <div className={styles.nav}>
        <Link href={basePath} className={styles.backBtn}>
          목록으로
        </Link>
      </div>
    </article>
  );
}
