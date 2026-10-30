import { CalendarDays, HeartPulse, Info, Megaphone, Pin, type LucideProps } from "lucide-react";
import Link from "next/link";
import type { NewsCategory, NewsPost } from "@/lib/news";
import styles from "./news.module.css";

type Props = {
  posts: NewsPost[];
  /** 게시판 경로 (예: "/community/notice") — 상세 링크 = basePath/id */
  basePath: string;
  /** 맨 위 고정 글 (공지 표시) */
  pinned?: NewsPost[];
};

// 공지사항 분류별 아이콘 (그 밖의 글 = 고객후기 말풍선)
const CAT_ICON: Record<NewsCategory, typeof Info> = { "진료 일정": CalendarDays, "진료 안내": Info, "병원 소식": Megaphone, "건강 정보": HeartPulse };

/** 고객후기: 말풍선(lucide MessageSquare 모양) 안에 가로선 세 줄 (마지막 줄은 짧게) */
const ReviewIcon = ({ size = 24, strokeWidth = 2 }: LucideProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
    <path d="M7 8h10M7 11h10M7 14h6" />
  </svg>
);

/** 본문 첫 줄 (미리보기) */
const excerpt = (p: NewsPost) => p.body.find((line) => line.trim()) ?? "";

/** 게시글 한 줄: 분류 아이콘 · 분류·제목·미리보기 · 날짜 · 화살표 */
function Row({ post, basePath, pin }: { post: NewsPost; basePath: string; pin?: boolean }) {
  const Icon = pin ? Pin : (CAT_ICON[post.category as NewsCategory] ?? ReviewIcon);
  return (
    <li className={pin ? styles.pinRow : undefined}>
      <Link href={`${basePath}/${post.id}`} className={styles.row}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={22} strokeWidth={1.7} />
        </span>
        <span className={styles.content}>
          <span className={styles.tags}>
            {pin && <span className={styles.pinTag}>공지</span>}
            {post.category && <span className={styles.catTag}>{post.category}</span>}
          </span>
          <span className={styles.postTitle}>{post.title}</span>
          <span className={styles.excerpt}>{excerpt(post)}</span>
        </span>
        <span className={styles.date}>{post.date.replaceAll("-", ".")}</span>
        <span className={styles.arrow} aria-hidden="true" />
      </Link>
    </li>
  );
}

/** 게시글 목록 (공지사항·고객후기 공용) — 고정 글을 먼저, 그다음 일반 글 */
export default function PostList({ posts, basePath, pinned = [] }: Props) {
  if (posts.length === 0 && pinned.length === 0) return <p className={styles.empty}>등록된 게시글이 없습니다.</p>;
  return (
    <ul className={styles.list}>
      {pinned.map((p) => (
        <Row key={`pin-${p.id}`} post={p} basePath={basePath} pin />
      ))}
      {posts.map((p) => (
        <Row key={p.id} post={p} basePath={basePath} />
      ))}
    </ul>
  );
}
