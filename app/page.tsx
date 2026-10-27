import HeroSection from "@/components/home/HeroSection";
import ClinicSection from "@/components/home/ClinicSection";
import EquipmentShowcase from "@/components/home/EquipmentShowcase";
import EquipmentCarousel from "@/components/home/EquipmentCarousel";
import GuideSystemSection from "@/components/home/GuideSystemSection";
import ClinicValues from "@/components/home/ClinicValues";
import SurgerySystem from "@/components/home/SurgerySystem";
import DoctorSection from "@/components/home/DoctorSection";
import ReportSection from "@/components/home/ReportSection";
import YoutubeSection from "@/components/home/YoutubeSection";
import NewsSection from "@/components/home/NewsSection";
import ClinicInfoSection from "@/components/home/ClinicInfoSection";
import PopupModal from "@/components/home/PopupModal";

/** 메인 페이지: 원본과 동일한 섹션 순서 */
export default function Home() {
  return (
    <>
      {/* 첫 방문 레이어 팝업 */}
      <PopupModal />
      <HeroSection />
      <ClinicSection />
      <EquipmentShowcase />
      <EquipmentCarousel />
      <GuideSystemSection />
      <ClinicValues />
      <SurgerySystem />
      <DoctorSection />
      <ReportSection />
      <YoutubeSection />
      <NewsSection />
      <ClinicInfoSection />
    </>
  );
}
