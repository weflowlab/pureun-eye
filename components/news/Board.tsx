import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import ContentBlock from "@/components/news/ContentBlock";
import Loading from "@/components/common/Loading";
import PostList from "@/components/news/PostList";
import Pagination from "@/components/news/Pagination";
import styles from "@/components/news/news.module.css";
import { playfairItalic } from "@/lib/fonts";
import { NEWS_PAGE_SIZE, type NewsPost } from "@/lib/news";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  /** 두 톤 제목: 강조(굵게) + 나머지 */
  heading: { strong: string; rest: string };
  /** 제목 아래 한 줄 설명 */
  sub?: ReactNode;
  /** 게시판 경로 (예: "/community/notice") */
  basePath: string;
  /** 최신순 정렬된 전체 게시글 */
  posts: NewsPost[];
  /** 분류 필터 순서 (글에 실제로 있는 분류만 칩으로 노출) */
  categories?: readonly string[];
  searchParams: SearchParams;
  /** 목록 위 안내 문구 */
  notice?: ReactNode;
};

/** 게시판 목록 (공지사항·고객후기 공용) — searchParams(page·cat)는 런타임 값이라 Suspense 내부에서 읽는다 */
export default function Board(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <BoardList {...props} />
    </Suspense>
  );
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** 제목 · 분류 필터 · 고정 글 + 현재 페이지 글 · 페이지 이동 */
async function BoardList({ heading, sub, basePath, posts, categories = [], searchParams, notice }: Props) {
  const params = await searchParams;

  // 분류 필터 (분류가 있는 게시판만): 잘못된 값은 전체로
  const cats = categories.filter((c) => posts.some((p) => p.category === c));
  const catParam = first(params.cat);
  const cat = cats.find((c) => c === catParam);

  // 고정 글은 '전체'에서만 맨 위에, 나머지는 페이지로 나눔
  const pinned = cat ? [] : posts.filter((p) => p.pinned);
  const regular = posts.filter((p) => (cat ? p.category === cat : !p.pinned));
  const totalPages = Math.max(1, Math.ceil(regular.length / NEWS_PAGE_SIZE));

  // 잘못된 page 값은 1~마지막 범위로 보정
  const parsed = Number(first(params.page));
  const current = Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), totalPages) : 1;
  const offset = (current - 1) * NEWS_PAGE_SIZE;

  const catHref = (c?: string) => (c ? `${basePath}?cat=${encodeURIComponent(c)}` : basePath);

  return (
    <ContentBlock>
      {/* 제목 */}
      <div className={`${styles.header} ${playfairItalic.variable}`} suppressHydrationWarning data-aos="fade-up">
        <p className={styles.brand}>Pureun Eye Clinic</p>
        <h2 className={styles.title}>
          <strong>{heading.strong}</strong> {heading.rest}
        </h2>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>

      {/* 분류 필터 */}
      {cats.length > 0 && (
        <nav className={styles.filters} aria-label="분류">
          {[undefined, ...cats].map((c) => (
            <Link
              key={c ?? "all"}
              href={catHref(c)}
              className={`${styles.filter} ${c === cat ? styles.on : ""}`}
              aria-current={c === cat ? "page" : undefined}
            >
              {c ?? "전체"}
            </Link>
          ))}
        </nav>
      )}
      {notice && <p className={styles.notice}>{notice}</p>}

      <PostList pinned={pinned} posts={regular.slice(offset, offset + NEWS_PAGE_SIZE)} basePath={basePath} />

      {/* 페이지 이동 (분류 유지) */}
      <Pagination current={current} total={totalPages} basePath={catHref(cat)} />
    </ContentBlock>
  );
}
