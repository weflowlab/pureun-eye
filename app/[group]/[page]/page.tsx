import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import ComingSoon from "@/components/sub/ComingSoon";
import SubLayout from "@/components/sub/SubLayout";
import { PAGES, type SearchParams } from "@/components/sub/pages";
import { MENU, SITE, findPage } from "@/lib/site";

type Params = Promise<{ group: string; page: string }>;
type Props = { params: Params; searchParams: SearchParams };

// 메뉴에 정의된 모든 서브페이지 정적 생성 (외부 링크 제외)
export function generateStaticParams() {
  return MENU.flatMap((g) => g.pages.filter((p) => !p.external).map((p) => ({ group: g.slug, page: p.slug })));
}

// 탭 제목: "메뉴명 | 병원명"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, page } = await params;
  const found = findPage(group, page);
  if (!found) return {};
  return {
    title: `${found.page.label} | ${SITE.name}`,
    description: `${SITE.name} ${found.group.label} - ${found.page.label}`,
  };
}

/** 서브페이지 (/{대메뉴}/{하위}) — params 읽기는 Suspense 안에서 (즉시 내비게이션) */
export default function SubPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <SubPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// 등록된 페이지 컴포넌트 렌더, 없으면 "준비 중"
async function SubPageContent({ params, searchParams }: Props) {
  const { group, page } = await params;
  const found = findPage(group, page);
  if (!found) notFound();

  const path = `/${group}/${page}`;
  const Page = PAGES[path];
  if (Page) return <Page path={path} searchParams={searchParams} />;

  return (
    <SubLayout path={path}>
      <ComingSoon title={found.page.label} />
    </SubLayout>
  );
}
