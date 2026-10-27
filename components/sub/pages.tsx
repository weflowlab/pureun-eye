import type { ComponentType } from "react";
import SubLayout from "./SubLayout";
import EquipSection from "@/components/intro/EquipSection";
import HoursSection from "@/components/intro/HoursSection";
import Board from "@/components/news/Board";
import { getNewsList } from "@/lib/news";
import { getReviewList, REVIEW_NOTICE } from "@/lib/reviews";
import CataractPage from "@/components/diseases/cataract/CataractPage";
import DiabeticPage from "@/components/diseases/diabetic/DiabeticPage";
import MacularPage from "@/components/diseases/macular/MacularPage";
import DetachmentPage from "@/components/diseases/detachment/DetachmentPage";
import GrowthPage from "@/components/diseases/growth/GrowthPage";
import { VISION_PAGES } from "@/components/clinic/vision";
import { CATARACT_PAGES } from "@/components/clinic/cataract";
import { RETINA_PAGES } from "@/components/clinic/retina";
import DoctorsPage from "@/components/clinic/about/DoctorsPage";
import LocationPage from "@/components/clinic/about/LocationPage";
import TourPage from "@/components/clinic/about/TourPage";
import ReferralPage from "@/components/clinic/retina/ReferralPage";
import FaqPage from "@/components/clinic/community/FaqPage";
import OnlinePage from "@/components/clinic/contact/OnlinePage";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export type SubPageProps = { path: string; searchParams: SearchParams };

// 병원소개 — 첨단의료장비
function EquipmentPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <EquipSection />
    </SubLayout>
  );
}

// 병원소개 — 진료시간
function HoursPage({ path }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <HoursSection />
    </SubLayout>
  );
}

// 커뮤니티 — 공지사항 목록
function NoticePage({ path, searchParams }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <Board title="공지사항" basePath={path} posts={getNewsList()} searchParams={searchParams} />
    </SubLayout>
  );
}

// 커뮤니티 — 고객후기 목록
function ReviewsPage({ path, searchParams }: SubPageProps) {
  return (
    <SubLayout path={path}>
      <Board title="고객후기" basePath={path} posts={getReviewList()} searchParams={searchParams} notice={REVIEW_NOTICE} />
    </SubLayout>
  );
}

/** 경로 → 페이지 컴포넌트. 등록되지 않은 메뉴는 "준비 중"으로 표시 */
export const PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/about/doctors": DoctorsPage,
  "/about/equipment": EquipmentPage,
  "/about/hours": HoursPage,
  "/about/location": LocationPage,
  "/cataract/about": CataractPage,
  "/retina/diabetic": DiabeticPage,
  "/retina/macular": MacularPage,
  "/retina/detachment": DetachmentPage,
  "/retina/csc": GrowthPage,
  "/about/tour": TourPage,
  "/retina/referral": ReferralPage,
  "/community/notice": NoticePage,
  "/community/faq": FaqPage,
  "/community/reviews": ReviewsPage,
  "/contact/online": OnlinePage,
  // 진료과목별 페이지 (기존 푸른안과 원고 기반)
  ...VISION_PAGES,
  ...CATARACT_PAGES,
  ...RETINA_PAGES,
};
