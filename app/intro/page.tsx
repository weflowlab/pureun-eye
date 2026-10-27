import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import IntroBanner from "@/components/intro/IntroBanner";
import IntroTabs from "@/components/intro/IntroTabs";
import DoctorSection from "@/components/intro/DoctorSection";
import PaperSection from "@/components/intro/PaperSection";
import EquipSection from "@/components/intro/EquipSection";
import HoursSection from "@/components/intro/HoursSection";

export const metadata: Metadata = {
  title: `병원소개 | ${SITE.name}`,
  description: `${SITE.name} 의료진 소개, 연구 논문 및 경력, 장비안내, 진료시간 안내`,
};

/** 병원소개: 배너 → 탭 → 의료진 → 논문/경력 → 장비(#equip) → 진료시간 */
export default function IntroPage() {
  return (
    <>
      <IntroBanner />
      <IntroTabs />
      <DoctorSection />
      <PaperSection />
      <EquipSection />
      <HoursSection />
    </>
  );
}
