import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import CenterPage from "./CenterPage";
import ChoicePage from "./ChoicePage";
import PremiumPage from "./PremiumPage";
import AdvancedPage from "./AdvancedPage";
import LaserPage from "./LaserPage";
import ComplicationsPage from "./ComplicationsPage";

/** 백내장 메뉴 경로 → 페이지 컴포넌트 (components/sub/pages.tsx 의 PAGES 에 병합) */
export const CATARACT_PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/cataract/center": CenterPage,
  "/cataract/choice": ChoicePage,
  "/cataract/premium": PremiumPage,
  "/cataract/advanced": AdvancedPage,
  "/cataract/laser": LaserPage,
  "/cataract/complications": ComplicationsPage,
};
