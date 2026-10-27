import type { ComponentType } from "react";
import type { SubPageProps } from "@/components/sub/pages";
import BoimPage from "./BoimPage";
import RetinaEquipmentPage from "./RetinaEquipmentPage";
import RetinaAboutPage from "./RetinaAboutPage";
import FloatersPage from "./FloatersPage";
import PhilosophyPage from "./PhilosophyPage";

/** 망막클리닉 보임 + 진료이념 페이지 (pages.tsx PAGES에 병합) */
export const RETINA_PAGES: Record<string, ComponentType<SubPageProps>> = {
  "/retina/boim": BoimPage,
  "/retina/equipment": RetinaEquipmentPage,
  "/retina/about": RetinaAboutPage,
  "/retina/floaters": FloatersPage,
  "/about/philosophy": PhilosophyPage,
};
