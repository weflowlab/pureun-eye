import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import ContentBlock from "@/components/news/ContentBlock";
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
    <ContentBlock headerOffset>
      <Suspense fallback={<Loading />}>
        <NewsDetailContent params={params} />
      </Suspense>
    </ContentBlock>
  );
}

// id에 맞는 게시글 렌더
async function NewsDetailContent({ params }: Props) {
  const post = getNewsPost(Number((await params).id));
  if (!post) notFound();

  return <NewsDetail post={post} basePath="/community/notice" />;
}
