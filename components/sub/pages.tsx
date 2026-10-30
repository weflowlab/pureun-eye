import type { ComponentType } from "react";
import SubLayout from "./SubLayout";
import Board from "@/components/news/Board";
import { NEWS_CATEGORIES, getNewsList } from "@/lib/news";
import { getReviewList, REVIEW_CATEGORIES, REVIEW_NOTICE } from "@/lib/reviews";
import { VISION_PAGES } from "@/components/clinic/vision";
import { DISEASE_PAGES } from "@/components/clinic/disease";
import { RETINA_PAGES } from "@/components/clinic/retina";
import DoctorsPage from "@/components/clinic/about/DoctorsPage";
import EquipmentPage from "@/components/clinic/about/EquipmentPage";
import IntroPage from "@/components/clinic/about/intro/IntroPage";
import LocationPage from "@/components/clinic/about/LocationPage";
import FaqPage from "@/components/clinic/community/FaqPage";
import OnlinePage from "@/components/clinic/contact/OnlinePage";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export type SubPageProps = { path: string; searchParams: SearchParams };

// 커뮤니티 — 공지사항 목록
function NoticePage({ path, searchParams }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <Board
        heading={{ strong: "푸른안과", rest: "소식" }}
        sub="진료 일정과 병원 소식을 알려 드립니다."
        basePath={path}
        posts={getNewsList()}
        categories={NEWS_CATEGORIES}
        searchParams={searchParams}
      />
    </SubLayout>
  );
}

// 커뮤니티 — 고객후기 목록
function ReviewsPage({ path, searchParams }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <Board
        heading={{ strong: "고객", rest: "후기" }}
        sub="푸른안과에서 진료받으신 분들의 이야기입니다."
        basePath={path}
        posts={getReviewList()}
        categories={REVIEW_CATEGORIES}
        searchParams={searchParams}
        notice={REVIEW_NOTICE}
      />
    </SubLayout>
  );
}

/** 경로 → 페이지 컴포넌트. 등록되지 않은 메뉴는 "준비 중"으로 표시 */
export const PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/about/intro": IntroPage,
  "/about/doctors": DoctorsPage,
  "/about/equipment": EquipmentPage,
  "/about/location": LocationPage,
  "/community/notice": NoticePage,
  "/community/faq": FaqPage,
  "/community/reviews": ReviewsPage,
  "/contact/online": OnlinePage,
  // 진료과목별 페이지
  ...VISION_PAGES,
  ...RETINA_PAGES,
  ...DISEASE_PAGES,
};
