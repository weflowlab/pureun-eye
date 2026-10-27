import type { ComponentType } from "react";
import SubLayout from "./SubLayout";
import EquipSection from "@/components/intro/EquipSection";
import HoursSection from "@/components/intro/HoursSection";
import NoticeBoard from "@/components/news/NoticeBoard";
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
      <NoticeBoard searchParams={searchParams} />
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
  "/community/notice": NoticePage,
  // 진료과목별 페이지 (기존 푸른안과 원고 기반)
  ...VISION_PAGES,
  ...CATARACT_PAGES,
  ...RETINA_PAGES,
};
