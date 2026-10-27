import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import FactCheckPage from "./FactCheckPage";
import LasikPage from "./LasikPage";
import PostCarePage from "./PostCarePage";
import PreCarePage from "./PreCarePage";
import SmilePage from "./SmilePage";

/** 시력교정 클리닉 경로 → 페이지 컴포넌트 (components/sub/pages.tsx의 PAGES에 병합) */
export const VISION_PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/vision/pre-care": PreCarePage,
  "/vision/lasik": LasikPage,
  "/vision/smile": SmilePage,
  "/vision/post-care": PostCarePage,
  "/vision/fact-check": FactCheckPage,
};
