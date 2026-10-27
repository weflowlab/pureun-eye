import { Suspense, type ReactNode } from "react";
import ContentBlock from "@/components/news/ContentBlock";
import Loading from "@/components/common/Loading";
import NewsTable from "@/components/news/NewsTable";
import Pagination from "@/components/news/Pagination";
import styles from "@/components/news/news.module.css";
import { NEWS_PAGE_SIZE, type NewsPost } from "@/lib/news";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  title: string;
  /** 게시판 경로 (예: "/community/notice") */
  basePath: string;
  /** 최신순 정렬된 전체 게시글 */
  posts: NewsPost[];
  searchParams: SearchParams;
  /** 제목 아래 안내 문구 */
  notice?: ReactNode;
};

/** 게시판 목록 (공지사항·고객후기 공용) — searchParams(page)는 런타임 값이라 Suspense 내부에서 읽는다 */
export default function Board(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <BoardList {...props} />
    </Suspense>
  );
}

/** 현재 페이지 번호에 맞는 게시글 목록 + 페이지네이션 */
async function BoardList({ title, basePath, posts, searchParams, notice }: Props) {
  const { page } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(posts.length / NEWS_PAGE_SIZE));

  // 잘못된 page 값은 1~마지막 범위로 보정
  const parsed = Number(Array.isArray(page) ? page[0] : page);
  const current = Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), totalPages) : 1;
  const offset = (current - 1) * NEWS_PAGE_SIZE;

  return (
    <ContentBlock>
      {/* 게시판 제목 */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {notice && <p className={styles.notice}>{notice}</p>}

      {/* 게시글 테이블 */}
      <NewsTable posts={posts.slice(offset, offset + NEWS_PAGE_SIZE)} startNumber={posts.length - offset} basePath={basePath} />

      {/* 페이지 이동 */}
      <Pagination current={current} total={totalPages} basePath={basePath} />
    </ContentBlock>
  );
}
