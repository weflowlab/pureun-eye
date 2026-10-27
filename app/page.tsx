import HeroSection from "@/components/home/HeroSection";
import ClinicSection from "@/components/home/ClinicSection";
import DepartmentShowcase from "@/components/home/DepartmentShowcase";
import PreCareSection from "@/components/home/PreCareSection";
import EquipmentCarousel from "@/components/home/EquipmentCarousel";
import PhilosophySection from "@/components/home/PhilosophySection";
import TreatmentSection from "@/components/home/TreatmentSection";
import DoctorSection from "@/components/home/DoctorSection";
import YoutubeSection from "@/components/home/YoutubeSection";
import NewsSection from "@/components/home/NewsSection";
import ClinicInfoSection from "@/components/home/ClinicInfoSection";
import PopupModal from "@/components/home/PopupModal";

/** 메인 페이지: 비주얼 → 진료과목 → 검사·장비 → 진료이념 → 대표 치료 → 의료진 → 영상·소식 → 진료 안내 */
export default function Home() {
  return (
    <>
      {/* 첫 방문 레이어 팝업 */}
      <PopupModal />
      <HeroSection />
      <ClinicSection />
      <DepartmentShowcase />
      <PreCareSection />
      <EquipmentCarousel />
      <PhilosophySection />
      <TreatmentSection />
      <DoctorSection />
      <YoutubeSection />
      <NewsSection />
      <ClinicInfoSection />
    </>
  );
}
