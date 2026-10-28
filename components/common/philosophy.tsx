import type { ReactNode } from "react";

/* 진료이념 4가지 — 메인 진료이념 띠 · 진료이념 페이지 공용 (기존 원고 기반, 봉사 항목은 현재 활동 확인 전까지 제외) */

// 진료이념 아이콘 (선 아이콘, 색은 currentColor)
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
// 방패 + 하트: 환자 안전·인본 진료
const SafetyIcon = () => (
  <Icon>
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
    <path d="M12 15.5s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.2-3 4-3 4z" />
  </Icon>
);
// 돋보기 속 눈: 검사·진단
const ExamIcon = () => (
  <Icon>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
    {/* 돋보기 안 눈은 작아서 선을 얇게 */}
    <path d="M6.5 10.5s1.6-2.5 4-2.5 4 2.5 4 2.5-1.6 2.5-4 2.5-4-2.5-4-2.5z" strokeWidth="1.2" />
    <circle cx="10.5" cy="10.5" r="0.9" fill="currentColor" />
  </Icon>
);
// 체크 달력: 수술 후 정기 관리
const CareIcon = () => (
  <Icon>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M9 14.5l2 2 4-4" />
  </Icon>
);
// 청진기: 전문 의료진
const DoctorIcon = () => (
  <Icon>
    <path d="M6 3H5a1 1 0 0 0-1 1v5a5 5 0 0 0 10 0V4a1 1 0 0 0-1-1h-1" />
    <path d="M9 14v1.5a5 5 0 0 0 10 0V13" />
    <circle cx="19" cy="11" r="2" />
  </Icon>
);

export const VALUES = [
  {
    icon: <SafetyIcon />,
    title: "환자 안전과 인본 진료",
    short: "환자의 안전을 가장 먼저 생각하며\n사람을 존중하는 진료를 지향합니다.",
    desc: "환자의 안전을 가장 먼저 생각하며, 사람을 존중하는 인본(人本) 진료를 지향합니다.",
  },
  {
    icon: <ExamIcon />,
    title: "꼼꼼한 검사와 정확한 진단",
    short: "꼭 필요한 검사를 빠뜨리지 않고\n결과를 신중하게 판단합니다.",
    desc: "꼭 필요한 검사를 빠뜨리지 않고 시행하며, 검사의 질과 이를 해석하는 의료진의 판단에 늘 신중을 기합니다.",
  },
  {
    icon: <CareIcon />,
    title: "수술 후 관리까지 생각하는 진료",
    short: "많은 수술보다, 수술 후 관리까지\n고려한 안전한 수술을 합니다.",
    desc: "많은 수술을 하기보다는 수술 후의 관리까지 고려하여 안전한 수술을 합니다.",
  },
  {
    icon: <DoctorIcon />,
    title: "전문 의료진과 끊임없는 연구",
    short: "분야별 전문 의료진과 정밀 장비,\n꾸준한 연구로 진료의 질을 높입니다.",
    desc: "분야별 전문 의료진과 정밀 진단·수술 장비를 갖추고, 꾸준한 투자와 연구로 질 높은 의료 서비스를 제공합니다.",
  },
];
