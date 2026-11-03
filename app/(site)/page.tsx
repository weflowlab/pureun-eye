import HeroSection from "@/components/home/HeroSection";
import ClinicSection from "@/components/home/ClinicSection";
import DepartmentShowcase from "@/components/home/DepartmentShowcase";
import PreCareSection from "@/components/home/PreCareSection";
import EquipmentCarousel from "@/components/home/EquipmentCarousel";
import PhilosophySection from "@/components/home/PhilosophySection";
import TreatmentSection from "@/components/home/TreatmentSection";
import DoctorSection from "@/components/home/DoctorSection";
import BlogSection from "@/components/home/BlogSection";
import NewsSection from "@/components/home/NewsSection";
import ClinicInfoSection from "@/components/home/ClinicInfoSection";
import PopupModalServer from "@/components/home/PopupModalServer";

/** 메인 페이지: 비주얼 → 진료과목 → 검사·장비 → 진료이념 → 대표 치료 → 의료진 → 영상·소식 → 진료 안내 */
export default function Home() {
  return (
    <>
      {/* 첫 방문 안내 팝업 (관리자 '홈페이지 → 팝업', 여러 개면 탭으로 전환) */}
      <PopupModalServer />
      <HeroSection />
      <ClinicSection />
      <DepartmentShowcase />
      <PreCareSection />
      <EquipmentCarousel />
      <PhilosophySection />
      <TreatmentSection />
      <DoctorSection />
      <BlogSection />
      <NewsSection />
      <ClinicInfoSection />
    </>
  );
}
