import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { findPage } from "@/lib/site";
import Banner from "./Banner";
import Lnb from "./Lnb";

type Props = {
  /** 현재 페이지 경로 (예: "/retina/diabetic") — 배너 문구·서브메뉴 활성 상태에 사용 */
  path: string;
  /** 배너 타이틀 (기본: 메뉴명) */
  title?: string;
  description?: ReactNode;
  /** 긴 타이틀일 때 폰트 축소 */
  compactTitle?: boolean;
  children: ReactNode;
};

/** 서브페이지 공통 골격: 상단 배너 → 같은 대메뉴의 서브메뉴 → 본문 */
export default function SubLayout({ path, title, description, compactTitle, children }: Props) {
  const [, groupSlug, pageSlug] = path.split("/");
  const found = findPage(groupSlug, pageSlug);
  if (!found) notFound();
  const { group, page } = found;

  return (
    <>
      <Banner title={title ?? page.label} subtitle={group.label} description={description} compact={compactTitle} />
      <Lnb group={group} current={page.slug} />
      <div>{children}</div>
    </>
  );
}
