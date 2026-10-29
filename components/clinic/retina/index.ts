import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import BoimPage from "./BoimPage";

/** 망막클리닉 보임 페이지 (pages.tsx PAGES에 병합) */
export const RETINA_PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/retina/boim": BoimPage,
};
