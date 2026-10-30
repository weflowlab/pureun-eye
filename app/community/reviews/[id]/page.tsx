import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import ContentBlock from "@/components/news/ContentBlock";
import SubLayout from "@/components/sub/SubLayout";
import NewsDetail from "@/components/news/NewsDetail";
import { getReview, getReviewList } from "@/lib/reviews";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

/** 모든 게시글을 빌드 시 정적 생성 */
export function generateStaticParams() {
  return getReviewList().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getReview(Number((await params).id));
  return { title: post ? `${post.title} | ${SITE.name}` : SITE.name };
}

/** 고객후기 상세 페이지 — params 읽기는 Suspense 안에서 (즉시 내비게이션) */
export default function ReviewDetailPage({ params }: Props) {
  return (
    <SubLayout path="/community/reviews">
      <ContentBlock>
        <Suspense fallback={<Loading />}>
          <ReviewDetailContent params={params} />
        </Suspense>
      </ContentBlock>
    </SubLayout>
  );
}

// id에 맞는 게시글 렌더
async function ReviewDetailContent({ params }: Props) {
  const post = getReview(Number((await params).id));
  if (!post) notFound();

  // 목록(최신순) 기준 이전 글 = 더 오래된 글, 다음 글 = 더 최근 글
  const list = getReviewList();
  const i = list.findIndex((p) => p.id === post.id);
  return <NewsDetail post={post} basePath="/community/reviews" prev={list[i + 1]} next={list[i - 1]} />;
}
