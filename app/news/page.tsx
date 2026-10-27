import type { Metadata } from "next";
import { Suspense } from "react";
import ContentBlock from "@/components/news/ContentBlock";
import Loading from "@/components/common/Loading";
import NewsTable from "@/components/news/NewsTable";
import Pagination from "@/components/news/Pagination";
import styles from "@/components/news/news.module.css";
import { getNewsList, NEWS_PAGE_SIZE } from "@/lib/news";
import { SITE } from "@/lib/site";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: `공지사항 | ${SITE.name}`,
};

/** 공지사항 목록 페이지 — searchParams(page)는 런타임 값이라 Suspense 내부에서 읽는다 */
export default function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <NewsBoard searchParams={searchParams} />
    </Suspense>
  );
}

/** 현재 페이지 번호에 맞는 게시글 목록 + 페이지네이션 */
async function NewsBoard({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams;
  const all = getNewsList();
  const totalPages = Math.max(1, Math.ceil(all.length / NEWS_PAGE_SIZE));

  // 잘못된 page 값은 1~마지막 범위로 보정
  const parsed = Number(Array.isArray(page) ? page[0] : page);
  const current = Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), totalPages) : 1;
  const offset = (current - 1) * NEWS_PAGE_SIZE;

  return (
    <ContentBlock>
      {/* 게시판 제목 */}
      <div className={styles.header}>
        <h2 className={styles.title}>공지사항</h2>
      </div>

      {/* 게시글 테이블 */}
      <NewsTable posts={all.slice(offset, offset + NEWS_PAGE_SIZE)} startNumber={all.length - offset} />

      {/* 페이지 이동 */}
      <Pagination current={current} total={totalPages} />
    </ContentBlock>
  );
}
