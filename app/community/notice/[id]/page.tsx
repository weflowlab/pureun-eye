import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import ContentBlock from "@/components/news/ContentBlock";
import SubLayout from "@/components/sub/SubLayout";
import NewsDetail from "@/components/news/NewsDetail";
import { getNewsList, getNewsPost } from "@/lib/news";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

/** 모든 게시글을 빌드 시 정적 생성 */
export function generateStaticParams() {
  return getNewsList().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getNewsPost(Number((await params).id));
  return { title: post ? `${post.title} | ${SITE.name}` : SITE.name };
}

/** 공지사항 상세 페이지 — params 읽기는 Suspense 안에서 (즉시 내비게이션) */
export default function NewsDetailPage({ params }: Props) {
  return (
    <SubLayout path="/community/notice">
      <ContentBlock>
        <Suspense fallback={<Loading />}>
          <NewsDetailContent params={params} />
        </Suspense>
      </ContentBlock>
    </SubLayout>
  );
}

// id에 맞는 게시글 렌더
async function NewsDetailContent({ params }: Props) {
  const post = getNewsPost(Number((await params).id));
  if (!post) notFound();

  // 목록(최신순) 기준 이전 글 = 더 오래된 글, 다음 글 = 더 최근 글
  const list = getNewsList();
  const i = list.findIndex((p) => p.id === post.id);
  return <NewsDetail post={post} basePath="/community/notice" prev={list[i + 1]} next={list[i - 1]} />;
}
