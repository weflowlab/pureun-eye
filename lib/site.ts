/** 사이트 전역 정보. 실제 값으로 교체 필요 */
export const SITE = {
  name: "푸른안과",
  nameEn: "PUREUN EYE CLINIC",
  ceo: "홍길동",
  address: "주소를 입력하세요",
  tel: "000-000-0000",
  mobile: "010-0000-0000",
  bizNo: "000-00-00000",
  kakaoUrl: "#",
  blogUrl: "#",
  youtubeUrl: "#",
  naverMapUrl: "#",
  kakaoMapUrl: "#",
};

/** 진료과목(질환) 목록 — 헤더/GNB/질환 페이지에서 공통 사용 */
export const DISEASES = [
  { slug: "diabetic", name: "당뇨망막증" },
  { slug: "macular", name: "황반변성" },
  { slug: "obstruction", name: "망막혈관폐쇄증" },
  { slug: "membrane", name: "망막전막" },
  { slug: "vitreous", name: "유리체출혈" },
  { slug: "circular", name: "황반원공" },
  { slug: "growth", name: "중심성장액망막병증" },
  { slug: "detachment", name: "망막박리" },
  { slug: "cataract", name: "백내장" },
  { slug: "child", name: "소아근시억제" },
  { slug: "xerophthalmia", name: "안구건조증" },
] as const;

export type DiseaseSlug = (typeof DISEASES)[number]["slug"];

/** 상단 메뉴 = 병원소개 + 질환 + 공지사항 */
export const NAV = [
  { href: "/intro", label: SITE.name },
  ...DISEASES.map((d) => ({ href: `/diseases/${d.slug}`, label: d.name })),
  { href: "/news", label: "공지사항" },
];
