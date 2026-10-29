import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import BoimPage from "./BoimPage";
import PhilosophyPage from "./PhilosophyPage";

/** 망막클리닉 보임 + 진료이념 페이지 (pages.tsx PAGES에 병합) */
export const RETINA_PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/retina/boim": BoimPage,
  "/about/philosophy": PhilosophyPage,
};
