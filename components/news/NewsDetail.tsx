import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import type { NewsPost } from "@/lib/news";
import styles from "./detail.module.css";

/** 공지사항 상세 (제목/등록일·조회수/대표이미지/본문/목록 버튼) */
export default function NewsDetail({ post }: { post: NewsPost }) {
  return (
    <div className={styles.wrap}>
      {/* 제목·메타 */}
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.hit}>조회수 {post.views}</span>
        </div>
      </div>

      {/* 대표 이미지 */}
      {post.thumbnail && (
        <Placeholder label={post.thumbnail} width={800} aspectRatio="16 / 9" className={styles.thumbnail} />
      )}

      {/* 본문 */}
      <div className={styles.body}>
        {post.body.map((line, i) => (line ? <p key={i}>{line}</p> : <p key={i}><br /></p>))}
        {post.link && (
          <p>
            <br />
            <a href={post.link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {post.link.label}
            </a>
          </p>
        )}
      </div>

      {/* 목록으로 */}
      <div className={styles.nav}>
        <Link href="/news" className={styles.backBtn}>
          목록으로
        </Link>
      </div>
    </div>
  );
}
